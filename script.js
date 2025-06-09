document.addEventListener('DOMContentLoaded', () => {
    // Cart state
    let cartItems = [];
    let cartOpen = false;

    // Elements
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartDropdown = document.querySelector('.cart-dropdown');
    const cartCount = document.querySelector('.cart-count');
    const cartContent = document.querySelector('.cart-content');
    const emptyCart = document.querySelector('.empty-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const checkoutBtn = document.querySelector('.checkout-btn');
    const addToCartBtn = document.querySelector('.btn');
    // Removed duplicate declaration since quantityDisplay is declared later in the code

    // Toggle cart dropdown
    cartWrapper.addEventListener('click', () => {
        cartOpen = !cartOpen;
        cartDropdown.classList.toggle('active');
    });

    // Close cart when clicking outside
    document.addEventListener('click', (e) => {
        if (!cartWrapper.contains(e.target) && cartOpen) {
            cartOpen = false;
            cartDropdown.classList.remove('active');
        }
    });

    // Add to cart
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityDisplay.textContent);
        if (quantity > 0) {
            addItemToCart({
                name: 'Fall Limited Edition Sneakers',
                price: 125.00,
                quantity: quantity,
                image: './images/image-product-1-thumbnail.jpg'
            });
            quantityDisplay.textContent = '0';
        }
    });

    function addItemToCart(item) {
        const existingItem = cartItems.find(i => i.name === item.name);

        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            cartItems.push(item);
        }

        updateCartDisplay();
    }

    function updateCartDisplay() {
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

        if (totalItems > 0) {
            cartCount.style.display = 'block';
            cartCount.textContent = totalItems;
            emptyCart.style.display = 'none';
            checkoutBtn.classList.add('active');

            cartItemsContainer.innerHTML = cartItems.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="item-details">
                        <p>${item.name}</p>
                        <p>$${item.price.toFixed(2)} x ${item.quantity}
                           <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
                    </div>
                    <img src="./images/icon-delete.svg" class="delete-item"
                         alt="delete" data-name="${item.name}">
                </div>
            `).join('');

            // Add delete functionality
            document.querySelectorAll('.delete-item').forEach(deleteBtn => {
                deleteBtn.addEventListener('click', (e) => {
                    const itemName = e.target.dataset.name;
                    cartItems = cartItems.filter(item => item.name !== itemName);
                    updateCartDisplay();
                });
            });
        } else {
            cartCount.style.display = 'none';
            emptyCart.style.display = 'block';
            checkoutBtn.classList.remove('active');
            cartItemsContainer.innerHTML = '';
        }
    }

    // Product quantity counter
    const minusBtn = document.querySelector('.icon img[alt="minus"]');
    const plusBtn = document.querySelector('.icon img[alt="plus"]');
    const quantityDisplay = document.querySelector('.icon p');
    let quantity = 0;

    minusBtn.addEventListener('click', () => {
        if (quantity > 0) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    plusBtn.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    // Product gallery
    const mainImage = document.querySelector('.container1 img');
    const thumbnails = document.querySelectorAll('.thumbnail-container img');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Get the main image source from the thumbnail
            const newMainSrc = thumbnail.src.replace('-thumbnail', '');
            mainImage.src = newMainSrc;

            // Update active thumbnail
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            thumbnail.classList.add('active');
        });
    });
});

// Mobile Menu
const menuBtn = document.querySelector('.menu-btn');
const closeMenu = document.querySelector('.close-menu');
const mobileMenu = document.querySelector('.nav-link');
const overlay = document.querySelector('.mobile-menu-overlay');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    overlay.style.display = 'block';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.style.display = 'none';
});

overlay.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    overlay.style.display = 'none';
});

// Mobile Product Navigation
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const productImages = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];
let currentImageIndex = 0;

prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    document.querySelector('.container1 img').src = productImages[currentImageIndex];
});

nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % productImages.length;
    document.querySelector('.container1 img').src = productImages[currentImageIndex];
});
