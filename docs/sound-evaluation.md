# Sound-Dimension — Evaluation

Status: evaluated, not implemented.

## Recommendation

Do **not** add sound as a default layer. Pulse of the World works best as a quiet visual object; automatic audio would make the page feel gimmicky and is blocked by browser autoplay policies anyway.

A good sound version should be **explicitly opt-in**: one small `Sound` toggle, off by default, starting a Web Audio context only after a click/tap.

## Feasible design

- Use the existing pulse scheduler as the event source; no separate timing engine.
- For each visual pulse, optionally trigger a very short, quiet sound grain.
- Map categories to timbre, not melodies:
  - `leben`: low sine/heartbeat thump
  - `technologie`: filtered click / soft square tick
  - `wirtschaft`: muted wooden knock
  - `kultur`: bell-like sine/FM ping
  - `verkehr`: airy noise tick
  - `fun`: small marimba-like blip
- Limit polyphony: mix only currently visible cells and cap to ~8 grains per animation frame, otherwise high-rate metrics turn into noise.
- Respect accessibility: persist `sound: off`, expose a mute button, and honor `prefers-reduced-motion` as a reason to keep sound off unless explicitly enabled.

## Why not now

The current 57-metric grid already has dense visual activity. A naïve one-sound-per-pulse layer would produce an unpleasant buzz, especially from high-frequency metrics such as heartbeats, breaths, emails, searches, and video hours.

The better next step is a small prototype branch with three modes:

1. **Sparse mode:** only slow/large cells make sound.
2. **Category mode:** one aggregated pulse train per category.
3. **Drone mode:** no clicks; category rates modulate ambient volume/filter depth.

Evaluation criterion: if sound does not make the piece calmer and more bodily, leave it out.
