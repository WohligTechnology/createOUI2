// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ui.router',
  'phonecatControllers',
  'templateservicemod',
  'navigationservice'
]);

firstapp.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  // for http request with session
  $httpProvider.defaults.withCredentials = true;

  $stateProvider

    .state('login', {
    url: "/login",
    templateUrl: "views/login.html",
    controller: 'LoginCtrl'
  })

  .state('users', {
    url: "/users",
    templateUrl: "views/template.html",
    controller: 'UsersCtrl'
  })

  .state('projects', {
    url: "/projects",
    templateUrl: "views/template.html",
    controller: 'ProjectsCtrl'
  })

  .state('api', {
    url: "/api/:id",
    templateUrl: "views/template.html",
    controller: 'APICtrl'
  });

  $urlRouterProvider.otherwise("/projects");

});


firstapp.directive('img', function($compile, $parse) {
  return {
    restrict: 'E',
    replace: false,
    link: function($scope, element, attrs) {
      var $element = $(element);
      if (!attrs.noloading) {
        $element.after("<img src='img/loading.gif' class='loading' />");
        var $loading = $element.next(".loading");
        $element.load(function() {
          $loading.remove();
          $(this).addClass("doneLoading");
        });
      } else {
        $($element).addClass("doneLoading");
      }
    }
  };
});

var editorG = {};
var jsonEditorNo = 0;
firstapp.directive('jsoneditor', function($compile, $parse) {
  return {
    restrict: 'EA',
    scope: false,
    link: function($scope, element, attrs) {
      $element = $(element);
      $element.css("min-height", "200px");
      var jsoneditornumber = (jsonEditorNo++);
      $element.attr("id", "jsonEditor" + jsoneditornumber);
      var editor = ace.edit("jsonEditor" + jsoneditornumber);
      editor.setTheme("ace/theme/monokai");
      editor.$blockScrolling = Infinity;
      var JsonMode = ace.require("ace/mode/json").Mode;

      editorG = editor;
      editor.session.setMode(new JsonMode());


      editor.setValue($scope.api.Response[attrs.model], 1);
      editor.on("change", function(e) {

        $scope.api.Response[attrs.model] = editor.getValue();
        $scope.$apply();
      });
      var wrapMode = true;
      setTimeout(function() {
        editor.getSession().setUseWrapMode(wrapMode);
      }, 100);

      editor.commands.addCommand({
        name: "beautify",
        bindKey: {
          win: "Ctrl-Alt-B",
          mac: "Ctrl-Option-B"
        },
        exec: function(editor) {
          var value = editor.getValue();
          var beautiVal = js_beautify(value);
          editor.setValue(beautiVal);
          editor.clearSelection();

        }
      });

      editor.commands.addCommand({
        name: "wrap",
        bindKey: {
          win: "Ctrl-Alt-S",
          mac: "Ctrl-Option-S"
        },
        exec: function(editor) {
          wrapMode = !wrapMode;
          editor.getSession().setUseWrapMode(wrapMode);

        }
      });
    }
  };
});

firstapp.directive('dlEnterKey', function() {
  return function(scope, element, attrs) {

    element.bind("keydown keypress", function(event) {
      var keyCode = event.which || event.keyCode;

      // If enter key is pressed
      if (keyCode === 13) {
        scope.$apply(function() {
          // Evaluate the expression
          scope.$eval(attrs.dlEnterKey);
        });

        event.preventDefault();
      }
    });
  };
});
