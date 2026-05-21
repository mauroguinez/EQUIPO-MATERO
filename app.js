/* ===================================================
   EQUIPO MATERO — app.js
   =================================================== */

// ── PRODUCTS DATA ──
const products = [

  // ── MATES IMPERIALES ──
  {
    id: 1,
    category: 'imperiales',
    categoryLabel: 'Imperial',
    name: 'Imperial Alpaca Liso',
    variant: 'Cuero Negro',
    details: ['Imperial de Calabaza', 'Forrado en Cuero Liso Negro', 'Virola de Alpaca Lisa'],
    price: 35000,
    image: 'images/Imperial_Alpaca_Liso.png',
    featured: false
  },
  {
    id: 2,
    category: 'imperiales',
    categoryLabel: 'Imperial',
    name: 'Imperial Alpaca Lisa',
    variant: 'Cuero Borravino',
    details: ['Imperial de Calabaza', 'Forrado en Cuero Liso Borravino', 'Virola de Alpaca Lisa'],
    price: 35000,
    image: 'images/Imperial_Alpaca_Lisa.png',
    featured: false
  },
  {
    id: 3,
    category: 'imperiales',
    categoryLabel: 'Imperial',
    name: 'Imperial Premium',
    variant: 'Cuero Crudo',
    details: ['Imperial de Calabaza', 'Forrado en Cuero Crudo', 'Virola de Alpaca Lisa'],
    price: 55000,
    image: 'images/Imperial_Premium.png',
    featured: true
  },
  {
    id: 4,
    category: 'imperiales',
    categoryLabel: 'Imperial',
    name: 'Imperial Algarrobo',
    variant: '',
    details: ['Imperial de Algarrobo', 'Virola de Alpaca'],
    price: 29000,
    image: 'images/Imperial_Algarrobo.png',
    featured: false
  },

  // ── MATES TORPEDOS ──
  {
    id: 5,
    category: 'torpedos',
    categoryLabel: 'Torpedo',
    name: 'Torpedo Cincelado',
    variant: 'Cuero Negro',
    details: ['Torpedo de Calabaza', 'Forrado en Cuero Liso Negro', 'Virola de Alpaca Cincelada'],
    price: 35000,
    image: 'images/Torpedo_Cincelado_Negro.png',
    featured: false
  },
  {
    id: 6,
    category: 'torpedos',
    categoryLabel: 'Torpedo',
    name: 'Torpedo Cincelado',
    variant: 'Cuero Borravino',
    details: ['Torpedo de Calabaza', 'Forrado en Cuero Liso Borravino', 'Virola de Alpaca Cincelada'],
    price: 35000,
    image: 'images/Torpedo_Cincelado_Borravino.png',
    featured: false
  },
  {
    id: 7,
    category: 'torpedos',
    categoryLabel: 'Torpedo',
    name: 'Torpedo Premium',
    variant: 'Cuero Crudo',
    details: ['Torpedo de Calabaza', 'Forrado en Cuero Crudo', 'Virola de Alpaca Cincelada'],
    price: 55000,
    image: 'images/Torpedo_Premium.png',
    featured: true
  },
  {
    id: 8,
    category: 'torpedos',
    categoryLabel: 'Torpedo',
    name: 'Torpedo Rey',
    variant: '',
    details: ['Torpedo de Algarrobo', 'Virola de Alpaca Cincelada', '2 Aros de Bronce'],
    price: 38000,
    image: 'images/Torpedo_Rey.png',
    featured: false
  },

  // ── MATES CAMIONEROS ──
  {
    id: 9,
    category: 'camioneros',
    categoryLabel: 'Camionero',
    name: 'Camionero Acero Liso',
    variant: 'Cuero Negro',
    details: ['Camionero de Calabaza', 'Forrado en Cuero Liso Negro', 'Virola de Acero Lisa'],
    price: 26500,
    image: 'images/Camionero_Acero_Liso_Negro.png',
    featured: false
  },
  {
    id: 10,
    category: 'camioneros',
    categoryLabel: 'Camionero',
    name: 'Camionero Acero Liso',
    variant: 'Cuero Borravino',
    details: ['Camionero de Calabaza', 'Forrado en Cuero Liso Borravino', 'Virola de Acero Lisa'],
    price: 26500,
    image: 'images/Camionero_Acero_Liso_Borravino.png',
    featured: false
  },
  {
    id: 11,
    category: 'camioneros',
    categoryLabel: 'Camionero',
    name: 'Camionero Criollo',
    variant: '',
    details: ['Camionero Criollo de Calabaza', 'Base de Cuero'],
    price: 27000,
    image: 'images/Camionero_Criollo.png',
    featured: false
  },
  {
    id: 12,
    category: 'camioneros',
    categoryLabel: 'Camionero',
    name: 'Camionero Algarrobo',
    variant: '',
    details: ['Camionero de Algarrobo', 'Virola de Acero Lisa'],
    price: 23500,
    image: 'images/Camionero_Algarrobo.png',
    featured: false
  },
  {
    id: 13,
    category: 'camioneros',
    categoryLabel: 'Camionero',
    name: 'Criollo con Virola',
    variant: '',
    details: ['Camionero Criollo de Calabaza', 'Base de Cuero', 'Virola de Acero Lisa'],
    price: 29000,
    image: 'images/Criollo_con_Virola.png',
    featured: false
  },

  // ── MATE RANCHERO ── (sin foto en el pack)
  {
    id: 14,
    category: 'ranchero',
    categoryLabel: 'Ranchero',
    name: 'Ranchero Blanco',
    variant: '',
    details: ['Ranchero de Algarrobo', 'Color Blanco'],
    price: 32000,
    image: null,
    featured: false
  },

  // ── MATE GALLETA ── (sin foto en el pack)
  {
    id: 15,
    category: 'galleta',
    categoryLabel: 'Galleta',
    name: 'Mate Galleta',
    variant: '',
    details: ['De Calabaza', 'Base de Cuero'],
    price: 26000,
    image: null,
    featured: false
  },

  // ── MATERAS ──
  {
    id: 16,
    category: 'materas',
    categoryLabel: 'Matera',
    name: 'Matera Simil Cuero',
    variant: 'Negra',
    details: ['Matera Simil Cuero Reforzada', 'Con Separador', 'Color Negra'],
    price: 22500,
    image: 'images/Matera_Simil_Cuero.png',
    featured: false
  },
  {
    id: 17,
    category: 'materas',
    categoryLabel: 'Matera',
    name: 'Portamate Cuero',
    variant: 'Negro y Marron',
    details: ['Portamate 100% Cuero', 'Color Negro y Marron Claro'],
    price: 23000,
    image: 'images/Portamate_Cuero.png',
    featured: false
  },

  // ── BOMBILLAS ──
  {
    id: 18,
    category: 'bombillas',
    categoryLabel: 'Bombilla',
    name: 'Pico Loro Acero',
    variant: '',
    details: ['Bombilla Pico Loro', 'De Acero Inoxidable'],
    price: 8000,
    image: 'images/Pico_Loro_Acero.png',
    featured: false
  },

  // ── BOMBILLONES ──
  {
    id: 19,
    category: 'bombillones',
    categoryLabel: 'Bombillon',
    name: 'Pico Loro Premium',
    variant: '',
    details: ['Bombillon Pico Loro', 'De Alpaca y Bronce'],
    price: 35000,
    image: 'images/Pico_Loro_Premium.png',
    featured: false
  },

  // ── TERMOS ──
  {
    id: 20,
    category: 'termos',
    categoryLabel: 'Termo',
    name: 'Termo Media Manija',
    variant: 'Color Negro',
    details: ['Termo de Acero', 'Color Negro'],
    price: 26800,
    image: 'images/Termo_Media_Manija.png',
    featured: false
  }
];

