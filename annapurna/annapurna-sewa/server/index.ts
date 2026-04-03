import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 4000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  next();
});

// ─── API Routes ───────────────────────────────────────────────────────────────

/**
 * Health check endpoint
 */
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/**
 * Contact / inquiry submission endpoint
 * Receives form data and could forward to email, CRM, etc.
 */
app.post('/api/contact', (req: Request, res: Response) => {
  const { type, from, to, date, passengers, message } = req.body;

  // Basic validation
  if (!type || !message) {
    res.status(400).json({ error: 'Missing required fields: type, message' });
    return;
  }

  // Sanitize inputs
  const sanitize = (s: string, max = 200) =>
    String(s ?? '').replace(/[<>"'`]/g, '').substring(0, max).trim();

  const payload = {
    type: sanitize(type, 50),
    from: sanitize(from ?? ''),
    to: sanitize(to ?? ''),
    date: sanitize(date ?? '', 20),
    passengers: sanitize(passengers ?? '', 10),
    message: sanitize(message),
    receivedAt: new Date().toISOString(),
  };

  // TODO: Forward to email (nodemailer) or CRM here
  console.log('[Contact Submission]', payload);

  res.json({ success: true, message: 'Inquiry received. We will contact you shortly.' });
});

/**
 * Work permit fee lookup endpoint
 */
app.get('/api/fee', (req: Request, res: Response) => {
  const age = parseInt(String(req.query.age ?? ''));

  if (isNaN(age) || age < 16 || age > 70) {
    res.status(400).json({ error: 'Invalid age. Must be between 16 and 70.' });
    return;
  }

  const fees =
    age <= 35
      ? { sameCompany: 8284, companyChange: 8434 }
      : { sameCompany: 9507, companyChange: 9657 };

  res.json({ age, ...fees });
});

// ─── Serve React Build in Production ─────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '..', 'dist');
  app.use(express.static(distPath));
  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ─── Error Handler ────────────────────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('[Server Error]', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Annapurna Sewa server running on http://localhost:${PORT}`);
  console.log(`   API: http://localhost:${PORT}/api/health`);
});

export default app;
