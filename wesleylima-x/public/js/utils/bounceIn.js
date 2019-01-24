define( [ 'jquery', 'randon-order' ], function( $, randonOrder ) {

	var BounceIn = {

		init: function() {

			var $bounce = randonOrder( $( '.js-bounce-in' ) );

			var count = 0;

			var bounceInterval = window.setInterval( function() {

				$bounce.eq( count ).addClass('bounce-in');

				count++;

				if( count > $bounce.length ) {

					window.clearTimeout( bounceInterval );

				}

			}, 0);

		}

	};

	return BounceIn.init;

} );