GlobeTrotter - Travel Planning Application 
🌍 A personalized, intelligent platform for planning multi-city travel experiences 
📋 Project Overview 
GlobeTrotter is a hackathon project aimed at creating a comprehensive travel planning application.
It combines a modern frontend with a robust backend to help users create customized itineraries,
explore destinations, manage budgets, and share travel plans with friends. 
Repository: This Odoo–main repository contains the backend infrastructure and frontend entry
point for the GlobeTrotter travel planning application. 
 🎯 Key Features 
✅ Authentication - User login and signup with secure credential management
✅ Trip Management - Create, edit, and delete travel plans
✅ Itinerary Builder - Add multiple cities, dates, and activities
✅ City & Activity Search - Discover destinations and experiences
✅ Budget Tracking - Automatic cost breakdowns and expense management
✅ Trip Visualization - Calendar and timeline views of itineraries
✅ Sharing & Collaboration - Share public itineraries with others
✅ Payment Integration - Stripe integration for secure transactions 
 📁 Project Structure 
Odoo--main/
├── backends/ # Backend API Server
│ ├── app.js # Express server setup
│ ├── package.json # Node.js dependencies
│ ├── config.env # Environment variables
│ ├── route/ # API route handlers
│ │ ├── booking.js # Trip/Booking endpoints
│ │ ├── bus.js # Transport endpoints
│ │ ├── customer.js # User endpoints
│ │ ├── route.js # Route/Path endpoints
│ │ ├── busservice.js # Service endpoints
│ │ └── bookinghire.js # Hire/Charter endpoints
│ ├── controller/ # Business logic controllers
│ ├── backends/models/ # MongoDB Data Models
│ │ ├── customer.js # User profile model
│ │ ├── booking.js # Trip/Booking model
│ │ ├── bus.js # Transport/Vehicle model
│ │ ├── route.js # Journey route model│ │ └── busservice.js # Service offerings model
│ └── route/ # API routing configuration
├── index.html # Frontend entry point
└── style.css # Styling for the application

 🛠️ Technology Stack 
Frontend 
HTML5 - Markup structure
CSS3 - Styling and responsive design
Vanilla JavaScript - Client-side logic 
Backend 
Node.js & Express.js - REST API server
MongoDB - NoSQL database (via Mongoose ODM)
Stripe API - Payment processing
CORS - Cross-origin resource sharing 
Development Tools 
Nodemon - Auto-restart during development
UUID - Unique identifier generation
Dotenv - Environment variable management 
 🚀 Quick Start 
Prerequisites 
Node.js v14+ installed
MongoDB account (Atlas or local instance)
Stripe test account 
Setup Instructions 
1. Clone the Repository 
git clone <repository-url>
cd Odoo--main

2. Install Backend Dependencies 
cd backends
npm install

3. Configure Environment Variables 
Create a config.env file in the backends/ directory: env MONGODB_URI=mongodb+srv:/username:password@cluster.mongodb.net/dbname
STRIPE_SECRET_KEY=sk_test_your_stripe_key PORT=3020 NODE_ENV=development 
4. Start the Backend Server 
# Development mode (with auto-reload)
npm run dev
 # Production mode
npm start

The server will run on http://localhost:3020 
5. Open Frontend 
Open index.html in your browser or serve it via a local server. 
 📊 Database Models 
1. Customer Model 
Stores user profile information javascript { name: String, email: String (unique), password: String
(hashed), profilePhoto: String, preferences: Object, createdAt: Date } 
2. Booking Model 
Stores trip/itinerary information javascript { customerId: ObjectId, tripName: String, startDate:
Date, endDate: Date, description: String, stops: [CityStop], totalBudget: Number, totalCost:
Number, status: String, isPublic: Boolean } 
3. Route Model 
Stores travel routes and paths between cities javascript { startCity: String, endCity: String,
distance: Number, estimatedTime: Number, transportType: String, cost: Number } 
4. Bus Model (Adapted for Transport) 
Stores vehicle/transport information javascript { name: String, type: String, capacity: Number,
costPerDay: Number, availableDates: [Date] } 
5. BusService Model (Adapted for Services) 
Stores activity and service information javascript { serviceName: String, type: String (e.g.,
"Activity", "Hotel", "Food"), city: String, description: String, cost: Number, duration: Number,
rating: Number } 
 🔌 API Endpoints 
AuthenticationPOST /api/auth/signup - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout 
Trips/Bookings 
POST /api/bookings - Create new trip
GET /api/bookings/:id - Get trip details
PUT /api/bookings/:id - Update trip
DELETE /api/bookings/:id - Delete trip
GET /api/bookings - List all user trips 
Cities & Routes 
GET /api/routes - Get available routes/cities
GET /api/routes/search?city=name - Search cities 
Services & Activities 
GET /api/busservice - Get available services/activities
GET /api/busservice/search?type=activity - Search activities 
Payments 
POST /api/stripe-payments - Process payment via Stripe 
 🎨 Frontend Screens (To Implement) 
Login/Signup - Authentication page
Dashboard - Home screen with trip overview
Create Trip - Form to start new trip
Trip List - View all user trips
Itinerary Builder - Add cities and activities
Trip View - Visual representation of itinerary
City Search - Explore destinations
Activity Search - Browse experiences
Budget Breakdown - Cost analysis and alerts
Timeline/Calendar - Visual schedule
Shared Itinerary - Public sharing page
User Settings - Profile management
Admin Dashboard - Analytics (optional) 
 🔐 Security Considerations 
⚠️ Important Security Notes: - The Stripe API key in app.js is a test key (expires Sept 1, 2026) -
Replace with production key before deployment - MongoDB credentials are hardcoded - Move to
environment variables - Implement authentication middleware for protected routes - Add input
validation and sanitization - Use HTTPS in production - Hash passwords using bcrypt 📝 Modification Guide 
To Adapt for GlobeTrotter: 
Update Models - Rename “Bus” to “Transport” and adapt fields for travel
Rename Routes - Change bus-specific endpoints to travel-planning endpoints
Update Controllers - Modify business logic for trip management
Frontend Development - Build the 13 screens from GlobeTrotter specifications
Database Schema - Ensure support for cities, activities, itineraries, budgets
Payment Integration - Keep Stripe but adapt for trip/activity payments 
 🧪 Testing 
Currently, no automated tests are configured. To add tests: 
npm install --save-dev jest supertest

Then create test files in a __tests__/ directory. 
 📈 Development Workflow 
Create a new branch for your feature bash git checkout -b feature/your-feature 
Make changes to models, routes, or controllers
Test your API using Postman or similar tool
Commit with clear messages bash git commit -m "feat: add trip budget calculation" 
Push to repository bash git push origin feature/your-feature 
 🐛 Troubleshooting 
MongoDB Connection Fails 
Verify connection string in config.env
Check MongoDB Atlas IP whitelist
Ensure network access is enabled 
Stripe Payment Error 
Verify Stripe API key is valid
Check if key has expired (Sept 2026)
Use Stripe test cards: 4242 4242 4242 4242 
Port Already in UseKill existing process: lsof -ti:3020 | xargs kill -9
Or change PORT in config.env 
CORS Issues 
Ensure frontend origin is allowed in CORS config
Check if requests include proper headers 
 📚 Resources 
GlobeTrotter Specifications
Express.js Documentation
MongoDB Mongoose Guide
Stripe API Reference
Excalidraw Mockups 
