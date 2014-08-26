angular.module('navView')
.controller('navView', ['$scope', '$modal', '$rootScope', 'toggleUnread', '$window','resizeReader',
  function($scope, $modal, $rootScope, toggleUnread, $window, resizeReader){

  $scope.open = false;

  $rootScope.readArticles = $rootScope.readArticles || [];

  $rootScope.readArticlesObject = $rootScope.readArticlesObject || {};

  $scope.signup = true;

  $scope.readingUnread = toggleUnread(false);

  $scope.collapseLeft = function() {
    resizeReader($scope.open);
    $scope.open = !$scope.open;
  };

  $scope.openModal = function () {
    // var modalInstance = $modal.open({
    //   controller: 'login',
    //   templateUrl: 'client/shellView/components/auth/login/login.html',
    //   size: 'sm'
    // });
    console.log('open');
  };

  $window.onresize = function(){
    resizeReader(open);
  };

}]);
