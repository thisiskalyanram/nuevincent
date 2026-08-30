# NUEVINCENT - Production Deployment & Domain Setup Guide

This guide provides step-by-step instructions for deploying your **NUEVINCENT** full-stack website, setting up Firebase, connecting your purchased **GoDaddy** domain, and configuring secure HTTPS.

---

## Part 1: Firebase Project Setup

### 1. Create Firebase Project
1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add Project** and name it `nuevincent` (or your preferred name).
3. Disable or enable Google Analytics according to your preference, then click **Create Project**.

### 2. Enable Authentication
1. In the left sidebar, navigate to **Build > Authentication**.
2. Click **Get Started**.
3. Under the **Sign-in method** tab, select **Email/Password**.
4. Toggle **Enable** (leave Email link passwordless off) and click **Save**.
5. Under the **Users** tab, click **Add user** to create your admin account (e.g. `admin@nuevincent.com` and a strong password).

### 3. Enable Cloud Firestore
1. In the left sidebar, navigate to **Build > Firestore Database**.
2. Click **Create Database**.
3. Select your preferred server location (e.g., `asia-south1` for Mumbai/Hyderabad, or `us-central1`).
4. Choose **Start in production mode** and click **Create**.
5. In the **Rules** tab, paste the contents of `firestore.rules` from this repository and click **Publish**.

### 4. Enable Firebase Storage (Optional for file uploads)
1. In the left sidebar, navigate to **Build > Storage**.
2. Click **Get Started**, choose **Start in production mode**, and select your region.
3. In the **Rules** tab, paste the contents of `storage.rules` from this repository and click **Publish**.

### 5. Obtain Firebase Web SDK Config
1. In the Firebase Console, click the **Settings Gear (⚙)** next to Project Overview > **Project Settings**.
2. Scroll down to **Your apps** and click the Web icon `</>`.
3. Register the app with nickname `nuevincent-web`.
4. Copy the `firebaseConfig` keys into your `.env.local` file:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=nuevincent.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=nuevincent
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=nuevincent.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ADMIN_NOTIFICATION_EMAIL=contact@nuevincent.com
   ```

---

## Part 2: Deployment Options

### Option A: Deploy on Vercel (Recommended for Next.js 15)
1. Push your project to GitHub or GitLab.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New > Project**.
3. Import your `nuevincent` repository.
4. Under **Environment Variables**, add the variables from `.env.local`.
5. Click **Deploy**. Vercel will build and assign you a free `https://nuevincent.vercel.app` URL.

### Option B: Deploy on Firebase App Hosting / Firebase Hosting
1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```
2. Log in and initialize:
   ```bash
   firebase login
   firebase init
   ```
   Select **Hosting / App Hosting**, choose your Firebase project, and specify Next.js as the web framework.
3. Deploy:
   ```bash
   npm run build
   firebase deploy
   ```

---

## Part 3: Connecting Your GoDaddy Domain

### 1. Add Domain in Hosting Dashboard (e.g., Vercel / Firebase)
1. In your **Vercel / Firebase Project Settings**, go to the **Domains** section.
2. Enter your apex domain (e.g., `nuevincent.com`) and `www.nuevincent.com`.
3. The dashboard will show the exact DNS records to configure.

### 2. Configure DNS Records in GoDaddy
1. Log in to your [GoDaddy Account](https://account.godaddy.com/).
2. Go to **My Products** > find your domain > click **DNS** (or **Manage DNS**).
3. Under the **DNS Records** table, add or edit the following records:

#### Record 1: Apex Domain (Root)
- **Type:** `A`
- **Name:** `@`
- **Value / Points to:**
  - If using Vercel: `76.76.21.21`
  - If using Firebase Hosting: The dedicated IP provided in your Firebase Console (e.g., `199.36.158.100`)
- **TTL:** `1 Hour` (or `1/2 Hour`)

#### Record 2: WWW Subdomain
- **Type:** `CNAME`
- **Name:** `www`
- **Value / Points to:**
  - If using Vercel: `cname.vercel-dns.com`
  - If using Firebase: `nuevincent.web.app` (or your Firebase hosting target)
- **TTL:** `1 Hour`

> **Note:** Delete any conflicting "Parked" A records pointing to `34.102.136.180` or default GoDaddy parking pages.

---

## Part 4: SSL Certificate & Verification

1. Once DNS records are updated in GoDaddy, DNS propagation typically takes between **5 to 30 minutes** (maximum 24 hours).
2. Your hosting platform (Vercel / Firebase) will automatically issue and renew a free **Let's Encrypt SSL/TLS certificate**.
3. Once active, visiting `https://yourdomain.com` will show a secure lock icon.

---

## Part 5: Accessing the Admin Dashboard in Production

1. Visit: `https://yourdomain.com/admin/login`
2. Enter the admin credentials created in **Firebase Authentication** (Part 1, Step 2).
3. From the Admin Dashboard, you can:
   - Monitor and review real-time client project enquiries at `/admin/enquiries`.
   - Update lead status (`NEW` &rarr; `CONTACTED` &rarr; `IN_PROGRESS` &rarr; `COMPLETED`).
   - Add new films, commercials, and grades to your live portfolio at `/admin/portfolio`.
   - Export lead records to CSV for accounting and CRM records.

---

## Part 6: How to Update the Website

To update text, imagery, or deploy code changes:
1. Make your edits locally (refer to `CONTENT.md`).
2. Test locally:
   ```bash
   npm run dev
   ```
3. Commit and push to your git repository:
   ```bash
   git add .
   git commit -m "Update portfolio and service offerings"
   git push origin main
   ```
4. Vercel / Firebase will automatically trigger a new zero-downtime production deployment.
