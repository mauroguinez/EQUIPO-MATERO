/* ===================================================
   EQUIPO MATERO — admin.js
   =================================================== */

// ── CONFIGURACION ──
// Para cambiar la contraseña, modificá este valor:
const ADMIN_PASSWORD = 'equipo2025';
const STORAGE_KEY    = 'em_products';

// ── LABELS POR CATEGORIA ──
const categoryLabels = {
  imperiales:  'Imperial',
  torpedos:    'Torpedo',
  camioneros:  'Camionero',
  ranchero:    'Ranchero',
  galleta:     'Galleta',
  materas:     'Matera',
  bombillas:   'Bombilla',
  bombillones: 'Bombillon',
  termos:      'Termo'
};

// ── ESTADO ──
let products      = [];
let editingId     = null;
let deleteTargetId = null;
let searchQuery   = '';

// ── PERSISTENCIA ──
function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  // Copia profunda de los defaults para no mutar el original
  return JSON.parse(JSON.stringify(defaultProducts));
}

function saveProducts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// ── FORMATO ──
function formatPrice(n) {
  return '$' + Number(n).toLocaleString('es-AR');
}

function nextId() {
  return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
}

// ── RENDER LISTA ──
function renderList() {
  const list  = document.getElementById('productList');
  const query = searchQuery.toLowerCase().trim();

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    (p.variant && p.variant.toLowerCase().includes(query)) ||
    p.categoryLabel.toLowerCase().includes(query)
  );

  // Stats
  document.getElementById('statTotal').textContent   = products.length;
  document.getElementById('statCats').textContent    = new Set(products.map(p => p.category)).size;
  document.getElementById('statPremium').textContent = products.filter(p => p.featured).length;

  if (filtered.length === 0) {
    list.innerHTML = '<div class="empty-state">No se encontraron productos.</div>';
    return;
  }

  list.innerHTML = filtered.map(p => {
    const imgHtml = p.image
      ? `<img src="${p.image}" alt="${p.name}" class="product-thumb" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">`
      : '';
    const placeholderHtml = `<div class="product-thumb-placeholder" ${p.image ? 'style="display:none"' : ''}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#C9A87C" stroke-width="1.5" width="22" height="22" stroke-linecap="round"><ellipse cx="12" cy="16" rx="6" ry="4"/><path d="M8.5 12V10a3.5 3.5 0 017 0v2"/><line x1="12" y1="10" x2="15" y2="5"/></svg>
      </div>`;
    const variantTag  = p.variant ? ` <span class="variant-tag">${p.variant}</span>` : '';
    const premiumBadge = p.featured ? '<span class="premium-badge">PREMIUM</span>' : '';
    const details     = (p.details || []).join(' · ');

    return `
      <div class="product-row${p.featured ? ' featured' : ''}" data-id="${p.id}">
        <div style="position:relative;flex-shrink:0">
          ${imgHtml}
          ${placeholderHtml}
        </div>
        <div class="product-row-info">
          <div class="product-row-name">${p.name}${variantTag}</div>
          <div class="product-row-meta">
            <span class="category-badge">${p.categoryLabel}</span>
            ${premiumBadge}
          </div>
          <div class="product-row-details">${details}</div>
        </div>
        <div class="product-row-price">${formatPrice(p.price)}</div>
        <div class="product-row-actions">
          <button class="btn-edit" onclick="openEdit(${p.id})">Editar</button>
          <button class="btn-del"  onclick="confirmDelete(${p.id})">Eliminar</button>
        </div>
      </div>`;
  }).join('');
}

// ── MODAL AGREGAR ──
function openAdd() {
  editingId = null;
  document.getElementById('modalTitle').textContent = 'Nuevo Producto';
  document.getElementById('productForm').reset();
  document.getElementById('fieldId').value = '';
  openModal();
}

// ── MODAL EDITAR ──
function openEdit(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;

  document.getElementById('modalTitle').textContent = 'Editar Producto';
  document.getElementById('fieldId').value           = id;
  document.getElementById('fieldName').value         = p.name;
  document.getElementById('fieldVariant').value      = p.variant || '';
  document.getElementById('fieldCategory').value     = p.category;
  document.getElementById('fieldPrice').value        = p.price;
  document.getElementById('fieldDetail1').value      = (p.details && p.details[0]) || '';
  document.getElementById('fieldDetail2').value      = (p.details && p.details[1]) || '';
  document.getElementById('fieldDetail3').value      = (p.details && p.details[2]) || '';
  document.getElementById('fieldImage').value        = p.image ? p.image.replace('images/', '') : '';
  document.getElementById('fieldFeatured').checked   = p.featured || false;

  openModal();
}

function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
  document.getElementById('fieldName').focus();
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  editingId = null;
}

