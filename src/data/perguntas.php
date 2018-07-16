<?php
class Indice {
	private $cursor = 0;

	public function next() {
		$this->cursor++;
		return $this->cursor;
	}
}

$lastId = new Indice;
$createObject = function() use ($lastId) {
	return (object) array(
		"idquestao" => ($lastId->next()),

		"txtquestao" => "Analisando o seguinte código:\n <img src='data/oop.png' /> Você acredita que orientação objeto é uma coisa objetalmente orientada?",

		"alternatives" => array(
			(object) array(
				"isright" => false,

				"idalternativa" => 1,

				"txtalternativa" => "BEICON TENTE"
			),

			(object) array(
				"isright" => false,

				"idalternativa" => 2,

				"txtalternativa" => "BEICON SIGOMESMO"
			),

			(object) array(
				"isright" => true,

				"idalternativa" => 3,

				"txtalternativa" => "BEICON AVIDA"
			),

			(object) array(
				"isright" => false,

				"idalternativa" => 4,

				"txtalternativa" => "PONTO BEICAL"
			)
		)
	);
};

$root = (object) array( "time" => null, "temas" => null );
$root->time = (1000 * 60 * (60 + 30));
$root->temas = array(
	(object) array(
		"idtema" => 1,
		"txttema" => "Lógica",
		"nrpeso" => 10,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 2,
		"txttema" => "Sistemas e OOP",
		"nrpeso" => 7,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 3,
		"txttema" => "Html5",
		"nrpeso" => 10,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 4,
		"txttema" => "CSS",
		"nrpeso" => 10,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 5,
		"txttema" => "JavaScript básico",
		"nrpeso" => 3,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 6,
		"txttema" => "JavaScript avançado",
		"nrpeso" => 7,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 7,
		"txttema" => "JavaScript especialista",
		"nrpeso" => 10,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	),

	(object) array(
		"idtema" => 8,
		"txttema" => "Sencha Ext Js",
		"nrpeso" => 10,
		"questions" => array( $createObject(), $createObject(), $createObject(), $createObject(), $createObject() )
	)
);

echo json_encode($root)
?>