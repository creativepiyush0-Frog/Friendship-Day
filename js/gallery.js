let galleryIndex = 0;
let slideshowTimer = null;

function openLightbox(index) {
  galleryIndex = index;
  const lb = document.getElementById('lightbox');
  if (!lb) return;
  updateLightbox();
  lb.classList.add('active');
  lb.style.display = 'flex';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) { lb.classList.remove('active'); lb.style.display = 'none'; }
  stopSlideshow();
}

function updateLightbox() {
  const img = document.getElementById('lb-img');
  if (!img) return;
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = PHOTOS[galleryIndex];
    img.style.opacity = 1;
    document.getElementById('lb-counter').textContent = (galleryIndex + 1) + ' / ' + PHOTOS.length;
  }, 200);
}

function lbNext() { galleryIndex = (galleryIndex + 1) % PHOTOS.length; updateLightbox(); }
function lbPrev() { galleryIndex = (galleryIndex - 1 + PHOTOS.length) % PHOTOS.length; updateLightbox(); }

function startSlideshow() {
  stopSlideshow();
  slideshowTimer = setInterval(lbNext, 2500);
}
function stopSlideshow() { if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; } }

// Swipe support
let touchStartX = 0;
document.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 50) { dx > 0 ? lbPrev() : lbNext(); }
});

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') lbNext();
  if (e.key === 'ArrowLeft') lbPrev();
  if (e.key === 'Escape') closeLightbox();
});
