angular.module('starter.services', [])

  .service('SelectAreaModalService', function ($ionicModal, $http, $timeout, $ionicSlideBoxDelegate) {

    "use strict";

    /**
     * @param selectedAreaObj
     * selectedAreaObj['provinceId'], selectedAreaObj['provinceName']
     * selectedAreaObj['cityId'], selectedAreaObj['cityName']
     * selectedAreaObj['areaId'], selectedAreaObj['areaName']
     *
     * */
    this.openImcSelectAreaModal = function ($scope, selectedAreaObj, callback) {
      $ionicModal.fromTemplateUrl('templates/modal-view/select-area-modal.html', {
        scope: $scope,
        animation: 'slide-in-up',
      }).then(function (modal) {
        $scope.imcSelectAreaModal = modal;
      });


      $scope.imcSelectedAreaItemIndex = 0;
      $scope.imcAreaTabItems = [];

      var selectedArea = angular.copy(selectedAreaObj);

      if (!selectedArea || !selectedArea.hasOwnProperty('provinceId') || !selectedArea.provinceId) {
        $scope.imcAreaTabItems = [{value: undefined, text: '请选择'}];

      } else if (selectedArea.hasOwnProperty('provinceId') && selectedArea.provinceId) {
        var province = {value: selectedArea.provinceId, text: selectedArea.provinceName};
        $scope.imcAreaTabItems.push(province);

        if (selectedArea.hasOwnProperty('cityId') && selectedArea.cityId) {
          var city = {value: selectedArea.cityId, text: selectedArea.cityName};
          $scope.imcAreaTabItems.push(city);

          if (selectedArea.hasOwnProperty('areaId') && selectedArea.areaId) {
            var area = {value: selectedArea.areaId, text: selectedArea.areaName};
            $scope.imcAreaTabItems.push(area);
          }
        }
      }

      $http.get('js/area.json').success(function (res) {
        $scope.imcAreaData = res;
        $scope.imcSelectAreaModal.show();
        $ionicSlideBoxDelegate.update();
      });


      $scope.icmAreaSlideHeight = function () {
        return {
          'height': window.screen.height + 'px'
        };
      };

      $scope.imcAreaSlideChanged = function (index) {
        $scope.imcSelectedAreaItemIndex = index;
      };

      $scope.imcAreaTabSelected = function (index) {
        $ionicSlideBoxDelegate.slide(index);
      };

      $scope.imcProvinceItemSelected = function (province) {
        if ($scope.imcAreaTabItems.length === 1) {
          $scope.imcAreaTabItems.push({value: undefined, text: '请选择'});
        }
        else if (province.value !== $scope.imcAreaTabItems[0].value) {
          $scope.imcAreaTabItems[1] = {value: undefined, text: '请选择'};
          if ($scope.imcAreaTabItems.length > 2) {
            $scope.imcAreaTabItems.pop();
          }
        }

        $scope.imcAreaTabItems[0] = province;

        $ionicSlideBoxDelegate.update();
        $timeout(function () {
          $ionicSlideBoxDelegate.slide(1);
        });

      };

      $scope.imcCityItemSelected = function (city) {
        if ($scope.imcAreaTabItems.length === 2) {
          $scope.imcAreaTabItems.push({value: undefined, text: '请选择'});

        } else if ($scope.imcAreaTabItems[1].value !== city.value) {
          $scope.imcAreaTabItems[2] = {value: undefined, text: '请选择'};
        }

        $scope.imcAreaTabItems[1] = city;

        $ionicSlideBoxDelegate.update();
        $timeout(function () {
          $ionicSlideBoxDelegate.slide(2);
        });
      };

      $scope.imcAreaItemSelected = function (area) {

        $scope.imcAreaTabItems[2] = area;
        $ionicSlideBoxDelegate.update();

        if (!selectedArea || $scope.imcAreaTabItems[2].value != selectedArea.areaId) {
          selectedArea = {
            provinceId: $scope.imcAreaTabItems[0].value,
            provinceName: $scope.imcAreaTabItems[0].text,
            cityId: $scope.imcAreaTabItems[1].value,
            cityName: $scope.imcAreaTabItems[1].text,
            areaId: $scope.imcAreaTabItems[2].value,
            areaName: $scope.imcAreaTabItems[2].text
          };

          callback && callback(selectedArea);
        }

        $scope.imcSelectAreaModal.remove();

      };

      $scope.closeImcSelectAreaModal = function () {
        $scope.imcSelectAreaModal.remove();
      };

      $scope.$on('$destroy', function () {
        $scope.imcSelectAreaModal.remove();
      });

    };
  })

