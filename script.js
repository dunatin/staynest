/**
 * ==========================================================================
 * STAYNEST – PREMIUM STUDENT ROOM BOOKING PLATFORM
 * Core Application Engine, State Management, Authentication, Search & Filters,
 * Required Payment Gateway, Photo Gallery, WhatsApp & Email Dispatchers, Dashboards
 * ==========================================================================
 */

// Global Application State
const StayNestState = {
  currentUser: {
    id: "user_student_1",
    name: "Rohan Sharma",
    email: "rohan.student@staynest.com",
    phone: "+91 98765 43210",
    role: "student", // 'student', 'owner', 'admin'
    college: "Delhi University (Hansraj College)",
    avatar: "RS"
  },
  currentView: "home",
  theme: localStorage.getItem("staynest_theme") || "light",
  properties: [],
  filteredProperties: [],
  bookings: [],
  wishlist: JSON.parse(localStorage.getItem("staynest_wishlist") || "[]"),
  recentlyViewed: JSON.parse(localStorage.getItem("staynest_recent") || "[]"),
  reviews: [],
  notificationLogs: [],
  activeFilters: {
    keyword: "",
    category: "all",
    gender: "all",
    maxPrice: 35000,
    college: "all",
    amenities: [],
    minRating: 0,
    sort: "featured"
  }
};

// ==========================================================================
// 1. EXTENSIVE PROPERTY DATABASE & MULTI-PHOTO SEED DATA (16+ Accommodations)
// ==========================================================================
const SEED_PROPERTIES = [
  {
    id: "prop-du-1",
    name: "Apex Ivy Student Residency",
    category: "PG",
    price: 11500,
    deposit: 11500,
    location: "Hudson Lane, North Campus, Delhi",
    college: "Delhi University",
    distanceKm: 0.4,
    gender: "Co-ed / Unisex",
    roomType: "Double Sharing",
    availableRooms: 3,
    totalRooms: 18,
    rating: 4.9,
    reviewCount: 48,
    verified: true,
    ownerId: "user_owner_1",
    ownerName: "Vikram Malhotra",
    ownerPhone: "+91 98112 34567",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV", "Study Desk"],
    description: "Premium student living with designer ergonomic study pods, 3 nutritious home-style meals, 200 Mbps Wi-Fi, and 24/7 biometric security just 5 minutes walk from Hansraj, Hindu, and SRCC.",
    rules: "Curfew: 10:30 PM • Visitors allowed in common lounge until 8 PM • No smoking."
  },
  {
    id: "prop-du-2",
    name: "St. Stephen's Scholar PG for Girls",
    category: "Hostel",
    price: 9500,
    deposit: 9500,
    location: "Kamla Nagar, North Campus, Delhi",
    college: "Delhi University",
    distanceKm: 0.6,
    gender: "Girls Only",
    roomType: "Single Private Room",
    availableRooms: 2,
    totalRooms: 14,
    rating: 4.8,
    reviewCount: 36,
    verified: true,
    ownerId: "user_owner_1",
    ownerName: "Vikram Malhotra",
    ownerPhone: "+91 98112 34567",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["Food", "WiFi", "Attached Bath", "Power Backup", "CCTV", "Study Desk", "Water Purifier"],
    description: "Quiet, peaceful academic environment exclusively for female undergraduate and postgraduate scholars. Includes daily housekeeping and round-the-clock female warden supervision.",
    rules: "Strict curfew: 10:00 PM • Pure vegetarian mess • Quiet hours after 11 PM."
  },
  {
    id: "prop-iit-1",
    name: "Powai Lake Tech Haven",
    category: "Apartment",
    price: 18500,
    deposit: 35000,
    location: "Hiranandani Gardens, Powai, Mumbai",
    college: "IIT",
    distanceKm: 0.8,
    gender: "Co-ed / Unisex",
    roomType: "Entire Student Flat",
    availableRooms: 1,
    totalRooms: 6,
    rating: 4.9,
    reviewCount: 29,
    verified: true,
    ownerId: "user_owner_2",
    ownerName: "Sunil Joshi",
    ownerPhone: "+91 98200 98765",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV", "Study Desk"],
    description: "High-end 2BHK fully furnished apartment tailored for IIT Bombay scholars and researchers. Modern kitchen, high-speed fiber internet, and quiet study room overlooking the lake.",
    rules: "No curfew • Self-cooking available • Guests allowed with prior notice."
  },
  {
    id: "prop-christ-1",
    name: "Greenfield Co-Living Suites",
    category: "PG",
    price: 13000,
    deposit: 13000,
    location: "SG Palya, Koramangala, Bangalore",
    college: "Christ University",
    distanceKm: 0.3,
    gender: "Co-ed / Unisex",
    roomType: "Double Sharing",
    availableRooms: 4,
    totalRooms: 24,
    rating: 4.7,
    reviewCount: 52,
    verified: true,
    ownerId: "user_owner_1",
    ownerName: "Vikram Malhotra",
    ownerPhone: "+91 98112 34567",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Laundry", "CCTV", "Study Desk"],
    description: "Directly opposite Christ University Gate 2. Vibrant student community with game room, rooftop study lounge, and healthy South Indian & North Indian meal buffet.",
    rules: "Curfew: 11:00 PM • Biometric attendance • ID card mandatory for entry."
  },
  {
    id: "prop-symb-1",
    name: "Hillview Student Villa & Hostel",
    category: "Villa",
    price: 14500,
    deposit: 14500,
    location: "Model Colony, Pune",
    college: "Symbiosis",
    distanceKm: 1.1,
    gender: "Boys Only",
    roomType: "Single Private Room",
    availableRooms: 2,
    totalRooms: 10,
    rating: 4.8,
    reviewCount: 22,
    verified: true,
    ownerId: "user_owner_3",
    ownerName: "Rajesh Shinde",
    ownerPhone: "+91 97654 32109",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV"],
    description: "Spacious bungalow converted into a boutique student villa with lush garden, outdoor study deck, and dedicated gym space near Symbiosis and Fergusson College.",
    rules: "Curfew: 10:45 PM • Two-wheeler parking available • Non-smoking premises."
  },
  {
    id: "prop-nmims-1",
    name: "Elite Scholar Residency",
    category: "Shared",
    price: 16000,
    deposit: 16000,
    location: "JVPD Scheme, Vile Parle West, Mumbai",
    college: "NMIMS",
    distanceKm: 0.5,
    gender: "Girls Only",
    roomType: "Double Sharing",
    availableRooms: 1,
    totalRooms: 12,
    rating: 4.9,
    reviewCount: 31,
    verified: true,
    ownerId: "user_owner_2",
    ownerName: "Sunil Joshi",
    ownerPhone: "+91 98200 98765",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV", "Study Desk"],
    description: "Upscale student residence walking distance from NMIMS, Mithibai, and NM College. Air-conditioned rooms with daily cleaning and chef-curated meals.",
    rules: "Curfew: 10:30 PM • Female guests only • High-speed Wi-Fi included."
  },
  {
    id: "prop-kota-1",
    name: "Kota Apex Ranker's Hostel",
    category: "Hostel",
    price: 7500,
    deposit: 7500,
    location: "Rajeev Gandhi Nagar, Kota",
    college: "Allen / Kota",
    distanceKm: 0.2,
    gender: "Boys Only",
    roomType: "Single Private Room",
    availableRooms: 6,
    totalRooms: 40,
    rating: 4.8,
    reviewCount: 65,
    verified: true,
    ownerId: "user_owner_3",
    ownerName: "Rajesh Shinde",
    ownerPhone: "+91 97654 32109",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Power Backup", "CCTV", "Study Desk"],
    description: "Designed specifically for NEET and JEE aspirants studying at Allen Samanvya and Resonance. Soundproof study rooms, nutritious diet, and bio-break alarms.",
    rules: "Curfew: 9:30 PM • Mandatory study hours 7 PM - 10 PM • Zero distraction policy."
  },
  {
    id: "prop-du-south",
    name: "Satya Niketan South Campus PG",
    category: "PG",
    price: 10500,
    deposit: 10500,
    location: "Satya Niketan, South Campus, Delhi",
    college: "Delhi University",
    distanceKm: 0.3,
    gender: "Co-ed / Unisex",
    roomType: "Double Sharing",
    availableRooms: 3,
    totalRooms: 16,
    rating: 4.7,
    reviewCount: 38,
    verified: true,
    ownerId: "user_owner_1",
    ownerName: "Vikram Malhotra",
    ownerPhone: "+91 98112 34567",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV"],
    description: "Opposite Sri Venkateswara College (Venky) and ARSD. Vibrant student hub surrounded by study cafes and metro accessibility.",
    rules: "Curfew: 10:30 PM • Vegetarian & Non-Veg meal options available."
  },
  {
    id: "prop-vit-1",
    name: "Vellore Tech Residency",
    category: "Hostel",
    price: 8000,
    deposit: 8000,
    location: "Katpadi, Vellore",
    college: "VIT",
    distanceKm: 0.5,
    gender: "Boys Only",
    roomType: "Triple Sharing",
    availableRooms: 5,
    totalRooms: 28,
    rating: 4.6,
    reviewCount: 41,
    verified: true,
    ownerId: "user_owner_3",
    ownerName: "Rajesh Shinde",
    ownerPhone: "+91 97654 32109",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Power Backup", "CCTV"],
    description: "Close to VIT Main Gate. Unlimited Wi-Fi for coding and project marathons, 3 meals daily, and laundry service.",
    rules: "Curfew: 9:00 PM • Bio-fingerprint entry • Silent hours."
  },
  {
    id: "prop-pune-viman",
    name: "Phoenix Co-Living Hub",
    category: "Apartment",
    price: 15500,
    deposit: 20000,
    location: "Viman Nagar, Pune",
    college: "Symbiosis",
    distanceKm: 0.4,
    gender: "Co-ed / Unisex",
    roomType: "Entire Student Flat",
    availableRooms: 2,
    totalRooms: 8,
    rating: 4.9,
    reviewCount: 34,
    verified: true,
    ownerId: "user_owner_3",
    ownerName: "Rajesh Shinde",
    ownerPhone: "+91 97654 32109",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV", "Study Desk"],
    description: "Modern serviced flats right next to Symbiosis Law and Design Campus. Fully equipped kitchen, power backup, and weekly cleaning.",
    rules: "No curfew • Student ID required • Cleanliness agreement."
  },
  {
    id: "prop-hyd-1",
    name: "Gachibowli Cyber Scholars Living",
    category: "PG",
    price: 12500,
    deposit: 12500,
    location: "Gachibowli, Hyderabad",
    college: "IIT",
    distanceKm: 1.2,
    gender: "Co-ed / Unisex",
    roomType: "Double Sharing",
    availableRooms: 4,
    totalRooms: 20,
    rating: 4.7,
    reviewCount: 28,
    verified: true,
    ownerId: "user_owner_2",
    ownerName: "Sunil Joshi",
    ownerPhone: "+91 98200 98765",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Laundry", "Power Backup", "CCTV", "Study Desk"],
    description: "Ideal for students and research fellows near IIIT Hyderabad, University of Hyderabad, and tech campuses. High speed internet & hot buffet meals.",
    rules: "Curfew: 11:30 PM • Gym access included."
  },
  {
    id: "prop-amity-1",
    name: "Express Campus Suites",
    category: "PG",
    price: 8500,
    deposit: 8500,
    location: "Sector 125, Noida",
    college: "Amity",
    distanceKm: 0.3,
    gender: "Co-ed / Unisex",
    roomType: "Triple Sharing",
    availableRooms: 5,
    totalRooms: 30,
    rating: 4.6,
    reviewCount: 44,
    verified: true,
    ownerId: "user_owner_3",
    ownerName: "Rajesh Shinde",
    ownerPhone: "+91 97654 32109",
    status: "approved",
    images: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    amenities: ["AC", "Food", "WiFi", "Attached Bath", "Power Backup", "CCTV"],
    description: "Affordable student hostel immediately adjacent to Amity University Gate 4. 4 meals a day and gym access.",
    rules: "Curfew: 11:00 PM • Free shuttle to Botanical Garden metro • Clean mess."
  }
];

