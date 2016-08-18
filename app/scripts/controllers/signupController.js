(function(){

  angular
  .module('app.controllers.signup_controller', [
    'theme.core.services', 'app'
  ])
  .controller('SignupController', SignupController);

  SignupController.$inject = ['$scope', '$location', '$timeout', 'authService', '$theme'];

  function SignupController(
    $scope,
    $location,
    $timeout,
    authService,
    $theme
  ){

    'use strict';

    $theme.set('fullscreen', true);

    $scope.$on('$destroy', function() {
      $theme.set('fullscreen', false);
    });

    var vm = this;
    vm.signUp = signUp;

    vm.savedSuccessfully = false;
    vm.message = "";
    vm.signUp = signUp;

    vm.registration = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    function signUp() {

      authService.saveRegistration(vm.registration).then(function (response) {

        $scope.savedSuccessfully = true;
        $scope.message = "El usuario fue registrado correctamente. En 2 segundos se lo redireccionará al login.";
        startTimer();

      },
      function (response) {
        var errors = [];
        for (var key in response.data.modelState) {
          for (var i = 0; i < response.data.modelState[key].length; i++) {
            errors.push(response.data.modelState[key][i]);
          }
        }
        $scope.message = "Failed to register user due to:" + errors.join(' ');
      });
    };

    var startTimer = function () {
      var timer = $timeout(function () {
        $timeout.cancel(timer);
        $location.path('/login');
      }, 2000);
    }



  };

}());
