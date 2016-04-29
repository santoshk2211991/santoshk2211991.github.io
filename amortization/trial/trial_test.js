'use strict';

describe('myApp.trial module', function() {

  beforeEach(module('myApp.trial'));

  describe('trial controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var trialCtrl = $controller('TrialCtrl');
      expect(trialCtrl).toBeDefined();
    }));

  });
});