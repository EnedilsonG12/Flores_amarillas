const $ = (s) => document.querySelector(s);

const intro = $('#introScreen');
const garden = $('#garden');
const gift = $('#giftButton');
const card = $('#messageCard');
const closeCard = $('#closeCard');
const musicButton = $('#musicButton');

// Reproductor oficial de YouTube para la canción original.
let youtubePlayer = null;
let youtubeReady = false;

window.onYouTubeIframeAPIReady = function () {
  youtubePlayer = new YT.Player('youtubePlayer', {
    events: {
      onReady: () => { youtubeReady = true; }
    }
  });
};

function createParticles() {
  const stars = $('#stars');
  const particles = $('#particles');
  const sparkles = $('#sparkles');
  const rings = $('#glowRings');
  const lights = $('#floatingLights');
  const hearts = $('#hearts');

  for (let i=0;i<75;i++) {
    const e=document.createElement('span');
    e.className='star';
    e.style.left=Math.random()*100+'%';
    e.style.top=Math.random()*100+'%';
    e.style.animationDelay=(Math.random()*3)+'s';
    stars.appendChild(e);
  }

  for (let i=0;i<22;i++) {
    const e=document.createElement('span');
    e.className='particle';
    e.style.left=Math.random()*100+'%';
    e.style.top=(45+Math.random()*55)+'%';
    e.style.animationDelay=(-Math.random()*8)+'s';
    particles.appendChild(e);
  }

  for (let i=0;i<14;i++) {
    const e=document.createElement('span');
    e.className='sparkle';
    e.style.left=Math.random()*100+'%';
    e.style.top=Math.random()*100+'%';
    e.style.animationDelay=(-Math.random()*2)+'s';
    sparkles.appendChild(e);
  }

  for (let i=0;i<5;i++) {
    const e=document.createElement('span');
    e.className='glow-ring';
    const size=80+Math.random()*180;
    e.style.width=e.style.height=size+'px';
    e.style.left=(20+Math.random()*60)+'%';
    e.style.top=(25+Math.random()*50)+'%';
    e.style.animationDelay=(-i)+'s';
    rings.appendChild(e);
  }

  for (let i=0;i<7;i++) {
    const e=document.createElement('span');
    e.className='heart-particle';
    e.textContent=['❤','💛','💖','✨'][i%4];
    e.style.left=Math.random()*100+'%';
    e.style.animationDelay=(-Math.random()*7)+'s';
    hearts.appendChild(e);
  }

  // Decorative light blobs.
  for (let i=0;i<5;i++) {
    const e=document.createElement('span');
    e.style.position='absolute';
    e.style.width='90px';
    e.style.height='90px';
    e.style.borderRadius='50%';
    e.style.left=Math.random()*100+'%';
    e.style.top=Math.random()*100+'%';
    e.style.background='radial-gradient(circle,rgba(255,235,59,.14),transparent 70%)';
    e.style.filter='blur(10px)';
    e.style.animation='bob '+(4+Math.random()*4)+'s ease-in-out infinite';
    lights.appendChild(e);
  }
}

function openGift(event) {
  if (event) event.preventDefault();

  // Cambia a la segunda sección de forma directa y compatible con móviles.
  intro.classList.add('hidden');
  garden.classList.add('visible');
  garden.setAttribute('aria-hidden', 'false');
  document.body.classList.add('gift-open');
  history.replaceState(null, '', '#regalo');

  // Asegura que la sección sea visible incluso si el navegador conserva estilos anteriores.
  garden.style.display = 'block';
  garden.style.opacity = '1';

  setTimeout(() => card.classList.add('show'), 450);
}

gift.addEventListener('click', openGift);

// Si se abre directamente con #regalo, entra a la segunda sección.
if (window.location.hash === '#regalo') {
  openGift();
}

closeCard.addEventListener('click', () => card.classList.remove('show'));

musicButton.addEventListener('click', () => {
  if (!youtubeReady || !youtubePlayer) {
    // Si el reproductor todavía está cargando, intentamos de nuevo enseguida.
    setTimeout(() => musicButton.click(), 900);
    return;
  }

  const state = youtubePlayer.getPlayerState();
  if (state === YT.PlayerState.PLAYING) {
    youtubePlayer.pauseVideo();
    musicButton.textContent = '🎵';
    musicButton.classList.remove('playing');
  } else {
    youtubePlayer.playVideo();
    musicButton.textContent = '🔊';
    musicButton.classList.add('playing');
  }
});

createParticles();
