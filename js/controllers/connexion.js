tansu.controller('connexionController',function($scope, $rootScope, $http){
	
			$scope.register = function(x,y){
				$rootScope.connexion = {"stat" : true, "user" : x};
				
				window.location = "#/tansu/"+x ;
			}
	
	
});