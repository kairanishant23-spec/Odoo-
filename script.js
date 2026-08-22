/**
 * GlobeTrotter — Smart Travel Planning & Trip Management
 * Core Application Logic, Reactive State & Interactive Controllers
 */

// ====================================================
// INITIAL SAMPLE DATA & STATE STORE
// ====================================================

const AppState = {
  currentUser: {
    name: "Alex Rivera",
    email: "alex.rivera@globetrotter.io",
    role: "Pro Explorer",
    city: "San Francisco",
    country: "United States",
    bio: "Curator of high-altitude treks, artisan espresso roasters, and slow rail journeys across Europe and East Asia.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    stats: {
      countries: 18,
      cities: 42,
      trips: 14,
      distance: "38,400 km"
    }
  },

  activeTripId: "trip-1",
  activeDayIndex: 0,
  calendarCurrentDate: new Date(2026, 9, 1), // Oct 2026
  calendarSelectedDate: "2026-10-12",

  // Top Global Destinations Data
  destinations: [
    {
      id: "dest-1",
      city: "Tokyo",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80",
      description: "Neon-lit skyscrapers blend with serene wooden temples, Michelin ramen stalls, and tranquil gardens.",
      rating: "4.9",
      duration: "5–8 Days",
      budgetCategory: "moderate",
      dailyCost: 145,
      activityStyle: "Culture",
      attractions: ["Shibuya Crossing", "Meiji Shrine", "Akihabara", "Tsukiji Market"],
      liked: true
    },
    {
      id: "dest-2",
      city: "Paris",
      country: "France",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      description: "Iconic boulevards, world-class art collections at the Louvre, and intimate sidewalk cafes in Montmartre.",
      rating: "4.8",
      duration: "4–7 Days",
      budgetCategory: "luxury",
      dailyCost: 220,
      activityStyle: "Culture",
      attractions: ["Eiffel Tower", "Louvre Museum", "Sainte-Chapelle", "Seine Cruise"],
      liked: false
    },
    {
      id: "dest-3",
      city: "Manali",
      country: "India",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      description: "Pristine Himalayan valleys, snow-dusted pine forests, high-altitude passes, and riverside apple orchards.",
      rating: "4.7",
      duration: "3–6 Days",
      budgetCategory: "budget",
      dailyCost: 45,
      activityStyle: "Adventure",
      attractions: ["Solang Valley", "Rohtang Pass", "Old Manali Cafes", "Jogini Waterfall"],
      liked: true
    },
    {
      id: "dest-4",
      city: "Bali",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
      description: "Lush terraced rice paddies, spiritual cliffside temples, world-class surf breaks, and serene wellness retreats.",
      rating: "4.9",
      duration: "7–12 Days",
      budgetCategory: "budget",
      dailyCost: 65,
      activityStyle: "Beaches",
      attractions: ["Ubud Monkey Forest", "Uluwatu Temple", "Canggu Beach", "Tegallalang Rice Terraces"],
      liked: false
    },
    {
      id: "dest-5",
      city: "Rome",
      country: "Italy",
      image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
      description: "An open-air museum of ancient ruins, Renaissance piazzas, artisanal gelato, and golden sunsets over the Tiber.",
      rating: "4.8",
      duration: "4–6 Days",
      budgetCategory: "moderate",
      dailyCost: 160,
      activityStyle: "Culture",
      attractions: ["Colosseum", "Vatican City", "Trevi Fountain", "Pantheon"],
      liked: false
    },
    {
      id: "dest-6",
      city: "Dubai",
      country: "UAE",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80",
      description: "Futuristic architecture, luxury desert safaris, sky-high observation decks, and traditional gold souks.",
      rating: "4.7",
      duration: "4–5 Days",
      budgetCategory: "luxury",
      dailyCost: 260,
      activityStyle: "City",
      attractions: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Desert Dune Safari"],
      liked: false
    },
    {
      id: "dest-7",
      city: "Goa",
      country: "India",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      description: "Sun-drenched Arabian Sea coastlines, Portuguese colonial villas, fresh seafood shacks, and vibrant night markets.",
      rating: "4.6",
      duration: "4–7 Days",
      budgetCategory: "budget",
      dailyCost: 50,
      activityStyle: "Beaches",
      attractions: ["Palolem Beach", "Fort Aguada", "Anjuna Flea Market", "Fontainhas Latin Quarter"],
      liked: true
    },
    {
      id: "dest-8",
      city: "New York",
      country: "USA",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
      description: "The electric metropolis of Broadway theatre, Central Park strolls, skyline vistas, and world-class museums.",
      rating: "4.9",
      duration: "5–7 Days",
      budgetCategory: "luxury",
      dailyCost: 290,
      activityStyle: "City",
      attractions: ["Central Park", "Metropolitan Museum", "Times Square", "Brooklyn Bridge"],
      liked: false
    },
    {
      id: "dest-9",
      city: "London",
      country: "UK",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80",
      description: "Historic royal landmarks, West End theater district, leafy royal parks, and buzzing Borough Market.",
      rating: "4.8",
      duration: "5–8 Days",
      budgetCategory: "luxury",
      dailyCost: 240,
      activityStyle: "Culture",
      attractions: ["Big Ben", "Tower Bridge", "British Museum", "Hyde Park"],
      liked: false
    },
    {
      id: "dest-10",
      city: "Bangkok",
      country: "Thailand",
      image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
      description: "Gilded riverside temples, canal longboats, sizzling street food stalls, and vibrant night bazaars.",
      rating: "4.7",
      duration: "4–6 Days",
      budgetCategory: "budget",
      dailyCost: 55,
      activityStyle: "Food",
      attractions: ["Grand Palace", "Wat Arun", "Chatuchak Market", "Chinatown Street Eats"],
      liked: false
    }
  ],

  // User Trips Data
  trips: [
    {
      id: "trip-1",
      name: "Japan Autumn Odyssey 2026",
      coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
      startDate: "2026-10-10",
      endDate: "2026-10-22",
      durationDays: 12,
      travelers: 2,
      travelType: "Couple",
      status: "upcoming", // ongoing, upcoming, completed
      cities: ["Tokyo", "Hakone", "Kyoto", "Osaka"],
      interests: ["Food", "Culture", "Nature", "Relaxation"],
      estimatedBudget: 3800,
      actualSpend: 2410,
      progressPercent: 63,
      days: [
        {
          dayNumber: 1,
          dateString: "Monday, October 10",
          city: "Tokyo",
          title: "Bonjour Tokyo: Shinjuku & Ramen",
          description: "Arrival at Haneda, hotel check-in at Shinjuku, local Ramen discovery, and Tokyo Metropolitan Government Building skyline view.",
          activities: [
            {
              id: "act-101",
              time: "10:30 AM",
              duration: "1.5 hrs",
              title: "Check-in at Hotel Gracery Shinjuku",
              location: "1-19-1 Kabukicho, Shinjuku",
              category: "Stay",
              cost: 0,
              image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80",
              notes: "Requested high floor view overlooking Godzilla statue."
            },
            {
              id: "act-102",
              time: "01:00 PM",
              duration: "1 hr",
              title: "Tonkotsu Ramen Lunch at Fuunji",
              location: "2-14-3 Yoyogi, Shibuya",
              category: "Food",
              cost: 24,
              image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=300&q=80",
              notes: "Legendary dipping tsukemen ramen. Cash tickets at vending machine."
            },
            {
              id: "act-103",
              time: "04:30 PM",
              duration: "2.5 hrs",
              title: "Tokyo Metropolitan Skyline Observation",
              location: "2-8-1 Nishishinjuku, Shinjuku",
              category: "Sightseeing",
              cost: 0,
              image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80",
              notes: "Free panoramic observation deck on the 45th floor. Catch golden hour!"
            },
            {
              id: "act-104",
              time: "07:30 PM",
              duration: "2 hrs",
              title: "Omoide Yokocho Yakitori Alley",
              location: "1 Chome Nishishinjuku",
              category: "Food",
              cost: 45,
              image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80",
              notes: "Atmospheric lantern-lit alleyway with charcoal skewers and craft beer."
            }
          ]
        },
        {
          dayNumber: 2,
          dateString: "Tuesday, October 11",
          city: "Tokyo",
          title: "Temples & Digital Art Dreams",
          description: "Morning at historic Senso-ji, Asakusa street sweets, and immersive teamLab Planets installation.",
          activities: [
            {
              id: "act-201",
              time: "09:00 AM",
              duration: "2 hrs",
              title: "Senso-ji Temple & Nakamise Dori",
              location: "2-3-1 Asakusa, Taito",
              category: "Sightseeing",
              cost: 15,
              image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=300&q=80",
              notes: "Tokyo's oldest temple. Pick up fresh melonpan."
            },
            {
              id: "act-202",
              time: "02:00 PM",
              duration: "3 hrs",
              title: "teamLab Planets Tokyo Interactive",
              location: "6-1-16 Toyosu, Koto",
              category: "Activity",
              cost: 72,
              image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=300&q=80",
              notes: "Walk through water and mirror rooms barefoot. Pre-booked."
            }
          ]
        },
        {
          dayNumber: 3,
          dateString: "Wednesday, October 12",
          city: "Hakone",
          title: "Mount Fuji Views & Onsen Sanctuary",
          description: "Romancecar train from Shinjuku to Hakone-Yumoto, Lake Ashi pirate boat, and hot spring ryokan dinner.",
          activities: [
            {
              id: "act-301",
              time: "08:30 AM",
              duration: "1.5 hrs",
              title: "Odakyu Romancecar to Hakone",
              location: "Shinjuku Station Platform 2",
              category: "Transport",
              cost: 48,
              image: "https://images.unsplash.com/photo-1532105956626-9569c03602f6?auto=format&fit=crop&w=300&q=80",
              notes: "Reserved front observation seats."
            },
            {
              id: "act-302",
              time: "01:30 PM",
              duration: "2 hrs",
              title: "Lake Ashi Sightseeing Cruise & Torii Gate",
              location: "Hakone Peace Torii, Lake Ashi",
              category: "Sightseeing",
              cost: 22,
              image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=300&q=80",
              notes: "Catch the floating vermillion torii gate against Mount Fuji."
            }
          ]
        },
        {
          dayNumber: 4,
          dateString: "Thursday, October 13",
          city: "Kyoto",
          title: "Arashiyama Bamboo & River Stroll",
          description: "Bullet train to Kyoto, Tenryu-ji Zen garden, Arashiyama Bamboo Grove, and % Arabica matcha.",
          activities: [
            {
              id: "act-401",
              time: "10:00 AM",
              duration: "2.5 hrs",
              title: "Arashiyama Bamboo Forest & Tenryu-ji",
              location: "Sagaogurayama Tabuchiyamacho, Ukyo",
              category: "Sightseeing",
              cost: 12,
              image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80",
              notes: "Arrive early before tour buses. Zen garden UNESCO heritage."
            }
          ]
        }
      ]
    },
    {
      id: "trip-2",
      name: "Weekend in Manali",
      coverImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
      startDate: "2026-08-28",
      endDate: "2026-09-02",
      durationDays: 5,
      travelers: 4,
      travelType: "Friends",
      status: "ongoing",
      cities: ["Manali", "Solang Valley", "Kasol"],
      interests: ["Adventure", "Nature", "Food"],
      estimatedBudget: 950,
      actualSpend: 720,
      progressPercent: 76,
      days: []
    },
    {
      id: "trip-3",
      name: "European Summer Escape",
      coverImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
      startDate: "2026-06-12",
      endDate: "2026-06-26",
      durationDays: 14,
      travelers: 2,
      travelType: "Couple",
      status: "completed",
      cities: ["Paris", "Amsterdam", "Rome"],
      interests: ["History", "Food", "Shopping"],
      estimatedBudget: 4600,
      actualSpend: 4420,
      progressPercent: 100,
      days: []
    },
    {
      id: "trip-4",
      name: "Goa Beach & Heritage Trail",
      coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      startDate: "2026-11-18",
      endDate: "2026-11-24",
      durationDays: 6,
      travelers: 1,
      travelType: "Solo",
      status: "upcoming",
      cities: ["Panaji", "Palolem", "Vagator"],
      interests: ["Relaxation", "Food", "Nightlife"],
      estimatedBudget: 650,
      actualSpend: 150,
      progressPercent: 23,
      days: []
    }
  ],

  // Expense Ledger Items
  expenses: [
    { id: "exp-1", tripId: "trip-1", name: "ANA Flight Tickets (SFO to HND)", category: "Transport", amount: 1240.00, date: "2026-09-01", method: "Credit Card", notes: "Round-trip economy tickets." },
    { id: "exp-2", tripId: "trip-1", name: "Hotel Gracery Shinjuku (4 Nights)", category: "Accommodation", amount: 580.00, date: "2026-09-10", method: "Credit Card", notes: "Pre-paid with breakfast." },
    { id: "exp-3", tripId: "trip-1", name: "JR 7-Day National Rail Passes", category: "Transport", amount: 360.00, date: "2026-09-15", method: "Apple Pay", notes: "Exchange voucher purchased online." },
    { id: "exp-4", tripId: "trip-1", name: "teamLab Planets Tokyo Entry (x2)", category: "Activities", amount: 72.00, date: "2026-10-02", method: "Credit Card", notes: "Timed morning entry." },
    { id: "exp-5", tripId: "trip-1", name: "Fuunji Tsukemen Ramen & Gyoza", category: "Food", amount: 24.00, date: "2026-10-10", method: "Cash / Local FX", notes: "First lunch in Tokyo." },
    { id: "exp-6", tripId: "trip-1", name: "Omoide Yokocho Dinner & Beer", category: "Food", amount: 45.00, date: "2026-10-10", method: "Cash / Local FX", notes: "Yakitori evening tab." },
    { id: "exp-7", tripId: "trip-1", name: "Tokyo Metro 72-hr Pass", category: "Transport", amount: 28.00, date: "2026-10-10", method: "Credit Card", notes: "Subway passes." },
    { id: "exp-8", tripId: "trip-1", name: "Pocket WiFi 14-Day Rental", category: "Other", amount: 61.00, date: "2026-09-28", method: "Credit Card", notes: "Airport pickup at Haneda." }
  ],

  // Community Stories
  communityStories: [
    {
      id: "comm-1",
      title: "10 Days Across Japanese Alps: Takayama, Shirakawa-go & Onsens",
      destination: "Japan (Tokyo · Takayama · Kyoto)",
      duration: "10 Days",
      authorName: "Maya Kapoor",
      authorCity: "Delhi, India",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      coverImage: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80",
      description: "A slow autumn trek through thatched roof villages, mountain sake breweries, and hidden hot spring ryokans.",
      tag: "Featured",
      likes: 148,
      saves: 62,
      isLiked: true,
      isSaved: true
    },
    {
      id: "comm-2",
      title: "Portugal Roadtrip: One Pastel de Nata & Surf Break at a Time",
      destination: "Portugal (Lisbon · Porto · Lagos)",
      duration: "7 Days",
      authorName: "Rohan Shah",
      authorCity: "Mumbai, India",
      authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      coverImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=800&q=80",
      description: "Coastal drives along Algarve cliffs, vintage yellow trams in Alfama, and port wine cellars along the Douro river.",
      tag: "Roadtrip",
      likes: 96,
      saves: 38,
      isLiked: false,
      isSaved: false
    },
    {
      id: "comm-3",
      title: "Chasing Northern Lights & Glacier Lagoons in Iceland",
      destination: "Iceland (Reykjavík · Vík · Akureyri)",
      duration: "14 Days",
      authorName: "Ananya Nair",
      authorCity: "Bengaluru, India",
      authorAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
      coverImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80",
      description: "Camper van Ring Road expedition chasing aurora borealis, black sand basalt columns, and geothermal baths.",
      tag: "Solo",
      likes: 242,
      saves: 110,
      isLiked: false,
      isSaved: true
    },
    {
      id: "comm-4",
      title: "Street Food Crawl through Bangkok & Chiang Mai Night Markets",
      destination: "Thailand (Bangkok · Chiang Mai)",
      duration: "8 Days",
      authorName: "Leo Zhang",
      authorCity: "Singapore",
      authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
      coverImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=800&q=80",
      description: "The definitive guide to crab omelettes, Khao Soi curry noodles, riverboat markets, and night bazaar treasures.",
      tag: "Foodie",
      likes: 182,
      saves: 75,
      isLiked: true,
      isSaved: false
    }
  ]
};

