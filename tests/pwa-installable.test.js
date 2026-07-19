import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

const APP_BASE = '/pulse/';

describe('PWA installability contract for /pulse/ deployment', () => {
  let html;
  let manifest;
  let sw;
  let appJs;

  beforeAll(async () => {
    html = await readFile(resolve('index.html'), 'utf-8');
    manifest = JSON.parse(await readFile(resolve('manifest.json'), 'utf-8'));
    sw = await readFile(resolve('sw.js'), 'utf-8');
    appJs = await readFile(resolve('js/pulse.js'), 'utf-8');
  });

  it('links the manifest from the /pulse/ base path', () => {
    expect(html).toMatch(/<link[^>]+rel=["']manifest["'][^>]+href=["']\/pulse\/manifest\.json["']/);
  });

  it('declares manifest identity, start_url, scope, display mode, and theme colors for /pulse/', () => {
    expect(manifest.name).toBe('Pulse of the World');
    expect(manifest.short_name).toBe('Pulse');
    expect(manifest.start_url).toBe(APP_BASE);
    expect(manifest.scope).toBe(APP_BASE);
    expect(manifest.id).toBe(APP_BASE);
    expect(manifest.display).toBe('standalone');
    expect(manifest.background_color).toMatch(/^#[0-9a-f]{6}$/i);
    expect(manifest.theme_color).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it('provides installable 192px and 512px maskable PNG icons under /pulse/', () => {
    for (const size of ['192x192', '512x512']) {
      const icon = manifest.icons.find((candidate) => candidate.sizes === size && candidate.type === 'image/png');
      expect(icon, `missing ${size} PNG icon`).toBeTruthy();
      expect(icon.src).toMatch(/^\/pulse\/icons\/icon-(192|512)\.png$/);
      expect(icon.purpose).toContain('maskable');
      expect(existsSync(resolve(icon.src.replace(/^\/pulse\//, ''))), `${icon.src} exists`).toBe(true);
    }
  });

  it('registers the service worker with an absolute /pulse/sw.js URL and /pulse/ scope', () => {
    expect(appJs).toContain('navigator.serviceWorker.register');
    expect(appJs).toMatch(/navigator\.serviceWorker\.register\(\s*['"]\/pulse\/sw\.js['"]\s*,\s*\{\s*scope:\s*['"]\/pulse\/['"]\s*\}/s);
  });

  it('pre-caches same-origin app shell assets from /pulse/ and serves cached content when offline', () => {
    for (const asset of [
      '/pulse/',
      '/pulse/index.html',
      '/pulse/css/style.css',
      '/pulse/js/pulse.js',
      '/pulse/js/metrics.js',
      '/pulse/data/metrics.json',
      '/pulse/manifest.json',
      '/pulse/icons/icon-192.png',
      '/pulse/icons/icon-512.png',
    ]) {
      expect(sw).toContain(asset);
    }

    expect(sw).toContain("addEventListener('install'");
    expect(sw).toContain('cache.addAll(ASSETS)');
    expect(sw).toContain("addEventListener('fetch'");
    expect(sw).toContain('caches.match(event.request)');
    expect(sw).toMatch(/catch\(\(\)\s*=>\s*cached\)/);
    expect(sw).toContain("new URL('/pulse/', self.location.origin)");
  });
});
