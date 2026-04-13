document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("space");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const mira = document.getElementById("mira");
  const content = document.querySelector(".content");

  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  /* ⭐ STARS */
  const STAR_COUNT = 700;
  let stars = [];

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random(),
        size: Math.random() * 1.5 + 0.3,
        alpha: Math.random(),
      });
    }
  }

  createStars();

  /* INPUT */
  let targetX = w / 2;
  let targetY = h / 2;

  let cursorX = targetX;
  let cursorY = targetY;

  let parallaxX = 0;
  let parallaxY = 0;

  let scrollY = 0;
  let currentScroll = 0;

  window.addEventListener("mousemove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  });

  window.addEventListener("scroll", () => {
    scrollY = window.scrollY;
  });

  document.addEventListener("mousedown", () => {
    mira?.classList.add("click");
  });

  document.addEventListener("mouseup", () => {
    mira?.classList.remove("click");
  });

  function drawNebula() {
    const grad = ctx.createRadialGradient(
      w * 0.5, h * 0.5, 0,
      w * 0.5, h * 0.5, w * 0.9
    );
    grad.addColorStop(0, "rgba(122,48,255,0.2)");
    grad.addColorStop(1, "transparent");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }

  function drawStars() {
    for (let s of stars) {
      let x = s.x + parallaxX * s.z * 60;
      let y = s.y + parallaxY * s.z * 60 + currentScroll * s.z * 0.4;

      if (y > h) y = 0;
      if (y < 0) y = h;

      const glow = ctx.createRadialGradient(x, y, 0, x, y, s.size * 6);
      glow.addColorStop(0, `rgba(255,255,255,${s.alpha})`);
      glow.addColorStop(1, "transparent");

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, s.size * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);

    cursorX += (targetX - cursorX) * 0.18;
    cursorY += (targetY - cursorY) * 0.18;

    const nx = targetX / w - 0.5;
    const ny = targetY / h - 0.5;

    parallaxX += (nx - parallaxX) * 0.05;
    parallaxY += (ny - parallaxY) * 0.05;

    currentScroll += (scrollY - currentScroll) * 0.08;
  if (mira) {
  const scale = mira.classList.contains("click") ? 0.85 : 1;

  mira.style.transform = `
    translate3d(${cursorX}px, ${cursorY}px, 0)
    translate(-50%, -50%)
    scale(${scale})
  `;
}

    if (content) {
      content.style.transform = `
        translate3d(${parallaxX * 10}px, ${parallaxY * 10}px, 0)
      `;
    }

    drawNebula();
    drawStars();

    requestAnimationFrame(animate);
  }

  animate();

  /* 🔥 FADE OUT FUNCIONANDO */
  const elements = document.querySelectorAll('.fade-out:not(.content)');

  elements.forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          el.classList.add('hidden');
        } else {
          el.classList.remove('hidden');
        }
      });
    }, { threshold: 0.2 });

    observer.observe(el);
  });
});

/* 🎴 CARDS */
function mostrarCard(id) {
  const textos = document.querySelectorAll('.texto');
  const ativo = document.getElementById(id);

  if (!ativo) return;

  const aberto = ativo.classList.contains('ativo');

  textos.forEach(t => t.classList.remove('ativo'));
  ativo.scrollIntoView({
})

  if (!aberto) {
    ativo.classList.add('ativo');

    ativo.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
  }
}

function fecharCards() {
  const textos = document.querySelectorAll('.texto');

  setTimeout(() => {
    textos.forEach(t => {
      t.classList.remove('ativo');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
      });
    });
  }, 50);
}