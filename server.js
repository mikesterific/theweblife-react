import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Serve static files from the public directory
app.use(express.static('public'));

// Serve the client-side application build
app.use('/app', express.static('dist'));

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