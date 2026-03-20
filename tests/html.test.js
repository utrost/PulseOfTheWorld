import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('index.html', () => {
  let html;

  beforeAll(async () => {
    html = await readFile(resolve('index.html'), 'utf-8');
  });

  it('is a valid HTML5 document', () => {
    expect(html).toMatch(/<!DOCTYPE html>/i);
    expect(html).toContain('<html');
    expect(html).toContain('</html>');
  });

  it('has correct lang attribute', () => {
    expect(html).toMatch(/lang="de"/);
  });

  it('has required meta tags', () => {
    expect(html).toContain('charset="UTF-8"');
    expect(html).toContain('name="viewport"');
    expect(html).toContain('name="description"');
  });

  it('has the correct title', () => {
    expect(html).toMatch(/<title>Pulse of the World<\/title>/);
  });

  it('links to the stylesheet', () => {
    expect(html).toContain('href="css/style.css"');
  });

  it('loads pulse.js as a module', () => {
    expect(html).toMatch(/<script type="module" src="js\/pulse\.js"><\/script>/);
  });

  it('has the main grid container', () => {
    expect(html).toContain('id="grid"');
  });

  it('has filter buttons for all categories', () => {
    const categories = ['all', 'leben', 'technologie', 'fun', 'wirtschaft', 'kultur', 'verkehr'];
    for (const cat of categories) {
      expect(html, `missing filter button for "${cat}"`).toContain(`data-category="${cat}"`);
    }
  });

  it('has theme and style toggle buttons', () => {
    expect(html).toContain('id="theme-toggle"');
    expect(html).toContain('id="style-toggle"');
  });

  it('has PWA manifest link', () => {
    expect(html).toContain('rel="manifest"');
    expect(html).toContain('manifest.json');
  });

  it('has Open Graph tags', () => {
    expect(html).toContain('og:title');
    expect(html).toContain('og:description');
  });
});
