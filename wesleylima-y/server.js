/**
 * Module dependencies.
 */
var express 		= require( 'express' );
var routesIndex		= require( './routes' );
var routesPreview 	= require( './routes/preview' );
var http          	= require( 'http' );
var path          	= require( 'path' );

var app = express(); 

// all environments
app.set( 'port', process.env.PORT || 9006 ); 

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'ejs' );
app.use( express.favicon( __dirname + '/public/apple-touch-icon.png') );
app.use( express.logger( 'dev' ) );
app.use( express.bodyParser() );
app.use( express.methodOverride() );
app.use( express.cookieParser( 'your secret here' ) );
app.use( express.session() );
app.use( express.compress() );
app.use( app.router );
app.use( express.static( path.join( __dirname, 'public' ) ) );

// development only
if( 'development' == app.get( 'env' ) ) {

	app.use( express.errorHandler() );

}

/* Principal */
app.get( '/', function( req, res ) {

	try {

		routesIndex.index( req, res, feeds.slice( 0, 10 ), feeds.length / 10 );

	} catch( err ) {

		routesIndex.error( req, res );

	}

} );

app.get( '/feed/:page', function( req, res ) {

	var feed = feeds.slice( 0, req.params.page * 10 );

	routesIndex.index( req, res, feed );

} );

app.post( '/', function( req, res ) {

	var page = parseInt( req.body.page );

	res.send( feeds.slice( page * 10, ( page + 1 ) * 10 ) );

} );

app.get( '/sobre', routesIndex.about );
app.get( '/laboratorio', routesIndex.laboratory );
app.get( '/projetos', routesIndex.projects );
app.get( '/contato', routesIndex.contact );

/* Preview */
app.get( '/preview', routesPreview.preview );
app.get( '/preview/font-skin', routesPreview.fontskin );
app.get( '/preview/lnk-btn', routesPreview.lnkbtn );
app.get( '/preview/menu', routesPreview.menu );
app.get( '/preview/github-repositories', routesPreview.githubrepositories );
app.get( '/preview/breaks', routesPreview.breaks );
app.get( '/preview/social-media', routesPreview.socialmedia );
app.get( '/preview/loader', routesPreview.loader );
app.get( '/preview/feed', function( req, res ) {

	var feed = feeds.slice( 0, 10 );

	routesPreview.feed( req, res, feed );

} );
app.get( '/preview/logo', routesPreview.logo );

var feed = require( './source/model/feed' ).create( call );

var feeds;
function call( value ) {

	feeds = value;

};

http.createServer( app ).listen( app.get( 'port' ), function() {

	console.log( 'Express server listening on port ' + app.get( 'port' ) );

} );