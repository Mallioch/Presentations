
var bookControllers = angular.module('bookControllers', []);

bookControllers.controller('BookListCtrl', ['$scope', '$http',
  function ($scope, $http) {
    $http.get('api/book').success(function(data) {
        console.log('got that book data', data);
        $scope.books = data;
    });
  }]);


bookControllers.controller('BookDetailCtrl', ['$scope', '$http', '$routeParams',
  function($scope, $http, $routeParams) {
        $http.get('api/book/' + $routeParams.id).success(function(data) {
        console.log('got that book', data);
        $scope.book = data;
    });
  }]);

