// Put this at the top of script.js instead of the fetch call
const menuItems = [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "description": "Classic pizza with tomato sauce, fresh mozzarella, and basil.",
      "price": 12.99,
      "image": "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    // ... rest of your menu items
];

// Then call this instead of the fetch
displayMenuItems(menuItems);* Basic Reset */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #f8f8f8;
    color: #333;
    line-height: 1.6;
}

header {
    background: linear-gradient(to right, #ff7e5f, #feb47b);
    color: white;
    text-align: center;
    padding: 2rem 0;
    margin-bottom: 2rem;
}

header h1 {
    font-size: 2.5rem;
}

/* Menu Grid Layout */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 0 2rem;
    margin-bottom: 3rem;
}

.menu-item {
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.menu-item:hover {
    transform: translateY(-5px);
}

.menu-item img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.item-details {
    padding: 1.5rem;
}

.item-details h3 {
    margin-bottom: 0.5rem;
    color: #555;
}

.item-details p {
    margin-bottom: 1rem;
    color: #777;
    font-size: 0.9rem;
}

.item-price {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-weight: bold;
    color: #ff7e5f;
    font-size: 1.2rem;
}

.add-to-cart {
    background-color: #ff7e5f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.add-to-cart:hover {
    background-color: #e06a50;
}

/* Order Cart */
#order-cart {
    background: white;
    margin: 0 2rem;
    padding: 1.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: sticky;
    bottom: 2rem;
}

#cart-items {
    margin-bottom: 1rem;
    min-height: 50px;
}

.cart-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
}

#empty-cart-message {
    color: #999;
    font-style: italic;
}

#cart-total {
    text-align: right;
    font-size: 1.2rem;
    margin-bottom: 1rem;
}

#checkout-btn {
    width: 100%;
    padding: 1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#checkout-btn:hover {
    background-color: #218838;
}

#checkout-btn:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
}
