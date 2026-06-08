// Typewriter effect
function typeWriter(el, text, speed = 45, cb) {
  el.textContent = '';
  let i = 0;
  function tick() {
    if (i < text.length) {
      el.textContent += text[i++];
      setTimeout(tick, speed);
    } else if (cb) cb();
  }
  tick();
}

// Confetti burst
function confettiBurst(x, y) {
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    el.style.cssText = `
      position:fixed; left:${x}px; top:${y}px;
      width:8px; height:8px; border-radius:50%;
      background:${['#f9a8d4','#c4b5fd','#fbbf24','#34d399','#fb7185'][i%5]};
      pointer-events:none; z-index:9999;
    `;
    document.body.appendChild(el);
    const angle = (i / 60) * Math.PI * 2;
    const vel = 4 + Math.random() * 8;
    const vx = Math.cos(angle) * vel;
    const vy = Math.sin(angle) * vel;
    let px = x, py = y, vy2 = vy;
    const anim = setInterval(() => {
      px += vx; py += vy2; vy2 += 0.3;
      el.style.left = px + 'px'; el.style.top = py + 'px';
      el.style.opacity = parseFloat(el.style.opacity || 1) - 0.02;
      if (parseFloat(el.style.opacity) <= 0) { clearInterval(anim); el.remove(); }
    }, 16);
  }
}

// Heart explosion
function heartExplosion(x, y) {
  for (let i = 0; i < 20; i++) {
    const el = document.createElement('div');
    el.textContent = ['❤️','💖','💗','💕','💝'][i % 5];
    el.style.cssText = `
      position:fixed; left:${x}px; top:${y}px;
      font-size:${1 + Math.random() * 1.5}rem;
      pointer-events:none; z-index:9999;
    `;
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const vel = 3 + Math.random() * 7;
    const vx = Math.cos(angle) * vel;
    let py = y, vy = Math.sin(angle) * vel;
    let px = x;
    const anim = setInterval(() => {
      px += vx; py += vy; vy += 0.2;
      el.style.left = px + 'px'; el.style.top = py + 'px';
      el.style.opacity = parseFloat(el.style.opacity || 1) - 0.025;
      if (parseFloat(el.style.opacity) <= 0) { clearInterval(anim); el.remove(); }
    }, 16);
  }
}

// Fireworks
function fireworks() {
  for (let f = 0; f < 5; f++) {
    setTimeout(() => {
      const x = 100 + Math.random() * (window.innerWidth - 200);
      const y = 50 + Math.random() * (window.innerHeight / 2);
      confettiBurst(x, y);
      heartExplosion(x, y);
    }, f * 300);
  }
}

// Scroll reveal
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); }
    });
  }, { threshold: 0.15 });
  els.forEach(el => obs.observe(el));
}
document.addEventListener('DOMContentLoaded', initScrollReveal);
