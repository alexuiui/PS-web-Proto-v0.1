// ── NAV SCROLL ──
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── MOBILE MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── PAGE ROUTING ──
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  document.querySelectorAll('[data-page]').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });
  // reinit reveals
  setTimeout(initReveal, 100);
}

document.querySelectorAll('[data-page]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    showPage(a.dataset.page);
  });
});

// ── SCROLL REVEAL ──
function initReveal() {
  const reveals = document.querySelectorAll('.page.active .reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(r => { r.classList.remove('visible'); obs.observe(r); });
}

// ── SCHEDULE TABS ──
document.querySelectorAll('.stab').forEach(tab => {
  tab.addEventListener('click', () => {
    const panel = tab.dataset.tab;
    document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.schedule-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + panel)?.classList.add('active');
  });
});

// ── PORTFOLIO FILTER ──
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? 'block' : 'none';
    });
  });
});

// ── CONTACT FORM ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type=submit]');
    btn.textContent = '已送出 ✓';
    btn.disabled = true;
    setTimeout(() => { btn.textContent = '送出'; btn.disabled = false; contactForm.reset(); }, 3000);
  });
}

// ── INIT ──
window.addEventListener('DOMContentLoaded', () => {
  showPage('home');
  initReveal();
});
