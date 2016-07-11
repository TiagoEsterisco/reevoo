'use strict';

function CartService($cookies) {
    'ngInject';


    // SHOULD BE CONFIGURABLE FROM AN ADMIN PAGE
    let discountOptions = {
        FR1: {
            amount: 0.5, //50%
            minItems: 2,
            accumulative: true,
            rule: 2
        },
        SR1: {
            amount: 0.1, //10%
            minItems: 3,
            accumulative: false,
            rule: false
        }
    };



    const service = {};
    const defaultCart = {
        items: {},
        totalPrice: false,
    };

    const extendItem = {
        quantity: 0,
        discountApplied: false,
        discount: {}
    };

    var cart = defaultCart;

    // Getter / Setters
    service.getCart = function() {
        return cart;
    };
    service.setCart = (cartData) => {
        cart = cartData;
    };

    // ==========================
    //  Persistent Data Auxiliars
    // ==========================

    service.hasPersistentCart = () => {
        let hasPersistentCart = false;
        if ($cookies.get('cartItems')) {
            hasPersistentCart = true;
        }
        return hasPersistentCart;
    };

    service.getPersistentCart = function() {
        let cartItems = $cookies.get('cartItems');
        if (cartItems) {
            cartItems = JSON.parse(cartItems);
        } else {
            cartItems = defaultCart;
        }

        service.setCart(cartItems);
        return service.getCart();
    };

    service.setPersistentCart = function() {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7); // expire in 7 days
        $cookies.putObject('cartItems', service.getCart(), {
            'expires': expireDate
        });
    };

    // ==========================
    //         Auxiliars
    // ==========================

    // Add new product to cart
    let addItem = (model) => {
        let currentCart = service.getCart();

        if(angular.isDefined(currentCart.items[model.productCode]) === false){
            currentCart.items[model.productCode] = angular.merge(model, extendItem);
        }
        return currentCart;
    };

    // Update item quantity
    let incrementQuantity = (model) => {
        let cart = angular.copy(service.getCart());
        ++ cart.items[model.productCode].quantity;
        return cart.items;
    };

    // Extend cart products with discount rules
    let extendItemWithDiscountRules = (cartItem) => {
        let discountSettings = discountOptions[cartItem.productCode] ? discountOptions[cartItem.productCode] : false;
        // On going discounts
        if (discountSettings.accumulative) {
            if (cartItem.quantity >= discountSettings.minItems && cartItem.quantity % discountSettings.rule === 0) {

                // Have discount
                angular.extend(cartItem.discount, {
                    quantity: cartItem.quantity,
                    totalPrice: cartItem.price * cartItem.quantity * discountSettings.amount
                });
                cartItem.discountApplied = true;
            }
        }
        // single discounts
        if (discountSettings.accumulative === false && cartItem.discountApplied === false) {
            if (cartItem.quantity === discountSettings.minItems) {

                // Have discount
                angular.extend(cartItem.discount, {
                    price: cartItem.price - cartItem.price * discountSettings.amount
                });
                cartItem.discountApplied = true;
            }
        }
        return cartItem;
    };

    // Set cart total price
    let setCartTotalPrice = (cart) => {
        let _tempTotalCartPrice = 0;

        Object.keys(cart).forEach(function(key) {
            let cartItem = cart[key];

            cartItem = extendItemWithDiscountRules(cartItem);

            cartItem.totalPrice = cartItem.price * cartItem.quantity;

            if (cartItem.discount.price) {
                console.log('inside if');
                cartItem.totalPrice = cartItem.discount.price * cartItem.quantity;
            } else if (cartItem.discount.totalPrice && cartItem.discount.quantity) {
                console.log('inside if');
                cartItem.totalPrice = cartItem.price * (cartItem.quantity - cartItem.discount.quantity) + cartItem.discount.totalPrice;
            }

            _tempTotalCartPrice += cartItem.totalPrice;

        });

        return _tempTotalCartPrice;
    };


    service.addItem = (model) => {
        let items = addItem(model);
        items = incrementQuantity(model);
        let totalPrice = setCartTotalPrice(items);

        service.setCart({
            items: items,
            totalPrice: totalPrice
        });
        service.setPersistentCart();
    };

    service.removeItem = (model) => {
        let cart = service.getCart();
        delete cart.items[model.productCode];

        let items = cart.items;
        let totalPrice = setCartTotalPrice(items);

        service.setCart({
            items: items,
            totalPrice: totalPrice
        });
        service.setPersistentCart();
    };

    return service;

}

export default {
    name: 'CartService',
    fn: CartService
};