// Wizard state cache
let WizardState = {
  step: 1,
  name: "Japan Autumn Odyssey 2026",
  startDate: "2026-10-10",
  endDate: "2026-10-22",
  travelers: 2,
  travelType: "Couple",
  budget: 3800,
  cities: ["Tokyo", "Hakone", "Kyoto", "Osaka"],
  interests: ["Food", "Nature", "History", "Relaxation"]
};

// ====================================================
// TOAST ENGINE
// ====================================================
function showToast(message, type = "primary", iconName = "check-circle-2") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast-card toast-${type}`;
  toast.innerHTML = `
    <i data-lucide="${iconName}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  lucide.createIcons();

  setTimeout(() => {
    toast.style.animation = "slideToast 0.3s ease reverse forwards";
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

// ====================================================
// NAVIGATION & SCREEN ROUTER
// ====================================================
function initNavigation() {
  const navTriggers = document.querySelectorAll("[data-nav]");
  navTriggers.forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      const targetScreen = el.getAttribute("data-nav");
      if (targetScreen) {
        navigateToScreen(targetScreen);
      }
    });
  });

  // Check URL Hash on load
  const hash = window.location.hash.replace("#", "");
  if (hash && document.getElementById(`screen${capitalize(hash)}`)) {
    navigateToScreen(hash);
  } else {
    navigateToScreen("home");
  }

  // Sidebar toggle
  const collapseBtn = document.getElementById("collapseSidebarBtn");
  const sidebar = document.getElementById("sidebar");
  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  if (mobileMenuBtn && sidebar && sidebarOverlay) {
    mobileMenuBtn.addEventListener("click", () => {
      sidebar.classList.add("mobile-open");
      sidebarOverlay.classList.add("active");
    });
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("mobile-open");
      sidebarOverlay.classList.remove("active");
    });
  }

  // Global search input keybindings (Ctrl+K or Enter)
  const searchInput = document.getElementById("globalSearchInput");
  const searchBtn = document.getElementById("globalSearchBtn");
  if (searchInput) {
    searchInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        executeGlobalSearch(searchInput.value);
      }
    });
  }
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      if (searchInput) executeGlobalSearch(searchInput.value);
    });
  }

  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      if (searchInput) searchInput.focus();
    }
  });

  // Top Nav Dropdowns Toggle
  initDropdowns();
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function navigateToScreen(screenKey) {
  // Check if Auth Screen requested
  if (screenKey === "login" || screenKey === "register") {
    openAuthView(screenKey);
    return;
  }

  // Hide Auth Screen if open
  const authView = document.getElementById("authView");
  const appShell = document.getElementById("appShell");
  if (authView) authView.classList.add("hidden");
  if (appShell) appShell.classList.remove("hidden");

  // Update active screen viewport
  const targetId = `screen${capitalize(screenKey)}`;
  const screens = document.querySelectorAll(".screen-view");
  screens.forEach(s => s.classList.remove("active"));

  const targetEl = document.getElementById(targetId);
  if (targetEl) {
    targetEl.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    history.replaceState(null, "", `#${screenKey}`);
  }

  // Update active sidebar nav item
  const navItems = document.querySelectorAll(".sidebar .nav-item");
  navItems.forEach(n => {
    if (n.getAttribute("data-nav") === screenKey) {
      n.classList.add("active");
    } else {
      n.classList.remove("active");
    }
  });

  // Close mobile sidebar if open
  const sidebar = document.getElementById("sidebar");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  if (sidebar) sidebar.classList.remove("mobile-open");
  if (sidebarOverlay) sidebarOverlay.classList.remove("active");

  // Trigger screen-specific data renders
  if (screenKey === "home") renderHomeScreen();
  if (screenKey === "trips") renderMyTripsScreen();
  if (screenKey === "itinerary") renderItineraryScreen();
  if (screenKey === "budget") renderBudgetScreen();
  if (screenKey === "explore") renderExploreScreen();
  if (screenKey === "community") renderCommunityScreen();
  if (screenKey === "calendar") renderCalendarScreen();
  if (screenKey === "profile") renderProfileScreen();

  lucide.createIcons();
}

function initDropdowns() {
  const notifBtn = document.getElementById("notifBellBtn");
  const notifDropdown = document.getElementById("notifDropdown");
  const userBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdown");

  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener("click", e => {
      e.stopPropagation();
      notifDropdown.classList.toggle("hidden");
      if (userDropdown) userDropdown.classList.add("hidden");
    });
  }

  if (userBtn && userDropdown) {
    userBtn.addEventListener("click", e => {
      e.stopPropagation();
      userDropdown.classList.toggle("hidden");
      if (notifDropdown) notifDropdown.classList.add("hidden");
    });
  }

  document.addEventListener("click", () => {
    if (notifDropdown) notifDropdown.classList.add("hidden");
    if (userDropdown) userDropdown.classList.add("hidden");
  });
}

function executeGlobalSearch(term) {
  if (!term || !term.trim()) {
    showToast("Please enter a destination, trip name or keyword to search", "warning", "alert-circle");
    return;
  }
  showToast(`Searching destinations and trips for "${term.trim()}"...`, "primary", "search");
  
  // Direct to explore and filter
  const exploreSearchInput = document.getElementById("exploreSearchInput");
  if (exploreSearchInput) {
    exploreSearchInput.value = term.trim();
  }
  navigateToScreen("explore");
  filterExploreDestinations();
}

