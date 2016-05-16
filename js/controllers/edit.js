tansu.controller('editController', function($scope, $rootScope, $http, fileReader) {


  $http.get("edit.json")
    .then(function(res) {

	$scope.profile = res.data;
	 $scope.nb_kimono = res.data.kimonos.length;
	 $scope.nb_obi = res.data.obis.length;
		 $scope.nb_kitsuke = res.data.kitsukes.length;
		 $scope.kimonos = res.data.kimonos;
		$scope.obis = res.data.obis;


      return res.data;
    });

	 $scope.imageSrc = "";
    
	
	
});

tansu.directive("ngFileSelect", function(fileReader, $timeout) {
    return {

      scope: {
        myVar: '='
      },
      link: function($scope, el) {
        function getFile(file) {
          fileReader.readAsDataUrl(file, $scope)
            .then(function(result) {
              $timeout(function() {
                $scope.myVar = result;
              });
            });
        }

        el.bind("change", function(e) {
          var file = (e.srcElement || e.target).files[0];
          getFile(file);
        });
      }
    };
 });




 
