document.addEventListener("DOMContentLoaded", function () {
    let cart = [];

    // Load cart from local storage if it exists
    if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
        updateCart();
    }

    // Add to cart functionality
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let itemName = this.previousElementSibling.textContent.split(" ₹")[0];
            let itemPrice = parseInt(this.previousElementSibling.textContent.split(" ₹")[1]);

            let item = cart.find(i => i.name === itemName);
            if (item) {
                item.quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart)); // Save to local storage
            updateCart();
        });
    });

    // Function to update cart UI
    function updateCart() {
        let cartItemsContainer = document.getElementById("cart-items");
        cartItemsContainer.innerHTML = ""; // Clear previous items

        let cartCount = 0;

        cart.forEach((item, index) => {
            let cartItem = document.createElement("li");
            cartItem.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity} 
                <button class="remove-item" data-index="${index}">Remove</button>`;

            cartItemsContainer.appendChild(cartItem);
            cartCount += item.quantity;
        });

        document.querySelector(".cart-count").textContent = cartCount;

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                let index = this.getAttribute("data-index");
                cart.splice(index, 1); // Remove item from cart
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCart();
            });
        });
    }

    // Clear cart functionality
    document.getElementById("clear-cart").addEventListener("click", function () {
        cart = [];
        localStorage.removeItem("cart");
        updateCart();
    });
});

document.getElementById("order-now").addEventListener("click", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Your cart is empty! Add some items before ordering.");
        return;
    }

    // Simulating order processing (In real scenario, send data to a backend)
    alert("Thank you for your order! 🎉 Your food will be prepared soon. ");

    // Clear the cart after ordering
    localStorage.removeItem("cart");
    updateCartUI();
});
