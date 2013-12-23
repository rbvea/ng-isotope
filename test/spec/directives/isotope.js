'use strict';

describe('Directive: ngIsotope', function () {

  beforeEach(module('ngIsotopeApp'));

  var scope,
      MainCtrl;

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();
    console.log('SCOPE: ' + typeof scope);
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should compile <div isotope="attr"></div>', function() {
    inject(function($compile) {
      var elm = $compile('<div isotope="images"></div>')(scope); 
      expect(angular.element(elm).find('img').length).toBeGreaterThan(0);
    });
  });
});