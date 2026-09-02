import { readFile } from 'node:fs/promises';

const metrics = JSON.parse(await readFile(new URL('../data/metrics.json', import.meta.url), 'utf8'));

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'user-agent': 'PulseOfTheWorld source validation' },
        signal: AbortSignal.timeout(12000),
      });
      return { ok: res.ok, status: res.status, finalUrl: res.url, method };
    } catch (error) {
      if (method === 'GET') return { ok: false, status: 'ERR', error: error.message };
    }
  }
}

let failures = 0;
for (const metric of metrics) {
  const result = await probe(metric.sourceUrl);
  const status = result.ok ? 'OK' : 'CHECK';
  if (!result.ok) failures += 1;
  console.log(`${status}\t${result.status}\t${metric.id}\t${metric.sourceUrl}`);
}
console.log(`\n${metrics.length} metrics checked; ${failures} need manual browser/alternate-source review.`);
