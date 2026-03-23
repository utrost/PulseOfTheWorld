import { formatNumber, formatPulseLabel, computeCount, computePulseInterval } from './metrics.js';

'use strict';

/** @type {number} Timestamp (ms) when the page loaded — used to compute elapsed time */
const startTime = Date.now();

/** @type {Array<Object>} All metric objects loaded from metrics.json */
let metrics = [];

/** @type {string} Currently active category filter ('all' or a category id) */
let activeCategory = 'all';

/** @type {Map<string, {el: HTMLElement, metric: Object, lastPulse: number, accumulator: number, counterEl: HTMLElement, dotEl: HTMLElement}>} */
let cells = new Map();

/**
 * Create a DOM element for a single metric cell.
 * Sets up the pulse dot, counter, unit label, source link, and CSS custom properties.
 * @param {Object} metric - A metric object from metrics.json
 * @returns {HTMLElement} The configured cell element
 */
function createCell(metric) {
  const el = document.createElement('div');
  el.className = 'cell';
  el.dataset.category = metric.category;
  el.dataset.id = metric.id;
  if (metric.gridCol > 1) el.dataset.col = metric.gridCol;
  if (metric.gridRow > 1) el.dataset.row = metric.gridRow;

  // Glow color from metric
  const glowColor = metric.color + '15'; // very subtle
  const pulseColor = metric.color + '25';
  el.style.setProperty('--glow', glowColor);

  el.innerHTML = `
    <div class="pulse-dot" style="background: ${metric.color};
      box-shadow: 0 0 0 0 ${metric.color}00;"></div>
    <div class="cell-label">${metric.label}</div>
    <div class="cell-counter-wrap">
      <div class="cell-since">Seit deinem Besuch:</div>
      <div class="cell-counter" data-counter="${metric.id}">0</div>
      <div class="cell-unit">${metric.unit}</div>
    </div>
    ${formatPulseLabel(metric.pulseUnit)
      ? `<div class="cell-pulse-label">${formatPulseLabel(metric.pulseUnit)} = 1 Puls</div>`
      : ''}
    <div class="cell-source">
      <a href="${metric.sourceUrl}" target="_blank" rel="noopener">${metric.source}</a>
    </div>
  `;

  // Pulse glow via CSS custom property
  el.style.setProperty('--pulse-bg', pulseColor);

  return el;
}

/**
 * Initialize the metric grid by creating cells for all metrics and appending them to the DOM.
 * Populates the `cells` Map with element references and state for each metric.
 */
function initGrid() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  metrics.forEach(m => {
    const el = createCell(m);
    grid.appendChild(el);
    cells.set(m.id, {
      el,
      metric: m,
      lastPulse: 0,
      accumulator: 0,
      counterEl: el.querySelector(`[data-counter="${m.id}"]`),
      dotEl: el.querySelector('.pulse-dot'),
    });
  });
}

/**
 * Show/hide cells based on the selected category and update filter button states.
 * @param {string} category - Category to filter by ('all' shows everything)
 */
