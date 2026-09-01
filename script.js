const mobileMenu = document.querySelector('.mobile-nav');

if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => mobileMenu.removeAttribute('open'));
  });
}

const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const statusEl = contactForm.querySelector('.form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  const showStatus = (message, type) => {
    statusEl.textContent = message;
    statusEl.classList.remove('is-success', 'is-error');
    if (type) statusEl.classList.add(type);
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const data = Object.fromEntries(new FormData(contactForm).entries());

    submitButton.disabled = true;
    showStatus('Versturen…');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.ok) {
        contactForm.reset();
        showStatus('Bedankt voor je aanvraag! Je hoort snel van Rens.', 'is-success');
      } else {
        showStatus(result.error || 'Versturen is niet gelukt. Probeer het later opnieuw.', 'is-error');
      }
    } catch (err) {
      showStatus('Versturen is niet gelukt. Controleer je verbinding of mail direct naar rens@renergymovement.nl.', 'is-error');
    } finally {
      submitButton.disabled = false;
    }
  });
}
