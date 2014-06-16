var bookServices = angular.module('bookServices', ['ngResource']);

bookServices.factory('Book', ['$resource',
  function($resource){
    return $resource('book/', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);