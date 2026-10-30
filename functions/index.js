/**
 * StayNest Firebase Cloud Functions
 * Production-ready backend functions for WhatsApp Cloud API and Email automation.
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

/**
 * Triggered when a new booking is created in Firestore.
 * Prevents double booking, updates room counters, and sends notifications.
 */
exports.onBookingCreated = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap, context) => {
    const booking = snap.data();
    const bookingId = context.params.bookingId;

    try {
      // 1. Concurrency Check & Availability validation
      const propertyRef = db.collection("properties").doc(booking.propertyId);
      await db.runTransaction(async (transaction) => {
        const propDoc = await transaction.get(propertyRef);
        if (!propDoc.exists) {
          throw new Error("Property not found");
        }
        const propData = propDoc.data();
        if (propData.availableRooms <= 0) {
          throw new Error("No rooms available for this property");
        }
        // Decrement available rooms safely
        transaction.update(propertyRef, {
          availableRooms: propData.availableRooms - 1,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        });
      });

      // 2. Fetch Owner and Student information
      const ownerSnap = await db.collection("users").doc(booking.ownerId).get();
      const owner = ownerSnap.exists ? ownerSnap.data() : null;

      // 3. Dispatch WhatsApp Notification to Student
      await sendWhatsAppTemplate({
        to: booking.studentPhone,
        templateName: "staynest_booking_created",
        params: [
          booking.studentName,
          booking.bookingId || bookingId,
          booking.propertyName,
          booking.location,
          booking.moveInDate,
          `₹${booking.rentPrice?.toLocaleString("en-IN")}`,
          booking.status || "Pending",
        ],
      });

      // 4. Dispatch WhatsApp Notification to Owner
      if (owner && owner.phone) {
        await sendWhatsAppTemplate({
          to: owner.phone,
          templateName: "staynest_owner_new_request",
          params: [
            owner.name || "Host",
            booking.propertyName,
            booking.studentName,
            booking.moveInDate,
            booking.bookingDuration,
          ],
        });
      }

      // 5. Send Email Confirmation to Student
      await sendEmail({
        to: booking.studentEmail,
        subject: `StayNest – Booking Request Received (${booking.bookingId || bookingId})`,
        html: generateEmailTemplate("received", booking, owner),
      });

      // 6. Record Notification in DB
      await db.collection("notifications").add({
        recipientId: booking.studentId,
        bookingId: bookingId,
        type: "BOOKING_CREATED",
        title: "Booking Request Placed",
        message: `Your booking for ${booking.propertyName} has been registered and is awaiting host approval.`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        read: false,
      });

      console.log(`Booking ${bookingId} processed successfully.`);
    } catch (error) {
      console.error(`Error processing booking ${bookingId}:`, error);
      // Mark booking as error if transaction failed
      await snap.ref.update({
        status: "rejected",
        rejectionReason: error.message || "Room unavailable",
      });
    }
  });

/**
 * Triggered when a booking status changes (e.g. Confirmed, Rejected, Cancelled)
 */
exports.onBookingStatusChanged = functions.firestore
  .document("bookings/{bookingId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const bookingId = context.params.bookingId;

    if (before.status === after.status) return null;

    try {
      const ownerSnap = await db.collection("users").doc(after.ownerId).get();
      const owner = ownerSnap.exists ? ownerSnap.data() : null;

      // If cancelled, restore available room
      if (after.status === "cancelled" || after.status === "rejected") {
        const propertyRef = db.collection("properties").doc(after.propertyId);
        await propertyRef.update({
          availableRooms: admin.firestore.FieldValue.increment(1),
        });
      }

      // Send status WhatsApp to student
      await sendWhatsAppTemplate({
        to: after.studentPhone,
        templateName: `staynest_booking_${after.status.toLowerCase()}`,
        params: [
          after.studentName,
          after.bookingId || bookingId,
          after.propertyName,
          after.status.toUpperCase(),
        ],
      });

      // Send status Email to student
      await sendEmail({
        to: after.studentEmail,
        subject: `StayNest – Booking Status Update: ${after.status.toUpperCase()} (${after.bookingId || bookingId})`,
        html: generateEmailTemplate(after.status, after, owner),
      });

      // Notification entry
      await db.collection("notifications").add({
        recipientId: after.studentId,
        bookingId: bookingId,
        type: `BOOKING_${after.status.toUpperCase()}`,
        title: `Booking ${after.status.toUpperCase()}`,
        message: `Your booking at ${after.propertyName} is now ${after.status}.`,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        read: false,
      });
    } catch (err) {
      console.error(`Status change error for ${bookingId}:`, err);
    }
  });

/**
 * Helper to dispatch WhatsApp Business Cloud API messages
 */
