/*
 * GET Preview page.
 */
exports.preview = function( req, res ) {
  res.render( 'preview/index', {title: 'Preview page'} );
};

exports.fontskin = function( req, res ) {
  res.render( 'preview/font-skin', {title: 'Font skin'} );
};

exports.lnkbtn = function( req, res ) {
  res.render( 'preview/lnk-btn', {title: 'Link button'} );
};

exports.menu = function( req, res ) {
  res.render( 'preview/menu', {title: 'Menu'} );
};

exports.githubrepositories = function( req, res ) {
  res.render( 'preview/github-repositories', {title: 'Github repositories'} );
};

exports.breaks = function( req, res ) {
  res.render( 'preview/breaks', {title: 'Break outside/inside'} );
};

exports.socialmedia = function( req, res ) {
  res.render( 'preview/social-media', {title: 'Social media'} );
};

exports.loader = function( req, res ) {
  res.render( 'preview/loader', {title: 'Loader'} );
};

exports.feed = function( req, res, feed ) {

	res.render( 'preview/feed', { title: 'Feeds', feed: feed } );

};