// ===============================
// Menú móvil
// ===============================
const btn = document.getElementById('btnMenu');
const nav = document.getElementById('navMenu');
btn?.addEventListener('click', () => {
  const visible = nav.style.display === 'flex';
  nav.style.display = visible ? 'none' : 'flex';
});

// ===============================
// Año dinámico en el footer
// ===============================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===============================
// Scroll suave para anclas
// ===============================
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (!id || id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth < 901 && nav) nav.style.display = 'none';
    }
  });
});

// ===============================
// Carrusel de testimonios (solo barra + teclado)
// ===============================
(function(){
  const track = document.getElementById('testiTrack');
  if(!track) return;

  const cards = track.querySelectorAll('.testi'); // <— corregido
  const getStep = () => {
    if (!cards.length) return track.clientWidth;
    const card = cards[0];
    const style = window.getComputedStyle(card);
    const gap = parseInt(style.marginRight) || 20;
    return card.offsetWidth + gap;
  };

  track.addEventListener('keydown', (e)=>{
    if(e.key === 'ArrowRight') track.scrollBy({left:  getStep(), behavior:'smooth'});
    if(e.key === 'ArrowLeft')  track.scrollBy({left: -getStep(), behavior:'smooth'});
  });

  track.addEventListener('wheel', (e)=>{
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }
  }, { passive:false });
})();

// ===== Banner de Cookies (a prueba de fallos) =====
(function(){
  function byId(id){ return document.getElementById(id); }

  function storageOK(){
    try{
      const k='__tst__'; localStorage.setItem(k,'1'); localStorage.removeItem(k); return true;
    }catch(_){ return false; }
  }

  function isAccepted(){
    if(storageOK()) return localStorage.getItem('cookies-accepted')==='true';
    return document.cookie.includes('cookies-accepted=true');
  }

  function accept(){
    if(storageOK()) localStorage.setItem('cookies-accepted','true');
    else document.cookie = 'cookies-accepted=true; path=/; max-age='+(60*60*24*365);
    const b = byId('cookie-banner');
    if(b){ b.classList.remove('show'); b.style.display='none'; }
  }

  function init(){
    const banner = byId('cookie-banner');
    const btn    = byId('accept-cookies');
    if(!banner || !btn) return;

    if(!isAccepted()){
      banner.classList.add('show');
      banner.style.display = '';
    }else{
      banner.classList.remove('show');
      banner.style.display = 'none';
    }

    btn.addEventListener('click', accept);
    banner.addEventListener('keydown', e => { if(e.key==='Escape') accept(); });
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{
    init();
  }
})();

/* ===== WhatsApp badge (opcional) ===== */
(function () {
  const BADGE_COUNT = 3; // pon 0 si no quieres número
  const b = document.getElementById('waBadge');
  if (!b) return;
  if (BADGE_COUNT > 0) b.textContent = String(BADGE_COUNT);
  else b.style.display = 'none';
})();
