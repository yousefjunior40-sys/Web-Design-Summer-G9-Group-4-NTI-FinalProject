
document.addEventListener('DOMContentLoaded', function () {
    
    const placeOrderBtn = document.querySelector('.place-order-btn');
    const emailInput = document.querySelector('input[type="email"]');
    const phoneInput = document.querySelectorAll('.grid-2-cols input')[1];
    const firstNameInput = document.querySelectorAll('.grid-3-cols input')[0];
    const lastNameInput = document.querySelectorAll('.grid-3-cols input')[1];
    const addressInput = document.querySelector('.grid-1-col input');

    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('input', function () {
            this.style.borderColor = '#e2e8f0';
        });
    });

    // CLICK PLACE ORDER //
    placeOrderBtn.addEventListener('click', function (e) {
        e.preventDefault(); 

        let isValid = true;

        // CHECK YOUR FIRST NAME //
        if (firstNameInput.value.trim() === '') {
            firstNameInput.style.borderColor = '#fa090e';
            isValid = false;
        }

        // CHECK YOUR LAST NAME //
        if (lastNameInput.value.trim() === '') {
            lastNameInput.style.borderColor = '#fa090e';
            isValid = false;
        }

        // CHECK YOUR ADDRESS //
        if (addressInput.value.trim() === '') {
            addressInput.style.borderColor = '#fa090e';
            isValid = false;
        }

        // CHECK YOUR EMAIL //
        if (!isValidEmail(emailInput.value.trim())) {
            emailInput.style.borderColor = '#fa090e';
            isValid = false;
        }

        // CHECK YOUR PHONE NUMBER //
        if (phoneInput.value.trim() === '') {
            phoneInput.style.borderColor = '#fa090e';
            isValid = false;
        }

        // CHECK PAYMENT METHOD //
        const selectedPaymentInput = document.querySelector('input[name="payment_method"]:checked');
        if (!selectedPaymentInput) {
        isValid = false;
        }

        if (!isValid) {
            alert('Please complete all the required fields.');
            return;
        }

        // HOW TO PAY //
        const selectedPayment = document.querySelector('input[name="payment_method"]:checked').parentNode.textContent.trim();

        // SUCCSSESFUL PAYMENT //
        alert(`${selectedPayment}\: $84.00  TOTAL PAYMENT`);
        window.location.href = 'order.html';
    });
});