// ====================================================
// AUTHENTICATION CONTROLLER (SCREENS 1 & 2)
// ====================================================
function initAuth() {
  const authView = document.getElementById("authView");
  const loginScreen = document.getElementById("loginScreen");
  const registerScreen = document.getElementById("registerScreen");

  const showRegisterBtn = document.getElementById("showRegisterBtn");
  const showLoginBtn = document.getElementById("showLoginBtn");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const googleLoginBtn = document.getElementById("googleLoginBtn");

  const sidebarLogoutBtn = document.getElementById("sidebarLogoutBtn");
  const topNavLogoutBtn = document.getElementById("topNavLogoutBtn");
  const settingsSignOutBtn = document.getElementById("settingsSignOutBtn");

  if (showRegisterBtn) {
    showRegisterBtn.addEventListener("click", () => {
      loginScreen.classList.add("hidden");
      registerScreen.classList.remove("hidden");
    });
  }

  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", () => {
      registerScreen.classList.add("hidden");
      loginScreen.classList.remove("hidden");
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", e => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      showToast(`Welcome back, ${AppState.currentUser.name}!`, "success", "user-check");
      authView.classList.add("hidden");
      document.getElementById("appShell").classList.remove("hidden");
      navigateToScreen("home");
    });
  }

  if (googleLoginBtn) {
    googleLoginBtn.addEventListener("click", () => {
      showToast("Signed in securely with Google Account", "success", "check");
      authView.classList.add("hidden");
      document.getElementById("appShell").classList.remove("hidden");
      navigateToScreen("home");
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", e => {
      e.preventDefault();
      const firstName = document.getElementById("regFirstName").value || "Traveler";
      const lastName = document.getElementById("regLastName").value || "";
      const city = document.getElementById("regCity").value || "San Francisco";
      const country = document.getElementById("regCountry").value || "United States";
      const bio = document.getElementById("regBio").value || "New GlobeTrotter Explorer";

      AppState.currentUser.name = `${firstName} ${lastName}`.trim();
      AppState.currentUser.city = city;
      AppState.currentUser.country = country;
      AppState.currentUser.bio = bio;

      updateUserProfileDom();
      showToast(`Account created! Welcome to GlobeTrotter, ${firstName}!`, "success", "sparkles");
      authView.classList.add("hidden");
      document.getElementById("appShell").classList.remove("hidden");
      navigateToScreen("home");
    });
  }

  const logoutAction = () => {
    authView.classList.remove("hidden");
    document.getElementById("appShell").classList.add("hidden");
    loginScreen.classList.remove("hidden");
    registerScreen.classList.add("hidden");
    showToast("You have been signed out safely.", "primary", "log-out");
  };

  if (sidebarLogoutBtn) sidebarLogoutBtn.addEventListener("click", logoutAction);
  if (topNavLogoutBtn) topNavLogoutBtn.addEventListener("click", logoutAction);
  if (settingsSignOutBtn) settingsSignOutBtn.addEventListener("click", logoutAction);
}

function openAuthView(type = "login") {
  const authView = document.getElementById("authView");
  const loginScreen = document.getElementById("loginScreen");
  const registerScreen = document.getElementById("registerScreen");
  const appShell = document.getElementById("appShell");

  if (!authView) return;
  authView.classList.remove("hidden");
  if (appShell) appShell.classList.add("hidden");

  if (type === "register") {
    loginScreen.classList.add("hidden");
    registerScreen.classList.remove("hidden");
  } else {
    loginScreen.classList.remove("hidden");
    registerScreen.classList.add("hidden");
  }
}

function updateUserProfileDom() {
  const user = AppState.currentUser;
  
  const sidebarName = document.getElementById("sidebarUserName");
  const sidebarAvatar = document.getElementById("sidebarAvatar");
  const topNavName = document.getElementById("topNavName");
  const topNavAvatar = document.getElementById("topNavAvatar");
  const dropdownName = document.getElementById("dropdownName");
  const dropdownEmail = document.getElementById("dropdownEmail");

  if (sidebarName) sidebarName.textContent = user.name;
  if (sidebarAvatar) sidebarAvatar.src = user.avatar;
  if (topNavName) topNavName.textContent = user.name.split(" ")[0];
  if (topNavAvatar) topNavAvatar.src = user.avatar;
  if (dropdownName) dropdownName.textContent = user.name;
  if (dropdownEmail) dropdownEmail.textContent = user.email;

  // Profile page specifics
  const profName = document.getElementById("profileDisplayName");
  const profLoc = document.getElementById("profileDisplayLocation");
  const profBio = document.getElementById("profileDisplayBio");
  const profAvatar = document.getElementById("profileAvatarLarge");

  if (profName) profName.textContent = user.name;
  if (profLoc) profLoc.innerHTML = `<i data-lucide="map-pin"></i> ${user.city}, ${user.country} · Member since 2024`;
  if (profBio) profBio.textContent = user.bio;
  if (profAvatar) profAvatar.src = user.avatar;

  lucide.createIcons();
}

