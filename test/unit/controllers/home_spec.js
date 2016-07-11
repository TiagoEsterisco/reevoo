describe('Unit: HomeCtrl', function() {

    let ctrl;
    let scope;

    beforeEach(function() {

        // instantiate the app module
        angular.mock.module('app');

        angular.mock.inject(($controller, $rootScope) => {
            scope = $rootScope.$new();
            ctrl = $controller('HomeCtrl', {$scope:scope });
        });
    });

    it('should exist', function() {
        expect(ctrl).toBeDefined();
    });

    it('should have products set as default', function() {
        expect(ctrl.products).toBeDefined();
    });

    it('should function to handle adding to cart', function() {
        expect(ctrl.addEvent).toBeDefined();
    });

});
