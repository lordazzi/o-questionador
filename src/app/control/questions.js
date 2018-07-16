var Questions = {};
$(function(){

	Questions.Servicos = {
		carregarQuestoes: function(call){
			General.Servicos.getData({
				url: 'perguntas.json',
				success: call
			});
		}
	};

	//	controles
	Questions.Controle = {
		main: function(){
			var Session	= General.Controle.getSession();
			$('[data-txtprova]').text('Avaliação de '+Session.txtprova);
			$('[data-txtavaliado]').text(Session.txtavaliado);

			Questions.Servicos.carregarQuestoes(function(data){
				var prova = Questions.Controle.criarJsonDaProva(data.temas);
				$lista = Questions.Controle.criarListaDeQuestoes(prova);
				$("[data-questions]").append($lista);
			});
		},

		criarJsonDaProva: function(temas){
			var prova	= [];
			var Session	= General.Controle.getSession();

			for (var i = 0; i < temas.length; i++) {
				var setter	= new Set;
				var tema	= temas[i];
				var questions= tema.questions;

				//	ou pegamos o total configurado, ou pegamos o número de questões disponíveis, caso seja menor que o configurado
				var total	= (questions.length < Session.nrquestoes) ? questions.length : Session.nrquestoes;

				while (setter.size != total) {
					var len		= questions.length;
					var decimal	= Math.random()*len;
					var random	= Math.floor(decimal);

					setter.add(random);
				}

				setter.forEach(function(q){
					var question	= questions[q];
					question.tema	= i;
					prova.push(question);
				});
			}

			General.Controle.feedSession({
				prova: prova
			});

			return prova;
		},

		criarListaDeQuestoes: function(lista){
			var tpl		= '<li data-question="{{i}}" class="question-link">{{n}}</li>';
			var $lista	= $();

			for (var i = 0; i < lista.length; i++) {
				var number	= (i+1).zerofill();
				var html	= Mustache.to_html(tpl, { i: i, n: number });
				$lista		= $lista.add(html);
			}

			return $lista;
		},

		pegarJsonDaQuestao: function($li){
			var i			= +$li.data("question");
			var Session		= General.Controle.getSession();
			var prova		= Session.prova;
			var questao		= prova[i];

			var enunciado	= questao.txtquestao;
			enunciado		= enunciado.split('\n');
			enunciado		= enunciado.join('</p><p>');
			enunciado		= '<p>' + enunciado + '</p>';
			var $span		= $('<span>');
			$span.html(enunciado);
			var $imgs		= $span.find('img');

			$imgs.each(function(){
				$(this).css({
					height:		250,
					display:	'block',
					margin:		'30px auto'
				});
			});

			var html		= $span.html();
			var json		= {
				i:		i,
				n:		(i + 1),
				txtquestao:		enunciado,
				alternatives:	questao.alternatives
			};

			return json;
		},

		abrirQuestao: function($li){
			var json		= Questions.Controle.pegarJsonDaQuestao($li);
			var template	= $("#template-da-questao").html();
			var html		= Mustache.to_html(template, json);

			$('main[role="main"]').html(html);
		}
	};

	//	delegações de evento
	$(document).on('click', '.question-link', function(){
		var $li	= $(this);
		Questions.Controle.abrirQuestao($li);
	});

	// execução de main
	Questions.Controle.main();
});