(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.display = function () {
    if (!$scope.items) {
      $scope.message = "Please enter data first";
      $scope.color = "red";
      $scope.border_color = "red";
    }
    else {
      var item_list = $scope.items.split(',');
      var filterd_list = item_list.filter(function (el) {
        return el.trim() != "";
      });
      if (filterd_list.length == 0) {
        $scope.message = "Please enter data first";
        $scope.color = "red";
        $scope.border_color = "red";
      }
      else if (filterd_list.length <= 3) {
        $scope.message = "Enjoy!";
        $scope.color = "green";
        $scope.border_color = "green";
      }
      else {
        $scope.message = "Too much!";
        $scope.color = "green";
        $scope.border_color = "green";
      }
    }
  }
}

})();
