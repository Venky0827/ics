# InfraCode Solutions website

## Overview

Static HTML/CSS/JS marketing site for InfraCode Solutions Pvt. Ltd. — an IT infrastructure consultancy. No build tools, no bundler, no package manager, no tests.

## Structure

```
.
├── index.html          # Home page
├── about.html          # About page (company, mission, partnerships)
├── services.html       # Services page
├── contact.html        # Contact page with Formspree form
├── assets/
│   ├── styles.css      # All styles (single file)
│   └── script.js       # All JS (single file)
├── ics-1.jpg           # Logo (header/footer)
└── ics-2.jpg           # Hero background
```

## How to develop

Open any `.html` file in a browser. No dev server needed — files are served as static content from any HTTP server (Python `http.server`, nginx, etc.).

## Contact form

The contact form (`#contact-form`) uses **Formspree** for submission. The endpoint is `https://formspree.io/f/xbdvrzln`. Form submissions are emailed to the address configured in the Formspree dashboard.

## Deployment

Hosted on **GitHub Pages** with custom domain `infracodesolutions.com`. Push to `main` branch to deploy.

## Before deployment

Ensure Formspree is configured:
- Email confirmed in Formspree dashboard
- Notification email set to receive submissions

## Conventions

- Responsive breakpoints at 900px and 640px
- JS handles: nav toggle, scroll-based header shadow, IntersectionObserver reveal animations, letter-scroll hero heading, parallax background, page fade-out transitions, active nav highlighting, year in footer
- Google Fonts: Montserrat (400, 500, 600, 700, 800)
- Color scheme uses CSS custom properties (`--brand-deep: #0050A0`, `--brand-sky: #5DA9E9`)
- Nutanix and Red Hat partner branding on homepage and about page
