const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');

const savedTheme = localStorage.getItem('navibot-theme');
const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
root.dataset.theme = savedTheme || root.dataset.theme || preferredTheme;

function setTheme(theme) {
  root.dataset.theme = theme;
  localStorage.setItem('navibot-theme', theme);
}

themeToggle?.addEventListener('click', () => {
  setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
});

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

document.querySelectorAll('.doc-sidebar a').forEach((link) => {
  if (link.href === window.location.href) {
    link.classList.add('active');
  }
});