// ── STATE ──
let cart = [];
let activeFilter = 'all';

// ── HELPERS ──
function formatPrice(n) {
  return '$' + n.toLocaleString('es-AR');
}

const WHATSAPP_NUMBER = '542615874339';

// ── RENDER PRODUCTS ──
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const list = activeFilter === 'all'
    ? products
    : products.filter(p => p.category === activeFilter);

  if (list.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:#A67C52">No hay productos en esta categoria.</div>';
    return;
  }

  grid.innerHTML = list.map(p => {
    const imageHtml = p.image
      ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
      : `<div class="product-placeholder">
           <svg class="ph-icon" viewBox="0 0 48 48" fill="none" stroke="#C9A87C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="24" cy="32" rx="14" ry="10"/><path d="M17 22v-4a7 7 0 0114 0v4"/><line x1="24" y1="18" x2="30" y2="8"/><path d="M21 16c-2-3-5-5-5-5s1 4 4 6"/><path d="M24 15c0-3 1-6 4-7s3 4 1 7"/></svg>
           <span class="ph-label">${p.name}${p.variant ? ' · ' + p.variant : ''}</span>
         </div>`;

    const badgeHtml = p.featured ? '<span class="product-badge">PREMIUM</span>' : '';
    const variantHtml = p.variant ? `<div class="product-variant">${p.variant}</div>` : '';
    const detailsHtml = p.details.map(d => `<li>${d}</li>`).join('');

    return `
      <div class="product-card" data-id="${p.id}">
        <div class="product-img">
          ${imageHtml}
          ${badgeHtml}
        </div>
        <div class="product-info">
          <div class="product-category">${p.categoryLabel}</div>
          <div class="product-name">${p.name}</div>
          ${variantHtml}
          <ul class="product-details">${detailsHtml}</ul>
          <div class="product-footer">
            <span class="product-price">${formatPrice(p.price)}</span>
            <button class="add-to-cart" id="btn-${p.id}" onclick="addToCart(${p.id})">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Agregar
            </button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ── FILTERS ──
function initFilters() {
  document.getElementById('filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    activeFilter = btn.dataset.filter;
    renderProducts();
  });
}

// ── CART ACTIONS ──
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (!product) return;

  const existing = cart.find(i => i.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  updateCartUI();
  flashAddButton(id);
  setTimeout(openCart, 280);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  updateCartUI();
}

function updateQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) removeFromCart(id);
  else updateCartUI();
}

function flashAddButton(id) {
  const btn = document.getElementById('btn-' + id);
  if (!btn) return;
  btn.classList.add('added');
  btn.innerHTML = '&#10003; &nbsp;Agregado';
  setTimeout(() => {
    btn.classList.remove('added');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
        <line x1="3" y1="6" x2="21" y2="6"/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      Agregar`;
  }, 1600);
}

