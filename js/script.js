// MESSAGE

function showMessage(message) {
    var messageBox = document.createElement("div");
    messageBox.className = "js-message";
    messageBox.innerText = message;
    document.body.appendChild(messageBox);
    setTimeout(function () {
        messageBox.classList.add("show");
    }, 10);
    setTimeout(function () {
        messageBox.classList.remove("show");
        setTimeout(function () {
            messageBox.remove();
        }, 300);
    }, 2000);
}

// SEARCH

var searchInput = document.getElementById("searchInput");
var searchButton = document.getElementById("searchButton");
if (searchButton) {
    searchButton.addEventListener("click", function () {
        var searchValue = searchInput.value.trim();
        if (searchValue != "") {
            window.location.href =
                "../pages/shop.html?search=" + searchValue;
        }
    });
}


// COUNTERS

var cartCount = 0;
var wishlistCount = 0;
var cartTotal = 0;


// ADD TO CART

var cartButtons = document.getElementsByClassName("cart-btn");
var addCartButtons = document.getElementsByClassName("add-cart");


// CART BUTTONS

for (var i = 0; i < cartButtons.length; i++) {
    cartButtons[i].addEventListener("click", function () {
        addProductToCart(this);
    });
}


// ADD CART BUTTONS

for (var i = 0; i < addCartButtons.length; i++) {
    addCartButtons[i].addEventListener("click", function () {
        addProductToCart(this);
    });
}


// ADD PRODUCT TO CART

function addProductToCart(button) {
    var productCard = button.closest(".product-card");
    if (productCard) {
        var productName =
            productCard.querySelector("h6");
        var priceElement =
            productCard.querySelector("b");
        var price =
            parseFloat(
                priceElement.innerText.replace("$", "")
            );
        cartCount++;
        cartTotal += price;
        updateCounters();
        showMessage(
            productName.innerText +
            " added to cart 🛒"
        );
    }
}


// UPDATE COUNTERS

function updateCounters() {
    var cartCounter =
        document.querySelector(".cart-count");
    var wishlistCounter =
        document.querySelector(".wishlist-count");
    var cartText =
        document.querySelector(".cart-text strong");
    if (cartCounter) {
        cartCounter.innerText = cartCount;
    }
    if (wishlistCounter) {
        wishlistCounter.innerText = wishlistCount;
    }
    if (cartText) {
        cartText.innerText =
            "$" + cartTotal.toFixed(2);
    }
}

// WISHLIST

var hearts =
    document.getElementsByClassName("heart");
for (var i = 0; i < hearts.length; i++) {
    hearts[i].addEventListener("click", function () {
        var icon = this.querySelector("i");
        var productCard =
            this.closest(".product-card");
        if (productCard) {
            var productName =
                productCard.querySelector("h6");
            icon.classList.toggle("fa-regular");
            icon.classList.toggle("fa-solid");
            if (icon.classList.contains("fa-solid")) {
                wishlistCount++;
                this.style.color = "#00B207";
                showMessage(
                    productName.innerText +
                    " added to wishlist ❤️"
                );
            }
            else {
                wishlistCount--;
                this.style.color = "";
                showMessage(
                    productName.innerText +
                    " removed from wishlist"
                );
            }
            updateCounters();
        }
    });
}

// QUICK VIEW - EYE

var eyes =
    document.getElementsByClassName("eye");
for (var i = 0; i < eyes.length; i++) {
    eyes[i].addEventListener("click", function () {
        var productCard =
            this.closest(".product-card");
        if (productCard) {
            var productName =
                productCard.querySelector("h6");
            if (productName) {
                showMessage(
                    "Quick View: " +
                    productName.innerText
                );
            }
        }
    });
}


// PROMO BANNER

var endDate =
    new Date("August 20, 2026 23:59:59").getTime();
var countdown =
    setInterval(function () {
        var now =
            new Date().getTime();
        var distance =
            endDate - now;
        var days =
            Math.floor(
                distance /
                (1000 * 60 * 60 * 24)
            );
        var hours =
            Math.floor(
                (distance %
                    (1000 * 60 * 60 * 24)) /
                (1000 * 60 * 60)
            );
        var minutes =
            Math.floor(
                (distance %
                    (1000 * 60 * 60)) /
                (1000 * 60)
            );
        var seconds =
            Math.floor(
                (distance %
                    (1000 * 60)) /
                1000
            );
        var daysElement =
            document.getElementById("days");
        var hoursElement =
            document.getElementById("hours");
        var minutesElement =
            document.getElementById("minutes");
        var secondsElement =
            document.getElementById("seconds");
        if (daysElement) {
            daysElement.innerText = days;
        }
        if (hoursElement) {
            hoursElement.innerText = hours;
        }
        if (minutesElement) {
            minutesElement.innerText = minutes;
        }
        if (secondsElement) {
            secondsElement.innerText = seconds;
        }
        if (distance < 0) {
            clearInterval(countdown);
            if (daysElement) {
                daysElement.innerText = "00";
            }
            if (hoursElement) {
                hoursElement.innerText = "00";
            }
            if (minutesElement) {
                minutesElement.innerText = "00";
            }
            if (secondsElement) {
                secondsElement.innerText = "00";
            }
        }
    }, 1000);


// TESTIMONIALS

var track =
    document.getElementById("testimonialsTrack");
var prevBtn =
    document.getElementById("prevBtn");
var nextBtn =
    document.getElementById("nextBtn");
var cards =
    document.getElementsByClassName("slider-card");
var currentIndex = 0;


// UPDATE TESTIMONIAL SLIDER

