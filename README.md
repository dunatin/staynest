# 🏠 StayNest – Premium Student Room Booking Platform

> **Find Your Space. Feel At Home.**  
> India's premier student accommodation booking platform connecting college scholars with verified hostels, paying guests (PGs), shared flats, and private apartments with zero brokerage.

---

## 🌟 Executive Overview & Design Identity

StayNest is an end-to-end, production-grade student housing platform built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript (ES6+)**, backed by an **Express.js API gateway**, **Integrated Payment Gateway (UPI, Credit/Debit Card, Net Banking)**, **Firebase Firestore Security Rules**, **Firebase Cloud Functions**, **WhatsApp Business Cloud API**, and **HTML Tax Invoice Email Services**.

### 🎨 Brand Identity & Visual Palette
- **Deep Navy:** `#101D35` (Trust, Authority, Structure)
- **Royal Blue:** `#2563EB` (Primary CTA, Modern Tech)
- **Soft Blue:** `#EAF2FF` (Pill backgrounds, soft badges)
- **Accent Cyan:** `#38BDF8` (Verified shields, micro-interactions)
- **Light Surface:** `#F7F9FC` & `#FFFFFF`
- **Dark Mode Surface:** `#0B1323` & `#101D35`
- **Typography:** `Outfit` (Headings) and `Plus Jakarta Sans` (Body & UI)

---

## 🚀 Key Features & Modules

### 1. 🔍 Landing Page & Intelligent Campus Search
- **Dynamic Hero Search Bar:** Search by locality/city (Delhi North Campus, Delhi South Campus, Koramangala Bangalore, Powai Mumbai, Pune, Kota, Hyderabad, Vellore, Noida Sector 62), target university (DU, IITs, Christ, Symbiosis, NMIMS, VIT, Kota Coaching Hub), check-in date, and monthly budget.
- **6 Accommodation Categories:** Hostels, Paying Guest (PG), Shared Twin Rooms, Single Private Rooms, Flats/Apartments, and Student Villas with dynamic bed counters.
- **Floating Trust Badges:** Zero Brokerage, 100% In-Person Verified, High-Speed Wi-Fi & Study Desks, and Hygienic Mess Meals.

### 2. 🎛️ Explore Rooms & Real-Time Advanced Filters
- **Instant Live Filtering (No page reloads):**
  - Keyword search (matches property title, locality, university proximity, description).
  - Category selector (Hostel, PG, Shared, Private, Apartment, Villa).
  - Gender preferences (Co-ed / Unisex, Girls Only, Boys Only).
  - Monthly rent range slider (₹5,000 to ₹35,000+).
  - Target university campus selector.
  - Amenities checklist (Air Conditioning, 3 Meals/Mess, Attached Bathroom, High-Speed Wi-Fi, Laundry, Power Backup, CCTV Security).
  - Star ratings filter (Any, 4.0+, 4.5+).
  - Instant Sorting: Lowest Price, Highest Price, Highest Rated, and Recently Added.

### 3. 🖼️ Multi-Photo Galleries & Property Details
- Interactive multi-photo gallery: Clickable thumbnail selector allows students to browse 4–5 high-resolution room photos (bedroom, study pods, attached bathroom, dining area, gym, common lounge).
- In-person inspection shield with StayNest Verified Guarantee.
- Key specification matrix: Room category, sharing type, gender restriction, available beds count.
- Facilities list & house rules (curfew hours, visitor policies, noise rules).
- Campus proximity indicators (exact distance in km to colleges).
- Verified landlord card with one-click direct WhatsApp chat.
- Student review feed with verified stay badges.

### 4. 💳 Mandatory Payment Gateway & 10-Step Booking Flow
1. **Step 1:** Student selects room and reviews verified inclusions.
2. **Step 2:** System checks real-time room inventory to prevent double-booking.
3. **Step 3:** Student inputs verified credentials (Name, WhatsApp number, Email, College).
4. **Step 4:** Move-in date picker (past dates blocked) & stay duration (1, 3, 6, 11 months).
5. **Step 5:** Itemized financial breakdown (First month rent + refundable deposit + zero brokerage platform fee).
6. **Step 6:** **Required Payment Gateway Selection**:
   - **Instant UPI:** Live dynamic QR code scanner or UPI ID input (Google Pay, PhonePe, Paytm, BHIM).
   - **Debit & Credit Cards:** Visa, MasterCard, RuPay with 256-bit SSL encryption.
   - **Net Banking:** Instant selection of major Indian banks (HDFC, SBI, ICICI, Axis, Kotak, PNB).
7. **Step 7:** Live payment processing and verification via `/api/payments/verify`.
8. **Step 8:** Generation of unique Booking ID (e.g. `STAY-2026-88124`) and Transaction ID (e.g. `TXN_UPI_...`).
9. **Step 9:** Automatic notification dispatches:
   - **WhatsApp Business Cloud API** message sent to student and host with payment confirmation and transaction reference.
   - **HTML Tax Invoice** dispatched via email with official "PAID & RESERVED" stamp.
10. **Step 10:** Confirmation screen with one-click **Printable Allotment Receipt & Tax Invoice**, WhatsApp landlord connection, and student dashboard sync.

### 5. 👥 Three Dedicated Role Dashboards
- **Student Dashboard:** Total Bookings, Active Stays, Pending Requests, Wishlist Items; cancel eligible bookings with refund initiation, view invoices, and submit verified reviews.
- **Property Owner / Host Dashboard:** Key metrics, incoming booking request queue, add new property wizard with multi-photo input, edit/delete listings, and confirmed student tenant directory.
- **Administrator Control Room:** Global KPIs, host property submission approval queue (*Approve* or *Reject* before listings go live), platform-wide booking audit ledger, user accounts table, and API gateway inspector.

---

## 📁 Repository Structure

```
stayyyyyyy/
│
├── index.html               # Main Single-Page Application (HTML5 semantic markup)
├── style.css                # Custom Design System, Payment UI & Responsive CSS
├── script.js                # Core Application Logic, 16+ Room Database, Payment Gateway
├── firebase-config.js       # Firebase Client SDK Bridge & Local API Adapter
│
├── server.js                # Node.js Express Backend (APIs for WhatsApp, Email & Payments)
├── package.json             # Backend dependencies (express, cors, dotenv)
├── .env.example             # Environment variable template
│
├── firestore.rules          # Production-grade Firestore Security Rules (RBAC)
├── firestore.indexes.json   # Composite Firestore Query Indexes
├── firebase.json            # Firebase CLI Hosting, Functions & Firestore config
│
├── functions/               # Firebase Cloud Functions (Node.js 20)
│   ├── index.js             # onBookingCreated, onBookingStatusChanged, triggers
│   └── package.json         # Cloud Function dependencies
│
└── README.md                # Technical Documentation & Setup Guide
```

---

## 🛠️ Getting Started (Local Setup)

### Prerequisites
- Node.js (v18.x or v20.x+)
- npm (v9.x or v10.x+)

### 1. Launch the Server
```bash
npm start
```
The application will be live at:
👉 **`http://localhost:5000`**

---

## 📄 License
MIT License. © 2026 StayNest Technologies Inc. Built with ❤️ for college students.
