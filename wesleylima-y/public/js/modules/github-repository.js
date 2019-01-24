define( [
	'hbs!/templates/loader',
	'hbs!/templates/github-repository',
	'github-service' ], function( loader, githubRepository ) {

	'use strict';
	
	var Github = {
		init: function() {
			this.events();
		},
		events: function() {
			$( '[data-repo]' ).github( {
				'template' : githubRepository,
				'loader' : loader
			} );
		}
	};

	return {
		init: function () {
	    	Github.init();
	    }
	};
});