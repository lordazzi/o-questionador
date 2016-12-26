/**
 * @class String
 */

/**
 * @author Ricardo Azzi Silva <ricardo.azzi@viavarejo.com.br>
 *
 * @method format
 * Método de formatação equivalente ao Ext.String.format dos
 * frameworks da Sencha.
 *
 * Este método pode receber uma quantidade ilimitada de parâmetros,
 * repassando os parâmetros que recebeu para dentro da string, em
 * um estilo de concatenção semelhante ao do C.
 *
 * @example
 * "Agora são: {0} horas!".format(7);
 *
 * "The {0} is on the {1} or the {1} is on the {0}?".format('book', 'table');
 * 
 * @return {String}
 * Retorno da string formatada
 */
String.prototype.format = function(){
	var txt = this.valueOf();

	for (var i = 0; i < arguments.length; i++) {
		var rgx	= new RegExp("[{]["+i+"][}]", "g");
		txt		= txt.replace(rgx, arguments[i]);
	}

	return txt;
};

/**
 * @class Number
 */

/**
 * @author Ricardo Azzi Silva <ricardo.azzi@viavarejo.com.br>
 * 
 * @method zerofill
 *
 * Converte o número para string e adiciona
 * zeros a esquerda
 *
 * @example
 * (10).zerofill(3);
 * 
 * @param  {Number} [size=2]
 * Qual o tamanho máximo que o número deve conter, considerando
 * apenas o número inteiro e não as casas decimais
 * 
 * @return {String}
 * Número com os zeros a esquerda estabelecidos
 */
Number.prototype.zerofill = function(size){
	if (size == undefined) { size = 2; }

	var str		= this.valueOf();
	str			= String(str);
	var inteiro = str.split('.');
	var decimal = inteiro && inteiro[1] || false;
	inteiro		= inteiro && inteiro[0] || '0';

	while (inteiro.length < size)
		inteiro = "0" + inteiro;

	str			= inteiro + (decimal && ("."+decimal) || '');

	return str;
};

/**
 * @class Date
 */

/**
 * @author Ricardo Azzi Silva <ricardo.azzi@viavarejo.com.br>
 * 
 * @method format
 *
 * Função simples de formatação de data baseada na função 'date' do php.
 *
 * #d
 * Dia com zerofill de dois: 01, 02
 *
 * #m
 * Mês com zerofill de dois: 03, 10
 *
 * #y
 * Ano de duas casas: 99, 91, 00
 *
 * #Y
 * Ano completo: 1999, 1991, 2000
 *
 * #h
 * Hora com zerofill de dois: 12, 09
 *
 * #i
 * Minutos com zerofill de dois: 30, 05
 *
 * #s
 * Segundos com zerofill de dois: 59, 00
 *
 * @example
 * (new Date).format('d/m/Y h:i:s')
 * 
 * @param  {String} format
 * Forma como você deseja que sua string seja formatada
 * 
 * @return {String}
 * String formatada que representa uma data
 */
Date.prototype.format = function(format){
	var alias = {
		'{d}': function(d){ return d.getUTCDate().zerofill(); },
		'{M}': function(d){ return d.monthName[d.getUTCMonth()]; },
		'{m}': function(d){ return (d.getUTCMonth() + 1).zerofill(); },
		'{y}': function(d){ return String(d.getUTCFullYear()).substr(2); },
		'{Y}': function(d){ return String(d.getUTCFullYear()); },
		'{h}': function(d){ return d.getUTCHours().zerofill(); },
		'{i}': function(d){ return d.getUTCMinutes().zerofill(); },
		'{s}': function(d){ return d.getUTCSeconds().zerofill(); }
	};

	for (var flag in alias) {
		var rxp = new RegExp(flag, 'g');
		format = format.replace(rxp, alias[flag](this));
	}

	return format;
};

