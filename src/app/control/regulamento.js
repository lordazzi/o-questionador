var Regulamento = {};

Regulamento.Controle = {
	main: function(){
		var Session = General.Controle.getSession();
		if (Session.isiniciado) {
			location.href = 'questions.html';
		}
	},

	iniciarProva: function(){
		General.Controle.feedSession({
			isiniciado: true
		});
		location.href = 'questions.html';
	}
};

$(document).on('click', 'button', Regulamento.Controle.iniciarProva);
Regulamento.Controle.main();