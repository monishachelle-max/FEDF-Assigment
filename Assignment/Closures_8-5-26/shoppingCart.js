function shoppingCart() {

    let itemCount = 0; // private variable (closure)

    return {
        addItem: function() {
            itemCount++;
            console.log("Item added");
        },

        removeItem: function() {
            if (itemCount > 0) {
                itemCount--;
                console.log("Item removed");
            } else {
                console.log("Cart is empty");
            }
        },

        displayCount: function() {
            console.log("Total items in cart: " + itemCount);
        }
    };
}

// Create cart object
const cart = shoppingCart();

// Test operations
cart.addItem();
cart.addItem();
cart.addItem();

cart.removeItem();

cart.displayCount();