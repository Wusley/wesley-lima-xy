define( function() {

	var RandonOrder = {

		init: function( arr ) {

			return arr.sort( function() {

					return ( .5 - Math.random() );

			} );

		}

	};

	return RandonOrder.init;

} );