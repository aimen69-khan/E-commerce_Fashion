document.addEventListener("DOMContentLoaded", () => {
  const category = new URLSearchParams(location.search).get("category") || "t-shirts";
  const names = {"t-shirts":"T-Shirts","shirts":"Shirts","jeans":"Jeans","hoodies":"Hoodies","shorts":"Shorts","jackets":"Jackets"};
  const descriptions = {"t-shirts":"Essential tees built for everyday rotation.","shirts":"Refined layers for workdays and weekends.","jeans":"Reliable denim in modern, comfortable fits.","hoodies":"Soft layers for slower days and colder nights.","shorts":"Lightweight staples made for warmer days.","jackets":"Outerwear designed to finish the look."};
  const title = document.querySelector("#categoryTitle"), desc = document.querySelector("#categoryDescription");
  if (title) title.textContent = names[category] || "Category";
  if (desc) desc.textContent = descriptions[category] || "Explore the collection.";
  window.categoryProducts = products.filter(p => p.category === category);
  renderShop();
});