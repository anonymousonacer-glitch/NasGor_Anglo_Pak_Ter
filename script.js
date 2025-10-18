// Enhanced script with better error handling
console.log("✅ Script.js is loaded!");

let cart = [];
let menuItems = [];

const menuContainer = document.getElementById('menu-container');
const cartItemsElement = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButton = document.getElementById('checkout-btn');
const emptyCartMessage = document.getElementById('empty-cart-message');

// Check if elements exist
console.log("Menu container found:", menuContainer);
console.log("Cart items element found:", cartItemsElement);

// Test if JSON file exists
fetch('menu.json')
    .then(response => {
        console.log("📡 Fetch response status:", response.status);
        console.log("📡 Fetch response ok:", response.ok);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("✅ JSON data loaded successfully:", data);
        if (data.menu && data.menu.length > 0) {
            menuItems = data.menu;
            console.log(`📋 Found ${menuItems.length} menu items`);
            displayMenuItems(menuItems);
        } else {
            throw new Error("Menu data is empty or invalid");
        }
    })
    .catch(error => {
        console.error('❌ Error loading menu:', error);
        // Show error message to user
        menuContainer.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: red;">
                <h3>Error loading menu</h3>
                <p>${error.message}</p>
                <p>Check the browser console for details.</p>
            </div>
        `;
    });

function displayMenuItems(items) {
    console.log("🖼️ Displaying menu items...");
    menuContainer.innerHTML = '';
    
    items.forEach(item => {
        console.log("Creating element for:", item.name);
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" onerror="console.error('Failed to load image: ${item.image}')">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">
                    <span class="price">$${item.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItemElement);
    });

    // Add event listeners
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            console.log("🛒 Adding to cart, item ID:", itemId);
            addToCart(itemId);
        });
    });
    
    console.log("✅ Menu items displayed");
}

function addToCart(itemId) {
    const itemToAdd = menuItems.find(item => item.id === itemId);
    if (itemToAdd) {
        const existingItem = cart.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...itemToAdd, quantity: 1 });
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    cartItemsElement.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        checkoutButton.disabled = true;
    } else {
        emptyCartMessage.style.display = 'none';
        checkoutButton.disabled = false;

        cart.forEach(item => {
            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            `;
            cartItemsElement.appendChild(cartItemElement);
        });
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmountElement.textContent = total.toFixed(2);
}

checkoutButton.addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Thank you for your order! Your total is $${totalAmountElement.textContent}.`);
        cart = [];
        updateCartDisplay();
    }
});

updateCartDisplay();
console.log("🎯 Script initialization complete");
