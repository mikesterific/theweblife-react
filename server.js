import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Self-hosted analytics: append events as newline-delimited JSON.
const analyticsDir = path.join(__dirname, 'analytics');
const eventsFile = path.join(analyticsDir, 'events.ndjson');
fs.mkdirSync(analyticsDir, { recursive: true });

// sendBeacon may deliver the body as application/json or text/plain,
// so accept any content type on this route.
app.post('/api/event', express.json({ type: () => true }), (req, res) => {
  const { name, source, path: pagePath, ref } = req.body || {};
  if (typeof name !== 'string' || !name) {
    res.status(400).json({ ok: false });
    return;
  }
  const event = {
    ts: new Date().toISOString(),
    name: name.slice(0, 64),
    source: typeof source === 'string' ? source.slice(0, 64) : '',
    path: typeof pagePath === 'string' ? pagePath.slice(0, 256) : '',
    ref: typeof ref === 'string' ? ref.slice(0, 256) : '',
  };
  fs.appendFile(eventsFile, JSON.stringify(event) + '\n', (err) => {
    if (err) console.error('Failed to write analytics event:', err);
  });
  res.status(204).end();
});

// Serve Portfolio Quest as its own static site before the SPA fallback.
app.use('/portfolio-quest', express.static(path.join(__dirname, 'portfolio-quest'), { fallthrough: false }));

// Serve static files from the public directory
app.use(express.static('public'));

app.get('/portfolio.html', (req, res) => {
  res.redirect(301, '/portfolio');
});

// Serve the client-side application build
app.use(express.static('dist'));

// Handle all portfolio routes
app.get('/port/:project', (req, res) => {
  res.sendFile(path.join(__dirname, `public/port/${req.params.project}/index.html`));
});

// Serve the client-side app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 