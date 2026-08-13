let products = document.querySelectorAll(".card[data-category]");
let categories = document.querySelectorAll(".my-category-filter");

function filterProducts() {

    let selectedCategory;

    categories.forEach(function(category) {
        if (category.checked) {
            selectedCategory = category.getAttribute("data-category");
        }
    });

    products.forEach(function(product) {

        let productCategory = product.getAttribute("data-category");

        if (productCategory === selectedCategory) {
            product.parentElement.style.display = "";
        } else {
            product.parentElement.style.display = "none";
        }

    });
}

categories.forEach(function(category) {
    category.addEventListener("change", filterProducts);
});

// Cart
let cartCount = 0;

let cartButtons = document.querySelectorAll(".my-cart-btn,.my-add-to-cart-modal");
let cartCountElement = document.querySelector(".cart-count");

cartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        cartCount++;
        cartCountElement.textContent = cartCount;
    });
});
// Favorites
let favoriteCount = 0;

let favoriteButtons = document.querySelectorAll(".favorite-btn");
let wishlistCount = document.querySelector(".wishlist-count");

favoriteButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        favoriteCount++;
        wishlistCount.textContent = favoriteCount;
    });
});

// counter
let quantity = 5;
let quantityNumber = document.querySelector("#quantity");
let plusBtn = document.querySelector("#plusBtn");
let minusBtn = document.querySelector("#minusBtn");

plusBtn.addEventListener("click", function() {
    quantity++;
    quantityNumber.textContent = quantity;
});

minusBtn.addEventListener("click", function() {
    if (quantity > 1) {
        quantity--;
        quantityNumber.textContent = quantity;
    }
});

//swap pics
let thumbs = document.querySelectorAll(".my-modal-thumb");
let mainImage = document.querySelector(".my-modal-main-img");

thumbs.forEach(function(thumb) {
    thumb.addEventListener("click", function() {
        mainImage.src = thumb.src;
    });
});