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
      when('/book/add', {
        templateUrl: 'partials/angular-book-add.html',
        controller: 'BookAddCtrl'
      }).
      when('/book/:id', {
        templateUrl: 'partials/angular-book-detail.html',
        controller: 'BookDetailCtrl'
      }).
      when('/book/edit/:id', {
        templateUrl: 'partials/angular-book-edit.html',
        controller: 'BookEditCtrl'
      });//.
      //otherwise({
        //redirectTo: '/book'
      //});
  }]);