define(['plugins/router', 'beerbonder'], function(router, beerbonder){

  function Shell(){
    var self = this;

    self.router = router;

    self.activate = function(){
      self.router.map([
        { route: '', title:'Home', moduleId: 'views/index', nav: true, hash: '#home' }
      ])
      .buildNavigationModel()
      .mapUnknownRoutes('views/index');

      return self.router.activate();
    };

    self.login = beerbonder.login;
    self.newUser = beerbonder.newUser;

  }

  return Shell;

});