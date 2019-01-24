define( [ 
	'hbs!/templates/loader',
	'hbs!/templates/feed',
	'hbs!/templates/error',
	'jquery', 'hammer-jquery' ], function ( loaderTemp, feedTemp, errorTemp, $ ) {

	'use strict';

	var Feed = {
		init: function() {
			this.page = 1;
			this.maxPage = Math.ceil( $( '.js-feeds' ).data( 'maxpage' ) );
			this.load = false;

			this.events();
		},
		handler: {
			initAjax: function() {

				$.ajax( {
					type: 'POST',
					url: '/',
					dataType: 'json',
					data: { 'page': Feed.page },
					beforeSend: function() {

						$( '.wrapper-loader' ).remove();

						Feed.handler.insertLoaderMessege( $( '.js-feeds' ) );

						Feed.load = true;

					},
					success: function( data ) {

						$( '.wrapper-loader' ).remove();

						Feed.handler.insertFeedContent( data, $( '.js-feeds' ) );

						Feed.page++;
						Feed.load = false;

					},
					error: function( data ) {

						$( '.wrapper-loader' ).remove();

						Feed.handler.insertErrorMessege( data, $( '.js-feeds' ) );

					}
				} );

			},
			getWrapper: function() {

				return $( "<section class='wrapper-loader'></section>" );				

			},
			insertLoaderMessege: function( $section ) {

				var $wrapper = this.getWrapper();

				var $loader = $wrapper.html( loaderTemp() );
				
				$section.append( $loader );

			},
			insertErrorMessege: function( data, $section ) {
				var reloadClassName = 'js-reload';
				var $wrapper = this.getWrapper();
				var $error = $wrapper.html( errorTemp( {
												'msg'			: 'Falha no carregamento, clique aqui para recarregar',
												'classError'	: 'feed-error ' + reloadClassName
											} ) );

				$section.append( $error );

				$( '.' + reloadClassName )
					.on( 'click', Feed.handler.initAjax );

			},
			insertFeedContent: function( data, $section ) {

				var count = 1;
				data.forEach( function( feed ) {

					count > 4 ? count = 1 : count++;

					feed.odd = count;
					$section.append( feedTemp( feed ) );

				} );

			}
		},
		events: function() {
			var handler = {

				scrolling: function() {

					var scroll = $( document ).scrollTop() + $( window ).height();

					var awake = $( '.js-feed:eq(-2)' ).offset().top;

					if( Feed.page <= Feed.maxPage &&
						Feed.load === false &&
						scroll > awake ) {
						
						Feed.handler.initAjax();

					}
				}

			};

			$( window ).on( 'scroll', handler.scrolling );
			$( window ).hammer().on( 'swipe', handler.scrolling );
			
		}
	};

	return {
		init: function () {

	    	Feed.init();

	    }
	};

} );