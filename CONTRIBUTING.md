# Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change.

## Getting Started

1. Fork the repository
2. Clone your fork and install dependencies:
   ```bash
   git clone https://github.com/<your-username>/PulseOfTheWorld.git
   cd PulseOfTheWorld
   npm install
   ```
3. Create a feature branch (`git checkout -b feature/my-idea`)
4. Make your changes
5. Run the tests (`npm test`)
6. Commit and push
7. Open a Pull Request

## Development

This project has **zero production dependencies** — just open `index.html` in a browser. For a local server:

```bash
npx serve .
```

### Running Tests

```bash
npm test
```

Tests use [Vitest](https://vitest.dev/) and cover:
- **`tests/metrics.test.js`** — Unit tests for number formatting and pulse math
- **`tests/data.test.js`** — Validates all 57 metrics in `metrics.json` (required fields, types, ranges)
- **`tests/html.test.js`** — Checks HTML structure, meta tags, and PWA setup
- **`tests/sw.test.js`** — Validates service worker cache configuration
- **`tests/pulse-logic.test.js`** — Tests pulse interval calculations and counter logic

## Code Style

- Vanilla JS — no frameworks unless absolutely necessary
- CSS custom properties for theming
- Semantic HTML
- Mobile-first responsive design
- Functions should be small and focused

## File Overview

| File | Purpose |
|------|---------|
| `index.html` | Entry point — structure, filters, theme toggles |
| `css/style.css` | All styling: grid, themes (Neon/Mono/Terminal), responsive breakpoints |
| `js/pulse.js` | Main app: cell creation, animation loop, filtering, theme system |
| `js/metrics.js` | Pure utility functions: `formatNumber`, `formatPulseLabel`, `computeCount`, `computePulseInterval` |
| `data/metrics.json` | Array of 57 metric objects with rates, sources, and colors |
| `sw.js` | Service worker: cache-first with network update strategy |
| `manifest.json` | PWA manifest for installability |

## Adding Metrics

To add a new pulsing metric:

1. Find a reliable data source (UN, WHO, World Bank preferred)
2. Calculate the per-second rate from the annual or daily figure
3. Choose a `pulseUnit` that keeps the pulse interval between 200ms and 5s
4. Add an entry to `data/metrics.json`:
   ```json
   {
     "id": "unique-id",
     "label": "Display Name",
     "category": "leben|technologie|fun|wirtschaft|kultur|verkehr",
     "ratePerSecond": 4.2,
     "unit": "description of what is counted",
     "pulseUnit": 1,
     "color": "#e74c3c",
     "source": "Source Name",
     "sourceUrl": "https://..."
   }
   ```
5. Run `npm test` to validate the new entry passes all data integrity checks
6. Include source attribution

## License

By contributing, you agree that your contributions will be licensed under AGPL-3.0.
