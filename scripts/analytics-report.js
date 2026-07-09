// Prints a home -> portfolio conversion report from analytics/events.ndjson.
// Usage: node scripts/analytics-report.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const eventsFile = path.join(__dirname, '..', 'analytics', 'events.ndjson');

if (!fs.existsSync(eventsFile)) {
  console.log('No analytics data yet (analytics/events.ndjson not found).');
  process.exit(0);
}

const lines = fs.readFileSync(eventsFile, 'utf8').split('\n').filter(Boolean);
const events = [];
for (const line of lines) {
  try {
    events.push(JSON.parse(line));
  } catch {
    // Skip malformed lines rather than failing the whole report.
  }
}

const isPortfolioPath = (p) => p === '/portfolio' || p === '/portfolio/';

const homePageviews = events.filter((e) => e.name === 'pageview' && e.path === '/').length;
const portfolioPageviews = events.filter((e) => e.name === 'pageview' && isPortfolioPath(e.path)).length;
const ctaClicks = events.filter((e) => e.name === 'cta_click');

const clicksBySource = {};
for (const e of ctaClicks) {
  const source = e.source || '(unknown)';
  clicksBySource[source] = (clicksBySource[source] || 0) + 1;
}

const conversionRate = homePageviews > 0
  ? ((portfolioPageviews / homePageviews) * 100).toFixed(1) + '%'
  : 'n/a';

const first = events[0]?.ts || 'n/a';
const last = events[events.length - 1]?.ts || 'n/a';

console.log('Portfolio Conversion Report');
console.log('===========================');
console.log(`Events file:          ${eventsFile}`);
console.log(`Date range:           ${first} -> ${last}`);
console.log(`Total events:         ${events.length}`);
console.log('');
console.log(`Home pageviews:       ${homePageviews}`);
console.log(`Portfolio pageviews:  ${portfolioPageviews}`);
console.log(`Conversion rate:      ${conversionRate}`);
console.log('');
console.log('Portfolio CTA clicks by source:');
const sources = Object.entries(clicksBySource).sort((a, b) => b[1] - a[1]);
if (sources.length === 0) {
  console.log('  (none recorded yet)');
} else {
  for (const [source, count] of sources) {
    console.log(`  ${source.padEnd(16)} ${count}`);
  }
}
