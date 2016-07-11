'use strict';

function HomeCtrl(ProductService, CartService, $scope) {
    'ngInject';

    // ViewModel
    const vm = this;

    // defaults
    vm.products = [];

    // Request persistent data
    vm.cart = CartService.getPersistentCart();

    // Request Products
    ProductService.getProduct().then((res) => {
        vm.products = res;
        $scope.$apply();
    });

    // Push items to cart list
    vm.addEvent = (model) => {
        CartService.addItem(model);
        //get updated list
        vm.cart = CartService.getCart();
    };

}

export default {
    name: 'HomeCtrl',
    fn: HomeCtrl
};
