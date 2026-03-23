import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

describe('service worker (sw.js)', () => {
  let sw;

  beforeAll(async () => {
    sw = await readFile(resolve('sw.js'), 'utf-8');
  });

  it('defines a cache name', () => {
    expect(sw).toMatch(/const CACHE_NAME\s*=\s*['"].+['"]/);
  });

  it('defines an assets list to cache', () => {
    expect(sw).toContain('ASSETS');
  });

  it('caches the main HTML file', () => {
    expect(sw).toContain('index.html');
  });

  it('caches the stylesheet', () => {
    expect(sw).toContain('css/style.css');
  });

  it('caches the main JS files', () => {
    expect(sw).toContain('js/pulse.js');
    expect(sw).toContain('js/metrics.js');
  });

  it('caches the metrics data', () => {
    expect(sw).toContain('metrics.json');
  });

  it('registers install event handler', () => {
    expect(sw).toContain("addEventListener('install'");
  });

  it('registers activate event handler', () => {
    expect(sw).toContain("addEventListener('activate'");
  });

  it('registers fetch event handler', () => {
    expect(sw).toContain("addEventListener('fetch'");
  });

  it('cleans up old caches on activation', () => {
    // Should delete caches that don't match the current CACHE_NAME
    expect(sw).toContain('caches.keys()');
    expect(sw).toContain('caches.delete');
  });

  it('claims clients immediately on activation', () => {
    expect(sw).toContain('self.clients.claim()');
  });

  it('uses skipWaiting on install', () => {
    expect(sw).toContain('self.skipWaiting()');
  });

  it('only handles same-origin requests', () => {
    expect(sw).toContain('self.location.origin');
  });

  describe('cached assets exist on disk', () => {
    const expectedFiles = [
      'index.html',
      'css/style.css',
      'js/pulse.js',
      'js/metrics.js',
      'data/metrics.json',
      'favicon.svg',
      'manifest.json',
    ];

    for (const file of expectedFiles) {
      it(`${file} exists`, () => {
        expect(existsSync(resolve(file))).toBe(true);
      });
    }
  });
});
