describe('Unit: ProductService', function() {

    let http, service;
    let data = [{
        'productCode': 'FR1',
        'name': 'Fruit Tea',
        'price': 3.11,
        'image': 'http://static.webshopapp.com/shops/005147/files/028776455/300x300x2/lipton-forest-fruit-tea.jpg',
        'description': 'Tea is an aromatic beverage commonly prepared by pouring hot or boiling water over cured leaves of the Camellia sinensis, an evergreen shrub native to Asia.[4] After water, it is the most widely consumed drink in the world.'
    }, {
        'productCode': 'SR1',
        'name': 'Strawberries',
        'price': 5.00,
        'image': 'http://uwgv.ca/hakunamatta/wp-content/uploads/2015/07/Strawberries-300x300.jpg',
        'description': 'The garden strawberry (or simply strawberry; Fragaria × ananassa)[1] is a widely grown hybrid species of the genus Fragaria (collectively known as the strawberries). It is cultivated worldwide for its fruit.'
    }, {
        'productCode': 'CF1',
        'name': 'Coffee',
        'price': 11.23,
        'image': 'http://www.menshealth.com/sites/menshealth.com/files/wp_import/coffeecup-e1354301843181-300x300.jpg',
        'description': 'Coffee is a brewed drink prepared from roasted coffee beans, which are the seeds of berries from the Coffea plant. The genus Coffea is native to tropical Africa, Madagascar, and the Comoros, Mauritius and Réunion in the Indian Ocean'
    }];

    beforeEach(function() {
        // instantiate the app module
        angular.mock.module('app');

        // mock the service
        angular.mock.inject(($httpBackend, ProductService) => {
            http = $httpBackend;
            service = ProductService;
        });
    });

    it('should exist', function() {
        expect(service).toBeDefined();
    });

    it('should retrieve data', function(done) {
        service.getProduct().then((result) => {
            console.log(result);
            expect(result).toEqual(data);
        }).then(done);
    });
});
