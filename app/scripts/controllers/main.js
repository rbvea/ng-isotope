'use strict';

angular.module('ngIsotopeApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.images = [
      {path: "http://placehold.it/300x300", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x200", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x400", category: "app", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "app", subtitle: "caption"},
      {path: "http://placehold.it/300x200", category: "design", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x400", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "app", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "app", subtitle: "caption"},
      {path: "http://placehold.it/300x200", category: "design", subtitle: "caption"},
      {path: "http://placehold.it/300x200", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x200", category: "web", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "app", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "app", subtitle: "caption"},
      {path: "http://placehold.it/300x200", category: "design", subtitle: "caption"},
      {path: "http://placehold.it/300x300", category: "web", subtitle: "caption"},
    ];
    
  });
