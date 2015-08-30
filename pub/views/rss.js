'use strict';

angular.module('cpl')
  .controller('RssCtrl', function($localStorage, $stateParams, $state, auth, $q){

      var that = this;

      this.urls = $localStorage.urls||[];
      this.currentUrl = $stateParams.url||$localStorage.currentUrl||'';

      this.addUrl = function(url, nogo){
	  that.nuUrl = '';
	  if(that.urls.indexOf(url)>-1) return $state.go('home.rss', {url:encodeURIComponent(url)});
	  that.urls.unshift(url);

	  $localStorage.urls = that.urls;
	  if(!nogo) $state.go('home.rss', {url:encodeURIComponent(url)});
      };

      this.setUrl = function(url){
	  that.currentUrl = url;
	  $localStorage.currentUrl = that.currentUrl;
	  $state.go('home.rss', {url:encodeURIComponent(url)});
      };
      
      this.closeUrl = function(ind){
	  var closingCurrent = false;
	  if(that.urls[ind] === that.currentUrl) closingCurrent = true;

	  that.urls.splice(ind,1);
	  $localStorage.urls = that.urls;

	  if(closingCurrent && that.urls.length)
	      that.setUrl(that.urls[Math.min(that.urls.length-1, ind)]);
      };


      Cani.core.confirm('dynamo').then(function(){
	  that.hasDynamo = true;

	  Cani.dynamo.load('item', {usr:auth.cogId.IdentityId}).then(function(items){
	      // graft in uniques
	      for(var i=items.length; i-->0;)
		  if(that.urls.indexOf(items[i].url)===-1) that.addUrl(items[i].url, 'nogo');
	  });

	  that.saveUrls = function(){
	      $q.all(that.urls.map(function(item){
		  return Cani.dynamo.save('item', {usr:auth.cogId.IdentityId, url:item});
	      })).then(function(){
		  console.log('success');
	      });
	  };
      });


  });
