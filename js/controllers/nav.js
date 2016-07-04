tansu.controller('navController', function($scope, $rootScope, $http, $mdSidenav, $log) {
    $scope.connexion = false;
    $rootScope.connexionAll = false;
    $rootScope.loading = false;

    var token = localStorage.getItem('jwt');
    if (token) {
        $rootScope.loading = true;
        $http.get("http://tansuservice.apphb.com/tansuservice.svc/hello", {
                "withCredentials": false,
                headers: {
                    'JWT': token
                }
            })
            .then(function(res) {
                    $rootScope.loading = false;
                    $scope.connexion = true;
                    $rootScope.connexionAll = true;
                    $rootScope.name = res.data.name;

                    console.log(res.data);


                    return true;
                },
                function(res) {
                  console.log(res);
                      console.log('hello');
                    localStorage.setItem("jwt", "");
                    $rootScope.loading = false;
                    //window.location = "/tansu";
                    return false;
                }

            );


    }


    $scope.toggleRight = buildToggler('right');
    $scope.isOpenRight = function() {
        return $mdSidenav('right').isOpen();
    };

    function debounce(func, wait, context) {
        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }

    function buildDelayedToggler(navID) {
        return debounce(function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }

    function buildToggler(navID) {
        return function() {
            // Component lookup should always be available since we are not using `ng-if`
            $mdSidenav(navID)
                .toggle()
                .then(function() {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }


    /******* login ************/

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
    $scope.logout = function(x) {
        $rootScope.loading = true;
        $http.get('http://tansuservice.apphb.com/tansuservice.svc/Out')
            .then(
                function(response) {
                    $rootScope.loading = false;
                    $scope.connexion = false;
                    $rootScope.connexionAll = false;

                    $scope.fail = false;
                    window.location = "/tansu";
                },
                function(response) {
                    $rootScope.loading = false;
                    window.location = "/tansu";
                }
            );
    }

    $scope.close = function() {
        $mdSidenav('right').close()
            .then(function() {
                $log.debug("close RIGHT is done");
            });
    }

});
