# UZXIAtreatr — Technical Architecture & Engineering Guidelines

## 1. Recommended Technology Stack
- **Core Framework**: React 18 / Vite 5 with TypeScript
- **Styling & Design System**: Modern Vanilla CSS with CSS Custom Properties (Tokens), Utility Classes, Glassmorphism, and CSS Grid/Flexbox
- **Icons**: Lucide React / Feather SVG Icons
- **State Management**: React Context API / Zustand for light state (Quiz scores, Fact index, Theme, Filters)
- **Data Layer**: Decoupled JSON Data Modules (`/src/data/`) simulating CMS/API payloads for seamless future database integration
- **Build & Package Manager**: Node.js & npm

---

## 2. Directory & Folder Structure

```text
akademya uzxia teatr/
├── public/
│   ├── assets/
│   │   ├── images/
│   │   ├── videos/
│   │   └── icons/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   └── styles/
│   │       ├── variables.css      # Design tokens (colors, fonts, shadows, transitions)
│   │       ├── base.css           # Resets, typography, global layout
│   │       ├── components.css     # Card, button, modal, header utilities
│   │       └── main.css           # Master stylesheet import
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── PageContainer.jsx
│   │   ├── common/
│   │   │   ├── Button.jsx
│   │   │   ├── SectionHeader.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── StateViews.jsx   # Loading, Empty, Error components
│   │   ├── home/
│   │   │   ├── HeroSection.jsx
│   │   │   ├── QuickStats.jsx
│   │   │   ├── FeatureGrid.jsx
│   │   │   └── CallToAction.jsx
│   │   ├── academy/
│   │   │   ├── ModuleCard.jsx
│   │   │   └── AcademyFilter.jsx
│   │   ├── interactive/
│   │   │   ├── DailyFact.jsx
│   │   │   ├── RandomFact.jsx
│   │   │   └── MiniQuiz.jsx
│   │   ├── media/
│   │   │   ├── VideoCard.jsx
│   │   │   └── LightboxModal.jsx
│   │   ├── news/
│   │   │   └── NewsCard.jsx
│   │   └── events/
│   │       └── EventCard.jsx
│   ├── data/
│   │   ├── navigationData.js
│   │   ├── heroData.js
│   │   ├── coursesData.js
│   │   ├── factsData.js
│   │   ├── quizData.js
│   │   ├── newsData.js
│   │   ├── eventsData.js
│   │   ├── galleryData.js
│   │   ├── studentResourcesData.js
│   │   └── teamData.js
│   ├── context/
│   │   ├── ThemeContext.jsx
│   │   └── QuizContext.jsx
│   ├── utils/
│   │   ├── formatters.js
│   │   └── helpers.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AcademyPage.jsx
│   │   ├── CoursesPage.jsx
│   │   ├── MediaPage.jsx
│   │   ├── NewsPage.jsx
│   │   ├── NewsDetailPage.jsx
│   │   ├── EventsPage.jsx
│   │   ├── StudentsPage.jsx
│   │   ├── InteractivePage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 3. Data Flow & Separation of Concerns
- **UI Components** are purely presentational and receive data via props or Context hooks.
- **Mock Services** (`src/data/`) export typed structures representing REST/GraphQL entities.
- **State Management** separates transient UI state (e.g. active modal, filter tabs) from application data.

---

## 4. Accessibility & Performance Controls
- Semantic HTML tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Standard ARIA attributes (`aria-expanded`, `aria-label`, `aria-controls`, `role="dialog"`).
- Dynamic asset lazy loading (`loading="lazy"`) and optimized web font loading.

---

## 5. Security & Environment Configuration
- No credentials or API keys hardcoded into client source code.
- `.env` and `.env.example` templates for configuration variables.
- Clean sanitized user inputs for any interactive form or query filters.
