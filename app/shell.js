define(['plugins/router', 'beerbonder'], function(router, beerbonder){

  function Shell(){
    var self = this;

    self.router = router;

    self.activate = function(){
      self.router.map([
        { route: '', title:'Home', moduleId: 'views/index', nav: true, hash: '#home' },
        { route: 'authentication/login', title:'Login', moduleId: 'views/authentication/login', nav: true }
      ])
      .buildNavigationModel()
      .mapUnknownRoutes('views/index');

      return self.router.activate();
    };
  }

  return Shell;

});