(() => {
  // Año en el footer
  const y = document.getElementById('year');
  if (y) y.append(new Date().getFullYear());

  const CART_KEY = 'castore-cart-count';

  // ---------- HEADER SEARCH ----------
  const navSearch = document.getElementById('navSearch');
  if (navSearch) {
    navSearch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const q = navSearch.value.trim();
        if (!q) return;
        window.location.href = 'productos.html?q=' + encodeURIComponent(q);
      }
    });
  }

  // ---------- PRODUCTOS: FILTRO POR TEXTO ----------
  const prodGrid = document.querySelector('.grid-prod');
  if (prodGrid) {
    const cards = prodGrid.querySelectorAll('.prod');
    const searchInput = document.querySelector('main input[type="search"]');

    const filtrar = (texto) => {
      const term = texto.toLowerCase();
      cards.forEach((card) => {
        const titulo = card.querySelector('h2').textContent.toLowerCase();
        const desc = card.querySelector('p.small').textContent.toLowerCase();
        card.style.display =
          !term || titulo.includes(term) || desc.includes(term) ? '' : 'none';
      });
    };

    // si viene ?q= de la barra del header
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    if (q) {
      if (searchInput) searchInput.value = q;
      filtrar(q);
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => filtrar(e.target.value));
    }
  }

  // ---------- CARRITO SIMPLE (contador) ----------
  const cartCountBadge = document.getElementById('cartCount');

  const getCount = () => Number(localStorage.getItem(CART_KEY) || 0);

  const actualizarBadge = () => {
    if (!cartCountBadge) return;
    const c = getCount();
    cartCountBadge.textContent = c;
    cartCountBadge.hidden = c === 0;
  };

  const setCount = (n) => {
    localStorage.setItem(CART_KEY, String(n));
    actualizarBadge();
    actualizarResumen();
  };

  actualizarBadge();

  // Botones "Añadir al carrito"
  document.querySelectorAll('[data-add-to-cart]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setCount(getCount() + 1);
    });
  });

  // Página carrito: resumen + botón "Vaciar"
  const cartSummary = document.getElementById('cartSummary');
  const clearCart = document.getElementById('clearCart');

  const actualizarResumen = () => {
    if (!cartSummary) return;
    const c = getCount();
    cartSummary.textContent =
      c === 0
        ? 'Tu carrito está vacío por ahora.'
        : `Tenés ${c} producto${c !== 1 ? 's' : ''} en tu carrito.`;
  };

  actualizarResumen();

  if (clearCart) {
    clearCart.addEventListener('click', () => setCount(0));
  }
})();
// ----------------------
// SISTEMA DE CARRITO
// ----------------------

function addToCart(productName, productPrice, productImg) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === productName);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            name: productName,
            price: productPrice,
            img: productImg,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Producto añadido al carrito 🛒");
    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);

    const badge = document.getElementById("cartCount");
    if (badge) {
        badge.textContent = total;
        badge.hidden = total === 0;
    }
}

updateCartCount();
