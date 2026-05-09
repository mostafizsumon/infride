# INFRIDE: Transparent Community Investment System - Setup Guide

## 1. Local Environment Setup
- **Node.js**: Ensure Node.js 18.0 or later is installed.
- **Package Manager**: NPM is used by default.

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

## 2. Firebase Configuration
The application uses Firebase for Authentication, Firestore, and Storage.
1. Create a new project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** with **Google** or **Email/Password** provider.
3. Create a **Cloud Firestore** database in production mode.
4. Enable **Cloud Storage** for profile image uploads.
5. Register a Web App in settings and copy the `firebaseConfig` object.
6. Create a file named `firebase-applet-config.json` in the root (or use `.env` as mapped in `src/lib/firebase.ts`).

## 3. Database Schema (Firestore Collections)
The system is built with a modular repository pattern. Ensure the following collections exist:
- `users`: Stores user profiles and roles (`Admin` vs `User`).
- `shareholders`: Community member profiles.
- `installments`: Record of monthly deposits (5000 BDT default).
- `fines`: Record of penalty amounts.
- `projects`: Investment projects details.
- `costs`: Operational expenses.
- `policies`: Community rules.
- `settings`: Global application settings.

## 4. Security Rules
Deploy the following rules to ensure only authorized users can modify data:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'Admin';
    }
  }
}
```

## 5. Deployment to Netlify/Cloud Run
This app is ready for modern cloud hosting:
1. Connect your Github repository to **Netlify**.
2. Build Command: `npm run build`
3. Publish Directory: `dist`
4. Add environment variables: `GEMINI_API_KEY`, etc.

## 6. Scalability & Migration Path
The application uses a **Repository Pattern** (`FirestoreRepository.ts`). 
- To migrate to **Supabase (PostgreSQL)**: Create a `PostgresRepository.ts` implementing the same `IRepository` interface.
- Replace the service instances in `src/services/` with the new implementation.
- No changes will be needed in the UI components.

---
*Created by Google AI Studio Build for Mostafizur Rahman.*
