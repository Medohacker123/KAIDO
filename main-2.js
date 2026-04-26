// ===== KAIDO WEBSITE — main.js =====

// NAVBAR SCROLL
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// MOBILE MENU
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// YEAR
document.getElementById('year').textContent = new Date().getFullYear();

// CONTACT INFO from data.js
function applyContact() {
  const c = KAIDO_DATA.contact || {};
  if (c.whatsapp) {
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
      const num = c.whatsapp.replace(/\D/g,'');
      a.href = 'https://wa.me/' + num;
      if (a.closest('.contact-item')) a.textContent = c.whatsapp;
    });
    document.querySelectorAll('.footer-contact p').forEach((p,i) => {
      if(i===0) p.textContent = '📱 ' + c.whatsapp;
    });
  }
  if (c.email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
      a.href = 'mailto:' + c.email;
      if (a.closest('.contact-item')) a.textContent = c.email;
    });
    document.querySelectorAll('.footer-contact p').forEach((p,i) => {
      if(i===1) p.textContent = '✉️ ' + c.email;
    });
  }
  if (c.tagline) {
    const el = document.querySelector('.footer-brand p');
    if(el) el.textContent = c.tagline;
  }
}

// SYSTEMS GRID
function renderSystems() {
  const grid = document.getElementById('systemsGrid');
  if (!grid) return;
  const systems = KAIDO_DATA.systems || [];
  grid.innerHTML = systems.map((s, i) => `
    <div class="system-card reveal">
      <span class="system-num">${String(i+1).padStart(2,'0')}</span>
      <div class="system-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
      <span class="system-tag">${s.tag||''}</span>
    </div>`).join('');
}

// SERVICES GRID
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  const services = KAIDO_DATA.services || [];
  grid.innerHTML = services.map(s => `
    <div class="service-card reveal">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.description}</p>
    </div>`).join('');
}

// SCROLL REVEAL
function initReveal() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// COUNTER ANIMATION
function animCounter(el, target) {
  let cur = 0;
  const step = Math.ceil(target / 60);
  const t = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = cur;
    if (cur >= target) clearInterval(t);
  }, 30);
}
function initCounters() {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animCounter(document.getElementById('stat1'), 50);
        animCounter(document.getElementById('stat2'), 120);
        animCounter(document.getElementById('stat3'), 98);
        obs.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const el = document.querySelector('.about-stats');
  if (el) obs.observe(el);
}

// CONTACT FORM
document.getElementById('contactForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const note = document.getElementById('formNote');
  note.textContent = "✓ Message sent! We'll be in touch shortly.";
  e.target.reset();
  setTimeout(() => note.textContent = '', 5000);
});

// INIT
applyContact();
renderSystems();
renderServices();
setTimeout(initReveal, 100);
initCounters();
