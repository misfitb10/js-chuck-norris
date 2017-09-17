(function() {
    "use strict";

    var apiURL = "https://api.chucknorris.io/jokes/random";

    var getSiblings = function(elem) {
        var siblings = [];
        var sibling = elem.parentNode.firstChild;
        for ( ; sibling; sibling = sibling.nextSibling )
            if ( sibling.nodeType == 1 && sibling != elem )
                siblings.push( sibling );
        return siblings;
    };

    function loadChuckAPI(apiURL) {
        var httpRequest = new XMLHttpRequest();
        var contentContainer = document.querySelector(".fact");

        httpRequest.onreadystatechange = function() {
            if (httpRequest.readyState == XMLHttpRequest.DONE) {
                if (httpRequest.status == 200) {
                    var parsedJSON = JSON.parse(httpRequest.responseText);
                    contentContainer.innerHTML = parsedJSON.value;
                }
            }
        };

        httpRequest.open("GET", apiURL, true);
        httpRequest.send();
    }

    var categories = document.querySelectorAll("[data-category]");
    var btnCategoryItem = document.querySelector(".categoryItem");

    for (var i=0; i<categories.length; i++) {
        categories[i].addEventListener("click", function (e) {
            e.preventDefault();

            // Active state of categories
            if ( !this.parentNode.classList.contains("is__active") ) {
                this.parentNode.classList.add("is__active");

                var listItemSiblings = getSiblings(this.parentNode), i;
                for (i=0; i<listItemSiblings.length; i++) {
                    listItemSiblings[i].classList.remove("is__active");
                }
            }

            // Fetch the data attribute which contains the category name
            var category = this.dataset.category;

            // Use the aforementioned category name in the api URL variable
            var apiURL = "https://api.chucknorris.io/jokes/random?category=" + category;

            // If the category is "random", change the apiURL
            if (category === "random") {
                apiURL = "https://api.chucknorris.io/jokes/random";
            }

            // Makes the button more clear: Next 'category name' fact pls
            btnCategoryItem.innerHTML = category;

            // Make the AJAX call with the generated api URL (based on category)
            loadChuckAPI(apiURL);

            // Place the generated api URL in the current API url container
            document.querySelector(".currentAPIurl").innerHTML = apiURL;
        });
    }

    // Load a new Chuck Norris fact after clicking on the new fact button
    var btnNextFact = document.querySelector(".btn--next-fact");
    btnNextFact.addEventListener("click", function(e) {
        e.preventDefault();
        apiURL = document.querySelector(".currentAPIurl").innerHTML;
        loadChuckAPI(apiURL);
    });

    window.onload = function() {
        loadChuckAPI(apiURL);

        var soundPunch = document.getElementById("punch"),
            soundPunch2 = document.getElementById("punch2");

        // Play punch sound while hovering over the new fact button
        btnNextFact.addEventListener("mouseenter", function() {
            soundPunch.play();
        });

        // Play blob sound while hovering over the menu items
        var categoryMenuItem = document.querySelectorAll(".categoryLink"), i;
        for (i=0; i<categoryMenuItem.length; i++) {
            categoryMenuItem[i].addEventListener("mouseenter", function() {
                soundPunch2.play();
            })
        }

    }
})();