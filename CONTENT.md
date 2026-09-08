# NUEVINCENT - Content & Portfolio Management Guide 📝

This guide explains how to easily add, edit, or remove portfolio projects, customize text and copy, change contact info, and update services across the **NUEVINCENT** website.

---

## 🎬 1. Adding, Editing, & Removing Portfolio Projects

All portfolio projects are centralized in a single file:  
📁 **[`src/data/projects.ts`](src/data/projects.ts)**

### ➕ How to Add a New Project
Open `src/data/projects.ts` and add a new project object to the `PROJECTS_DATA` array:

```typescript
{
  id: "my-new-film",
  title: "The Midnight Horizon",
  slug: "the-midnight-horizon", // URL-friendly identifier: /portfolio/the-midnight-horizon
  category: "FILMS",            // Options: 'FILMS' | 'ADVERTISING' | 'BRANDS' | 'PRODUCTS' | 'SOCIAL MEDIA' | 'POST-PRODUCTION'
  year: "2026",
  duration: "12m 45s",
  client: "Aura Media",
  thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop",
  videoUrl: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID", // or Vimeo URL
  description: "A high-concept sci-fi short film exploring digital memory and human solitude in near-future Hyderabad.",
  fullStory: "Shot over 6 nights with anamorphic optics, this film balances intimate character study with atmospheric worldbuilding...",
  challenge: "Overcoming low-light constraints during night exterior shoots while maintaining dynamic range and rich shadow tones.",
  solution: "Utilized dual-ISO cinema sensors paired with wireless high-output LED fixtures and custom ACES film emulation curves in DaVinci Resolve.",
  services: ["Direction", "Cinematography", "DaVinci Resolve Color Grading", "5.1 Sound Design"],
  credits: [
    { role: "Director", name: "Vincent K." },
    { role: "Director of Photography", name: "Rahul S." },
    { role: "Colorist", name: "Vincent K." },
    { role: "Sound Designer", name: "Arjun V." }
  ],
  galleryUrls: [
    "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop"
  ],
  featured: true, // Set to true to display on the Homepage
  order: 1        // Display sorting priority (1 = first)
}
```

### ✏️ How to Edit a Project
1. Open `src/data/projects.ts`.
2. Locate the project by its `id` or `title`.
3. Change any field (title, videoUrl, description, services, etc.) and save the file.

### 🗑️ How to Delete a Project
1. Open `src/data/projects.ts`.
2. Remove the project object from the `PROJECTS_DATA` array and save the file.

---

## 🛠️ 2. Updating Services & Capabilities

All studio services and deliverables are defined in:  
📁 **[`src/lib/services-data.ts`](src/lib/services-data.ts)**

Modifying this file automatically updates:
1. **Homepage Services Preview** (`/`)
2. **Dedicated Services Page** (`/services`)
3. **Disciplines Links** in the Navbar & Footer

Each service includes:
- `title` (e.g. "Film Production")
- `subtitle` (e.g. "Narrative, Short Films & Documentaries")
- `description` (Detailed explanation)
- `capabilities` (Bulleted scope list)
- `deliverables` (Bulleted output list)
- `gearAndTech` (Camera & technical gear tags)

---

## 📞 3. Updating Studio Contact Details & Social Links

### Contact Information (Phone, Email, Address)
To change the studio's email, phone number, or physical location:
- **Navbar & Mobile Menu**: `src/components/layout/Navbar.tsx`
- **Footer**: `src/components/layout/Footer.tsx`
- **Contact Page**: `src/app/contact/page.tsx`

### Social Media Handles (Instagram, YouTube, LinkedIn)
In `src/components/layout/Footer.tsx`, locate the social icons and update `href`:
```tsx
<a href="https://instagram.com/yourhandle" ...>
<a href="https://youtube.com/@yourhandle" ...>
<a href="https://linkedin.com/company/yourhandle" ...>
```

---

## 🎨 4. Updating Headlines & Brand Copy

| Content Element | File Path |
| :--- | :--- |
| **Hero Title & Slogan** | `src/components/home/HeroSection.tsx` |
| **Hero Timecode / Specs** | `src/components/home/HeroSection.tsx` |
| **Category Marquee Ticker** | `src/components/home/CategoryTicker.tsx` |
| **Brand Manifesto** | `src/components/home/BrandStatement.tsx` |
| **5-Step Creative Process** | `src/components/home/ProcessSection.tsx` |
| **CTA Banners** | `src/components/home/CTASection.tsx` |
| **About Studio Story** | `src/app/about/page.tsx` |
| **Client FAQ Questions** | `src/app/contact/page.tsx` |
| **Privacy Policy** | `src/app/privacy-policy/page.tsx` |
| **Terms of Service** | `src/app/terms/page.tsx` |

---

## 🚀 5. Publishing Your Changes

Whenever you save changes to any file:
```bash
git add .
git commit -m "Update portfolio project details"
git push origin main
```
Netlify will automatically detect the push and deploy the updated website to your live domain within 1-2 minutes!
