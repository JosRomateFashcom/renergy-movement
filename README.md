# Renergy Movement

Website voor Rens van Zoelen: statische voorkant (HTML, CSS, een klein stukje JavaScript) met een kleine Node.js-backend die het contactformulier per e-mail aflevert.

## Bestanden

- `index.html` bevat de volledige pagina.
- `style.css` bevat alle vormgeving en responsive regels.
- `script.js` sluit het mobiele menu en verstuurt het contactformulier naar de backend.
- `images/` bevat de gebruikte afbeeldingen.
- `server.js` serveert de site en handelt `POST /api/contact` af (mail via SMTP met Nodemailer).
- `.env.example` toont welke instellingen de server nodig heeft.

## Lokaal draaien

```bash
npm install
npm start
```

De site draait dan op http://localhost:3000. Zonder `.env` draait de server in ontwikkelmodus: formulierberichten worden niet gemaild maar in de console gelogd.

## Productie

1. Kopieer `.env.example` naar `.env` en vul de SMTP-gegevens van je mailprovider in (host, poort, gebruikersnaam, wachtwoord). `CONTACT_TO` bepaalt waar aanvragen binnenkomen (standaard rens@renergymovement.nl).
2. Draai `npm install --omit=dev && npm start` op een server of Node-hostingdienst (bijv. een VPS, Render of Railway).

Het formulier heeft een honeypot-veld tegen spam en een eenvoudige rate limit (max. 5 aanvragen per kwartier per IP-adres).
