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
      items: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var nid = this;
  nid.found = [];
  nid.notfound = false;
  nid.narrowItDown = function () {
    if(nid.searchTerm) {
      MenuSearchService.getMatchedMenuItems(nid.searchTerm).then( function(foundItem) {
        nid.found = foundItem;
        if(nid.found.length > 0) {
          nid.notfound = false;
        }
        else {
          nid.notfound = true;
        }
      });
    }
    else {
      nid.notfound = true;
      nid.found = [];
    }
  }

  nid.removeItem = function (itemIndex) {
    nid.found.splice(itemIndex, 1);
  }
}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    })
    .then( function (response) {
      var foundItem = [];
      var gotItems = response.data.menu_items;
      for(var i = 0; i < gotItems.length; i++) {
        if(gotItems[i].description.indexOf(searchTerm.toLowerCase()) !== -1) {
          foundItem.push(gotItems[i]);
        }
      }
      return foundItem;
    })
    .catch( function (error) {
      console.log(error);
    })
  };

}

})();
