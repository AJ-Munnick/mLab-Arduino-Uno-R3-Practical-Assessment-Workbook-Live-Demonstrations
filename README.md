# mLab Arduino Uno R3 Project Demonstrations

A lightweight, responsive website for browsing live demonstrations of six beginner Arduino Uno R3 projects. The home page links to a demonstration page for each participating team member; each page provides project summaries and quick links to jump between projects.

This repository contains the static showcase website. It does not currently include circuit diagrams, Arduino sketches, assessment worksheets, or a complete set of demonstration videos.

## Contents

| Page | Demonstrator |
| --- | --- |
| [Home](index.html) | Browse all demonstrators |
| [member1.html](member1.html) | Arsenio Munnick |
| [member2.html](member2.html) | Jadelyn Loots |
| [member3.html](member3.html) | Emelio Johnson |
| [member4.html](member4.html) | Braydon Alexander |

`member5.html` is currently an empty file and is not linked from the site.

Each member page covers the same six projects:

1. Potentiometer LED Dimmer
2. Automatic Night Light
3. Push-Button Traffic Light
4. Potentiometer Servo Controller
5. Light Controlled Servo
6. Smart Model Security Gate

## Run the website

No package installation, build step, or framework is required. Serve the repository directory using any static web server.

For example, with Python installed, open a terminal in the repository directory and run:

```powershell
py -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser. Stop the server with `Ctrl+C`.

You can also open `index.html` directly, but using a local web server is recommended for consistent browser behavior and embedded media.

## Features

- Responsive home page with a card for each demonstrator.
- Shared navigation across the home page and member pages.
- Mobile navigation menu with keyboard support, Escape-to-close behavior, and a current-page indicator.
- Six project jump links on every member page.
- Responsive video frames and clear notices where a demonstration is not yet available.
- Semantic HTML landmarks, visible keyboard focus indicators, and reduced-motion support.

## Demonstration availability

Video content is incomplete and should be checked before using the site as evidence of project completion.

- Arsenio's page embeds a YouTube video for Projects 1, 4, 5, and 6; Projects 2 and 3 are marked as coming soon. The same YouTube video is currently used for all four embeds.
- Jadelyn, Emelio, and Braydon's pages currently show “Demonstration video coming soon” for all six projects.

To add a video, replace the placeholder inside the appropriate project card with a responsive iframe. Use that video’s actual embed URL and a descriptive `title`; do not leave sample IDs or empty `src` attributes in the page.

## Arduino equipment context

The practical projects use an Arduino Uno R3, a data-capable USB cable, a computer with the Arduino IDE, a breadboard, and jumper wires. Reuse components between projects. Projects 4–6 require a suitable regulated 5 V servo supply; have a teacher verify that its voltage and current ratings are appropriate for the servo being used.

The website presents project names and demonstrations only. Refer to the relevant practical-assessment instructions for circuit wiring, code, testing, and assessment requirements.

## Project files

```text
.
├── index.html    # Showcase home page
├── member1.html  # Arsenio Munnick's demonstrations
├── member2.html  # Jadelyn Loots's demonstrations
├── member3.html  # Emelio Johnson's demonstrations
├── member4.html  # Braydon Alexander's demonstrations
├── member5.html  # Empty, unused placeholder
├── style.css     # Shared responsive site styles
└── app.js        # Shared navigation interactions
```

## Editing and publishing

- Keep shared navigation and visual conventions consistent across the home page and member pages.
- Give each project card a unique `project-N` ID and ensure its jump link points to that ID.
- Test navigation, keyboard use, mobile layout, and external video embeds in a browser after editing.
- Publish the files to any static web host. No server-side runtime is required.
