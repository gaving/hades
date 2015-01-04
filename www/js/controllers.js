angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  $scope.loginData = {};

  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SearchPropertyCtrl', function($scope, $state, $stateParams, $window, $location, VehicleService) {
  $scope.doSearch = function() {
    $state.go('app.search.property.results', { make: 'clio' });
  };
})

.controller('SearchPropertyResultsCtrl', function($scope, $stateParams, $window, $location, VehicleService) {
  VehicleService.query().$promise.then(function(data) {
    $scope.properties = data;
  });
})

.controller('SearchPropertyResultsPropertyCtrl', function($scope, $cordovaGeolocation, $stateParams, $window, $location, VehicleService, Camera) {
  //Camera.getPicture().then(function(imageURI) {
  //console.log(imageURI);
  //}, function(err) {
  //console.err(err);
  //});

  $scope.$on("$stateChangeSuccess", function() {
    $scope.map = {
      defaults: {
        tileLayer: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
        maxZoom: 18,
        zoomControlPosition: 'bottomleft'
      },
      center : {},
      markers : {},
      events: {
        map: {
          enable: ['context'],
          logic: 'emit'
        }
      }
    };

    $cordovaGeolocation.getCurrentPosition().then(function (position) {
      console.log($scope.map);
      $scope.map.center.lat  = position.coords.latitude;
      $scope.map.center.lng = position.coords.longitude;
      $scope.map.center.zoom = 15;

      $scope.map.markers.now = {
        lat:position.coords.latitude,
        lng:position.coords.longitude,
        message: "You Are Here",
        focus: true,
        draggable: false
      };

    }, function(err) {
      console.log("Location error!");
      console.log(err);
    });
  });
})

.controller('HelpCtrl', function($scope, $stateParams, $window) {
  $scope.openMain = function() {
    $window.open('//scotland.police.uk');
  };
})
