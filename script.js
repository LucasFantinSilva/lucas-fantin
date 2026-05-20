// ===== ANIMACIÓN DE CARDS AL HACER SCROLL =====
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const delay = parseInt(card.dataset.index) * 80;
      setTimeout(() => {
        card.classList.add('visible');
      }, delay);
      observer.unobserve(card);
    }
  });
}, { threshold: 0.1 });

cards.forEach(card => observer.observe(card));


// ===== ANIMACIÓN CONTADOR DE STATS =====
function animateCount(el, target, duration = 1200) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsBar = document.querySelector('.stats-bar');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting && !statsAnimated) {
    statsAnimated = true;
    const statNums = document.querySelectorAll('.stat-num');
    const targets = [6, 25, 3, 3];
    statNums.forEach((el, i) => {
      el.textContent = '0';
      animateCount(el, targets[i]);
    });
  }
}, { threshold: 0.5 });

statsObserver.observe(statsBar);


// ===== EASTER EGG: CLICK EN LA PELOTA =====
const ball = document.querySelector('.ball-deco');
const sounds = ['🏐 ¡Punto!', '⚡ ¡Ace!', '🙌 ¡Bloqueo!', '🔥 ¡Remate!', '👊 ¡Toque!'];
let clickCount = 0;

ball.style.cursor = 'pointer';
ball.addEventListener('click', () => {
  clickCount++;
  const msg = sounds[clickCount % sounds.length];

  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 30px; right: 30px;
    background: #FFD600;
    color: #0D0D0D;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.08em;
    padding: 12px 28px;
    border-radius: 4px;
    z-index: 9999;
    animation: toastIn 0.3s ease;
    box-shadow: 0 8px 30px rgba(255,214,0,0.4);
  `;

  const style = document.createElement('style');
  style.textContent = `
    @keyframes toastIn {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 1500);
});


// ===== HIGHLIGHT DE JUGADORES EN CANCHA =====
const players = document.querySelectorAll('.player');
const positionNames = {
  'p1': 'Zona 1 — Servidor',
  'p2': 'Zona 2 — Atacante',
  'p3': 'Zona 3 — Centro',
  'p4': 'Zona 4 — Punta',
  'p5': 'Zona 5 — Defensor',
  'libero': 'Líbero — Defensa especializada'
};

players.forEach(player => {
  const classKey = [...player.classList].find(c => positionNames[c]);
  if (!classKey) return;

  const tooltip = document.createElement('div');
  tooltip.textContent = positionNames[classKey];
  tooltip.style.cssText = `
    position: absolute;
    background: rgba(0,0,0,0.9);
    color: #FFD600;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    white-space: nowrap;
    padding: 5px 10px;
    border-radius: 4px;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s;
    z-index: 10;
    border: 1px solid rgba(255,214,0,0.3);
  `;

  player.style.position = 'absolute';
  player.style.overflow = 'visible';
  player.appendChild(tooltip);

  player.addEventListener('mouseenter', () => tooltip.style.opacity = '1');
  player.addEventListener('mouseleave', () => tooltip.style.opacity = '0');
});


// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
