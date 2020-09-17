(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);


UserService.$inject = ['$http', 'ApiPath'];
function UserService($http, ApiPath) {
  var service = this;
  service.user = null;

  service.getFavItem = function (favItem) {
    return $http.get(ApiPath + '/menu_items/'+ favItem + '.json').then(function (response) {
      return response.data;
    });
  };

  service.storeUserDetails = function (user) {
    service.user = user;
  };

  service.getUserDetails = function () {
    return service.user;
  };

}



})();
