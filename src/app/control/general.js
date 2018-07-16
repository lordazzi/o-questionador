"use strict";

var General = {};
General.Servicos = {
	base: function(args){
		args.dataType = 'text';
		$.ajax(args);
	},

	getData: function(args){
		args.url	= "data/"+args.url;
		var success	= args.success;
		args.success = function(data){
			try {
				data = JSON.parse(data);
				success && success(data);
			} catch (e) {
				alert('Erro interno');
			}
		};

		General.Servicos.base(args);
	}
};

General.Controle = {
	getSession: function(){
		var Session		= localStorage.Session;
		try {
			Session		= JSON.parse(Session);
		} catch (e) {
			Session		= false; 
		}

		return Session;
	},

	setSession: function(Session){
		Session = JSON.stringify(Session);
		localStorage.Session = Session;
	},

	feedSession: function(feed){
		var Session = General.Controle.getSession();
		for (var attr in feed) {
			Session[attr] = feed[attr];
		}
		
		return General.Controle.setSession(Session);
	},

	clearSession: function(){
		delete localStorage.Session;
	}
};