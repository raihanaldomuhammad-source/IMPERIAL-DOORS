/* ========== CONFIG ========== */
const WA_NUMBER = "306909393903"; // 
/* ============================ */

/* PRELOADER */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  setTimeout(()=> {
    pre.style.opacity = 0;
    pre.style.pointerEvents = 'none';
    pre.style.transition = 'opacity .6s ease';
    setTimeout(()=> pre.remove(), 700);
  }, 700); // minimal tampil 700ms
});

/* NAVBAR compact on scroll */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  if (offset > 60) navbar.classList.add('compact');
  else navbar.classList.remove('compact');

  // Parallax hero background transform
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    const speed = 0.25;
    const y = Math.max(0, window.scrollY * speed);
    heroBg.style.transform = `translateY(${y}px) scale(1.03)`;
  }
});

/* SEARCH FILTER */
const searchInput = document.getElementById('searchInput');
const productsGrid = document.getElementById('productsGrid');
searchInput && searchInput.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase();
  const cards = productsGrid.querySelectorAll('.product-card');
  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const desc = (card.dataset.desc||"").toLowerCase();
    if (!q || title.includes(q) || desc.includes(q)) {
      card.style.display = '';
      card.style.opacity = 0;
      // micro animation
      setTimeout(()=> card.style.opacity = 1, 40);
    } else {
      card.style.display = 'none';
    }
  });
});

/* ORDER VIA WHATSAPP (used by buttons) */
function orderViaWA(productName) {
    const phone = "306909393903";

    const message = `Hello, I would like to order the ${productName}. Please provide more details.`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}


/* PRODUCT MODAL */
const productModal = document.getElementById('productModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');
const modalOrderBtn = document.getElementById('modalOrderBtn');

function openProductModal(card) {
  if (!card) return;
  const img = card.querySelector('.card-media img');
  const title = card.dataset.title;
  const desc = card.dataset.desc || '';
  const price = parseInt(card.dataset.price || '0', 10) || 0;
  modalImage.src = img ? img.src : 'assets/placeholder.jpg';
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalPrice.textContent = `Rp ${new Intl.NumberFormat('id-ID').format(price)}`;
  modalOrderBtn.onclick = () => orderViaWA(title, price);
  showModal();
}

function showModal() {
  productModal.classList.add('show');
  productModal.setAttribute('aria-hidden', 'false');
}

function closeProductModal() {
  productModal.classList.remove('show');
  productModal.setAttribute('aria-hidden', 'true');
}

/* Close modal with ESC or click outside */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});
productModal.addEventListener('click', (e) => {
  if (e.target === productModal) closeProductModal();
});

/* Accessibility: focus trap (basic) */
productModal.addEventListener('keydown', (e) => {
  if (e.key !== 'Tab') return;
  const focusable = productModal.querySelectorAll('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  const first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
  if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
});