const SEED_BOOKINGS = [
  {
    id: "STAY-2026-88124",
    propertyId: "prop-du-1",
    propertyName: "Apex Ivy Student Residency",
    location: "Hudson Lane, North Campus, Delhi",
    roomType: "Double Sharing",
    studentId: "user_student_1",
    studentName: "Rohan Sharma",
    studentEmail: "rohan.student@staynest.com",
    studentPhone: "+91 98765 43210",
    college: "Delhi University",
    ownerId: "user_owner_1",
    ownerName: "Vikram Malhotra",
    ownerPhone: "+91 98112 34567",
    moveInDate: "2026-11-15",
    bookingDuration: "6 Months",
    rentPrice: 11500,
    securityDeposit: 11500,
    amountPaid: 23000,
    paymentMethod: "UPI (Google Pay)",
    transactionId: "TXN_UPI_9831092830",
    status: "confirmed",
    createdAt: "2026-10-25T10:30:00Z"
  }
];

const SEED_REVIEWS = [
  {
    id: "rev-1",
    propertyId: "prop-du-1",
    studentName: "Rohan Sharma",
    rating: 5,
    title: "Unmatched study atmosphere and superfast Wi-Fi!",
    comment: "Stayed here for my 2nd semester at Hansraj. The study pods are quiet, food is clean and wholesome, and the owner Vikram is very responsive on WhatsApp. 10/10 recommended.",
    date: "2026-09-14",
    verifiedStay: true
  },
  {
    id: "rev-2",
    propertyId: "prop-christ-1",
    studentName: "Pooja Krishnan",
    rating: 5,
    title: "Best location for Christ University students",
    comment: "Gate 2 is literally across the street. The rooms are cleaned every day and the Wi-Fi never drops even during exams. Super safe with biometric gates.",
    date: "2026-10-02",
    verifiedStay: true
  }
];

// ==========================================================================
// 2. INITIALIZATION & STORAGE SYNCHRONIZATION
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initStateData();
  setupEventListeners();
  renderCategoriesGrid();
  renderFeaturedProperties();
  renderExploreListings();
  updateWishlistBadges();
  checkBackendHealth();
  updateAuthUI();
});

function initStateData() {
  const localProps = localStorage.getItem("staynest_properties");
  if (localProps) {
    StayNestState.properties = JSON.parse(localProps);
  } else {
    StayNestState.properties = [...SEED_PROPERTIES];
    savePropertiesToStorage();
  }

  const localBookings = localStorage.getItem("staynest_bookings");
  if (localBookings) {
    StayNestState.bookings = JSON.parse(localBookings);
  } else {
    StayNestState.bookings = [...SEED_BOOKINGS];
    saveBookingsToStorage();
  }

  const localReviews = localStorage.getItem("staynest_reviews");
  if (localReviews) {
    StayNestState.reviews = JSON.parse(localReviews);
  } else {
    StayNestState.reviews = [...SEED_REVIEWS];
    localStorage.setItem("staynest_reviews", JSON.stringify(StayNestState.reviews));
  }

  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("heroSearchDate");
  if (dateInput) {
    dateInput.min = today;
    dateInput.value = today;
  }
}

function savePropertiesToStorage() {
  localStorage.setItem("staynest_properties", JSON.stringify(StayNestState.properties));
}

function saveBookingsToStorage() {
  localStorage.setItem("staynest_bookings", JSON.stringify(StayNestState.bookings));
}

// ==========================================================================
// 3. THEME CONTROLLER
// ==========================================================================
function initTheme() {
  document.body.setAttribute("data-theme", StayNestState.theme);
  updateThemeIcon();
}

