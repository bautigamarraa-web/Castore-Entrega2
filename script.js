(() => {
  // -----------------------------
  // Utilidad: año en el footer
  // -----------------------------
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // -----------------------------
  // Buscador del HEADER
  // -----------------------------
  const navSearchInput = document.getElementById("navSearch");
  if (navSearchInput) {
    navSearchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const q = navSearchInput.value.trim();
        if (!q) return;
        window.location.href = "productos.html?q=" + encodeURIComponent(q);
      }
    });
  }

  // -----------------------------
  // Carrito (localStorage)
  // -----------------------------
  const CART_KEY = "castore-cart";

  const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  const saveCart = (cart) =>
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

  const getCartCount = () =>
    getCart().reduce((sum, item) => sum + (item.quantity || 1), 0);

  const cartBadge = document.getElementById("cartCount");

  const refreshCartBadge = () => {
    if (!cartBadge) return;
    const count = getCartCount();
    cartBadge.textContent = count;
    cartBadge.hidden = count === 0;
  };

  function addToCart(product) {
    const cart = getCart();
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += product.quantity || 1;
    } else {
      cart.push({
        ...product,
        quantity: product.quantity || 1,
      });
    }

    saveCart(cart);
    refreshCartBadge();
    alert("Producto añadido al carrito 🛒");
  }

  function addToCartFromElement(btn) {
    const root = btn.closest("[data-product-id]");
    if (!root) return;

    const id = root.dataset.productId || root.dataset.productName;
    const name = root.dataset.productName || "Producto";
    const price = Number(root.dataset.productPrice || 0);
    const img = root.dataset.productImg || "";

    addToCart({ id, name, price, img, quantity: 1 });
  }

  function wireAutoCartButtons() {
    document
      .querySelectorAll("[data-add-to-cart-auto]")
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          addToCartFromElement(btn);
        });
      });
  }

  // -----------------------------
  // Render del carrito (carrito.html)
  // -----------------------------
  function renderCartPage() {
    const cartContainer = document.getElementById("cartItems");
    if (!cartContainer) return; // no estamos en carrito.html

    const totalSpan = document.getElementById("cartTotal");
    const cart = getCart();
    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<p class="text-muted">Tu carrito está vacío.</p>';
    } else {
      cart.forEach((item) => {
        const subtotal = (item.price || 0) * (item.quantity || 1);
        total += subtotal;

        const row = document.createElement("div");
        row.className =
          "list-group-item d-flex justify-content-between align-items-center";
        row.innerHTML = `
          <div class="d-flex align-items-center gap-3">
            ${
              item.img
                ? `<img src="${item.img}" alt="${item.name}" style="width:64px;height:auto;border-radius:8px;">`
                : ""
            }
            <div>
              <strong>${item.name}</strong><br>
              <small class="text-muted">Cantidad: ${
                item.quantity || 1
              }</small>
            </div>
          </div>
          <div class="text-end">
            <div class="fw-semibold">AR$ ${subtotal.toLocaleString("es-AR")}</div>
            <button type="button" class="btn btn-link btn-sm text-danger p-0" data-remove="${
              item.id
            }">Quitar</button>
          </div>
        `;
        cartContainer.appendChild(row);
      });
    }

    if (totalSpan) {
      totalSpan.textContent = total.toLocaleString("es-AR");
    }

    // Botones "Quitar"
    cartContainer.querySelectorAll("[data-remove]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-remove");
        const newCart = getCart().filter((i) => i.id !== id);
        saveCart(newCart);
        renderCartPage();
        refreshCartBadge();
      });
    });

    // Botón "Vaciar carrito"
    const clearBtn = document.getElementById("clearCart");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        saveCart([]);
        renderCartPage();
        refreshCartBadge();
      });
    }
  }

  // -----------------------------
  // Buscador en productos.html
  // -----------------------------
  function initProductsSearch() {
    const grid = document.querySelector("[data-products-grid]");
    if (!grid) return;

    const cards = Array.from(grid.querySelectorAll("[data-product-id]"));
    const searchInput = document.querySelector("[data-products-search]");

    const params = new URLSearchParams(window.location.search);
    const initialQ = params.get("q") || "";

    const applyFilter = (term) => {
      const t = term.toLowerCase();
      cards.forEach((card) => {
        const name = (card.dataset.productName || "").toLowerCase();
        const text = card.innerText.toLowerCase();
        card.style.display =
          !t || name.includes(t) || text.includes(t) ? "" : "none";
      });
    };

    if (searchInput) {
      searchInput.value = initialQ;
      searchInput.addEventListener("input", (e) =>
        applyFilter(e.target.value)
      );
    }

    if (initialQ) applyFilter(initialQ);
  }

  // -----------------------------
  // Init general
  // -----------------------------
  refreshCartBadge();
  wireAutoCartButtons();
  renderCartPage();
  initProductsSearch();
})();
