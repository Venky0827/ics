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
  }, { threshold: 0.25 });
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
function buildLetters(el){
  const text = el.textContent || '';
  el.textContent='';
  const frag=document.createDocumentFragment();
  for(let i=0;i<text.length;i++){
    const ch=text[i];
    const span=document.createElement('span');
    span.className='letter';
    if(ch===' ') span.style.width='0.4em'; else span.textContent=ch;
    span.style.transitionDelay=(i*35)+'ms';
    frag.appendChild(span);
  }
  el.appendChild(frag);
}
const letterEls=document.querySelectorAll('.scroll-letters');
letterEls.forEach(buildLetters);
if(letterEls.length){
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.2});
  letterEls.forEach(el=>io.observe(el));
}
const staggerEls=document.querySelectorAll('.stagger');
if(staggerEls.length){
  const io2=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  },{threshold:0.12});
  staggerEls.forEach(el=>io2.observe(el));
}
const parallaxEls=document.querySelectorAll('.bg-pro');
if(parallaxEls.length){
  const onScroll=()=>{
    parallaxEls.forEach(el=>{
      const rect=el.getBoundingClientRect();
      const mid=rect.top+rect.height/2; const vh=window.innerHeight;
      const delta=(vh/2 - mid)*0.15;
      el.style.backgroundPosition=`center calc(50% + ${delta}px)`;
    });
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
}
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
    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        if (status) status.textContent = 'Thanks. We will reach out soon.';
        form.reset();
      } else {
        res.json().then(data => {
          if (status) status.textContent = (data.errors && data.errors[0] && data.errors[0].message) || 'Something went wrong. Please try again.';
        });
      }
    }).catch(() => {
      if (status) status.textContent = 'Network error. Please try again.';
    });
  });
}
