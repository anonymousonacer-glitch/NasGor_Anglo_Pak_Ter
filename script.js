// All-in-one food ordering script with embedded menu data
console.log("✅ Food ordering script loaded!");

// State
let cart = [];

// Menu data embedded directly in JavaScript (no JSON file needed)
const menuItems = [
    {
        "id": 1,
        "name": "Nasi Goreng Spesial",
        "description": "Nasi goreng dengan ayam, udang, telur, dan sayuran segar.",
        "price": 25000,
        "image": "https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": 2,
        "name": "Mie Ayam Bakso",
        "description": "Mie ayam dengan bakso sapi, pangsit, dan sayuran.",
        "price": 20000,
        "image": "https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": 3,
        "name": "Sate Ayam",
        "description": "Sate ayam dengan bumbu kacang dan lontong.",
        "price": 30000,
        "image": "https://images.unsplash.com/photo-1555939614-58c7a2c60bb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": 4,
        "name": "Gado-gado",
        "description": "Salad sayuran dengan bumbu kacang dan kerupuk.",
        "price": 18000,
        "image": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": 5,
        "name": "Es Teh Manis",
        "description": "Es teh segar dengan gula Jawa.",
        "price": 8000,
        "image": "https://images.unsplash.com/photo-1567940982782-2d6c38ebf1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
        "id": 6,
        "name": "Es Jeruk",
        "description": "Jeruk segar dengan es dan sedikit mint.",
        "price": 12000,
        "image": "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
];

// DOM Elements
const menuContainer = document.getElementById('menu-container');
const cartItemsElement = document.getElementById('cart-items');
const totalAmountElement = document.getElementById('total-amount');
const checkoutButton = document.getElementById('checkout-btn');
const emptyCartMessage = document.getElementById('empty-cart-message');

// Initialize the page
function initializePage() {
    console.log("🔄 Initializing page...");
    console.log("📋 Menu items available:", menuItems.length);
    console.log("🎯 Menu container found:", menuContainer);
    
    if (menuContainer) {
        displayMenuItems(menuItems);
        updateCartDisplay();
        console.log("✅ Page initialization complete");
    } else {
        console.error("❌ Menu container not found!");
    }
}

// Function to display menu items
function displayMenuItems(items) {
    console.log("🖼️ Displaying menu items...");
    
    if (!menuContainer) {
        console.error("❌ Menu container is null!");
        return;
    }
    
    menuContainer.innerHTML = '';
    
    items.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.classList.add('menu-item');
        menuItemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="item-price">
                    <span class="price">Rp ${item.price.toLocaleString('id-ID')}</span>
                    <button class="add-to-cart" data-id="${item.id}">Tambah ke Keranjang</button>
                </div>
            </div>
        `;
        menuContainer.appendChild(menuItemElement);
    });

    // Add event listeners to buttons
    addCartEventListeners();
    console.log(`✅ Displayed ${items.length} menu items`);
}

// Add event listeners to Add to Cart buttons
function addCartEventListeners() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    console.log(`🎯 Found ${addToCartButtons.length} Add to Cart buttons`);
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = parseInt(event.target.getAttribute('data-id'));
            console.log("🛒 Adding item to cart, ID:", itemId);
            addToCart(itemId);
        });
    });
}

// Add item to cart
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
        
        // Show success feedback
        showCartFeedback(`Added ${itemToAdd.name} to cart!`);
    }
}

// Show feedback when adding to cart
function showCartFeedback(message) {
    // Create or update feedback element
    let feedback = document.getElementById('cart-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'cart-feedback';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 1000;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(feedback);
    }
    
    feedback.textContent = message;
    feedback.style.opacity = '1';
    
    // Hide after 2 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
    }, 2000);
}

// Update cart display
function updateCartDisplay() {
    if (!cartItemsElement || !totalAmountElement || !emptyCartMessage) {
        console.error("❌ Cart elements not found!");
        return;
    }
    
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
                <span>Rp ${(item.price * item.quantity).toLocaleString('id-ID')}</span>
            `;
            cartItemsElement.appendChild(cartItemElement);
        });
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmountElement.textContent = total.toLocaleString('id-ID');
}

// Checkout function
function setupCheckout() {
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            if (cart.length > 0) {
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                alert(`Terima kasih pesanannya! Total: Rp ${total.toLocaleString('id-ID')}\n\n(Pesanan demo saja)`);
                cart = [];
                updateCartDisplay();
            }
        });
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log("📄 DOM fully loaded");
    initializePage();
    setupCheckout();
});

// Fallback in case DOMContentLoaded already fired
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePage);
} else {
    initializePage();
}
