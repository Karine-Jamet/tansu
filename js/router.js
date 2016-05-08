var tansu = angular.module('tansu', [
	'ngRoute',
	'akoenig.deckgrid',
	'angular-flippy',
	'ui.bootstrap',
	'flow'

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
      }).when('/tansu/:user/profile', {
        templateUrl: 'partials/profile.html',
        controller: 'profileController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
  
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

