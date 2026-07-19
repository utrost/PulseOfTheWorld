import { describe, it, expect, beforeAll } from 'vitest';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

describe('mobile responsive contract', () => {
  let html;
  let css;

  beforeAll(async () => {
    html = await readFile(resolve('index.html'), 'utf-8');
    css = await readFile(resolve('css/style.css'), 'utf-8');
  });

  it('uses a mobile viewport that supports safe-area insets on notched phones', () => {
    expect(html).toMatch(/<meta[^>]+name=["']viewport["'][^>]+content=["'][^"']*width=device-width[^"']*initial-scale=1\.0[^"']*viewport-fit=cover[^"']*["']/);
  });

  it('uses dynamic viewport height and safe-area padding for standalone/mobile browser chrome', () => {
    expect(css).toContain('min-height: 100dvh');
    expect(css).toContain('env(safe-area-inset-top)');
    expect(css).toContain('env(safe-area-inset-right)');
    expect(css).toContain('env(safe-area-inset-bottom)');
    expect(css).toContain('env(safe-area-inset-left)');
  });

  it('has a phone breakpoint that fits controls and text within a 390px viewport', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*480px\)/);
    expect(css).toMatch(/#filters\s*{[^}]*display:\s*grid[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s);
    expect(css).toMatch(/\.filter-btn\s*{[^}]*min-height:\s*44px[^}]*width:\s*100%/s);
    expect(css).toMatch(/header h1\s*{[^}]*font-size:\s*clamp\(/s);
    expect(css).toMatch(/\.cell-counter\s*{[^}]*font-size:\s*clamp\([^}]*overflow-wrap:\s*anywhere/s);
  });

  it('collapses grid spans so cards do not overflow on phones', () => {
    expect(css).toMatch(/@media\s*\(max-width:\s*480px\)[\s\S]*#grid\s*{[^}]*grid-template-columns:\s*1fr/s);
    expect(css).toMatch(/@media\s*\(max-width:\s*480px\)[\s\S]*\.cell\[data-col="2"\]\s*{\s*grid-column:\s*span 1;\s*}/s);
    expect(css).toMatch(/@media\s*\(max-width:\s*480px\)[\s\S]*\.cell\[data-row="2"\]\s*{\s*grid-row:\s*span 1;\s*}/s);
  });
});
