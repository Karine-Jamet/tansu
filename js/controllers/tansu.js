tansu.controller('tansuController', function($scope, $rootScope, $http, $timeout, $mdDialog, $mdMedia) {

  /* 	if($rootScope.connexionAll){

  	 */
  $scope.showVal = false;

  $http({
    method: "GET",
    url: "collection.json"
  }).then(function mySucces(res) {
    $scope.name = res.data.name;
    $scope.collection = res.data.tansu;


  }, function myError(response) {
    window.location = "#/tansu/";
  });

  $scope.rowSpan = function(number) {
    return number > 10 ? 3 : 2;
  }

  $scope.colSpan = function(number) {
    return number > 15 ? 2 : 1;
  }

  $scope.showKitsuke = function(item) {
    item.showVal = !item.showVal;
  }

  $scope.modalKitsukeOpen = function(ev) {

    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'partials/modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen,
        locals: {
          photoClicked: ev.toElement.currentSrc
        }
      })
      .then(function(answer) {
        $scope.status = 'You said the information was "' + answer + '".';
      }, function() {
        $scope.status = 'You cancelled the dialog.';
      });
  }

  function DialogController($scope, $mdDialog, photoClicked) {
    $http({
      method: "GET",
      data: "photo=" + photoClicked,
      url: "comment.json"
    }).then(function mySucces(res) {
      $scope.modal = res.data;
      $scope.photoClicked = photoClicked;
      $scope.modal.comment_nb = $scope.modal.comments.length;

    }, function myError(response) {

    });



    $scope.commenting = function(text) {
      if (text) {
        var com = {
          "name": $scope.modal.name,
          "profile": $scope.modal.avatar,
          "text": text
        };
        $scope.modal.commentDone = "";
        $scope.modal.comments.unshift(com);
        $scope.modal.comment_nb = $scope.modal.comments.length;
      }


      // faire une requete pour nenvoyer en bdd

    }

    $scope.faving = function(photo) {
      if ($scope.modal.is_fav) {
        $scope.modal.fav_nb--;
        $scope.modal.is_fav = false;
      } else {
        $scope.modal.fav_nb++;
        $scope.modal.is_fav = true;
      }
    }

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


});
