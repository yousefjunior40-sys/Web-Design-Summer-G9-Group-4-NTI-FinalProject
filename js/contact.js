// CONTACT FORM

var form = document.getElementById("contactForm");
if (form) {
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var inputs =
            form.querySelectorAll("input, textarea");
        var empty = false;
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].value.trim() === "") {
                empty = true;
            }
        }
        if (empty) {

            alert("Please fill in all fields.");
        } else {
            alert(
                "Your message has been sent successfully!"
            );
        }
    });
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