tansu.controller('tansuController',function($scope, $rootScope, $http, $timeout){
	
	 $http({
        method : "GET",
        url : "collection.json"
    }).then(function mySucces(res) {
		$scope.name = res.data.name;
        $scope.collection = res.data.tansu;
		

    }, function myError(response) {
       
    });
	
	$scope.isActive = false;
	$scope.isActiveTimeout = false;
	
	$scope.activeButton = function() {
		console.log("hello");
		$scope.isActive = !$scope.isActive;
		$timeout(function(){
			$scope.isActiveTimeout = !$scope.isActiveTimeout;
		},500);
	}  ;
	
	
});



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
	
tansu.directive('fileButtonMultiple', function() {
  return {
    link: function(scope, element, attributes, $controller) {

      var el = angular.element(element)
      var button = el.children()[0]

      el.css({
        position: 'relative',
        overflow: 'hidden',
		cursor: 'pointer'
      })

      var fileInput = angular.element('<input type="file" multiple name="upload-file" />')
      fileInput.css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': '2',
        width: '100%',
        height: '100%',
        opacity: '0',
        cursor: 'pointer'
      })

      el.append(fileInput)
	  
	  
      element.find('[type="file"]').on('change', function() {
             scope.mainPhoto = angular.element(this).val();
			 console.log(scope.mainPhoto);
			 scope.$apply();
			 
        });


    }
  }
})

tansu.directive('fileButton', function() {
  return {
    link: function(scope, element, attributes) {

      var el = angular.element(element)
      var button = el.children()[0]

      el.css({
        position: 'relative',
        overflow: 'hidden',
		cursor: 'pointer'
      })

      var fileInput = angular.element('<input type="file" />')
      fileInput.css({
        position: 'absolute',
        top: 0,
        left: 0,
        'z-index': '2',
        width: '100%',
        height: '100%',
        opacity: '0',
        cursor: 'pointer'
      })

      el.append(fileInput)


    }
  }
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
	 

});
