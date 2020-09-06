(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  // Premade list page
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menuapp/templates/categories-view.template.html',
    controller: 'CategoriesController as menuCategories',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function (categories) {
            return categories;
          });
      }]
    }
  })

  .state('items', {
    url: '/items/{shortName}',
    templateUrl: 'src/menuapp/templates/items-view.template.html',
    controller: 'ItemsController as itemDetail',
    resolve: {
      items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName)
                .then(function (items) {
                  return items;
                });
            }]
    }
  });
}

})();
