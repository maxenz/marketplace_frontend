angular
  .module('app', [
    'LocalStorageModule',
    'app.controllers.login_controller',
    'app.controllers.signup_controller',
    'app.services.auth_service',
    'app.services.auth_interceptor_service'
  ]);
