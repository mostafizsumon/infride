# ইনফ্রাইড (INFRIDE): স্বচ্ছ কমিউনিটি ইনভেস্টমেন্ট সিস্টেম - বিস্তারিত সেটআপ গাইড

এই গাইডটি আপনাকে আপনার পিসিতে প্রজেক্টটি চালানো এবং অনলাইনে লাইভ করা পর্যন্ত ধাপে ধাপে সাহায্য করবে।

---

## ধাপ ১: প্রয়োজনীয় সফটওয়্যার ইন্সটল করা (Prerequisites)
১. **Node.js ইন্সটল করুন**: 
   - প্রথমে [nodejs.org](https://nodejs.org/) এ যান।
   - **LTS Version** (যেমন: v18 বা v20) টি ডাউনলোড করে ইন্সটল করুন।
২. **পিসি চেক করুন**: 
   - টার্মিনাল বা কমান্ড প্রম্পট খুলুন এবং লিখুন: `node -v` এবং `npm -v`। যদি ভার্সন দেখায়, তবে ইন্সটল সফল হয়েছে।

---

## ধাপ ২: ফায়ারবেস (Firebase) প্রজেক্ট তৈরি করা
১. **Firebase Console-এ যান**: [console.firebase.google.com](https://console.firebase.google.com/) এ লগইন করুন।
২. **নতুন প্রজেক্ট তৈরি করুন**: 
   - "Add Project" এ ক্লিক করুন। 
   - প্রজেক্টের নাম দিন (যেমন: `INFRIDE`). 
   - Google Analytics এনাবল বা ডিজেবল রেখে "Create Project" এ ক্লিক করুন।

---

## ধাপ ৩: ডাটাবেস (Firestore) সেটআপ করা
১. বাম পাশের মেনু থেকে **Firestore Database** এ যান।
২. **Create Database** এ ক্লিক করুন।
৩. **Production Mode** সিলেক্ট করুন।
৪. লোকেশন হিসেবে **asia-southeast1** (Singapore) বা আপনার কাছের কোনো অঞ্চল বেছে নিন।
৫. ডাটাবেস তৈরি হয়ে গেলে, **Rules** ট্যাবে গিয়ে নিচের কোডটি পেস্ট করে "Publish" দিন:
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

---

## ধাপ ৪: অথেনটিকেশন (Authentication) সেটআপ করা
১. বাম পাশের মেনু থেকে **Authentication** এ যান।
২. **Get Started** এ ক্লিক করুন।
৩. **Sign-in method** ট্যাবে গিয়ে নিচের প্রোভাইডারগুলো এনাবল করুন:
   - **Email/Password**: এটি সাধারণ লগইনের জন্য।
   - **Google**: (অপশনাল) যদি গুগল লগইন দিতে চান।
৪. সেটিংস সেভ করুন।

---

## ধাপ ৫: স্টোরেজ (Storage) এবং API Keys সংগ্রহ করা
১. বাম মাসের মেনু থেকে **Storage** এ গিয়ে "Get Started" এ ক্লিক করে ডিফল্ট সেটিংসে এটি তৈরি করুন।
২. **API Key সংগ্রহ**:
   - প্রজেক্ট সেটিংসে (গিয়ার আইকন) যান।
   - "General" ট্যাবে নিচে গিয়ে "Your apps" এর পাশে **Web (</>)** আইকনে ক্লিক করুন।
   - অ্যাপের নাম দিন এবং রেজিস্টার করুন।
   - এখন আপনি একটি `firebaseConfig` অবজেক্ট দেখতে পাবেন যা অনেকটা এরকম:
     ```json
     {
       "apiKey": "YOUR_API_KEY",
       "authDomain": "...",
       "projectId": "...",
       "storageBucket": "...",
       "messagingSenderId": "...",
       "appId": "..."
     }
     ```
   - এই তথ্যগুলো আপনার প্রজেক্টের রুট ডিরেক্টরিতে `firebase-applet-config.json` ফাইলে সেভ করুন।

---

## ধাপ ৬: লোকাল পিসিতে প্রজেক্ট চালানো
১. টার্মিনাল খুলুন এবং প্রজেক্ট ফোল্ডারে যান।
২. **ডিপেন্ডেন্সি ইন্সটল করুন**:
   ```bash
   npm install
   ```
৩. **প্রজেক্ট রান করুন**:
   ```bash
   npm run dev
   ```
৪. এখন ব্রাউজারে `http://localhost:3000` এ গিয়ে অ্যাপটি দেখুন।

---

## ধাপ ৭: Netlify-তে ডিপ্লয় করা (Live!)
১. [Netlify.com](https://www.netlify.com/) এ ল্যান্ডিং পেজে গিয়ে লগইন করুন।
২. **Add new site** > **Import from existing project** (GitHub/GitLab) সিলেক্ট করুন।
৩. আপনার রিপোজিটরি টি সিলেক্ট করুন।
৪. **Build Settings**:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
৫. **Environment Variables**: "Site settings" এ গিয়ে `GEMINI_API_KEY` টি যোগ করুন।
৬. "Deploy" বাটনে ক্লিক করুন। কয়েক মিনিটের মধ্যে আপনার সাইট লাইভ হয়ে যাবে।

---

## ধাপ ৮: এডমিন ট্রাবলশুটিং (Admin Access)
১. প্রথমবার সাইন আপ করার পর ফায়ারবেস কনসোলে গিয়ে আপনার ইউজারের `role` টি **Admin** করে দিন যাতে আপনি সব ফিচার ব্যবহার করতে পারেন।
২. ইউজারের ডাটা ফায়ারবেসের `users` কালেকশনে থাকবে।

---
*আপনার স্বপ্ন এবং স্বচ্ছ কমিউনিটি ইনভেস্টমেন্ট সিস্টেম এখন বাস্তব!*

