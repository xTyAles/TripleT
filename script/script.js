/* Cabecera y pie compartidos en todas las páginas */
const PAGES = [
  ['index.html', 'inicio', 'Inicio'],
  ['coches.html', 'coches', 'Coches'],
  ['blacklist.html', 'blacklist', 'Black List']
];

const logo = `<a href="index.html" class="logo" aria-label="CARS, ir al inicio">
  <span class="logo-img"><img src="img/logo.png" alt="" onerror="this.remove()"></span>CARS</a>`;

function renderChrome() {
  const header = document.getElementById('site-header');
  const footer = document.getElementById('site-footer');
  const current = document.body.dataset.page;

  if (header) {
    header.className = 'site-header';
    header.innerHTML = `${logo}
      <button class="menu-btn" aria-label="Abrir menú" aria-expanded="false">☰</button>
      <nav class="nav" aria-label="Principal">
        ${PAGES.map(([href, id, label]) =>
          `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>`;
    const btn = header.querySelector('.menu-btn');
    const nav = header.querySelector('.nav');
    btn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  }

  if (footer) {
    footer.className = 'site-footer';
    footer.innerHTML = `<div class="fin">
      ${logo}
      <div><h3>Sobre el Proyecto</h3>
        <p>Este sitio fue desarrollado como parte de un proyecto universitario con temática basada en el videojuego Need for Speed: Most Wanted (2005).</p></div>
      <div><h3>Enlaces</h3><ul>
        ${PAGES.map(([href, , label]) => `<li><a href="${href}">${label}</a></li>`).join('')}
      </ul></div></div>
      <div class="copy">© 2025 NFS Most Wanted Cars | Proyecto académico sin fines de lucro</div>`;
  }
}

/* Black List: 15 filas en 3 columnas (15→1). Las imágenes van en img/blacklist/ */
function renderBlacklist() {
  const grid = document.getElementById('blacklist-grid');
  if (!grid) return;
  let html = '';
  for (let c = 0; c < 3; c++) {
    html += '<div class="col">';
    for (let r = 0; r < 5; r++) {
      const n = 15 - (c * 5 + r);
      html += `<div class="row reveal">
        <div class="r1 ph">auto #${n}<img src="img/blacklist/car-${n}.png" alt="Auto del puesto ${n}" loading="lazy" onerror="this.remove()"></div>
        <div class="r2 ph">piloto<img src="img/blacklist/racer-${n}.png" alt="Piloto del puesto ${n}" loading="lazy" onerror="this.remove()"></div>
        <div class="r3 ph"><img src="img/blacklist/tag-${n}.png" alt="Firma del puesto ${n}" loading="lazy" onerror="this.remove()" style="object-fit:contain"></div>
      </div>`;
    }
    html += '</div>';
  }
  grid.innerHTML = html;
}

/* Efectos: cabecera, botón subir, aparición al hacer scroll */
function setupEffects() {
  const header = document.getElementById('site-header');
  const toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Volver arriba');
  toTop.textContent = '↑';
  toTop.addEventListener('click', () => window.scrollTo({ top: 0 }));
  document.body.appendChild(toTop);

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
    toTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { items.forEach(i => i.classList.add('in')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  items.forEach(i => io.observe(i));
}

renderChrome();
renderBlacklist();
setupEffects();
