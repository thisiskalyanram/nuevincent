# NueVincent 🎬

> **Luxury Filmmaking & Creative Direction Portfolio & Client Portal**

A modern web application and client portal built for **NueVincent**, featuring high-end aesthetics, cinematic video showcases, dynamic project filtering, client enquiry flows, and a Firebase-backed administrative dashboard.

---

## ✨ Features

- **Cinematic Visual Design**: Dark luxury aesthetics with fluid animations, glassmorphism, responsive video hero banners, and curated typography.
- **Interactive Portfolio**: Filterable project gallery (Commercials, Music Videos, Documentaries, Fashion Films) with detailed case studies, technical specs, stills carousel, and interactive video player modal.
- **Multi-Step Client Briefing**: Interactive quote & enquiry generator with real-time budget selection, project scope breakdown, and direct submission.
- **Admin Dashboard & Management**:
  - Secure authentication via Firebase Auth.
  - Project management (Create, Read, Update, Delete portfolio pieces).
  - Client enquiry pipeline tracking and status updates.
  - System settings and brand profile controls.
- **Performance & SEO**:
  - Server-side rendering (SSR) and dynamic metadata powered by Next.js App Router.
  - Dynamic `sitemap.ts` and `robots.ts`.
  - Optimized image and video delivery.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19 / React 18, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom luxury color tokens & keyframe animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend & Database**: [Google Firebase](https://firebase.google.com/) (Cloud Firestore, Firebase Storage, Firebase Authentication)
- **Deployment**: Next.js Standalone / Vercel / Firebase App Hosting

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.17 or higher)
- [npm](https://www.npmjs.com/) or `yarn` / `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thisiskalyanram/nuevincent.git
   cd nuevincent
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment configuration:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Firebase project credentials in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```text
nuevincent/
├── src/
│   ├── app/                    # Next.js App Router pages and API routes
│   │   ├── about/              # Director bio & philosophy
│   │   ├── admin/              # Dashboard, enquiries & CMS controls
│   │   ├── contact/            # Multi-step contact & enquiry page
│   │   ├── portfolio/          # Project showcase & [slug] case study details
│   │   ├── services/           # Creative direction, production & post-production
│   │   └── api/                # API routes for enquiries and webhooks
│   ├── components/             # Reusable UI & section components
│   │   ├── enquiry/            # Multi-step inquiry wizard
│   │   ├── home/               # Hero, Featured Work, Process & CTA sections
│   │   ├── layout/             # Navbar, Footer & AdminSidebar
│   │   ├── portfolio/          # ProjectCard, VideoPlayerModal
│   │   ├── providers/          # AuthProvider & Context
│   │   └── ui/                 # Buttons, Inputs, Modals, Badges
│   ├── lib/                    # Firebase SDK config, Firestore service & mock data
│   ├── styles/                 # Global styles & custom scrollbars
│   └── types/                  # TypeScript interface definitions
├── firestore.rules             # Cloud Firestore security rules
├── storage.rules               # Firebase Storage security rules
├── DEPLOYMENT.md               # Step-by-step production deployment guide
└── CONTENT.md                  # Site copy, scripts and director notes
```

---

## 🔒 Security Rules

- Firestore and Storage rules are pre-configured in [firestore.rules](firestore.rules) and [storage.rules](storage.rules).
- Client-side enquiries write securely to Firestore without exposing administrative capabilities.
- Admin routes are protected by Firebase Auth session tokens.

---

## 📄 License

All rights reserved © NueVincent.
