// Progress bar
window.addEventListener('scroll', () => {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  bar.style.width = pct + '%';
});

// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loading = document.getElementById('loading');
    if (loading) loading.classList.add('hidden');
  }, 800);
});

// Back to top
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  btn.classList.toggle('visible', window.scrollY > 300);
});
function scrollTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// Dark mode
function toggleDark() {
  document.body.classList.toggle('dark');
  const btn = document.getElementById('dark-btn');
  if (btn) btn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
  localStorage.setItem('dark', document.body.classList.contains('dark'));
}
(function() {
  if (localStorage.getItem('dark') === 'true') {
    document.body.classList.add('dark');
  }
})();

// Music toggle
let audioCtx = null;
let musicPlaying = false;
function toggleMusic() {
  const btn = document.getElementById('music-btn');
  if (!musicPlaying) {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    playHappyTune(audioCtx);
    musicPlaying = true;
    if (btn) btn.textContent = '🔇';
  } else {
    if (audioCtx) { audioCtx.close(); audioCtx = null; }
    musicPlaying = false;
    if (btn) btn.textContent = '🎵';
  }
}

function playHappyTune(ctx) {
  const notes = [261.63,293.66,329.63,349.23,392,440,493.88,523.25];
  const melody = [0,2,4,2,5,4,2,0,3,4,5,4,3,2,4,7];
  let t = ctx.currentTime;
  melody.forEach((n, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain); gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.value = notes[n % notes.length];
    gain.gain.setValueAtTime(0, t + i * 0.3);
    gain.gain.linearRampToValueAtTime(0.12, t + i * 0.3 + 0.05);
    gain.gain.linearRampToValueAtTime(0, t + i * 0.3 + 0.28);
    osc.start(t + i * 0.3);
    osc.stop(t + i * 0.3 + 0.3);
  });
}

// Particle system
function initParticles() {
  const container = document.querySelector('.particles-container');
  if (!container) return;
  const emojis = ['❤️','💕','✨','💫','🌸','💗','⭐','🌷','💖','🎀'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'particle';
    el.textContent = emojis[i % emojis.length];
    el.style.left = Math.random() * 100 + '%';
    el.style.animationDuration = (6 + Math.random() * 10) + 's';
    el.style.animationDelay = (Math.random() * 8) + 's';
    el.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    container.appendChild(el);
  }
}
document.addEventListener('DOMContentLoaded', initParticles);
