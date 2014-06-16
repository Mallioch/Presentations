
var bookControllers = angular.module('bookControllers', []);

bookControllers.controller('BookListCtrl', ['$scope', 'Book',
  function ($scope, Book) {
    $scope.books = Book.query();
  }]);


bookControllers.controller('BookDetailCtrl', ['$scope', 'Book', '$routeParams',
  function($scope, Book, $routeParams) {
        
        $scope.book = Book.get({id: $routeParams.id}, function(book) {
            $scope.book = book;
        });

    }
  ]);

