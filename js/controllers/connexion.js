	tansu.controller('connexionController', function($scope, $rootScope, $http) {

	  $scope.register = function() {
	    $rootScope.loading = true;
	    if ($scope.ps === $scope.ps2 && $scope.ps) {
	      $http.put('http://tansuservice.apphb.com/tansuservice.svc/SignUp', {
	        "userName": $scope.pseudo,
	        "passWord": $scope.ps,
	        "email": $scope.mail
	      }, {
	        "withCredentials": false
	      }).then(
	        function(response) {
	          $rootScope.loading = false;
	          $scope.connexion = true;
	          $rootScope.connexionAll = true;
	          $scope.name = $scope.pseudo;
	          $scope.fail = false;
	          $rootScope.connexionAll = true;
	          window.location = "#/profile/" + $scope.name;
	        },
	        function(response) {
	          $rootScope.loading = false;
	          $scope.message = "Fail to regitser, try again"
	          $scope.fail = true;
	          $scope.pseudo = "";
	          $scope.password = "";
	          window.location = "#/tansu/";
	        }
	      );
	    } else {
	      $scope.message = "Fail to regitser, try again"
	      $scope.fail = true;
	      $scope.pseudo = "";
	      $scope.password = "";
	      window.location = "#/tansu/";
	    }


	  }


	});
