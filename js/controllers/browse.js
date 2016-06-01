tansu.controller('browseController', function($scope, $rootScope, $http) {
  $http({
    method: "GET",
    url: "browse.json"
  }).then(function mySucces(res) {
    $scope.news = res.data.result;


  }, function myError(response) {
    // window.location = "#/tansu/";
  });


$scope.rowSpan= function(number) {
  return number > 20 ? 3 : 2;
}

$scope.colSpan = function(number) {
  return number > 100 ? 2 : 1;
}


});
