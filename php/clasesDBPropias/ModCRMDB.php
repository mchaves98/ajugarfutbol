<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: ModCRMDB.php
*
*  Autor: Manuel Chaves
*  Fecha: 26 Abril
*  
*  Contiene todos las rutinas para darle mantenimiento a las tablas relacionadas con el CRM System
*
*/

include("./Constantes.php");

class ModCRMDB

{
	private $_db;
	protected $_result;
	public $results;

	public function __construct()
	{
		$_db = new mysqli(SERVIDOR, USUARIODB , PSW , DATABASE);
                
                                        
		if ($_db->connect_error) {
			die('Connection Error Conexion ( ' .SERVIDOR.' '.USUARIODB.' '.PSW.' '.DATABASE.' '. $_db->connect_errno . ') ' . $_db->connect_error);
		}
                $acentos = $_db->query("SET NAMES 'utf8'");
		return $_db;
	}

//=========================================================================================================================        
//  CLIENTES
//=============================================================================================================
        
        public function getCargaGridClientes($params){
        
 		$_db = $this->__construct();
                
                $sort   =  $_SESSION["sort"];
                $filter =  $_SESSION["filter"];
                $start  =  $_SESSION["start"];
                $limit  =  $_SESSION["limit"];
                
                $filtroNombre  = $params->filtroNombre;   
                
                $offsetx = $start;
                
                if ($start == 0) { // Primera Pagina.
                    $_SESSION["filtroNombre"] = '';
                    if ($filtroNombre != null && $filtroNombre != '') {
                        $_SESSION["filtroNombre"]  =  " AND ( NombreInstalacion like '%" . $filtroNombre . "%' )";}
                    
                    $SqlCmd = "SELECT A.id FROM AdmCliente as A, AdmVendedor as B, AdmCatStatusCliente as C
                                            WHERE A.IdVendedor = B.id AND A.Estatus = C.id " . 
                                                  $_SESSION["filtroNombre"];    
                    $_result = $_db->query($SqlCmd)                                                       
                    or die($SqlCmd.'  Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    $_SESSION[cantidadRegistros] = $_result->num_rows; 
                }
                
                $SqlCmd = "SELECT  *, A.id AS id, A.id AS IdCliente, A.Estatus AS EstatusOriginal, A.FechaCambioEstatus AS FechaCambioEstatusOrg, 
                                   CONCAT(B.NombreVendedor,' ',B.ApellidosVendedor) AS NombreCompletoVendedor
                                                  FROM AdmCliente as A, AdmVendedor as B, AdmCatStatusCliente as C
                                                  WHERE A.IdVendedor = B.id AND A.Estatus = C.id " . 
                                                        $_SESSION["filtroNombre"].
                                                " ORDER BY NombreInstalacion Asc LIMIT ".$limit." OFFSET ".$offsetx;
                $_result = $_db->query($SqlCmd)                                                                                          
                or die($SqlCmd.'  Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                
                $msj[codigoError]='0000';
                $msj[mensaje]='';
                $msj[cantidadRegistros] = $_SESSION[cantidadRegistros];
                $respuesta = array($msj,$results);
		return $respuesta;
	                
        }  // Fin de function getTodosRegistros
        

//=========================================================================================================================        
       
        public function eliminarCliente(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idCliente     = $params->idCliente;    
                
                $SqlCmd = "SELECT id FROM AdmContrato WHERE id = " . $idCliente;  
                $_result = $_db->query($SqlCmd)                                                       
                or die($SqlCmd.'  Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) {throw new Exception("0001");}
                
                $SqlCmd = "SELECT id FROM AdmPago WHERE id = " . $idCliente; 
                $_result = $_db->query($SqlCmd)                                                       
                or die($SqlCmd.'  Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) {throw new Exception("0002");}
                
                $SqlCmd = "SELECT id FROM AdmContacto WHERE id = " . $idCliente; 
                $_result = $_db->query($SqlCmd)                                                       
                or die($SqlCmd.'  Connect Error 03 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) {throw new Exception("0003");}

                // Borra el Cliente....
                $_result = $_db->query("DELETE FROM AdmCliente WHERE id = ".$idCliente)
                or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
              
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR CLIENTE TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                   if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR Cliente tiene Contratos');
                   }
                   if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR Cliente tiene Pagos');
                   }
                   if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR Cliente tiene Contactos');
                   }
                   $results = array();
                   $repuesta = array($msj,$results);
                   return $repuesta;}
                
        } // Fin de elimina Cliente de una Instalacion	

//=========================================================================================================================        

  public function actualizarCliente(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                 
                $idCliente            = $params->idCliente;
                $nombreInstalacion    = $params->nombreInstalacion;
                $idInstalacion        = $params->idInstalacion ;
                $nombreLegal          = $params->nombreLegal;   
                $cedulaJuridica       = $params->cedulaJuridica;   
                $comentarioVendedor   = $params->comentarioVendedor; 
                $idVendedor           = $params->idVendedor; 
                $nombreDueno          = $params->nombreDueno; 
                $apellidosDueno       = $params->apellidosDueno;
                $eMailDueno           = $params->eMailDueno;
                $telefonoDueno        = $params->telefonoDueno;
                $nombreContacto       = $params->nombreContacto;
                $apellidosContacto    = $params->apellidosContacto;
                $eMailContacto        = $params->eMailContacto;
                $telefonoContacto     = $params->telefonoContacto;
                $fechaInicio          = $params->fechaInicio;
                $fechaTerminacion     = $params->fechaTerminacion;
                $codPais              = $params->codPais;
                $codProv              = $params->codProv;
                $codCanton            = $params->codCanton;
                $codDist              = $params->codDist;
                $estatus              = $params->estatus;
                $fechaCambioEstatus   = $params->fechaCambioEstatus;
                
                // Actualiza la Tabla AdmCliente
                if ($stmt = $_db->prepare("UPDATE AdmCliente SET   NombreInstalacion=?, 
                                                                   IdInstalacion=?, 
                                                                   IdVendedor=?,
                                                                   NombreLegal=?,                                                                   
                                                                   CedulaJuridica=?,
                                                                   ComentarioVendedor=?,
                                                                   NombreDueno=?,
                                                                   ApellidosDueno=?,
                                                                   EMailDueno=?, 
                                                                   TelefonoDueno=?, 
                                                                   NombreContacto=?,
                                                                   ApellidosContacto=?,
                                                                   EMailContacto=?, 
                                                                   TelefonoContacto=?,
                                                                   FechaInicio=?, 
                                                                   FechaTerminacion=?, 
                                                                   Estatus=?, 
                                                                   FechaCambioEstatus=?,
                                                                   CodPais=?,
                                                                   CodProv=?,
                                                                   CodCanton=?,
                                                                   CodDist=?
                                                   WHERE id=?" )) {
			$stmt->bind_param('siisssssssssssssisiiiii',
                                                                $nombreInstalacion,
                                                                $idInstalacion,
                                                                $idVendedor,
                                                                $nombreLegal,
                                                                $cedulaJuridica,
                                                                $comentarioVendedor,
                                                                $nombreDueno,
                                                                $apellidosDueno,
                                                                $eMailDueno,
                                                                $telefonoDueno,
                                                                $nombreContacto,
                                                                $apellidosContacto,
                                                                $eMailContacto,
                                                                $telefonoContacto,
                                                                $fechaInicio,
                                                                $fechaTerminacion,
                                                                $estatus,
                                                                $fechaCambioEstatus,
                                                                $codPais,
                                                                $codProv,
                                                                $codCanton,
                                                                $codDist,
                                                                $idCliente);
                                        $nombreInstalacion = $_db->real_escape_string($nombreInstalacion);
                                        $idInstalacion     = (int) ($idInstalacion);
                                        $idVendedor        = (int) ($idVendedor);
                                        $nombreLegal       = $_db->real_escape_string($nombreLegal);
                                        $cedulaJuridica    = $_db->real_escape_string($cedulaJuridica);
                                        $comentarioVendedor= $_db->real_escape_string($comentarioVendedor);
                                        $nombreDueno       = $_db->real_escape_string($nombreDueno);
                                        $apellidosDueno    = $_db->real_escape_string($apellidosDueno);
                                        $eMailDueno        = $_db->real_escape_string($eMailDueno);
                                        $telefonoDueno     = $_db->real_escape_string($telefonoDueno);
                                        $nombreContacto    = $_db->real_escape_string($nombreContacto);
                                        $apellidosContacto = $_db->real_escape_string($apellidosContacto);
                                        $eMailContacto     = $_db->real_escape_string($eMailContacto);
                                        $telefonoContacto  = $_db->real_escape_string($telefonoContacto);
                                        $fechaInicio       =(string)$fechaInicio; 
                                        $fechaTerminacion  =(string)$fechaTerminacion;  
                                        $fechaCambioEstatus=(string)$fechaCambioEstatus;  
                                        $estatus   = (int) $estatus;
                                        $codPais   = (int) $codPais;
                                        $codProv   = (int) $codProv;
                                        $codCanton = (int) $codCanton;
                                        $codDist   = (int) $codDist;    
                                        $idCliente = (int) $idCliente;
                        $stmt->execute();
                        $filas_afectadas = $stmt->affected_rows;
			$stmt->close();
                        if ($filas_afectadas != 1) {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="DATOS NO CAMBIARON";
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="PROCESO DE ACTUALIZAR CLIENTE TERMINO SATISFACTORIAMENTE";
                                       } 
		     } else {throw new Exception("0002");}
                     
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Prepare del Update en la Tabla InstalacionesClientes -  SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de elimina Cliente de una Instalacion	

//=========================================================================================================================        

  public function incluirCliente(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
                
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idCliente = 0;
                $nombreInstalacion    = $params->nombreInstalacion;
                $idInstalacion        = $params->idInstalacion ;
                $nombreLegal          = $params->nombreLegal;   
                $cedulaJuridica       = $params->cedulaJuridica;   
                $comentarioVendedor   = $params->comentarioVendedor; 
                $idVendedor           = $params->idVendedor; 
                $nombreDueno          = $params->nombreDueno; 
                $apellidosDueno       = $params->apellidosDueno;
                $eMailDueno           = $params->eMailDueno;
                $telefonoDueno        = $params->telefonoDueno;
                $nombreContacto       = $params->nombreContacto;
                $apellidosContacto    = $params->apellidosContacto;
                $eMailContacto        = $params->eMailContacto;
                $telefonoContacto     = $params->telefonoContacto;
                $fechaInicio          = $params->fechaInicio;
                $fechaTerminacion     = $params->fechaTerminacion;
                $codPais              = $params->codPais;
                $codProv              = $params->codProv;
                $codCanton            = $params->codCanton;
                $codDist              = $params->codDist;
                $estatus              = $params->estatus;
                $fechaCambioEstatus   = $params->fechaCambioEstatus;
                
                if ($stmt = $_db->prepare("INSERT INTO AdmCliente (NombreInstalacion, 
                                                                   IdInstalacion, 
                                                                   IdVendedor,
                                                                   NombreLegal,                                                                   
                                                                   CedulaJuridica,
                                                                   ComentarioVendedor,
                                                                   NombreDueno,
                                                                   ApellidosDueno,
                                                                   EMailDueno, 
                                                                   TelefonoDueno, 
                                                                   NombreContacto,
                                                                   ApellidosContacto,
                                                                   EMailContacto, 
                                                                   TelefonoContacto,
                                                                   FechaInicio, 
                                                                   FechaTerminacion, 
                                                                   Estatus, 
                                                                   FechaCambioEstatus,
                                                                   CodPais, CodProv, CodCanton, CodDist)
                                                     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" )) {
                                        $stmt->bind_param('siisssssssssssssisiiii',
                                                                $nombreInstalacion,
                                                                $idInstalacion,
                                                                $idVendedor,
                                                                $nombreLegal,
                                                                $cedulaJuridica,
                                                                $comentarioVendedor,
                                                                $nombreDueno,
                                                                $apellidosDueno,
                                                                $eMailDueno,
                                                                $telefonoDueno,
                                                                $nombreContacto,
                                                                $apellidosContacto,
                                                                $eMailContacto,
                                                                $telefonoContacto,
                                                                $fechaInicio,
                                                                $fechaTerminacion,
                                                                $estatus,
                                                                $fechaCambioEstatus,
                                                                $codPais,$codProv,$codCanton,$codDist);
                                        $nombreInstalacion = $_db->real_escape_string($nombreInstalacion);
                                        $idInstalacion     = (int) ($idInstalacion);
                                        $idVendedor        = (int) ($idVendedor);
                                        $nombreLegal       = $_db->real_escape_string($nombreLegal);
                                        $cedulaJuridica    = $_db->real_escape_string($cedulaJuridica);
                                        $comentarioVendedor= $_db->real_escape_string($comentarioVendedor);
                                        $nombreDueno       = $_db->real_escape_string($nombreDueno);
                                        $apellidosDueno    = $_db->real_escape_string($apellidosDueno);
                                        $eMailDueno        = $_db->real_escape_string($eMailDueno);
                                        $telefonoDueno     = $_db->real_escape_string($telefonoDueno);
                                        $nombreContacto    = $_db->real_escape_string($nombreContacto);
                                        $apellidosContacto = $_db->real_escape_string($apellidosContacto);
                                        $eMailContacto     = $_db->real_escape_string($eMailContacto);
                                        $telefonoContacto  = $_db->real_escape_string($telefonoContacto);
                                        $fechaInicio       =(string)$fechaInicio; 
                                        $fechaTerminacion  =(string)$fechaTerminacion;  
                                        $fechaCambioEstatus=(string)$fechaCambioEstatus;  
                                        $estatus   = (int) $estatus;
                                        $codPais   = (int) $codPais;
                                        $codProv   = (int) $codProv;
                                        $codCanton = (int) $codCanton;
                                        $codDist   = (int) $codDist;                        
                                        $stmt->execute();
                                        $idCliente = $_db->insert_id;
                                        $filas_afectadas = $stmt->affected_rows;
                                        $stmt->close();
                                        if ($filas_afectadas != 1) {throw new Exception("0003");
                                                } else {
                                                            $msj['codigoError']="0000";
                                                            $msj['mensaje']="PROCESO DE ACTUALIZAR PERSONA TERMINO SATISFACTORIAMENTE";
                                                    } 
                                    } else {throw new Exception("0004");}
     
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                   if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Insert en la tabla de AdmClientes -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el Prepare del Insert en la tabla de AdmClientes -  SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de Incluir un Cliente Nuevo

//=========================================================================================================================        
//  CONTRATOS
//=============================================================================================================
        
        public function getCargaGridContratos($params){
        
 		$_db = $this->__construct();
                
                $sort   =  $_SESSION["sort"];
                $filter =  $_SESSION["filter"];
                $start  =  $_SESSION["start"];
                $limit  =  $_SESSION["limit"];
                
                $filtroNombre  = $params->filtroNombre;   
                
                $offsetx = $start;
                
                if ($start == 0) { // Primera Pagina.
                    $_SESSION["filtroNombre"] = '';
                    if ($filtroNombre != null && $filtroNombre != '') {
                        $_SESSION["filtroNombre"]  =  " AND ( NombreInstalacion like '%" . $filtroNombre . "%' )";}
                    
                    $SqlCmd = "SELECT A.id FROM AdmContrato as A, AdmVendedor as B, AdmCliente as C, AdmCatStatusContrato as D
                                            WHERE A.IdVendedor = B.id AND A.IdCliente = C.id AND A.EstatusContrato = D.id " . 
                                                  $_SESSION["filtroNombre"];    
                    $_result = $_db->query($SqlCmd)                                                       
                    or die($SqlCmd.'  Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    $_SESSION[cantidadRegistros] = $_result->num_rows; 
                }
                
                $SqlCmd = "SELECT  *, A.id AS id, A.id AS IdContrato, A.EstatusContrato AS EstatusOriginal,
                                   A.FechaCambioEstatus AS FechaCambioEstatus, A.FechaCambioEstatus AS FechaCambioEstatusOrg, 
                                   CONCAT(B.NombreVendedor,' ',B.ApellidosVendedor) AS NombreCompletoVendedor
                                                  FROM AdmContrato as A, AdmVendedor as B, AdmCliente as C, 
                                                       AdmCatStatusContrato as D
                                                  WHERE A.IdVendedor = B.id AND A.IdCliente = C.id AND A.EstatusContrato = D.id " . 
                                                        $_SESSION["filtroNombre"].
                                                " ORDER BY NombreInstalacion Asc LIMIT ".$limit." OFFSET ".$offsetx;
                $_result = $_db->query($SqlCmd)                                                                                          
                or die($SqlCmd.'  Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                
                $msj[codigoError]='0000';
                $msj[mensaje]='';
                $msj[cantidadRegistros] = $_SESSION[cantidadRegistros];
                $respuesta = array($msj,$results);
		return $respuesta;
	                
        }  // Fin de function getCargaGridContratos
        

//=========================================================================================================================        
       
        public function eliminarContrato(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idContrato     = $params->idContrato;    
                
                $SqlCmd = "SELECT id FROM AdmPago WHERE IdContrato = " . $idContrato;  
                $_result = $_db->query($SqlCmd)                                                       
                or die($SqlCmd.'  Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) {throw new Exception("0002");}
                
                // Borra el Cotratoliente....
                $_result = $_db->query("DELETE FROM AdmContrato WHERE id = ".$idContrato)
                or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
              
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR CONTRATO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                   if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR Contrato tiene Pagos');
                   }
                   $results = array();
                   $repuesta = array($msj,$results);
                   return $repuesta;}
                
        } // Fin de elimina Cliente de una Instalacion	

//=========================================================================================================================        

  public function actualizarContrato(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                 
                $idContrato         = $params->idContrato;
                $noContrato         = $params->noContrato; 
                $idCliente          = $params->idCliente; 
                $idVendedor         = $params->idVendedor; 
                $porcComision       = $params->porcComision; 
                $fechaInicio        = $params->fechaInicio; 
                $fechaTermina       = $params->fechaTermina; 
                $fechaPrimerPago    = $params->fechaPrimerPago; 
                $cantidadCanchas    = $params->cantidadCanchas; 
                $cantidadUsuarios   = $params->cantidadUsuarios; 
                $montoMesDolares    = $params->montoMesDolares; 
                $mesesContrato      = $params->mesesContrato; 
                $pagaPrimerMes      = $params->pagaPrimerMes; 
                $cantidadPagos      = $params->cantidadPagos; 
                $fechaCambioEstatus = $params->fechaCambioEstatus; 
                $comentario         = $params->comentario; 
                $estatus            = $params->estatus; 
                $estatusOrginal     = $params->estatusOriginal;
                
                // Actualiza la Tabla AdmContrato
                if ($stmt = $_db->prepare("UPDATE AdmContrato SET   NoContrato=?,
                                                                    IdCliente=?,
                                                                    IdVendedor=?,
                                                                    PorcComision=?,
                                                                    CantidadCanchas=?,
                                                                    CantidadUsuarios=?,
                                                                    MontoMesDolares=?,
                                                                    MesesContrato=?,
                                                                    PagaPrimerMes=?,
                                                                    CantidadPagos=?,
                                                                    FechaInicioContrato=?,
                                                                    FechaTerminaContrato=?,
                                                                    FechaCambioEstatus=?,
                                                                    FechaPrimerPago=?,
                                                                    ComentarioContrato=?,
                                                                    EstatusContrato=?
                                                   WHERE id=?" )) {
			$stmt->bind_param('iiiiiiiisisssssii',
                                                                    $noContrato,
                                                                    $idCliente,
                                                                    $idVendedor,
                                                                    $porcComision,
                                                                    $cantidadCanchas,
                                                                    $cantidadUsuarios,
                                                                    $montoMesDolares,
                                                                    $mesesContrato,
                                                                    $pagaPrimerMes,
                                                                    $cantidadPagos,
                                                                    $fechaInicio,
                                                                    $fechaTermina,
                                                                    $fechaCambioEstatus,
                                                                    $fechaPrimerPago,
                                                                    $comentario,
                                                                    $estatus,
                                                                    $idContrato);
                                        $noContrato         = (int) ($noContrato);
                                        $idCliente          = (int) ($idCliente);
                                        $idVendedor         = (int) ($idVendedor);
                                        $porcComision       = (int) ($porcComision);
                                        $cantidadCanchas    = (int) ($cantidadCanchas);
                                        $cantidadUsuarios   = (int) ($cantidadUsuarios);
                                        $montoMesDolares    = (int) ($montoMesDolares);
                                        $mesesContrato      = (int) ($mesesContrato);
                                        $pagaPrimerMes      = $_db->real_escape_string($pagaPrimerMes);
                                        $cantidadPagos      = (int) ($cantidadPagos);
                                        $fechaInicio        = (string) $fechaInicio; 
                                        $fechaTermina       = (string) $fechaTermina;  
                                        $fechaCambioEstatus = (string) $fechaCambioEstatus;  
                                        $fechaPrimerPago    = (string) $fechaPrimerPago;  
                                        $comentario         = $_db->real_escape_string($comentario);
                                        $estatus            = (int) $estatus;
                                        $idContrato         = (int) $idContrato;
                        $stmt->execute();
                        $filas_afectadas = $stmt->affected_rows;
			$stmt->close();
                        if ($filas_afectadas != 1) {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="DATOS NO CAMBIARON";
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="PROCESO DE ACTUALIZAR CONTRATO TERMINO SATISFACTORIAMENTE";
                                       } 
		     } else {throw new Exception("0002");}
                     
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Prepare del Update en la Tabla AdmContratos SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de elimina Cliente de una Instalacion	

//=========================================================================================================================        

  public function incluirContrato(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
                
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idContrato         = 0;
                $noContrato         = $params->noContrato; 
                $idCliente          = $params->idCliente; 
                $idVendedor         = $params->idVendedor; 
                $porcComision       = $params->porcComision; 
                $fechaInicio        = $params->fechaInicio; 
                $fechaTermina       = $params->fechaTermina; 
                $fechaPrimerPago    = $params->fechaPrimerPago; 
                $cantidadCanchas    = $params->cantidadCanchas; 
                $cantidadUsuarios   = $params->cantidadUsuarios; 
                $montoMesDolares    = $params->montoMesDolares; 
                $mesesContrato      = $params->mesesContrato; 
                $pagaPrimerMes      = $params->pagaPrimerMes; 
                $cantidadPagos      = $params->cantidadPagos; 
                $fechaCambioEstatus = $params->fechaCambioEstatus; 
                $comentario         = $params->comentario; 
                $estatus            = $params->estatus; 
                $estatusOrginal     = $params->estatusOriginal;
                
                $SqlCmd = "SELECT id FROM AdmContrato WHERE IdCliente = " . $idCliente . 
                                                       " AND FechaInicioContrato = '" . $fechaInicio ."'";    
                $_result = $_db->query($SqlCmd)                                                       
                or die($SqlCmd.'  Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) {throw new Exception("0001");}
                
                $SqlCmd = "SELECT id FROM AdmContrato WHERE NoContrato = " . $noContrato;    
                $_result = $_db->query($SqlCmd)                                                       
                or die($SqlCmd.'  Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) {throw new Exception("0002");}
              
              
                if ($stmt = $_db->prepare("INSERT INTO AdmContrato (NoContrato,
                                                                    IdCliente,
                                                                    IdVendedor,
                                                                    PorcComision,
                                                                    CantidadCanchas,
                                                                    CantidadUsuarios,
                                                                    MontoMesDolares,
                                                                    MesesContrato,
                                                                    PagaPrimerMes,
                                                                    CantidadPagos,
                                                                    FechaInicioContrato,
                                                                    FechaTerminaContrato,
                                                                    FechaCambioEstatus,
                                                                    FechaPrimerPago,
                                                                    ComentarioContrato,
                                                                    EstatusContrato)
                                                     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" )) {
                                        $stmt->bind_param('iiiiiiiisisssssi',
                                                                    $noContrato,
                                                                    $idCliente,
                                                                    $idVendedor,
                                                                    $porcComision,
                                                                    $cantidadCanchas,
                                                                    $cantidadUsuarios,
                                                                    $montoMesDolares,
                                                                    $mesesContrato,
                                                                    $pagaPrimerMes,
                                                                    $cantidadPagos,
                                                                    $fechaInicio,
                                                                    $fechaTermina,
                                                                    $fechaCambioEstatus,
                                                                    $fechaPrimerPago,
                                                                    $comentario,
                                                                    $estatus);
                                        $noContrato         = (int) ($noContrato);
                                        $idCliente          = (int) ($idCliente);
                                        $idVendedor         = (int) ($idVendedor);
                                        $porcComision       = (int) ($porcComision);
                                        $cantidadCanchas    = (int) ($cantidadCanchas);
                                        $cantidadUsuarios   = (int) ($cantidadUsuarios);
                                        $montoMesDolares    = (int) ($montoMesDolares);
                                        $mesesContrato      = (int) ($mesesContrato);
                                        $pagaPrimerMes      = $_db->real_escape_string($pagaPrimerMes);
                                        $cantidadPagos       = (int) ($cantidadPagos);
                                        $fechaInicio        = (string) $fechaInicio; 
                                        $fechaTermina       = (string) $fechaTermina;  
                                        $fechaCambioEstatus = (string) $fechaCambioEstatus;  
                                        $fechaPrimerPago    = (string) $fechaPrimerPago;  
                                        $comentario         = $_db->real_escape_string($comentario);
                                        $estatus            = (int) $estatus;
                                        $stmt->execute();
                                        $idCliente = $_db->insert_id;
                                        $filas_afectadas = $stmt->affected_rows;
                                        $stmt->close();
                                        if ($filas_afectadas != 1) {throw new Exception("0003");
                                                } else {
                                                            $msj['codigoError']="0000";
                                                            $msj['mensaje']="PROCESO DE ACTUALIZAR PERSONA TERMINO SATISFACTORIAMENTE";
                                                    } 
                                    } else {throw new Exception("0004");}
     
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR ya existe un contrato para este Cliente con la misma Fecha de Inicio.');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR ya existe un contrato con este mismo Número de Contrato.');
                       }
                   if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Insert en la tabla de AdmContratos -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el Prepare del Insert en la tabla de AdmContratos -  SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de Incluir un Contrato Nuevo

//=========================================================================================================================        
// PAGOS
//=========================================================================================================================        

  public function generarPagosContrato(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
                
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idContrato         = 0;
                $noContrato         = $params->noContrato; 
                $idCliente          = $params->idCliente; 
                $idVendedor         = $params->idVendedor; 
                $porcComision       = $params->porcComision; 
                $fechaInicio        = $params->fechaInicio; 
                $fechaTermina       = $params->fechaTermina; 
                $fechaPrimerPago    = $params->fechaPrimerPago; 
                $cantidadCanchas    = $params->cantidadCanchas; 
                $cantidadUsuarios   = $params->cantidadUsuarios; 
                $montoMesDolares    = $params->montoMesDolares; 
                $mesesContrato      = $params->mesesContrato; 
                $pagaPrimerMes      = $params->pagaPrimerMes; 
                $cantidadPagos      = $params->cantidadPagos; 
                $fechaCambioEstatus = $params->fechaCambioEstatus; 
                $comentario         = $params->comentario; 
                $estatus            = $params->estatus; 
                $estatusOrginal     = $params->estatusOriginal;
                
                
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR ya existe un contrato para este Cliente con la misma Fecha de Inicio.');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR ya existe un contrato con este mismo Número de Contrato.');
                       }
                   if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Insert en la tabla de AdmContratos -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el Prepare del Insert en la tabla de AdmContratos -  SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de GenerarPagosContrato

//=========================================================================================================================        
        
        
        
	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();

		return $this;
        } // Fin de Function __destruct
        
        
} // Fin de la Clase ModCRMDB

?>