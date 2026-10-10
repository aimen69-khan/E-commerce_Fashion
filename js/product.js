document.addEventListener("DOMContentLoaded", () => {
  const id = Number(new URLSearchParams(location.search).get("id"));
  const product = products.find(p => p.id === id);
  const root = document.querySelector("#productDetails");
  if (!product) { root.innerHTML = `<div class="empty-state"><h2>Product not found</h2><a class="btn btn-dark" href="shop.html">Back to shop</a></div>`; return; }
  root.innerHTML = `<div class="breadcrumbs"><a href="shop.html">Shop</a> / <a href="category.html?category=${product.category}">${product.category}</a> / ${product.name}</div>
  <div class="product-gallery"><div class="thumbs">${product.images.map((img,i)=>`<button class="thumb ${i===0?"active":""}" data-image="${img}"><img src="${img}" alt="${product.name} thumbnail ${i+1}"></button>`).join("")}</div><div class="main-product-image"><img id="mainProductImage" src="${product.image}" alt="${product.name}"></div></div>
  <div class="product-copy"><p class="eyebrow">${product.category.toUpperCase()}</p><h1>${product.name}</h1><div class="detail-rating"><span>${stars(product.rating)}</span><strong>${product.rating}</strong><a href="#reviews">${product.reviews} reviews</a></div><div class="detail-price"><strong>${money(product.price)}</strong>${product.oldPrice?`<del>${money(product.oldPrice)}</del>`:""}${product.discount?`<em>${product.discount}</em>`:""}</div><p class="description">${product.description}</p>
  <div class="option-group"><h3>Color</h3><div class="option-row">${product.colors.map((c,i)=>`<button class="option ${i===0?"selected":""}" data-color="${c}">${c}</button>`).join("")}</div></div>
  <div class="option-group"><h3>Size <a href="#size">Size guide</a></h3><div class="option-row">${product.sizes.map((s,i)=>`<button class="option ${i===0?"selected":""}" data-size="${s}">${s}</button>`).join("")}</div></div>
  <div class="buy-row"><div class="qty"><button id="qtyMinus">−</button><input id="qtyInput" value="1" min="1" max="10" type="number"><button id="qtyPlus">+</button></div><button class="btn btn-dark" id="detailAdd">Add to cart</button><button class="icon-btn" id="detailWish" aria-label="Wishlist"><i class="${getWishlist().includes(product.id)?"fa-solid":"fa-regular"} fa-heart"></i></button></div><button class="buy-now" id="buyNow">Buy Now →</button>
  <div class="info-accordions"><details open><summary>Description</summary><p>${product.description}</p></details><details><summary>Material</summary><p>${product.material}</p></details><details><summary>Size & Fit</summary><p>${product.fit}</p></details><details><summary>Shipping Information</summary><p>${product.shipping}</p></details><details><summary>Returns</summary><p>${product.returns}</p></details></div></div>`;
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0,4);
  renderProducts(document.querySelector("#relatedProducts"), related);
  let size = product.sizes[0], color = product.colors[0];
  root.querySelectorAll("[data-size]").forEach(b => b.onclick=()=>{root.querySelectorAll("[data-size]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");size=b.dataset.size;});
  root.querySelectorAll("[data-color]").forEach(b => b.onclick=()=>{root.querySelectorAll("[data-color]").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");color=b.dataset.color;});
  const qtyInput=root.querySelector("#qtyInput");
  root.querySelector("#qtyMinus").onclick=()=>qtyInput.value=Math.max(1,Number(qtyInput.value)-1);
  root.querySelector("#qtyPlus").onclick=()=>qtyInput.value=Math.min(10,Number(qtyInput.value)+1);
  root.querySelector("#detailAdd").onclick=()=>{addToCart(product.id,Math.max(1,Number(qtyInput.value)),size,color);root.querySelector("#detailAdd").textContent="Added ✓";};
  root.querySelector("#detailWish").onclick=()=>{toggleWishlist(product.id);root.querySelector("#detailWish i").className=`${getWishlist().includes(product.id)?"fa-solid":"fa-regular"} fa-heart`;};
  root.querySelector("#buyNow").onclick=()=>{addToCart(product.id,Math.max(1,Number(qtyInput.value)),size,color);location.href="checkout.html";};
  root.querySelectorAll(".thumb").forEach(t=>t.onclick=()=>{root.querySelectorAll(".thumb").forEach(x=>x.classList.remove("active"));t.classList.add("active");root.querySelector("#mainProductImage").src=t.dataset.image;});
});