let shopState = {categories:[], sizes:[], colors:[], maxPrice:300, minPrice:0, sort:"default"};

function readShopFilters() {
  shopState.categories = [...document.querySelectorAll('[data-filter="category"]:checked')].map(i => i.value);
  shopState.sizes = [...document.querySelectorAll('[data-filter="size"]:checked')].map(i => i.value);
  shopState.colors = [...document.querySelectorAll('[data-filter="color"]:checked')].map(i => i.value);
  shopState.minPrice = Number(document.querySelector("#minPrice")?.value) || 0;
  shopState.maxPrice = Number(document.querySelector("#maxPrice")?.value) || 300;
  shopState.sort = document.querySelector("#sortProducts")?.value || "default";
}
function filterProducts(list) {
  return list.filter(p =>
    (!shopState.categories.length || shopState.categories.includes(p.category)) &&
    p.price >= shopState.minPrice && p.price <= shopState.maxPrice &&
    (!shopState.sizes.length || shopState.sizes.some(s => p.sizes.includes(s))) &&
    (!shopState.colors.length || shopState.colors.some(c => p.colors.includes(c)))
  );
}
function sortProducts(list) {
  const sorted = [...list];
  if (shopState.sort === "price-low") sorted.sort((a,b) => a.price - b.price);
  if (shopState.sort === "price-high") sorted.sort((a,b) => b.price - a.price);
  if (shopState.sort === "rating") sorted.sort((a,b) => b.rating - a.rating);
  if (shopState.sort === "newest") sorted.sort((a,b) => Number(b.new) - Number(a.new) || b.id - a.id);
  return sorted;
}
function renderShop() {
  readShopFilters();
  const results = sortProducts(filterProducts(window.categoryProducts || products));
  const target = document.querySelector("#shopProducts");
  renderProducts(target, results);
  const count = document.querySelector("#productCount");
  if (count) count.textContent = `${results.length} product${results.length === 1 ? "" : "s"}`;
  const value = document.querySelector("#priceValue");
  if (value) value.textContent = shopState.maxPrice;
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('[data-filter]').forEach(i => i.addEventListener("change", renderShop));
  document.querySelector("#minPrice")?.addEventListener("input", renderShop);
  document.querySelector("#maxPrice")?.addEventListener("input", renderShop);
  document.querySelector("#priceRange")?.addEventListener("input", e => { document.querySelector("#maxPrice").value = e.target.value; renderShop(); });
  document.querySelector("#sortProducts")?.addEventListener("change", renderShop);
  document.querySelector("#clearFilters")?.addEventListener("click", () => { document.querySelectorAll('[data-filter]').forEach(i => i.checked=false); document.querySelector("#minPrice").value=""; document.querySelector("#maxPrice").value=""; document.querySelector("#priceRange").value=300; renderShop(); });
  const panel = document.querySelector("#filtersPanel");
  document.querySelector("#openFilters")?.addEventListener("click", () => panel?.classList.add("show"));
  document.querySelector("#closeFilters")?.addEventListener("click", () => panel?.classList.remove("show"));
  renderShop();
});