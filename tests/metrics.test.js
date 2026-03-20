import { describe, it, expect } from 'vitest';
import { formatNumber, formatPulseLabel, computeCount, computePulseInterval } from '../js/metrics.js';

describe('formatNumber', () => {
  it('formats millions with M suffix', () => {
    expect(formatNumber(4_200_000)).toBe('4.2M');
    expect(formatNumber(10_500_000)).toBe('10.5M');
  });

  it('drops .0 for round millions', () => {
    expect(formatNumber(1_000_000)).toBe('1M');
    expect(formatNumber(5_000_000)).toBe('5M');
  });

  it('formats numbers below 1M with German locale separators', () => {
    const result = formatNumber(1234);
    // German locale uses . as thousands separator
    expect(result).toBe('1.234');
  });

  it('floors fractional numbers below 1M', () => {
    expect(formatNumber(42.7)).toBe('42');
    expect(formatNumber(999.99)).toBe('999');
  });

  it('handles zero', () => {
    expect(formatNumber(0)).toBe('0');
  });

  it('handles small numbers', () => {
    expect(formatNumber(1)).toBe('1');
    expect(formatNumber(0.5)).toBe('0');
  });

  it('handles large millions', () => {
    const result = formatNumber(10_640_000_000);
    expect(result).toBe('10640M');
  });
});

describe('formatPulseLabel', () => {
  it('returns empty string for pulseUnit of 1', () => {
    expect(formatPulseLabel(1)).toBe('');
  });

  it('formats units > 1 as "je N"', () => {
    expect(formatPulseLabel(10)).toBe('je 10');
    expect(formatPulseLabel(100)).toBe('je 100');
  });

  it('formats thousands as K', () => {
    expect(formatPulseLabel(1_000)).toBe('je 1K');
    expect(formatPulseLabel(10_000)).toBe('je 10K');
  });

  it('formats millions as M', () => {
    expect(formatPulseLabel(1_000_000)).toBe('je 1M');
    expect(formatPulseLabel(100_000_000)).toBe('je 100M');
  });

  it('returns empty string for 0', () => {
    expect(formatPulseLabel(0)).toBe('');
  });
});

describe('computeCount', () => {
  it('calculates total count from rate and elapsed time', () => {
    expect(computeCount(4.2, 10)).toBeCloseTo(42);
    expect(computeCount(100, 5)).toBe(500);
  });

  it('returns 0 for 0 elapsed time', () => {
    expect(computeCount(4.2, 0)).toBe(0);
  });

  it('handles high rates', () => {
    expect(computeCount(158_500, 60)).toBe(9_510_000);
  });
});

describe('computePulseInterval', () => {
  it('calculates seconds between pulses', () => {
    // pulseUnit=1, rate=4.2 → pulse every ~0.238s
    expect(computePulseInterval(1, 4.2)).toBeCloseTo(0.2381, 3);
  });

  it('handles large pulse units', () => {
    // pulseUnit=100000, rate=158500 → every ~0.631s
    expect(computePulseInterval(100_000, 158_500)).toBeCloseTo(0.6310, 3);
  });

  it('handles pulseUnit equal to rate', () => {
    expect(computePulseInterval(100, 100)).toBe(1);
  });
});
