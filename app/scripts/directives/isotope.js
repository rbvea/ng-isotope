'use strict';
/*global _:false*/

var app = angular.module('rbvea.isotope', ['ngAnimate']);

app.directive('ready', [function() {
  return function(scope, elm) {
    var preload = new Image();
    var parScope = scope.$parent;
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
      parScope.numElms++;
      if(parScope.numElms === parScope[parScope.source].length) {
        parScope.ready = true;
        parScope.$apply();
      }
    });
  };
}]);

app.directive('isotope', ['$log', '$compile', '$filter', '$animate', '$window', function($log, $compile, $filter, $animate, $window) {
  return function(scope, iElement, attr) {
    scope.container = iElement;
    scope.source = attr.isotope;
    scope.numElms = 0;
    scope.children = {};
    scope.displayedIDs = [];
    scope.category = null;
    scope.ready = false;
    scope.numColumns = Math.floor(angular.element($window).width() / 320);

    var filter = $filter('filter'),
        str = '<div class="isotope-block"><div class="img" data-category="{{card.category}}" ready="false"><span ng-bind="card.category"></span></div></div>',
        compile = $compile(str);

    scope.enter = function(id, done) {
      var i = scope.displayedIDs.length;
      scope.displayedIDs.push(id);
      var elm = scope.children[id];
      var col = (i % scope.numColumns) * 310;
      if(i >= scope.numColumns && _.isFunction(elm.position)) {
        var above = angular.element(scope.children[scope.displayedIDs[i - scope.numColumns]]);
        var top = (above.position().top + above.height()) + 10;
        angular.element(elm).css({top : top, left: col});
        if(!angular.element.contains(iElement, elm)) {
          $animate.enter(elm, scope.container);
          if(_.isFunction(done)) {
            done();
          }
        }
      } else {
        elm.css({top : 0, left: col});
        scope.container.append(elm);
        if(!angular.element.contains(iElement, elm)) {
          $animate.enter(elm, scope.container);
          if(_.isFunction(done)) {
            done();
          }
        }
      }
    };

    scope.filter = function(cat) {
      var ids = [];
      var newArray = filter(scope[scope.source], {category: cat});
      _.each(newArray, function(val) {
        ids.push(val.$id);
      });
      return ids;
    };

    scope.$watch('ready', function(nu) {
      if(nu) {
        scope.category = '';
      }
    });

    scope.$watch('category', function(nu) {
      var arr = scope.filter(nu);
      var diff = _.difference(scope.displayedIDs, arr);
      scope.displayedIDs = [];
      _.each(diff, function(id) {
          $animate.leave(scope.children[id]);
        });
      _.each(arr, function(id) {
        scope.enter(id);
      });
    });

    if(angular.isArray(scope[scope.source])) {
      angular.forEach(scope[scope.source], function(card, i) {
        //create new scope for each isotope-block
        var newScope = scope.$new();

        card.$id = newScope.$id;
        newScope.card = card;
        scope[scope.source][i].$id = newScope.$id;

        var compiled = compile(newScope, function(){});
        scope.children[card.$id] = compiled;
        // scope.displayedIDs.push(card.$id);
      });
    }
  };
}]);