  // Cart Functionality
  let cart = [];
  const cartCount = document.getElementById('cart-count');
  const cartItems = document.getElementById('cart-items');
  const cartTotal = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  
  // Add to Cart Buttons
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
          const name = this.dataset.name;
          const price = parseFloat(this.dataset.price);
          
          // Check if item already exists in cart
          const existingItem = cart.find(item => item.name === name);
          
          if (existingItem) {
              existingItem.quantity += 1;
          } else {
              cart.push({
                  name: name,
                  price: price,
                  quantity: 1
              });
          }
          
          updateCart();
          showToast(`${name} added to cart!`);
      });
  });
  
  // Update Cart Function
  function updateCart() {
      // Update cart count
      let totalItems = 0;
      cart.forEach(item => {
          totalItems += item.quantity;
      });
      cartCount.textContent = totalItems;
      
      // Update cart dropdown items
      if (cart.length === 0) {
          cartItems.innerHTML = `
              <div class="text-center py-4 text-muted">
                  <i class="fas fa-shopping-cart fa-2x mb-3"></i>
                  <p>Your cart is empty</p>
              </div>
          `;
          checkoutBtn.disabled = true;
      } else {
          let cartHTML = '';
          let total = 0;
          
          cart.forEach(item => {
              const itemTotal = item.price * item.quantity;
              total += itemTotal;
              
              cartHTML += `
                  <div class="cart-item py-2">
                      <div class="d-flex justify-content-between">
                          <h6 class="mb-0">${item.name}</h6>
                          <div class="d-flex align-items-center">
                              <div class="input-group input-group-sm quantity-selector me-2">
                                  <button class="btn btn-outline-secondary decrease-qty" data-name="${item.name}">-</button>
                                  <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                                  <button class="btn btn-outline-secondary increase-qty" data-name="${item.name}">+</button>
                              </div>
                              <button class="btn btn-sm btn-outline-danger remove-item" data-name="${item.name}">
                                  <i class="fas fa-trash"></i>
                              </button>
                          </div>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-1">
                          <small class="text-muted">$${item.price.toFixed(2)} × ${item.quantity}</small>
                          <span>$${itemTotal.toFixed(2)}</span>
                      </div>
                  </div>
              `;
          });
          
          cartItems.innerHTML = cartHTML;
          cartTotal.textContent = `$${total.toFixed(2)}`;
          checkoutBtn.disabled = false;
          
          // Event listeners for cart item buttons
          document.querySelectorAll('.increase-qty').forEach(button => {
              button.addEventListener('click', function() {
                  const name = this.dataset.name;
                  const item = cart.find(item => item.name === name);
                  if (item) {
                      item.quantity += 1;
                      updateCart();
                  }
              });
          });
          
          document.querySelectorAll('.decrease-qty').forEach(button => {
              button.addEventListener('click', function() {
                  const name = this.dataset.name;
                  const item = cart.find(item => item.name === name);
                  if (item) {
                      item.quantity -= 1;
                      if (item.quantity <= 0) {
                          cart = cart.filter(cartItem => cartItem.name !== name);
                      }
                      updateCart();
                  }
              });
          });
          
          document.querySelectorAll('.remove-item').forEach(button => {
              button.addEventListener('click', function() {
                  const name = this.dataset.name;
                  cart = cart.filter(item => item.name !== name);
                  updateCart();
                  showToast(`${name} removed from cart!`);
              });
          });
      }
  }
  
  // Toast Notification
  function showToast(message) {
      const toastMessage = document.getElementById('toast-message');
      const toast = new bootstrap.Toast(document.getElementById('toastSuccess'));
      
      toastMessage.textContent = message;
      toast.show();
  }
  
  // Form submissions
  document.getElementById('contact-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Your message has been sent! We will get back to you soon.');
      this.reset();
  });
  
  document.getElementById('newsletter-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for subscribing to our newsletter!');
      this.reset();
  });
  
  document.getElementById('order-form').addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Your order has been placed successfully! You will receive a confirmation email shortly.');
      this.reset();
      const modal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
      modal.hide();
  });
  
  // Back to Top button
  const backToTopButton = document.getElementById('backToTop');
  
  window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
          backToTopButton.style.display = 'block';
      } else {
          backToTopButton.style.display = 'none';
      }
  });
  
  backToTopButton.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });
  
  // Initialize popovers and tooltips
  document.addEventListener('DOMContentLoaded', function() {
      var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.map(function(popoverTriggerEl) {
          return new bootstrap.Popover(popoverTriggerEl);
      });
      
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
      tooltipTriggerList.map(function(tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
      });
  });