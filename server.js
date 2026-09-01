require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTACT_TO = process.env.CONTACT_TO || 'rens@renergymovement.nl';

app.use(express.json({ limit: '32kb' }));
app.use(express.static(__dirname));

// Zonder SMTP-gegevens (lokaal ontwikkelen) wordt de mail niet verstuurd
// maar naar de console gelogd, zodat het formulier wel te testen is.
const smtpConfigured = Boolean(process.env.SMTP_HOST);

function createTransport() {
  if (!smtpConfigured) {
    return nodemailer.createTransport({ jsonTransport: true });
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: process.env.SMTP_USER
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
  });
}

// Eenvoudige rate limit: max 5 aanvragen per kwartier per IP.
const recentRequests = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000;
  const hits = (recentRequests.get(ip) || []).filter((t) => now - t < windowMs);
  hits.push(now);
  recentRequests.set(ip, hits);
  return hits.length > 5;
}

app.post('/api/contact', async (req, res) => {
  const { naam, email, organisatie, telefoon, vraag, website } = req.body || {};

  // Honeypot: echte bezoekers zien dit veld niet, bots vullen het in.
  if (website) {
    return res.json({ ok: true });
  }

  if (rateLimited(req.ip)) {
    return res.status(429).json({ ok: false, error: 'Te veel aanvragen achter elkaar. Probeer het over een kwartier opnieuw.' });
  }

  if (!naam || !email || !vraag) {
    return res.status(400).json({ ok: false, error: 'Vul in elk geval je naam, e-mailadres en je vraag in.' });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return res.status(400).json({ ok: false, error: 'Dat e-mailadres lijkt niet te kloppen. Controleer het en probeer opnieuw.' });
  }
  const tooLong = [naam, email, organisatie, telefoon].some((v) => v && v.length > 200) || vraag.length > 5000;
  if (tooLong) {
    return res.status(400).json({ ok: false, error: 'Een van de velden is te lang.' });
  }

  const text = [
    `Naam: ${naam}`,
    `E-mailadres: ${email}`,
    `Organisatie: ${organisatie || '—'}`,
    `Telefoonnummer: ${telefoon || '—'}`,
    '',
    'Over het event en de doelen:',
    vraag,
  ].join('\n');

  try {
    const transport = createTransport();
    const info = await transport.sendMail({
      from: process.env.SMTP_FROM || `Renergy Movement website <no-reply@renergymovement.nl>`,
      replyTo: `${naam} <${email}>`,
      to: CONTACT_TO,
      subject: `Aanvraag via de website — ${naam}${organisatie ? ` (${organisatie})` : ''}`,
      text,
    });
    if (!smtpConfigured) {
      console.log('[dev] SMTP niet geconfigureerd — mail niet verstuurd, inhoud:');
      console.log(info.message);
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error('Mail versturen mislukt:', err.message);
    return res.status(500).json({ ok: false, error: 'Versturen is niet gelukt. Probeer het later opnieuw of mail direct naar rens@renergymovement.nl.' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Renergy Movement draait op http://localhost:${PORT}`);
  if (!smtpConfigured) {
    console.log('Let op: geen SMTP geconfigureerd (.env) — formulierberichten worden alleen gelogd.');
  }
});