async function sendWhatsAppTemplate({ to, templateName, params }) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneId) {
    console.log("[StayNest WhatsApp Integration Mode - Config pending]");
    console.log(`Payload target: ${to}, Template: ${templateName}, Params:`, params);
    return { status: "simulated_success", note: "Configure WHATSAPP_ACCESS_TOKEN in env" };
  }

  // Meta Cloud API POST
  const response = await fetch(`https://graph.facebook.com/v19.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: to.replace(/\D/g, ""), // Clean phone format
      type: "template",
      template: {
        name: templateName,
        language: { code: "en" },
        components: [
          {
            type: "body",
            parameters: params.map((p) => ({ type: "text", text: String(p) })),
          },
        ],
      },
    }),
  });

  return response.json();
}

/**
 * Helper to dispatch Emails via Resend or SMTP
 */
async function sendEmail({ to, subject, html }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[StayNest Email Service Mode - Key pending]");
    console.log(`Email to: ${to}, Subject: ${subject}`);
    return { status: "simulated_success", note: "Configure RESEND_API_KEY in env" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM || "StayNest <onboarding@resend.dev>",
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  return response.json();
}

/**
 * Premium HTML Email Generator for StayNest
 */
function generateEmailTemplate(type, booking, owner) {
  const statusColors = {
    confirmed: "#10B981",
    pending: "#F59E0B",
    received: "#2563EB",
    rejected: "#EF4444",
    cancelled: "#6B7280",
  };
  const color = statusColors[type] || "#2563EB";

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #F7F9FC; margin: 0; padding: 24px; color: #101D35; }
      .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #E2E8F0; }
      .header { background: #101D35; padding: 32px 24px; text-align: center; }
      .brand { font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; margin: 0; }
      .tagline { color: #38BDF8; font-size: 13px; margin-top: 4px; letter-spacing: 0.5px; }
      .content { padding: 32px 24px; }
      .status-pill { display: inline-block; background: ${color}20; color: ${color}; font-weight: 700; font-size: 13px; padding: 6px 14px; border-radius: 20px; border: 1px solid ${color}40; margin-bottom: 20px; }
      .receipt-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; margin: 24px 0; }
      .row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
      .label { color: #64748B; font-weight: 500; }
      .value { color: #0F172A; font-weight: 600; text-align: right; }
      .divider { border-top: 1px dashed #CBD5E1; margin: 14px 0; }
      .cta-btn { display: inline-block; background: #2563EB; color: #ffffff; text-decoration: none; font-weight: 600; padding: 12px 28px; border-radius: 8px; margin-top: 16px; }
      .footer { background: #F1F5F9; padding: 20px; text-align: center; font-size: 12px; color: #64748B; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1 class="brand">StayNest</h1>
        <p class="tagline">FIND YOUR SPACE. FEEL AT HOME.</p>
      </div>
      <div class="content">
        <div class="status-pill">STATUS: ${(type || "CONFIRMED").toUpperCase()}</div>
        <h2 style="margin: 0 0 12px; font-size: 22px;">Hello ${booking.studentName || "Student"},</h2>
        <p style="color: #475569; line-height: 1.6; margin: 0 0 16px;">
          ${
            type === "confirmed"
              ? "Great news! Your booking has been confirmed by the accommodation host. Your student room is officially reserved."
              : type === "rejected"
              ? "We regret to inform you that your booking request could not be accepted for the chosen dates."
              : "Thank you for booking with StayNest. We have received your reservation request and the host has been notified."
          }
        </p>

        <div class="receipt-box">
          <div class="row"><span class="label">Booking ID</span><span class="value">${booking.bookingId || "STAY-2026"}</span></div>
          <div class="row"><span class="label">Property Name</span><span class="value">${booking.propertyName}</span></div>
          <div class="row"><span class="label">Location</span><span class="value">${booking.location || "Nearby Campus"}</span></div>
          <div class="row"><span class="label">Room Type</span><span class="value">${booking.roomType || "Standard Student Room"}</span></div>
          <div class="row"><span class="label">Move-In Date</span><span class="value">${booking.moveInDate}</span></div>
          <div class="row"><span class="label">Stay Duration</span><span class="value">${booking.bookingDuration || "6 Months"}</span></div>
          <div class="divider"></div>
          <div class="row" style="font-size: 16px;"><span class="label" style="color: #0F172A; font-weight: 700;">Monthly Rent</span><span class="value" style="color: #2563EB; font-weight: 800;">₹${(booking.rentPrice || 0).toLocaleString("en-IN")}</span></div>
        </div>

        ${
          owner
            ? `
        <div style="background: #EAF2FF; padding: 14px; border-radius: 8px; font-size: 13px; color: #1E3A8A; margin-bottom: 20px;">
          <strong>Host Contact:</strong> ${owner.name || "StayNest Host"} | Phone: ${owner.phone || "+91 98765 43210"}
        </div>
        `
            : ""
        }

        <p style="font-size: 13px; color: #64748B;">
          If you have questions, our student support team is available 24/7 at support@staynest.com or via WhatsApp.
        </p>
      </div>
      <div class="footer">
        © 2026 StayNest Technologies Inc. | Premium Verified Student Accommodations.
      </div>
    </div>
  </body>
  </html>
  `;
}
