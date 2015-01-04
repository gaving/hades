angular.module('starter', [
  'ionic',
  'leaflet-directive',
  'starter.controllers',
  'starter.services',
  'ngResource',
  'ngCordova'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['$httpProvider', function($httpProvider) {
  //$httpProvider.defaults.headers.common = {
  //'Authorization': 'Bearer c3f84bef4aa2870a5e4aecfb7f265ed25fb63bbf'
  //};
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })
  .state('app.search', {
    url: "/search",
    views: {
      'menuContent': {
        templateUrl: "templates/search.html"
      }
    }
  })
  .state('app.search.property', {
    url: "/property",
    views: {
      'menuContent@app': {
        templateUrl: "templates/search/property/form.html",
        controller: 'SearchPropertyCtrl'
      }
    }
  })
  .state('app.search.property.results', {
    url: "/results",
    views: {
      'menuContent@app': {
        templateUrl: "templates/search/property/results.html",
        controller: 'SearchPropertyResultsCtrl'
      }
    }
  })
  .state('app.search.property.results.property', {
    url: "/:property",
    views: {
      'menuContent@app': {
        templateUrl: "templates/search/property/property.html",
        controller: 'SearchPropertyResultsPropertyCtrl'
      }
    }
  })
  .state('app.help', {
    url: "/help",
    views: {
      'menuContent': {
        templateUrl: "templates/help.html",
        controller: 'HelpCtrl'
      }
    }
  })
  .state('app.recents', {
    url: "/recents",
    views: {
      'menuContent': {
        templateUrl: "templates/recents.html",
        controller: 'RecentsCtrl'
      }
    }
  })

  .state('app.single', {
    url: "/recents/:recentId",
    views: {
      'menuContent': {
        templateUrl: "templates/recent.html",
        controller: 'RecentCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/app/search');
});
