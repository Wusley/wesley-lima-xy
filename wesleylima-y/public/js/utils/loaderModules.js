define( [ 'jquery' ], function ( $ ) {

    'use strict';
    
    var loadModules = ( function() {
    	
    	var getModule = function( $, modules ) {
    				
    	    for( var id in modules ) {
    	    	
    	    	if( modules.hasOwnProperty( id ) && !$( id ).length ) {

    		        delete modules[ id ];

    	    	}
    	    	
    	    };
    	    	    
    	    return modules;
    	};
        
        return function( $, data ) {

            var modules = getModule( $, data );

            for(var id in modules) {

            	if( modules.hasOwnProperty( id ) ) {

    	    		require( [ modules[ id ] ], function( module ) {
    	    			
    	    			$( module.init );
    	    			
    	            } );

            	} 

            }

    	};
    }() );
    
    return {

    	init : loadModules( $, modules )

    };
});