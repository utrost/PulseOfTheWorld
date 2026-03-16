(() => {
  'use strict';

  const startTime = Date.now();
  let metrics = [];
  let activeCategory = 'all';
  let cells = new Map(); // id → { el, metric, lastPulse, accumulator }

  // --- Format numbers with locale separators ---
  function formatNumber(n) {
    if (n >= 1_000_000) {
      return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
    }
    return Math.floor(n).toLocaleString('de-DE');
  }

  // --- Format pulse unit label ---
  function formatPulseLabel(pulseUnit) {
    if (pulseUnit >= 1_000_000) return `je ${pulseUnit / 1_000_000}M`;
    if (pulseUnit >= 1_000) return `je ${pulseUnit / 1_000}K`;
    if (pulseUnit > 1) return `je ${pulseUnit}`;
    return '';
  }

  // --- Create a cell DOM element ---
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

  // --- Initialize grid ---
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

  // --- Filter ---
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

  // --- Pulse animation ---
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

  // --- Main loop ---
  function tick() {
    const elapsed = (Date.now() - startTime) / 1000; // seconds since load

    cells.forEach(cell => {
      const m = cell.metric;

      // Update counter
      const totalCount = m.ratePerSecond * elapsed;
      cell.counterEl.textContent = formatNumber(totalCount);

      // Check if pulse should fire
      const pulseInterval = m.pulseUnit / m.ratePerSecond; // seconds between pulses
      const expectedPulses = Math.floor(elapsed / pulseInterval);

      if (expectedPulses > cell.lastPulse) {
        cell.lastPulse = expectedPulses;
        triggerPulse(cell);
      }
    });

    requestAnimationFrame(tick);
  }

  // --- Load & start ---
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
  const STYLES = ['neon', 'mono', 'terminal'];
  const STYLE_LABELS = { neon: 'Neon', mono: 'Mono', terminal: 'Terminal' };

  function getStyle() { return localStorage.getItem('pulse-style') || 'neon'; }
  function getMode() {
    const s = localStorage.getItem('pulse-mode');
    if (s) return s;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

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

  function toggleMode() {
    localStorage.setItem('pulse-mode', getMode() === 'dark' ? 'light' : 'dark');
    applyTheme();
  }

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
})();
