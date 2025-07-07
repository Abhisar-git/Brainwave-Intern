const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 2499,
    image: 'https://via.placeholder.com/200?text=Headphones'
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 3499,
    image: 'https://via.placeholder.com/200?text=Smart+Watch'
  },
  {
    id: 3,
    name: 'Bluetooth Speaker',
    price: 1999,
    image: 'https://via.placeholder.com/200?text=Speaker'
  }
];

const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

let cart = [];

function displayProducts() {
  productList.innerHTML = '';
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

window.addToCart = function(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  updateCart();
};

function updateCart() {
  cartItems.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItems.appendChild(li);
    total += item.price;
  });
  cartCount.textContent = cart.length;
  cartTotal.textContent = total.toFixed(2);
}

window.removeFromCart = function(index) {
  cart.splice(index, 1);
  updateCart();
};

checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) return alert('Cart is empty!');
  alert('Checkout successful!');
  cart = [];
  updateCart();
});

displayProducts();
