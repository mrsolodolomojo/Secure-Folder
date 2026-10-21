# Samsung Secure Folder Replica — Android APK Build Kit

Because compiling a binary `.apk` requires the Android SDK & Java Gradle toolchain, this package provides everything pre-configured so you can generate the `.apk` in **1 click on your PC** or **automatically in the cloud via GitHub Actions** (without installing Android Studio).

---

## Step 1: Add Your `SecureFolderApp.jsx` File
1. Download or copy the code from the `SecureFolderApp.jsx` canvas in our chat.
2. Save it inside the `src/` folder as `src/SecureFolderApp.jsx` (replacing the placeholder if needed, though a working version is already included!).

---

## Option A: Build the `.apk` in the Cloud (No Android SDK Required)
1. Create a free repository on **GitHub** and upload the contents of this ZIP folder.
2. Click the **Actions** tab in your GitHub repository.
3. The **Build Android APK** workflow will run automatically and compile your project using Ubuntu + JDK 21 + Android Gradle.
4. Once finished (~2 minutes), scroll down to **Artifacts** and download **`SecureFolder-debug-apk`** containing `app-debug.apk`.
5. Transfer `app-debug.apk` to your phone and tap to install!

---

## Option B: Build Locally on Windows PC (`build_apk.bat`)
**Prerequisites**: Node.js (v18+), Java JDK 17/21, and Android SDK (or Android Studio).
1. Extract this ZIP folder anywhere on your PC.
2. Double-click **`build_apk.bat`**.
3. Grab your installable APK at:
   `android/app/build/outputs/apk/debug/app-debug.apk`

---

## Option C: Instant Install as a Full-Screen App (No APK Build Needed)
Because the project includes a `manifest.json` and mobile viewport configuration, you can also host the `dist/` folder (on Vercel, Netlify, or GitHub Pages), open the URL in Samsung Internet or Chrome on your Galaxy phone, and tap **Add to Home screen -> Install App**.
