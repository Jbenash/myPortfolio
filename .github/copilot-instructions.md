# Copilot Instructions for `myPortfolio`

These guidelines help AI coding agents work effectively in this repo.

## High-level architecture

- Full-stack portfolio app with two projects:
  - `backend/`: Node.js + Express 5, MongoDB (Mongoose), classic MVC.
  - `frontend/`: React 19 + Vite + Tailwind CSS, SPA with React Router.
- Deployment assumes:
  - Backend exposes a REST API and static files (images, PDFs) under `/uploads`.
  - Frontend talks to the backend via `VITE_API_URL` (see `frontend/services/api.js`).

## Backend patterns (Express + MongoDB)

- Entry point is `backend/server.js`:
  - Loads env with `dotenv.config()` and connects to Mongo via `connectDB()` from `config/db.js`.
  - Enables CORS **only** for `process.env.CLIENT_URL` – do not add `*` here.
  - Registers JSON/body parsers, static files under `/uploads`, then API routes under `/api/*`.
  - Adds `notFound` + `errorHandler` middleware from `middleware/errorHandler.js` **after** all routes.
- Routes live in `backend/routes/` and follow `resourceRoute.js` naming:
  - Each route file imports a controller from `controllers/` and wires HTTP verbs to controller functions.
  - When adding a new resource, always create matching `model/`, `controllers/`, and `routes/` files.
- Models in `backend/model/` use Mongoose; keep schema changes compatible with `utility/seed.js` seeding data.
- Static files & downloads:
  - `/uploads` serves `backend/public` with custom headers (CORS, optional `Content-Disposition` for PDFs when `?download=true`).
  - `routes/downloadRoute.js` implements a **buffer-based** PDF download (`fs.readFileSync` + `res.end(buffer, 'binary')`) to avoid corruption on mobile. Reuse this pattern for any new binary downloads.

## Database seeding & data shape

- `backend/utility/seed.js` is the single source of truth for initial data:
  - Clears `About`, `Project`, and `Skills` collections, and drops the old `id_1` index on `Project` if present.
  - Seeds a single `About` document (profile, education, courses, interests, CV URL).
  - Seeds `Project` array (e.g., LiveOn Blood Donation, Shopify E‑Commerce) and `Skills` with `category`, `level`, `icon`, and `order`.
- Run locally with (from `backend/`):
  - `npm run dev` – start API with nodemon.
  - `node utility/seed.js` – reseed MongoDB (requires `.env` with DB connection string and `CLIENT_URL`).
- When changing data shape (e.g., adding fields to `Project`), update:
  - The Mongoose model under `model/`.
  - The seed data in `utility/seed.js`.
  - Any frontend consumers (projects page, cards, etc.).

## Frontend patterns (React + Vite + Tailwind)

- Entry is `frontend/src/main.jsx`:
  - Renders `<App />` wrapped in React `StrictMode` and `<SpeedInsights />` from `@vercel/speed-insights/react`.
- Routing is configured in `frontend/src/App.jsx`:
  - Uses `<BrowserRouter>` with routes for `/`, `/about`, `/projects`, `/skills`, `/contact`, and `*` → `NotFound`.
  - `Navbar` + `Footer` + `ThemeProvider` wrap all pages.
- Pages live in `frontend/pages/` and should be composed of reusable components from `frontend/components/`.
- API access is centralized in `frontend/services/api.js`:
  - Uses a preconfigured Axios instance with `baseURL = import.meta.env.VITE_API_URL`.
  - Exposes `aboutAPI`, `projectsAPI`, `skillsAPI`, `contactAPI` helpers.
  - When adding new backend endpoints, extend this file instead of calling Axios directly in components.
- Styling & UI:
  - Tailwind utility classes are the primary styling mechanism (`src/index.css` + `tailwind.config.js`).
  - Animation: prefer `framer-motion` (see `components/ProjectCard.jsx`, `components/LoadingSpinner.jsx`).
  - Theme: use `ThemeContext` in `context/ThemeContext.jsx` for dark/light mode or theme-related state.

## Projects, skills, and media

- Project cards:
  - `components/ProjectCard.jsx` maps `project.technologies` strings to `react-icons` (and a custom `MailIcon.jsx`).
  - When adding a new technology label in seed data, also add an entry to `techIcons` for a matching icon.
- Certificates & PDFs:
  - Certificate metadata (image + `certificateUrl`) is stored in `About` seed data.
  - Frontend components (e.g., certificate modal in `pages/About.jsx` / `components/CertificateModal.jsx`) expect URLs under `/uploads/images` or `/uploads/files`.
  - Keep backend `public/` paths and seeded URLs in sync.

## Environment & configuration

- Backend `.env` expected keys (do not hardcode them):
  - `MONGODB_URI` (or equivalent used by `config/db.js`).
  - `CLIENT_URL` – must match the frontend origin for CORS and static file access.
  - `PORT` – server listen port.
- Frontend `.env` expected keys:
  - `VITE_API_URL` – base URL for all API calls (e.g., `https://myportfolio-1-5p8z.onrender.com/api`).

## Workflow tips for AI agents

- Prefer minimal, focused changes; keep existing patterns (MVC separation, centralized API helpers, Tailwind styling).
- When adding a new feature:
  1. Define schema/model changes in `backend/model/*` and seed data in `utility/seed.js` if needed.
  2. Expose it via a new route + controller in `backend/routes/` and `backend/controllers/`.
  3. Add a typed helper in `frontend/services/api.js`.
  4. Wire UI changes into `frontend/pages/` and `frontend/components/` using Tailwind and `framer-motion`.
- Be careful with CORS and file downloads:
  - Reuse the CORS configuration in `server.js` and header patterns from `downloadRoute.js` and `/uploads` middleware.
- Do **not** introduce new build tools or frameworks without explicit instruction; stay within the existing Vite + Tailwind + Express + Mongoose stack.
