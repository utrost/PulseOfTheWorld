import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('metrics.json data', () => {
  let metrics;

  beforeAll(async () => {
    const raw = await readFile(resolve('data/metrics.json'), 'utf-8');
    metrics = JSON.parse(raw);
  });

  it('is a non-empty array', () => {
    expect(Array.isArray(metrics)).toBe(true);
    expect(metrics.length).toBeGreaterThan(0);
  });

  it('contains the expected number of metrics', () => {
    expect(metrics.length).toBeGreaterThanOrEqual(44);
  });

  it('has unique ids', () => {
    const ids = metrics.map(m => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every metric has required fields', () => {
    const requiredFields = ['id', 'label', 'category', 'ratePerSecond', 'unit', 'pulseUnit', 'color', 'source', 'sourceUrl'];
    for (const m of metrics) {
      for (const field of requiredFields) {
        expect(m, `metric "${m.id}" missing field "${field}"`).toHaveProperty(field);
      }
    }
  });

  it('every metric has a positive ratePerSecond', () => {
    for (const m of metrics) {
      expect(m.ratePerSecond, `metric "${m.id}" has non-positive rate`).toBeGreaterThan(0);
    }
  });

  it('every metric has a positive pulseUnit', () => {
    for (const m of metrics) {
      expect(m.pulseUnit, `metric "${m.id}" has non-positive pulseUnit`).toBeGreaterThan(0);
    }
  });

  it('every metric belongs to a known category', () => {
    const validCategories = ['leben', 'technologie', 'fun', 'wirtschaft', 'kultur', 'verkehr'];
    for (const m of metrics) {
      expect(validCategories, `metric "${m.id}" has unknown category "${m.category}"`).toContain(m.category);
    }
  });

  it('every color is a valid hex code', () => {
    for (const m of metrics) {
      expect(m.color, `metric "${m.id}" has invalid color`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it('every sourceUrl is a valid URL', () => {
    for (const m of metrics) {
      expect(() => new URL(m.sourceUrl), `metric "${m.id}" has invalid sourceUrl`).not.toThrow();
    }
  });

  it('simulates fetch and parses correctly', async () => {
    // Simulate what init() does: fetch → json → array
    const raw = await readFile(resolve('data/metrics.json'), 'utf-8');
    const parsed = JSON.parse(raw);
    expect(Array.isArray(parsed)).toBe(true);
    expect(parsed[0]).toHaveProperty('id');
    expect(parsed[0]).toHaveProperty('ratePerSecond');
    expect(typeof parsed[0].ratePerSecond).toBe('number');
  });
});
