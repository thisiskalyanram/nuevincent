# NUEVINCENT 🎬

> **Cinematic Film & Visual Production Studio Website**

A modern, high-performance web application built for **NUEVINCENT** — a creative media and visual production studio focused on filmmaking, advertising, branded content, and post-production.

The project is fully optimized for **Netlify** hosting with automated GitHub CI/CD, Netlify Forms for customer project enquiries, and centralized TypeScript-based portfolio management.

---

## ✨ Features & Highlights

- **Cinematic & Colorful Aesthetics**: Dark cinema palette with neon purple/orange glows, anamorphic aspect ratio badges (2.39:1 / 16:9), live running studio timecode (`00:00:00:00`), and interactive video showreel modal.
- **Dynamic Portfolio Showcase**: Fast, pre-rendered filterable portfolio across **FILMS**, **ADVERTISING**, **BRANDS**, **PRODUCTS**, **SOCIAL MEDIA**, and **POST-PRODUCTION**.
- **Case Study Pages**: Rich project detail layouts with embedded cinema players, technical credits, creative challenges/solutions, and production stills lightbox.
- **Multi-Step Netlify Form**: 5-step interactive briefing wizard with custom budget selection, timeline estimation, bot honeypot protection, and automatic reference code generation.
- **Zero Heavy Backend Dependencies**: 100% serverless and static-friendly architecture — completely free of Firebase, Supabase, or external database setups.
- **SEO & Performance**: Dynamic `sitemap.ts`, `robots.ts`, OpenGraph metadata, fast asset loading, and mobile touch-friendly navigation.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with customized cinema tokens & keyframe animations
- **Icons**: [Lucide React](https://lucide.dev/)
- **Hosting & CI/CD**: [Netlify](https://www.netlify.com/) (`@netlify/plugin-nextjs`, `netlify.toml`)
- **Forms**: [Netlify Forms](https://docs.netlify.com/forms/setup/) (native static + AJAX submission)
- **Data Layer**: Centralized typed dataset at [`src/data/projects.ts`](src/data/projects.ts)

---

## 🚀 Getting Started Locally

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.18 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation & Local Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/thisiskalyanram/nuevincent.git
   cd nuevincent
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify production build**:
   ```bash
   npm run build
   ```

---

## 📁 Project Structure

```text
nuevincent/
├── public/
│   ├── __forms.html            # Static Netlify Forms crawler template
│   └── ...
├── src/
│   ├── app/                    # Next.js App Router routes
│   │   ├── about/              # Studio philosophy & equipment specs
│   │   ├── contact/            # Multi-step briefing & enquiry wizard
│   │   ├── portfolio/          # Filterable showcase & [slug] case studies
│   │   ├── services/           # Production disciplines & deliverables
│   │   ├── privacy-policy/     # Privacy policy & data protection
│   │   ├── terms/              # Production terms of engagement
│   │   ├── sitemap.ts          # Automated dynamic sitemap
│   │   └── robots.ts           # Search engine indexing rules
│   ├── components/
│   │   ├── enquiry/            # 5-step briefing form & success modal
│   │   ├── home/               # Hero, Ticker, Featured Work, Process, CTA
│   │   ├── layout/             # Navbar, Footer
│   │   ├── portfolio/          # ProjectCard, VideoPlayerModal
│   │   └── ui/                 # Buttons, Inputs, Badges, Modals
│   ├── data/
│   │   └── projects.ts         # Centralized portfolio data & queries
│   ├── lib/
│   │   ├── services-data.ts    # Service definitions & capabilities
│   │   └── utils.ts            # Class merge & video embed helpers
│   ├── styles/
│   │   └── globals.css         # Cinema styles, scrollbars & glow effects
│   └── types/
│       └── index.ts            # TypeScript interfaces & types
├── netlify.toml                # Netlify build configuration & Next.js plugin
├── CONTENT.md                  # How to update text, projects & contact info
├── DEPLOYMENT.md               # Step-by-step Netlify deployment & domain guide
└── README.md
```

---

## 📝 Managing Content & Portfolio

All portfolio projects are stored in [`src/data/projects.ts`](src/data/projects.ts). You can add, edit, or remove projects simply by modifying this file.

Refer to [`CONTENT.md`](CONTENT.md) for detailed instructions on editing text, links, social media, and portfolio items.

---

## 🚢 Production Deployment

This project is configured with `netlify.toml` for seamless deployment on Netlify.

Refer to [`DEPLOYMENT.md`](DEPLOYMENT.md) for the complete guide to linking your GitHub repository, setting up Netlify Forms email alerts, and connecting your custom domain.

---

## 📄 License

All rights reserved © NUEVINCENT.
