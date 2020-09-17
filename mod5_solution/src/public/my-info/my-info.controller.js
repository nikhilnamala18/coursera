(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userDetails', 'ApiPath'];
function MyInfoController(userDetails, ApiPath) {
  var $ctrl = this;
  $ctrl.userDetails = userDetails;
  $ctrl.basePath = ApiPath;
}

})();