// ── UPDATE CART UI ──
function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const badge = document.getElementById('cartCount');
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);

  document.getElementById('cartTotal').textContent = formatPrice(total);

  const checkoutBtn = document.getElementById('checkoutBtn');
  checkoutBtn.disabled = cart.length === 0;

  renderCartItems();
}

function renderCartItems() {
  const container = document.getElementById('cartItems');

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <svg class="empty-icon" viewBox="0 0 64 64" fill="none" stroke="#C9A87C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 8h8l6 28h24l6-20H18"/><circle cx="26" cy="52" r="3"/><circle cx="44" cy="52" r="3"/></svg>
        <p>Tu carrito esta vacio.</p>
        <p>Agrega productos para hacer tu pedido.</p>
      </div>`;
    return;
  }

  container.innerHTML = cart.map(item => {
    const thumbHtml = item.image
      ? `<img src="${item.image}" alt="${item.name}">`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="#C9A87C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" width="32" height="32"><ellipse cx="12" cy="16" rx="7" ry="5"/><path d="M8.5 11V9a3.5 3.5 0 017 0v2"/><line x1="12" y1="9" x2="15" y2="4"/><path d="M10.5 8C9 6 7 5 7 5s.5 2 2 3"/></svg>`;

    const variantLabel = item.variant ? ' - ' + item.variant : '';
    const subtotal = formatPrice(item.price * item.qty);

    return `
      <div class="cart-item">
        <div class="cart-item-thumb">
          ${thumbHtml}
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${variantLabel}</div>
          <div class="cart-item-sub">${item.details[0]}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)" aria-label="Restar">&#8722;</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)" aria-label="Sumar">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${subtotal}</span>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Eliminar">&#10005;</button>
        </div>
      </div>`;
  }).join('');
}

// ── CART OPEN / CLOSE ──
function openCart() {
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ── WHATSAPP CHECKOUT ──
function checkout() {
  if (cart.length === 0) return;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  let msg = 'Hola Equipo Matero! Quiero hacer el siguiente pedido:\n\n';

  cart.forEach(item => {
    const variant = item.variant ? ' (' + item.variant + ')' : '';
    msg += '* ' + item.name + variant + ' x' + item.qty + '  ->  ' + formatPrice(item.price * item.qty) + '\n';
  });

  msg += '\nTOTAL: ' + formatPrice(total) + '\n\n';
  msg += 'Pueden confirmar disponibilidad y coordinar el envio? Muchas gracias!';

  const url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  window.open(url, '_blank');
}

// ── HEADER SCROLL ──
function initScrollEffect() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');

  menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.classList.toggle('open', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });
}

// ── SMOOTH SCROLL ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = document.getElementById('header').offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  initFilters();
  initScrollEffect();
  initMobileMenu();
  initSmoothScroll();
  updateCartUI();

  document.getElementById('cartBtn').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('checkoutBtn').addEventListener('click', checkout);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
});
