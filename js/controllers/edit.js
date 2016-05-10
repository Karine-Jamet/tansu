tansu.controller('editController', function($scope, $rootScope, $http) {




  $scope.isSelectedObi = false;

  $http.get("edit.json")
    .then(function(res) {

      $scope.profile = res.data;
      $scope.nb_kimono = res.data.kimonos.length;
      $scope.nb_obi = res.data.obis.length;
      $scope.nb_kitsuke = res.data.kitsukes.length;
      $scope.kimonos = res.data.kimonos;
			$scope.obis = res.data.obis;

      var lastSelectedKim = -1;
      $scope.isSelectedKimono = function(i) {
        if (lastSelectedKim != -1) {
          $scope.kimonos[lastSelectedKim].class = '';
        }
        lastSelectedKim = i;
        $scope.kimonos[i].class = 'borderSelect';
      };

			var lastSelectedObi = -1;
			$scope.isSelectedObi = function(j) {
				if (lastSelectedObi != -1) {
					$scope.obis[lastSelectedObi].class = '';
				}
				lastSelectedObi = j;
				$scope.obis[j].class = 'borderSelect';
			};

      return res.data;
    });


});
