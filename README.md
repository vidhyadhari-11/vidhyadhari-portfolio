# vidhyadhari — Portfolio

A dark, technical, "Signal HUD" developer portfolio built with React 19, Vite, Tailwind CSS 4, GSAP, Lenis, and Three.js.

## Live Site

- **Live Demo:** [https://portfolio-vidhyadhari.vercel.app/](https://portfolio-vidhyadhari.vercel.app/)

## Tech Stack

- **React 19** — Component-driven UI
- **Vite** — Next-generation frontend tooling
- **Tailwind CSS 4** — Modern utility-first styling with `@theme` design tokens
- **GSAP & ScrollTrigger** — High-performance scroll-driven and entrance animations
- **Lenis** — Silky smooth momentum scrolling
- **Three.js** — Interactive 3D signal core centerpiece
- **EmailJS** — Client-side direct email dispatch

## Run Locally

Clone the repository and install dependencies:

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

## Environment Variables

Create a `.env.local` file in the project root to configure EmailJS contact form transmission:

```env
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=
```

*(If these variables are omitted, the contact form seamlessly falls back to direct mail client dispatch.)*

---

Built during the placement training program at [TAP Academy](https://thetapacademy.com/) (full-stack development, AI and augmented reality training).
