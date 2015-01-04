
angular.module('starter.services', []).factory('VehicleService', ['$resource', function($resource) {
  return $resource('https://api.github.com/users/mralexgray/repos', { id:'@id' });
}])

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}]);
