var app = angular.module('rbvea.isotope', [])

app.directive('isotope', [function() {
  return function(scope, elm, attr) {
    var elms = scope[attr.isotope];
    scope.ready = false;
    scope.num_elms = 0;

    if(elms.length > 0 ) {
      scope.num_elms = elms.length;
      angular.forEach(elms, function(card) {
        angular.element(elm[0]).append('<img data-category="'+card.category+'" ready="false" src="' + card.path+ '"/>');
      });
    }
  } 
}]);