# Castore Argentina – Tienda Web  
**Entrega 3 – Juan Bautista Gamarra**  
**Curso: Desarrollo Web**

Proyecto de tienda online inspirado en la marca **Castore**, desarrollado como trabajo práctico para la **Entrega 3 del curso de Desarrollo Web**.  
El objetivo es aplicar maquetado responsive, uso de framework CSS, SASS/SCSS y JavaScript para crear una experiencia de compra sencilla con carrito.

---

## 🛍️ Funcionalidades principales

- **Landing page (index.html)**
  - Hero con dos productos destacados (hoodie + polo).
  - Animación de entrada (fade-in) del hero al cargar la página.
  - Sección de beneficios: rendimiento, equipos oficiales y envíos.
  - Acceso rápido al catálogo de productos.

- **Catálogo de productos (productos.html)**
  - Grilla responsive de productos con imagen, nombre, descripción y precio.
  - Campo de búsqueda para filtrar productos por texto.
  - Filtro por categoría (Abrigos, Remeras, Rugby, Fútbol, F1).
  - Botón **“Añadir”** que agrega productos al carrito usando `localStorage`.

- **Carrito de compras (carrito.html)**
  - Listado de productos agregados con:
    - Nombre, cantidad, precio unitario y subtotal.
  - Cálculo automático del **total**.
  - Acciones:
    - **Vaciar carrito**
    - **Seguir comprando**
    - (Opcional) Botón **“Pasar a la compra”** hacia página de checkout.
  - Contador de ítems del carrito en el header (badge junto al icono de bolsa).

- **Checkout (checkout.html)** *(simulado, si lo incluís en la entrega)*  
  - Resumen de productos y total del carrito.
  - Formulario de datos de contacto, dirección y método de pago.
  - Mensaje de confirmación de compra (simulada) mediante `alert`.

- **Navegación**
  - Navbar fija con:
    - Logo y nombre del sitio.
    - Links a Inicio / Productos / Contacto.
    - Buscador global.
    - Botón de **Usuario** (icono) y **Carrito**.
  - Buscador del header:
    - Desde cualquier página redirige a `productos.html?q=termino`
    - En `productos.html` se usan esos parámetros para filtrar el catálogo.

---

## 🧱 Tecnologías utilizadas

- **HTML5**
  - Múltiples vistas: `index.html`, `productos.html`, `carrito.html`, `contacto.html` (+ `checkout.html` en caso de estar incluido).
  - Estructura semántica con `<header>`, `<main>`, `<section>`, `<footer>` y uso de formularios.

- **CSS3 + SASS/SCSS**
  - Uso de **SASS** con estructura modular:
    - `sass/scss/main.scss`
    - `sass/scss/_variables.scss`
    - `sass/scss/_mixins.scss`
  - Compilación de SASS a CSS final (`main.css` / `styles.css`).
  - Uso de:
    - **Variables** SASS (colores, tipografías, radios, espaciados, etc.).
    - **Mixins** (por ejemplo, para botones redondeados).
    - **Placeholders + @extend** (ej. `%btn-base` extendido en `.btn-dark`).
    - **Nesting** (anidado de selectores en componentes como `.nav-search`).
    - **Media queries** para hacer el diseño responsive.
    - **Operadores** en SASS para calcular valores (ej: `gap: 1rem + 0.25rem`).
    - **Transiciones y animaciones**:
      - Animación de entrada (fade-in) del hero.
      - Hover con elevación en las cards de producto.

- **Framework CSS**
  - **Bootstrap 5**:
    - Sistema de grillas (`container`, `row`, `col`).
    - Componentes como `navbar`, `cards`, `buttons`, `badges`.
    - Utilidades (`d-flex`, `gap`, `mb-*`, `py-*`, etc.).
  - **Bootstrap Icons**:
    - Iconos de bolsa de compras (`bi-bag`), usuario (`bi-person`), búsqueda (`bi-search`), etc.

- **JavaScript (Vanilla)**
  - Archivo único `script.js` compartido por todas las páginas.
  - Funcionalidad implementada:
    - Buscador global (header) con redirección usando `window.location.href`.
    - Filtro de productos por texto + categoría en `productos.html`.
    - Gestión de carrito con **`localStorage`**:
      - Agregar productos desde el catálogo.
      - Persistencia de datos entre páginas/recargas.
      - Actualización del badge del carrito en el header.
      - Renderizado dinámico de la lista de productos y total en `carrito.html`.
    - Lógica de resumen de compra en `checkout.html` (si se incluye).

- **Control de versiones y despliegue**
  - Proyecto versionado con **Git**.
  - Repositorio en **GitHub**.
  - Sitio publicado con **GitHub Pages**:
    - URL: `https://bautigamarraa-web.github.io/Castore-Entrega3JBG/`

---

## 📁 Estructura de carpetas (resumen)

```text
Castore-Entrega3JBG/
├── index.html
├── productos.html
├── carrito.html
├── contacto.html
├── checkout.html           (si se incluye)
├── styles.css / main.css   (CSS compilado desde SASS)
├── script.js
├── assets/                 (imágenes del sitio)
│   ├── logo-castore.png
│   ├── garcia-hoodie-navy.png
│   ├── alpine-core-polo.png
│   └── ...
└── sass/
    └── scss/
        ├── main.scss
        ├── _variables.scss
        └── _mixins.scss
