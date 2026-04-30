# Minimal Shop

A clean, modern e-commerce demo built using only HTML, CSS, and JavaScript.

## Overview

This project fetches products from the DummyJSON API and displays them in a polished, responsive shopping experience.

Key features:
- Home page with a product grid
- Product detail page with full product information
- Cart page with localStorage persistence
- Quantity controls, item removal, and total price calculation
- Smooth hover effects, fade-in animations, and responsive layout
- Built with CSS Grid/Flexbox and modern UI styling

## Live Preview
- Local preview: `http://localhost:8000`
- Deployed site: https://ashwinidm12.github.io/htmlcssjsproject/

## Project Structure

```
/                     # Root folder
  index.html          # Home page
  product.html        # Product detail page
  cart.html           # Shopping cart page
  css/
    style.css         # Shared styling and animations
  js/
    api.js            # API fetch helper functions
    main.js           # Home page logic
    product.js        # Product page logic
    cart.js           # Cart page logic
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ashwinidm12/htmlcssjsproject.git
   cd htmlcssjsproject
   ```

2. Start a local web server:
   ```bash
   python3 -m http.server 8000
   ```

3. Open the site in your browser:
   ```
   http://localhost:8000
   ```

## Notes

- The product data is loaded from `https://dummyjson.com/products`
- Cart items are saved in `localStorage` so they persist across refreshes
- The demo does not include a real checkout flow

## Author

Ashwini D M
