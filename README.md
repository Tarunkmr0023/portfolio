# Tarun Kumar — Developer Portfolio

A personal developer portfolio built with React, TypeScript, Vite, and Three.js. It showcases my technical skills, professional experience, selected projects, and contact information through a dark, minimal interface with lime-green accents and an interactive 3D workstation.

## Features

- **3D Hero Experience:** A workstation scene built with Three.js and React Three Fiber.
- **About Section:** Professional introduction, experience statistics, and technical strengths.
- **Experience Timeline:** Professional roles and related details.
- **Project Showcase:** Selected projects with descriptions and screenshots.
- **Skills Overview:** Technologies and tools organized in a structured layout.
- **Contact Section:** Contact information and relevant profile links.
- **Responsive Layout:** Designed for desktop and mobile screens.
- **Motion and Interactions:** Animated interface elements and interactive navigation.

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

### Development Tools

- Vite
- ESLint
- npm
- Git and GitHub

### Content Management

Portfolio content is organized in JSON files under `src/data/`, including profile information, skills, professional experience, and projects.

## Project Structure

```text
portfolio/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── About/
│   │   ├── Contact/
│   │   ├── Experience/
│   │   ├── Navbar/
│   │   ├── Projects/
│   │   ├── sections/
│   │   └── three/
│   ├── data/
│   │   ├── experience.json
│   │   ├── profile.json
│   │   ├── projects.json
│   │   └── skills.json
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vars.css
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
- `projects.json` — Project information.
- `skills.json` — Skills and technologies.

The About section's displayed statistics are maintained in the About component. Update those values when the underlying information changes.

## Screenshots

Existing screenshots are available in the repository's `Screenshots/` directory, if present.

You can add updated screenshots of the current portfolio here as the design evolves.

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

## Author

**Tarun Kumar**

- GitHub: [Tarunkmr0023](https://github.com/Tarunkmr0023)
- Portfolio repository: [portfolio](https://github.com/Tarunkmr0023/portfolio)

---

Built with React, TypeScript, and Three.js.
