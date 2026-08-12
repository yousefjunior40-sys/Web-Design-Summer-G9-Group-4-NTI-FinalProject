let products = document.querySelectorAll(".product-card");
let categories = document.querySelectorAll(".category-filter");
let ratings = document.querySelectorAll(".rating-filter");
let price = document.querySelector("#priceFilter");

function filterProducts() {

    let selectedCategory = "all";
    let selectedRating = 0;

    // Get selected category
    categories.forEach(function(category) {
        if (category.checked) {
            selectedCategory = category.getAttribute("data-category");
        }
    });

    // Get selected rating
    ratings.forEach(function(rating) {
        if (rating.checked) {
            selectedRating = Number(rating.getAttribute("data-rating"));
        }
    });

    // Filter products
    products.forEach(function(product) {

        let productCategory = product.getAttribute("data-category");
        let productRating = Number(product.getAttribute("data-rating"));
        let productPrice = Number(product.getAttribute("data-price"));

        let categoryMatch =
            selectedCategory === "all" ||
            productCategory === selectedCategory;

        let ratingMatch =
            productRating >= selectedRating;

        let priceMatch =
            productPrice <= Number(price.value);

        if (categoryMatch && ratingMatch && priceMatch) {
            product.parentElement.style.display = "";
        } else {
            product.parentElement.style.display = "none";
        }

    });
}

// Category filter
categories.forEach(function(category) {
    category.addEventListener("change", filterProducts);
});

// Rating filter
ratings.forEach(function(rating) {
    rating.addEventListener("change", filterProducts);
});

// Price filter
price.addEventListener("input", filterProducts);

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


// Cart
let cartCount = 0;

let cartButtons = document.querySelectorAll(".add-to-cart-btn");
let cartCountElement = document.querySelector(".cart-count");

cartButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        cartCount++;
        cartCountElement.textContent = cartCount;
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
let thumbs = document.querySelectorAll(".modal-thumb");
let mainImage = document.querySelector(".modal-main-img");

thumbs.forEach(function(thumb) {
    thumb.addEventListener("click", function() {
        mainImage.src = thumb.src;
    });
});