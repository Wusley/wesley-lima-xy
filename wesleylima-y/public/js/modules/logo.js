define( [ 'jquery', 'hammer-jquery' ], function( $ ) {

	'use strict';

	var Environment = {
		init: function() {

			this.events();

		},
		events: function() {
			var Handler = {
				manifest: function( coord ) {
					var x = coord.pageX,
						y = coord.pageY,
						$page = $( window ),
						$target = $( '.js-char' );

					$target.find( '.root' ).addClass( 'default' )

					var c = new Char( $target, 60, -25, 20, -20 );

					c.turnTo( $page.width(), $page.height(), x, y );

			        window.clearTimeout( Handler.resetTiming );
					Handler.resetTiming = window.setTimeout( function() {

						c.reset();

					}, 5000 );
				}
			};

			$( document )
				.on( 'click', function( e ) {
						Handler.manifest( e )
					} );


			$( document )
				.hammer()
					.on( 'tap', function( e ) {
						Handler.manifest( e.gesture.center )
					} );
		}
	};

	var Char = function( $target, maxX, minX, maxY, minY ) {
		this.$target = $target;
		this.rotateX = 0;
		this.rotateY = 0;
		this.maxRotateX = maxX;
		this.minRotateX = minX;
		this.maxRotateY = maxY;
		this.minRotateY = minY;
		this.resetTiming = 0;
	};

	Char.prototype.render = function() {
		var value = 'rotateX(' + this.rotateX + 'deg)' + 'rotateY(' + this.rotateY + 'deg)';

		this.$target
			.find( '.js-root' )
				.css( {
					'-webkit-transform' : value,
					'-moz-transform' : value,
					'-ms-transform' : value,
					'-o-transform' : value,
					'transform' : value
				} );
	};

	Char.prototype.turnTo = function( documentWidth, documentHeight, clickX, clickY ) {
		var gapHor = documentWidth / 2;

		var gapVer = this.$target.offset().top + ( this.$target[ 0 ].clientHeight / 2 );


		if( gapHor < clickX ) {
			var point = clickX - gapHor;

			var percent = point / gapHor;

			this.rotateY = this.maxRotateY * percent;
		}

		if( gapHor > clickX ) {
			var point = clickX;

			var percent = 1 - ( point / gapHor );

			this.rotateY = this.minRotateY * percent;
		}

		if( gapHor === clickX ) {
			this.rotateY = 0;
		}

		if( gapVer < clickY ) {
			var point = clickY - gapVer;
			var belowHeight = documentHeight - gapVer;
			var percent = point / belowHeight;

			this.rotateX = this.minRotateX * percent;
		}

		if( gapVer > clickY ) {
			var point = clickY;

			var percent = 1 - ( point / gapVer );

			this.rotateX = this.maxRotateX * percent;
		}

		if( gapVer === clickY ) {
			this.rotateX = 0;
		}

		this.render();
	};

	Char.prototype.reset = function() {
		this.rotateX = 0;
		this.rotateY = 0;

		this.render();
	};

	return {

		init: function () {

	    	Environment.init();

	    }

	};

} );