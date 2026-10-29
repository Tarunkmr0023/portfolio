# Tarun Kumar — Developer Portfolio

A personal developer portfolio built with React, TypeScript, Vite, and Three.js. It showcases my technical skills, professional experience, selected projects, recognition, and contact information through a glassmorphism interface with an animated aurora background, dark and light themes, and an interactive 3D code-editor scene.

Live site: [tarunkmr-portfolio.netlify.app](https://tarunkmr-portfolio.netlify.app)

## Features

- **3D Hero Experience:** A floating code editor that types out a Spring controller with syntax colours, surrounded by orbiting skill tiles and code symbols, built with Three.js and React Three Fiber. It is lazy-loaded, recovers automatically from a lost WebGL context, and is skipped when the device prefers reduced motion.
- **Glass Design System:** Shared glass tokens (blur, border, shadow, radius) in `src/vars.css` used by the navbar, cards, and panels, over a drifting aurora gradient background with a grain overlay.
- **Floating Navbar:** A pill-shaped glass navbar that shrinks on scroll, with a command palette button and a theme toggle.
- **Command Palette:** Press `Cmd/Ctrl + K` to jump to a section, copy the email address, open GitHub or LinkedIn, toggle the theme, or download the resume.
- **Light and Dark Themes:** A theme toggle that is remembered between visits and applied before the first paint to avoid a flash.
- **Scroll Progress Bar:** A thin gradient bar at the top of the page showing scroll position.
- **About Section:** Professional introduction, experience statistics, technical strengths, and an education summary.
- **Experience Timeline:** Nagarro roles split by project, plus earlier roles, with the current role expanded by default and a glass chip cloud for the tech stack.
- **Recognition & Awards:** Awards, nominations, and client appreciation displayed from a JSON data file, with optional certificate links.
- **Project Showcase:** Selected projects with descriptions and screenshots, with an optional live demo link per project.
- **Contact Section:** Glass contact cards for email, LinkedIn, and GitHub, plus a resume download button.
- **Resume Download:** Serves `public/resume.pdf`.
- **SEO and Sharing:** Meta description, Open Graph and Twitter tags with a social preview image, canonical URL, `robots.txt`, and `sitemap.xml`.
- **Accessibility:** Skip-to-content link, visible focus rings, and reduced-motion support.
- **Responsive Layout:** Designed for desktop and mobile screens.

## Tech Stack

### Frontend

- React 19
- TypeScript
- HTML5
- CSS3 and CSS Modules

### 3D and Animation

- Three.js
- React Three Fiber
- React Three Drei
- GSAP

### Typography

- Space Grotesk (headings), Inter (body), and DM Mono (labels), loaded from Google Fonts
- JetBrains Mono (3D code window), bundled via `@fontsource/jetbrains-mono`

### Development Tools

- Vite
- ESLint
- npm
- Git and GitHub

### Content Management

Portfolio content is organized in JSON files under `src/data/`, including profile information, skills, professional experience, projects, and recognition entries.

## Project Structure

```text
portfolio/
├── public/                  # Static assets (resume.pdf, og-image.png, robots.txt, sitemap.xml)
├── src/
│   ├── components/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Experience/
│   │   ├── Navbar/
│   │   ├── Projects/
│   │   ├── RecognitionAwards/
│   │   ├── sections/
│   │   ├── three/           # GlassScene (3D hero code editor)
│   │   └── ui/              # CommandPalette, ScrollProgress
│   ├── data/
│   │   ├── experience.json
│   │   ├── profile.json
│   │   ├── projects.json
│   │   ├── recognition.json
│   │   └── skills.json
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── theme.ts             # Light/dark theme helpers
│   └── vars.css             # Colour, glass, and spacing tokens
├── package.json
├── package-lock.json
├── index.html
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- Git (optional, for cloning the repository)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Tarunkmr0023/portfolio.git
   ```

2. Navigate to the project directory:

   ```bash
   cd portfolio
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL printed by Vite, usually:

   `http://localhost:5173/`

## Available Commands

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Starts the local development server |
| `npm run lint`    | Runs ESLint checks                  |
| `npm run build`   | Creates the production build        |
| `npm run preview` | Serves the production build locally |

## Updating Portfolio Content

Most portfolio content can be updated in the JSON files under `src/data/`:

- `profile.json` — Profile details and introduction.
- `experience.json` — Professional experience entries.
- `projects.json` — Project information. An optional `demo` field adds a "Live demo" button to a project.
- `recognition.json` — Awards, nominations, and other recognition entries.
- `skills.json` — Skills and technologies.

### Resume and Social Image

- Replace `public/resume.pdf` to update the downloadable resume. Keep the file name, because the Contact section and command palette link to `/resume.pdf`.
- `public/og-image.png` (1200×630) is the link preview image referenced by the Open Graph and Twitter tags in `index.html`.

### Adding an Award or Recognition

Add a new object to `src/data/recognition.json`. Each entry should have a unique `id`, a `title`, an `organisation`, a `date`, and a `description`. The `number` field can be used to set the displayed number manually; if omitted, the component generates a number based on the entry's position.

To show a certificate link, include `certificateUrl` and optionally `certificateLabel`. For example:

```json
{
  "id": "new-award-2027",
  "title": "Award Name",
  "organisation": "Issuing Organisation",
  "date": "JAN 2027",
  "description": "A brief description of the recognition.",
  "certificateUrl": "/assets/awards/award-certificate.pdf",
  "certificateLabel": "VIEW CERTIFICATE"
}
```

Place public certificate PDFs in `public/assets/awards/`; files in this directory are served from the matching `/assets/awards/` URL. Certificate fields are optional, so an entry without a certificate link will still display normally.

The About section's displayed statistics are maintained in the About component, and the hero highlights are in the Hero component. Update those values when the underlying information changes.

## Production Build

Create a production build:

```bash
npm run lint
npm run build
```

To test the generated build locally:

```bash
npm run preview
```

Use the local URL printed by Vite to inspect the production version before deployment.

## Deployment

This project uses Vite and generates production files in the `dist/` directory.

Deploy the contents of `dist/` to a static hosting provider that supports single-page React applications. Configure the hosting provider to serve `index.html` for application routes if required by the chosen deployment setup.

The site is hosted on Netlify at `https://tarunkmr-portfolio.netlify.app`. The canonical URL, Open Graph image URLs, and `public/sitemap.xml` use this address, so update them if the domain changes.

## Author

**Tarun Kumar**

- GitHub: [Tarunkmr0023](https://github.com/Tarunkmr0023)
- Portfolio repository: [portfolio](https://github.com/Tarunkmr0023/portfolio)

---

Built with React, TypeScript, and Three.js.
