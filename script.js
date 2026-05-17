const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
  curX += (mouseX - curX) * 0.12;
  curY += (mouseY - curY) * 0.12;
  cursor.style.left = curX + 'px';
  cursor.style.top = curY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .nav-link, .about-card, .contact-card').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('active'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
});

let currentSection = 'home';
let isAnimating = false;

function navigateTo(targetId) {
  if (isAnimating || targetId === currentSection) return;
  isAnimating = true;

  const current = document.getElementById(currentSection);
  const target = document.getElementById(targetId);

  current.classList.add('exit');
  setTimeout(() => {
    current.classList.remove('active', 'exit');
    current.style.display = 'none';
    target.style.display = 'block';
    requestAnimationFrame(() => {
      target.classList.add('active');
      currentSection = targetId;
      updateNavLinks(targetId);
      isAnimating = false;
      if (targetId === 'about') animateSkillBars();
    });
  }, 450);
}

function updateNavLinks(activeId) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.dataset.section === activeId);
  });
}

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    navigateTo(link.dataset.secti
