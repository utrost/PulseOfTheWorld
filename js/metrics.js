// --- Format numbers with locale separators ---
export function formatNumber(n) {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
  }
  return Math.floor(n).toLocaleString('de-DE');
}

// --- Format pulse unit label ---
export function formatPulseLabel(pulseUnit) {
  if (pulseUnit >= 1_000_000) return `je ${pulseUnit / 1_000_000}M`;
  if (pulseUnit >= 1_000) return `je ${pulseUnit / 1_000}K`;
  if (pulseUnit > 1) return `je ${pulseUnit}`;
  return '';
}

// --- Compute counter value ---
export function computeCount(ratePerSecond, elapsedSeconds) {
  return ratePerSecond * elapsedSeconds;
}

// --- Compute pulse interval in seconds ---
export function computePulseInterval(pulseUnit, ratePerSecond) {
  return pulseUnit / ratePerSecond;
}
