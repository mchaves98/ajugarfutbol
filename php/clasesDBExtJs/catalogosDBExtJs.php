<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: UsuarioDB.php
*
*  Autor: Javier Mu�oz Chaves
*  Fecha: 28/Dic/2011
*  
*  Contiene todas rutinas para leer catalogos
*
*/

include("./Constantes.php");

class catalogosDBExtJs
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
        
        public function getTipoSuperficie($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT
                                                `Cat_TipoSuperficie`.`id`,
                                                `Cat_TipoSuperficie`.`Descripcion`,
                                                `Cat_TipoSuperficie`.`Orden`
                                        FROM 
                                                `Cat_TipoSuperficie`")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();                
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                                                
		return $results;	                
        }  // Fin de function getTipoSuperficie
        
//========================================================================================================================	
        
        public function getTipoCancha($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT
                                                `Cat_TipoFutbol`.`id`,
                                                `Cat_TipoFutbol`.`Descripcion`,
                                                `Cat_TipoFutbol`.`Orden`
                                        FROM 
                                                `Cat_TipoFutbol`")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getTipoCancha
        
 //========================================================================================================================	
        
        public function getTipoEquipoEdad($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT
                                                `Cat_TipoEquipoEdad`.`id`,
                                                `Cat_TipoEquipoEdad`.`Descripcion`,
                                                `Cat_TipoEquipoEdad`.`FileIcono`,
                                                `Cat_TipoEquipoEdad`.`Orden`
                                        FROM 
                                                `Cat_TipoEquipoEdad`
                                        ORDER BY 
                                                `Cat_TipoEquipoEdad`.`Orden`")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getTipoEquipoEdad
        
//========================================================================================================================	
        
        public function getTipoEquipoGenero($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT
                                                `Cat_TipoEquipoGenero`.`id`,
                                                `Cat_TipoEquipoGenero`.`Descripcion`,
                                                `Cat_TipoEquipoGenero`.`FileIcono`,
                                                `Cat_TipoEquipoGenero`.`Orden`
                                        FROM 
                                                `Cat_TipoEquipoGenero`
                                        ORDER BY 
                                                `Cat_TipoEquipoGenero`.`Orden`")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getTipoEquipoGenero

//========================================================================================================================	
        
        public function getTipoFutbol($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT
                                                `Cat_TipoFutbol`.`id`,
                                                `Cat_TipoFutbol`.`Descripcion`,
                                                `Cat_TipoFutbol`.`Orden`
                                        FROM 
                                                `Cat_TipoFutbol`
                                        ORDER BY 
                                                `Cat_TipoFutbol`.`Orden`        ")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getTipoFutbol

//========================================================================================================================	
        
        public function getVendedores($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT  id,
                                                NombreVendedor,
                                                ApellidosVendedor,
                                                CONCAT(NombreVendedor,' ',ApellidosVendedor) AS NombreCompletoVendedor,
                                                EstatusVendedor
                                        FROM AdmVendedor")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getVendedores

//========================================================================================================================	
        
        public function getStatusClientes($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT id,Descripcion FROM AdmCatStatusCliente ORDER BY Orden       ")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getStatusClientes

//========================================================================================================================	
        
        public function getStatusContratos($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT id,Descripcion FROM AdmCatStatusContrato ORDER BY Orden       ")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getStatusContratos
        
        
//========================================================================================================================	

        public function getClientes($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT id,NombreInstalacion FROM AdmCliente ORDER BY NombreInstalacion")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;	                
        }  // Fin de function getClientes

//========================================================================================================================	
            
        
}

?> 
