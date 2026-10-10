document.addEventListener("DOMContentLoaded", () => {
  const list=getWishlist(), found=products.filter(p=>list.includes(p.id));
  document.querySelector("#wishlistPageCount").textContent=`${found.length} saved item${found.length===1?"":"s"}`;
  renderProducts(document.querySelector("#wishlistProducts"),found);
  document.addEventListener("wishlistChanged",()=>{const updated=products.filter(p=>getWishlist().includes(p.id));document.querySelector("#wishlistPageCount").textContent=`${updated.length} saved item${updated.length===1?"":"s"}`;renderProducts(document.querySelector("#wishlistProducts"),updated);});
});