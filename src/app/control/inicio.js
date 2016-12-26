var Inicio = {};
Inicio.Servicos = {
	getProvas: function(call){
		General.Servicos.getData({
			url: 'provas.json',
			success: call
		});
	}
};

Inicio.Controle = {
	main: function(){
		var Session = General.Controle.getSession();
		if (Session)
			location.href = 'index.html?regulamento';

		Inicio.Servicos.getProvas(function(data){
			var template	= '<option disabled selected value="">Selecione uma prova</option>{{#.}}<option value="{{idprova}}">{{txtprova}}</option>{{/.}}';
			var html		= Mustache.to_html(template, data);
			$('[name="idprova"]').html(html);
		});
	},

	continuar: function(){
		var form	= this;
		var data	= form.getJson();

		if (data.txtsenha != data.txtconfirma) {
			alertify.error("As senhas não estão batendo.");
			return;
		}

		if (Number.isNaN(data.nrquestoes)) {
			alertify.error("O número de questões por tema deve ser um número.");
			return;	
		}

		if (data.nrquestoes <= 2) {
			alertify.error("A quantidade de questões por tema deve ser igual ou maior do que dois.");
			return;	
		}

		data.idprova	= +data.idprova;
		data.ischute	= !!data.ischute;
		data.nrtempo	= +data.nrtempo;
		data.nrquestoes	= +data.nrquestoes;
		data.txtprova	= $('#idprova option:selected').text();
		data.isiniciado = false;

		General.Controle.setSession(data);
		location.href = 'index.html?regulamento';
	}
};

$(document).on('submit', 'form', Inicio.Controle.continuar);
Inicio.Controle.main();