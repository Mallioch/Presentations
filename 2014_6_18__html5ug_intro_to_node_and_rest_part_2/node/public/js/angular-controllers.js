
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

bookControllers.controller('BookEditCtrl', ['$scope', 'Book', '$routeParams', '$location',
  function($scope, Book, $routeParams, $location) {
        
        $scope.book = Book.get({id: $routeParams.id}, function(book) {
            $scope.book = book;
        });

        $scope.delete = function() {
            Book.delete({id: $routeParams.id}, function() {
                $location.path('/book');
            });
        }

        $scope.save = function() {
            Book.update({id: $routeParams.id}, $scope.book);
            $location.path('/book');
        }
    }

  ]);

bookControllers.controller('BookAddCtrl', ['$scope', 'Book', '$routeParams', '$location',
  function($scope, Book, $routeParams, $location) {
        
        $scope.book = new Book();

        $scope.save = function() {
            console.log('the book at this time', $scope.book);
            $scope.book.$save();
            $location.path('/book');


        }
        
    }

  ]);
