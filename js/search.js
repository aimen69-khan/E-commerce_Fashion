function searchProducts(query){const q=query.trim().toLowerCase();return products.filter(p=>p.name.toLowerCase().includes(q)||p.category.toLowerCase().includes(q)||p.description.toLowerCase().includes(q));}
document.addEventListener("DOMContentLoaded",()=>{
  const form=document.querySelector("#searchForm"), input=document.querySelector("#searchInput"), target=document.querySelector("#searchResults"), count=document.querySelector("#searchCount");
  const run=()=>{const q=input.value.trim();const result=q?searchProducts(q):[];count.textContent=q?`${result.length} result${result.length===1?"":"s"} for “${q}”`:"";renderProducts(target,result);};
  const query=new URLSearchParams(location.search).get("query"); if(query){input.value=query;run();}
  form.addEventListener("submit",e=>{e.preventDefault();const q=input.value.trim();history.replaceState({}, "", `search.html${q?"?query="+encodeURIComponent(q):""}`);run();});
});