/*
 * GET home page.
 */
exports.index = function( req, res, feeds, maxPage ) {

	res.render( 'index', { title: 'Desenvolvedor web', feeds: feeds, maxPage: maxPage } );

};

exports.about = function( req, res ) {

	res.render( 'about', { title: 'Sobre' } );

};

exports.laboratory = function( req, res ) {

	res.render( 'laboratory', { title: 'Laboratório' } );

};

exports.projects = function( req, res ) {

	res.render( 'projects', { title: 'Projetos' } );

};

exports.contact = function( req, res ) {

	res.render( 'contact', { title: 'Contato' } );

};

exports.error = function( req, res ) {

	res.render( 'error', { title: 'Erro inesperado' } );

};