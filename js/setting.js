document.addEventListener('DOMContentLoaded', function () {

    
    const navItems = document.querySelectorAll('.nav-list li');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            const text = this.innerText.trim();
            
            if (text.includes('order')) {
                window.location.href = 'order.html'; 
            } 

            else if (text.includes('setting')) {
                window.location.href = 'setting.html';
            } 
            
            else {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    
    const eyeIcons = document.querySelectorAll('.eye-icon');
    eyeIcons.forEach(icon => {
        icon.addEventListener('click', function () {
        
            const input = this.previousElementSibling; 
            
            if (input.type === 'password') {
                input.type = 'text'; 
                this.classList.add('slashed'); 
            } else {
                input.type = 'password'; 
                this.classList.remove('slashed'); 
            }
        });
    });

    
    const chooseImgBtn = document.querySelector('.btn-img');
    const avatarImg = document.querySelector('.avatar-img');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    chooseImgBtn.addEventListener('click', function () {
        fileInput.click(); 
    });

    fileInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                avatarImg.src = e.target.result; 
            }
            reader.readAsDataURL(file);
        }
    });


    const saveBtns = document.querySelectorAll('.btn-primary');
    saveBtns.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            const card = this.closest('.card');
            const inputs = card.querySelectorAll('input');
            var isValid = true;

            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.style.borderColor = '#fa090e';
                    isValid = false;
                }
            });

            if (isValid) {
                alert('Saved Succssesfully.');
            } else {
                alert('Please complete all the required fields.');
            }
        });
    });

    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
    
            if(!this.classList.contains('active-input')){
                this.style.borderColor = '#e2e8f0';
            }
        });
    });

});