// ====================================================
// SCREEN 3 — HOME DASHBOARD CONTROLLER
// ====================================================
function renderHomeScreen() {
  // Top destinations
  const homeDestGrid = document.getElementById("homeDestinationsGrid");
  if (homeDestGrid) {
    const featuredDests = AppState.destinations.slice(0, 4);
    homeDestGrid.innerHTML = featuredDests.map(dest => `
      <div class="destination-card">
        <div class="dest-card-image" style="background-image: url('${dest.image}')">
          <div class="dest-badge-top"><span>${dest.duration}</span></div>
          <button class="dest-heart-btn ${dest.liked ? 'liked' : ''}" onclick="toggleDestinationLike('${dest.id}', event)">
            <i data-lucide="heart"></i>
          </button>
        </div>
        <div class="dest-card-body">
          <div class="dest-meta-header">
            <h3>${dest.city}</h3>
            <span class="dest-rating"><i data-lucide="star"></i> ${dest.rating}</span>
          </div>
          <span class="dest-country">${dest.country}</span>
          <p class="dest-description">${dest.description}</p>
          <div class="dest-attractions-chips">
            ${dest.attractions.slice(0, 2).map(a => `<span class="dest-chip">${a}</span>`).join('')}
          </div>
          <div class="dest-footer">
            <div class="dest-budget-est">
              <small>Est. Daily Cost</small>
              <strong>$${dest.dailyCost} / day</strong>
            </div>
            <button class="btn btn-outline btn-sm" onclick="openDestinationQuickModal('${dest.id}')">
              <span>Explore</span>
              <i data-lucide="arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Upcoming Trips
  const upcomingGrid = document.getElementById("homeUpcomingTripsGrid");
  if (upcomingGrid) {
    const upcomingTrips = AppState.trips.filter(t => t.status === "upcoming" || t.status === "ongoing");
    upcomingGrid.innerHTML = upcomingTrips.map(trip => `
      <div class="trip-card-interactive">
        <div class="trip-card-cover" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%), url('${trip.coverImage}')">
          <span class="badge ${trip.status === 'ongoing' ? 'badge-warning' : 'badge-primary'}">${trip.status.toUpperCase()}</span>
          <span class="badge badge-accent">${trip.durationDays} Days</span>
        </div>
        <div class="trip-card-content">
          <h3>${trip.name}</h3>
          <p class="trip-stops-line"><i data-lucide="map-pin"></i> ${trip.cities.join(' → ')}</p>
          <div class="trip-meta-row">
            <span><i data-lucide="calendar"></i> ${formatDateRange(trip.startDate, trip.endDate)}</span>
            <span><i data-lucide="users"></i> ${trip.travelers} Travelers (${trip.travelType})</span>
          </div>
          <div class="trip-progress-track">
            <div class="trip-progress-fill" style="width: ${trip.progressPercent}%"></div>
          </div>
          <div class="trip-card-actions">
            <button class="btn btn-primary btn-sm flex-1" onclick="setActiveTripAndOpenItinerary('${trip.id}')">
              <i data-lucide="map"></i>
              <span>View Itinerary</span>
            </button>
            <button class="btn btn-outline btn-sm" onclick="setActiveTripAndOpenBudget('${trip.id}')">
              <i data-lucide="wallet"></i>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Recent Trips
  const recentGrid = document.getElementById("homeRecentTripsGrid");
  if (recentGrid) {
    const completedTrips = AppState.trips.filter(t => t.status === "completed");
    recentGrid.innerHTML = completedTrips.map(trip => `
      <div class="trip-card-interactive">
        <div class="trip-card-cover" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%), url('${trip.coverImage}')">
          <span class="badge badge-success">COMPLETED</span>
          <span class="badge badge-accent">${trip.durationDays} Days</span>
        </div>
        <div class="trip-card-content">
          <h3>${trip.name}</h3>
          <p class="trip-stops-line"><i data-lucide="map-pin"></i> ${trip.cities.join(' · ')}</p>
          <div class="trip-meta-row">
            <span><i data-lucide="calendar"></i> ${formatDateRange(trip.startDate, trip.endDate)}</span>
            <span class="text-success font-bold"><i data-lucide="check-circle-2"></i> $${trip.actualSpend} Logged</span>
          </div>
          <div class="trip-card-actions">
            <button class="btn btn-outline btn-sm flex-1" onclick="setActiveTripAndOpenItinerary('${trip.id}')">
              <i data-lucide="book-open"></i>
              <span>View Memories</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Hero Quick Planner Search Form
  const heroForm = document.getElementById("heroPlannerForm");
  if (heroForm) {
    heroForm.onsubmit = e => {
      e.preventDefault();
      const dest = document.getElementById("heroDestinationInput").value || "Tokyo, Japan";
      const start = document.getElementById("heroStartDateInput").value || "2026-10-10";
      const end = document.getElementById("heroEndDateInput").value || "2026-10-22";
      const travelers = document.getElementById("heroTravelersInput").value || 2;

      // Prepopulate Create Trip Wizard
      document.getElementById("newTripName").value = `Trip to ${dest.split(',')[0]}`;
      document.getElementById("newTripStart").value = start;
      document.getElementById("newTripEnd").value = end;
      document.getElementById("newTripTravelers").value = travelers;

      WizardState.cities = [dest.split(',')[0], "Scenic Environs"];
      renderWizardCities();
      navigateToScreen("create");
      showToast(`Started planning journey for ${dest}!`, "primary", "compass");
    };
  }

  lucide.createIcons();
}

function formatDateRange(startStr, endStr) {
  try {
    const s = new Date(startStr);
    const e = new Date(endStr);
    const options = { month: 'short', day: 'numeric' };
    return `${s.toLocaleDateString('en-US', options)} – ${e.toLocaleDateString('en-US', options)}, ${e.getFullYear()}`;
  } catch (err) {
    return `${startStr} – ${endStr}`;
  }
}

function toggleDestinationLike(destId, event) {
  if (event) event.stopPropagation();
  const dest = AppState.destinations.find(d => d.id === destId);
  if (!dest) return;

  dest.liked = !dest.liked;
  showToast(dest.liked ? `Saved ${dest.city} to your favorites!` : `Removed ${dest.city} from favorites.`, "primary", "heart");
  renderHomeScreen();
  renderExploreScreen();
  renderProfileScreen();
}

// ====================================================
// SCREEN 4 — CREATE NEW TRIP WIZARD CONTROLLER
// ====================================================
function initCreateTripWizard() {
  // Step 1 -> 2
  const next1 = document.getElementById("wizardNext1");
  if (next1) {
    next1.addEventListener("click", () => {
      const name = document.getElementById("newTripName").value.trim();
      const start = document.getElementById("newTripStart").value;
      const end = document.getElementById("newTripEnd").value;
      const travelers = parseInt(document.getElementById("newTripTravelers").value) || 2;
      const budget = parseFloat(document.getElementById("newTripBudget").value) || 3800;

      if (!name || !start || !end) {
        showToast("Please fill in trip title and travel dates", "warning", "alert-circle");
        return;
      }

      WizardState.name = name;
      WizardState.startDate = start;
      WizardState.endDate = end;
      WizardState.travelers = travelers;
      WizardState.budget = budget;

      goToWizardStep(2);
    });
  }

  // Travel Type radio chips
  const travelTypeChips = document.querySelectorAll("#travelTypeGroup .chip-btn");
  travelTypeChips.forEach(btn => {
    btn.addEventListener("click", () => {
      travelTypeChips.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      WizardState.travelType = btn.getAttribute("data-value");
    });
  });

  // Step 2 -> 1 (Back)
  const back2 = document.getElementById("wizardBack2");
  if (back2) back2.addEventListener("click", () => goToWizardStep(1));

  // Step 2 -> 3
  const next2 = document.getElementById("wizardNext2");
  if (next2) {
    next2.addEventListener("click", () => {
      if (WizardState.cities.length === 0) {
        showToast("Please add at least one destination city", "warning", "alert-circle");
        return;
      }
      goToWizardStep(3);
    });
  }

  // Add City Button
  const addCityBtn = document.getElementById("addCityBtn");
  const newCityInput = document.getElementById("newCityInput");
  if (addCityBtn && newCityInput) {
    const handleAddCity = () => {
      const cityVal = newCityInput.value.trim();
      if (!cityVal) return;
      WizardState.cities.push(cityVal);
      newCityInput.value = "";
      renderWizardCities();
      showToast(`Added ${cityVal} to your route!`, "primary", "map-pin");
    };

    addCityBtn.addEventListener("click", handleAddCity);
    newCityInput.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        e.preventDefault();
        handleAddCity();
      }
    });
  }

  // Quick City Chips
  const quickChips = document.querySelectorAll("#quickAddCityChips .quick-chip");
  quickChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const city = chip.getAttribute("data-city").split(",")[0];
      if (!WizardState.cities.includes(city)) {
        WizardState.cities.push(city);
        renderWizardCities();
        showToast(`Added ${city} to route!`, "primary", "plus");
      }
    });
  });

  // Step 3 -> 2 (Back)
  const back3 = document.getElementById("wizardBack3");
  if (back3) back3.addEventListener("click", () => goToWizardStep(2));

  // Interest cards toggle
  const interestCards = document.querySelectorAll("#wizardInterestsGrid .interest-card");
  interestCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
      const interest = card.getAttribute("data-interest");
      if (card.classList.contains("active")) {
        if (!WizardState.interests.includes(interest)) WizardState.interests.push(interest);
      } else {
        WizardState.interests = WizardState.interests.filter(i => i !== interest);
      }
    });
  });

  // Step 3 -> 4
  const next3 = document.getElementById("wizardNext3");
  if (next3) {
    next3.addEventListener("click", () => {
      updateWizardReviewSummary();
      goToWizardStep(4);
    });
  }

  // Step 4 -> 3 (Back)
  const back4 = document.getElementById("wizardBack4");
  if (back4) back4.addEventListener("click", () => goToWizardStep(3));

  // Finalize Trip / Create & Launch
  const finalizeBtn = document.getElementById("finalizeTripBtn");
  const saveDraftBtn = document.getElementById("saveDraftBtn");

  if (finalizeBtn) {
    finalizeBtn.addEventListener("click", () => createTripFromWizard(false));
  }
  if (saveDraftBtn) {
    saveDraftBtn.addEventListener("click", () => createTripFromWizard(true));
  }

  renderWizardCities();
}

function goToWizardStep(stepNumber) {
  WizardState.step = stepNumber;

  // Update indicator nodes
  const nodes = document.querySelectorAll(".wizard-step-node");
  nodes.forEach(n => {
    const nodeStep = parseInt(n.getAttribute("data-step"));
    if (nodeStep === stepNumber) {
      n.classList.add("active");
    } else if (nodeStep < stepNumber) {
      n.classList.add("active");
    } else {
      n.classList.remove("active");
    }
  });

  // Update line fills
  const line1 = document.getElementById("wizardLine1");
  const line2 = document.getElementById("wizardLine2");
  const line3 = document.getElementById("wizardLine3");
  if (line1) line1.classList.toggle("passed", stepNumber >= 2);
  if (line2) line2.classList.toggle("passed", stepNumber >= 3);
  if (line3) line3.classList.toggle("passed", stepNumber >= 4);

  // Update panels
  const panels = document.querySelectorAll(".wizard-step-panel");
  panels.forEach(p => p.classList.remove("active"));
  const activePanel = document.getElementById(`wizardStep${stepNumber}`);
  if (activePanel) activePanel.classList.add("active");

  lucide.createIcons();
}

function renderWizardCities() {
  const container = document.getElementById("wizardCitiesList");
  if (!container) return;

  if (WizardState.cities.length === 0) {
    container.innerHTML = `<p class="text-muted" style="padding: 8px 0; font-size: 0.866rem;">No cities added yet. Type a destination below.</p>`;
    return;
  }

  container.innerHTML = WizardState.cities.map((city, idx) => `
    <div class="city-route-item">
      <div class="city-item-left">
        <span class="city-item-number">${idx + 1}</span>
        <strong>${city}</strong>
      </div>
      <div class="city-item-controls">
        <button type="button" title="Move up" onclick="reorderWizardCity(${idx}, -1)" ${idx === 0 ? 'disabled' : ''}>
          <i data-lucide="chevron-up"></i>
        </button>
        <button type="button" title="Move down" onclick="reorderWizardCity(${idx}, 1)" ${idx === WizardState.cities.length - 1 ? 'disabled' : ''}>
          <i data-lucide="chevron-down"></i>
        </button>
        <button type="button" class="delete-btn" title="Remove stop" onclick="removeWizardCity(${idx})">
          <i data-lucide="trash-2"></i>
        </button>
      </div>
    </div>
  `).join('');

  // Update timeline map preview in sidebar
  const timelineMap = document.getElementById("wizardRouteTimeline");
  if (timelineMap) {
    timelineMap.innerHTML = WizardState.cities.map((c, i) => `
      <div class="timeline-step-point">
        <div class="point-dot bg-blue">${i + 1}</div>
        <div class="point-text"><strong>${c}</strong><span>Stop ${i + 1}</span></div>
      </div>
      ${i < WizardState.cities.length - 1 ? `<div class="timeline-connector"></div>` : ''}
    `).join('');
  }

  lucide.createIcons();
}

function removeWizardCity(index) {
  const removed = WizardState.cities.splice(index, 1);
  renderWizardCities();
  showToast(`Removed ${removed[0]} from stops`, "primary", "minus");
}

function reorderWizardCity(index, direction) {
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= WizardState.cities.length) return;

  const temp = WizardState.cities[index];
  WizardState.cities[index] = WizardState.cities[targetIndex];
  WizardState.cities[targetIndex] = temp;
  renderWizardCities();
}

function updateWizardReviewSummary() {
  const title = document.getElementById("reviewTripTitle");
  const dates = document.getElementById("reviewTripDates");
  const budget = document.getElementById("reviewTripBudget");
  const travelers = document.getElementById("reviewTripTravelers");
  const cities = document.getElementById("reviewTripCities");
  const interests = document.getElementById("reviewTripInterests");

  if (title) title.textContent = WizardState.name;
  if (dates) dates.innerHTML = `<i data-lucide="calendar"></i> ${formatDateRange(WizardState.startDate, WizardState.endDate)}`;
  if (budget) budget.textContent = `$${WizardState.budget.toLocaleString()}`;
  if (travelers) travelers.textContent = `${WizardState.travelers} Travelers (${WizardState.travelType})`;
  if (cities) cities.textContent = WizardState.cities.join(" → ");

  if (interests) {
    interests.innerHTML = WizardState.interests.map(i => `<span class="badge badge-subtle">${i}</span>`).join('');
  }
}

function createTripFromWizard(isDraft = false) {
  const newId = `trip-${Date.now()}`;
  const startD = new Date(WizardState.startDate);
  const endD = new Date(WizardState.endDate);
  const diffTime = Math.abs(endD - startD);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 || 5;

  const newTrip = {
    id: newId,
    name: WizardState.name,
    coverImage: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    startDate: WizardState.startDate,
    endDate: WizardState.endDate,
    durationDays: diffDays,
    travelers: WizardState.travelers,
    travelType: WizardState.travelType,
    status: isDraft ? "draft" : "upcoming",
    cities: [...WizardState.cities],
    interests: [...WizardState.interests],
    estimatedBudget: WizardState.budget,
    actualSpend: 0,
    progressPercent: isDraft ? 20 : 45,
    days: []
  };

  // Generate blank template days
  for (let d = 1; d <= Math.min(diffDays, 14); d++) {
    const cityForDay = WizardState.cities[(d - 1) % WizardState.cities.length] || "Destination";
    newTrip.days.push({
      dayNumber: d,
      dateString: `Day ${d} (${cityForDay})`,
      city: cityForDay,
      title: `Exploring ${cityForDay}`,
      description: `Activities, meals, and adventures planned in ${cityForDay}.`,
      activities: []
    });
  }

  AppState.trips.unshift(newTrip);
  AppState.activeTripId = newId;
  AppState.activeDayIndex = 0;

  showToast(isDraft ? `Trip saved to drafts!` : `"${WizardState.name}" created successfully! ✦`, "success", "sparkles");
  
  // Reset wizard to step 1
  goToWizardStep(1);
  navigateToScreen("itinerary");
}

// ====================================================
// SCREEN 5 — BUILD ITINERARY CONTROLLER
// ====================================================
function renderItineraryScreen() {
  const trip = AppState.trips.find(t => t.id === AppState.activeTripId) || AppState.trips[0];
  if (!trip) return;

  // Banner metadata
  const title = document.getElementById("itineraryTripName");
  const dates = document.getElementById("itineraryDates");
  const stops = document.getElementById("itineraryStops");
  const travelers = document.getElementById("itineraryTravelers");
  const badge = document.getElementById("itineraryStatusBadge");
  const typeBadge = document.getElementById("itineraryTypeBadge");

  if (title) title.textContent = trip.name;
  if (dates) dates.textContent = formatDateRange(trip.startDate, trip.endDate);
  if (stops) stops.textContent = trip.cities.join(" · ");
  if (travelers) travelers.textContent = `${trip.travelers} Travelers`;
  if (badge) badge.textContent = (trip.status || "upcoming").toUpperCase();
  if (typeBadge) typeBadge.textContent = `${trip.travelType} Trip`;

  // Render Days Navigation Column
  const daysList = document.getElementById("itineraryDaysNavList");
  const totalDaysBadge = document.getElementById("totalDaysCount");
  if (totalDaysBadge) totalDaysBadge.textContent = `${trip.days.length} Days`;

  if (daysList) {
    daysList.innerHTML = trip.days.map((day, idx) => `
      <button class="day-nav-btn ${idx === AppState.activeDayIndex ? 'active' : ''}" onclick="selectItineraryDay(${idx})">
        <span class="day-nav-badge">${day.dayNumber}</span>
        <div class="day-nav-info">
          <strong>Day ${day.dayNumber}</strong>
          <small>${day.city}</small>
        </div>
      </button>
    `).join('');
  }

  // Render Active Day Details & Timeline
  const currentDay = trip.days[AppState.activeDayIndex] || trip.days[0];
  if (!currentDay) return;

  const activeDayLabel = document.getElementById("activeDayLabel");
  const activeDayDate = document.getElementById("activeDayDate");
  const activeDayDesc = document.getElementById("activeDayDesc");

  if (activeDayLabel) activeDayLabel.textContent = `DAY ${currentDay.dayNumber} — ${currentDay.city.toUpperCase()}`;
  if (activeDayDate) activeDayDate.textContent = currentDay.dateString || `Day ${currentDay.dayNumber}`;
  if (activeDayDesc) activeDayDesc.textContent = currentDay.description || "Schedule your activities below.";

  const timeline = document.getElementById("activitiesTimeline");
  if (timeline) {
    if (!currentDay.activities || currentDay.activities.length === 0) {
      timeline.innerHTML = `
        <div class="card-box text-center" style="padding: 32px 20px;">
          <i data-lucide="calendar-plus" style="width: 38px; height: 38px; color: var(--text-muted); margin-bottom: 10px;"></i>
          <h4 style="margin-bottom: 4px;">No activities scheduled yet</h4>
          <p class="text-muted" style="font-size: 0.866rem; margin-bottom: 16px;">Add sightseeing spots, local restaurant reservations, or transit.</p>
          <button class="btn btn-primary btn-sm" onclick="openAddActivityModal()">
            <i data-lucide="plus"></i>
            <span>Add First Activity</span>
          </button>
        </div>
      `;
    } else {
      timeline.innerHTML = currentDay.activities.map((act, actIdx) => `
        <div class="activity-card">
          <div class="activity-time-col">
            <div class="act-time-big">${act.time}</div>
            <div class="act-duration-pill">${act.duration}</div>
          </div>
          <div class="activity-main-col">
            <img src="${act.image || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80'}" alt="${act.title}" class="activity-thumb" />
            <div class="activity-details-text">
              <div class="activity-cat-tag">
                <i data-lucide="${getActivityCategoryIcon(act.category)}"></i>
                <span>${act.category}</span>
              </div>
              <div class="act-title">${act.title}</div>
              <div class="act-location-line">
                <i data-lucide="map-pin"></i>
                <span>${act.location}</span>
              </div>
            </div>
          </div>
          <div class="activity-right-col">
            <div class="act-cost-tag">
              <strong>${act.cost > 0 ? '$' + act.cost : 'Free'}</strong>
              <small>Est. Cost</small>
            </div>
            <div class="activity-action-btns">
              <button title="Edit Activity" onclick="openEditActivityModal('${act.id}')">
                <i data-lucide="edit-2"></i>
              </button>
              <button class="act-del-btn" title="Delete Activity" onclick="deleteItineraryActivity('${act.id}')">
                <i data-lucide="trash-2"></i>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Recalculate Day Cost Summary Sidebar
  recalculateDayCostSummary(currentDay);

  lucide.createIcons();
}

function selectItineraryDay(index) {
  AppState.activeDayIndex = index;
  renderItineraryScreen();
}

function getActivityCategoryIcon(cat) {
  switch (cat) {
    case 'Food': return 'utensils';
    case 'Sightseeing': return 'landmark';
    case 'Transport': return 'plane';
    case 'Stay': return 'hotel';
    case 'Activity': return 'compass';
    case 'Shopping': return 'shopping-bag';
    default: return 'map-pin';
  }
}

function recalculateDayCostSummary(day) {
  let total = 0;
  let food = 0;
  let actCost = 0;
  let transport = 0;

  if (day && day.activities) {
    day.activities.forEach(act => {
      const c = parseFloat(act.cost) || 0;
      total += c;
      if (act.category === 'Food') food += c;
      else if (act.category === 'Transport') transport += c;
      else actCost += c;
    });
  }

  const dayTotalEl = document.getElementById("dayTotalCost");
  const actCostEl = document.getElementById("dayActivityCost");
  const foodCostEl = document.getElementById("dayFoodCost");
  const transCostEl = document.getElementById("dayTransportCost");

  if (dayTotalEl) dayTotalEl.textContent = `$${total.toFixed(0)}`;
  if (actCostEl) actCostEl.textContent = `$${actCost.toFixed(0)}`;
  if (foodCostEl) foodCostEl.textContent = `$${food.toFixed(0)}`;
  if (transCostEl) transCostEl.textContent = `$${transport.toFixed(0)}`;
}

function initItineraryActions() {
  const addDayBtn = document.getElementById("addNewDayBtn");
  if (addDayBtn) {
    addDayBtn.addEventListener("click", () => {
      const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
      if (!trip) return;

      const nextDayNum = trip.days.length + 1;
      const lastCity = trip.days.length > 0 ? trip.days[trip.days.length - 1].city : "New City";
      trip.days.push({
        dayNumber: nextDayNum,
        dateString: `Day ${nextDayNum} (${lastCity})`,
        city: lastCity,
        title: `Day ${nextDayNum} Adventures`,
        description: `Custom activities for Day ${nextDayNum}.`,
        activities: []
      });

      AppState.activeDayIndex = trip.days.length - 1;
      renderItineraryScreen();
      showToast(`Day ${nextDayNum} added to itinerary!`, "success", "calendar-plus");
    });
  }

  const openAddActBtn = document.getElementById("openAddActivityModalBtn");
  const openDirectBtn = document.getElementById("addActivityDirectBtn");
  const timelineAddBottom = document.getElementById("timelineAddBottomBtn");

  if (openAddActBtn) openAddActBtn.addEventListener("click", openAddActivityModal);
  if (openDirectBtn) openDirectBtn.addEventListener("click", openAddActivityModal);
  if (timelineAddBottom) timelineAddBottom.addEventListener("click", openAddActivityModal);

  // Edit details button (navigates to create or opens wizard)
  const editTripDetailsBtn = document.getElementById("editTripDetailsBtn");
  if (editTripDetailsBtn) {
    editTripDetailsBtn.addEventListener("click", () => {
      const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
      if (trip) {
        document.getElementById("newTripName").value = trip.name;
        document.getElementById("newTripStart").value = trip.startDate;
        document.getElementById("newTripEnd").value = trip.endDate;
        document.getElementById("newTripTravelers").value = trip.travelers;
        WizardState.cities = [...trip.cities];
        renderWizardCities();
        navigateToScreen("create");
      }
    });
  }
}

function openAddActivityModal() {
  const modal = document.getElementById("activityModal");
  const form = document.getElementById("activityForm");
  const title = document.getElementById("activityModalTitle");
  const editIdInput = document.getElementById("editActivityId");

  if (!modal || !form) return;
  form.reset();
  if (editIdInput) editIdInput.value = "";
  if (title) title.textContent = "Add Activity";

  // Populate day selector options
  const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
  const daySelect = document.getElementById("actDaySelect");
  if (trip && daySelect) {
    daySelect.innerHTML = trip.days.map((d, i) => `
      <option value="${i}" ${i === AppState.activeDayIndex ? 'selected' : ''}>Day ${d.dayNumber}: ${d.city} (${d.title})</option>
    `).join('');
  }

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function openEditActivityModal(actId) {
  const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
  if (!trip) return;

  let foundAct = null;
  let dayIdx = 0;

  trip.days.forEach((day, idx) => {
    const a = day.activities.find(item => item.id === actId);
    if (a) {
      foundAct = a;
      dayIdx = idx;
    }
  });

  if (!foundAct) return;

  openAddActivityModal();
  document.getElementById("activityModalTitle").textContent = "Edit Activity";
  document.getElementById("editActivityId").value = actId;
  document.getElementById("actDaySelect").value = dayIdx;
  document.getElementById("actTime").value = foundAct.time.replace(" AM", "").replace(" PM", "");
  document.getElementById("actDuration").value = foundAct.duration;
  document.getElementById("actTitle").value = foundAct.title;
  document.getElementById("actLocation").value = foundAct.location;
  document.getElementById("actCategory").value = foundAct.category;
  document.getElementById("actCost").value = foundAct.cost;
  document.getElementById("actImage").value = foundAct.image || "";
  document.getElementById("actNotes").value = foundAct.notes || "";
}

function deleteItineraryActivity(actId) {
  const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
  if (!trip) return;

  trip.days.forEach(day => {
    day.activities = day.activities.filter(a => a.id !== actId);
  });

  renderItineraryScreen();
  showToast("Activity deleted from timeline.", "primary", "trash-2");
}

function initActivityModal() {
  const modal = document.getElementById("activityModal");
  const form = document.getElementById("activityForm");
  const closeBtn = document.getElementById("closeActivityModalBtn");
  const cancelBtn = document.getElementById("cancelActivityBtn");

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
      if (!trip) return;

      const editId = document.getElementById("editActivityId").value;
      const targetDayIdx = parseInt(document.getElementById("actDaySelect").value) || 0;
      const timeVal = document.getElementById("actTime").value;
      const durationVal = document.getElementById("actDuration").value || "1 hr";
      const titleVal = document.getElementById("actTitle").value;
      const locVal = document.getElementById("actLocation").value;
      const catVal = document.getElementById("actCategory").value;
      const costVal = parseFloat(document.getElementById("actCost").value) || 0;
      const imgVal = document.getElementById("actImage").value || "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=300&q=80";
      const notesVal = document.getElementById("actNotes").value;

      if (editId) {
        // Edit existing
        trip.days.forEach(d => {
          d.activities = d.activities.filter(a => a.id !== editId);
        });
      }

      const newAct = {
        id: editId || `act-${Date.now()}`,
        time: timeVal,
        duration: durationVal,
        title: titleVal,
        location: locVal,
        category: catVal,
        cost: costVal,
        image: imgVal,
        notes: notesVal
      };

      if (trip.days[targetDayIdx]) {
        trip.days[targetDayIdx].activities.push(newAct);
        // sort activities by time
        trip.days[targetDayIdx].activities.sort((a, b) => (a.time > b.time ? 1 : -1));
      }

      modal.classList.add("hidden");
      renderItineraryScreen();
      showToast(editId ? "Activity updated!" : `Added "${titleVal}" to Day ${targetDayIdx + 1}!`, "success", "check-circle-2");
    });
  }
}

// Helpers for cross-page navigation
function setActiveTripAndOpenItinerary(tripId) {
  AppState.activeTripId = tripId;
  AppState.activeDayIndex = 0;
  navigateToScreen("itinerary");
}

function setActiveTripAndOpenBudget(tripId) {
  AppState.activeTripId = tripId;
  navigateToScreen("budget");
}

// ====================================================
// SCREEN 6 — MY TRIPS CONTROLLER
// ====================================================
function renderMyTripsScreen() {
  const container = document.getElementById("myTripsContainer");
  const countAll = document.getElementById("countAllTrips");
  const countOngoing = document.getElementById("countOngoingTrips");
  const countUpcoming = document.getElementById("countUpcomingTrips");
  const countCompleted = document.getElementById("countCompletedTrips");

  const totalAll = AppState.trips.length;
  const totalOngoing = AppState.trips.filter(t => t.status === "ongoing").length;
  const totalUpcoming = AppState.trips.filter(t => t.status === "upcoming").length;
  const totalCompleted = AppState.trips.filter(t => t.status === "completed").length;

  if (countAll) countAll.textContent = totalAll;
  if (countOngoing) countOngoing.textContent = totalOngoing;
  if (countUpcoming) countUpcoming.textContent = totalUpcoming;
  if (countCompleted) countCompleted.textContent = totalCompleted;

  // Read active filter
  const activeTab = document.querySelector("#myTripsTabGroup .tab-btn.active");
  const filterType = activeTab ? activeTab.getAttribute("data-filter") : "all";
  const searchVal = (document.getElementById("myTripsSearchInput")?.value || "").toLowerCase();

  let filtered = AppState.trips.filter(t => {
    const matchFilter = filterType === "all" || t.status === filterType;
    const matchSearch = !searchVal || 
      t.name.toLowerCase().includes(searchVal) || 
      t.cities.some(c => c.toLowerCase().includes(searchVal));
    return matchFilter && matchSearch;
  });

  if (!container) return;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="grid-column: 1 / -1;">
        <div class="empty-icon"><i data-lucide="briefcase"></i></div>
        <h3>No trips match your filter</h3>
        <p>Try searching for a different destination or create a brand new adventure.</p>
        <button class="btn btn-primary" data-nav="create">Plan New Trip</button>
      </div>
    `;
    lucide.createIcons();
    return;
  }

  container.innerHTML = filtered.map(trip => {
    let statusClass = "badge-primary";
    if (trip.status === "ongoing") statusClass = "badge-warning";
    if (trip.status === "completed") statusClass = "badge-success";

    return `
      <div class="trip-card-interactive">
        <div class="trip-card-cover" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%), url('${trip.coverImage}')">
          <span class="badge ${statusClass}">${(trip.status || "upcoming").toUpperCase()}</span>
          <span class="badge badge-accent">$${trip.estimatedBudget} Budget</span>
        </div>
        <div class="trip-card-content">
          <h3>${trip.name}</h3>
          <p class="trip-stops-line"><i data-lucide="map-pin"></i> ${trip.cities.join(' → ')}</p>
          <div class="trip-meta-row">
            <span><i data-lucide="calendar"></i> ${formatDateRange(trip.startDate, trip.endDate)}</span>
            <span><i data-lucide="clock"></i> ${trip.durationDays} Days</span>
          </div>
          <div class="trip-progress-track">
            <div class="trip-progress-fill" style="width: ${trip.progressPercent}%"></div>
          </div>
          <div class="trip-card-actions">
            <button class="btn btn-primary btn-sm flex-1" onclick="setActiveTripAndOpenItinerary('${trip.id}')">
              <i data-lucide="map"></i>
              <span>View Details</span>
            </button>
            <button class="btn btn-outline btn-sm" onclick="setActiveTripAndOpenBudget('${trip.id}')" title="Budget & Expenses">
              <i data-lucide="wallet"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  lucide.createIcons();
}

