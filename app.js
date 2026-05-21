/* ===================================================
   EQUIPO MATERO — app.js
   Los productos se leen desde Firebase Firestore.
   Si no hay conexion, usa los defaults de products-data.js.
   =================================================== */

let products = [];
let cart = [];
let activeFilter = 'all';

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

    const badgeHtml   = p.featured ? '<span class="product-badge">PREMIUM</span>' : '';
    const variantHtml = p.variant  ? `<div class="product-variant">${p.variant}</div>` : '';
    const detailsHtml = (p.details || []).map(d => `<li>${d}</li>`).join('');

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

// ── CART UI ──
function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const badge = document.getElementById('cartCount');
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);

  document.getElementById('cartTotal').textContent = formatPrice(total);
  document.getElementById('checkoutBtn').disabled  = cart.length === 0;

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

    return `
      <div class="cart-item">
        <div class="cart-item-thumb">${thumbHtml}</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}${variantLabel}</div>
          <div class="cart-item-sub">${(item.details || [])[0] || ''}</div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">&#8722;</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
          <button class="cart-item-remove" onclick="removeFromCart(${item.id})">&#10005;</button>
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
    const v = item.variant ? ' (' + item.variant + ')' : '';
    msg += '* ' + item.name + v + ' x' + item.qty + '  ->  ' + formatPrice(item.price * item.qty) + '\n';
  });

  msg += '\nTOTAL: ' + formatPrice(total) + '\n\n';
  msg += 'Pueden confirmar disponibilidad y coordinar el envio? Muchas gracias!';

  window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

// ── SCROLL HEADER ──
function initScrollEffect() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── MOBILE MENU ──
function initMobileMenu() {
  const menuBtn   = document.getElementById('menuBtn');
  const mobileNav = document.getElementById('mobileNav');
  menuBtn.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    menuBtn.classList.toggle('open', open);
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
      const top = target.getBoundingClientRect().top + window.scrollY - document.getElementById('header').offsetHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', async () => {
  // Cargar productos desde Firestore
  try {
    const doc = await db.collection('catalog').doc('products').get();
    if (doc.exists && doc.data().items && doc.data().items.length > 0) {
      products = doc.data().items;
    } else {
      products = JSON.parse(JSON.stringify(defaultProducts));
    }
  } catch (e) {
    products = JSON.parse(JSON.stringify(defaultProducts));
  }

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
