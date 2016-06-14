tansu.controller('browseController', function($scope, $rootScope, $http, $timeout, $mdDialog, $mdMedia) {


  // ----------------- REQUETE --------------------//

  $http({
    method: "GET",
    url: "browse.json"
  }).then(function mySucces(res) {
    $scope.news = res.data.result;


  }, function myError(response) {
    // window.location = "#/tansu/";
  });


  $rootScope.loading = true;

  $http.get("http://tansuservice.apphb.com/tansuservice.svc/GetItems", {
      "withCredentials": false
    })
    .then(function(res) {
      $rootScope.loading = false;
      $scope.stuffs = res.data.GetItemTypesResult;


      return res.data.GetItemTypesResult;
    });


  $rootScope.loading = true;

  $http.get("http://tansuservice.apphb.com/tansuservice.svc/GetMotifs", {
      "withCredentials": false
    })
    .then(function(res) {
      $rootScope.loading = false;
      $scope.motifs = res.data.GetMotifsResult;

      return res.data.GetMotifsResult;
    });

  $rootScope.loading = true;

  $http.get("http://tansuservice.apphb.com/tansuservice.svc/GetColors", {
      "withCredentials": false
    })
    .then(function(res) {
      $rootScope.loading = false;
      $scope.colors = res.data.GetColorsResult;
      return res.data.GetColorsResult;
    });
  $rootScope.loading = true;

  $http.get("http://tansuservice.apphb.com/tansuservice.svc/GetStyles", {
      "withCredentials": false
    })
    .then(function(res) {
      $rootScope.loading = false;
      $scope.styles = res.data.GetStylesResult;

      return res.data.GetStylesResult;
    });


  //-------- Function de styling des tiles ------------------//



  $scope.rowSpan = function(number) {
    return number > 20 ? 3 : 2;
  }

  $scope.colSpan = function(number) {
    return number > 100 ? 2 : 1;
  }

  $scope.filter = function() {
    console.log("hello");
  }



//--------------- GESTION DE LA MODAL -----------------//


  $scope.modalKitsukeOpen = function(ev, photoClicked) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && $scope.customFullscreen;
    $mdDialog.show({
        controller: DialogController,
        templateUrl: 'partials/modal.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: useFullScreen,
        locals: {
          photoClicked
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
