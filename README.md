# mLab Arduino Uno R3 Project Showcase

A responsive browser-based app for managing members and their video demonstrations for six beginner Arduino Uno R3 projects. Add a member to create a card with six project slots, then upload, play, replace, or remove a video in each slot.

## Important: local prototype

This app saves member records and uploaded video files in the browser's IndexedDB database on the current device. It has no server, user accounts, sign-in, or admin access control:

- Content is **not shared** with other people or browsers, even when the site is published on GitHub Pages.
- Anyone using the same browser profile can add or delete members and videos.
- Browser storage is subject to device/browser quotas and may be cleared by the user or browser. Keep the original video files elsewhere.
- The app limits each video to 50 MB, but the browser's total storage limit may be lower than the combined size of all uploads.

This version is intended as a local prototype. Use a hosted backend with authentication, database storage, and access policies if the content must be shared or managed securely.

## Contents

The app uses these six fixed project slots for every member:

1. Potentiometer LED Dimmer
2. Automatic Night Light
3. Push-Button Traffic Light
4. Potentiometer Servo Controller
5. Light Controlled Servo
6. Smart Model Security Gate

## Run the app

No package installation, build step, or framework is required. Serve the repository directory using any static web server.

For example, with Python installed, open a terminal in the repository directory and run:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a modern browser. Stop the server with `Ctrl+C`.

IndexedDB works best when the app is served over HTTP or HTTPS. Do not use private/incognito browsing for content you want to keep; browser storage may be temporary there.

## Features

- Add members with unique names and automatically generate their six project slots.
- Upload and play local video files, replace existing videos, or remove a video or member and all their videos.
- Validate video file type and enforce a 50 MB limit for each upload.
- Keep member and video records between visits in the same browser profile using IndexedDB.
- Responsive layout, mobile navigation, keyboard support, and visible storage/error messages.

## Arduino equipment context

The practical projects use an Arduino Uno R3, a data-capable USB cable, a computer with the Arduino IDE, a breadboard, and jumper wires. Reuse components between projects. Projects 4–6 require a suitable regulated 5 V servo supply; have a teacher verify that its voltage and current ratings are appropriate for the servo being used.

The app provides project titles and video slots only. Refer to the relevant practical-assessment instructions for circuit wiring, code, testing, and assessment requirements.

## Project files

```text
.
├── index.html    # Member and video management app
├── app.js        # Navigation, IndexedDB, member cards, and video uploads
├── style.css     # Shared responsive styles
├── member1.html  # Original static demonstration page
├── member2.html  # Original static demonstration page
├── member3.html  # Original static demonstration page
├── member4.html  # Original static demonstration page
└── member5.html  # Empty placeholder
```

The `member1.html`–`member4.html` files are retained as the original static demonstration pages; the app's new member and video data is managed from `index.html`.

## Publishing and data scope

The static app can be published to GitHub Pages or another static host without a server runtime. Publishing the code does not publish or sync the videos saved in your browser. A separate hosted backend is required for shared access, secure admin accounts, and centralized video storage.
