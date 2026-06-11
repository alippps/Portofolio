# Portfolio - Alif | Web Developer

Personal portfolio built with React + Vite, CSS Modules, and lightweight CSS animations.

## Structure

```text
portfolio/
├── index.html
├── vite.config.js
├── package.json
├── public/
│   └── alif-taufiq-cv.html
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    ├── pages/
    │   ├── Home.jsx
    │   ├── About.jsx
    │   ├── Project.jsx
    │   ├── Sertifikat.jsx
    │   └── Contact.jsx
    ├── data/
    │   └── portfolioData.jsx
    ├── hooks/
    │   └── useScroll.js
    └── styles/
        ├── globals.css
        ├── Navbar.module.css
        ├── Home.module.css
        ├── About.module.css
        ├── Project.module.css
        ├── Sections.module.css
        └── Footer.module.css
```

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

## Customize

Most portfolio content lives in `src/data/portfolioData.jsx`:

- `projects`: featured projects and case study details
- `certificates`: certificates and achievements
- `skills`: technology list
- `stats`: about section metrics
- `socials`: social links
- `contact`: email, WhatsApp, and CV link

## Production Build

```bash
npm run build
npm run preview
```
