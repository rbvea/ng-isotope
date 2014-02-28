'use strict';
/*global _:false*/

var app = angular.module('rbvea.isotope', ['ngAnimate']);

app.directive('ready', ['$animate', function($animate) {
  return function(scope, elm) {
    var preload = new Image();
    preload.src = scope.card.path;
    angular.element(preload).load(function() {
      scope.imgWidth = preload.width;
      scope.imgHeight = preload.height;
      var imageElm = angular.element(elm);
      imageElm.css({
        'background-image':'url(\''+scope.card.path+'\')',
        'height' : scope.imgHeight,
        'width' : '300px'
      });
      imageElm.parent().css( {
        'width': 310,
        'height': scope.imgHeight,
        'order': scope.$index
      });
      scope.$parent.numElms++;
      if(scope.$parent.numElms === 18) {
        scope.$parent.ready = true;
      }
      $animate.enter(imageElm.parent(), scope.$parent.container, null, function (){
      });
    });
  };
}]);

app.directive('isotope', ['$log', '$compile', '$filter', '$animate',  function($log, $compile, $filter, $animate) {
  return function(scope, iElement, attr) {
    scope.container = iElement;
    var source = attr.isotope;
    scope.ready = false;
    scope.numElms = 0;
    scope.children = {};
    scope.displayedIDs = [];
    scope.category = '';

    var filter = $filter('filter');

    var str = '<div class="isotope-block"><div class="img" data-category="{{card.category}}" ready="false"><span ng-bind="card.category"></span></div></div>';
    var compile = $compile(str);

    scope.filter = function(cat) {
      var ids = [];
      var newArray = filter(scope[source], {category: cat});
      _.each(newArray, function(val) {
        ids.push(val.$id);
      });
      return ids;
    };

    scope.$watch('ready', function(nu) {
      $log.warn(nu);
    });

    scope.$watch('category', function(nu) {
      var arr = scope.filter(nu);
      var diff = _.difference(_.keys(scope.children), arr); //take ids not in array
      _.each(diff, function(id) {
        $animate.leave(scope.children[id]);
      });
      if(scope.ready) {
        _.each(arr, function(id) {
          $animate.enter(scope.children[id], scope.container);
        });
      }
    });

    if(angular.isArray(scope[source])) {
      angular.forEach(scope[source], function(card, i) {
        //create new scope for each isotope-block
        var newScope = scope.$new();

        card.$id = newScope.$id;
        newScope.card = card;
        scope[source][i].$id = newScope.$id;

        var compiled = compile(newScope, function(){});
        scope.children[card.$id] = compiled;
        scope.displayedIDs.push(card.$id);
      });
    }
  };
}]);