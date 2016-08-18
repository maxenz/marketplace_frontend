/**
* Created by Maximiliano on 03/11/2015.
*/
(function(){

  angular
  .module('app.services.auth_interceptor_service', [])
  .factory('authInterceptorService', authInterceptorService);

  authInterceptorService.$inject = ['$injector','$q','localStorageService'];

  function authInterceptorService(
    $injector,
    $q,
    localStorageService
  ){

    var authInterceptorServiceFactory = {};

    var _request = function (config) {

        config.headers = config.headers || {};

        var authData = localStorageService.get('authorizationData');
        if (authData) {
            config.headers.Authorization = 'Bearer ' + authData.token;
        }

        return config;
    }

    var _responseError = function (rejection) {
        if (rejection.status === 401) {
            $location.path('/login');
        }
        return $q.reject(rejection);
    }

    authInterceptorServiceFactory.request = _request;
    authInterceptorServiceFactory.responseError = _responseError;

    return authInterceptorServiceFactory;
  }

}());
