document.addEventListener('DOMContentLoaded', () => {

    const modalOverlay = document.getElementById('quickViewModal');
    const closeModalBtn = document.querySelector('.modal-close');
    const productCards = document.querySelectorAll('.product-card');

    const modalTitle = document.getElementById('modalTitle');
    const modalPrice = document.getElementById('modalPrice');
    const modalOldPrice = document.getElementById('modalOldPrice');
    const modalMainImg = document.getElementById('modalMainImg');
    const thumb1 = document.getElementById('thumb1');

    productCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const price = card.getAttribute('data-price');
            const oldPrice = card.getAttribute('data-old-price');
            const imgSrc = card.getAttribute('data-img');

            if (modalTitle) modalTitle.textContent = title;
            if (modalPrice) modalPrice.textContent = price;
            if (modalOldPrice) modalOldPrice.textContent = oldPrice;
            if (modalMainImg) modalMainImg.src = imgSrc;
            if (thumb1) thumb1.src = imgSrc;

            modalOverlay.classList.add('active');
        });
    });

    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    const thumbItems = document.querySelectorAll('.thumb-item');
    thumbItems.forEach(thumb => {
        thumb.addEventListener('click', function() {
            thumbItems.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            const newImgSrc = this.querySelector('img').getAttribute('src');
            if (modalMainImg && newImgSrc) {
                modalMainImg.setAttribute('src', newImgSrc);
            }
        });
    });

    const qtyContainer = document.querySelector('.quantity-control');
    if (qtyContainer) {
        const minusBtn = qtyContainer.querySelectorAll('button')[0];
        const plusBtn = qtyContainer.querySelectorAll('button')[1];
        const qtySpan = qtyContainer.querySelector('span');

        let currentQty = parseInt(qtySpan.textContent) || 1;

        plusBtn.addEventListener('click', () => {
            currentQty++;
            qtySpan.textContent = currentQty;
        });

        minusBtn.addEventListener('click', () => {
            if (currentQty > 1) {
                currentQty--;
                qtySpan.textContent = currentQty;
            }
        });
    }

});