function applyFilter(category) {
  activeCategory = category;
  cells.forEach(cell => {
    if (category === 'all' || cell.metric.category === category) {
      cell.el.classList.remove('hidden');
    } else {
      cell.el.classList.add('hidden');
    }
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
}

/**
 * Trigger a visual pulse on a cell — flashes the border, glows the dot,
 * and adds the 'pulse' CSS class for 120ms.
 * @param {{el: HTMLElement, dotEl: HTMLElement, metric: Object}} cell
 */
function triggerPulse(cell) {
  const el = cell.el;
  const dot = cell.dotEl;

  el.classList.add('pulse');
  el.style.borderColor = cell.metric.color + '40';
  dot.style.boxShadow = `0 0 20px 8px ${cell.metric.color}60`;

  setTimeout(() => {
    el.classList.remove('pulse');
    el.style.borderColor = 'var(--border)';
    dot.style.boxShadow = `0 0 0 0 ${cell.metric.color}00`;
  }, 120);
}

/**
 * Main animation loop (called via requestAnimationFrame at ~60fps).
 * Updates every cell's counter and fires pulses when their interval elapses.
 */
function tick() {
  const elapsed = (Date.now() - startTime) / 1000; // seconds since load

  cells.forEach(cell => {
    const m = cell.metric;

    // Update counter
    const totalCount = computeCount(m.ratePerSecond, elapsed);
    cell.counterEl.textContent = formatNumber(totalCount);

    // Check if pulse should fire
    const pulseInterval = computePulseInterval(m.pulseUnit, m.ratePerSecond);
    const expectedPulses = Math.floor(elapsed / pulseInterval);

    if (expectedPulses > cell.lastPulse) {
      cell.lastPulse = expectedPulses;
      triggerPulse(cell);
    }
  });

  requestAnimationFrame(tick);
}

/**
 * Load metrics from JSON and bootstrap the application.
 * Fetches data, initializes the grid, wires up filter buttons, and starts the animation loop.
 */
async function init() {
  try {
    const res = await fetch('data/metrics.json');
    metrics = await res.json();
  } catch (e) {
    console.error('Failed to load metrics:', e);
    return;
  }

  initGrid();

  // Filter buttons
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => applyFilter(btn.dataset.category));
  });

  // Start engine
  requestAnimationFrame(tick);
}

// --- Theme System ---
/** @type {string[]} Available visual styles */
const STYLES = ['neon', 'mono', 'terminal'];
/** @type {Object<string, string>} Display labels for each style */
const STYLE_LABELS = { neon: 'Neon', mono: 'Mono', terminal: 'Terminal' };

/** Get the current visual style from localStorage, defaulting to 'neon'. */
function getStyle() { return localStorage.getItem('pulse-style') || 'neon'; }

/**
 * Get the current color mode. Uses localStorage if set, otherwise
 * falls back to the user's OS-level prefers-color-scheme preference.
 * @returns {'dark'|'light'}
 */
function getMode() {
  const s = localStorage.getItem('pulse-mode');
  if (s) return s;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Apply the current theme by setting data-theme on <html>, updating button labels,
 * and syncing the theme-color meta tag.
 */
function applyTheme() {
  const style = getStyle();
  const mode = getMode();
  let theme;
  if (style === 'neon') {
    theme = mode === 'light' ? 'neon-light' : null;
  } else {
    theme = `${style}-${mode}`;
  }
  if (theme) {
    document.documentElement.setAttribute('data-theme', theme);
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  const modeBtn = document.getElementById('theme-toggle');
  if (modeBtn) modeBtn.textContent = mode === 'dark' ? '☀ Light' : '● Dark';
  const styleBtn = document.getElementById('style-toggle');
  if (styleBtn) styleBtn.textContent = 'Style: ' + STYLE_LABELS[style];

  // Update theme-color meta
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta && bgColor) meta.content = bgColor;
}

/** Toggle between dark and light mode, persisting the choice. */
function toggleMode() {
  localStorage.setItem('pulse-mode', getMode() === 'dark' ? 'light' : 'dark');
  applyTheme();
}

/** Cycle to the next visual style (neon → mono → terminal → neon). */
function cycleStyle() {
  const idx = STYLES.indexOf(getStyle());
  localStorage.setItem('pulse-style', STYLES[(idx + 1) % STYLES.length]);
  applyTheme();
}

// Register Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// Go
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    init();
    applyTheme();
    document.getElementById('theme-toggle').addEventListener('click', toggleMode);
    document.getElementById('style-toggle').addEventListener('click', cycleStyle);
  });
} else {
  init();
  applyTheme();
  document.getElementById('theme-toggle').addEventListener('click', toggleMode);
  document.getElementById('style-toggle').addEventListener('click', cycleStyle);
}
