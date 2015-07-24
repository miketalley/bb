define(['plugins/router'], function(router){

  function Shell(){
    var self = this;

    self.router = router;

    self.activate = function(){
      self.router.map([
        { route: '', title:'Home', moduleId: 'shellContent', nav: true, hash: '#home' },
        { route:'instruments', title:'Instruments', moduleId:'sections/instruments/all', nav: true },
        { route: 'instruments/new',     title:'New Instrument',   moduleId:'sections/instruments/new',     nav: true },
        { route:'sessions', title:'Sessions', moduleId:'sections/sessions/all', nav: true },
        { route:'sessions/new', title:'New Sessions', moduleId:'sections/sessions/new', nav: true },
        { route:'musicians', title:'Musicians', moduleId:'sections/musicians/all', nav: true },
        { route: 'musicians/new',     title:'New Musician',   moduleId: 'sections/musicians/new',     nav: true }


      ]).buildNavigationModel();

      return self.router.activate();
    };

    self.login = function(){
      console.log("Login");
      $.get("http://jamsync.herokuapp.com/users/sign_in", function(html) {
        $(html).appendTo('#login-modal');
        $('#login-modal').modal();
      });
    };

    self.signUp = function(){
      console.log("Sign Up");
      $.get("http://jamsync.herokuapp.com/users/sign_up", function(html) {
        $(html).closest("form").attr("data-bind", "submit: function(){ alert('Success!')}").appendTo('#signUp-modal');
        $('#signUp-modal').modal();
      });
    };

    self.signedIn = false;

  }

  return Shell;

});