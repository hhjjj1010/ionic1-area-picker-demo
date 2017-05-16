angular.module('starter.controllers', [])

  .controller('HomeCtrl', function ($scope, SelectAreaModalService) {

    $scope.selectedArea = undefined;

    $scope.selectAreaButtonClicked = function () {
      SelectAreaModalService.openImcSelectAreaModal($scope, $scope.selectedArea, function (area) {
        $scope.selectedArea = area;
      });
    };

  })


  .controller('AccountCtrl', function ($scope) {


  })