function toggleTheme() {
  StayNestState.theme = StayNestState.theme === "light" ? "dark" : "light";
  document.body.setAttribute("data-theme", StayNestState.theme);
  localStorage.setItem("staynest_theme", StayNestState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.getElementById("themeToggleBtn");
  if (!btn) return;
  btn.innerHTML = StayNestState.theme === "dark" 
    ? `<i class="fa-solid fa-sun text-warning"></i>` 
    : `<i class="fa-solid fa-moon"></i>`;
}

// ==========================================================================
// 4. NAVIGATION & SPA ROUTING
// ==========================================================================
function navigateTo(viewName) {
  StayNestState.currentView = viewName;

  const views = ["home", "explore", "student-dashboard", "owner-dashboard", "admin-dashboard"];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    if (el) {
      if (v === viewName) {
        el.classList.add("active");
        el.classList.remove("hidden");
      } else {
        el.classList.remove("active");
        el.classList.add("hidden");
      }
    }
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${viewName}`) link.classList.add("active");
  });

  document.querySelectorAll(".bottom-nav-item").forEach(item => {
    item.classList.remove("active");
    if (item.getAttribute("data-view") === viewName) item.classList.add("active");
  });

  window.scrollTo({ top: 0, behavior: "smooth" });

  if (viewName === "explore") {
    applyFilters();
  } else if (viewName === "student-dashboard") {
    renderStudentDashboard();
  } else if (viewName === "owner-dashboard") {
    renderOwnerDashboard();
  } else if (viewName === "admin-dashboard") {
    renderAdminDashboard();
  }
}

function toggleMobileNav() {
  document.getElementById("mobileNavDrawer").classList.toggle("open");
}

function handleMobileDashboardClick() {
  if (!StayNestState.currentUser || StayNestState.currentUser.role === "guest") {
    openAuthModal("login");
    showToast("Please log in to view your bookings", "info");
    return;
  }
  openDashboardView();
}

function handleMobileProfileClick() {
  if (!StayNestState.currentUser || StayNestState.currentUser.role === "guest") {
    openAuthModal("login");
    return;
  }
  openDashboardView();
}

function handleHostPropertyClick() {
  if (!StayNestState.currentUser || StayNestState.currentUser.role === "guest") {
    openAuthModal("signup");
    showToast("Register as a Property Host to list your accommodation", "info");
    return;
  }
  if (StayNestState.currentUser.role === "owner" || StayNestState.currentUser.role === "admin") {
    navigateTo("owner-dashboard");
    openAddPropertyModal();
  } else {
    // Switch to Host Mode
    StayNestState.currentUser.role = "owner";
    StayNestState.currentUser.name = "Vikram Malhotra";
    StayNestState.currentUser.avatar = "VM";
    updateAuthUI();
    showToast("Switched to Property Host profile. Listing new stay...", "info");
    navigateTo("owner-dashboard");
    openAddPropertyModal();
  }
}

// ==========================================================================
// 5. AUTHENTICATION
// ==========================================================================
function updateAuthUI() {
  const loggedOutBox = document.getElementById("loggedOutButtons");
  const loggedInBox = document.getElementById("loggedInMenu");
  const userNameLabel = document.getElementById("userNameLabel");
  const userRoleBadge = document.getElementById("userRoleBadge");
  const userAvatar = document.getElementById("userAvatar");
  const dropdownUserName = document.getElementById("dropdownUserName");
  const dropdownUserEmail = document.getElementById("dropdownUserEmail");

  if (!StayNestState.currentUser || StayNestState.currentUser.role === "guest") {
    loggedOutBox?.classList.remove("hidden");
    loggedInBox?.classList.add("hidden");
  } else {
    loggedOutBox?.classList.add("hidden");
    loggedInBox?.classList.remove("hidden");

    if (userNameLabel) userNameLabel.textContent = StayNestState.currentUser.name;
    if (userRoleBadge) userRoleBadge.textContent = StayNestState.currentUser.role;
    if (userAvatar) userAvatar.textContent = StayNestState.currentUser.avatar || "SN";
    if (dropdownUserName) dropdownUserName.textContent = StayNestState.currentUser.name;
    if (dropdownUserEmail) dropdownUserEmail.textContent = StayNestState.currentUser.email;
  }
}

function openAuthModal(mode = "login") {
  document.getElementById("authModal").classList.remove("hidden");
  switchAuthMode(mode);
}

function switchAuthMode(mode) {
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  if (mode === "login") {
    tabLogin.classList.add("active");
    tabSignup.classList.remove("active");
    loginForm.classList.remove("hidden");
    signupForm.classList.add("hidden");
  } else {
    tabSignup.classList.add("active");
    tabLogin.classList.remove("active");
    signupForm.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }
}

function toggleSignupFields(role) {
  const collGroup = document.getElementById("signupCollegeGroup");
  const bizGroup = document.getElementById("signupBusinessGroup");

  if (role === "student") {
    collGroup.classList.remove("hidden");
    bizGroup.classList.add("hidden");
  } else {
    collGroup.classList.add("hidden");
    bizGroup.classList.remove("hidden");
  }
}

function togglePasswordVisibility(fieldId, btn) {
  const input = document.getElementById(fieldId);
  if (!input) return;
  if (input.type === "password") {
    input.type = "text";
    btn.innerHTML = `<i class="fa-regular fa-eye-slash"></i>`;
  } else {
    input.type = "password";
    btn.innerHTML = `<i class="fa-regular fa-eye"></i>`;
  }
}

function handleAuthSubmit(event, mode) {
  event.preventDefault();

  if (mode === "login") {
    const email = document.getElementById("loginEmail").value.trim();
    let role = "student";
    let name = "Rohan Sharma";
    let avatar = "RS";

    if (email.includes("owner") || email.includes("apex") || email.includes("host")) {
      role = "owner";
      name = "Vikram Malhotra";
      avatar = "VM";
    } else if (email.includes("admin")) {
      role = "admin";
      name = "Platform Administrator";
      avatar = "AD";
    }

    StayNestState.currentUser = {
      id: "user_" + Date.now(),
      name,
      email,
      phone: "+91 98765 43210",
      role,
      avatar
    };

    closeModal("authModal");
    showToast(`Welcome back, ${name}!`, "success");
    updateAuthUI();
    openDashboardView();

  } else {
    const roleRadio = document.querySelector('input[name="signupRole"]:checked');
    const role = roleRadio ? roleRadio.value : "student";
    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const phone = document.getElementById("signupPhone").value.trim();
    const pwd = document.getElementById("signupPassword").value;
    const confirmPwd = document.getElementById("signupConfirmPassword").value;

    if (pwd !== confirmPwd) {
      showToast("Passwords do not match. Please recheck.", "error");
      return;
    }

    const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);

    StayNestState.currentUser = {
      id: "user_" + Date.now(),
      name,
      email,
      phone,
      role,
      avatar: initials
    };

    closeModal("authModal");
    showToast(`Account registered successfully as ${role}!`, "success");
    updateAuthUI();
    openDashboardView();
  }
}

function handleForgotPassword() {
  const email = prompt("Enter your registered email address to receive password reset instructions:");
  if (email && email.includes("@")) {
    showToast(`Password reset instructions sent to ${email}`, "success");
  }
}

function handleLogout() {
  StayNestState.currentUser = { id: null, role: "guest" };
  updateAuthUI();
  toggleUserDropdown();
  showToast("You have been signed out safely", "info");
  navigateTo("home");
}

function toggleUserDropdown() {
  document.getElementById("userDropdownMenu")?.classList.toggle("show");
}

function openDashboardView() {
  const role = StayNestState.currentUser?.role;
  if (role === "owner") {
    navigateTo("owner-dashboard");
  } else if (role === "admin") {
    navigateTo("admin-dashboard");
  } else {
    navigateTo("student-dashboard");
  }
}

// ==========================================================================
// 6. CATEGORIES & HERO SEARCH
// ==========================================================================
const CATEGORY_DEFINITIONS = [
  { name: "Hostels", type: "Hostel", icon: "fa-hotel", count: "4,200+ beds" },
  { name: "Paying Guest (PG)", type: "PG", icon: "fa-bed", count: "6,800+ rooms" },
  { name: "Shared Rooms", type: "Shared", icon: "fa-people-roof", count: "3,100+ sharing" },
  { name: "Private Rooms", type: "Private", icon: "fa-door-closed", count: "2,400+ singles" },
  { name: "Apartments", type: "Apartment", icon: "fa-city", count: "1,250+ flats" },
  { name: "Student Villas", type: "Villa", icon: "fa-house-user", count: "450+ villas" }
];

function renderCategoriesGrid() {
  const container = document.getElementById("categoriesGrid");
  if (!container) return;

  container.innerHTML = CATEGORY_DEFINITIONS.map(cat => `
    <div class="category-card" onclick="filterByCategory('${cat.type}')">
      <div class="cat-icon-wrap">
        <i class="fa-solid ${cat.icon}"></i>
      </div>
      <h3 class="cat-name">${cat.name}</h3>
      <span class="cat-count">${cat.count}</span>
    </div>
  `).join("");
}

function setSearchCategory(type, btn) {
  document.querySelectorAll(".search-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  StayNestState.activeFilters.category = type;
}

function handleHeroSearch() {
  const loc = document.getElementById("heroSearchLocation").value.trim();
  const college = document.getElementById("heroSearchCollege").value;
  const maxPrice = document.getElementById("heroSearchBudget").value;

  if (loc) StayNestState.activeFilters.keyword = loc;
  if (college) StayNestState.activeFilters.college = college;
  if (maxPrice) StayNestState.activeFilters.maxPrice = Number(maxPrice);

  navigateTo("explore");
}

function applyQuickFilter(tag) {
  StayNestState.activeFilters.keyword = tag;
  navigateTo("explore");
}

function filterByCategory(catType) {
  StayNestState.activeFilters.category = catType;
  navigateTo("explore");
}

function filterByCategoryFromFooter(catType) {
  filterByCategory(catType);
}

function quickSearchCampus(campus) {
  StayNestState.activeFilters.college = campus;
  navigateTo("explore");
}

// ==========================================================================
// 7. EXPLORE LISTINGS & ADVANCED FILTERS
// ==========================================================================
function renderFeaturedProperties() {
  const container = document.getElementById("featuredPropertiesGrid");
  if (!container) return;

  const topStays = StayNestState.properties.filter(p => p.status === "approved").slice(0, 6);
  container.innerHTML = topStays.map(p => generatePropertyCardHtml(p)).join("");
}

function renderExploreListings() {
  applyFilters();
}

function applyFilters() {
  const keyword = document.getElementById("filterKeyword")?.value.toLowerCase().trim() || StayNestState.activeFilters.keyword.toLowerCase();
  const category = document.getElementById("filterCategory")?.value || StayNestState.activeFilters.category;
  const college = document.getElementById("filterCollege")?.value || StayNestState.activeFilters.college;
  const maxPrice = Number(document.getElementById("filterPriceRange")?.value || StayNestState.activeFilters.maxPrice);

  if (document.getElementById("filterCategory")) document.getElementById("filterCategory").value = category;
  if (document.getElementById("filterCollege")) document.getElementById("filterCollege").value = college;

  const activeAmenities = [];
  ["AC", "Food", "Bath", "Wifi", "Laundry", "Backup", "CCTV"].forEach(key => {
    const chk = document.getElementById(`amenity${key}`);
    if (chk && chk.checked) {
      if (key === "Bath") activeAmenities.push("Attached Bath");
      else if (key === "Backup") activeAmenities.push("Power Backup");
      else activeAmenities.push(key);
    }
  });

  const filtered = StayNestState.properties.filter(p => {
    if (p.status !== "approved") return false;

    if (keyword) {
      const matchText = `${p.name} ${p.location} ${p.college} ${p.roomType} ${p.description}`.toLowerCase();
      if (!matchText.includes(keyword)) return false;
    }

    if (category !== "all" && p.category !== category) return false;
    if (StayNestState.activeFilters.gender !== "all" && p.gender !== StayNestState.activeFilters.gender) return false;
    if (p.price > maxPrice) return false;
    if (college !== "all" && !p.college.toLowerCase().includes(college.toLowerCase())) return false;

    for (const am of activeAmenities) {
      if (!p.amenities.includes(am)) return false;
    }

    if (p.rating < StayNestState.activeFilters.minRating) return false;

    return true;
  });

  StayNestState.filteredProperties = filtered;
  sortAndRenderFiltered();
}

function updatePriceSlider(val) {
  document.getElementById("priceDisplay").textContent = `Up to ₹${Number(val).toLocaleString("en-IN")}`;
  applyFilters();
}

function selectGenderFilter(gender, btn) {
  document.querySelectorAll(".pill-option").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  StayNestState.activeFilters.gender = gender;
  applyFilters();
}

function selectRatingFilter(rating, btn) {
  document.querySelectorAll(".rating-pill").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  StayNestState.activeFilters.minRating = Number(rating);
  applyFilters();
}

function applySorting(sortMode) {
  StayNestState.activeFilters.sort = sortMode;
  sortAndRenderFiltered();
}

function sortAndRenderFiltered() {
  let list = [...StayNestState.filteredProperties];
  const sort = StayNestState.activeFilters.sort;

  if (sort === "price-asc") {
    list.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    list.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort === "newest") {
    list.reverse();
  }

  const container = document.getElementById("explorePropertiesGrid");
  const countBadge = document.getElementById("resultsCountBadge");
  const noResults = document.getElementById("noResultsState");

  if (countBadge) {
    countBadge.textContent = `Showing ${list.length} verified accommodations`;
  }

  if (list.length === 0) {
    container.innerHTML = "";
    noResults?.classList.remove("hidden");
  } else {
    noResults?.classList.add("hidden");
    container.innerHTML = list.map(p => generatePropertyCardHtml(p)).join("");
  }
}

function resetAllFilters() {
  StayNestState.activeFilters = {
    keyword: "",
    category: "all",
    gender: "all",
    maxPrice: 35000,
    college: "all",
    amenities: [],
    minRating: 0,
    sort: "featured"
  };

  if (document.getElementById("filterKeyword")) document.getElementById("filterKeyword").value = "";
  if (document.getElementById("filterCategory")) document.getElementById("filterCategory").value = "all";
  if (document.getElementById("filterCollege")) document.getElementById("filterCollege").value = "all";
  if (document.getElementById("filterPriceRange")) {
    document.getElementById("filterPriceRange").value = 35000;
    document.getElementById("priceDisplay").textContent = "Up to ₹35,000";
  }

  document.querySelectorAll(".custom-checkbox input").forEach(chk => (chk.checked = false));
  document.querySelectorAll(".pill-option").forEach((b, i) => b.classList.toggle("active", i === 0));
  document.querySelectorAll(".rating-pill").forEach((b, i) => b.classList.toggle("active", i === 0));

  applyFilters();
}

function toggleMobileFilters() {
  document.getElementById("filtersSidebar").classList.toggle("mobile-open");
}

function generatePropertyCardHtml(prop) {
  const isWishlisted = StayNestState.wishlist.includes(prop.id);
  const mainImage = prop.images[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80";

  return `
    <div class="property-card" data-id="${prop.id}">
      <div class="prop-img-box">
        <img src="${mainImage}" alt="${prop.name}" loading="lazy">
        <div class="prop-badge-verified">
          <i class="fa-solid fa-shield-check"></i> StayNest Verified
        </div>
        <button class="wishlist-toggle-btn ${isWishlisted ? "active" : ""}" 
                onclick="toggleWishlist('${prop.id}', event)" 
                aria-label="Save to Wishlist">
          <i class="${isWishlisted ? "fa-solid" : "fa-regular"} fa-heart"></i>
        </button>
      </div>

      <div class="prop-card-body">
        <div class="prop-meta-row">
          <span class="prop-cat-tag">${prop.category} • ${prop.gender}</span>
          <span class="prop-rating-tag">
            <i class="fa-solid fa-star"></i> ${prop.rating} 
            <span class="prop-reviews-count">(${prop.reviewCount})</span>
          </span>
        </div>

        <h3 class="prop-title" title="${prop.name}">${prop.name}</h3>
        
        <div class="prop-location-row">
          <i class="fa-solid fa-location-dot"></i>
          <span>${prop.location}</span>
        </div>

        <div>
          <span class="prop-college-dist">
            <i class="fa-solid fa-graduation-cap"></i> ${prop.distanceKm} km from ${prop.college}
          </span>
        </div>

        <div class="prop-amenities-tags">
          ${prop.amenities.slice(0, 3).map(a => `<span class="amenity-pill">${a}</span>`).join("")}
          ${prop.amenities.length > 3 ? `<span class="amenity-pill">+${prop.amenities.length - 3} more</span>` : ""}
        </div>

        <div class="prop-card-footer">
          <div class="prop-price-wrap">
            <span class="prop-price-val">₹${prop.price.toLocaleString("en-IN")}</span>
            <span class="prop-price-unit">per month / bed</span>
          </div>

          <div class="prop-actions-btns">
            <button class="btn btn-outline btn-sm" onclick="openPropertyDetails('${prop.id}')">
              Photos & Details
            </button>
            <button class="btn btn-primary btn-sm" onclick="startBookingFlow('${prop.id}')">
              Book & Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================================================
// 8. PROPERTY DETAILS & INTERACTIVE PHOTO GALLERY
// ==========================================================================
function openPropertyDetails(propId) {
  const prop = StayNestState.properties.find(p => p.id === propId);
  if (!prop) return;

  if (!StayNestState.recentlyViewed.includes(propId)) {
    StayNestState.recentlyViewed.unshift(propId);
    if (StayNestState.recentlyViewed.length > 6) StayNestState.recentlyViewed.pop();
    localStorage.setItem("staynest_recent", JSON.stringify(StayNestState.recentlyViewed));
  }

  const modal = document.getElementById("propertyDetailsModal");
  const content = document.getElementById("propertyDetailContent");
  const images = prop.images || [];
  const mainImg = images[0] || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80";
  const propReviews = StayNestState.reviews.filter(r => r.propertyId === propId);

  content.innerHTML = `
    <!-- Interactive Main Photo & Thumbnails -->
    <div>
      <div class="detail-gallery-main">
        <img id="detailHeroImage" src="${mainImg}" alt="${prop.name}">
        <div class="prop-badge-verified" style="top: 16px; left: 16px;">
          <i class="fa-solid fa-shield-check"></i> 100% In-Person Verified Room
        </div>
      </div>

      <!-- Thumbnail Carousel -->
      <div class="gallery-thumbs-row">
        ${images.map((imgUrl, i) => `
          <div class="gallery-thumb-item ${i === 0 ? "active" : ""}" onclick="changeDetailPhoto('${imgUrl}', this)">
            <img src="${imgUrl}" alt="Photo ${i + 1}">
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Layout Grid -->
    <div class="detail-content-layout">
      <div class="detail-main-col">
        <div class="detail-header mb-2">
          <h1 style="font-size: 2rem; margin-bottom: 0.5rem;">${prop.name}</h1>
          <p style="color: var(--color-text-muted); font-size: 0.95rem;">
            <i class="fa-solid fa-location-dot text-primary"></i> ${prop.location} • <strong>${prop.distanceKm} km from ${prop.college}</strong>
          </p>
        </div>

        <!-- Specs Bar -->
        <div class="detail-specs-bar">
          <div class="spec-item">
            <span class="spec-title">Category</span>
            <span class="spec-val">${prop.category}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Room Sharing</span>
            <span class="spec-val">${prop.roomType}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Gender Policy</span>
            <span class="spec-val">${prop.gender}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Available Beds</span>
            <span class="spec-val text-success">${prop.availableRooms} of ${prop.totalRooms} left</span>
          </div>
        </div>

        <h3 class="mb-2">About This Student Accommodation</h3>
        <p style="color: var(--color-text-muted); line-height: 1.7; margin-bottom: 1.5rem;">
          ${prop.description}
        </p>

        <h3 class="mb-2">Included Amenities & Facilities</h3>
        <div class="detail-amenities-grid">
          ${prop.amenities.map(a => `
            <div class="detail-amenity-cell">
              <i class="fa-solid fa-circle-check"></i> ${a}
            </div>
          `).join("")}
        </div>

        <h3 class="mb-2">House Rules & Curfew</h3>
        <p style="color: var(--color-text-muted); line-height: 1.6; margin-bottom: 1.75rem;">
          ${prop.rules}
        </p>

        <!-- Host Card -->
        <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
          <div style="display: flex; align-items: center; gap: 1rem;">
            <div class="banner-avatar" style="width: 48px; height: 48px; font-size: 1.2rem;">${prop.ownerName.slice(0, 2).toUpperCase()}</div>
            <div>
              <h4 style="margin: 0;">Hosted by ${prop.ownerName}</h4>
              <span style="font-size: 0.8rem; color: var(--color-text-muted);">Verified Landlord • Typical reply time: Under 15 mins</span>
            </div>
          </div>
          <a href="https://wa.me/${prop.ownerPhone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(prop.ownerName)},%20I%20am%20interested%20in%20${encodeURIComponent(prop.name)}%20via%20StayNest." 
             target="_blank" class="btn btn-outline btn-sm">
            <i class="fa-brands fa-whatsapp text-success"></i> WhatsApp Host
          </a>
        </div>

        <!-- Student Reviews -->
        <div class="reviews-section">
          <div class="section-header-flex" style="margin-bottom: 1rem;">
            <h3>Verified Student Reviews (${propReviews.length})</h3>
            <button class="btn btn-outline btn-sm" onclick="openReviewModal('${prop.id}')">
              <i class="fa-solid fa-pen"></i> Write Review
            </button>
          </div>

          <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${propReviews.length === 0 ? `<p style="color: var(--color-text-muted);">No reviews posted yet. Be the first student to review this stay!</p>` : ""}
            ${propReviews.map(r => `
              <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                  <strong>${r.studentName}</strong>
                  <span style="color: #F59E0B; font-weight: 700;">★ ${r.rating}.0</span>
                </div>
                <div style="font-weight: 600; font-size: 0.9rem; margin-bottom: 0.25rem;">${r.title}</div>
                <p style="color: var(--color-text-muted); font-size: 0.85rem; margin: 0;">${r.comment}</p>
                <div style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--color-text-light);">
                  Verified Student Stay • ${r.date}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>

      <!-- Sticky Booking Card -->
      <div class="detail-sidebar-col">
        <div class="detail-sticky-card">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 1.25rem;">
            <div>
              <span style="font-size: 1.85rem; font-weight: 800; color: var(--color-primary);">₹${prop.price.toLocaleString("en-IN")}</span>
              <span style="font-size: 0.8rem; color: var(--color-text-muted);"> / month</span>
            </div>
            <span style="font-size: 0.85rem; font-weight: 700; color: #F59E0B;">★ ${prop.rating}</span>
          </div>

          <div style="background: var(--color-soft-blue); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 1.25rem; font-size: 0.82rem; color: var(--color-primary); font-weight: 600;">
            <i class="fa-solid fa-sparkles"></i> Zero Brokerage Guarantee • Save ₹12,000+
          </div>

          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem; font-size: 0.85rem;">
            <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
              <span>Security Deposit:</span>
              <span style="font-weight: 700; color: var(--color-text-main);">₹${prop.deposit.toLocaleString("en-IN")} (Refundable)</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
              <span>Lock-In / Notice:</span>
              <span style="font-weight: 700; color: var(--color-text-main);">1 Month</span>
            </div>
            <div style="display: flex; justify-content: space-between; color: var(--color-text-muted);">
              <span>Beds Available:</span>
              <span style="font-weight: 700; color: var(--color-success);">${prop.availableRooms} Left</span>
            </div>
          </div>

          <button class="btn btn-primary btn-block btn-lg mb-2" onclick="startBookingFlow('${prop.id}')">
            Reserve & Pay Room Now
          </button>

          <p style="text-align: center; font-size: 0.75rem; color: var(--color-text-muted); margin: 0;">
            Instant Payment Confirmation • 256-bit Bank Security
          </p>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

function changeDetailPhoto(url, thumbEl) {
  const hero = document.getElementById("detailHeroImage");
  if (hero) hero.src = url;
  document.querySelectorAll(".gallery-thumb-item").forEach(t => t.classList.remove("active"));
  thumbEl?.classList.add("active");
}

// ==========================================================================
// 9. COMPLETE BOOKING WORKFLOW WITH REQUIRED PAYMENT GATEWAY
// ==========================================================================
let currentBookingState = {};
let selectedPaymentMethod = "UPI";

function startBookingFlow(propId) {
  // If not authenticated, open login
  if (!StayNestState.currentUser || StayNestState.currentUser.role === "guest") {
    closeModal("propertyDetailsModal");
    openAuthModal("login");
    showToast("Please sign in to proceed with your booking & payment.", "info");
    return;
  }

  const prop = StayNestState.properties.find(p => p.id === propId);
  if (!prop) return;

  if (prop.availableRooms <= 0) {
    showToast("Sorry, this accommodation is fully booked. Please choose another stay.", "error");
    return;
  }

  const defaultMoveIn = new Date();
  defaultMoveIn.setDate(defaultMoveIn.getDate() + 7);
  const moveInStr = defaultMoveIn.toISOString().split("T")[0];

  currentBookingState = {
    propertyId: prop.id,
    propertyName: prop.name,
    location: prop.location,
    roomType: prop.roomType,
    ownerId: prop.ownerId,
    ownerName: prop.ownerName,
    ownerPhone: prop.ownerPhone,
    rentPrice: prop.price,
    securityDeposit: prop.deposit,
    studentId: StayNestState.currentUser.id,
    studentName: StayNestState.currentUser.name,
    studentEmail: StayNestState.currentUser.email,
    studentPhone: StayNestState.currentUser.phone,
    college: StayNestState.currentUser.college || "Delhi University",
    moveInDate: moveInStr,
    bookingDuration: "6 Months"
  };

  closeModal("propertyDetailsModal");
  renderBookingModalStep();
  document.getElementById("bookingModal").classList.remove("hidden");
}

function renderBookingModalStep() {
  const container = document.getElementById("bookingModalBody");
  const b = currentBookingState;
  const totalAmount = b.rentPrice + b.securityDeposit;

  container.innerHTML = `
    <div class="booking-stepper">
      <div class="step-indicator active">
        <span class="step-num">1</span>
        <span class="step-title">Stay Details</span>
      </div>
      <div class="step-indicator active">
        <span class="step-num">2</span>
        <span class="step-title">Payment Method (Required)</span>
      </div>
      <div class="step-indicator">
        <span class="step-num">3</span>
        <span class="step-title">Verified Receipt</span>
      </div>
    </div>

    <div class="modal-header mb-2">
      <h2>Reserve Your Student Room at ${b.propertyName}</h2>
      <p style="color: var(--color-text-muted); font-size: 0.9rem;">
        Complete student information and verified online payment to secure your room.
      </p>
    </div>

    <form onsubmit="handlePaymentAndBookingSubmission(event)">
      
      <!-- Student Details -->
      <div class="form-row-2">
        <div class="form-group">
          <label>Student Full Name *</label>
          <input type="text" id="bookStudentName" value="${b.studentName}" required>
        </div>
        <div class="form-group">
          <label>WhatsApp Number (for alerts) *</label>
          <input type="tel" id="bookStudentPhone" value="${b.studentPhone}" required>
        </div>
      </div>

      <div class="form-row-2">
        <div class="form-group">
          <label>Email Address *</label>
          <input type="email" id="bookStudentEmail" value="${b.studentEmail}" required>
        </div>
        <div class="form-group">
          <label>Enrolled College / University</label>
          <input type="text" id="bookStudentCollege" value="${b.college}">
        </div>
      </div>

      <!-- Move-in & Duration -->
      <div class="form-row-2">
        <div class="form-group">
          <label>Preferred Move-In Date *</label>
          <input type="date" id="bookMoveInDate" value="${b.moveInDate}" min="${new Date().toISOString().split("T")[0]}" required>
        </div>
        <div class="form-group">
          <label>Stay Duration *</label>
          <select id="bookDuration">
            <option value="1 Month">1 Month (Trial)</option>
            <option value="3 Months">3 Months (Trimester)</option>
            <option value="6 Months" selected>6 Months (Semester)</option>
            <option value="11 Months">11 Months (Full Academic Year)</option>
          </select>
        </div>
      </div>

      <!-- Price Breakdown -->
      <div class="price-summary-breakdown">
        <div class="breakdown-row">
          <span>First Month Rent (${b.roomType})</span>
          <span>₹${b.rentPrice.toLocaleString("en-IN")}</span>
        </div>
        <div class="breakdown-row">
          <span>Refundable Security Deposit</span>
          <span>₹${b.securityDeposit.toLocaleString("en-IN")}</span>
        </div>
        <div class="breakdown-row" style="color: var(--color-success); font-weight: 600;">
          <span>StayNest Platform & Brokerage Fee</span>
          <span>₹0 (FREE - Zero Brokerage)</span>
        </div>
        <div class="breakdown-row total">
          <span>Total Amount Payable Now</span>
          <span>₹${totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <!-- MANDATORY PAYMENT METHOD SECTION -->
      <div class="payment-methods-box">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <h3 style="font-size: 1.1rem; margin: 0;">
            <i class="fa-solid fa-credit-card text-primary"></i> Select Payment Method (Required)
          </h3>
          <span style="font-size: 0.78rem; font-weight: 700; color: var(--color-success);">
            <i class="fa-solid fa-shield-halved"></i> 256-Bit SSL Encrypted
          </span>
        </div>

        <div class="payment-nav-tabs">
          <button type="button" class="pay-tab-btn active" id="tabPayUPI" onclick="switchPaymentTab('UPI')">
            <i class="fa-brands fa-google-pay"></i> Instant UPI
          </button>
          <button type="button" class="pay-tab-btn" id="tabPayCard" onclick="switchPaymentTab('Card')">
            <i class="fa-regular fa-credit-card"></i> Debit / Credit Card
          </button>
          <button type="button" class="pay-tab-btn" id="tabPayNetBank" onclick="switchPaymentTab('NetBank')">
            <i class="fa-solid fa-building-columns"></i> Net Banking
          </button>
        </div>

        <!-- Panel 1: UPI -->
        <div class="payment-tab-panel active" id="panelPayUPI">
          <div class="upi-qr-card">
            <div class="upi-qr-graphic">
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=staynest@hdfcbank&pn=StayNest%20Living&am=${totalAmount}&cu=INR" alt="UPI QR Code">
            </div>
            <div>
              <h4 style="margin: 0 0 0.25rem;">Scan & Pay with Any UPI App</h4>
              <p style="margin: 0 0 0.5rem; font-size: 0.82rem; color: var(--color-text-muted);">
                Open Google Pay, PhonePe, Paytm, or BHIM on your smartphone to scan and pay ₹${totalAmount.toLocaleString("en-IN")}.
              </p>
              <div class="upi-apps-icons">
                <span class="upi-app-badge"><i class="fa-brands fa-google-pay"></i> GPay</span>
                <span class="upi-app-badge">PhonePe</span>
                <span class="upi-app-badge">Paytm</span>
                <span class="upi-app-badge">BHIM UPI</span>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Or Enter Your UPI ID / VPA</label>
            <input type="text" id="upiIdInput" placeholder="username@okhdfcbank / phone@paytm" value="rohan.sharma@okaxis">
          </div>
        </div>

        <!-- Panel 2: Cards -->
        <div class="payment-tab-panel" id="panelPayCard">
          <div class="form-group mb-2">
            <label>Cardholder Name</label>
            <input type="text" id="cardHolder" placeholder="Name as printed on card" value="${b.studentName}">
          </div>
          <div class="form-group mb-2">
            <label>Card Number</label>
            <input type="text" id="cardNumber" placeholder="4532 •••• •••• 8892" value="4532 9821 7712 8892" maxlength="19">
          </div>
          <div class="form-row-2">
            <div class="form-group">
              <label>Expiry Date</label>
              <input type="text" id="cardExpiry" placeholder="MM/YY" value="08/28" maxlength="5">
            </div>
            <div class="form-group">
              <label>CVV / CVC</label>
              <input type="password" id="cardCvv" placeholder="•••" value="842" maxlength="3">
            </div>
          </div>
        </div>

        <!-- Panel 3: Net Banking -->
        <div class="payment-tab-panel" id="panelPayNetBank">
          <label class="filter-label mb-2">Select Your Bank</label>
          <div class="banks-grid">
            <label class="bank-radio-card">
              <input type="radio" name="selectedBank" value="HDFC Bank" checked> HDFC Bank
            </label>
            <label class="bank-radio-card">
              <input type="radio" name="selectedBank" value="State Bank of India"> State Bank of India
            </label>
            <label class="bank-radio-card">
              <input type="radio" name="selectedBank" value="ICICI Bank"> ICICI Bank
            </label>
            <label class="bank-radio-card">
              <input type="radio" name="selectedBank" value="Axis Bank"> Axis Bank
            </label>
            <label class="bank-radio-card">
              <input type="radio" name="selectedBank" value="Kotak Mahindra"> Kotak Mahindra
            </label>
            <label class="bank-radio-card">
              <input type="radio" name="selectedBank" value="Punjab National Bank"> PNB
            </label>
          </div>
        </div>

        <div class="payment-security-pill">
          <i class="fa-solid fa-lock text-success"></i> Payments processed via PCI-DSS Certified Gateway • Instant Tax Invoice
        </div>
      </div>

      <div class="form-group checkbox-group mb-2">
        <label class="custom-checkbox">
          <input type="checkbox" id="bookAgreement" checked required>
          <span class="checkmark"></span>
          <span>I agree to StayNest Student Living Terms, zero-brokerage rules, and verified move-in allotment.</span>
        </label>
      </div>

      <button type="submit" class="btn btn-primary btn-block btn-lg" id="submitBookingBtn">
        <i class="fa-solid fa-lock"></i> Pay ₹${totalAmount.toLocaleString("en-IN")} & Confirm Room
      </button>

    </form>
  `;
}

function switchPaymentTab(method) {
  selectedPaymentMethod = method;
  document.querySelectorAll(".pay-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".payment-tab-panel").forEach(p => p.classList.remove("active"));

  document.getElementById(`tabPay${method}`)?.classList.add("active");
  document.getElementById(`panelPay${method}`)?.classList.add("active");
}

async function handlePaymentAndBookingSubmission(event) {
  event.preventDefault();

  const submitBtn = document.getElementById("submitBookingBtn");
  submitBtn.disabled = true;

  const b = currentBookingState;
  b.studentName = document.getElementById("bookStudentName").value.trim();
  b.studentPhone = document.getElementById("bookStudentPhone").value.trim();
  b.studentEmail = document.getElementById("bookStudentEmail").value.trim();
  b.college = document.getElementById("bookStudentCollege").value.trim();
  b.moveInDate = document.getElementById("bookMoveInDate").value;
  b.bookingDuration = document.getElementById("bookDuration").value;
  const totalAmount = b.rentPrice + b.securityDeposit;

  // Step 1: Processing Animation
  submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing ₹${totalAmount.toLocaleString("en-IN")} via ${selectedPaymentMethod}...`;

  // Simulate banking network roundtrip
  await new Promise(r => setTimeout(r, 1600));

  // Step 2: Concurrency & Inventory check
  const propIndex = StayNestState.properties.findIndex(p => p.id === b.propertyId);
  if (propIndex === -1 || StayNestState.properties[propIndex].availableRooms <= 0) {
    showToast("This room was just booked by another student! Payment has been aborted.", "error");
    submitBtn.disabled = false;
    submitBtn.innerHTML = `Pay ₹${totalAmount.toLocaleString("en-IN")} & Confirm Room`;
    return;
  }

  // Step 3: Verify Payment through API
  const paymentRes = await window.StayNestAPI.verifyPayment({
    amount: totalAmount,
    method: selectedPaymentMethod,
    bookingId: "STAY-2026-" + Math.floor(10000 + Math.random() * 90000),
    studentName: b.studentName
  });

  const uniqueCode = paymentRes.bookingId || ("STAY-2026-" + Math.floor(10000 + Math.random() * 90000));
  const transactionId = paymentRes.transactionId;

  // Step 4: Record Booking in Database
  const newBooking = {
    id: uniqueCode,
    propertyId: b.propertyId,
    propertyName: b.propertyName,
    location: b.location,
    roomType: b.roomType,
    studentId: StayNestState.currentUser.id,
    studentName: b.studentName,
    studentEmail: b.studentEmail,
    studentPhone: b.studentPhone,
    college: b.college,
    ownerId: b.ownerId,
    ownerName: b.ownerName,
    ownerPhone: b.ownerPhone,
    moveInDate: b.moveInDate,
    bookingDuration: b.bookingDuration,
    rentPrice: b.rentPrice,
    securityDeposit: b.securityDeposit,
    amountPaid: totalAmount,
    paymentMethod: selectedPaymentMethod,
    transactionId: transactionId,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  // Decrement inventory
  StayNestState.properties[propIndex].availableRooms -= 1;
  savePropertiesToStorage();

  // Save Booking
  StayNestState.bookings.unshift(newBooking);
  saveBookingsToStorage();

  // Step 5: Dispatch WhatsApp Notification
  const waRes = await window.StayNestAPI.sendWhatsAppNotification({
    to: b.studentPhone,
    templateName: "staynest_booking_confirmed_paid",
    recipientName: b.studentName,
    bookingId: uniqueCode,
    propertyName: b.propertyName,
    location: b.location,
    moveInDate: b.moveInDate,
    rentPrice: totalAmount,
    transactionId: transactionId,
    paymentMethod: selectedPaymentMethod,
    amountPaid: totalAmount,
    status: "PAID & CONFIRMED"
  });

  // Notify Owner on WhatsApp
  await window.StayNestAPI.sendWhatsAppNotification({
    to: b.ownerPhone,
    templateName: "staynest_owner_new_paid_booking",
    recipientName: b.ownerName,
    bookingId: uniqueCode,
    propertyName: b.propertyName,
    location: b.location,
    moveInDate: b.moveInDate,
    rentPrice: b.rentPrice,
    transactionId: transactionId,
    paymentMethod: selectedPaymentMethod,
    amountPaid: totalAmount,
    status: "PAID_STUDENT_ALLOCATED"
  });

  // Step 6: Dispatch Email Confirmation & Tax Invoice
  const emailRes = await window.StayNestAPI.sendEmailConfirmation({
    to: b.studentEmail,
    subject: `StayNest – Booking Confirmation & Tax Invoice (${uniqueCode})`,
    bookingData: newBooking,
    templateType: "confirmed"
  });

  if (waRes.log) StayNestState.notificationLogs.unshift(waRes.log);
  if (emailRes.log) StayNestState.notificationLogs.unshift(emailRes.log);
  updateNotificationBadges();

  // Step 7: Render Success View
  renderBookingSuccessView(newBooking);
}

function renderBookingSuccessView(booking) {
  const container = document.getElementById("bookingModalBody");
  container.innerHTML = `
    <div style="text-align: center; padding: 1.5rem 0;">
      <div style="width: 76px; height: 76px; border-radius: 50%; background: #ECFDF5; color: #10B981; font-size: 2.4rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.2);">
        <i class="fa-solid fa-circle-check"></i>
      </div>

      <div style="display: inline-block; background: #ECFDF5; color: #10B981; font-weight: 700; font-size: 0.8rem; padding: 4px 14px; border-radius: var(--radius-full); margin-bottom: 0.75rem; border: 1px solid rgba(16, 185, 129, 0.3);">
        PAYMENT VERIFIED • STATUS: PAID & RESERVED
      </div>

      <h2 style="font-size: 1.85rem; margin-bottom: 0.35rem;">Room Successfully Booked!</h2>
      <p style="color: var(--color-text-muted); font-size: 0.95rem; max-width: 480px; margin: 0 auto 1.5rem;">
        Your student accommodation at <strong>${booking.propertyName}</strong> is officially confirmed.
      </p>

      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 1.25rem; max-width: 500px; margin: 0 auto 1.5rem; text-align: left;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem; font-size: 0.88rem;">
          <span style="color: var(--color-text-muted);">Booking ID:</span>
          <strong style="color: var(--color-primary);">${booking.id}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem; font-size: 0.88rem;">
          <span style="color: var(--color-text-muted);">Transaction Ref:</span>
          <code style="font-size: 0.8rem; color: #10B981;">${booking.transactionId}</code>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem; font-size: 0.88rem;">
          <span style="color: var(--color-text-muted);">Amount Paid:</span>
          <strong style="color: #10B981; font-size: 1rem;">₹${(booking.amountPaid || booking.rentPrice).toLocaleString("en-IN")} (${booking.paymentMethod})</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.45rem; font-size: 0.88rem;">
          <span style="color: var(--color-text-muted);">Move-In Date:</span>
          <strong>${booking.moveInDate}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
          <span style="color: var(--color-text-muted);">Host Contact:</span>
          <strong>${booking.ownerName} (${booking.ownerPhone})</strong>
        </div>
      </div>

      <div style="background: #E7FCE3; border: 1px solid #C8E6C9; border-radius: var(--radius-md); padding: 0.85rem; max-width: 500px; margin: 0 auto 1.75rem; font-size: 0.85rem; color: #166534; display: flex; align-items: center; gap: 0.75rem; text-align: left;">
        <i class="fa-brands fa-whatsapp" style="font-size: 1.5rem;"></i>
        <span>WhatsApp confirmation & HTML booking invoice sent to <strong>${booking.studentPhone}</strong>.</span>
      </div>

      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn btn-outline" onclick="openReceiptModal('${booking.id}')">
          <i class="fa-solid fa-receipt"></i> View & Print Tax Invoice
        </button>
        <button class="btn btn-primary" onclick="closeModal('bookingModal'); navigateTo('student-dashboard');">
          <i class="fa-solid fa-gauge-high"></i> Go to My Dashboard
        </button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 10. BOOKING RECEIPT & PRINTABLE TAX INVOICE
// ==========================================================================
function openReceiptModal(bookingId) {
  const booking = StayNestState.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const modal = document.getElementById("receiptModal");
  const content = document.getElementById("receiptModalContent");

  content.innerHTML = `
    <div style="padding: 2rem;">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid var(--color-border); padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
        <div>
          <h2 style="font-size: 1.6rem; color: var(--color-navy); margin: 0;">StayNest</h2>
          <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-primary); letter-spacing: 0.08em;">STUDENT ALLOTMENT RECEIPT & TAX INVOICE</span>
        </div>
        <div style="text-align: right;">
          <span class="booking-status-tag status-confirmed">PAID & VERIFIED</span>
          <p style="margin: 0.35rem 0 0; font-size: 0.75rem; color: var(--color-text-muted);">Date: ${new Date(booking.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <table class="custom-table mb-2">
        <tr>
          <th>Booking ID</th>
          <td style="font-weight: 700; color: var(--color-primary);">${booking.id}</td>
        </tr>
        <tr>
          <th>Transaction ID</th>
          <td><code style="color: #10B981; font-weight: 700;">${booking.transactionId || "TXN_ONLINE_VERIFIED"}</code></td>
        </tr>
        <tr>
          <th>Payment Method</th>
          <td><strong>${booking.paymentMethod || "Instant UPI Gateway"}</strong></td>
        </tr>
        <tr>
          <th>Accommodation</th>
          <td><strong>${booking.propertyName}</strong></td>
        </tr>
        <tr>
          <th>Location</th>
          <td>${booking.location}</td>
        </tr>
        <tr>
          <th>Student Name</th>
          <td>${booking.studentName} (${booking.college || "University Student"})</td>
        </tr>
        <tr>
          <th>Student Phone</th>
          <td>${booking.studentPhone}</td>
        </tr>
        <tr>
          <th>Move-In Date</th>
          <td><strong>${booking.moveInDate}</strong></td>
        </tr>
        <tr>
          <th>Stay Duration</th>
          <td>${booking.bookingDuration || "6 Months"}</td>
        </tr>
        <tr>
          <th>Total Amount Paid</th>
          <td style="font-weight: 800; color: #10B981; font-size: 1.1rem;">₹${(booking.amountPaid || booking.rentPrice).toLocaleString("en-IN")}</td>
        </tr>
        <tr>
          <th>Host Contact</th>
          <td>${booking.ownerName} (${booking.ownerPhone})</td>
        </tr>
      </table>

      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); padding: 0.85rem; border-radius: var(--radius-sm); font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
        This document serves as digital proof of room reservation and payment confirmation under StayNest Zero Brokerage Guarantee.
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
        <button class="btn btn-outline" onclick="closeModal('receiptModal')">Close</button>
        <button class="btn btn-primary" onclick="window.print()">
          <i class="fa-solid fa-print"></i> Print Invoice
        </button>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

// ==========================================================================
// 11. STUDENT DASHBOARD
// ==========================================================================
function renderStudentDashboard() {
  const user = StayNestState.currentUser;
  if (!user || user.role === "guest") {
    openAuthModal("login");
    return;
  }

  document.getElementById("studentBannerName").textContent = user.name;
  document.getElementById("studentBannerAvatar").textContent = user.avatar || "RS";
  if (document.getElementById("studentBannerCollege")) {
    document.getElementById("studentBannerCollege").textContent = `${user.college} | Verified Student Account`;
  }

  const studentBookings = StayNestState.bookings.filter(b => b.studentId === user.id || b.studentEmail === user.email);

  document.getElementById("statStudentTotalBookings").textContent = studentBookings.length;
  document.getElementById("statStudentActiveStays").textContent = studentBookings.filter(b => b.status === "confirmed").length;
  document.getElementById("statStudentPendingRequests").textContent = studentBookings.filter(b => b.status === "pending").length;
  document.getElementById("statStudentWishlist").textContent = StayNestState.wishlist.length;

  const bookingsList = document.getElementById("studentBookingsList");
  if (studentBookings.length === 0) {
    bookingsList.innerHTML = `
      <div class="empty-state-card">
        <i class="fa-solid fa-calendar-xmark empty-icon"></i>
        <h3>No Active Bookings Yet</h3>
        <p>Explore verified student accommodations near your campus and reserve your room today.</p>
        <button class="btn btn-primary" onclick="navigateTo('explore')">Explore Rooms</button>
      </div>
    `;
  } else {
    bookingsList.innerHTML = studentBookings.map(b => {
      const prop = StayNestState.properties.find(p => p.id === b.propertyId) || {};
      const img = prop.images ? prop.images[0] : "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=400&q=80";

      return `
        <div class="booking-item-card">
          <div class="booking-thumb">
            <img src="${img}" alt="${b.propertyName}">
          </div>
          <div class="booking-details-col">
            <div style="display: flex; gap: 0.5rem; align-items: center; margin-bottom: 0.25rem;">
              <span class="booking-status-tag status-confirmed">PAID & RESERVED</span>
              <span style="font-size: 0.75rem; color: var(--color-text-light);">ID: ${b.id}</span>
            </div>
            <h4>${b.propertyName}</h4>
            <div class="booking-meta-line">
              <span><i class="fa-solid fa-location-dot"></i> ${b.location}</span>
              <span>•</span>
              <span><i class="fa-solid fa-bed"></i> ${b.roomType}</span>
            </div>
            <div class="booking-meta-line">
              <span><strong>Move-In:</strong> ${b.moveInDate}</span>
              <span>•</span>
              <span><strong>Paid:</strong> ₹${(b.amountPaid || b.rentPrice).toLocaleString("en-IN")} via ${b.paymentMethod || "UPI"}</span>
            </div>
          </div>
          <div class="booking-actions-col">
            <button class="btn btn-outline btn-sm" onclick="openReceiptModal('${b.id}')">
              <i class="fa-solid fa-receipt"></i> Invoice
            </button>
            <a href="https://wa.me/${b.ownerPhone.replace(/\D/g, "")}?text=Hi%20${encodeURIComponent(b.ownerName)},%20regarding%20my%20StayNest%20booking%20${b.id}..." 
               target="_blank" class="btn btn-outline btn-sm">
              <i class="fa-brands fa-whatsapp text-success"></i> WhatsApp Host
            </a>
            ${b.status !== "cancelled" ? `
              <button class="btn btn-outline btn-sm" style="color: var(--color-danger); border-color: rgba(239, 68, 68, 0.3);" onclick="cancelBooking('${b.id}')">
                Cancel
              </button>
            ` : ""}
          </div>
        </div>
      `;
    }).join("");
  }

  // Wishlist
  const wishlistGrid = document.getElementById("studentWishlistGrid");
  const wishlistProps = StayNestState.properties.filter(p => StayNestState.wishlist.includes(p.id));
  if (wishlistProps.length === 0) {
    wishlistGrid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-heart-crack empty-icon"></i>
        <h3>No Saved Stays</h3>
        <p>Click the heart icon on any room listing to add it to your personal wishlist.</p>
      </div>
    `;
  } else {
    wishlistGrid.innerHTML = wishlistProps.map(p => generatePropertyCardHtml(p)).join("");
  }

  // Reviews
  const reviewsContainer = document.getElementById("studentReviewsContainer");
  const studentReviews = StayNestState.reviews.filter(r => r.studentName === user.name);
  if (studentReviews.length === 0) {
    reviewsContainer.innerHTML = `<p style="color: var(--color-text-muted);">You haven't posted any reviews yet.</p>`;
  } else {
    reviewsContainer.innerHTML = studentReviews.map(r => `
      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
          <h4 style="margin: 0;">${r.title}</h4>
          <span style="color: #F59E0B; font-weight: 700;">★ ${r.rating}.0</span>
        </div>
        <p style="color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">${r.comment}</p>
        <span style="font-size: 0.75rem; color: var(--color-text-light);">Submitted on ${r.date}</span>
      </div>
    `).join("");
  }

  // Notifications
  const notifStream = document.getElementById("studentNotificationsStream");
  notifStream.innerHTML = `
    <div class="whatsapp-chat-bubble">
      <div class="wa-bubble-header">
        <span><i class="fa-brands fa-whatsapp"></i> StayNest Official Alerts</span>
        <span>VERIFIED DISPATCH</span>
      </div>
      <p style="margin: 0; line-height: 1.5;">
        Hello ${user.name}! Your payment has been received and verified. Your check-in allotment coordinates are confirmed.
      </p>
      <div class="wa-time">Dispatched via WhatsApp Business Cloud API</div>
    </div>
  `;
}

function cancelBooking(bookingId) {
  if (!confirm("Are you sure you want to cancel this booking? Refund will be initiated to your original payment method.")) return;

  const bIndex = StayNestState.bookings.findIndex(b => b.id === bookingId);
  if (bIndex !== -1) {
    const booking = StayNestState.bookings[bIndex];
    booking.status = "cancelled";
    saveBookingsToStorage();

    const pIndex = StayNestState.properties.findIndex(p => p.id === booking.propertyId);
    if (pIndex !== -1) {
      StayNestState.properties[pIndex].availableRooms += 1;
      savePropertiesToStorage();
    }

    showToast("Booking cancelled. Refund of ₹" + (booking.amountPaid || booking.rentPrice).toLocaleString("en-IN") + " initiated to your account.", "info");
    renderStudentDashboard();
  }
}

function switchStudentTab(tabName, btn) {
  document.querySelectorAll("#view-student-dashboard .dash-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll("#view-student-dashboard .dash-pane").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(`pane-student-${tabName}`)?.classList.add("active");
}

function openStudentTab(tabName) {
  navigateTo("student-dashboard");
  const btn = document.querySelector(`#view-student-dashboard .dash-tab-btn[data-tab="${tabName}"]`);
  if (btn) switchStudentTab(tabName, btn);
}

function handleUpdateStudentProfile(event) {
  event.preventDefault();
  StayNestState.currentUser.name = document.getElementById("profStudentName").value.trim();
  StayNestState.currentUser.phone = document.getElementById("profStudentPhone").value.trim();
  StayNestState.currentUser.college = document.getElementById("profStudentCollege").value.trim();

  updateAuthUI();
  showToast("Profile settings updated successfully!", "success");
}

// ==========================================================================
// 12. PROPERTY OWNER / HOST DASHBOARD
// ==========================================================================
function renderOwnerDashboard() {
  const user = StayNestState.currentUser;
  if (!user || user.role === "guest") {
    openAuthModal("login");
    return;
  }

  document.getElementById("hostBannerName").textContent = user.name;
  document.getElementById("hostBannerAvatar").textContent = user.avatar || "VM";

  const hostProps = StayNestState.properties.filter(p => p.ownerId === user.id || p.ownerName === user.name);
  const hostBookings = StayNestState.bookings.filter(b => b.ownerId === user.id || b.ownerName === user.name);

  const pendingRequests = hostBookings.filter(b => b.status === "pending");
  const confirmedBookings = hostBookings.filter(b => b.status === "confirmed");
  const monthlyRevenue = confirmedBookings.reduce((sum, b) => sum + (b.rentPrice || 0), 0);

  document.getElementById("statHostTotalProps").textContent = hostProps.length;
  document.getElementById("statHostPendingRequests").textContent = pendingRequests.length;
  document.getElementById("statHostActiveTenants").textContent = confirmedBookings.length;
  document.getElementById("statHostRevenue").textContent = `₹${monthlyRevenue.toLocaleString("en-IN")}`;
  document.getElementById("hostRequestsCount").textContent = pendingRequests.length;

  const requestsList = document.getElementById("hostRequestsList");
  if (pendingRequests.length === 0) {
    requestsList.innerHTML = `
      <div class="empty-state-card">
        <i class="fa-solid fa-inbox empty-icon"></i>
        <h3>No Pending Student Applications</h3>
        <p>You have reviewed all incoming student booking requests.</p>
      </div>
    `;
  } else {
    requestsList.innerHTML = pendingRequests.map(r => `
      <div class="host-request-card">
        <div class="req-student-profile">
          <div class="req-avatar">${r.studentName.slice(0, 2).toUpperCase()}</div>
          <div>
            <h4 style="margin: 0 0 0.25rem;">${r.studentName}</h4>
            <p style="margin: 0; font-size: 0.85rem; color: var(--color-text-muted);">
              ${r.college} • Requested for <strong>${r.propertyName}</strong>
            </p>
            <div style="font-size: 0.8rem; margin-top: 0.35rem; color: var(--color-text-main);">
              <strong>Move-In:</strong> ${r.moveInDate} | <strong>Rent:</strong> ₹${r.rentPrice.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline btn-sm text-danger" onclick="handleHostBookingAction('${r.id}', 'rejected')">
            <i class="fa-solid fa-xmark"></i> Reject
          </button>
          <button class="btn btn-primary btn-sm" onclick="handleHostBookingAction('${r.id}', 'confirmed')">
            <i class="fa-solid fa-check"></i> Accept & Confirm
          </button>
        </div>
      </div>
    `).join("");
  }

  // Properties Grid
  const propsGrid = document.getElementById("hostPropertiesGrid");
  if (hostProps.length === 0) {
    propsGrid.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <i class="fa-solid fa-hotel empty-icon"></i>
        <h3>You Have No Properties Listed</h3>
        <p>List your student hostel or PG on StayNest to start accepting verified bookings.</p>
        <button class="btn btn-primary" onclick="openAddPropertyModal()">+ Add New Property</button>
      </div>
    `;
  } else {
    propsGrid.innerHTML = hostProps.map(p => `
      <div class="property-card">
        <div class="prop-img-box">
          <img src="${p.images[0]}" alt="${p.name}">
          <div class="prop-badge-verified">
            ${p.status === "approved" ? "Active Listing" : "Pending Admin Review"}
          </div>
        </div>
        <div class="prop-card-body">
          <div class="prop-meta-row">
            <span class="prop-cat-tag">${p.category}</span>
            <span style="font-weight: 700; color: var(--color-success);">${p.availableRooms} beds available</span>
          </div>
          <h3 class="prop-title">${p.name}</h3>
          <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">${p.location}</p>
          <div class="prop-card-footer">
            <div class="prop-price-wrap">
              <span class="prop-price-val">₹${p.price.toLocaleString("en-IN")}</span>
              <span class="prop-price-unit">per bed</span>
            </div>
            <div class="prop-actions-btns">
              <button class="btn btn-outline btn-sm" onclick="editProperty('${p.id}')">
                <i class="fa-solid fa-pen"></i> Edit
              </button>
              <button class="btn btn-outline btn-sm text-danger" onclick="deleteProperty('${p.id}')">
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Confirmed Tenants Table
  const tenantsWrapper = document.getElementById("hostTenantsTableWrapper");
  if (confirmedBookings.length === 0) {
    tenantsWrapper.innerHTML = `<p style="color: var(--color-text-muted);">No confirmed student tenants yet.</p>`;
  } else {
    tenantsWrapper.innerHTML = `
      <table class="custom-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Phone / WhatsApp</th>
            <th>Property</th>
            <th>Move-In Date</th>
            <th>Paid Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${confirmedBookings.map(b => `
            <tr>
              <td><strong>${b.studentName}</strong></td>
              <td>${b.studentPhone}</td>
              <td>${b.propertyName}</td>
              <td>${b.moveInDate}</td>
              <td style="font-weight: 700; color: #10B981;">₹${(b.amountPaid || b.rentPrice).toLocaleString("en-IN")}</td>
              <td>
                <a href="https://wa.me/${b.studentPhone.replace(/\D/g, "")}" target="_blank" class="btn btn-outline btn-sm">
                  <i class="fa-brands fa-whatsapp text-success"></i> WhatsApp
                </a>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;
  }
}

async function handleHostBookingAction(bookingId, newStatus) {
  const bIndex = StayNestState.bookings.findIndex(b => b.id === bookingId);
  if (bIndex === -1) return;

  const booking = StayNestState.bookings[bIndex];
  booking.status = newStatus;
  saveBookingsToStorage();

  if (newStatus === "rejected") {
    const pIndex = StayNestState.properties.findIndex(p => p.id === booking.propertyId);
    if (pIndex !== -1) {
      StayNestState.properties[pIndex].availableRooms += 1;
      savePropertiesToStorage();
    }
  }

  await window.StayNestAPI.sendWhatsAppNotification({
    to: booking.studentPhone,
    templateName: `staynest_booking_${newStatus}`,
    recipientName: booking.studentName,
    bookingId: booking.id,
    propertyName: booking.propertyName,
    location: booking.location,
    moveInDate: booking.moveInDate,
    rentPrice: booking.rentPrice,
    status: newStatus.toUpperCase()
  });

  await window.StayNestAPI.sendEmailConfirmation({
    to: booking.studentEmail,
    subject: `StayNest – Booking Status Update: ${newStatus.toUpperCase()} (${booking.id})`,
    bookingData: booking,
    templateType: newStatus
  });

  showToast(`Booking ${newStatus.toUpperCase()}! Student notified.`, "success");
  renderOwnerDashboard();
}

function switchHostTab(tabName, btn) {
  document.querySelectorAll("#view-owner-dashboard .dash-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll("#view-owner-dashboard .dash-pane").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(`pane-host-${tabName}`)?.classList.add("active");
}

function openAddPropertyModal() {
  document.getElementById("propModalTitle").innerHTML = `<i class="fa-solid fa-plus-circle text-primary"></i> List New Student Property`;
  document.getElementById("editPropertyId").value = "";
  document.getElementById("addPropertyForm").reset();
  document.getElementById("addPropertyModal").classList.remove("hidden");
}

function editProperty(propId) {
  const prop = StayNestState.properties.find(p => p.id === propId);
  if (!prop) return;

  document.getElementById("propModalTitle").innerHTML = `<i class="fa-solid fa-pen text-primary"></i> Edit Property Details`;
  document.getElementById("editPropertyId").value = prop.id;
  document.getElementById("propName").value = prop.name;
  document.getElementById("propCategory").value = prop.category;
  document.getElementById("propPrice").value = prop.price;
  document.getElementById("propDeposit").value = prop.deposit;
  document.getElementById("propAvailableRooms").value = prop.availableRooms;
  document.getElementById("propLocation").value = prop.location;
  document.getElementById("propCollege").value = prop.college;
  document.getElementById("propGender").value = prop.gender;
  document.getElementById("propRoomType").value = prop.roomType;
  document.getElementById("propImages").value = prop.images.join(", ");
  document.getElementById("propDescription").value = prop.description;

  document.getElementById("addPropertyModal").classList.remove("hidden");
}

function deleteProperty(propId) {
  if (!confirm("Are you sure you want to remove this property listing?")) return;
  StayNestState.properties = StayNestState.properties.filter(p => p.id !== propId);
  savePropertiesToStorage();
  showToast("Property deleted successfully", "info");
  renderOwnerDashboard();
  applyFilters();
}

function handleSaveProperty(event) {
  event.preventDefault();

  const editId = document.getElementById("editPropertyId").value;
  const name = document.getElementById("propName").value.trim();
  const category = document.getElementById("propCategory").value;
  const price = Number(document.getElementById("propPrice").value);
  const deposit = Number(document.getElementById("propDeposit").value) || price;
  const availableRooms = Number(document.getElementById("propAvailableRooms").value);
  const location = document.getElementById("propLocation").value.trim();
  const college = document.getElementById("propCollege").value.trim();
  const gender = document.getElementById("propGender").value;
  const roomType = document.getElementById("propRoomType").value;
  const description = document.getElementById("propDescription").value.trim();

  const imagesRaw = document.getElementById("propImages").value.split(/[\n,]+/).map(s => s.trim()).filter(Boolean);
  const images = imagesRaw.length > 0 ? imagesRaw : [
    "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=1000&q=80"
  ];

  const amenities = [];
  ["AC", "Food", "Wifi", "Bath", "Laundry", "Backup", "CCTV", "Desk", "RO"].forEach(k => {
    const el = document.getElementById(`hostAmenity${k}`);
    if (el && el.checked) {
      if (k === "Bath") amenities.push("Attached Bath");
      else if (k === "Backup") amenities.push("Power Backup");
      else if (k === "Desk") amenities.push("Study Desk");
      else if (k === "RO") amenities.push("Water Purifier");
      else amenities.push(k);
    }
  });

  const currentUser = StayNestState.currentUser;

  if (editId) {
    const idx = StayNestState.properties.findIndex(p => p.id === editId);
    if (idx !== -1) {
      StayNestState.properties[idx] = {
        ...StayNestState.properties[idx],
        name, category, price, deposit, availableRooms, location, college, gender, roomType, description, images, amenities
      };
      showToast("Property updated successfully!", "success");
    }
  } else {
    const newProp = {
      id: "prop-custom-" + Date.now(),
      name,
      category,
      price,
      deposit,
      location,
      college,
      distanceKm: 0.5,
      gender,
      roomType,
      availableRooms,
      totalRooms: availableRooms,
      rating: 5.0,
      reviewCount: 0,
      verified: true,
      ownerId: currentUser.id || "user_owner_1",
      ownerName: currentUser.name || "StayNest Host",
      ownerPhone: currentUser.phone || "+91 98112 34567",
      status: "approved",
      images,
      amenities,
      description,
      rules: "Curfew: 10:30 PM • ID card required • Silent hours after 11 PM."
    };

    StayNestState.properties.unshift(newProp);
    showToast("Property published successfully and live on StayNest!", "success");
  }

  savePropertiesToStorage();
  closeModal("addPropertyModal");
  renderOwnerDashboard();
  applyFilters();
}

// ==========================================================================
// 13. ADMINISTRATOR DASHBOARD
// ==========================================================================
function renderAdminDashboard() {
  const allProps = StayNestState.properties;
  const allBookings = StayNestState.bookings;
  const pendingApprovals = allProps.filter(p => p.status === "pending");

  document.getElementById("adminStatUsers").textContent = "4,180";
  document.getElementById("adminStatProps").textContent = allProps.length;
  document.getElementById("adminStatPendingApprovals").textContent = pendingApprovals.length;
  document.getElementById("adminStatBookings").textContent = allBookings.length;

  const approvalsContainer = document.getElementById("adminApprovalsContainer");
  if (pendingApprovals.length === 0) {
    approvalsContainer.innerHTML = `
      <div class="empty-state-card">
        <i class="fa-solid fa-check-double empty-icon" style="color: var(--color-success);"></i>
        <h3>All Property Listings Approved</h3>
        <p>There are no host accommodations pending admin review.</p>
      </div>
    `;
  } else {
    approvalsContainer.innerHTML = pendingApprovals.map(p => `
      <div class="host-request-card mb-2">
        <div style="display: flex; gap: 1rem; align-items: center;">
          <img src="${p.images[0]}" alt="${p.name}" style="width: 80px; height: 60px; object-fit: cover; border-radius: var(--radius-sm);">
          <div>
            <h4 style="margin: 0;">${p.name}</h4>
            <span style="font-size: 0.8rem; color: var(--color-text-muted);">
              ${p.ownerName} (${p.ownerPhone}) • ${p.location}
            </span>
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button class="btn btn-outline btn-sm text-danger" onclick="handleAdminPropertyAction('${p.id}', 'rejected')">Reject</button>
          <button class="btn btn-primary btn-sm" onclick="handleAdminPropertyAction('${p.id}', 'approved')">Approve</button>
        </div>
      </div>
    `).join("");
  }

  // All Bookings
  const bookingsTable = document.getElementById("adminBookingsTable");
  bookingsTable.innerHTML = `
    <table class="custom-table">
      <thead>
        <tr>
          <th>Booking ID</th>
          <th>Student</th>
          <th>Property</th>
          <th>Move-In Date</th>
          <th>Paid Amount</th>
          <th>Status</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        ${allBookings.map(b => `
          <tr>
            <td><strong>${b.id}</strong></td>
            <td>${b.studentName}</td>
            <td>${b.propertyName}</td>
            <td>${b.moveInDate}</td>
            <td style="font-weight: 700; color: #10B981;">₹${(b.amountPaid || b.rentPrice).toLocaleString("en-IN")}</td>
            <td><span class="booking-status-tag status-confirmed">PAID</span></td>
            <td>${b.paymentMethod || "UPI"}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;

  // Users Directory
  const usersTable = document.getElementById("adminUsersTable");
  usersTable.innerHTML = `
    <table class="custom-table">
      <thead>
        <tr>
          <th>User Name</th>
          <th>Email Address</th>
          <th>Phone</th>
          <th>Role</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Rohan Sharma</strong></td>
          <td>rohan.student@staynest.com</td>
          <td>+91 98765 43210</td>
          <td><span class="amenity-pill">Student</span></td>
          <td><span class="text-success font-weight-bold">Active</span></td>
        </tr>
        <tr>
          <td><strong>Vikram Malhotra</strong></td>
          <td>vikram.malhotra@apexresidences.in</td>
          <td>+91 98112 34567</td>
          <td><span class="amenity-pill">Host / Landlord</span></td>
          <td><span class="text-success font-weight-bold">Active</span></td>
        </tr>
      </tbody>
    </table>
  `;

  renderGatewayDiagnostics();
}

function handleAdminPropertyAction(propId, newStatus) {
  const pIndex = StayNestState.properties.findIndex(p => p.id === propId);
  if (pIndex !== -1) {
    StayNestState.properties[pIndex].status = newStatus;
    savePropertiesToStorage();
    showToast(`Property listing marked as ${newStatus}!`, "success");
    renderAdminDashboard();
    applyFilters();
  }
}

function switchAdminTab(tabName, btn) {
  document.querySelectorAll("#view-admin-dashboard .dash-tab-btn").forEach(b => b.classList.remove("active"));
  document.querySelectorAll("#view-admin-dashboard .dash-pane").forEach(p => p.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(`pane-admin-${tabName}`)?.classList.add("active");
}

function renderGatewayDiagnostics() {
  const cards = document.getElementById("gatewayStatusCards");
  const audit = document.getElementById("adminNotificationAudit");

  cards.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fa-brands fa-whatsapp text-success" style="font-size: 1.4rem;"></i>
          <h4 style="margin: 0;">WhatsApp Cloud API & Webhook</h4>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">
          Backend endpoint: <code>/api/whatsapp/send</code>
        </p>
        <span class="amenity-pill" style="background: #ECFDF5; color: #10B981; border-color: #10B981;">
          Dispatcher Active
        </span>
      </div>

      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem;">
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fa-solid fa-credit-card text-primary" style="font-size: 1.4rem;"></i>
          <h4 style="margin: 0;">Payment Gateway (UPI, Card, NetBank)</h4>
        </div>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">
          Backend verification: <code>/api/payments/verify</code>
        </p>
        <span class="amenity-pill" style="background: #EAF2FF; color: #2563EB; border-color: #2563EB;">
          256-Bit SSL Gateway Active
        </span>
      </div>
    </div>
  `;

  const logs = StayNestState.notificationLogs;
  audit.innerHTML = `
    <table class="custom-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Channel</th>
          <th>Recipient</th>
          <th>Details</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${logs.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted);">No outbound notifications recorded yet. Complete a booking to test dispatch.</td></tr>` : ""}
        ${logs.map(l => `
          <tr>
            <td>${new Date(l.timestamp).toLocaleTimeString()}</td>
            <td><strong>${l.type.toUpperCase()}</strong></td>
            <td>${l.recipient}</td>
            <td>${l.template || l.subject}</td>
            <td><span class="amenity-pill text-success">${l.status}</span></td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

// ==========================================================================
// 14. WISHLIST MANAGEMENT
// ==========================================================================
function toggleWishlist(propId, event) {
  if (event) event.stopPropagation();

  const idx = StayNestState.wishlist.indexOf(propId);
  if (idx === -1) {
    StayNestState.wishlist.push(propId);
    showToast("Added to your saved stays wishlist!", "success");
  } else {
    StayNestState.wishlist.splice(idx, 1);
    showToast("Removed from wishlist", "info");
  }

  localStorage.setItem("staynest_wishlist", JSON.stringify(StayNestState.wishlist));
  updateWishlistBadges();

  document.querySelectorAll(`.property-card[data-id="${propId}"] .wishlist-toggle-btn`).forEach(btn => {
    btn.classList.toggle("active", idx === -1);
    btn.innerHTML = `<i class="${idx === -1 ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
  });

  renderWishlistDrawerItems();
}

function updateWishlistBadges() {
  const count = StayNestState.wishlist.length;
  const headerBadge = document.getElementById("wishlistCountBadge");
  const drawerCount = document.getElementById("drawerWishlistCount");
  if (headerBadge) headerBadge.textContent = count;
  if (drawerCount) drawerCount.textContent = count;
}

function openWishlistDrawer() {
  renderWishlistDrawerItems();
  document.getElementById("wishlistDrawer").classList.remove("hidden");
}

function closeWishlistDrawer() {
  document.getElementById("wishlistDrawer").classList.add("hidden");
}

function renderWishlistDrawerItems() {
  const container = document.getElementById("drawerWishlistList");
  if (!container) return;

  const props = StayNestState.properties.filter(p => StayNestState.wishlist.includes(p.id));

  if (props.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem;">
        <i class="fa-regular fa-heart empty-icon" style="font-size: 2.5rem; color: var(--color-text-light); margin-bottom: 1rem;"></i>
        <h4 style="margin-bottom: 0.5rem;">Your Wishlist is Empty</h4>
        <p style="color: var(--color-text-muted); font-size: 0.88rem;">Save your favorite PGs and hostels here to view them anytime.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = props.map(p => `
    <div style="display: flex; gap: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 1rem; align-items: center; background: var(--color-surface);">
      <img src="${p.images[0]}" alt="${p.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: var(--radius-sm);">
      <div style="flex: 1;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.2rem;">${p.name}</h4>
        <div style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 0.25rem;">${p.location}</div>
        <div style="font-weight: 700; color: var(--color-primary); font-size: 0.95rem;">₹${p.price.toLocaleString("en-IN")}/mo</div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.35rem;">
        <button class="btn btn-primary btn-sm" onclick="closeWishlistDrawer(); startBookingFlow('${p.id}')">Book</button>
        <button class="btn btn-outline btn-sm text-danger" onclick="toggleWishlist('${p.id}', event)">Remove</button>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// 15. NOTIFICATION CENTER & LIVE WHATSAPP / EMAIL SIMULATOR
// ==========================================================================
function openNotificationDrawer() {
  document.getElementById("notificationDrawer").classList.remove("hidden");
  renderNotificationDrawerContent("whatsapp");
}

function closeNotificationDrawer() {
  document.getElementById("notificationDrawer").classList.add("hidden");
}

function switchNotifView(viewName, btn) {
  document.querySelectorAll(".notif-tab").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderNotificationDrawerContent(viewName);
}

function renderNotificationDrawerContent(viewName) {
  const container = document.getElementById("notifViewContent");
  if (!container) return;

  const logs = StayNestState.notificationLogs;

  if (viewName === "whatsapp") {
    const waLogs = logs.filter(l => l.type === "whatsapp");
    if (waLogs.length === 0) {
      container.innerHTML = `
        <div class="whatsapp-chat-bubble">
          <div class="wa-bubble-header">
            <span><i class="fa-brands fa-whatsapp"></i> StayNest Cloud API Live Channel</span>
            <span>READY</span>
          </div>
          <p style="margin: 0; line-height: 1.5;">
            Official StayNest WhatsApp Dispatcher active. When students place and pay for reservations, instant booking confirmations and tax receipts are dispatched here.
          </p>
          <div class="wa-time">WhatsApp Business Cloud API Connected</div>
        </div>
      `;
      return;
    }

    container.innerHTML = waLogs.map(l => `
      <div class="whatsapp-chat-bubble">
        <div class="wa-bubble-header">
          <span><i class="fa-brands fa-whatsapp"></i> StayNest Official (${l.template})</span>
          <span>${new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
        <p style="margin: 0; line-height: 1.5; font-size: 0.88rem;">
          ${l.payloadPreview}
        </p>
        <div class="wa-time">
          Status: <strong>${l.status}</strong> • Recipient: <strong>${l.recipient}</strong>
        </div>
      </div>
    `).join("");

  } else if (viewName === "email") {
    const emLogs = logs.filter(l => l.type === "email");
    if (emLogs.length === 0) {
      container.innerHTML = `
        <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem;">
          <h4 style="margin: 0 0 0.5rem;"><i class="fa-regular fa-envelope text-primary"></i> HTML Tax Invoice Email Service</h4>
          <p style="font-size: 0.85rem; color: var(--color-text-muted); line-height: 1.5;">
            Responsive HTML invoices and paid allotment confirmations are rendered upon room booking.
          </p>
        </div>
      `;
      return;
    }

    container.innerHTML = emLogs.map(l => `
      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem; font-size: 0.78rem; color: var(--color-text-muted);">
          <span>To: <strong>${l.recipient}</strong></span>
          <span>${new Date(l.timestamp).toLocaleTimeString()}</span>
        </div>
        <h4 style="margin: 0 0 0.5rem; font-size: 0.95rem;">${l.subject}</h4>
        <p style="font-size: 0.85rem; color: var(--color-text-muted); margin-bottom: 0.75rem;">${l.previewText}</p>
        <button class="btn btn-outline btn-sm" onclick="showHtmlEmailPreview('${l.id}')">
          <i class="fa-solid fa-code"></i> Preview Rendered HTML
        </button>
      </div>
    `).join("");

  } else {
    container.innerHTML = `
      <div style="background: var(--color-surface-subtle); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="margin: 0 0 0.75rem;">Backend Integration Status</h4>
        <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.85rem;">
          <div><strong>Express Server Gateway:</strong> <span class="text-success">Connected (Port 5000)</span></div>
          <div><strong>Payment Gateway:</strong> <span class="text-success">UPI / Card / NetBanking Active</span></div>
          <div><strong>WhatsApp Cloud API:</strong> <span class="text-accent">Live Simulator Ready</span></div>
          <div><strong>Database:</strong> <span class="text-success">Firestore Client Ready</span></div>
        </div>
      </div>
    `;
  }
}

function showHtmlEmailPreview(logId) {
  const entry = StayNestState.notificationLogs.find(l => l.id === logId);
  if (!entry || !entry.htmlPreview) return;

  const w = window.open("", "_blank");
  w.document.write(entry.htmlPreview);
  w.document.close();
}

function updateNotificationBadges() {
  const count = StayNestState.notificationLogs.length;
  const b2 = document.getElementById("headerNotifBadge");
  if (b2) b2.textContent = count;
}

// ==========================================================================
// 16. REVIEWS & RATINGS MODAL
// ==========================================================================
function openReviewModal(propId) {
  if (!StayNestState.currentUser || StayNestState.currentUser.role === "guest") {
    openAuthModal("login");
    showToast("Please sign in to post a verified review.", "info");
    return;
  }

  const prop = StayNestState.properties.find(p => p.id === propId);
  if (!prop) return;

  document.getElementById("reviewPropertyId").value = propId;
  document.getElementById("reviewPropTargetName").textContent = `Reviewing: ${prop.name}`;
  document.getElementById("writeReviewModal").classList.remove("hidden");
}

function setRatingValue(val) {
  document.getElementById("selectedStarValue").value = val;
  document.querySelectorAll("#starRatingInput .star-btn").forEach((star, index) => {
    star.classList.toggle("active", index < val);
  });
}

function handleSubmitReview(event) {
  event.preventDefault();

  const propId = document.getElementById("reviewPropertyId").value;
  const rating = Number(document.getElementById("selectedStarValue").value);
  const title = document.getElementById("reviewTitle").value.trim();
  const comment = document.getElementById("reviewComment").value.trim();

  const newReview = {
    id: "rev_" + Date.now(),
    propertyId: propId,
    studentName: StayNestState.currentUser.name,
    rating,
    title,
    comment,
    date: new Date().toISOString().split("T")[0],
    verifiedStay: true
  };

  StayNestState.reviews.unshift(newReview);
  localStorage.setItem("staynest_reviews", JSON.stringify(StayNestState.reviews));

  const pIndex = StayNestState.properties.findIndex(p => p.id === propId);
  if (pIndex !== -1) {
    const prop = StayNestState.properties[pIndex];
    prop.reviewCount += 1;
    prop.rating = Number(((prop.rating * (prop.reviewCount - 1) + rating) / prop.reviewCount).toFixed(1));
    savePropertiesToStorage();
  }

  closeModal("writeReviewModal");
  showToast("Your review has been verified and posted!", "success");
  openPropertyDetails(propId);
}

// ==========================================================================
// 17. LEGAL & POLICY MODALS
// ==========================================================================
function openPolicyModal(type) {
  const modal = document.getElementById("policyModal");
  const content = document.getElementById("policyModalContent");

  const policies = {
    terms: {
      title: "StayNest Student Terms & Conditions",
      body: `
        <p>1. <strong>Zero Brokerage Guarantee:</strong> StayNest connects verified students directly with property managers without any brokerage fees.</p>
        <p>2. <strong>Identity Verification:</strong> Every student occupant must furnish legitimate college enrollment proof and government ID upon room move-in.</p>
        <p>3. <strong>Hostel Conduct:</strong> Strict adherence to campus quiet hours, anti-ragging mandates, and host curfew policies is mandatory.</p>
        <p>4. <strong>Security Deposit:</strong> All security deposits are held under the StayNest verified protection policy.</p>
      `
    },
    privacy: {
      title: "StayNest Privacy & Data Protection",
      body: `
        <p>1. <strong>WhatsApp Consent:</strong> By booking, students grant consent to receive automated booking coordinates and check-in receipts via WhatsApp Business Cloud API.</p>
        <p>2. <strong>Data Encryption:</strong> All personal credentials, phone numbers, and payment transactions are secured with 256-bit SSL encryption.</p>
        <p>3. <strong>Zero Spam:</strong> We never sell student data to third-party commercial brokers.</p>
      `
    },
    cancellation: {
      title: "Cancellation & Refund Policy",
      body: `
        <p>1. <strong>Full Refund:</strong> Cancel up to 48 hours before scheduled move-in date for 100% refund of any prepaid deposits.</p>
        <p>2. <strong>Notice Period:</strong> Standard student accommodation lease requires 30 days advance notice before checkout.</p>
        <p>3. <strong>Payment Reversal:</strong> Refunds are credited automatically to original UPI or Card accounts within 3–5 working days.</p>
      `
    },
    faq: {
      title: "Frequently Asked Questions (FAQ)",
      body: `
        <p><strong>Q: Are all accommodations verified?</strong><br>Yes, our local student housing audit teams visit each PG and hostel in person to verify clean water, Wi-Fi speeds, and security.</p>
        <p><strong>Q: What payment methods are supported?</strong><br>We support Google Pay, PhonePe, Paytm, BHIM UPI, Visa, MasterCard, RuPay, and Net Banking across all major Indian banks.</p>
        <p><strong>Q: How do WhatsApp confirmations work?</strong><br>The moment your reservation and payment are processed, our automated backend triggers official booking receipts directly to your WhatsApp number.</p>
      `
    }
  };

  const p = policies[type] || policies.terms;

  content.innerHTML = `
    <div style="padding: 2rem;">
      <h2 style="margin-bottom: 1rem;">${p.title}</h2>
      <div style="color: var(--color-text-muted); font-size: 0.92rem; line-height: 1.7; margin-bottom: 1.5rem;">
        ${p.body}
      </div>
      <button class="btn btn-primary" onclick="closeModal('policyModal')">Understood</button>
    </div>
  `;

  modal.classList.remove("hidden");
}

// ==========================================================================
// 18. MODAL HELPERS & UTILITIES
// ==========================================================================
function closeModal(modalId) {
  document.getElementById(modalId)?.classList.add("hidden");
}

function handleBackdropClick(event, modalId) {
  if (event.target.id === modalId) {
    closeModal(modalId);
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;

  const icon = type === "success" ? "fa-circle-check text-success" :
               type === "error" ? "fa-circle-exclamation text-danger" : "fa-circle-info text-primary";

  toast.innerHTML = `
    <i class="fa-solid ${icon}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(20px)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

async function checkBackendHealth() {
  const res = await window.StayNestAPI.checkHealth();
  console.log("[StayNest Platform Initialized]", res);
}

function setupEventListeners() {
  document.addEventListener("click", e => {
    const userDropdown = document.getElementById("userDropdownMenu");
    const trigger = document.getElementById("userDropdownTrigger");
    if (userDropdown && !userDropdown.contains(e.target) && !trigger?.contains(e.target)) {
      userDropdown.classList.remove("show");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach(m => m.classList.add("hidden"));
    }
  });
}
