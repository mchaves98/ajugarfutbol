<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: UsuarioDB.php
*
*  Autor: Javier Mu�oz Chaves
*  Fecha: 28/Dic/2011
*  
*  Contiene todas rutinas para leer usuarios
*
*/

include("./Constantes.php");

class instalacionDBExtJs
{
	private $_db;
	protected $_result;
	public $results;

	public function __construct()
	{
		$_db = new mysqli(SERVIDOR, USUARIODB , PSW , DATABASE);
                          
		if ($_db->connect_error) {
			die('Connection Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
		}
                $acentos = $_db->query("SET NAMES 'utf8'");
		return $_db;
	}

//========================================================================================================================	
        
        public function getTodasInstalaciones($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT * FROM Instalacion")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;
	                
        }  // Fin de function getProvincias
}

?> 
