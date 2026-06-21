# InfraCode Solutions website

## Overview

Static HTML/CSS/JS marketing site for InfraCode Solutions Pvt. Ltd. — an IT infrastructure consultancy. No build tools, no bundler, no package manager, no tests.

## Structure

```
.
├── index.html          # Home page
├── services.html       # Services page
├── contact.html        # Contact page with form
├── assets/
│   ├── styles.css      # All styles (single file)
│   └── script.js       # All JS (single file)
├── ics-1.jpg           # Logo (header/footer)
└── ics-2.jpg           # Hero background
```

## How to develop

Open any `.html` file in a browser. No dev server needed — files are served as static content from any HTTP server (Python `http.server`, nginx, etc.).

## Before deployment

**contact.html** uses placeholder values that must be replaced with real data:
- `info@example.com` → actual contact email (line 44)
- `+00 0000 00000` → actual phone (line 51)
- `Your business address` → actual address (line 58)

The contact form (`#contact-form` in `script.js`) is **client-side only** — it validates input but never sends data to a backend. It simulates success with a 600ms `setTimeout`. Wire it to a real form handler or API before going live.

## Conventions

- Responsive breakpoints at 900px and 640px
- JS handles: nav toggle, scroll-based header shadow, IntersectionObserver reveal animations, letter-scroll hero heading, parallax background, page fade-out transitions, active nav highlighting, year in footer
- Google Fonts: Montserrat (400, 500, 600, 700, 800)
- Color scheme uses CSS custom properties (`--brand-deep: #0050A0`, `--brand-sky: #5DA9E9`)
