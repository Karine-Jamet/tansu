	tansu.controller('loginController', function($scope, $rootScope, $http) {

		$scope.login = function(x, y) {
				$rootScope.loading = true;
				$http.post('http://tansuservice.apphb.com/tansuservice.svc/Login', {
						"userName": x,
						"passWord": y
				}, {
						"withCredentials": false
				}).then(
						function(response) {
								$rootScope.loading = false;
								$scope.connexion = true;
								$rootScope.connexionAll = true;
								$scope.name = x;
								$rootScope.name = x;
								$scope.fail = false;
								var token = response.headers('jwt');
								localStorage.setItem("jwt", token);

								// handleRequest(response);
								window.location = "#/profile/" + x;

						},
						function(response) {
								$rootScope.loading = false;
								$scope.message = "Fail to login, try again"
								$scope.fail = true;
								$scope.pseudo = "";
								$scope.password = "";
								// handleRequest(response);
								window.location = "/tansu";
						}
				);

		}


	});
