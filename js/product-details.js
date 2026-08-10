

document.addEventListener('DOMContentLoaded', function() {
    
    const mainImage = document.getElementById('mainProductImage');
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', function() {
                thumbnails.forEach(item => item.classList.remove('active'));
                this.classList.add('active');
                mainImage.style.opacity = 0;
                
                const newSrc = this.getAttribute('data-large-img');
                
                setTimeout(() => {
                    mainImage.src = newSrc;
                    mainImage.style.opacity = 1;
                }, 150); 
            });
        });
    }
    const qtyInput = document.getElementById('productQuantity');
    const btnMinus = document.getElementById('btnQtyMinus');
    const btnPlus = document.getElementById('btnQtyPlus');

    if (qtyInput && btnMinus && btnPlus) {
        btnMinus.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value) || 1;
            if (currentValue > 1) {
                qtyInput.value = currentValue - 1;
            }
        });
        btnPlus.addEventListener('click', function() {
            let currentValue = parseInt(qtyInput.value) || 1;
            qtyInput.value = currentValue + 1;
        });
        qtyInput.addEventListener('change', function() {
            let currentValue = parseInt(qtyInput.value);
            if (isNaN(currentValue) || currentValue < 1) {
                qtyInput.value = 1;
            }
        });
    }
    const btnAddToCart = document.getElementById('btnAddToCart');
    const cartBadge = document.querySelector('.cart-badge');
    const cartTotalText = document.querySelector('.cart-total');
    const unitPrice = 17.28;

    if (btnAddToCart && cartBadge && cartTotalText) {
        btnAddToCart.addEventListener('click', function() {
            const selectedQty = parseInt(qtyInput.value) || 1;
            let currentCartCount = parseInt(cartBadge.textContent) || 0;
            let currentCartTotalStr = cartTotalText.textContent.replace('$', '').trim();
            let currentCartTotal = parseFloat(currentCartTotalStr) || 0;
            const newCartCount = currentCartCount + selectedQty;
            const addedPrice = selectedQty * unitPrice;
            const newCartTotal = currentCartTotal + addedPrice;
            cartBadge.textContent = newCartCount;
            cartTotalText.textContent = '$' + newCartTotal.toFixed(2);
            const originalHTML = btnAddToCart.innerHTML;
            btnAddToCart.disabled = true;
            btnAddToCart.innerHTML = '<i class="fa-solid fa-circle-check"></i> Added to Cart!';
            btnAddToCart.style.backgroundColor = '#157347'; 

            setTimeout(() => {
                btnAddToCart.innerHTML = originalHTML;
                btnAddToCart.disabled = false;
                btnAddToCart.style.backgroundColor = ''; 
            }, 1500);
        });
    }
    const relatedCartBtns = document.querySelectorAll('.card-cart-btn');
    if (relatedCartBtns.length > 0 && cartBadge && cartTotalText) {
        relatedCartBtns.forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.product-card');
                const priceText = card.querySelector('.card-price-current').textContent;
                const itemPrice = parseFloat(priceText.replace('$', '').trim()) || 0;
                let currentCount = parseInt(cartBadge.textContent) || 0;
                let currentTotal = parseFloat(cartTotalText.textContent.replace('$', '').trim()) || 0;
                cartBadge.textContent = currentCount + 1;
                cartTotalText.textContent = '$' + (currentTotal + itemPrice).toFixed(2);
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
    const mainWishlistBtn = document.getElementById('mainWishlistBtn');
    if (mainWishlistBtn) {
        mainWishlistBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.className = 'fa-solid fa-heart'; 
            } else {
                icon.className = 'fa-regular fa-heart'; 
            }
        });
    }
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
    const tabItems = document.querySelectorAll('.tab-nav-item');
    const tabPanes = document.querySelectorAll('.tab-content-pane');

    if (tabItems.length > 0 && tabPanes.length > 0) {
        tabItems.forEach(tab => {
            tab.addEventListener('click', function() {
                const targetTabId = this.getAttribute('data-tab-target');
                const targetPane = document.getElementById(targetTabId);
                
                if (targetPane) {
                    tabItems.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    targetPane.classList.add('active');
                }
            });
        });
    }
});
