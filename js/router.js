var tansu = angular.module('tansu', [
	'ngRoute',
	'ngMaterial',
	'ngAnimate'

]);

tansu.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/connexion.html',
        controller: 'connexionController',
		css : "css/connexion.css"
      }).
      when('/tansu/:user', {
        templateUrl: 'partials/tansu.html',
        controller: 'tansuController',
		css : "css/tansu.css"
      }).when('/tansu/browse', {
        templateUrl: 'partials/browse.html',
        controller: 'browseController'
      }).when('/tansu/:user/edit', {
        templateUrl: 'partials/edit.html',
        controller: 'editController',
		css:"css/edit.css"
      }).when('/tansu/:user/edit/newItem', {
        templateUrl: 'partials/addItem.html',
        controller: 'editController',
		css:"css/editAddItem.css"
      }).when('/tansu/:user/edit/newKitsuke', {
        templateUrl: 'partials/addKitsuke.html',
        controller: 'editController',
		css:"css/editAddKitsuke.css"
      }).when('/tansu/:user/edit/rmItem', {
        templateUrl: 'partials/rmItem.html',
        controller: 'editController',
		css:"css/editrmItem.css"
      }).when('/tansu/:user/edit/rmKitsuke', {
        templateUrl: 'partials/rmKitsuke.html',
        controller: 'editController',
		css:"css/editrmKitsuke.css"
      }).when('/tansu/:user/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'profileController'
      }).
      otherwise({
        redirectTo: '/'
      });


  }]);
	tansu.config(function($mdThemingProvider) {
	  $mdThemingProvider.theme('default')
	    .primaryPalette('orange', {
			'default': '900'
		})
	    .accentPalette('deep-purple', {
			'default': '800'
		})
		.warnPalette('pink', {
			'default': '800'
		});
	});


  tansu.controller('navController',function($scope, $rootScope, $http ){
		$scope.connexion = false;
		$rootScope.connexionAll = false;

		$scope.login = function(x,y){
			$scope.connexion = true;
			$rootScope.connexionAll = true;
			$scope.name = x;
			var password = y;

			window.location = "#/tansu/"+x ;
		}

		$rootScope.$watch("connexion");

  });


  tansu.directive('head', ['$rootScope','$compile',
    function($rootScope, $compile){
        return {
            restrict: 'E',
            link: function(scope, elem){
                var html = '<link rel="stylesheet" ng-repeat="(routeCtrl, cssUrl) in routeStyles" ng-href="{{cssUrl}}" />';
                elem.append($compile(html)(scope));
                scope.routeStyles = {};
                $rootScope.$on('$routeChangeStart', function (e, next, current) {
                    if(current && current.$$route && current.$$route.css){
                        if(!angular.isArray(current.$$route.css)){
                            current.$$route.css = [current.$$route.css];
                        }
                        angular.forEach(current.$$route.css, function(sheet){
                            delete scope.routeStyles[sheet];
                        });
                    }
                    if(next && next.$$route && next.$$route.css){
                        if(!angular.isArray(next.$$route.css)){
                            next.$$route.css = [next.$$route.css];
                        }
                        angular.forEach(next.$$route.css, function(sheet){
                            scope.routeStyles[sheet] = sheet;
                        });
                    }
                });
            }
        };
    }
]);


tansu.factory("fileReader", function($q, $log) {
  var onLoad = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.resolve(reader.result);
      });
    };
  };

  var onError = function(reader, deferred, scope) {
    return function() {
      scope.$apply(function() {
        deferred.reject(reader.result);
      });
    };
  };

  var onProgress = function(reader, scope) {
    return function(event) {
      scope.$broadcast("fileProgress", {
        total: event.total,
        loaded: event.loaded
      });
    };
  };

  var getReader = function(deferred, scope) {
    var reader = new FileReader();
    reader.onload = onLoad(reader, deferred, scope);
    reader.onerror = onError(reader, deferred, scope);
    return reader;
  };

  var readAsDataURL = function(file, scope) {
    var deferred = $q.defer();

    var reader = getReader(deferred, scope);
    reader.readAsDataURL(file);

    return deferred.promise;
  };

  return {
    readAsDataUrl: readAsDataURL
  };
});


