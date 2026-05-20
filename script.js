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
