

document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Product Image Gallery Swapper ---
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(item => item.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                this.classList.add('active');
                
                // Fade out current main image, swap source, fade in
                mainImage.style.opacity = 0;
                
                const newSrc = this.getAttribute('data-large-img');
                
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = 1;
                }, 150); // half of transition duration
            });
        });
    }

    // --- 2. Quantity Selector Controls ---
    const qtyInput = document.getElementById('productQuantity');
    const btnMinus = document.getElementById('btnQtyMinus');
    const btnPlus = document.getElementById('btnQtyPlus');

    if (qtyInput && btnMinus && btnPlus) {
        // Decrease Quantity
        btnMinus.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value) || 1;
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });

        // Increase Quantity
        btnPlus.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value) || 1;
            qtyInput.value = currentValue + 1;
        });

        // Ensure user can't manually type a value less than 1
        qtyInput.addEventListener('change', function() {
            let currentValue = parseInt(qtyInput.value);
            if (isNaN(currentValue) || currentValue < 1) {
                qtyInput.value = 1;
            }
        });
    }

    // --- 3. Add to Cart Header Updates ---
    const btnAddToCart = document.getElementById('btnAddToCart');
    const cartBadge = document.querySelector('.cart-badge');
    const cartTotalText = document.querySelector('.cart-total');

    // Cabbage product unit price
    const unitPrice = 17.28;

    if (btnAddToCart && cartBadge && cartTotalText) {
        btnAddToCart.addEventListener('click', function() {
            // Get selected quantity
            const selectedQty = parseInt(qtyInput.value) || 1;
            
            // Get current cart status from header
            let currentCartCount = parseInt(cartBadge.textContent) || 0;
            let currentCartTotalStr = cartTotalText.textContent.replace('$', '').trim();
            let currentCartTotal = parseFloat(currentCartTotalStr) || 0;

            // Calculate new values
            const newCartCount = currentCartCount + selectedQty;
            const addedPrice = selectedQty * unitPrice;
            const newCartTotal = currentCartTotal + addedPrice;

            // Update Header Cart elements
            cartBadge.textContent = newCartCount;
            cartTotalText.textContent = '$' + newCartTotal.toFixed(2);

            // Add simple button micro-animation & success state feedback
            const originalHTML = btnAddToCart.innerHTML;
            btnAddToCart.disabled = true;
            btnAddToCart.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added to Cart!';
            btnAddToCart.style.backgroundColor = '#157347'; // darker success green

            setTimeout(() => {
                btnAddToCart.innerHTML = originalHTML;
                btnAddToCart.disabled = false;
                btnAddToCart.style.backgroundColor = ''; // revert to CSS default green
            }, 1500);
        });
    }

    // --- 4. Related Products Add to Cart Simulated Updates ---
    const relatedCartBtns = document.querySelectorAll('.card-cart-btn');
    if (relatedCartBtns.length > 0 && cartBadge && cartTotalText) {
        relatedCartBtns.forEach(button => {
            button.addEventListener('click', function() {
                // Get price from the sibling element inside card
                const card = this.closest('.product-card');
                const priceText = card.querySelector('.card-price-current').textContent;
                const itemPrice = parseFloat(priceText.replace('$', '').trim()) || 0;

                // Current values
                let currentCount = parseInt(cartBadge.textContent) || 0;
                let currentTotal = parseFloat(cartTotalText.textContent.replace('$', '').trim()) || 0;

                // Add 1 item
                cartBadge.textContent = currentCount + 1;
                cartTotalText.textContent = '$' + (currentTotal + itemPrice).toFixed(2);

                // Button micro-interaction feedback
                const icon = this.querySelector('i');
                icon.className = 'fa-solid fa-check';
                this.style.backgroundColor = '#00b207';
                this.style.color = '#ffffff';

                setTimeout(() => {
                    icon.className = 'fa-solid fa-bag-shopping';
                    this.style.backgroundColor = '';
                    this.style.color = '';
                }, 1000);
            });
        });
    }

    // --- 5. Wishlist Buttons Toggle Active State ---
    // Handle main product wishlist button
    const mainWishlistBtn = document.getElementById('mainWishlistBtn');
    if (mainWishlistBtn) {
        mainWishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            
            // Toggle between regular (empty) heart and solid (filled) heart icon
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fa-solid fa-heart'; // Solid heart
            } else {
                icon.className = 'fa-regular fa-heart'; // Regular outline heart
            }
        });
    }

    // Handle related product cards wishlist buttons
    const cardWishlistBtns = document.querySelectorAll('.card-wishlist-btn');
    cardWishlistBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fa-solid fa-heart';
                this.style.color = '#ea4d3d';
                this.style.opacity = '1';
            } else {
                icon.className = 'fa-regular fa-heart';
                this.style.color = '';
                this.style.opacity = '';
            }
        });
    });

    // --- 6. Interactive Information Tabs ---
    const tabItems = document.querySelectorAll('.tab-nav-item');
    const tabPanes = document.querySelectorAll('.tab-content-pane');

    if (tabItems.length > 0 && tabPanes.length > 0) {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                // Get target panel id
                const targetTabId = this.getAttribute('data-tab-target');
                const targetPane = document.getElementById(targetTabId);
                
                if (targetPane) {
                    // Remove active from all tabs
                    tabItems.forEach(item => item.classList.remove('active'));
                    // Add active to clicked tab
                    this.classList.add('active');
                    
                    // Hide all content panes
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    // Show clicked pane
                    targetPane.classList.add('active');
                }
            });
        });
    }
});
