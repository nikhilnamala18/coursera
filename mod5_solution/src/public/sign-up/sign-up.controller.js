(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['UserService'];
function SignUpController(UserService) {
  var $ctrl = this;
  $ctrl.found = true;
  $ctrl.submit = function () {
    var promise = UserService.getFavItem($ctrl.user.menu_number);
    promise.then( function (favitem) {
      $ctrl.user.favitem = favitem;
      UserService.storeUserDetails($ctrl.user);
      $ctrl.found = true;
      $ctrl.completed = true;
    })
    .catch( function (error) {
      $ctrl.found = false;
      $ctrl.user.menu_number = "";
    });
  };
}

})();
