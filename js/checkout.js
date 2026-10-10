function renderCheckoutSummary(){
  const cart=getCart(), summary=document.querySelector("#checkoutSummary"), t=calculateTotal(cart);
  if(!cart.length){summary.innerHTML=`<h2>No items</h2><p>Your cart is empty.</p><a class="btn btn-dark full-btn" href="shop.html">Shop now</a>`;document.querySelector("#checkoutForm").style.display="none";return;}
  summary.innerHTML=`<h2>Order summary</h2><div class="checkout-items">${cart.map(i=>{const p=products.find(x=>x.id===i.id);return `<div><img src="${p.image}" alt="${p.name}"><span>${p.name} × ${i.quantity}</span><strong>${money(p.price*i.quantity)}</strong></div>`}).join("")}</div><div class="summary-line"><span>Subtotal</span><strong>${money(t.subtotal)}</strong></div><div class="summary-line"><span>Shipping</span><strong>${t.shipping?money(t.shipping):"Free"}</strong></div><div class="summary-total"><span>Total</span><strong>${money(t.total)}</strong></div>`;
}
document.addEventListener("DOMContentLoaded",()=>{
  renderCheckoutSummary();
  document.querySelector("#checkoutForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    const form=e.currentTarget;
    const order=`NOVA-${Math.floor(100000+Math.random()*900000)}`;
    localStorage.removeItem("cart");localStorage.removeItem("promoDiscount");updateCartCount();
    document.querySelector("#checkoutMessage").innerHTML=`<span class="success-box"><strong>Order placed successfully!</strong><br>Your demo order <b>${order}</b> has been received. No real payment was processed.</span>`;
    form.reset();form.querySelector(".checkout-submit").disabled=true;
  });
});