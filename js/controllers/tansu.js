tansu.controller('tansuController',function($scope, $rootScope, $http, $timeout, $mdDialog, $mdMedia){
	
/* 	if($rootScope.connexionAll){
	
	 */
	$scope.showVal = false;
	
	 $http({
        method : "GET",
        url : "collection.json"
    }).then(function mySucces(res) {
		$scope.name = res.data.name;
        $scope.collection = res.data.tansu;
		

    }, function myError(response) {
       
    });
	
	$scope.rowSpan = function(number) {
		return number > 10 ? 3 : 2 ;
	}
	
	$scope.colSpan = function(number) {
		return number > 15 ? 2 : 1 ;
	}
	
	$scope.showKitsuke = function(item){
		item.showVal = !item.showVal;
	}
	
	$scope.modalKitsukeOpen = function(ev) {
		
		var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
		$mdDialog.show({
		  controller: DialogController,
		  templateUrl: 'partials/modal.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose:true,
		  fullscreen: useFullScreen,
		  locals : {
                    photoClicked : ev.toElement.currentSrc
                }
		})
		.then(function(answer) {
		  $scope.status = 'You said the information was "' + answer + '".';
		}, function() {
		  $scope.status = 'You cancelled the dialog.';
    });
	}
	
	function DialogController($scope, $mdDialog, photoClicked) {
		console.log(photoClicked);
			$http({
					method : "GET",
					data : "photo="+photoClicked,
					url : "comment.json"
				}).then(function mySucces(res) {
					$scope.modal = res.data;
					$scope.photoClicked = photoClicked;
				
				}, function myError(response) {
				   
				});
		
		
		  $scope.hide = function() {
			$mdDialog.hide();
		  };
		  $scope.cancel = function() {
			$mdDialog.cancel();
		  };
		  $scope.answer = function(answer) {
			$mdDialog.hide(answer);
		  };
	}
	
	
/* 	}else {
		window.location = "#/" ;
	}
	
 */
	
});



/* 

 tansu.directive('noScopeRepeat', function($compile) {
        return function(scope, elem, attrs) {
			
			
            scope.$watch(attrs.items, function(items) {
                if (!items) return;
				
				var open = function(){
					console.log("hello");
				}
				
				
                var template = '<img modalopen src="{{#OBJ#}}">';

                items.forEach(function(val, key) {
                    var newElement = angular.element(
                        template.replace(/#OBJ#/g, attrs.items + '[' + key + ']')
                    );
                    $compile(newElement)(scope);
                    elem.append(newElement);
					
                });
            });
        };
  })

	
tansu.directive("modalopen", function($http, $uibModal){
	return function(scope, element, attrs){
		element.bind("click", function(e){
			
		  var modalInstance = $uibModal.open({
		  templateUrl: 'partials/modal.html',
		  controller: 'ModalInstanceCtrl',
		  resolve: {
			photo: function () {
			  return  e.toElement.src;
			},
			photoStat:function(){
				return  $http({
					method : "GET",
					data : "photo="+e.toElement,
					url : "comment.json"
				}).then(function mySucces(res) {
					console.log(res.data.description);
					return res.data;
				
				}, function myError(response) {
				   
				});
				
			}
		  }
		});
			
		});
	};
});







	
tansu.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, photo, photoStat) {

	  $scope.photo = photo;

	  $scope.ok = function () {
		$uibModalInstance.dismiss('Close');
	  };
	  
	  $scope.fav_nb = photoStat.fav_nb;
	  $scope.comment_nb = photoStat.comment_nb;
	  $scope.comments = photoStat.comments;
	  $scope.description = photoStat.description;

	$scope.submitComm = function(com) {
		
	}

}); */
