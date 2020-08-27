(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'items.html',
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'nid',
    bindToController: true
  };

  return ddo;
}

function NarrowItDownDirectiveController () {
  
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nid = this;
  nid.found = [];

  nid.narrowItDown = function () {
    if (nid.searchTerm) {
      nid.found = MenuSearchService.getMatchedMenuItems(nid.searchTerm);
    }
  }

  nid.removeItem = function (itemIndex) {
    nid.found.splice(itemIndex, 1);
  }
}


function MenuSearchService() {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    })
    .then( function (response) {
      var foundItems = response.data;
      for(var i = 0; i < foundItems.length; i++) {
        if(foundItems[i].description.indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItems.splice(i, 1);
          i--;
        }
      }
      return foundItems;
    })
    .catch( function (error) {
      console.log(error);
    })
  };

}

})();
