# SmokeQuit iOS App

A native iOS app designed to help you and your friends quit smoking. Built with Swift/SwiftUI and styled with premium, modern dark aesthetics.

---

## How it works (No Mac Required)

This repository is configured to compile your iOS app for free using **GitHub Actions** (macOS runners hosted by GitHub). The build process will produce an unsigned `.ipa` file that you can download directly to your Windows computer and sideload onto your iPhone using **Sideloadly**.

---

## Step 1: Create a GitHub Repository & Push this Code

To trigger the automated compiler:

1. **Initialize Git** in this directory:
   ```bash
   git init
   ```
2. **Commit all files**:
   ```bash
   git add .
   git commit -m "Initial commit of SmokeQuit App"
   ```
3. **Create a new repository** on GitHub (do not initialize with README, license, or gitignore).
4. **Link and push** to your new repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## Step 2: Download the Compiled IPA

1. Navigate to your repository on GitHub.
2. Click on the **Actions** tab at the top.
3. Select the run named **Build iOS App** (it triggers automatically upon push).
4. Wait about **2-3 minutes** for the workflow to complete.
5. Scroll down to the **Artifacts** section at the bottom of the run page.
6. Click on **SmokeQuit-Unsigned-IPA** to download the zip file.
7. Extract the downloaded zip file to get `SmokeQuit.ipa`.

---

## Step 3: Sideload onto Your iPhone with Sideloadly

Since the `.ipa` is unsigned, Sideloadly will sign it with your own Apple ID.

1. Download and install **Sideloadly** on your Windows PC (if you haven't already) from [sideloadly.io](https://sideloadly.io/).
2. Make sure you have **iTunes** and **iCloud** installed on your PC (download the official desktop installers, not the Microsoft Store versions).
3. Connect your iPhone to your PC via a USB cable. (Tap "Trust" on your iPhone if prompted).
4. Open **Sideloadly**:
   - Your device should be auto-detected in the **Device** list.
   - Enter your **Apple ID** (the email associated with your iCloud account) under the Apple Account field.
5. Drag and drop the `SmokeQuit.ipa` file into the large IPA icon area on Sideloadly.
6. Click **Start**.
7. If prompted, enter your Apple ID password and 2-Factor Authentication code. (Sideloadly uses this securely to request a free development certificate from Apple).
8. Once the status shows **Done**, the app icon will appear on your iPhone home screen!
9. Before opening the app, go to **Settings > General > VPN & Device Management** on your iPhone, tap your developer certificate (your Apple ID), and select **Trust**.
10. Turn on **Developer Mode** on your iPhone if required by iOS (usually found in **Settings > Privacy & Security > Developer Mode**). Restart your phone to apply.
11. Launch the **SmokeQuit** app and breathe free!
