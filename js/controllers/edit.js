tansu.controller('editController',function($scope, $rootScope, $http){

var lastSelectedKim = -1;
$scope.isSelectedKimono = function(i){
	if(lastSelectedKim != -1) {
                $scope.kimonos[lastSelectedKim].class = '';
            }
        lastSelectedKim = i;
       $scope.kimonos[i].class = 'classA';
};


$scope.isSelectedObi = false;

$http.get("edit.json")
.then(function(res){
	
	$scope.profile = res.data;
	$scope.nb_kimono = res.data.kimonos.length;
	$scope.nb_obi = res.data.obis.length;
	$scope.nb_kitsuke = res.data.kitsukes.length;
	
	return res.data;
});


});
