# MatchMate

Welcome to **MatchMate**, the ultimate marriage media application designed to help you find your ideal partner and build your dream love story. Our platform is **user-friendly, feature-rich**, and crafted to make your journey to love seamless and memorable.

## 📌 Table of Contents

- [Tech Stack](#tech-tack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Dependencies](#dependencies)
- [Development Dependencies](#development-dependencies)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## 🎨 Tech Stack

🖌️ Frontend**: React.js, HTML, Tailwind CSS, JavaScript
🗄️ Backend**: Node.js, Express.js
🛢️ Database**: MongoDB
🛡️ Authentication**: JWT (JSON Web Token), Firebase Authentication
💳 Payment Gateway**: Stripe

---

## ✨ Features

- **Advanced Matchmaking** – AI-driven algorithms help you find the perfect partner.
- **Secure Authentication** – Integrated with Firebase for seamless login and user management.
- **Real-Time Chat** – Communicate with potential matches directly within the app.
- **Premium Subscription** – Stripe-powered payment integration for premium services.
- **Interactive UI** – Built with React, Tailwind CSS, and animations via Lottie.
- **Role Based Dashboard** – Keep track of matches, request, and others things.

---

## 🔒 Credintails:-

- [Live-Link](https://matchmate-de063.firebaseapp.com)
- admin email: admin@gmail.com
- admin pass: Asdf!1

---

## 🛠️ Installation

### Prerequisites

- **Node.js** (Latest LTS recommended)
- **npm** or **yarn** installed
- **Vite** for development

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/matchmate.git
   cd matchmate
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the root directory and add the following:**

   ```env
   VITE_apiKey=YOUR_FIREBASE_API_KEY
   VITE_authDomain=YOUR_FIREBASE_AUTH_DOMAIN
   VITE_projectId=YOUR_FIREBASE_PROJECT_ID
   VITE_storageBucket=YOUR_FIREBASE_STORAGE_BUCKET
   VITE_messagingSenderId=YOUR_FIREBASE_MESSAGING_SENDER_ID
   VITE_appId=YOUR_FIREBASE_APP_ID
   VITE_IMGBB_KEY=YOUR_IMGBB_KEY
   VITE_PK_STRIPE=YOUR_STRIPE_PUBLIC_KEY
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚀 Usage

1. **Sign Up or Log In** using Firebase authentication.
2. **Create your profile**, upload images via IMGBB, and set preferences.
3. **Explore Matches** using AI-powered recommendations.
4. **Chat & Interact** with potential partners.
5. **Upgrade to Premium** via Stripe for exclusive features.

---

## ⚙️ Configuration

MatchMate uses **environment variables** to configure Firebase, IMGBB, and Stripe. Make sure to update `.env` with your own credentials.

---

## 📦 Dependencies

MatchMate is built using the following technologies:

- **Frontend Framework**: [React](https://react.dev/)
- **State Management**: [TanStack React Query](https://tanstack.com/query/latest)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Lottie React](https://www.npmjs.com/package/lottie-react)
- **Authentication & Storage**: [Firebase](https://firebase.google.com/)
- **Payments**: [Stripe](https://stripe.com/)
- **Data Fetching**: [Axios](https://axios-http.com/)

### Full List of Dependencies

```json
"dependencies": {
  "@lottiefiles/dotlottie-react": "^0.12.1",
  "@smastrom/react-rating": "^1.5.0",
  "@stripe/react-stripe-js": "^3.1.1",
  "@stripe/stripe-js": "^5.5.0",
  "@tanstack/react-query": "^5.64.1",
  "axios": "^1.7.9",
  "firebase": "^11.1.0",
  "flowbite": "^2.5.2",
  "localforage": "^1.10.0",
  "lottie-react": "^2.4.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-helmet-async": "^2.0.5",
  "react-hook-form": "^7.54.2",
  "react-hot-toast": "^2.5.1",
  "react-icons": "^5.4.0",
  "react-loader-spinner": "^6.1.6",
  "react-parallax": "^3.5.1",
  "react-router-dom": "^7.1.1",
  "react-select": "^5.9.0",
  "react-tooltip": "^5.28.0",
  "recharts": "^2.15.0",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.10",
  "swiper": "^11.2.1"
}
```

---

## 🏗️ Development Dependencies

```json
"devDependencies": {
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.18",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.14.0",
  "postcss": "^8.5.1",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.5"
}
```

---

## 🛠️ Troubleshooting

- **App doesn't start?** Make sure you've installed all dependencies:

  ```bash
  npm install
  ```

- **Environment variables not working?** Ensure you’ve created the `.env` file and restarted the server.

- **Firebase errors?** Verify your Firebase credentials in `.env`.

- **Payment issues?** Confirm that you’re using valid **Stripe API keys**.

---

## 📜 License

This project is licensed under the **MIT License**.

---
