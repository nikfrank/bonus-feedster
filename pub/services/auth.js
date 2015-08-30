'use strict';

angular.module('cpl')
    .service('auth', function(){
	var that = this;

	Cani.core.confirm('cognito').then(function(){
	    Cani.core.confirm('fb: login')
		.then(function(loginData){return {authResponse:loginData};})
		.then(Cani.cognito.onLogin)
		.then(function(cogId){
		    that.cogId = cogId;
		});
	});
    });
