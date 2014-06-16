var bookApp = angular.module('bookApp', [
  'ngRoute',
  'bookControllers',
  'bookServices'
]);

bookApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/book', {
        templateUrl: 'partials/angular-book-list.html',
        controller: 'BookListCtrl'
      }).
      when('/book/:id', {
        templateUrl: 'partials/angular-book-detail.html',
        controller: 'BookDetailCtrl'
      }).
      otherwise({
        redirectTo: '/book'
      });
  }]);