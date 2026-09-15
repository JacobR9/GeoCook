# Changelog

All notable changes to GeoCook will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.5.0] - 2026-09-15

### Added
- Curated song and facts data (`country-info.json`) created, integrated, and successfully fetched for the meal detail flow.

---

## [0.4.0] - 2026-09-10

### Added
- Working YouTube player for the curated song shown on a country's final recipe step.

---

## [0.3.0] - 2026-09-07

### Changed
- Migrated the frontend from plain JavaScript to TypeScript.
- Migrated the frontend to React, with React Router driving full SPA routing between pages.

### Added
- Meal selection and the meal detail view.
- Recipe instructions split into individual, navigable steps.
- Step counter to track progress through a recipe.
- Live fetching and display of ingredients and measurements from TheMealDB.
- Lo-fi diagrams documenting page layout and flow.

### Documentation
- Design Choices document created, recording the reasoning behind key UX and architecture decisions.

---

## [0.2.0] - 2026-09-05

### Added
- Area search dropdown for finding countries.
- Meal list and images displayed for a selected area.

### Changed
- Rate limiting added to the area search dropdown to reduce redundant API calls.

---

## [0.1.0] - 2026-09-04

### Added
- Initial project setup: virtual environment, library imports, and root `.gitignore`.
- Backend endpoint skeleton, with a first working endpoint returning fetched areas.

### Notes
- README updated to disclose the project's forecast and aspirations.