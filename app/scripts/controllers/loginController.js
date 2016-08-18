(function(){

  angular
  .module('app.controllers.login_controller', [
    'theme.core.services', 'app'
  ])
  .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', '$theme', 'authService', '$location'];

  function LoginController(
    $scope,
    $theme,
    authService,
    $location
  ){

    'use strict';

    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });

    var vm = this;
    vm.login = login;
    vm.message = "";
    vm.loginData = {
      userName: "",
      password: ""
    };

    function login() {

      authService.login(vm.loginData).then(function (response) {

        $location.path('/');

      },
      function (err) {
        vm.message = err.error_description;
      });
    };

  };

}());
