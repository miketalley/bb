var bowerPath = '../bower_components';

requirejs.config({
  paths: {
      'text': bowerPath + '/requirejs-text/text',
      'durandal': bowerPath + '/durandal/js',
      'plugins' : bowerPath + '/durandal/js/plugins',
      'transitions' : bowerPath + '/durandal/js/transitions',
      'knockout': bowerPath + '/knockout/dist/knockout',
      'knockout.punches': bowerPath + '/knockout.punches/knockout.punches.min',
      'jquery': bowerPath + '/jquery/dist/jquery',
      'lodash': bowerPath + '/lodash/lodash.min',
      'd3': bowerPath + '/d3/d3.min'
    },
    shim: {
      'knockout.punches': {
        deps: ['knockout']
      }
    }
});

define(function (require) {
  var system = require('durandal/system'),
      app = require('durandal/app'),
      ko = require('knockout');

  window.ko = ko;

  require('knockout.punches');
  ko.punches.enableAll();
  ko.punches.attributeInterpolationMarkup.enable();

  system.debug(true);

  app.title = 'Beer Bonder';

  app.configurePlugins({
    router: true,
    dialog: true
  });

  app.start().then(function() {
    app.setRoot('shell');
  });
});