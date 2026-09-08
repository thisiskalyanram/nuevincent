# NUEVINCENT - Production Netlify Deployment Guide 🚀

This document provides a comprehensive, step-by-step guide for deploying the **NUEVINCENT** creative studio website to **Netlify**, enabling automated continuous deployment via GitHub, setting up client enquiry email notifications, and connecting your custom domain.

---

## 📋 Overview

- **Hosting Platform**: Netlify (Global Edge CDN)
- **Framework**: Next.js 15 (App Router with `@netlify/plugin-nextjs`)
- **Backend / Database**: None required (100% serverless, zero Firebase/Supabase dependencies)
- **Forms**: Netlify Forms (native email notifications, zero setup scripts)
- **Configuration File**: `netlify.toml` in repository root

---

## 🛠️ Step 1: Push Code to GitHub

1. Open your terminal in the project directory.
2. Initialize git (if not already done) and commit your code:
   ```bash
   git add .
   git commit -m "Convert NUEVINCENT to Netlify with cinematic UI"
   ```
3. Push to your GitHub repository:
   ```bash
   git remote add origin https://github.com/your-username/nuevincent.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 Step 2: Deploy to Netlify

### Option A: Via Netlify Web Dashboard (Recommended)

1. Go to [Netlify](https://app.netlify.com/) and log in (using your GitHub account).
2. Click **"Add new site"** &rarr; **"Import an existing project"**.
3. Select **"GitHub"** and authorize Netlify to access your repositories.
4. Choose your `nuevincent` repository.
5. Netlify will automatically detect the settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - **Node version**: Default (Node 18+)
6. Click **"Deploy nuevincent"**.
7. Netlify will build your site in ~1-2 minutes and assign you a live URL (e.g., `https://nuevincent.netlify.app`).

### Option B: Via Netlify CLI

1. Install the Netlify CLI globally:
   ```bash
   npm install -g netlify-cli
   ```
2. Log in and deploy:
   ```bash
   netlify login
   netlify init
   netlify deploy --prod
   ```

---

## 📬 Step 3: Configure Netlify Forms & Email Notifications

When clients fill out the **"Start a Project"** briefing wizard on `/contact` or `/enquiry`, submissions are automatically captured by Netlify Forms.

### To receive instant email alerts whenever a new enquiry is submitted:

1. In your Netlify Site Dashboard, go to **Site configuration** &rarr; **Forms**.
2. Scroll to **"Form notifications"** and click **"Add notification"** &rarr; **"Email notification"**.
3. Configure the notification:
   - **Form name**: `nuevincent-enquiry` (or "Any form")
   - **Email to notify**: Your email address (e.g., `contact@nuevincent.com` or personal inbox)
   - **Email subject line**: `🎬 New Project Enquiry: [NUEVINCENT]`
4. Click **Save**.

### Viewing Submissions in the Netlify Dashboard:
- Click the **"Forms"** tab in your Netlify site dashboard.
- You will see the form named `nuevincent-enquiry` with all customer inquiries (Full Name, Company, Work Email, Phone/WhatsApp, Project Type, Budget Range, Target Timeline, Project Description, and Inspiration Links).
- You can export submissions as **CSV** anytime.

---

## 🌍 Step 4: Connect Your Custom Domain (GoDaddy / Namecheap)

### 1. Add Domain in Netlify:
1. In your Netlify Dashboard, navigate to **Site configuration** &rarr; **Domain management**.
2. Click **"Add a domain"** or **"Add custom domain"**.
3. Enter your domain (e.g. `nuevincent.com`) and click **Verify**.
4. Confirm by clicking **"Add domain"**. Netlify will register `nuevincent.com` and `www.nuevincent.com`.

### 2. Update DNS Records in Your Domain Registrar (e.g., GoDaddy):
1. Log into your domain registrar (GoDaddy, Namecheap, Google Domains, Hostinger, etc.).
2. Navigate to your domain's **DNS Management** page.
3. Add or modify the following DNS records:

| Record Type | Name / Host | Value / Points To | TTL |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `75.2.60.5` *(Netlify Load Balancer IP)* | 1 Hour / Automatic |
| **CNAME** | `www` | `<your-site-name>.netlify.app.` | 1 Hour / Automatic |

> 💡 **Tip**: Make sure to delete any existing "Parked" or default registrar `A` records to avoid DNS conflicts.

### 3. Automatic SSL/TLS Certificate:
- Once DNS propagates (typically 5 to 30 minutes), Netlify will automatically provision a free, auto-renewing **Let's Encrypt SSL/TLS Certificate**.
- Your site will automatically enforce secure `https://` with the padlock icon.

---

## 🔄 Step 5: Continuous Deployment & Site Updates

Every time you push a change or add a new project to your GitHub repository:
1. Make edits locally (e.g., in `src/data/projects.ts` or text files).
2. Commit and push:
   ```bash
   git add .
   git commit -m "Add new commercial project to portfolio"
   git push origin main
   ```
3. Netlify will detect the commit and automatically build and publish the live update with zero downtime.

---

## 🛠️ Verification & Troubleshooting Checklist

| Check | Expected Result | Solution if Failed |
| :--- | :--- | :--- |
| **Local Build** | `npm run build` exits with code 0 | Run `npm run build` locally to check for syntax errors before pushing. |
| **Form Detection** | Netlify Dashboard lists `nuevincent-enquiry` | Verify `public/__forms.html` exists in the repository. |
| **Video Playback** | YouTube/Vimeo modals load smoothly | Ensure URLs in `src/data/projects.ts` use standard format (e.g., `https://www.youtube.com/watch?v=...` or `https://vimeo.com/...`). |
| **Custom Domain** | `https://yourdomain.com` opens securely | Verify `A` and `CNAME` records in DNS manager. |
