'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('ngIsotopeApp'));

  var MainCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    // $httpBackend = _$httpBackend_;
    // $httpBackend.expectGET('/api/awesomeThings')
    //   .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('images to be an array with list of > 0', function () {
    expect(scope.images).toBeDefined();
    expect(scope.images.length).toBeGreaterThan(0);
  });
});
