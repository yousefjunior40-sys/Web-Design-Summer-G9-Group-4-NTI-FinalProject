
document.addEventListener('DOMContentLoaded', function () {
    
 
    const navItems = document.querySelectorAll('.nav-list li');
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });


    const backBtn = document.querySelector('.back-link');
    if (backBtn) {
        backBtn.addEventListener('click', function (e) {
            e.preventDefault(); 
            
            alert("you will go back");
        });
    }


    const orderIdElement = document.querySelectorAll('.value-dark')[0]; 
    if (orderIdElement) {
        orderIdElement.style.cursor = 'pointer';
        orderIdElement.title = 'click to copy'; 

        orderIdElement.addEventListener('click', function () {
            navigator.clipboard.writeText(this.innerText).then(() => {
                alert(`ID copied succssesfully`);
            });
        });
    }
});

document.addEventListener('DOMContentLoaded', function () {

    const navItems = document.querySelectorAll('.nav-list li');

    navItems.forEach(item => {
        item.addEventListener('click', function () {
            
            navItems.forEach(nav => {
                nav.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
});