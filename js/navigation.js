
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
  var navigation = [{
    name: "Users",
    classis: "active",
    link: "#/users",
    subnav: []
  }, {
    name: "Projects",
    classis: "active",
    link: "#/projects",
    subnav: []
  }];

  return {
    getnav: function() {
      return navigation;
    },
    makeactive: function(menuname) {
      for (var i = 0; i < navigation.length; i++) {
        if (navigation[i].name == menuname) {
          navigation[i].classis = "active";
        } else {
          navigation[i].classis = "";
        }
      }
      return menuname;
    },
    saveProject: function(data, successCallback, errorCallback) {
      $http.post(adminURL + "project/save", data).success(successCallback).error(errorCallback);
    },
    deleteProject: function(data, successCallback, errorCallback) {
      $http.post(adminURL + "project/delete", data).success(successCallback).error(errorCallback);
    },
    findProjects: function(data, successCallback, errorCallback) {
      $http.post(adminURL + "project/find", data).success(successCallback).error(errorCallback);
    },
    findOneProject: function(data, successCallback, errorCallback) {
      $http.post(adminURL + "project/findOne", data).success(successCallback).error(errorCallback);
    },
    saveApi: function(data, successCallback, errorCallback) {
      $http.post(adminURL + "api/save", data).success(successCallback).error(errorCallback);
    },
    deleteApi: function(data, successCallback, errorCallback) {
      $http.post(adminURL + "api/delete", data).success(successCallback).error(errorCallback);
    },

  };
});
