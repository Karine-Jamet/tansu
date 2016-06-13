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
    
	  $http.get("http://tansuservice.apphb.com/tansuservice.svc/GetMotifs", {
	        "withCredentials": false
	      })
    .then(function(res) {

	$scope.motifs = res.data.GetMotifsResult;


      return res.data.GetMotifsResult;
    });
	
	$scope.newItemAdd= function(){
		console.log($rootScope.photo);
	}
	
	 $http.get("http://tansuservice.apphb.com/tansuservice.svc/GetColors", {
	        "withCredentials": false
	      })
    .then(function(res) {

		$scope.colors = res.data.GetColorsResult;


      return res.data.GetColorsResult;
    });
	
	$http.get("http://tansuservice.apphb.com/tansuservice.svc/GetStyles", {
	        "withCredentials": false
	      })
    .then(function(res) {

		$scope.styles = res.data.GetStylesResult;

      return res.data.GetStylesResult;
    });
	
	
	
});

tansu.directive("ngFileSelect", function(fileReader, $timeout, $rootScope) {
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
				$rootScope.photo = result;
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




 
