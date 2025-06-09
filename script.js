// Select elements
const addToCartButton = document.querySelector('.product button');
const cartCountElement = document.querySelector('.cart-count');
const cartItems = [];

// Function to update cart count
function updateCartCount() {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;
    cartCountElement.style.display = totalItems > 0 ? 'block' : 'none';
}

// Function to add item to cart
function addItemToCart(product) {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({...product, quantity: 1});
    }
    updateCartCount();
}

// Function to remove item from cart
function removeItemFromCart(productId) {
    const itemIndex = cartItems.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cartItems.splice(itemIndex, 1);
    }
    updateCartCount();
}

// Function to update item quantity
function updateItemQuantity(productId, quantity) {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeItemFromCart(productId);
        }
    }
    updateCartCount();
}

// Event listener for add to cart button
addToCartButton.addEventListener('click', () => {
    const product = { id: 1, name: 'Product Title' }; // Example product
    addItemToCart(product);
    alert('Item added to cart!');
});

// Initialize cart count display
updateCartCount();

document.addEventListener('DOMContentLoaded', () => {
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