function initMyTripsActions() {
  const tabs = document.querySelectorAll("#myTripsTabGroup .tab-btn");
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      t.classList.add("active");
      renderMyTripsScreen();
    });
  });

  const searchInput = document.getElementById("myTripsSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", renderMyTripsScreen);
  }

  const sortSelect = document.getElementById("myTripsSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const val = sortSelect.value;
      if (val === "name") {
        AppState.trips.sort((a, b) => a.name.localeCompare(b.name));
      } else if (val === "budget") {
        AppState.trips.sort((a, b) => b.estimatedBudget - a.estimatedBudget);
      } else {
        AppState.trips.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      }
      renderMyTripsScreen();
    });
  }
}

// ====================================================
// SCREEN 7 — USER PROFILE CONTROLLER
// ====================================================
function renderProfileScreen() {
  updateUserProfileDom();

  // Render Saved destinations
  const savedGrid = document.getElementById("profileSavedGrid");
  if (savedGrid) {
    const saved = AppState.destinations.filter(d => d.liked);
    savedGrid.innerHTML = saved.map(dest => `
      <div class="destination-card">
        <div class="dest-card-image" style="background-image: url('${dest.image}')">
          <div class="dest-badge-top"><span>${dest.duration}</span></div>
          <button class="dest-heart-btn liked" onclick="toggleDestinationLike('${dest.id}', event)">
            <i data-lucide="heart"></i>
          </button>
        </div>
        <div class="dest-card-body">
          <div class="dest-meta-header">
            <h3>${dest.city}</h3>
            <span class="dest-rating"><i data-lucide="star"></i> ${dest.rating}</span>
          </div>
          <span class="dest-country">${dest.country}</span>
          <p class="dest-description">${dest.description}</p>
          <div class="dest-footer">
            <div class="dest-budget-est">
              <small>Est. Daily Cost</small>
              <strong>$${dest.dailyCost} / day</strong>
            </div>
            <button class="btn btn-outline btn-sm" onclick="openDestinationQuickModal('${dest.id}')">
              <span>Plan Trip</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Render Past Trips History
  const pastGrid = document.getElementById("profilePastTripsGrid");
  if (pastGrid) {
    const past = AppState.trips.filter(t => t.status === "completed");
    pastGrid.innerHTML = past.map(trip => `
      <div class="trip-card-interactive">
        <div class="trip-card-cover" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%), url('${trip.coverImage}')">
          <span class="badge badge-success">COMPLETED</span>
          <span class="badge badge-accent">${trip.durationDays} Days</span>
        </div>
        <div class="trip-card-content">
          <h3>${trip.name}</h3>
          <p class="trip-stops-line"><i data-lucide="map-pin"></i> ${trip.cities.join(' · ')}</p>
          <div class="trip-meta-row">
            <span><i data-lucide="calendar"></i> ${formatDateRange(trip.startDate, trip.endDate)}</span>
            <span class="text-success"><strong>$${trip.actualSpend}</strong> Total Spend</span>
          </div>
          <div class="trip-card-actions">
            <button class="btn btn-outline btn-sm flex-1" onclick="setActiveTripAndOpenItinerary('${trip.id}')">
              <i data-lucide="map"></i>
              <span>View Itinerary</span>
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  lucide.createIcons();
}

function initProfileModal() {
  const modal = document.getElementById("editProfileModal");
  const openBtn = document.getElementById("openEditProfileModalBtn");
  const closeBtn = document.getElementById("closeEditProfileBtn");
  const cancelBtn = document.getElementById("cancelEditProfileBtn");
  const form = document.getElementById("editProfileForm");

  if (openBtn) {
    openBtn.addEventListener("click", () => {
      document.getElementById("editProfName").value = AppState.currentUser.name;
      document.getElementById("editProfLocation").value = `${AppState.currentUser.city}, ${AppState.currentUser.country}`;
      document.getElementById("editProfBio").value = AppState.currentUser.bio;
      document.getElementById("editProfAvatar").value = AppState.currentUser.avatar;
      modal.classList.remove("hidden");
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("editProfName").value.trim();
      const loc = document.getElementById("editProfLocation").value.trim();
      const bio = document.getElementById("editProfBio").value.trim();
      const avatar = document.getElementById("editProfAvatar").value.trim();

      AppState.currentUser.name = name;
      if (loc.includes(",")) {
        const parts = loc.split(",");
        AppState.currentUser.city = parts[0].trim();
        AppState.currentUser.country = parts[1].trim();
      }
      AppState.currentUser.bio = bio;
      AppState.currentUser.avatar = avatar;

      updateUserProfileDom();
      modal.classList.add("hidden");
      showToast("Profile information updated!", "success", "check");
    });
  }
}

// ====================================================
// SCREEN 8 — EXPLORE / CITY SEARCH CONTROLLER
// ====================================================
function renderExploreScreen() {
  filterExploreDestinations();
}

function filterExploreDestinations() {
  const searchInput = document.getElementById("exploreSearchInput");
  const countrySelect = document.getElementById("filterCountrySelect");
  const budgetSelect = document.getElementById("filterBudgetSelect");
  const activitySelect = document.getElementById("filterActivitySelect");
  const durationSelect = document.getElementById("filterDurationSelect");

  const searchVal = (searchInput?.value || "").toLowerCase().trim();
  const countryVal = countrySelect?.value || "all";
  const budgetVal = budgetSelect?.value || "all";
  const activityVal = activitySelect?.value || "all";
  const durationVal = durationSelect?.value || "all";

  let results = AppState.destinations.filter(dest => {
    const matchSearch = !searchVal || 
      dest.city.toLowerCase().includes(searchVal) || 
      dest.country.toLowerCase().includes(searchVal) || 
      dest.description.toLowerCase().includes(searchVal) ||
      dest.attractions.some(a => a.toLowerCase().includes(searchVal));

    const matchCountry = countryVal === "all" || dest.country.toLowerCase().includes(countryVal.toLowerCase());
    const matchBudget = budgetVal === "all" || dest.budgetCategory === budgetVal;
    const matchActivity = activityVal === "all" || dest.activityStyle === activityVal;
    
    let matchDuration = true;
    if (durationVal === "short") matchDuration = dest.duration.includes("3") || dest.duration.includes("4");
    if (durationVal === "medium") matchDuration = dest.duration.includes("5") || dest.duration.includes("6") || dest.duration.includes("7");
    if (durationVal === "long") matchDuration = dest.duration.includes("8") || dest.duration.includes("12");

    return matchSearch && matchCountry && matchBudget && matchActivity && matchDuration;
  });

  const grid = document.getElementById("exploreGridContainer");
  const emptyState = document.getElementById("exploreEmptyState");
  const title = document.getElementById("exploreResultsTitle");

  if (title) title.textContent = `Showing ${results.length} Destinations`;

  if (results.length === 0) {
    if (grid) grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
  } else {
    if (emptyState) emptyState.classList.add("hidden");
    if (grid) {
      grid.innerHTML = results.map(dest => `
        <div class="destination-card">
          <div class="dest-card-image" style="background-image: url('${dest.image}')">
            <div class="dest-badge-top"><span>${dest.duration}</span></div>
            <button class="dest-heart-btn ${dest.liked ? 'liked' : ''}" onclick="toggleDestinationLike('${dest.id}', event)">
              <i data-lucide="heart"></i>
            </button>
          </div>
          <div class="dest-card-body">
            <div class="dest-meta-header">
              <h3>${dest.city}</h3>
              <span class="dest-rating"><i data-lucide="star"></i> ${dest.rating}</span>
            </div>
            <span class="dest-country">${dest.country}</span>
            <p class="dest-description">${dest.description}</p>
            <div class="dest-attractions-chips">
              ${dest.attractions.map(a => `<span class="dest-chip">${a}</span>`).join('')}
            </div>
            <div class="dest-footer">
              <div class="dest-budget-est">
                <small>Est. Daily Budget</small>
                <strong>$${dest.dailyCost} / day</strong>
              </div>
              <button class="btn btn-primary btn-sm" onclick="openDestinationQuickModal('${dest.id}')">
                <i data-lucide="plus"></i>
                <span>Add to Trip</span>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  lucide.createIcons();
}

function initExploreActions() {
  const searchInput = document.getElementById("exploreSearchInput");
  const searchBtn = document.getElementById("exploreSearchBtn");
  const countrySelect = document.getElementById("filterCountrySelect");
  const budgetSelect = document.getElementById("filterBudgetSelect");
  const activitySelect = document.getElementById("filterActivitySelect");
  const durationSelect = document.getElementById("filterDurationSelect");
  const resetBtn = document.getElementById("resetExploreFiltersBtn");
  const emptyResetBtn = document.getElementById("emptyStateResetBtn");

  if (searchInput) searchInput.addEventListener("input", filterExploreDestinations);
  if (searchBtn) searchBtn.addEventListener("click", filterExploreDestinations);
  if (countrySelect) countrySelect.addEventListener("change", filterExploreDestinations);
  if (budgetSelect) budgetSelect.addEventListener("change", filterExploreDestinations);
  if (activitySelect) activitySelect.addEventListener("change", filterExploreDestinations);
  if (durationSelect) durationSelect.addEventListener("change", filterExploreDestinations);

  const handleReset = () => {
    if (searchInput) searchInput.value = "";
    if (countrySelect) countrySelect.value = "all";
    if (budgetSelect) budgetSelect.value = "all";
    if (activitySelect) activitySelect.value = "all";
    if (durationSelect) durationSelect.value = "all";
    filterExploreDestinations();
    showToast("Filters reset to default", "primary", "rotate-ccw");
  };

  if (resetBtn) resetBtn.addEventListener("click", handleReset);
  if (emptyResetBtn) emptyResetBtn.addEventListener("click", handleReset);
}

// Destination Quick View Modal
function openDestinationQuickModal(destId) {
  const dest = AppState.destinations.find(d => d.id === destId);
  if (!dest) return;

  const modal = document.getElementById("destinationQuickModal");
  const name = document.getElementById("quickModalCityName");
  const country = document.getElementById("quickModalCountry");
  const img = document.getElementById("quickModalImage");
  const budget = document.getElementById("quickModalBudget");
  const desc = document.getElementById("quickModalDesc");
  const attractions = document.getElementById("quickModalAttractions");
  const addBtn = document.getElementById("quickModalAddToTripBtn");

  if (name) name.textContent = `${dest.city}, ${dest.country}`;
  if (country) country.textContent = `${dest.duration} Recommended · ${dest.activityStyle} style`;
  if (img) img.src = dest.image;
  if (budget) budget.textContent = `~$${dest.dailyCost} / day`;
  if (desc) desc.textContent = dest.description;

  if (attractions) {
    attractions.innerHTML = dest.attractions.map(a => `<span class="dest-chip">${a}</span>`).join('');
  }

  if (addBtn) {
    addBtn.onclick = () => {
      // Add stop to active trip
      const trip = AppState.trips.find(t => t.id === AppState.activeTripId);
      if (trip && !trip.cities.includes(dest.city)) {
        trip.cities.push(dest.city);
        trip.days.push({
          dayNumber: trip.days.length + 1,
          dateString: `Day ${trip.days.length + 1} (${dest.city})`,
          city: dest.city,
          title: `Exploring ${dest.city}`,
          description: `Custom activities for ${dest.city}.`,
          activities: []
        });
      }
      modal.classList.add("hidden");
      showToast(`Added ${dest.city} to "${trip?.name || 'Active Trip'}"!`, "success", "check-circle-2");
      navigateToScreen("itinerary");
    };
  }

  modal.classList.remove("hidden");
  lucide.createIcons();
}

function initQuickModal() {
  const modal = document.getElementById("destinationQuickModal");
  const closeBtn = document.getElementById("closeQuickModalBtn");
  const footerClose = document.getElementById("quickModalCloseBtn");

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  if (footerClose) footerClose.addEventListener("click", () => modal.classList.add("hidden"));
}

// ====================================================
// SCREEN 9 — ITINERARY + BUDGET CONTROLLER
// ====================================================
function renderBudgetScreen() {
  const trip = AppState.trips.find(t => t.id === AppState.activeTripId) || AppState.trips[0];
  if (!trip) return;

  const title = document.getElementById("budgetTripTitle");
  if (title) title.textContent = `${trip.name} — Budget Tracker`;

  // Calculate live totals from expenses array for this trip
  const tripExpenses = AppState.expenses.filter(e => e.tripId === trip.id);
  const totalActual = tripExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalEstimated = trip.estimatedBudget || 3800;
  const remaining = totalEstimated - totalActual;
  const percentSpent = Math.min(100, ((totalActual / totalEstimated) * 100)).toFixed(1);

  // Update KPI Cards
  const totalEstEl = document.getElementById("budgetTotalEstimate");
  const actualSpentEl = document.getElementById("budgetActualSpent");
  const remainingEl = document.getElementById("budgetRemainingAmount");
  const progressBar = document.getElementById("budgetSpentProgressBar");
  const percentText = document.getElementById("budgetSpentPercentText");

  if (totalEstEl) totalEstEl.textContent = `$${totalEstimated.toLocaleString()}`;
  if (actualSpentEl) actualSpentEl.textContent = `$${totalActual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  
  if (remainingEl) {
    remainingEl.textContent = `$${Math.abs(remaining).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (remaining < 0) {
      remainingEl.className = "kpi-amount text-danger";
    } else {
      remainingEl.className = "kpi-amount text-success";
    }
  }

  if (progressBar) progressBar.style.width = `${percentSpent}%`;
  if (percentText) percentText.textContent = `${percentSpent}% of estimated budget used`;

  // Render Itemized Ledger Table
  const ledgerBody = document.getElementById("expenseLedgerBody");
  if (ledgerBody) {
    if (tripExpenses.length === 0) {
      ledgerBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding: 24px;">No receipts logged yet. Click "Log Receipt" to add one.</td></tr>`;
    } else {
      ledgerBody.innerHTML = tripExpenses.map(exp => `
        <tr>
          <td>
            <strong>${exp.name}</strong>
            ${exp.notes ? `<br><small class="text-muted">${exp.notes}</small>` : ''}
          </td>
          <td><span class="badge badge-subtle">${exp.category}</span></td>
          <td>${exp.date}</td>
          <td><strong>$${exp.amount.toFixed(2)}</strong></td>
          <td>
            <button class="btn btn-ghost btn-sm text-danger" title="Delete expense" onclick="deleteExpense('${exp.id}')">
              <i data-lucide="trash-2"></i>
            </button>
          </td>
        </tr>
      `).join('');
    }
  }

  // Calculate & Render Category Allocation Bars
  const categoryTotals = {
    Transport: 0,
    Accommodation: 0,
    Food: 0,
    Activities: 0,
    Shopping: 0,
    Other: 0
  };

  tripExpenses.forEach(exp => {
    if (categoryTotals[exp.category] !== undefined) {
      categoryTotals[exp.category] += exp.amount;
    } else {
      categoryTotals.Other += exp.amount;
    }
  });

  const catBarsContainer = document.getElementById("categoryBarsContainer");
  if (catBarsContainer) {
    const categories = [
      { name: "Transport", color: "var(--primary)" },
      { name: "Accommodation", color: "var(--warning)" },
      { name: "Food", color: "var(--success)" },
      { name: "Activities", color: "var(--purple)" },
      { name: "Shopping", color: "#F43F5E" },
      { name: "Other", color: "#64748B" }
    ];

    catBarsContainer.innerHTML = categories.map(cat => {
      const amount = categoryTotals[cat.name] || 0;
      const pct = totalActual > 0 ? ((amount / totalActual) * 100).toFixed(1) : 0;
      return `
        <div class="cat-bar-item">
          <div class="cat-bar-header">
            <span>${cat.name} (${pct}%)</span>
            <strong>$${amount.toFixed(2)}</strong>
          </div>
          <div class="cat-bar-track">
            <div class="cat-bar-fill" style="width: ${pct}%; background-color: ${cat.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  lucide.createIcons();
}

function deleteExpense(expId) {
  AppState.expenses = AppState.expenses.filter(e => e.id !== expId);
  renderBudgetScreen();
  showToast("Expense line item removed", "primary", "trash-2");
}

function initBudgetModals() {
  const modal = document.getElementById("expenseModal");
  const openBtn = document.getElementById("openAddExpenseModalBtn");
  const ledgerBtn = document.getElementById("ledgerAddExpenseBtn");
  const closeBtn = document.getElementById("closeExpenseModalBtn");
  const cancelBtn = document.getElementById("cancelExpenseBtn");
  const form = document.getElementById("expenseForm");

  const openAction = () => {
    if (form) form.reset();
    document.getElementById("expDate").value = new Date().toISOString().split("T")[0];
    modal.classList.remove("hidden");
  };

  if (openBtn) openBtn.addEventListener("click", openAction);
  if (ledgerBtn) ledgerBtn.addEventListener("click", openAction);
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const trip = AppState.trips.find(t => t.id === AppState.activeTripId) || AppState.trips[0];
      const name = document.getElementById("expName").value.trim();
      const category = document.getElementById("expCategory").value;
      const amount = parseFloat(document.getElementById("expAmount").value) || 0;
      const date = document.getElementById("expDate").value;
      const method = document.getElementById("expPaymentMethod").value;
      const notes = document.getElementById("expNotes").value.trim();

      const newExpense = {
        id: `exp-${Date.now()}`,
        tripId: trip.id,
        name,
        category,
        amount,
        date,
        method,
        notes
      };

      AppState.expenses.unshift(newExpense);
      modal.classList.add("hidden");
      renderBudgetScreen();
      showToast(`Logged $${amount.toFixed(2)} under ${category}!`, "success", "dollar-sign");
    });
  }
}

// ====================================================
// SCREEN 10 — COMMUNITY CONTROLLER
// ====================================================
function renderCommunityScreen() {
  const container = document.getElementById("communityGridContainer");
  const activeTab = document.querySelector("#communityFilterGroup .tab-btn.active");
  const filterTag = activeTab ? activeTab.getAttribute("data-tag") : "all";
  const searchVal = (document.getElementById("communitySearchInput")?.value || "").toLowerCase().trim();

  let stories = AppState.communityStories.filter(s => {
    const matchTag = filterTag === "all" || s.tag === filterTag;
    const matchSearch = !searchVal || 
      s.title.toLowerCase().includes(searchVal) || 
      s.destination.toLowerCase().includes(searchVal) ||
      s.authorName.toLowerCase().includes(searchVal);
    return matchTag && matchSearch;
  });

  if (!container) return;

  container.innerHTML = stories.map(story => `
    <div class="community-card">
      <div class="community-cover" style="background-image: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%), url('${story.coverImage}')">
        <span class="badge badge-accent">${story.tag.toUpperCase()}</span>
        <span class="badge badge-primary">${story.duration}</span>
      </div>
      <div class="community-card-body">
        <div class="community-author-box">
          <img src="${story.authorAvatar}" alt="${story.authorName}" class="comm-avatar" />
          <div class="comm-author-info">
            <strong>${story.authorName}</strong>
            <small>${story.authorCity}</small>
          </div>
        </div>
        <h3>${story.title}</h3>
        <p class="trip-stops-line"><i data-lucide="map-pin"></i> ${story.destination}</p>
        <p class="comm-desc">${story.description}</p>
        <div class="community-card-footer">
          <div class="comm-social-actions">
            <button class="comm-action-btn ${story.isLiked ? 'active' : ''}" onclick="toggleCommunityLike('${story.id}')">
              <i data-lucide="heart"></i>
              <span>${story.likes}</span>
            </button>
            <button class="comm-action-btn ${story.isSaved ? 'active' : ''}" onclick="toggleCommunitySave('${story.id}')">
              <i data-lucide="bookmark"></i>
              <span>${story.saves}</span>
            </button>
          </div>
          <button class="btn btn-outline btn-sm" onclick="copyCommunityTrip('${story.id}')">
            <i data-lucide="copy"></i>
            <span>Clone Itinerary</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  lucide.createIcons();
}

function toggleCommunityLike(storyId) {
  const story = AppState.communityStories.find(s => s.id === storyId);
  if (!story) return;

  story.isLiked = !story.isLiked;
  story.likes += story.isLiked ? 1 : -1;
  renderCommunityScreen();
}

function toggleCommunitySave(storyId) {
  const story = AppState.communityStories.find(s => s.id === storyId);
  if (!story) return;

  story.isSaved = !story.isSaved;
  story.saves += story.isSaved ? 1 : -1;
  showToast(story.isSaved ? "Saved story to your travel bookmarks!" : "Removed from bookmarks.", "primary", "bookmark");
  renderCommunityScreen();
}

function copyCommunityTrip(storyId) {
  const story = AppState.communityStories.find(s => s.id === storyId);
  if (!story) return;

  showToast(`Cloning "${story.title}" into your trips library...`, "success", "sparkles");
  setTimeout(() => {
    const clonedTrip = {
      id: `trip-${Date.now()}`,
      name: story.title,
      coverImage: story.coverImage,
      startDate: "2026-11-01",
      endDate: "2026-11-10",
      durationDays: parseInt(story.duration) || 8,
      travelers: 2,
      travelType: "Friends",
      status: "upcoming",
      cities: story.destination.replace(" (", " · ").replace(")", "").split(" · "),
      interests: ["Culture", "Food", "Scenic"],
      estimatedBudget: 2400,
      actualSpend: 0,
      progressPercent: 40,
      days: []
    };
    AppState.trips.unshift(clonedTrip);
    setActiveTripAndOpenItinerary(clonedTrip.id);
  }, 700);
}

function initCommunityActions() {
  const tabs = document.querySelectorAll("#communityFilterGroup .tab-btn");
  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(b => b.classList.remove("active"));
      t.classList.add("active");
      renderCommunityScreen();
    });
  });

  const searchInput = document.getElementById("communitySearchInput");
  if (searchInput) searchInput.addEventListener("input", renderCommunityScreen);

  // Share Trip Modal
  const modal = document.getElementById("shareTripModal");
  const openBtn = document.getElementById("openShareTripModalBtn");
  const closeBtn = document.getElementById("closeShareModalBtn");
  const cancelBtn = document.getElementById("cancelShareBtn");
  const form = document.getElementById("shareTripForm");

  if (openBtn) openBtn.addEventListener("click", () => modal.classList.remove("hidden"));
  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  if (cancelBtn) cancelBtn.addEventListener("click", () => modal.classList.add("hidden"));

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();
      const title = document.getElementById("shareStoryTitle").value.trim();
      const desc = document.getElementById("shareDescription").value.trim();
      const tag = document.getElementById("shareVibeTag").value;
      const cover = document.getElementById("shareCoverUrl").value.trim();

      const newStory = {
        id: `comm-${Date.now()}`,
        title,
        destination: "Global Wanderlust",
        duration: "8 Days",
        authorName: AppState.currentUser.name,
        authorCity: `${AppState.currentUser.city}, ${AppState.currentUser.country}`,
        authorAvatar: AppState.currentUser.avatar,
        coverImage: cover,
        description: desc,
        tag,
        likes: 1,
        saves: 0,
        isLiked: true,
        isSaved: false
      };

      AppState.communityStories.unshift(newStory);
      modal.classList.add("hidden");
      renderCommunityScreen();
      showToast("Story published to community feed!", "success", "globe");
    });
  }
}

