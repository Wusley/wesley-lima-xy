define( [ 'jquery', 'circle-chart', 'bounce-in' ], function( $, circleChart, bounceIn ) {

	'use strict';

	var About = {
		init: function() {

			this.events();

		},
		events: function() {

			$( document.body ).ready( function() {
			
				circleChart.loadChart( circleChart.getCharts() );

				if( $( '.js-wrapper-bounce' ).offset().top < ( $( document ).scrollTop() + $( window ).height() ) ) {

					bounceIn();

				}
	    		
			} );

			var status = true;

			window.onscroll = function( ) {

				if( status && $( '.js-wrapper-bounce' ).offset().top < ( $( document ).scrollTop() + $( window ).height() ) ) {

					bounceIn();

					status = false;

				}

			};
		
		}
	};

	return {

		init: function () {

	    	About.init();

	    }

	};

} );