function CartDirective() {
    'use strict';
    return {
        restrict: 'EA',
        templateUrl: 'directives/cart.html',
        scope: {
            cart: '=',
        },
        controller: function(CartService, $scope) {
            'ngInject';
            const vm = this;

            vm.cart = $scope.cart;

            // Listen for scope changed
            $scope.$watch('cart', () => {
                vm.cart = $scope.cart;
            });

            // Remove item from cart List
            vm.removeFromCart = (model) => {
                CartService.removeItem(model);
                //get updated list
                vm.cart = CartService.getCart();
            };

        },
        controllerAs: 'cartCtrl'
    };
}

export default {
    name: 'cartDirective',
    fn: CartDirective
};
