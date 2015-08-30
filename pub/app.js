'use strict';

angular.module('cpl', ['ngMaterial', 'ui.router', 'ngStorage', 'xml'])
    .run(function($q){window.Q = $q;})
    .config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/rss/");

	$stateProvider
	    .state('home', {
		url:'/',
		templateUrl: "views/home.html",
		controller: 'HomeCtrl as home'
	    })
	    .state('home.rss', {
		url:'rss/:url',
		templateUrl:'views/rss.html',
		controller:'RssCtrl as rss'
	    });


  });
