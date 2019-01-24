exports.create = function( callback ) {

	var fs            = require( 'fs' ),
        path          = require( 'path' ),
        xml2js        = require( 'xml2js' ),
        request       = require( 'request' ),
        _             = require( 'underscore' ),
        OpmlParser    = require( 'opmlparser' ),
        FeedParser    = require( 'feedparser' ),
        feedRead      = require( 'feed-read' );

        /* Underscore */
        _.str   = require( 'underscore.string' );
        _.mixin( _.str.exports() );

	var Feed = function() {};

   	Feed.prototype = {

    	init: function( filename ) {

            this.feedList( filename );

    	},
    	feedList: function( data ) {
            var self = this,
                articles = [];

                request( data )
                    .pipe( new OpmlParser() )
                    .on( 'feed', function ( feed ) {
                        
                        articles.push( feed.xmlurl );

                    } )
                    .on( 'end', function () {
                        
                        self.requestFeedList( articles );

                    } );
                
    	},
    	requestFeedList: function( data ) {

            var articles = [],
                size = data.length;

            data.forEach( function( url ) {

                feedRead( url, function( err ){
                   
                    if( !err || err.Error !== 'Body is not RSS or ATOM' ) {

                        request( url )
                            .pipe( new FeedParser( {
                                resume_saxerror: false
                            } ) )
                            .on('error', function ( err ) {

                                console.error( err );

                            } )
                            .on( 'readable', function () {

                                var stream = this, item;

                                while( item = stream.read() ) {

                                    var title, summary, author;

                                    site = _( item.meta.title ).chain().unescapeHTML().stripTags().clean().trim('&nbsp;').prune( 90 )._wrapped;
                                    title = _( item.title ).chain().unescapeHTML().stripTags().clean().trim('&nbsp;').prune( 90 )._wrapped;
                                    summary = _( item.summary ).chain().unescapeHTML().stripTags().clean().trim('&nbsp;').prune( 250 )._wrapped;
                                    description = _( item.description ).chain().unescapeHTML().stripTags().clean().trim('&nbsp;').prune( 250 )._wrapped;
                                    author = _( item.author ).chain().unescapeHTML().stripTags().clean().trim('&nbsp;').prune( 90 )._wrapped;

                                    articles.push( {
                                        'title'     : title,
                                        'content'   : summary.length > 0 ? summary : description,
                                        'author'    : author.length > 0 ? author : site,
                                        'published' : item.date,
                                        'link'      : item.link,
                                        'linkroot'  : item.meta.link
                                    } );

                                }

                            } )
                            .on( 'end', function( error ) {

                                handler();

                            } );

                    } else {

                        console.log( err + ' - ' + url );
                        handler();

                    }

                } );

            } );

            function handler() {

                size--;

                if( size === 0 ) {

                    articles = order( articles );
                    callback( articles );

                }

            };
            
            function order( obj ) {

                obj.sort( function( a, b ) {

                    return a.published - b.published;

                } ).reverse();

                var feeds = [];
                obj.forEach( function( o, id ) {
                    
                    o.id = id;

                    var min = parseInt( ( ( new Date() - new Date( o.published ) ) / 1000 ) / 60 );
                    var hour = parseInt( min / 60 );
                    var day = parseInt( hour / 24 );

                    if( hour === 0 ) {

                        o.published = min + ' minutos';

                    } else if( day === 0 ) {

                        o.published = hour + ' horas';

                    } else {

                        o.published = day + ' dias';

                    }

                    feeds.push( o );

                } );

                return feeds;

            };

    	}

    };

    var feed = new Feed();

    feed.init( 'https://dl.dropboxusercontent.com/u/87175144/feedly.opml' );

};