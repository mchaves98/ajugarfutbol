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

class usuarioDBExtJs
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
        
        public function getUsuarios($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT id,TipoUsuario,Password,EMail,Apodo,Nombre,Apellidos,NoCedula,TelCelular,FechaNacimiento,Genero,CodPais,CodCanton,CodDist,FotoFile,FechaRegistro,IPRegistro,
       CONCAT(Nombre,' ',Apellidos,' - Tel: ',TelCelular,' - Correo: ',EMail) as infoBasic FROM `Usuario` where TipoUsuario='R' and TipoUsuario='A'")
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                
		return $results;
	                
        }  // Fin de function getProvincias

	/*public function createRecord(stdClass $params)
	{

		$_db = $this->__construct();
		if($stmt = $_db->prepare("INSERT INTO owners (name, address, state) VALUES (?, ?, ?)")) {
				
			$stmt->bind_param('sss', $name, $address, $state);
				
			$name = $_db->real_escape_string($params->name);
			$address = $_db->real_escape_string($params->address);
			$state = $_db->real_escape_string($params->state);
				
			$stmt->execute();
				
			$params->id = $_db->insert_id;
				
			$stmt->close();
		}


		return $params;
	}

	public function updateRecords(stdClass $params)
	{
		$_db = $this->__construct();

		if ($stmt = $_db->prepare("UPDATE owners SET name=?, address=?, state=? WHERE id=?")) {
			$stmt->bind_param('sssi', $name, $address, $state, $id);

			$name = $_db->real_escape_string($params->name);
			$address = $_db->real_escape_string($params->address);
			$state = $_db->real_escape_string($params->state);
			//cast id to int
			$id = (int) $params->id;

			$stmt->execute();
				
			$stmt->close();
		}

		return $params;
	}

	public function destroyRecord(stdClass $params)
	{
		$_db = $this->__construct();

		$id = $params->id;

		if(is_numeric($id)) {
			if($stmt = $_db->prepare("DELETE FROM owners WHERE id = ? LIMIT 1")) {
				$stmt->bind_param('i', $id);
				$stmt->execute();
				$stmt->close();
			}
		}

		return $this;
	}*/
}

?> 