// ====================================================
// SCREEN 11 — CALENDAR CONTROLLER
// ====================================================
function renderCalendarScreen() {
  const curDate = AppState.calendarCurrentDate;
  const monthYearStr = curDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const titleEl = document.getElementById("calendarMonthTitle");
  if (titleEl) titleEl.textContent = monthYearStr;

  const daysGrid = document.getElementById("calendarDaysGrid");
  if (!daysGrid) return;

  const year = curDate.getFullYear();
  const month = curDate.getMonth();

  // First day of the month & total days
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDaysInMonth = new Date(year, month, 0).getDate();

  let daysHtml = "";

  // Previous month trailing days
  for (let i = firstDayIndex - 1; i >= 0; i--) {
    const dNum = prevDaysInMonth - i;
    daysHtml += `<div class="cal-day-cell inactive-month"><span class="cal-date-number">${dNum}</span></div>`;
  }

  // Current month active days
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const isToday = (today.getFullYear() === year && today.getMonth() === month && today.getDate() === d);
    const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const isSelected = dateKey === AppState.calendarSelectedDate;

    // Check which trip spans this date
    let tripPill = "";
    if (year === 2026 && month === 9) { // October 2026
      if (d >= 10 && d <= 22) {
        tripPill = `<span class="cal-trip-pill pill-blue">🇯🇵 Japan Odyssey</span>`;
      }
    } else if (year === 2026 && month === 7) { // August 2026
      if (d >= 28 && d <= 31) {
        tripPill = `<span class="cal-trip-pill pill-orange">🏔 Manali Getaway</span>`;
      }
    }

    daysHtml += `
      <div class="cal-day-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'selected' : ''}" onclick="selectCalendarDate('${dateKey}')">
        <span class="cal-date-number">${d}</span>
        ${tripPill}
      </div>
    `;
  }

  // Next month trailing days to complete 35 or 42 grid cells
  const totalRendered = firstDayIndex + daysInMonth;
  const remainingCells = (totalRendered <= 35 ? 35 : 42) - totalRendered;
  for (let j = 1; j <= remainingCells; j++) {
    daysHtml += `<div class="cal-day-cell inactive-month"><span class="cal-date-number">${j}</span></div>`;
  }

  daysGrid.innerHTML = daysHtml;
  renderSelectedDaySchedule();

  lucide.createIcons();
}

