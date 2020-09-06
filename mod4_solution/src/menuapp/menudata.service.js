(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$html']
function MenuDataService($html) {
  var service = this;

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    })
    .then( function (response) {
      return response.data;
    })
    .catch( function (error) {
      console.log(error);
    })
  };

  service.getItemsForCategory = function (categoryShortName) {
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category=" + categoryShortName)
    })
    .then( function (response) {
      return response.data.menu_items;
    })
    .catch( function (error) {
      console.log(error);
    })
  };
}

})();
