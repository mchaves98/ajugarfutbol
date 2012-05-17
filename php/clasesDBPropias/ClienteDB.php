<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: ClienteDB.php
*
*  Autor: Manuel Chaves
*  Fecha: 13/Marzo/2011 
*  
*  Contiene todos las rutinas para darle mantenimiento a las tablas relacionadas con el Objeto Cliente. 
*
*/

include("./Constantes.php");

class ClienteDB

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

//========================================================================================================================	

  public function getConsultaUnoCliente($params){
       $_db = $this->__construct();
       $id = $params->idUsuario;
       $idInstalacion = $params->idInstalacion;
       $id = (int) $id;
       $idInstalacion = (int) $idInstalacion;

       //Consulta
        $_result = $_db->query("SELECT
                                        `Persona`.`id`,
                                        `Persona`.`EMail`,
                                        `Persona`.`Nombre`,
                                        `Persona`.`Apellidos`,
                                        `Persona`.`NoCedula`,
                                        `Persona`.`TelCelular`,                                        
                                        `Persona`.`Telefono2`,
                                        `Persona`.`FechaNacimiento`,
                                        `Persona`.`Genero`,
                                        `Persona`.`FotoFile`,                                        
                                        `Cat_Provincia`.`DesLarga` as Provincia,
                                        `Cat_Canton`.`DesLarga` as Canton,
                                        `Cat_Distrito`.`DesLarga` as Distrito,
                                        `InstalacionClientes`.`NivelConfianza`,
                                        `InstalacionClientes`.`JuegaLun`,
                                        `InstalacionClientes`.`JuegaMar`,
                                        `InstalacionClientes`.`JuegaMie`,
                                        `InstalacionClientes`.`JuegaJue`,
                                        `InstalacionClientes`.`JuegaVie`,
                                        `InstalacionClientes`.`JuegaSab`,
                                        `InstalacionClientes`.`JuegaDom`,
                                        `InstalacionClientes`.`Comentario`
                                        
                                FROM    `Persona`
                                
                                 left join (`Cat_Provincia`,`Cat_Canton`,`Cat_Distrito`)
                                       on (`Persona`.`CodProv`=`Cat_Provincia`.`CodProv` and
                                           `Persona`.`CodCanton`=`Cat_Canton`.`CodCanton` and 
                                           `Persona`.`CodDist`=`Cat_Distrito`.`CodDist`)
                                           
                                 inner join (`InstalacionClientes`)
                                       on (`InstalacionClientes`.`IdPersona`=`Persona`.`id` and
                                           `InstalacionClientes`.`IdPersona`=".$id." and
                                           `InstalacionClientes`.`IdInstalacion`=".$idInstalacion.")") 
                
        
        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

        $results = array();                                              
        while ($row = $_result->fetch_assoc()) {
                array_push($results, $row);
        }
        $NoFilas = sizeof($results);

        $msj =  array('CantFilas'=>'');
        $msj['CantFilas']=$NoFilas;        

        $respuesta = array($msj,$results); 

        return $respuesta;
   }     
//========================================================================================================================	
        public function editaComentarioCliente($params){
        
            $_db = $this->__construct();            
            $idPersona = $params->idPersona;
            $idInstalacion = $params->idInstalacion;
            $comentario = $params->comentario; 
              
            //Actuliza usuarios que quedaron fuera de la lista de espera
            if($stmt = $_db->prepare("UPDATE InstalacionClientes SET Comentario=? WHERE IdPersona=? and IdInstalacion=?")) {                        
                $stmt->bind_param('sii',$comentario,$idPersona,$idInstalacion);	
                                
                $comentario = $_db->real_escape_string($comentario);
                $idPersona = (int) $idPersona;
                $idInstalacion = (int) $idInstalacion;                

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();                
                
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } 
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             } 

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function aprobarReservacionAdm  
        
//=============================================================================================================
        
        public function getCargaGridClientes($params){
        
 		$_db = $this->__construct();
                
                $sort   =  $_SESSION["sort"];
                $filter =  $_SESSION["filter"];
                $start  =  $_SESSION["start"];
                $limit  =  $_SESSION["limit"];
                
                $idInstalacion = $params->idInstalacion;
                $filtroNombre  = $params->filtroNombre;   
                $filtroLun     = $params->filtroLun;     
                $filtroMar     = $params->filtroMar;     
                $filtroMie     = $params->filtroMie;   
                $filtroJue     = $params->filtroJue;   
                $filtroVie     = $params->filtroVie;   
                $filtroSab     = $params->filtroSab;   
                $filtroDom     = $params->filtroDom;   
                
                $offsetx = $start;
                
                if ($start == 0) { // Primera Pagina.
                    $_SESSION["filtroNombre"] = '';
                    $_SESSION["idInstalacion"] = $idInstalacion;
                    $_SESSION["filtroDiasJuega"] =  ' AND (JuegaLun = '.$filtroLun.
                                                    ' OR  JuegaMar = '.$filtroMar.
                                                    ' OR  JuegaMie = '.$filtroMie.
                                                    ' OR  JuegaJue = '.$filtroJue.
                                                    ' OR  JuegaVie = '.$filtroVie.
                                                    ' OR  JuegaSab = '.$filtroSab.
                                                    ' OR  JuegaDom = '.$filtroDom.')';
                    if ($filtroNombre != null && $filtroNombre != '') {
                        $_SESSION["filtroNombre"]  =  " AND (Nombre like '%".$filtroNombre."%' OR Apellidos like '%".$filtroNombre."%')";}
                        
                    If ($filtroLun == 1 && $filtroMar == 1 && $filtroMie == 1 && $filtroJue == 1 &&
                        $filtroVie == 1 && $filtroSab == 1 && $filtroDom == 1) {$_SESSION["filtroDiasJuega"]='';}
                    
                    $SqlCmd = "SELECT B.id FROM InstalacionClientes as A, Persona as B
                                            WHERE A.IdPersona = B.id AND A.IdInstalacion = ".$_SESSION["idInstalacion"].
                                                       $_SESSION["filtroNombre"].$_SESSION["filtroDiasJuega"];    
                    $_result = $_db->query($SqlCmd)                                                       
                    or die($SqlCmd.'  Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    $_SESSION[cantidadRegistros] = $_result->num_rows; 
                }
                
                $SqlCmd = "SELECT *, CONCAT(Nombre,' ',Apellidos) AS NombreCompleto, '*' AS EsUsuario, '*' AS EsCliente, '*' AS TieneRolles
                                                  FROM InstalacionClientes as A, Persona as B
                                                  WHERE A.IdPersona = B.id AND A.IdInstalacion = ".$_SESSION["idInstalacion"].
                                                       $_SESSION["filtroNombre"].$_SESSION["filtroDiasJuega"].
                                                 " ORDER BY Nombre Asc, Apellidos Asc LIMIT ".$limit." OFFSET ".$offsetx;
                $_result = $_db->query($SqlCmd)                                                                                          
                or die($SqlCmd.'  Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $results = array();
                while ($row = $_result->fetch_assoc()) { 
                    // Averigua si es Usuario
                    $_resultx = $_db->query("SELECT id FROM Usuario WHERE IdPersona = ".$row["IdPersona"])                                                                                          
                    or die('Connect Error 03 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    if ($_resultx->num_rows == 0) {$row["EsUsuario"]='NO';} else {$row["EsUsuario"]='SI';}
                    // Averigua si es Cliente en otra Instalacion
                    $_resultx = $_db->query("SELECT id FROM InstalacionClientes WHERE IdPersona = ".$row["IdPersona"].
                                                            " AND IdInstalacion != ".$row["IdInstalacion"])                                                                                          
                    or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    if ($_resultx->num_rows == 0) {$row["EsCliente"]='NO';} else {$row["EsCliente"]='SI';}
                    // Averigua si tiene rolles en esta Instalacion
                    $_resultx = $_db->query("SELECT A.id FROM RolPersonaReservacion AS A, Cancha AS B 
                                                         WHERE A.IdPersona = ".$row["IdPersona"].
                                                         " AND A.IdCancha = B.id".
                                                         " AND B.IdInstalacion = ".$row["IdInstalacion"].
                                                         " AND A.FechaHoraFinal >= NOW()".
                                                         " AND A.Estado = 1")                                                                                          
                    or die('Connect Error 05 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    if ($_resultx->num_rows == 0) {$row["TieneRolles"]='NO';} else {$row["TieneRolles"]='SI';}
                    
                    array_push($results, $row); 
                    }
                
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
                
                $idInstalacion = $params->idInstalacion;
                $idPersona     = $params->idPersona;
                $esUsuario     = $params->esUsuario;
                $esCliente     = $params->esCliente;       
                
                // Borra el Cliente....
                $_result = $_db->query("DELETE FROM InstalacionClientes WHERE IdPersona = ".$idPersona.
                                                                         " AND IdInstalacion = ".$idInstalacion)
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
              
                // Borra la Persona si no es Usuario o Cliente en otra Instalacion....
                //if ($esUsuario == 'NO' && $esCliente == 'NO') {
                //            $_result = $_db->query("DELETE FROM Persona WHERE id = ".$idPersona)
                //            or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                //}
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR CLIENTE TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
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
                 
                $idInstalacion   = $params->idInstalacion;
                $idPersona       = $params->idPersona;
                $esUsuario       = $params->esUsuario;
                $esCliente       = $params->esCliente;
                $cambioCedula    = $params->cambioCedula;
                $cambioEMail     = $params->cambioEMail;
                // campos de la tabla personas
                $nombre          = $params->nombre;         
                $apellidos       = $params->apellidos;   
                $eMail           = $params->eMail;   
                $noCedula        = $params->noCedula;   
                $telCelular      = $params->telCelular;   
                $telefono2       = $params->telefono2;   
                $fechaNacimiento = $params->fechaNacimiento; 
                $genero          = $params->genero; 
                $codProv         = $params->codProv; 
                $codCanton       = $params->codCanton; 
                $codDist         = $params->codDist;
                // campos de la tabla InstalacionClientes
                $comentario      = $params->comentario;
                $nivelConfianza  = $params->nivelConfianza;
                $JuegaLun        = $params->juegaLun;
                $JuegaMar        = $params->juegaMar;
                $JuegaMie        = $params->juegaMie;
                $JuegaJue        = $params->juegaJue;
                $JuegaVie        = $params->juegaVie;
                $JuegaSab        = $params->juegaSab;
                $JuegaDom        = $params->juegaDom;
                
                if ($eMail == '') {$eMail=null;}
                if ($noCedula == '') {$noCedula=null;}
              
                if ($codProv==0 || $codProv=='')    {$codProv=null;}
                if ($codCanton==0 || $codCanton==''){$codCanton=null;}
                if ($codDist==0 || $codDist=='')    {$codDist=null;}
                
                if ($eMail == null && $noCedula == null) { throw new Exception("0007");}
                
                if ($eMail != null && $cambioEMail == '1') {
                        // Chequea que el nuevo EMail no exista.
                        $_resultx = $_db->query("SELECT id,Nombre,Apellidos FROM Persona WHERE EMail = '".$eMail."'")                                                                                          
                            or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                            if ($_resultx->num_rows != 0) {$row = $_resultx->fetch_assoc();
                                                           $idPersona=$row[id];
                                                           $nombreCliente=$row[Nombre].' '.$row[Apellidos];
                                                           throw new Exception("0005");
                            }
                }
                
                if ($noCedula != null && $cambioCedula == '1') {
                        // Chequea que la nueva cedula no exista.
                        $_resultx = $_db->query("SELECT id,Nombre,Apellidos FROM Persona WHERE NoCedula = '".$noCedula."'")                                                                                          
                            or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                            if ($_resultx->num_rows != 0) {$row = $_resultx->fetch_assoc();
                                                           $idPersona=$row[id];
                                                           $nombreCliente=$row[Nombre].' '.$row[Apellidos];
                                                           throw new Exception("0006");
                            }
                }
                
                
                // Actualiza la Tabla InstalacionesClientes
                if ($stmt = $_db->prepare("UPDATE InstalacionClientes SET   Comentario=?,
                                                                            NivelConfianza=?,
                                                                            JuegaLun=?,
                                                                            JuegaMar=?,
                                                                            JuegaMie=?,
                                                                            JuegaJue=?,
                                                                            JuegaVie=?,
                                                                            JuegaSab=?,
                                                                            JuegaDom=?
                                                   WHERE IdInstalacion=? AND IdPersona=?" )) {
			$stmt->bind_param('siiiiiiiiii', $comentario,
                                                         $nivelConfianza,
                                                         $JuegaLun,
                                                         $JuegaMar,
                                                         $JuegaMie,
                                                         $JuegaJue,
                                                         $JuegaVie,
                                                         $JuegaSab,
                                                         $JuegaDom,
                                                         $idInstalacion,
                                                         $idPersona);
                        $comentario = $_db->real_escape_string($comentario);
                        $nivelConfianza = (int) $nivelConfianza;
                        $JuegaLun = (int) $JuegaLun;
                        $JuegaMar = (int) $JuegaMar;
                        $JuegaMie = (int) $JuegaMie;
                        $JuegaJue = (int) $JuegaJue;
                        $JuegaVie = (int) $JuegaVie;
                        $JuegaSab = (int) $JuegaSab;
                        $JuegaDom = (int) $JuegaDom;
                        $idInstalacion = (int) $idInstalacion;
                        $idPersona = (int) $idPersona;
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
                     
                 // Actualiza la Tabla de Personas
                if ($stmt = $_db->prepare("UPDATE Persona SET Nombre=?,
                                                              Apellidos=?,
                                                              EMail=?,
                                                              NoCedula=?,
                                                              TelCelular=?,
                                                              Telefono2=?,
                                                              FechaNacimiento=?,
                                                              Genero=?,
                                                              CodProv=?,
                                                              CodCanton=?,
                                                              CodDist=?
                                                   WHERE id=?" )) {
			$stmt->bind_param('ssssssssiiii', $nombre,
                                                          $apellidos,
                                                          $eMail,
                                                          $noCedula,
                                                          $telCelular,
                                                          $telefono2,  
                                                          $fechaNacimiento,
                                                          $genero,
                                                          $codProv,
                                                          $codCanton,
                                                          $codDist,
                                                          $idPersona);
                        $nombre = $_db->real_escape_string($nombre);
                        $apellidos = $_db->real_escape_string($apellidos);
                        $eMail = $_db->real_escape_string($eMail);
                        $noCedula = $_db->real_escape_string($noCedula);
                        $telCelular = $_db->real_escape_string($telCelular);
                        $telefono2 = $_db->real_escape_string($telefono2);
                        $fechaNacimiento=(string)$fechaNacimiento;     
                        $genero = $_db->real_escape_string($genero);
                        $codProv = (int) $codProv;
                        $codCanton = (int) $codCanton;
                        $codDist = (int) $codDist;                        
                        $idPersona = (int) $idPersona;
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
		     } else {throw new Exception("0004");} 
                     
                     
                     
                     
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR en el Update en la Tabla InstalacionesClientes -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Prepare del Update en la Tabla InstalacionesClientes -  SqlState: '.$_db->sqlstate);
                       }
                       if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Update en la Tabla Personas -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el Prepare del Update en la Personas -  SqlState: '.$_db->sqlstate);
                       }
                     if ($e->getMessage()=="0005") {
                        $msj = array('codigoError'=>'0005','nombreYaExiste'=>$nombreCliente,'mensaje'=>'ERROR EMail Ya Existe en otro Cliente');
                       }
                     if ($e->getMessage()=="0006") {
                        $msj = array('codigoError'=>'0006','nombreYaExiste'=>$nombreCliente,'mensaje'=>'ERROR Cedula Ya Existe en otro Cliente');
                       }
                    if ($e->getMessage()=="0007") {
                        $msj = array('codigoError'=>'0007','mensaje'=>'ERROR Cedula y EMail no tienen datos');
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
                $nombreCliente = '';
                
                $idInstalacion   = $params->idInstalacion;
                $idPersona = 0;
                // campos de la tabla personas
                $nombre          = $params->nombre;         
                $apellidos       = $params->apellidos;   
                $eMail           = $params->eMail;   
                $noCedula        = $params->noCedula;   
                $telCelular      = $params->telCelular;   
                $telefono2       = $params->telefono2;   
                $fechaNacimiento = $params->fechaNacimiento; 
                $genero          = $params->genero; 
                $codProv         = $params->codProv; 
                $codCanton       = $params->codCanton; 
                $codDist         = $params->codDist;
                // campos de la tabla InstalacionClientes
                $comentario      = $params->comentario;
                $nivelConfianza  = $params->nivelConfianza;
                $JuegaLun        = $params->juegaLun;
                $JuegaMar        = $params->juegaMar;
                $JuegaMie        = $params->juegaMie;
                $JuegaJue        = $params->juegaJue;
                $JuegaVie        = $params->juegaVie;
                $JuegaSab        = $params->juegaSab;
                $JuegaDom        = $params->juegaDom;
                
                if ($eMail == '') {$eMail=null;}
                if ($noCedula == '') {$noCedula=null;}
              
                if ($codProv==0 || $codProv=='')    {$codProv=null;}
                if ($codCanton==0 || $codCanton==''){$codCanton=null;}
                if ($codDist==0 || $codDist=='')    {$codDist=null;}
                
                if ($eMail == null && $noCedula == null) { throw new Exception("0007");}
                
                $YaExiste=false;
                if ($eMail != null && $noCedula != null) {
                        $_resultx = $_db->query("SELECT id,Nombre,Apellidos FROM Persona WHERE NoCedula = '".$noCedula."' OR EMail = '".$eMail."'")                                                                                          
                            or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                            if ($_resultx->num_rows != 0) {$row = $_resultx->fetch_assoc();
                                                           $YaExiste=true; 
                                                           $idPersona=$row[id];
                                                           $nombreCliente=$row[Nombre].' '.$row[Apellidos];}
                } else { if ($noCedula == null) {
                              $_resultx = $_db->query("SELECT id,Nombre,Apellidos FROM Persona WHERE EMail = '".$eMail."'")                                                                                          
                              or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                              if ($_resultx->num_rows != 0) {$row = $_resultx->fetch_assoc();
                                                             $YaExiste=true; 
                                                             $idPersona=$row[id];
                                                             $nombreCliente=$row[Nombre].' '.$row[Apellidos];}
                         } else {
                                  $_resultx = $_db->query("SELECT id,Nombre,Apellidos FROM Persona WHERE NoCedula = '".$noCedula."'")                                                                                          
                                  or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                                  if ($_resultx->num_rows != 0) {$row = $_resultx->fetch_assoc();
                                                                 $YaExiste=true; 
                                                                 $idPersona=$row[id];
                                                                 $nombreCliente=$row[Nombre].' '.$row[Apellidos];}
                                }}
                
                if ($YaExiste) {   
                    $_resultx = $_db->query("SELECT id FROM InstalacionClientes WHERE IdPersona = ".$idPersona)                                                                                          
                        or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                        if ($_resultx->num_rows != 0) { throw new Exception("0001");}
                    
                    // Cliente no Existe como cliente en la Instalacion.    
                    // Actualiza la Tabla de Personas en el caso de que el Cliente nuevo ya Exista como persona.
                    if ($stmt = $_db->prepare("UPDATE Persona SET NoCedula=?,
                                                                  TelCelular=?,
                                                                  Telefono2=?
                                                   WHERE id=?" )) {
			$stmt->bind_param('sssi',$noCedula,
                                                 $telCelular,
                                                 $telefono2,  
                                                 $idPersona);
                        $noCedula = $_db->real_escape_string($noCedula);
                        $telCelular = $_db->real_escape_string($telCelular);
                        $telefono2 = $_db->real_escape_string($telefono2);
                        $idPersona = (int) $idPersona;
                        $stmt->execute();
                        $filas_afectadas = $stmt->affected_rows;
			$stmt->close();
                        if ($filas_afectadas != 1) {
                                       $msj['codigoError']="0000";
                                       $msj['mensaje']="DATOS NO CAMBIARON";
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="PROCESO DE ACTUALIZAR PERSONA TERMINO SATISFACTORIAMENTE";
                                       } 
		     } else {throw new Exception("0002");}
                     
                } else {  // El cliente nuevo no existe como Persona entonces se incluye. 
                          if ($stmt = $_db->prepare("INSERT INTO Persona (Nombre,Apellidos,EMail,NoCedula,TelCelular,Telefono2,
                                                                          FechaNacimiento,Genero,CodPais,CodProv,CodCanton,CodDist,FotoFile)
                                                                          VALUES (?,?,?,?,?,?,?,?,1,?,?,?,'desconocido.jpg')" )) {
                                        $stmt->bind_param('ssssssssiii',$nombre,
                                                                        $apellidos,
                                                                        $eMail,
                                                                        $noCedula,
                                                                        $telCelular,
                                                                        $telefono2,  
                                                                        $fechaNacimiento,
                                                                        $genero,
                                                                        $codProv,
                                                                        $codCanton,
                                                                        $codDist);
                                        $nombre = $_db->real_escape_string($nombre);
                                        $apellidos = $_db->real_escape_string($apellidos);
                                        $eMail = $_db->real_escape_string($eMail);
                                        $noCedula = $_db->real_escape_string($noCedula);
                                        $telCelular = $_db->real_escape_string($telCelular);
                                        $telefono2 = $_db->real_escape_string($telefono2);
                                        $fechaNacimiento=(string)$fechaNacimiento;     
                                        $genero = $_db->real_escape_string($genero);
                                        $codProv = (int) $codProv;
                                        $codCanton = (int) $codCanton;
                                        $codDist = (int) $codDist;                        
                                        $stmt->execute();
                                        $idPersona = $_db->insert_id;
                                        $filas_afectadas = $stmt->affected_rows;
                                        $stmt->close();
                                        if ($filas_afectadas != 1) {throw new Exception("0003");
                                                } else {
                                                            $msj['codigoError']="0000";
                                                            $msj['mensaje']="PROCESO DE ACTUALIZAR PERSONA TERMINO SATISFACTORIAMENTE";
                                                    } 
                                    } else {throw new Exception("0004");}

                } // Fin de Else de if (YaExiste)
                    
                // Insert en la Tabla InstalacionesClientes
                if ($stmt = $_db->prepare("INSERT INTO InstalacionClientes (IdInstalacion,
                                                                            IdPersona,
                                                                            Comentario,
                                                                            NivelConfianza,
                                                                            JuegaLun,
                                                                            JuegaMar,
                                                                            JuegaMie,
                                                                            JuegaJue,
                                                                            JuegaVie,
                                                                            JuegaSab,
                                                                            JuegaDom)
                                                   VALUES (?,?,?,?,?,?,?,?,?,?,?)")) {
			$stmt->bind_param('iisiiiiiiii', $idInstalacion,
                                                         $idPersona,
                                                         $comentario,
                                                         $nivelConfianza,
                                                         $JuegaLun,
                                                         $JuegaMar,
                                                         $JuegaMie,
                                                         $JuegaJue,
                                                         $JuegaVie,
                                                         $JuegaSab,
                                                         $JuegaDom);
                        $idInstalacion = (int) $idInstalacion;
                        $idPersona = (int) $idPersona;
                        $comentario = $_db->real_escape_string($comentario);
                        $nivelConfianza = (int) $nivelConfianza;
                        $JuegaLun = (int) $JuegaLun;
                        $JuegaMar = (int) $JuegaMar;
                        $JuegaMie = (int) $JuegaMie;
                        $JuegaJue = (int) $JuegaJue;
                        $JuegaVie = (int) $JuegaVie;
                        $JuegaSab = (int) $JuegaSab;
                        $JuegaDom = (int) $JuegaDom;
                        $stmt->execute();
                        $filas_afectadas = $stmt->affected_rows;
			$stmt->close();
                        if ($filas_afectadas != 1) {throw new Exception("0005");
                               } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="PROCESO DE INSERTAR CLIENTE TERMINO SATISFACTORIAMENTE";
                                       } 
		     } else {throw new Exception("0006");}
                     
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','nombreYaExiste'=>$nombreCliente,'mensaje'=>'ERROR Ya Existe este Cliente en su DB');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Prepare del Update en la tabla de Personas -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Insert en la tabla de Personas -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el Prepare del Insert en la tabla de Personas -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0005") {
                        $msj = array('codigoError'=>'0005','mensaje'=>'ERROR en el Insert en la tabla de InstalacionesClientes -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0006") {
                        $msj = array('codigoError'=>'00064','mensaje'=>'ERROR en el Prepare del Insert en la tabla de InstalacionesClientes -  SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0007") {
                        $msj = array('codigoError'=>'0007','mensaje'=>'ERROR Cedula y EMail no tienen datos');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de Incluir un Cliente Nuevo

//=========================================================================================================================        

	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();

		return $this;
        } // Fin de Function __destruct
        
        
} // Fin de la Clase UsuarioDB

?>