// ── GUARDAR PRODUCTO ──
function saveProduct() {
  const name     = document.getElementById('fieldName').value.trim();
  const price    = parseFloat(document.getElementById('fieldPrice').value);
  const category = document.getElementById('fieldCategory').value;

  if (!name)          { showError('fieldName',  'Completá el nombre.');     return; }
  if (!price || price <= 0) { showError('fieldPrice', 'Ingresá un precio válido.'); return; }

  const details = [
    document.getElementById('fieldDetail1').value.trim(),
    document.getElementById('fieldDetail2').value.trim(),
    document.getElementById('fieldDetail3').value.trim(),
  ].filter(Boolean);

  const imgFile = document.getElementById('fieldImage').value.trim();
  const image   = imgFile ? 'images/' + imgFile : null;

  const data = {
    category,
    categoryLabel: categoryLabels[category] || category,
    name,
    variant:  document.getElementById('fieldVariant').value.trim(),
    details:  details.length ? details : [name],
    price,
    image,
    featured: document.getElementById('fieldFeatured').checked
  };

  if (editingId !== null) {
    const idx = products.findIndex(p => p.id === editingId);
    if (idx !== -1) products[idx] = { ...products[idx], ...data };
    showToast('Producto actualizado correctamente');
  } else {
    data.id = nextId();
    products.push(data);
    showToast('Producto agregado correctamente');
  }

  saveProducts();
  renderList();
  closeModal();
}

function showError(fieldId, msg) {
  const field = document.getElementById(fieldId);
  field.style.borderColor = '#E53E3E';
  field.focus();
  showToast(msg);
  setTimeout(() => { field.style.borderColor = ''; }, 2000);
}

// ── ELIMINAR ──
function confirmDelete(id) {
  deleteTargetId = id;
  const p = products.find(x => x.id === id);
  const label = p ? `"${p.name}${p.variant ? ' (' + p.variant + ')' : ''}"` : 'este producto';
  document.getElementById('confirmText').textContent = `Vas a eliminar ${label}. ¿Confirmás?`;
  document.getElementById('confirmOverlay').classList.add('open');
}

function doDelete() {
  products = products.filter(p => p.id !== deleteTargetId);
  saveProducts();
  renderList();
  document.getElementById('confirmOverlay').classList.remove('open');
  showToast('Producto eliminado');
  deleteTargetId = null;
}

// ── RESTAURAR DEFAULTS ──
function resetDefaults() {
  if (!confirm('¿Restaurar el catálogo original? Se van a perder todos los cambios que hiciste.')) return;
  products = JSON.parse(JSON.stringify(defaultProducts));
  saveProducts();
  renderList();
  showToast('Catálogo restaurado al original');
}

// ── TOAST ──
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('visible');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('visible'), 2800);
}

// ── LOGIN ──
function tryLogin() {
  const val = document.getElementById('passwordInput').value;
  if (val === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').style.display  = 'none';
    document.getElementById('adminPanel').style.display   = 'block';
    document.getElementById('adminPanel').classList.add('visible');
    products = loadProducts();
    renderList();
  } else {
    document.getElementById('loginError').style.display = 'block';
    document.getElementById('passwordInput').value      = '';
    document.getElementById('passwordInput').focus();
  }
}

function logout() {
  document.getElementById('loginScreen').style.display = 'flex';
  document.getElementById('adminPanel').style.display  = 'none';
  document.getElementById('passwordInput').value       = '';
  document.getElementById('loginError').style.display  = 'none';
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {

  // Login
  document.getElementById('loginBtn').addEventListener('click', tryLogin);
  document.getElementById('passwordInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') tryLogin();
  });
  document.getElementById('logoutBtn').addEventListener('click', logout);

  // Agregar
  document.getElementById('addBtn').addEventListener('click', openAdd);

  // Modal producto
  document.getElementById('modalClose').addEventListener('click', closeModal);
  document.getElementById('cancelBtn').addEventListener('click', closeModal);
  document.getElementById('saveBtn').addEventListener('click', saveProduct);
  document.getElementById('modalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modalOverlay')) closeModal();
  });

  // Confirmar eliminar
  document.getElementById('confirmCancel').addEventListener('click', () => {
    document.getElementById('confirmOverlay').classList.remove('open');
  });
  document.getElementById('confirmOk').addEventListener('click', doDelete);

  // Restaurar
  document.getElementById('resetBtn').addEventListener('click', resetDefaults);

  // Buscar
  document.getElementById('searchInput').addEventListener('input', e => {
    searchQuery = e.target.value;
    renderList();
  });

  // Escape cierra modales
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeModal();
    document.getElementById('confirmOverlay').classList.remove('open');
  });

});
