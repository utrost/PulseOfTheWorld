import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { formatNumber, formatPulseLabel, computeCount, computePulseInterval } from '../js/metrics.js';

describe('pulse interval validation against real metrics', () => {
  let metrics;

  beforeAll(async () => {
    const raw = await readFile(resolve('data/metrics.json'), 'utf-8');
    metrics = JSON.parse(raw);
  });

  it('every metric has a positive, finite pulse interval', () => {
    for (const m of metrics) {
      const interval = computePulseInterval(m.pulseUnit, m.ratePerSecond);
      expect(
        interval,
        `metric "${m.id}" has invalid pulse interval: ${interval}`
      ).toBeGreaterThan(0);
      expect(
        isFinite(interval),
        `metric "${m.id}" has non-finite pulse interval`
      ).toBe(true);
    }
  });

  it('no metric has a pulse interval longer than 60 seconds', () => {
    for (const m of metrics) {
      const interval = computePulseInterval(m.pulseUnit, m.ratePerSecond);
      expect(
        interval,
        `metric "${m.id}" pulses too slowly: ${interval.toFixed(1)}s`
      ).toBeLessThanOrEqual(60);
    }
  });

  it('at least 40% of metrics have pulse intervals in the 200ms–5s sweet spot', () => {
    let inRange = 0;
    for (const m of metrics) {
      const interval = computePulseInterval(m.pulseUnit, m.ratePerSecond);
      if (interval >= 0.2 && interval <= 5) inRange++;
    }
    const ratio = inRange / metrics.length;
    expect(
      ratio,
      `Only ${(ratio * 100).toFixed(0)}% of metrics have perceptible pulse intervals`
    ).toBeGreaterThanOrEqual(0.4);
  });
});

describe('counter formatting integration', () => {
  let metrics;

  beforeAll(async () => {
    const raw = await readFile(resolve('data/metrics.json'), 'utf-8');
    metrics = JSON.parse(raw);
  });

  it('every metric produces a valid counter string after 1 second', () => {
    for (const m of metrics) {
      const count = computeCount(m.ratePerSecond, 1);
      const formatted = formatNumber(count);
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    }
  });

  it('every metric produces a valid counter string after 1 hour', () => {
    for (const m of metrics) {
      const count = computeCount(m.ratePerSecond, 3600);
      const formatted = formatNumber(count);
      expect(typeof formatted).toBe('string');
      expect(formatted.length).toBeGreaterThan(0);
    }
  });

  it('counters grow monotonically over time', () => {
    for (const m of metrics) {
      const count1 = computeCount(m.ratePerSecond, 10);
      const count2 = computeCount(m.ratePerSecond, 20);
      expect(count2).toBeGreaterThan(count1);
    }
  });
});

describe('pulse label integration', () => {
  let metrics;

  beforeAll(async () => {
    const raw = await readFile(resolve('data/metrics.json'), 'utf-8');
    metrics = JSON.parse(raw);
  });

  it('every metric produces a valid pulse label', () => {
    for (const m of metrics) {
      const label = formatPulseLabel(m.pulseUnit);
      expect(typeof label).toBe('string');
      // Label is either empty (pulseUnit=1) or starts with "je "
      if (m.pulseUnit > 1) {
        expect(label, `metric "${m.id}" with pulseUnit ${m.pulseUnit}`).toMatch(/^je /);
      } else {
        expect(label).toBe('');
      }
    }
  });

  it('pulseUnit values are powers of 10 or simple multiples', () => {
    for (const m of metrics) {
      // pulseUnit should be a clean number for display purposes
      expect(
        Number.isInteger(m.pulseUnit),
        `metric "${m.id}" has non-integer pulseUnit: ${m.pulseUnit}`
      ).toBe(true);
    }
  });
});

describe('formatNumber edge cases', () => {
  it('handles the boundary at exactly 1 million', () => {
    expect(formatNumber(999_999)).toBe('999.999');
    expect(formatNumber(1_000_000)).toBe('1M');
  });

  it('handles very small fractional numbers', () => {
    expect(formatNumber(0.001)).toBe('0');
    expect(formatNumber(0.999)).toBe('0');
  });

  it('handles billions', () => {
    expect(formatNumber(1_000_000_000)).toBe('1000M');
    expect(formatNumber(7_900_000_000)).toBe('7900M');
  });

  it('formats millions with one decimal place', () => {
    expect(formatNumber(1_234_567)).toBe('1.2M');
    expect(formatNumber(9_999_999)).toBe('10M');
  });
});

describe('computePulseInterval edge cases', () => {
  it('handles very high rates with large pulse units', () => {
    // Google searches: 158,500/sec, pulseUnit 100,000
    const interval = computePulseInterval(100_000, 158_500);
    expect(interval).toBeGreaterThan(0);
    expect(interval).toBeLessThan(1);
  });

  it('handles very low rates', () => {
    // Something happening once per hour = 1/3600 per second
    const interval = computePulseInterval(1, 1 / 3600);
    expect(interval).toBe(3600);
  });

  it('returns Infinity for zero rate', () => {
    const interval = computePulseInterval(1, 0);
    expect(interval).toBe(Infinity);
  });
});
