# 🚀 EventHorizon Frontend

EventHorizon is a modern **event ticketing web application** built with **React + Vite**.  
It allows **organizers** to create and manage events, while **users** can explore, purchase, and manage tickets.  

The frontend is designed with a **clean UI, smooth user experience, and fast performance** in mind.  

---

## ✨ Features

- 🎟 **Ticketing System** – Buy and manage event tickets (General, VIP, Premium)  
- 🗓 **Event Management** – Organizers can create and update events  
- 🔐 **Authentication & Authorization** – Role-based access (User / Organizer)  
- 💳 **Payments** – Integrated with Paystack (test mode ready)  
- 📩 **OTP Verification** – Extra layer of account security  
- 💸 **Refund Policy** – Refund rules enforced (e.g., no refunds within 14 days of an event)  
- 📊 **State Management** – Powered by Zustand  
- ⚡ **Fast & Optimized** – React 19 + Vite for blazing speed  

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)  
- **Routing**: [React Router v7](https://reactrouter.com/)  
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)  
- **Icons**: [Lucide React](https://lucide.dev/)  
- **UI Primitives**: [Radix UI](https://www.radix-ui.com/)  
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)  
- **Data Fetching**: [TanStack React Query](https://tanstack.com/query)  
- **Date Utilities**: [date-fns](https://date-fns.org/)  
- **HTTP Client**: [Axios](https://axios-http.com/)  
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)  

---

## 📂 Project Structure

```bash
src/
 ├── assets/          # Static assets (images, icons, etc.)
 ├── components/      # Reusable UI components
 ├── pages/           # App pages (Profile, Events, Tickets, etc.)
 ├── routes/          # Route definitions and protection
 ├── store/           # Zustand store (state management)
 ├── utils/           # Helpers and utilities
 ├── App.jsx          # Main app component
 ├── main.jsx         # Entry point
 └── index.css        # Tailwind base + custom styles

 ```

## ⚙️ Installation & Setup

- Clone the repository

git clone https://github.com/tmeechh/Ticketing-App-FE.git



- Install dependencies

npm install


- Create a .env file

VITE_API_BASE_URL=http://localhost:5000/api


- Run development server

npm run dev


- Build for production

npm run build


- Preview production build

npm run preview

- 🌍 Deployment

The project is optimized for Vercel:

Push to GitHub/GitLab/Bitbucket

Connect repo on Vercel

Add environment variables in dashboard

Deploy 🚀

### 🔒 Authentication Flow

Users can sign up / log in

OTP verification ensures account security

Protected routes with role-based access (Users vs Organizers)

### 👨‍💻 Contributing

Contributions are welcome!

Fork the repo

Create a branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push (git push origin feature/amazing-feature)

Open a Pull Request



## 📜 License

This project is licensed under the MIT License.

🔥 Built with love, React, and caffeine.