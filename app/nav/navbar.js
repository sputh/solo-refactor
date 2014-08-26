angular.module('navView', [
  'agg'
])
.config(function($stateProvider, $httpProvider, $urlRouterProvider) {
  $httpProvider.interceptors.push('authInterceptor');
  $urlRouterProvider.otherwise("");
  $stateProvider
  .state('navbar', {
    url: '',
    views: {
      '': {
        templateUrl: '/nav/navbar.html',
        controller: 'navbarCntrl'
      }//,
      // 'storyList@shellView': {
      //   templateUrl: '/client/shellView/components/storyList/storyList.html',
      //   controller: 'storyList'
      // },
      // 'reader@shellView': {
      //   templateUrl: '/client/shellView/components/reader/reader.html',
      //   controller: 'reader'
      // },
      // 'dropDown@shellView': {
      //   templateUrl: '/client/shellView/components/auth/dropDown/dropDown.html',
      //   controller: 'dropDown'
      // }
    }
  });
});