const getCart = () => JSON.parse(localStorage.getItem("cart") || "[]");
const getWishlist = () => JSON.parse(localStorage.getItem("wishlist") || "[]");
const saveCart = cart => localStorage.setItem("cart", JSON.stringify(cart));
const saveWishlist = list => localStorage.setItem("wishlist", JSON.stringify(list));

function updateCartCount() {
  const count = getCart().reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}
function updateWishlistCount() {
  document.querySelectorAll("#wishlistCount").forEach(el => el.textContent = getWishlist().length);
}
function addToCart(id, quantity = 1, size = null, color = null) {
  const product = products.find(p => p.id === Number(id));
  if (!product) return;
  const cart = getCart();
  const chosenSize = size || product.sizes[0];
  const chosenColor = color || product.colors[0];
  const existing = cart.find(i => i.id === product.id && i.size === chosenSize && i.color === chosenColor);
  if (existing) existing.quantity += quantity;
  else cart.push({id: product.id, quantity, size: chosenSize, color: chosenColor});
  saveCart(cart); updateCartCount();
}
function removeFromCart(id, size, color) {
  const cart = getCart().filter(i => !(i.id === Number(id) && i.size === size && i.color === color));
  saveCart(cart); updateCartCount();
}
function addToWishlist(id) {
  const list = getWishlist(); id = Number(id);
  if (!list.includes(id)) list.push(id);
  saveWishlist(list); updateWishlistCount();
}
function removeFromWishlist(id) {
  saveWishlist(getWishlist().filter(item => item !== Number(id))); updateWishlistCount();
}
function toggleWishlist(id) {
  const list = getWishlist(); id = Number(id);
  if (list.includes(id)) removeFromWishlist(id); else addToWishlist(id);
  document.dispatchEvent(new CustomEvent("wishlistChanged"));
}
function money(value) { return `$${Number(value).toFixed(2)}`; }
function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return "★".repeat(full) + (half ? "½" : "") + "☆".repeat(5 - full - (half ? 1 : 0));
}
function productCard(product) {
  const wished = getWishlist().includes(product.id);
  return `<article class="product-card">
    <div class="product-image-wrap">
      ${product.discount ? `<span class="discount-badge">${product.discount}</span>` : ""}
      <button class="wishlist-btn ${wished ? "saved" : ""}" data-wishlist="${product.id}" aria-label="${wished ? "Remove from" : "Add to"} wishlist"><i class="${wished ? "fa-solid" : "fa-regular"} fa-heart"></i></button>
      <a href="product.html?id=${product.id}" class="product-image-link"><img src="${product.image}" alt="${product.name}" loading="lazy"></a>
    </div>
    <div class="product-info"><a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
      <div class="rating"><span>${stars(product.rating)}</span><small>${product.rating} (${product.reviews})</small></div>
      <div class="price-row"><strong>${money(product.price)}</strong>${product.oldPrice ? `<del>${money(product.oldPrice)}</del>` : ""}${product.discount ? `<em>${product.discount}</em>` : ""}</div>
      <button class="add-cart" data-add-cart="${product.id}">Add to cart</button>
    </div>
  </article>`;
}
function renderProducts(container, list) {
  if (!container) return;
  container.innerHTML = list.length ? list.map(productCard).join("") : `<div class="empty-state"><div class="empty-icon">⌕</div><h2>No products found</h2><p>Try changing your filters or search.</p><a class="btn btn-dark" href="shop.html">Back to shop</a></div>`;
  bindProductActions(container);
}
function bindProductActions(scope = document) {
  scope.querySelectorAll("[data-add-cart]").forEach(btn => btn.addEventListener("click", e => {
    e.preventDefault(); addToCart(btn.dataset.addCart); btn.textContent = "Added ✓"; setTimeout(() => btn.textContent = "Add to cart", 1200);
  }));
  scope.querySelectorAll("[data-wishlist]").forEach(btn => btn.addEventListener("click", e => {
    e.preventDefault(); e.stopPropagation(); toggleWishlist(btn.dataset.wishlist);
    const saved = getWishlist().includes(Number(btn.dataset.wishlist));
    btn.classList.toggle("saved", saved); btn.innerHTML = `<i class="${saved ? "fa-solid" : "fa-regular"} fa-heart"></i>`;
  }));
}
function setupNav() {
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector("#mainNav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", () => { const open = nav.classList.toggle("open"); toggle.setAttribute("aria-expanded", open); toggle.innerHTML = `<i class="fa-solid ${open ? "fa-xmark" : "fa-bars"}"></i>`; });
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); toggle.innerHTML = '<i class="fa-solid fa-bars"></i>'; }));
}
document.addEventListener("DOMContentLoaded", () => {
  setupNav(); updateCartCount(); updateWishlistCount();
  const newest = products.filter(p => p.new).slice(0, 8);
  renderProducts(document.querySelector("#newArrivals"), newest);
  renderProducts(document.querySelector("#topSelling"), [...products].sort((a,b) => b.rating - a.rating).slice(0, 8));
  const newsletter = document.querySelector("#newsletterForm");
  if (newsletter) newsletter.addEventListener("submit", e => { e.preventDefault(); document.querySelector("#newsletterMessage").textContent = "Thanks — you're on the list."; newsletter.reset(); });
});