function updateSlider() {
    if (cards.length > 0 && track) {
        var cardWidth =
            cards[0].offsetWidth;
        track.style.transform =
            "translateX(-" +
            (currentIndex * cardWidth) +
            "px)";
    }
}


// NEXT BUTTON

if (nextBtn) {
    nextBtn.addEventListener("click", function () {
        if (currentIndex < cards.length - 3) {
            currentIndex++;
            updateSlider();
        }
    });
}


// PREVIOUS BUTTON

if (prevBtn) {
    prevBtn.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
}


// RESPONSIVE TESTIMONIALS

window.addEventListener("resize", function () {
    currentIndex = 0;
    if (track) {
        track.style.transform =
            "translateX(0)";
    }
});


// INSTAGRAM SLIDER

var instagramTrack =
    document.getElementById("instagramTrack");
var instagramPrev =
    document.getElementById("instagramPrev");
var instagramNext =
    document.getElementById("instagramNext");
var instagramDots =
    document.getElementById("instagramDots");
var instagramSlides =
    document.getElementsByClassName("instagram-slide");
var instagramIndex = 0;
var totalInstagramSlides =
    instagramSlides.length;


// GET SLIDES TO SHOW

function getInstagramSlidesToShow() {
    if (window.innerWidth <= 575) {
        return 1;
    }
    if (window.innerWidth <= 991) {
        return 2;
    }
    return 3;
}


// GET MAX INDEX

function getInstagramMaxIndex() {
    return (
        totalInstagramSlides -
        getInstagramSlidesToShow()
    );
}


// CREATE DOTS

function createInstagramDots() {
    if (!instagramDots) {
        return;
    }
    instagramDots.innerHTML = "";
    var numberOfDots =
        getInstagramMaxIndex() + 1;
    for (
        var i = 0;
        i < numberOfDots;
        i++
    ) {
        var dot =
            document.createElement("button");
        dot.classList.add("instagram-dot");
        if (i === instagramIndex) {
            dot.classList.add("active");
        }
        dot.addEventListener(
            "click",
            function () {
                instagramIndex =
                    parseInt(this.getAttribute("data-index"));
                updateInstagramSlider();
            }
        );
        dot.setAttribute(
            "data-index",
            i
        );
        instagramDots.appendChild(dot);
    }
}


// UPDATE INSTAGRAM SLIDER

function updateInstagramSlider() {
    if (!instagramTrack) {
        return;
    }
    var slidesToShow =
        getInstagramSlidesToShow();
    var movePercentage =
        100 / slidesToShow;
    instagramTrack.style.transform =
        "translateX(-" +
        (instagramIndex * movePercentage) +
        "%)";
    var dots =
        document.getElementsByClassName(
            "instagram-dot"
        );
    for (
        var i = 0;
        i < dots.length;
        i++
    ) {
        dots[i].classList.remove("active");
        if (i === instagramIndex) {
            dots[i].classList.add("active");
        }
    }
}


// NEXT INSTAGRAM BUTTON

if (instagramNext) {
    instagramNext.addEventListener(
        "click",
        function () {
            var maxIndex =
                getInstagramMaxIndex();
            if (instagramIndex < maxIndex) {
                instagramIndex++;
            }
            else {
                instagramIndex = 0;
            }
            updateInstagramSlider();
        }
    );
}


// PREVIOUS INSTAGRAM BUTTON

if (instagramPrev) {
    instagramPrev.addEventListener(
        "click",
        function () {
            var maxIndex =
                getInstagramMaxIndex();
            if (instagramIndex > 0) {
                instagramIndex--;
            }
            else {
                instagramIndex = maxIndex;
            }
            updateInstagramSlider();
        }
    );
}


// RESPONSIVE INSTAGRAM

window.addEventListener(
    "resize",
    function () {
        var maxIndex =
            getInstagramMaxIndex();
        if (instagramIndex > maxIndex) {
            instagramIndex = maxIndex;
        }
        createInstagramDots();
        updateInstagramSlider();
    }
);


// START INSTAGRAM SLIDER

if (instagramDots) {
    createInstagramDots();
    updateInstagramSlider();
}


// NEWSLETTER

var newsletterButton =
    document.querySelector(
        ".newsletter-form button"
    );
var newsletterInput =
    document.querySelector(
        ".newsletter-form input"
    );
if (newsletterButton) {
    newsletterButton.addEventListener(
        "click",
        function () {
            var email =
                newsletterInput.value.trim();
            if (email === "") {
                showMessage(
                    "Please enter your email"
                );
            }
            else if (!email.includes("@")) {
                showMessage(
                    "Please enter a valid email"
                );
            }
            else {
                showMessage(
                    "Thank you for subscribing!"
                );
                newsletterInput.value = "";
            }
        }
    );
}


// VIEW ALL

var viewAllLinks =
    document.querySelectorAll(
        ".section-title a"
    );
for (
    var i = 0;
    i < viewAllLinks.length;
    i++
) {
    viewAllLinks[i].addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            var section =
                this.closest(".section");
            if (section) {
                var products =
                    section.querySelectorAll(
                        ".product-card"
                    );
                for (
                    var j = 0;
                    j < products.length;
                    j++
                ) {
                    products[j].parentElement.style.display =
                        "";
                }
                showMessage(
                    "All products are displayed"
                );
            }
        }
    );
}


// SHOP NOW

var shopButtons =
    document.querySelectorAll(
        ".hero-content a, " +
        ".side-banner a, " +
        ".promo a, " +
        ".wide-banner a"
    );

for (
    var i = 0;
    i < shopButtons.length;
    i++
) {
    shopButtons[i].addEventListener(
        "click",
        function (event) {
            event.preventDefault();
            showMessage(
                "Shop Now clicked"
            );
        }
    );

}