Date.prototype.monthName = [
	'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
	'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

/**
 * @class Array
 */

/**
 * @author Ricardo Azzi Silva <ricardo.azzi@viavarejo.com.br>
 * 
 * @method has
 * Retorna se existe ou não um valor dentro do Array
 * 
 * @param  {Anything}  value
 * O que você estiver pesquisando no array
 * 
 * @return {Boolean}
 * Retorna se sim ou se não encontrou o valor
 */
Array.prototype.has = function(value){
	return !(this.indexOf(value) === -1);
};

/**
 * @class File
 * Protótipo File nativo do javascript
 */

/**
 * @author Ricardo Azzi Silva <ricardo.azzi@viavarejo.com.br>
 * 
 * @method toBase64
 * Converte o conteúdo de um arquivo para base64
 * 
 * @param  {Function} callback
 * Quando o arquivo estiver convertido para base64, então o callback
 * é chamado. Existe necessidade de callback por que o objeto File
 * não garante necessáriamente que o arquivo esteja carregado
 */
File.prototype.toBase64 = function(callback){
	var file	= this;
	var fr		= new FileReader;

	fr.onload	= function(e){
		var text = e.target.result;
		if (callback && callback.prototype === Function)
			callback.apply(file, [ text ]);
	};

	fr.readAsDataURL(file);
};

/**
 * @class HTMLFormElement
 */

/**
 * @author Ricardo Azzi Silva <ricardo.azzi@viavarejo.com.br>
 *
 * @method getJson
 * Função resposável por retornar o modelo que um formulário
 * representa.
 *
 * Cada campo que conter um atributo 'name' será chamado para
 * entregar o valor e montar o json.
 * 
 * @return {Object}
 * Objeto json representando o formulário
 */
HTMLFormElement.prototype.getJson = function(){
	var form		= this;
	var pesquisar	= form.querySelectorAll && function(query) { return form.querySelectorAll(query); }
	pesquisar		= !pesquisar && function(query){ return $(query, this); } || pesquisar;
	var fields		= pesquisar('[name]');
	var json		= {}; 

	for (var i = 0; fields.length > i; i++) {
		var field		= fields[i];
		var nome		= field.getAttribute('name');
		var isArray		= !!nome.match(/\[\]$/);
		var nomes		= nome.split('.');
		var isInput		= (field instanceof HTMLInputElement);
		var type		= isInput && field.getAttribute('type');
		var isCheckable	= (type == 'checkbox' || type == 'radio');
		var isTextArea	= (field instanceof HTMLTextAreaElement);
		var root		= json;
		var dado;

		if (isTextArea)
			dado		= field.value || field.innerText;
		else if (isCheckable)
			dado		= (field.checked == true ? (field.value || true) : false);
		else 
			dado		= field.value;

		for (var j = 0; j < nomes.length; j++) {
			var isLastOne = (nomes.length-1)== j;

			if (isLastOne) {
				nome	= nomes[j];
				break;
			}

			if (root[nomes[j]] == undefined)
				root[nomes[j]]	= {};

			root			= root[nomes[j]];
		}

		if (isArray) {
			nome		= nome.replace(/\[\]$/, '');
			root[nome]	= root[nome] || [];

			root[nome].push(dado);
		} else {
			root[nome]	= dado;
		}
	}

	return json;
};

HTMLFormElement.prototype.setJson = function(data){
	var form		= this;
	var pesquisar	= form.querySelectorAll && function(query) { return form.querySelectorAll(query); }
	pesquisar		= !pesquisar && function(query){ return $(query, this); } || pesquisar;

	var setValue = function(name, value){
		var campos = pesquisar('[name="'+name+'"]');
		campos = campos && campos[0] || { value: 0 };
		campos.value = value;
	};

	!function namefy(root, json){
		for (var name in json) {
			if (json[name] && json[name].constructor === Object)
				namefy(root+name+'.', json[name]);
			else
				setValue(root+name, json[name]);
		}
	}('', data);
};