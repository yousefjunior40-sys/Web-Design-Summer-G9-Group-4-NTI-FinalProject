document.addEventListener('DOMContentLoaded', function () {

  /* ==========================================
     1. Blog Grid Page (Filter & Count)
     ========================================== */
  const tags = document.querySelectorAll('.tag-container span.badge');
  const cards = document.querySelectorAll('.blog-card-item');
  const resultsCount = document.getElementById('resultsCount');

  function updateCount() {
    if (!cards.length) return;
    let visibleCount = 0;
    cards.forEach(card => {
      if (card.style.display !== 'none') {
        visibleCount++;
      }
    });
    if (resultsCount) {
      resultsCount.textContent = visibleCount;
    }
  }

  if (tags.length > 0) {
    tags.forEach(tag => {
      tag.style.cursor = 'pointer';

      tag.addEventListener('click', function () {
        tags.forEach(t => {
          t.classList.remove('bg-success', 'text-white');
          t.classList.add('bg-light', 'text-dark', 'border');
        });
        this.classList.remove('bg-light', 'text-dark', 'border');
        this.classList.add('bg-success', 'text-white');

        const selectedTag = this.getAttribute('data-tag').toLowerCase();

        cards.forEach(card => {
          const cardTags = card.getAttribute('data-tags') ? card.getAttribute('data-tags').toLowerCase() : '';

          if (selectedTag === 'all' || cardTags.includes(selectedTag)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });

        updateCount();
      });
    });
  }


  /* ==========================================
     2. Single Blog Details Page (Comments & Load More)
     ========================================== */
  const commentForm = document.querySelector('form');
  const commentsContainer = document.querySelector('.d-flex.flex-column.gap-4');

  if (commentForm && commentsContainer) {
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.querySelector('input[placeholder*="Zakir"]') || document.querySelector('input[type="text"]');
      const messageInput = document.querySelector('textarea');

      const nameValue = nameInput ? nameInput.value.trim() : '';
      const messageValue = messageInput ? messageInput.value.trim() : '';

      if (nameValue === '' || messageValue === '') {
        alert('Please fill in both your name and comment message.');
        return;
      }

      const newComment = document.createElement('div');
      newComment.className = 'd-flex gap-3 border-bottom pb-3';

      newComment.innerHTML = `
        <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" class="rounded-circle" width="45" height="45" alt="User">
        <div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <h6 class="fw-bold mb-0 small">${nameValue}</h6>
            <span class="text-muted extra-small">• Just now</span>
          </div>
          <p class="text-secondary small mb-0">${messageValue}</p>
        </div>
      `;

      commentsContainer.prepend(newComment);
      if (messageInput) messageInput.value = '';
    });
  }

  const loadMoreBtn = document.querySelector('.btn-outline-success');
  if (loadMoreBtn && commentsContainer) {
    loadMoreBtn.addEventListener('click', function () {
      const extraComment = document.createElement('div');
      extraComment.className = 'd-flex gap-3 border-bottom pb-3';

      extraComment.innerHTML = `
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" class="rounded-circle" width="45" height="45" alt="User">
        <div>
          <div class="d-flex align-items-center gap-2 mb-1">
            <h6 class="fw-bold mb-0 small">Kristin Watson</h6>
            <span class="text-muted extra-small">• 20 Apr, 2021</span>
          </div>
          <p class="text-secondary small mb-0">Vivamus Proin Aliquam Volutpat Quam. Integer Purus Lacus, Imperdiet Id Facilisis Nec.</p>
        </div>
      `;

      commentsContainer.appendChild(extraComment);
    });
  }


  /* ==========================================
     3. Shopping Cart Page (Quantity & Totals)
     ========================================== */
  function updateCartTotal() {
    let grandTotal = 0;
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const subtotalElem = row.querySelector('.item-subtotal');
      if (subtotalElem) {
        const subtotalValue = parseFloat(subtotalElem.textContent.replace('$', '')) || 0;
        grandTotal += subtotalValue;
      }
    });

    const cartSubtotalElem = document.querySelector('.cart-subtotal');
    const cartFinalTotalElem = document.querySelector('.cart-final-total');
    const headerTotalElem = document.querySelector('.cart-header-total');

    const formattedTotal = `$${grandTotal.toFixed(2)}`;

    if (cartSubtotalElem) cartSubtotalElem.textContent = formattedTotal;
    if (cartFinalTotalElem) cartFinalTotalElem.textContent = formattedTotal;
    if (headerTotalElem) headerTotalElem.textContent = formattedTotal;
  }

  function attachRowEvents() {
    const rows = document.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const btnPlus = row.querySelector('.btn-plus');
      const btnMinus = row.querySelector('.btn-minus');
      const qtyElem = row.querySelector('.item-qty');
      const priceElem = row.querySelector('.unit-price');
      const subtotalElem = row.querySelector('.item-subtotal');
      const btnRemove = row.querySelector('.btn-remove');

      function calculateRowSubtotal() {
        const price = parseFloat(priceElem.textContent.replace('$', '')) || 0;
        const currentQty = parseInt(qtyElem.textContent) || 1;
        const total = price * currentQty;
        subtotalElem.textContent = `$${total.toFixed(2)}`;
        updateCartTotal();
      }

      if (btnPlus) {
        btnPlus.onclick = function () {
          let currentQty = parseInt(qtyElem.textContent) || 1;
          currentQty++;
          qtyElem.textContent = currentQty;
          calculateRowSubtotal();
        };
      }

      if (btnMinus) {
        btnMinus.onclick = function () {
          let currentQty = parseInt(qtyElem.textContent) || 1;
          if (currentQty > 1) {
            currentQty--;
            qtyElem.textContent = currentQty;
            calculateRowSubtotal();
          }
        };
      }

      if (btnRemove) {
        btnRemove.onclick = function () {
          row.remove();
          updateCartTotal();
        };
      }
    });
  }

  attachRowEvents();
  updateCartTotal();

});
