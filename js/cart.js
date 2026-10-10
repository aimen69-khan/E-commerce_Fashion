function calculateTotal(cart) {
  const subtotal = cart.reduce((sum,item) => { const p=products.find(x=>x.id===item.id); return sum + (p ? p.price*item.quantity : 0); },0);
  const shipping = subtotal === 0 ? 0 : subtotal >= 100 ? 0 : 9.99;
  const discount = Number(localStorage.getItem("promoDiscount") || 0);
  return {subtotal,shipping,discount,total:Math.max(0,subtotal+shipping-discount)};
}
function renderCart() {
  const cart=getCart(), target=document.querySelector("#cartItems"), summary=document.querySelector("#cartSummary");
  document.querySelector("#cartPageCount").textContent=`${cart.reduce((s,i)=>s+i.quantity,0)} item${cart.reduce((s,i)=>s+i.quantity,0)===1?"":"s"}`;
  if(!cart.length){target.innerHTML=`<div class="empty-state cart-empty"><div class="empty-icon">🛍</div><h2>Your cart is empty</h2><p>Looks like you haven't added anything yet.</p><a class="btn btn-dark" href="shop.html">Start shopping</a></div>`;summary.innerHTML="";return;}
  target.innerHTML=cart.map(item=>{const p=products.find(x=>x.id===item.id);return `<article class="cart-item"><a href="product.html?id=${p.id}"><img src="${p.image}" alt="${p.name}"></a><div class="cart-item-info"><a href="product.html?id=${p.id}"><h3>${p.name}</h3></a><p>Size: ${item.size} · Color: ${item.color}</p><strong>${money(p.price)}</strong></div><div class="cart-controls"><div class="qty"><button data-minus="${p.id}|${item.size}|${item.color}">−</button><span>${item.quantity}</span><button data-plus="${p.id}|${item.size}|${item.color}">+</button></div><button class="remove-btn" data-remove="${p.id}|${item.size}|${item.color}">Remove</button></div></article>`}).join("");
  const t=calculateTotal(cart);
  summary.innerHTML=`<h2>Order summary</h2><div class="promo-code"><input id="promoCode" placeholder="Promo code"><button id="applyPromo">Apply</button><p id="promoMessage"></p></div><div class="summary-line"><span>Subtotal</span><strong>${money(t.subtotal)}</strong></div><div class="summary-line"><span>Shipping</span><strong>${t.shipping?money(t.shipping):"Free"}</strong></div><div class="summary-line"><span>Discount</span><strong>−${money(t.discount)}</strong></div><div class="summary-total"><span>Total</span><strong>${money(t.total)}</strong></div><a class="btn btn-dark full-btn" href="checkout.html">Checkout <span>→</span></a><a class="continue-link" href="shop.html">← Continue shopping</a>`;
  target.querySelectorAll("[data-minus],[data-plus]").forEach(btn=>btn.onclick=()=>{const [id,size,color]=btn.dataset.minus?.split("|")||btn.dataset.plus.split("|");const c=getCart();const x=c.find(i=>i.id===Number(id)&&i.size===size&&i.color===color);if(x){x.quantity += btn.dataset.plus?1:-1;if(x.quantity<=0)c.splice(c.indexOf(x),1);saveCart(c);updateCartCount();renderCart();}});
  target.querySelectorAll("[data-remove]").forEach(btn=>btn.onclick=()=>{const [id,size,color]=btn.dataset.remove.split("|");removeFromCart(id,size,color);renderCart();});
  document.querySelector("#applyPromo").onclick=()=>{const code=document.querySelector("#promoCode").value.trim().toUpperCase();if(code==="NOVA10"){localStorage.setItem("promoDiscount", "10");document.querySelector("#promoMessage").textContent="10% promo discount applied.";renderCart();}else document.querySelector("#promoMessage").textContent="Try code NOVA10."};
}
document.addEventListener("DOMContentLoaded",renderCart);