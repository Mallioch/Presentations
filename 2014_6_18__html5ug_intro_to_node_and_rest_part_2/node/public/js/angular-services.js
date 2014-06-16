var bookServices = angular.module('bookServices', ['ngResource']);

bookServices.factory('Book', ['$resource',
  function($resource){
    return $resource('api/book/:id', {}, 
    {
      query: {method:'GET', params:{}, isArray:true},
      update: { method:'PUT' } //Angular resource stuff doesn't support what we do with PUT, so this fixes it
    });
  }]);