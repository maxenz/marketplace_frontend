var app = angular.module('shaman.marketPlaceApp',['theme','theme.demos','app']);

app.config(
  [
    '$provide',
    '$routeProvider',
    '$httpProvider',
    function(
      $provide,
      $routeProvider,
      $httpProvider
    ) {
      'use strict';

      $httpProvider.interceptors.push('authInterceptorService');

      $routeProvider
      .when('/', {
        templateUrl: 'views/index.html',
        resolve: {
          loadCalendar: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load([
              'bower_components/fullcalendar/fullcalendar.js',
            ]);
          }]
        }
      })
      .when('/:templateFile', {
        templateUrl: function(param) {
          return 'views/' + param.templateFile + '.html';
        }
      })
      .when('#', {
        templateUrl: 'views/index.html',
      })
      .otherwise({
        redirectTo: '/'
      });
    }]);

    app.run(['authService', '$rootScope', function (authService, $rootScope) {
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
        authService.fillAuthData();
      });

    }]);