function selectCalendarDate(dateKey) {
  AppState.calendarSelectedDate = dateKey;
  renderCalendarScreen();
}

function renderSelectedDaySchedule() {
  const dateKey = AppState.calendarSelectedDate;
  const badge = document.getElementById("calSelectedDayBadge");
  const title = document.getElementById("calSelectedDayTitle");
  const activitiesContainer = document.getElementById("calSelectedDayActivities");

  if (!badge || !activitiesContainer) return;

  const dateObj = new Date(dateKey + "T00:00:00");
  const formattedStr = dateObj.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  badge.textContent = formattedStr.toUpperCase();

  // Find trip active on this date
  const activeTrip = AppState.trips.find(t => {
    const s = new Date(t.startDate);
    const e = new Date(t.endDate);
    return dateObj >= s && dateObj <= e;
  });

  if (activeTrip) {
    title.textContent = `Schedule: ${activeTrip.name}`;
    const dayData = activeTrip.days[0] || { activities: [] };

    activitiesContainer.innerHTML = `
      <div class="card-box" style="grid-column: 1 / -1;">
        <h4><i data-lucide="map-pin"></i> ${activeTrip.cities.join(' → ')}</h4>
        <p class="text-muted" style="font-size: 0.866rem; margin: 4px 0 12px;">Active traveling day. Estimated spend: $145.00</p>
        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <span class="badge badge-primary-subtle">10:30 AM Hotel Check-in</span>
          <span class="badge badge-primary-subtle">01:00 PM Fuunji Ramen</span>
          <span class="badge badge-primary-subtle">04:30 PM Tokyo Skyline View</span>
        </div>
      </div>
    `;
  } else {
    title.textContent = `No Trips Scheduled on this Date`;
    activitiesContainer.innerHTML = `
      <div class="card-box text-center" style="grid-column: 1 / -1; padding: 24px;">
        <p class="text-muted">You are free on this date. Perfect opportunity to plan a weekend getaway!</p>
        <button class="btn btn-outline btn-sm" style="margin-top: 10px;" data-nav="create">
          <i data-lucide="plus"></i>
          <span>Plan Trip on this Date</span>
        </button>
      </div>
    `;
  }

  lucide.createIcons();
}

