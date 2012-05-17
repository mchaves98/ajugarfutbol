<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: UsuarioDB.php
*
*  Autor: Manuel Chaves
*  Fecha: 21/Dic/2011
*  
*  Contiene todass rutinas para leer provincias, cantones y distritos
*
*/

include("./Constantes.php");

class ubicacionDBExtJs
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

        public function getProvincias($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT * FROM Cat_Provincia")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;
	                
        }  // Fin de function getProvincias
                
//========================================================================================================================	

        public function getCantones($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT * FROM Cat_Canton")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}

		return $results;
	                
        }  // Fin de function getCantones
               
//========================================================================================================================	

        public function getDistritos($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT * FROM Cat_Distrito")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
               //echo 'hola mundo';
		return $results;
	                
        }  // Fin de function getDistritos
        
        
//========================================================================================================================	
             
        
} // Fin de la Clase ubicacionDBExtJs

?> 
