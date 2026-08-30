# NUEVINCENT - Content Customization Guide

This document is your single reference for updating text, contact details, social media handles, portfolio projects, and brand information across the **NUEVINCENT** website.

---

## 1. Studio Contact & Location Details

To update the studio's email, phone number, physical address, and hours:

- **Footer & Studio Contact Cards:**
  - File: `src/components/layout/Footer.tsx` (Lines 110–135)
  - File: `src/app/contact/page.tsx` (Lines 45–75)
- **Default Fields to Edit:**
  - **Phone:** `+91 (040) 800-FILM`
  - **Email:** `contact@nuevincent.com`
  - **Address:** `Hyderabad, Telangana, India`

---

## 2. Social Media Links

To link your official Instagram, YouTube, and LinkedIn pages:

- **File:** `src/components/layout/Footer.tsx` (Lines 40–70)
- **Replace URLs:**
  - Instagram: `https://instagram.com/yourhandle`
  - YouTube: `https://youtube.com/@yourhandle`
  - LinkedIn: `https://linkedin.com/company/yourhandle`

---

## 3. Brand Positioning & Hero Headlines

To update the main slogans and headlines:

- **Hero Headline & Statement:**
  - File: `src/components/home/HeroSection.tsx`
  - Main Headline: `"NUEVINCENT"`
  - Subtitle: `"Creative Visuals. Stories. Brands. Films."`
  - Statement: `"We turn ideas, stories and brands into experiences that make an impact."`
- **Brand Manifesto:**
  - File: `src/components/home/BrandStatement.tsx`
  - Headline: `"WE DON'T JUST MAKE VIDEOS. WE CREATE EXPERIENCES."`
- **About Page Story:**
  - File: `src/app/about/page.tsx`

---

## 4. Portfolio Projects (Initial Seed Data)

Initial projects are pre-loaded in:
- **File:** `src/lib/sample-projects.ts`

Each project contains:
```typescript
{
  id: "proj-1",
  title: "Echoes of Silence",
  slug: "echoes-of-silence",
  category: "FILMS", // 'FILMS' | 'ADVERTISING' | 'BRANDS' | 'PRODUCTS' | 'SOCIAL MEDIA' | 'POST-PRODUCTION'
  year: "2025",
  duration: "14m 20s",
  client: "Independent Cinema Initiative",
  thumbnailUrl: "https://...",
  videoUrl: "https://www.youtube.com/watch?v=...",
  description: "Short summary...",
  fullStory: "In-depth story...",
  services: ["Cinematography", "Direction", "Color Grading"],
  credits: [
    { role: "Director", name: "Vincent K." },
    { role: "Director of Photography", name: "..." },
    { role: "Lead Colorist", name: "..." }
  ],
  galleryUrls: ["https://...", "https://..."],
  featured: true
}
```

> **Note:** Once your Firebase Firestore is connected, you can also add, edit, and delete portfolio items directly using the visual **Admin Dashboard** at `/admin/portfolio`.

---

## 5. Services & Capabilities

To edit or expand service descriptions, deliverables, or technical equipment:
- **File:** `src/lib/services-data.ts`
- Modifying this file automatically updates:
  1. The Homepage Services Preview (`/`)
  2. The Dedicated Services Page (`/services`)

---

## 6. Admin Portal Access

To manage incoming client enquiries and live portfolio projects:
- **URL:** `https://yourdomain.com/admin` (or `http://localhost:3000/admin`)
- **Login:** Uses Firebase Authentication (Email + Password). In local demo mode before adding `.env.local`, enter any admin email and password (&ge;6 characters) to access the dashboard.
