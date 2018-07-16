var Index = {};
$(function(){

	Index.Servicos = {
		chamarModulo: function(modulo, callback){
			General.Servicos.base({
				url: 'app/forms/'+modulo+'.html',
				success: function(html){
					$('main').html(html);
					
					General.Servicos.base({
						url: 'app/control/'+modulo+'.js',
						success: function(data){
							eval(data);
							callback && callback();
						}
					});
				}
			});
		}
	};

	Index.Controle = {
		main: function(){
			var href	= location.href;
			href		= href.split('?');
			href		= href && href[1];
			if (!href)
				href = 'inicio';

			Index.Servicos.chamarModulo(href);
		}
	};

	Index.Controle.main();
});