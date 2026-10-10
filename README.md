# NOVA — Vanilla JavaScript Fashion Store

A multi-page fashion e-commerce front-end built with only HTML5, CSS3, vanilla JavaScript and LocalStorage.

## Pages
- `index.html` — home
- `shop.html` — all products + filters + sorting
- `category.html?category=jeans` — reusable category page
- `product.html?id=1` — dynamic product details
- `cart.html` — persistent cart
- `checkout.html` — demo checkout
- `wishlist.html` — persistent wishlist
- `search.html?query=shirt` — search

## Data
All product information lives in `js/products.js`. Product cards are rendered dynamically.

## Storage
- `cart`
- `wishlist`
- `promoDiscount`

## Run
Open `index.html` in a browser. For the smoothest local development experience, use VS Code with Live Server.

Product photos are loaded from Unsplash URLs. Font Awesome is loaded from its CDN. No framework is used.
