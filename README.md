# 🎟️ EventHorizon Frontend

EventHorizon is a modern **ticketing and event management platform** built with React and Vite.  
Users can browse events, purchase tickets, and manage their bookings with a seamless, responsive interface.

---

## ✨ Features

- 👤 **User Authentication**
  - Email & password registration with OTP verification
  - Secure JWT-based login
  - Password reset functionality
  - Profile management with image upload

- 🎟️ **Event Discovery**
  - Browse upcoming events by category
  - Search and filter events
  - View detailed event information
  - Automatic filtering of past/outdated events
  - Featured events showcase

- 🛒 **Ticket Purchase**
  - Multiple ticket types (General, VIP, Premium)
  - Secure Paystack payment integration
  - Real-time ticket availability tracking
  - Purchase history and ticket management
  - Automatic prevention of purchases for past events

- 📱 **Responsive Design**
  - Mobile-first approach
  - Modern UI with Tailwind CSS
  - Smooth animations and transitions
  - Optimized for all screen sizes

- 🎨 **Organizer Features** (Admin-Assigned Only)
  - Create and manage events
  - Upload multiple event images (up to 5)
  - Set ticket prices and availability
  - Track event performance
  - Currently restricted to admin-assigned organizer accounts

---

## 🛠 Tech Stack

- **Framework**: [React 18](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Date Handling**: [date-fns](https://date-fns.org/)

---

## 📂 Project Structure
```bash
.
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── Navbar.jsx   # Navigation bar
│   │   ├── Footer.jsx   # Footer component
│   │   └── ...
│   ├── lib/             # Utility functions
│   │   └── axiosConfig.js
│   ├── pages/           # Route pages
│   │   ├── Home.jsx
│   │   ├── Events.jsx
│   │   ├── EventDetails.jsx
│   │   ├── CreateEvent.jsx
│   │   └── ...
│   ├── store/           # Zustand state management
│   │   ├── authStore.js
│   │   └── useEventStore.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Installation & Setup

### 🔽 Clone the repository
```bash
git clone https://github.com/yourusername/eventhorizon-frontend.git
cd eventhorizon-frontend
```

### 📦 Install dependencies
```bash
npm install
```

### 🔧 Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api/v1
# Or your production API URL
# VITE_API_BASE_URL=https://your-backend-url.com/api/v1
```

### 🚀 Run Development Server
```bash
npm run dev
```

The app will be available at: http://localhost:5173

### 🏗️ Build for Production
```bash
npm run build
```

### 👀 Preview Production Build
```bash
npm run preview
```

---

## 📝 User Roles & Access

### Current Implementation
- **Regular Users**: All new signups are automatically assigned the "user" role
  - Browse and search events
  - Purchase tickets
  - Manage their bookings
  - Update profile information

- **Organizers**: Currently only manually assigned by administrators
  - All regular user capabilities
  - Create and manage events
  - Set ticket prices and availability
  - Upload event images and details

### Future Enhancement
The codebase includes functionality (currently commented out) to allow users to choose their role during signup. This can be enabled when the platform opens up event creation to all users.

---

## 🔑 Key Features Explained

### Event Management
- Events are automatically marked as "outdated" when their date passes
- Only upcoming events are displayed to users
- Ticket purchases are blocked for past events

### Image Handling
- Support for multiple event images (up to 5)
- Preview before upload
- Individual image removal
- Automatic upload to Cloudinary via backend

### Payment Flow
1. User selects tickets and quantity
2. Payment initialized with Paystack
3. User redirected to Paystack payment page
4. Payment verified on return
5. Ticket status updated automatically

---

## 🎨 Customization

### Tailwind Configuration
Customize colors, fonts, and other design tokens in `tailwind.config.js`

### Component Library
UI components are built with shadcn/ui and can be customized in `src/components/ui/`

---

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the 'dist' folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the 'dist' folder to Netlify
```

### Environment Variables
Don't forget to set `VITE_API_BASE_URL` in your deployment platform's environment settings.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 📧 Support

For support, email support@eventhorizon.com or open an issue on GitHub.

---

🎉 **EventHorizon** - Your Gateway to Unforgettable Events!