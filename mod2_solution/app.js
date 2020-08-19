(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuylist = this;

  tobuylist.items = ShoppingListCheckOffService.getBuyItems();

  tobuylist.removeBuyItem = function (itemIndex) {
    ShoppingListCheckOffService.removeBuyItem(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtlist = this;

  boughtlist.items = ShoppingListCheckOffService.getBoughtItems();

}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var tobuyitems = [{ name: "cookies", quantity: "10"}, { name: "chips", quantity: "7"},
  { name: "rice", quantity: "3"}, { name: "milk", quantity: "5"}, { name: "drinks", quantity: "8"},
  { name: "pepto bismol", quantity: "2"}];
  var boughtitems = [];

  service.removeBuyItem = function (itemIndex) {
    var item = tobuyitems.splice(itemIndex, 1);
    boughtitems.push(item[0]);
  };

  service.getBuyItems = function () {
    return tobuyitems;
  };

  service.getBoughtItems = function () {
    return boughtitems;
  };
}

})();
