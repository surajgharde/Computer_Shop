
function showForm() {
    document.getElementById("orderForm").style.display = "block";
}

document.getElementById("orderDetails").addEventListener("submit", function(event) {
    event.preventDefault();
    alert("Your order has been placed successfully!");
    document.getElementById("orderForm").style.display = "none"; 
});

let totalPrice = 0;
 
const buttons = document.querySelectorAll('.btn.btn-primary');

buttons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();  
        
        const card = this.closest('.card');
        const productName = card.querySelector('.card-title').innerText;
        const priceText = card.querySelector('.card-text').innerText;
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));  
         
        totalPrice += price;
 
        document.getElementById('total-price').innerText = totalPrice.toFixed(2);

         
        const cartItemsList = document.getElementById('cart-items');
        const cartItem = document.createElement('li');
        cartItem.classList.add('list-group-item');
        cartItem.innerHTML = `
            ${productName} - $${price.toFixed(2)} 
            <button class="btn btn-danger btn-sm float-end remove-item">Remove</button>
        `;
        
 
        cartItemsList.appendChild(cartItem);

         
        const removeButton = cartItem.querySelector('.remove-item');
        removeButton.addEventListener('click', function () {
            cartItem.remove();  
            totalPrice -= price;  
            document.getElementById('total-price').innerText = totalPrice.toFixed(2); // Update total price
        });

      
        document.getElementById('hidden-total-price').value = totalPrice.toFixed(2);
    });
});