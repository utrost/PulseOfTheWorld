# Pulse of the World

**Feel the numbers.**

A web experience that makes global statistics visceral. A grid of cells, each pulsing at the rhythm of real-world events — births, deaths, deforestation, CO₂ emissions. No charts. No axes. Just a heartbeat for every metric that matters.

**[→ Try it live](https://simiono.com/pulse/)** · **[Read the essay](https://simiono.com/Pulse-of-the-World.html)**

![Pulse of the World — 44 metrics pulsing in real time](docs/screenshot-dashboard.jpg)

## The Idea

Abstract numbers are hard to grasp. *4.4 births per second* means nothing until you see a cell pulse every 227 milliseconds. *1.8 deaths per second* — a slower, heavier beat. Side by side, they tell a story no bar chart can.

Each cell in the grid represents one global metric. The grid is alive. Every cell breathes at its own frequency. The viewer doesn't read — they *feel*.

## Features

- **44 metrics** across nature, technology, society, and the human body
- **Real-time counters** — shows accumulation since your visit
- **Pulse indicators** — colored dots beat at the actual rate of each event
- **Responsive grid** — from phone to projector wall
- **Bilingual** — German and English
- **Dark mode** — designed as ambient display / digital art piece

## Design Principles

- **Minimal.** Black background. Cells as colored squares. Nothing else.
- **No interaction required.** Works as a passive display, a lobby installation, a screensaver.
- **Data-honest.** Every pulse maps to a real, sourced number. No dramatization.

## Tech Stack

- Vanilla HTML/CSS/JS — no framework overhead
- CSS animations for smooth pulsing
- Data sources: UN, WHO, World Bank, Our World in Data, NASA

## Roadmap

- [x] Define initial set of metrics with sources
- [x] Grid layout with responsive scaling
- [x] Color palette (each metric category gets a hue)
- [x] Real-time counters with formatted numbers
- [x] Deploy to simiono.com/pulse/
- [x] Expand to 44 metrics
- [ ] Data source attribution overlay
- [ ] Optional: ambient sound layer (subtle heartbeat per cell)
- [ ] Metric detail view on click/tap

## Philosophy

> We drown in numbers. This project doesn't add more — it translates them into something the body understands.

## License

AGPL-3.0 — see [LICENSE](LICENSE).

## Author

[simiono](https://simiono.com) · Uwe Trostheide
