# Anna & David | Luxury Wedding Invitation

A premium, production-ready full-stack Next.js application designed as a luxury wedding invitation and intelligent RSVP manager. Features smooth Framer Motion animations, interactive countdown, masonry gallery, dynamic timetable, and secure server-action RSVP sync with Google Sheets.

## Features
- **Design System**: Custom Tailwind config prioritizing a champagne, ivory, and beige palette, utilizing "Playfair Display" and "Cormorant Garamond" for premium typography.
- **Scroll Effects**: Progressive lazy-loading and Framer Motion parallax sections.
- **Save The Date**: Floating particles, luxury text styling, and interactive countdown timer to the wedding date.
- **Timeline API**: Animated SVG winding-path timeline with a scroll-linked tracking heart.
- **Gallery**: Masonry photo layout with a responsive lightbox and zoom capability.
- **Details**: Built on map integrations and layout cards pointing to the lovely Vahagn Hall.
- **Intelligent RSVPs**: Deep Google Sheets integration tracks every attendee (RSVPs sheet) and assigns secret game numeric codes dynamically based on attributes (Single Male -> GroomCodes vs Single Female -> BrideCodes).
- **Honeypot Anti-Spam**: Prevents automated spam form filling.

## Architecture & Configuration

This project requires Next.js 15+ and uses the App Router. The API integrations are implemented server-side.

### 1. Environment variables

You must create a `.env.local` containing your Google Sheets variables. See the given `.env.example`.

```env
GOOGLE_CLIENT_EMAIL="your-service-account@your-project-id.iam.gserviceaccount.com"
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIJQIC...\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID="<alphanumeric-spreadsheet-id>"
```

### 2. Google Sheets Setup Instruction

1. **Create the Spreadsheet**: Create a Google Sheet and copy its URL ID to `GOOGLE_SPREADSHEET_ID`.
2. **Create the Tabs (Worksheets)**: Your spreadsheet MUST have these three exact sheet names:
   - `RSVPs` (For all guest logs)
   - `BrideCodes` (For single female guests)
   - `GroomCodes` (For single male guests)
3. **Format Column A**: Insert headers row on each sheet (e.g., Code, Name, Gender, Status, Timestamp). Ensure you type an initial `Code` value or leave empty; the system automatically detects the max integer value in Column A.
4. **Google Cloud Service Account**: 
   - Go to Google Cloud Console. Enable the **Google Sheets API**.
   - Create a **Service Account** under Credentials. Go to "Keys", add a new JSON key, and download it.
   - Extract the `client_email` and `private_key`.
5. **Share the Sheet**: Open your Google Spreadsheet, click "Share", and paste your service account `client_email` to give it **Editor** access.

### 3. Installation

Install Node dependencies with `npm install` and start the Next.js development server:

```bash
npm run dev
```

The application is deployed on port 3000. Access it via `localhost:3000`.
