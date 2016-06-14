tansu.controller('editController', function($scope, $rootScope, $http, fileReader) {
  $rootScope.loading = true;

// ----------------- CHARGEMENT DES ELEMENTS ---------------------- //

  $http.get("edit.json")
    .then(function(res) {
      $rootScope.loading = false;
      $scope.profile = res.data;
      $scope.nb_kimono = res.data.kimonos.length;
      $scope.nb_obi = res.data.obis.length;
      $scope.nb_kitsuke = res.data.kitsukes.length;
      $scope.kimonos = res.data.kimonos;
      $scope.obis = res.data.obis;

      return res.data;

    });

  $scope.imageSrc = "";

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



//------------------AJOUT DE L'ITEM ---------------------//


  $scope.newItemAdd = function() {

    $scope.selection = [];
    angular.forEach($scope.motifs, function(motif) {
      if (!!motif.selected) $scope.selection.push(motif.Id);
    })


    if ($scope.item.sex == 0 || $scope.item.sex == 1) {
      $scope.message = "";
      if ($scope.item.what) {
        $scope.message = "";
        if ($scope.item.style && $scope.item.color) {
          $scope.message = "";
          console.log($rootScope.photo);
          if ($rootScope.photo) {

            console.log($scope.item.sex);
            console.log($scope.item.what);
            console.log($scope.item.style);
            console.log($scope.item.color);
            console.log($scope.selection);
            // console.log($rootScope.photo);
            $rootScope.loading = true;
            $http({
              method: 'PUT',
              url: 'http://tansuservice.apphb.com/tansuservice.svc/AddItem',
              headers: {
                'Content-Type': false
              },
              withCredentials: false,
              data: {
                "newItem": {
                  "Directory": "",
                  "Gender": $scope.item.sex,
                  "Main": $rootScope.photo,
                  "style": $scope.item.style,
                  "UserId": 8,
                  "What": $scope.item.what,
                  "Color": $scope.item.color
                },
                "motifs": $scope.selection
              }

            }).success(function(res) {
              $rootScope.loading = false;
              console.log("success");
            }).error(function(res) {
              $rootScope.loading = false;
              console.log("fail");
            });

          } else {
            $scope.message = "Please pick a photo.";
          }
        } else {
          if ($scope.item.style) {
            $scope.message = "Please choose the item color.";
          } else if (true$scope.item.color) {
            $scope.message = "Please choose the item style.";
          } else {
            $scope.message = "Please choose the item style and color.";
          }
        }
      } else {
        $scope.message = "Please choose an item categories.";
      }
    } else {
      $scope.message = "Please choose a gender.";
    }

  }

});



// ---------------- DIRECTIVE POUR LE FICHIER ---------------- //


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
