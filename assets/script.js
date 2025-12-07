const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', (!open).toString());
  });
}
const links = document.querySelectorAll('.site-nav a');
if (links.length) {
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => a.classList.remove('active'));
  const match = Array.from(links).find(a => (a.getAttribute('href')||'').endsWith(path));
  if (match) match.classList.add('active');
}
const header = document.querySelector('.site-header');
if (header) {
  const onScroll = () => { if (window.scrollY > 12) header.classList.add('compact'); else header.classList.remove('compact'); };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
}
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal-in'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
}
const navLinks = document.querySelectorAll('nav.site-nav a[href]');
navLinks.forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (!href) return;
    e.preventDefault();
    document.body.classList.add('fade-out');
    setTimeout(() => { window.location.href = href; }, 180);
  });
});
function setError(id, msg) { const el = document.querySelector(`.field-error[data-for="${id}"]`); if (el) el.textContent = msg || ''; }
function validateEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    let ok = true;
    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const subject = (data.get('subject') || '').toString().trim();
    const message = (data.get('message') || '').toString().trim();
    if (!name) { setError('name', 'Name is required'); ok = false; } else setError('name');
    if (!email) { setError('email', 'Email is required'); ok = false; } else if (!validateEmail(email)) { setError('email', 'Enter a valid email'); ok = false; } else setError('email');
    if (!subject) { setError('subject', 'Subject is required'); ok = false; } else setError('subject');
    if (!message) { setError('message', 'Message is required'); ok = false; } else setError('message');
    const status = document.getElementById('form-status');
    if (!ok) { if (status) status.textContent = 'Please correct the errors above.'; return; }
    if (status) status.textContent = 'Sending...';
    setTimeout(() => { if (status) status.textContent = 'Thanks. We will reach out soon.'; form.reset(); }, 600);
  });
}
