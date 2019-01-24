define( [ 'jquery' ], function( $ ) {

	var CircleChartService = {
		getCharts: function() {

			var charts = [];
			var $charts = $( '.js-circle-chart' ) || [];

			for (var i = 0; i < $charts.length; i++ ) {

				var chart = new CircleChart( $charts.eq( i ) );

				charts.push( chart );

			};

			return charts;

		},
		loadChart: function( charts ) {

			this.loadChart = window.setInterval( function() {

				for (var i = 0; i < charts.length; i++ ) {

					if( charts[ i ].turnAngle() ) {

						charts.splice( i, 1);

						if( charts.length === 0 ) {

							window.clearTimeout( this.loadChart );

						}

					}

				};

			}, 0);
		}

	};

	var CircleChart = function( $target ) {

		this.angleDeg = 0;
		this.text = $target.attr( 'title' );
		this.halfLeft = $target.find( '.half-left' );
		this.halfRight = $target.find( '.half-right' );
		this.value = $target.find( '.value' );
		this.pColor = this.halfRight.css( 'background-color' );
		this.sColor = this.halfLeft.css( 'background-color' );

	};

	CircleChart.prototype.turnAngle = function( angle ) {

		this.angleDeg = angle || this.angleDeg;

		if( this.angleDeg <= 180 ) {

			this.leftAngle( this.angleDeg );

		} else {

			this.rightAngle( this.angleDeg );

		}

		this.insertValue( this.angleDeg );

		if( this.angleDeg < ( 360 / 100 ) * this.text ) {
			
			this.angleDeg++;

			return false;

		} else {

			return true;

		}

	};

	CircleChart.prototype.leftAngle = function( data ) {

		this.halfLeft.css( {

			'transform': 'rotate(' + data + 'deg )'

		} );

		this.halfRight.css( {

			'transform': 'rotate( 0deg )',
			'background-color' : this.pColor

		} );

	};

	CircleChart.prototype.rightAngle = function( data ) {

		this.halfRight.css( {

			'transform': 'rotate(' + data + 'deg )',
			'background-color' : this.sColor

		} );

	};

	CircleChart.prototype.insertValue = function( data ) {

		var text = Math.floor( ( data / 360 ) * 100 );

		this.value.text( text );

	};

	return CircleChartService;

} );