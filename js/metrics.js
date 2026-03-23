/**
 * Format a number for display in metric counters.
 * Numbers >= 1M get a compact "M" suffix (e.g. 4.2M).
 * Numbers < 1M are floored and formatted with German locale separators.
 * @param {number} n - The number to format
 * @returns {string} Formatted string (e.g. "4.2M", "1.234", "0")
 */
export function formatNumber(n) {
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace('.0', '') + 'M';
  }
  return Math.floor(n).toLocaleString('de-DE');
}

/**
 * Format a pulse unit into a human-readable label.
 * Returns a "je N" label indicating how many events each pulse represents.
 * Returns empty string when pulseUnit is 1 (each pulse = 1 event, no label needed).
 * @param {number} pulseUnit - Number of events per pulse (1, 10, 1000, 1000000, etc.)
 * @returns {string} Label string (e.g. "je 10", "je 1K", "je 1M") or empty string
 */
export function formatPulseLabel(pulseUnit) {
  if (pulseUnit >= 1_000_000) return `je ${pulseUnit / 1_000_000}M`;
  if (pulseUnit >= 1_000) return `je ${pulseUnit / 1_000}K`;
  if (pulseUnit > 1) return `je ${pulseUnit}`;
  return '';
}

/**
 * Compute the cumulative event count since the page loaded.
 * @param {number} ratePerSecond - Events per second for this metric
 * @param {number} elapsedSeconds - Seconds since page load
 * @returns {number} Total events that have occurred
 */
export function computeCount(ratePerSecond, elapsedSeconds) {
  return ratePerSecond * elapsedSeconds;
}

/**
 * Compute the interval (in seconds) between visual pulses.
 * Each pulse represents `pulseUnit` events, so the interval is
 * the time it takes for that many events to occur.
 * @param {number} pulseUnit - Number of events per pulse
 * @param {number} ratePerSecond - Events per second
 * @returns {number} Seconds between pulses
 */
export function computePulseInterval(pulseUnit, ratePerSecond) {
  return pulseUnit / ratePerSecond;
}
