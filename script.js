class WarungApp {
    constructor() {
        this.selectedItems = [];
        this.phoneNumber = '6281233459494';
        this.init();
    }

    init() {
        this.renderMenuSelection();
        this.setupEventListeners();
    }

    renderMenuSelection() {
        const menuSelection = document.querySelector('.menu-selection');
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            const menuCard = item.cloneNode(true);
            menuCard.classList.remove('selected');
            menuCard.addEventListener('click', () => this.toggleMenuItem(menuCard));
            menuSelection.appendChild(menuCard);
        });
    }

    toggleMenuItem(menuCard) {
        const itemName = menuCard.querySelector('span:first-child').textContent;
        const itemPrice = parseInt(menuCard.getAttribute('data-price'));
        
        menuCard.classList.toggle('selected');
        
        const existingItem = this.selectedItems.find(item => item.name === itemName);
        
        if (existingItem) {
            
            this.selectedItems = this.selectedItems.filter(item => item.name !== itemName);
        } else {
            
            this.selectedItems.push({
                name: itemName,
                price: itemPrice,
                quantity: 1
            });
        }
        
        this.updateOrderSummary();
    }

    updateOrderSummary() {
        const orderItems = document.getElementById('orderItems');
        const totalAmount = document.getElementById('totalAmount');
        
        if (this.selectedItems.length === 0) {
            orderItems.innerHTML = '<p class="empty-message">Belum ada pesanan</p>';
            totalAmount.textContent = '0';
            return;
        }
        
        let total = 0;
        orderItems.innerHTML = '';
        
        this.selectedItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div>
                    <strong>${item.name}</strong>
                    <br>
                    <small>Rp ${item.price.toLocaleString()} × ${item.quantity}</small>
                </div>
                <div class="item-quantity">
                    <button class="quantity-btn minus" data-name="${item.name}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-name="${item.name}">+</button>
                </div>
            `;
            orderItems.appendChild(orderItem);
        });
        
        totalAmount.textContent = total.toLocaleString();
        
        
        this.setupQuantityButtons();
    }

    setupQuantityButtons() {
        document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                this.updateQuantity(itemName, -1);
            });
        });
        
        document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemName = e.target.getAttribute('data-name');
                this.updateQuantity(itemName, 1);
            });
        });
    }

    updateQuantity(itemName, change) {
        const item = this.selectedItems.find(item => item.name === itemName);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.selectedItems = this.selectedItems.filter(i => i.name !== itemName);
                
                const menuCards = document.querySelectorAll('.menu-selection .menu-item');
                menuCards.forEach(card => {
                    if (card.querySelector('span:first-child').textContent === itemName) {
                        card.classList.remove('selected');
                    }
                });
            }
            this.updateOrderSummary();
        }
    }

    setupEventListeners() {
        document.getElementById('whatsappOrder').addEventListener('click', () => {
            this.sendWhatsAppOrder();
        });
    }

    sendWhatsAppOrder() {
        const customerName = document.getElementById('customerName').value.trim();
        const customerAddress = document.getElementById('customerAddress').value.trim();
        
        if (!customerName) {
            alert('Mohon masukkan nama pemesan');
            return;
        }
        
        if (!customerAddress) {
            alert('Mohon masukkan alamat pengiriman');
            return;
        }
        
        if (this.selectedItems.length === 0) {
            alert('Mohon pilih minimal satu menu');
            return;
        }
        
        let message = `saya ingin memesan:\n\n`;
        message += ` *Detail Pemesan:*\n`;
        message += `Nama: ${customerName}\n`;
        message += `Alamat: ${customerAddress}\n\n`;
        message += ` *Pesanan:*\n`;
        
        let total = 0;
        this.selectedItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `• ${item.name} (${item.quantity}x) - Rp ${itemTotal.toLocaleString()}\n`;
        });
        
        message += `\n *Total: Rp ${total.toLocaleString()}*\n\n`;
        message += `Terima kasih!`;
        
        
        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${this.phoneNumber}?text=${encodedMessage}`;
        
        
        window.open(whatsappURL, '_blank');
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new WarungApp();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