function initCalendarActions() {
  const prevBtn = document.getElementById("calPrevMonthBtn");
  const nextBtn = document.getElementById("calNextMonthBtn");
  const todayBtn = document.getElementById("calTodayBtn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      AppState.calendarCurrentDate.setMonth(AppState.calendarCurrentDate.getMonth() - 1);
      renderCalendarScreen();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      AppState.calendarCurrentDate.setMonth(AppState.calendarCurrentDate.getMonth() + 1);
      renderCalendarScreen();
    });
  }
  if (todayBtn) {
    todayBtn.addEventListener("click", () => {
      AppState.calendarCurrentDate = new Date(2026, 9, 1); // Set to Oct 2026 for demo
      AppState.calendarSelectedDate = "2026-10-12";
      renderCalendarScreen();
    });
  }

  const monthViewBtn = document.getElementById("calendarViewMonthBtn");
  const listViewBtn = document.getElementById("calendarViewListBtn");
  const monthView = document.getElementById("calendarMonthView");
  const agendaView = document.getElementById("calendarAgendaView");

  if (monthViewBtn && listViewBtn) {
    monthViewBtn.addEventListener("click", () => {
      monthViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      monthView?.classList.remove("hidden");
      agendaView?.classList.add("hidden");
    });

    listViewBtn.addEventListener("click", () => {
      listViewBtn.classList.add("active");
      monthViewBtn.classList.remove("active");
      monthView?.classList.add("hidden");
      agendaView?.classList.remove("hidden");
      renderAgendaListView();
    });
  }
}

function renderAgendaListView() {
  const container = document.getElementById("agendaItemsContainer");
  if (!container) return;

  container.innerHTML = AppState.trips.map(trip => `
    <div class="agenda-item-card">
      <div class="kpi-mini-icon bg-blue-light"><i data-lucide="calendar"></i></div>
      <div class="flex-1">
        <strong>${trip.name}</strong>
        <p class="text-muted" style="font-size: 0.8rem;">${formatDateRange(trip.startDate, trip.endDate)} · ${trip.durationDays} Days</p>
      </div>
      <button class="btn btn-outline btn-sm" onclick="setActiveTripAndOpenItinerary('${trip.id}')">
        <span>View</span>
      </button>
    </div>
  `).join('');

  lucide.createIcons();
}

// ====================================================
// SETTINGS & DEMO STATE CONTROLLER
// ====================================================
function initSettingsActions() {
  const saveBtn = document.getElementById("saveSettingsBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      showToast("Settings preferences saved successfully!", "success", "check");
    });
  }

  const resetBtn = document.getElementById("resetDemoDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      showToast("Demo state reset to original sample values.", "primary", "rotate-ccw");
      setTimeout(() => location.reload(), 800);
    });
  }

  const exportBtn = document.getElementById("exportAnalyticsBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", () => {
      showToast("Generating PDF analytics summary report...", "primary", "download");
    });
  }
}

// ====================================================
// DOM CONTENT LOADED ENTRY POINT
// ====================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAuth();
  initCreateTripWizard();
  initItineraryActions();
  initActivityModal();
  initMyTripsActions();
  initProfileModal();
  initExploreActions();
  initQuickModal();
  initBudgetModals();
  initCommunityActions();
  initCalendarActions();
  initSettingsActions();

  // Initial render calls
  renderHomeScreen();
  updateUserProfileDom();
  lucide.createIcons();
});
