// Initialize an empty shopping cart
let cart = [];

// Select cart-related DOM elements
const cartItems = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const checkoutButton = document.getElementById('checkout');

// Add event listeners to all 'Add to Cart' buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));

    // Add the product to the cart
    addToCart(name, price);
  });
});

// Function to add product to the cart
function addToCart(name, price) {
  const product = { name, price };
  cart.push(product);

  // Update cart display and total
  updateCart();
}

// Function to update the cart UI
function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });

  totalElement.textContent = total.toFixed(2);
}

// Handle checkout process
checkoutButton.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    alert(`Thank you for your purchase! Total amount: $${totalElement.textContent}`);
    cart = [];
    updateCart();
  }
});
