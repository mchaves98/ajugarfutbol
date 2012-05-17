<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: UsuarioDB.php
*
*  Autor: Manuel Chaves
*  Fecha: 15/Dic/2011 
*  
*  Contiene todos las rutinas para darle mantenimiento a las tablas relacionadas con el Objeto Usuario. 
*
*/

include("./Constantes.php");
require_once("Mail.php");

class UsuarioDB

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

        public function getTodosRegistros($params){
        
 		$_db = $this->__construct();
                
                $_result = $_db->query("SELECT EMail, NoCedula, Nombre, Apellidos,Apodo,TelCelular,Genero,CodProv,CodCanton,CodDist,A.FechaRegistro 
                                                  FROM Usuario as A, Persona as B where A.IdPersona = B.id") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                $results = array();
                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}

		return $results;
	                
        }  // Fin de function getTodosRegistros
        
        
//========================================================================================================================
        
         public function getConsultaUno($params){
                
                $msj = array(codigoError=>'0000',mensaje=>'',sesionId=>session_id(), sesUsuario=>$_SESSION["UsuarioId"]);
                if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado',sesionId=>session_id());
                    $results = array();
                    $respuesta = array($msj,$results);     
                    return $respuesta;	               
	        } else {   
                
                // Usuario ya ingresado. 
                $_db = $this->__construct();
                
                $correo = $params->correo;
                
                $_result = $_db->query("SELECT EMail, NoCedula, Nombre, Apellidos, Apodo, TelCelular, FechaNacimiento,
                                               Genero, CodProv, CodCanton, CodDist, FotoFile, TipoUsuario 
                                               FROM Usuario as A, Persona as B
                                               WHERE EMail='".$correo."' AND A.IdPersona = B.id") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $respuesta = array($msj,$results);     
                return $respuesta;
                
                } // Fin de IF Sesion
                
        }  // Fin de function getConsultaUno
             
//========================================================================================================================	
        
        public function reIngreso($params){
                
                try {
            
                $msj = array(codigoError=>'0000', mensaje=>'', sesionId=>session_id(), token=>'', SesUsuarioId=>'', SesEmail=>'',
                             idInstalacion=>'', nombreInstalacion=>'', direccion=>'', telefono=>'', encargado=>'', correo=>'', modoReservacion=>'');
                
                $_db = $this->__construct();
                $idUsuario = $params->id;
                $_result = $_db->query("SELECT A.IdPersona as id, EMail, NoCedula, Nombre, Apellidos, Apodo, TelCelular, FechaNacimiento,
                                                      Genero, CodProv, CodCanton, CodDist, FotoFile, TipoUsuario, Password, EsJSoluciones 
                                                      FROM Usuario as A, Persona as B where IdPersona='".$idUsuario."' AND A.IdPersona = B.id") 
                or die('Connect Error01 (' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}                
                if ( sizeof($results) == 0 ) { throw new Exception("0003"); }
                
                $token = $_COOKIE['Token'];
                $sqlCmd = "SELECT IdUsuario, Password FROM Token WHERE Token ='".$token."'";
                $_result = $_db->query($sqlCmd) 
                or die('Connect Error 05 (' . $_db->connect_errno . ') ' . $_db->connect_error.' '.$sqlCmd);                                                
                $results_Token = array();
                while ($row = $_result->fetch_assoc()) {array_push($results_Token, $row);}                
                if ( sizeof($results_Token) == 0 ) { throw new Exception("0004"); }
               
                if( $results[0]["id"] !== $results_Token[0]["IdUsuario"] )      {throw new Exception("0001");}
                if( $results[0]["Password"] !== $results_Token[0]["Password"] ) {throw new Exception("0002");}
                $results[0]["Password"]='';
                
                // Reinicia Sesion 
                $_SESSION["UsuarioId"] = $results[0]["id"];
                $_SESSION["UsuarioNombre"] = $results[0]["Nombre"]; 
                $_SESSION["UsuarioApellidos"] =  $results[0]["Apellidos"]; 
                $_SESSION["UsuarioEMail"] = $results[0]["EMail"]; 
                $_SESSION["UsuarioTipoUsuario"] = $results[0]["TipoUsuario"];
                
                setcookie("UsuarioFoto", $results[0]["FotoFile"], time()+36000000,"/");
                $msj[token] = $token;
                
                if ($results[0]["TipoUsuario"] == 'A') {
                    // Usuario es Administrador de una o varias instalaciones    
                    $_result = $_db->query("SELECT A.Orden, A.IdInstalacion, B.NombreContacto, B.NombreInst, B.Telefono1, B.EMailContac, B.MetodoReservacion,
                                                   C.DesLarga as Provincia, D.DesLarga as Canton, E.DesLarga as Distrito  
                                                   FROM InstalacionAdministradores as A, Instalacion as B, 
                                                        Cat_Provincia as C, Cat_Canton as D, Cat_Distrito as E 
                                                   WHERE A.IdUsuario = '".$idUsuario."' AND 
                                                         A.IdInstalacion = B.id AND
                                                         (B.CodPais  = C.CodPais AND  B.CodProv = C.CodProv) AND  
                                                         (B.CodPais  = D.CodPais AND  B.CodProv = D.CodProv AND B.CodCanton = D.CodCanton) AND
                                                         (B.CodPais  = E.CodPais AND  B.CodProv = E.CodProv AND B.CodCanton = E.CodCanton AND B.CodDist = E.CodDist) AND
                                                         B.Status = '1' 
                                                   ORDER BY A.Orden Asc
                                                   LIMIT 1") 
                    or die('Connect Error02 (' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                    $instalacionQueAdministra = array();
                    while ($row = $_result->fetch_assoc()) {array_push($instalacionQueAdministra, $row);}
                    if (sizeof($instalacionQueAdministra) > 0) {
                        $msj[idInstalacion]       = $instalacionQueAdministra[0]["IdInstalacion"];
                        $msj[nombreInstalacion]   = $instalacionQueAdministra[0]["NombreInst"];
                        $msj[direccion]           = $instalacionQueAdministra[0]["Distrito"].', '.
                                                    $instalacionQueAdministra[0]["Canton"].' de '.
                                                    $instalacionQueAdministra[0]["Provincia"];
                        $msj[encargado]           = $instalacionQueAdministra[0]["NombreContacto"];
                        $msj[correo]              = $instalacionQueAdministra[0]["EMailContac"];
                        $msj[telefono]            = $instalacionQueAdministra[0]["Telefono1"];
                        $msj[modoReservacion]     = $instalacionQueAdministra[0]["MetodoReservacion"];
                    }
                    
                }
                // Obtiene canchas favoritas del Usuario.    
                $_result = $_db->query("SELECT B.id, B.NombreInst FROM UsuarioInstalaciones as A, Instalacion as B 
                                               where A.IdInstalacion = B.id AND IdUsuario=".$idUsuario) 
                or die('Connect Error 03(' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                $instalacionesFavoritas = array();
                while ($row = $_result->fetch_assoc()) {array_push($instalacionesFavoritas, $row);}                
                $cantidadInstalaciones = sizeof($instalacionesFavoritas);
                $msj[codigoError]='0000';
                $msj[mensaje]='';
                $msj[cantidadInstalaciones]=$cantidadInstalaciones;
                $respuesta = array($results,$instalacionesFavoritas);
                $respuesta = array($msj,$respuesta);
                return $respuesta;
                }   // Fin del try
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR El Id del Usuario no corresponde al Token');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR El Password de este Usuario fue modificado');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR El Id del Usuario ya no existe');
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR El Token para este Usuarion ya no existe');
                       }
                   $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        }  // Fin de function reIngreso.

//========================================================================================================================	
        
        public function validarToken ($params){
                
                try {
            
                $msj = array(codigoError=>'0000', mensaje=>'');
                
                $_db = $this->__construct();
                $idUsuario = $params->id;
                $token = $params->token;
                
                $sqlCmd = "SELECT Password FROM Usuario WHERE IdPersona = ".$idUsuario;
                $_result = $_db->query($sqlCmd) 
                or die('Connect Error01 (' . $_db->connect_errno . ') ' . $_db->connect_error.' '.$sqlCmd);                                                
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}                
                if ( sizeof($results) == 0 ) { throw new Exception("0001"); }
                
                $sqlCmd = "SELECT Password FROM Token WHERE IdUsuario = ".$idUsuario." AND Token ='".$token."'";
                $_result = $_db->query($sqlCmd) 
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error.' '.$sqlCmd);                                                
                $results_Token = array();
                while ($row = $_result->fetch_assoc()) {array_push($results_Token, $row);}                
                if ( sizeof($results_Token) == 0 ) { throw new Exception("0002"); }
               
                if( $results[0]["Password"] !== $results_Token[0]["Password"] ) {throw new Exception("0001");}
                $results[0]["Password"]='';
 
                $results = array();
                $respuesta = array($msj,$results);
                return $respuesta;
                }   // Fin del try
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'Usuario no existe en tabla Usuario.  El Usuario Perdio el Token');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'Token no existe en tabla Token. El Usuario Perdio el Token');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'El Password fue modificado.  El Usuario Perdio el Token');
                       }   
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        }  // Fin de function validarToken
        
//========================================================================================================================	

        public function validarIngreso($params){
        
                try {
                    
                $_db = $this->__construct();
                
                date_default_timezone_set("America/Costa_Rica");
                
                $correo = $params->correo;
                $contrasena = $params->param1;
                
                $contrasena = substr($contrasena,10,16).substr($contrasena,36,16);
                
                $chkNoCerrarSesion = $params->chkNoCerrarSesion;
                
                $instalacionesFavoritas = array();
                            
                $_result = $_db->query("SELECT A.IdPersona as id,Nombre,Apellidos,TipoUsuario,Password,EMail,FotoFile,EsJSoluciones 
                                               FROM Usuario as A, Persona as B where B.EMail = '".$correo."' AND A.IdPersona = B.id") 
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row); }
                $NoFilas = sizeof($results);
                
                $msj = array(codigoError=>'', mensaje=>'', sessionId=>'',
                             idInstalacion=>'', nombreInstalacion=>'', direccion=>'', telefono=>'', encargado=>'', correo=>'', modoReservacion=>'');
             
                if($NoFilas == 0)
                    { $msj[codigoError]="0001";
                      $msj[mensaje]="Usuario no Existe";
                    }
                else {if($contrasena !== $results[0]["Password"])
                         { $msj[codigoError]="0002"; 
                           $msj[mensaje]="Contrasena Invalida";
                         }
                     else {if ($results[0]["TipoUsuario"] == 'P')
                             {$msj[codigoError]="0003";
                              $msj[mensaje]="Cuenta no ha sido activada";
                             }
                         else
                         { $msj[codigoError]="0000";
                           $msj[mensaje]="Usuario correcto puede Ingresar";
                           
                           $_SESSION["UsuarioId"] = $results[0]["id"];
                           $_SESSION["UsuarioNombre"] = $results[0]["Nombre"]; 
                           $_SESSION["UsuarioApellidos"] =  $results[0]["Apellidos"]; 
                           $_SESSION["UsuarioEMail"] = $results[0]["EMail"]; 
                           $_SESSION["UsuarioTipoUsuario"] = $results[0]["TipoUsuario"];
                           
                           if ($_COOKIE['ContadorUsuarios']>=1) {
                                $ContadorUsuarios = $_COOKIE['ContadorUsuarios'];
                                $seEncontro = 0;
                                for ($i=1; $i<=$ContadorUsuarios; $i++) {
                                         if ($_COOKIE['ListUsuarios'.$i] == $results[0]["EMail"]) {
                                                 $seEncontro = 1;
                                                 break;
                                                 }
                                         }
                                if ($seEncontro == 0) {         
                                     $ContadorUsuarios = $_COOKIE['ContadorUsuarios'] + 1;
                                     setcookie("ListUsuarios".$ContadorUsuarios, $results[0]["EMail"] ,time()+36000000,"/");
                                     setcookie("ContadorUsuarios",$ContadorUsuarios, time()+36000000,"/");
                                     }
                           } else {
                                   $ContadorUsuarios=1;
                                   setcookie("ListUsuarios1", $results[0]["EMail"], time()+36000000,"/");
                                   setcookie("ContadorUsuarios", 1, time()+36000000,"/");
                                   }
                                   
                           if ($chkNoCerrarSesion=='true') {
                               $token = date('YmdGis').session_id();
                               $idusuario = $results[0]["id"];
                               $password = $results[0]["Password"];
                               setcookie("UsuarioId", $results[0]["id"], time()+36000000,"/");
                               setcookie("UsuarioEmail", $results[0]["EMail"], time()+36000000,"/");
                               setcookie("UsuarioFoto", $results[0]["FotoFile"], time()+36000000,"/");
                               setcookie("Token", $token, time()+36000000,"/");
                               if($stmt = $_db->prepare("INSERT INTO Token (Token,IdUsuario,Password) VALUES (?,?,?)")) {
                                        $stmt->bind_param('sis',$token,$idusuario,$password);
                                        $token = $_db->real_escape_string($token);
                                        $password = $_db->real_escape_string($password);
                                        $stmt->execute();
                                        $filas_afectadas = $stmt->affected_rows;
                                        $stmt->close();
                                        if ($filas_afectadas != 1) {throw new Exception("0001");}
                                    } else { throw new Exception("0002");} 
                               } else {
                                        $token = date('YmdGis').session_id();
                                        setcookie("UsuarioEmail", "",time()-120,"/");
                                        setcookie("UsuarioFoto", "",time()-120,"/");
                                        setcookie("Token", $token, 0,"/");
                                        setcookie("UsuarioId", $results[0]["id"], 0,"/");
                                        $idusuario = $results[0]["id"];
                                        $password = $results[0]["Password"];
                                        if($stmt = $_db->prepare("INSERT INTO Token (Token,IdUsuario,Password) VALUES (?,?,?)")) {
                                                    $stmt->bind_param('sis',$token,$idusuario,$password);
                                                    $token = $_db->real_escape_string($token);
                                                    $password = $_db->real_escape_string($password);
                                                    $stmt->execute();
                                                    $filas_afectadas = $stmt->affected_rows;
                                                    $stmt->close();
                                                    if ($filas_afectadas != 1) {throw new Exception("0001");}
                                                } else { throw new Exception("0002");} 

                                         } 

                               $idUsuario= $results[0]["id"]; 
                               if ($results[0]["TipoUsuario"] == 'A') {
                                     // Usuario es Administrador de una o varias instalaciones    
                                     $_result = $_db->query("SELECT A.Orden, A.IdInstalacion, B.NombreContacto, B.NombreInst, B.Telefono1, B.EMailContac, B.MetodoReservacion,
                                                   C.DesLarga as Provincia, D.DesLarga as Canton, E.DesLarga as Distrito  
                                                   FROM InstalacionAdministradores as A, Instalacion as B, 
                                                        Cat_Provincia as C, Cat_Canton as D, Cat_Distrito as E 
                                                   WHERE A.IdUsuario = ".$idUsuario." AND 
                                                         A.IdInstalacion = B.id AND
                                                         (B.CodPais  = C.CodPais AND  B.CodProv = C.CodProv) AND  
                                                         (B.CodPais  = D.CodPais AND  B.CodProv = D.CodProv AND B.CodCanton = D.CodCanton) AND
                                                         (B.CodPais  = E.CodPais AND  B.CodProv = E.CodProv AND B.CodCanton = E.CodCanton AND B.CodDist = E.CodDist) AND
                                                         B.Status = '1' 
                                                   ORDER BY A.Orden Asc
                                                   LIMIT 1") 
                                        or die('Connect Error02 (' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                                        $instalacionQueAdministra = array();
                                        while ($row = $_result->fetch_assoc()) {array_push($instalacionQueAdministra, $row);}
                                        if (sizeof($instalacionQueAdministra) > 0) {
                                            $msj[idInstalacion]       = $instalacionQueAdministra[0]["IdInstalacion"];
                                            $msj[nombreInstalacion]   = $instalacionQueAdministra[0]["NombreInst"];
                                            $msj[direccion]           = $instalacionQueAdministra[0]["Distrito"].', '.
                                                                        $instalacionQueAdministra[0]["Canton"].' de '.
                                                                        $instalacionQueAdministra[0]["Provincia"];
                                            $msj[encargado]           = $instalacionQueAdministra[0]["NombreContacto"];
                                            $msj[correo]              = $instalacionQueAdministra[0]["EMailContac"];
                                            $msj[telefono]            = $instalacionQueAdministra[0]["Telefono1"];
                                            $msj[modoReservacion]     = $instalacionQueAdministra[0]["MetodoReservacion"];
                                        }

                                }
                            // Obtiene canchas favoritas del Usuario.    
                            $_result = $_db->query("SELECT B.id, B.NombreInst FROM UsuarioInstalaciones as A, Instalacion as B 
                                               where A.IdInstalacion = B.id AND IdUsuario=".$idUsuario) 
                            or die('Connect Error 03 (' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                            while ($row = $_result->fetch_assoc()) {array_push($instalacionesFavoritas, $row);}                
                            $cantidadInstalaciones = sizeof($instalacionesFavoritas);
                            $msj[cantidadInstalaciones]=$cantidadInstalaciones;
                        
                         }
                     }
                }
              
                $msj[sessionId] = session_id();
                $results[0]["Password"]="";
                $respuesta = array($results,$instalacionesFavoritas);
                $respuesta = array($msj,$respuesta);
                return $respuesta;}
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR en el Insert de la Table Token SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Prepare del Insert de la Token SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
	                
        }  // Fin de function validarIngreso

//========================================================================================================================             	

        public function cerrarSesion($params){

                $_SESSION = array();
                $_db = $this->__construct();
  
                $msj = array();
                $results=array();
    
                setcookie("UsuarioId", "",time()-120,"/");
                setcookie("UsuarioEmail", "",time()-120,"/");
                setcookie("UsuarioFoto", "",time()-120,"/");
                setcookie("Token", "",time()-120,"/");
                
                $_SESSION["UsuarioId"] = '';
                $_SESSION["UsuarioNombre"] = ''; 
                $_SESSION["UsuarioApellidos"] =  ''; 
                $_SESSION["UsuarioEMail"] = ''; 
                $_SESSION["UsuarioTipoUsuario"] = '';

                $_result = $_db->query("SELECT id, NombreInst FROM Instalacion 
                                               where Status = '1'") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);                                                
                $instalacionesFavoritas = array();
                while ($row = $_result->fetch_assoc()) {array_push($instalacionesFavoritas, $row);}                
                $cantidadInstalaciones = sizeof($instalacionesFavoritas);
                $msj = array(codigoError=>'0000', mensaje=>'', cantidadInstalaciones=>$cantidadInstalaciones);
                $respuesta = array($results,$instalacionesFavoritas);
                $respuesta = array($msj,$respuesta);
                if (ini_get("session.use_cookies")) {
                     $params = session_get_cookie_params();
                     setcookie(session_name(), '', time() - 42000,
                                   $params["path"], $params["domain"],
                                   $params["secure"], $params["httponly"]);
                }
                session_destroy();
                return $respuesta;
	                
        }  // Fin de function cerrarSesion

//========================================================================================================================             	

        public function EditarPerfil(stdClass $params){
           try {   
                    if (!isset($_SESSION["UsuarioId"])){
                        $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                        $respuesta = array($msj); 
                        return $respuesta;
                    } 

                    $_db = $this->__construct();

                    $msj = array(codigoError=>'',mensaje=>'');
                    $ind_error = 0;

                    $idUsuario = $params->idUsuario;
                    $token = $params->token;
                    $contrasenaOriginal = $params->param2;
                    $contrasena = $params->param2;
                    $contrasenaActual = $params->param1;
                    $nombre = $params->nombre;
                    $apellido = $params->apellido;
                    $cedula = $params->cedula;
                    $cedulaOriginal = $params->cedulaOriginal;
                    $fechaNacimiento = $params->fechaNacimiento;                               
                    $apodo = $params->apodo;
                    $telefono = $params->telefono;
                    $genero = $params->genero;
                    $provincia = $params->provincia;
                    $canton = $params->canton;
                    $distrito = $params->distrito;   
                   
                    if ($contrasena != '')         {$contrasena = substr($contrasena,10,16).substr($contrasena,36,16);}
                    if ($contrasenaOriginal != '') {$contrasenaOriginal = substr($contrasenaOriginal,10,16).substr($contrasenaOriginal,36,16);}
                    if ($contrasenaActual != '')   {$contrasenaActual = substr($contrasenaActual,10,16).substr($contrasenaActual,36,16);}
                    
                    if ($provincia==0 || $provincia=='')    {$provincia=null;}
                    if ($canton==0 || $canton=='')          {$canton=null;}
                    if ($distrito==0 || $distrito=='')      {$distrito=null;}
                    
                    if ($cedula != $cedulaOriginal) {
                        // Si el Usuario cambio la cedula: Entonces chequea que la nueva cedula no exista.
                        $_resultx = $_db->query("SELECT id FROM Persona WHERE NoCedula = '".$cedula."'")                                                                                          
                            or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                            if ($_resultx->num_rows != 0) {throw new Exception("0006");}
                    }
                    
                    $_result = $_db->query("SELECT Password FROM Usuario WHERE IdPersona = ".$idUsuario) 
                    or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    $results = array();
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row); }
                    if ($contrasenaActual !== $results[0]["Password"] && $contrasenaActual !== '') { throw new Exception("0001"); }
                    if($contrasena != '') {
                        //Actualiza contraseña en la Tabla de Usuarios 
                        if($stmt = $_db->prepare("UPDATE Usuario SET Password = '".$contrasena."' WHERE IdPersona = ".$idUsuario)) {
                            $stmt->execute();
                            $filas_afectadas = $stmt->affected_rows;
                            $stmt->close();
                            if ($filas_afectadas != 1) { throw new Exception("0002"); }
                        } else { throw new Exception("0003");}
                        //Actualiza contraseña en la Tabla de Token 
                        if($stmt = $_db->prepare("UPDATE Token SET Password = '".$contrasena.
                                                          "' WHERE IdUsuario = ".$idUsuario.
                                                          " AND Token = '".$token."'")) {
                            $stmt->execute();
                            $filas_afectadas = $stmt->affected_rows;
                            $stmt->close();
                            if ($filas_afectadas != 1) { throw new Exception("0002"); }
                        } else { throw new Exception("0003");}

                    }    

                    if($stmt = $_db->prepare("UPDATE Persona SET NoCedula=?,
                                                                Nombre=?,
                                                                Apellidos=?,
                                                                fechaNacimiento=?,
                                                                Apodo=?,                                                              
                                                                TelCelular=?,
                                                                Genero=?,
                                                                CodProv=?,
                                                                CodCanton=?,
                                                                CodDist=? 
                                                                WHERE id=?")) {
                            $stmt->bind_param('sssssssiiii',$cedula,$nombre,$apellido,$fechaNacimiento,
                                                            $apodo,$telefono,$genero,
                                                            $provincia,$canton,$distrito,$idUsuario);
                            $cedula = $_db->real_escape_string($cedula);
                            $nombre = $_db->real_escape_string($nombre);
                            $apellido = $_db->real_escape_string($apellido);
                            $apodo = $_db->real_escape_string($apodo);
                            $telefono = $_db->real_escape_string($telefono);
                            $genero = $_db->real_escape_string($genero);
                            $fechaNacimiento=(string)$fechaNacimiento;                      
                            $provincia = (int) $provincia;
                            $canton = (int) $canton;
                            $distrito = (int) $distrito;
                            $idUsuario = (int) $idUsuario;
                            $stmt->execute();
                            $filas_afectadas = $stmt->affected_rows;
                            $stmt->close();
                            if ($filas_afectadas != 1) { throw new Exception("0004"); 
                            } else {$msj[codigoError]="0000";
                                    $msj[mensaje]="USUARIO Y PERSONA ACTUALIZADO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                        } else { throw new Exception("0005");}                                                                                                   

                    $respuesta = array($msj);     

                    return $respuesta;               

             } // Fin Try
        
                 catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR Contraseña no es valida');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el UPDATE de la Tabla Usuario SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el PREPARE del UPDATE de la Tabla Usuario SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el UPDATE de la Tabla Persona SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0005") {
                        $msj = array('codigoError'=>'0005','mensaje'=>'ERROR en el PREPARE del UPDATE de la Tabla Persona SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0006") {
                        $msj = array('codigoError'=>'0006','mensaje'=>'Cedula ya Existe');
                       }
                    
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
                
               
        }  // Fin de function editar Perfil

//========================================================================================================================     
        
	public function registrarUsuario(stdClass $params) {
                
                // Usuario ya ingresado. 
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','id'=>'');
                $ind_error = 0;
                
                // echo 'paso1';
                $correo = $params->correo;
                $tipoUsuario = 'P';
                $codPais = 1;
                $contrasenaOriginal = $params->contrasena;
                $contrasena = md5($params->contrasena);
                $nombre = $params->nombre;
                $apellido = $params->apellido;
                $telefono = $params->telefono;
                $genero = $params->genero;
                
                
                // Valida que el correo no exista.   
                $_result = $_db->query("SELECT id FROM Persona WHERE EMail = '".$correo."'") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows > 0) { 
                         $msj['codigoError']="0001";
                         $msj['mensaje']="CORREO YA EXISTE";
                         $msj['id']=0;
                         $ind_error = 1;
                } else {
                
		if($stmt = $_db->prepare("INSERT INTO Persona (EMail,Nombre,Apellidos,TelCelular,Genero,CodPais,FotoFile) 
                                                      VALUES (?, ?, ?, ?, ?, ?,'desconocido.jpg')")) {
                        $stmt->bind_param('sssssi',$correo,$nombre,$apellido,$telefono,$genero,$codPais);
			$correo = $_db->real_escape_string($correo);
			$nombre = $_db->real_escape_string($nombre);
			$apellido = $_db->real_escape_string($apellido);
                        $telefono = $_db->real_escape_string($telefono);
                        $genero = $_db->real_escape_string($genero);
                        $codPais = (int) $codPais;
                        $stmt->execute();
                        $filas_afectadas = $stmt->affected_rows;
                        $id = $_db->insert_id;
                        $stmt->close();
                        if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL INSERT 01 SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                                $msj[id]=$id;
                                $ind_error = 1;
                        } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="PERSONA REGISTRADA CORRECTAMENTE SqlState:".$_db->sqlstate;
                                $msj['id']=$id;
                                $ind_error = 0;
                                if($stmt = $_db->prepare("INSERT INTO Usuario (IdPersona, Password, TipoUsuario) VALUES (?,?,?)")) {
                                        $stmt->bind_param('iss',$id,$contrasena,$tipoUsuario);
                                        $id = (int) $id;
                                        $contrasena = $_db->real_escape_string($contrasena);
                                        $tipoUsuario = $_db->real_escape_string($tipoUsuario);
                                        $stmt->execute();
                                        $filas_afectadas = $stmt->affected_rows;
                                        $stmt->close();
                                        if ($filas_afectadas != 1) {
                                                    $msj['codigoError']="0003";
                                                    $msj['mensaje']="ERROR EN EL INSERT 02 SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                                                    $msj[id]=$id;
                                                    $ind_error = 2;
                                        } else {$msj['codigoError']="0000";
                                                $msj['mensaje']="USUARIO REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;
                                                $msj['id']=$id;
                                                $ind_error = 0;}
                                    } else { $msj['codigoError']="0002";
                                            $msj['mensaje']="ERROR en el PREPARE 01 SqlState: ".$_db->sqlstate;
                                            $msj[id]=0;
                                            $ind_error = 4;}
                     }
                        
		     } else { $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE 02 SqlState: ".$_db->sqlstate;
                              $msj[id]=0;
                              $ind_error = 5;
                             }
                         
                }
                
                if ($ind_error == 0) {
                    // No hubo errores entonces se procede a enviar el correo al Usuario que se registro.
                    $idx=md5($nombre).$id.md5($apellido);
                    $destinatario = $correo; 
                    $asunto = "Bienvenido al sitio web de los mejengueros de corazon: AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>Correo de Bienvenida</title> 
                    </head> 
                    <body> 
                    <h1>Hola amigo:</h1> 
                    <p> 
                    <b>Bienvenido al sitio web de los mejengueros de corazon.</b><br><br>
                    <b>Favor dar click en el siguiente enlace para activar su cuenta personal.</b><br><br>
                    <b>Usar el correo:<u>'.$correo.'</u></b><br>
                    <b>Su contrasena para ingresar a este sitio es: <u>'.$contrasenaOriginal.'</u></b><br><br>
                    <b>Dar click aqui: <a href="http://www.ajugarfutbol.com/'.DIRECTORIO.'php/ActivarCuenta.php?id='.$idx.'">Ingresar</a></b><br><br>   
                    <b>O dar click en esta direccion: http://www.ajugarfutbol.com/'.DIRECTORIO.'php/ActivarCuenta.php?id='.$idx.'<br><br>   
                    <b>Esperamos que disfrute este sitio web e invite a sus amigos a visitarlo.</b><br><br> 
                    <b>Muchas Gracias</b>
                    </p> 
                    </body> 
                    </html> 
                    '; 

                    $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                    $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                    $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; 
                    
                    // echo $cuerpo;
                    mail($destinatario,$asunto,$cuerpo,$headers); 
                    // echo 'mail2';
                    
                } // Fin de envio del correo
                
                $results = array();
                $repuesta = array($msj,$results);     
                
		return $repuesta;
                
	} // Fin de function registrarUsuario

//========================================================================================================================
        
        public function recordarContrasena(stdClass $params){
            try {    
		$_db = $this->__construct();
                $msj = array('codigoError'=>'','mensaje'=>'','id'=>'');
                $correo = $params->correo;
                $tipoUsuario = $params->tipoUsuario;
                // Valida que el correo exista.   
                $_result = $_db->query("SELECT Nombre,id FROM Persona WHERE EMail = '".$correo."'") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                         $msj['codigoError']="0001";
                         $msj['mensaje']="CORREO NO EXISTE";
                         $msj['id']=0;
                } else {    // No hubo errores entonces se procede a enviar el correo al Usuario que se registro.
                            $results = array();
                            while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                            $keychars = "abcdefghijkLmnpqrstuvwxyz23456789";
                            $length = 6;
                            $randkey = "";
                            $max=strlen($keychars)-1;
                            for ($i=0;$i<$length;$i++) {$randkey .= substr($keychars, rand(0, $max), 1);}
                            $contrasena = $randkey;
                            $nombre = $results[0]["Nombre"];
                            $id = $results[0]["id"];
                            $contrasenaMD5 = md5($contrasena);
                            if ($stmt = $_db->prepare("UPDATE Usuario SET Password=? WHERE IdPersona=?")) {
                 	 		$stmt->bind_param('si', $contrasenaMD5, $id);
 	                                $contrasenaMD5 = $_db->real_escape_string($contrasenaMD5);
		            	        $id = (int) $id;
 			                $stmt->execute();
                                        $filas_afectadas = $stmt->affected_rows;
					$stmt->close();
                                        if ($filas_afectadas != 1) { throw new Exception("0003"); }
                                        } else { throw new Exception("0002");}
                            $destinatarios = $correo; 
                            $asunto = "Recordatorio de Contraseña"; 
                            if ($tipoUsuario == 'Admin') {
                                    $saludo = 'Estimado '.$nombre;
                                    $dominio= 'http://'.PATHWEB.'/admin.html';
                                    $contenido ='Su contraseña para ingresar a este sitio es: <b>'.$contrasena.'</b><br><br>
                                                 Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'/admin.html">Ingresar</a><br><br>
                                                 dar click en esta dirección: http://'.PATHWEB.'/admin.html<br><br>   
                                                 Si desea cambiar esta contraseña, ingresar e ir a modificar los datos de su perfil.<br><br>
                                                 Esperamos que siga disfrutando de este sitio web, si continua con problemas favor 
                                                 comnunicarse con nuestro Departamento de Soporte.<br><br> 
                                                 Muchas Gracias';
                            } else {
                                    $saludo = 'Hey '.$nombre;
                                    $dominio= 'http://'.PATHWEB;
                                    $contenido ='Su contraseña para ingresar a este sitio es: '.$contrasena.'</b><br><br>
                                                 Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a><br><br>
                                                 dar click en esta dirección: http://'.PATHWEB.'<br><br>   
                                                 Si desea cambiar esta contraseña, ingresar e ir a modificar los datos de su perfil.<br><br>
                                                 Esperamos que siga disfrutando de este sitio web e invite a sus amigos a visitarlo.<br><br>
                                                 Muchas Gracias'; 
                            }    
                            $alto = 580;
                            $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                            $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                            $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                            $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                            $mail = new Mail;
                            $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                } // Fin de envio del correo
                $results = array();
                $repuesta = array($msj,$results);
		return $repuesta;}
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el PREPARE del UPDATE SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR EN EL UPDATE SqlState:'.$_db->sqlstate);                      
                        }    
                    $results = array();
                    $repuesta = array($msj,$results); 
                    return $repuesta;
                }
                
	} // Fin de function recordarConstrasena 

//========================================================================================================================
        
        // Activar una cuenta recien registrada
	public function activarCuenta($id)
	{    
		$_db = $this->__construct();
                $tipousuario = 'R';
                if ($stmt = $_db->prepare("UPDATE Usuario SET TipoUsuario=? WHERE IdPersona=?")) {
			$stmt->bind_param('si', $tipousuario, $id);
                        $tipousuario = $_db->real_escape_string($tipousuario);
			$id = (int) $id;
                        $stmt->execute();                                                
			$stmt->close();
		}

		return; 
                
	} // Fin de function activarCuenta
    
//========================================================================================================================
           
        // Grabar el nombre del archivo de la foto del Usuario
        public function grabarNombreFoto($foto,$id)
	{
                $_db = $this->__construct();
                      
                // Obtiene nombre de la foto actual para borrar el archivo del servidor.... 
                $_result = $_db->query("SELECT FotoFile FROM Persona WHERE id = ".$id)
                or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $row = $_result->fetch_assoc();
                $FotoFile = $row[FotoFile];
                
                if ($stmt = $_db->prepare("UPDATE Persona SET FotoFile=? WHERE id=?")) {
			$stmt->bind_param('si', $foto, $id);$foto = $_db->real_escape_string($foto);
			$id = (int) $id;
                        $stmt->execute();
			$stmt->close(); }

                if ($FotoFile != null && $FotoFile != 'desconocido.jpg') {      
                      $fileName =  "../resources/fotosUsuarios/".$FotoFile;
                      if (file_exists( $fileName )) { unlink( $fileName ); }
                      } 
                        
		return; 
                
                
                
                
	} // Fin de function grabarNombreFoto

        
//========================================================================================================================
        // Registra Instalaciones favoritas al usuario
	public function agregaInstalacionFavorito(stdClass $params)
	{
		$_db = $this->__construct();

                $idUsuario = $params->idUsuario;
                $idInstalacion = $params->idInstalacion;
                $valorCheck = $params->valorCheck;
                
                $instrucion="";
                if($valorCheck=='true'){$instrucion="INSERT INTO `UsuarioInstalaciones`(`IdUsuario`,`IdInstalacion`)VALUES(?,?)";}
                else{$instrucion="DELETE FROM `UsuarioInstalaciones` WHERE `IdUsuario`=? and `IdInstalacion`=?";}
                
		if ($stmt = $_db->prepare($instrucion))
                {
			$stmt->bind_param('ii', $idUsuario, $idInstalacion);

			$idUsuario = (int) $idUsuario;                      
			$idInstalacion = (int) $idInstalacion;

			$stmt->execute();
                        
                        $filas_afectadas = $stmt->affected_rows;
				
			$stmt->close();
                        
                        if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL INSERT SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                                $msj[id]=$id;
                                $ind_error = 1;
                
                        } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="AGREGO LA INSTALACION EN FAVORITOS CORRECTAMENTE SqlState:".$_db->sqlstate;
                                $msj['id']=$id;
                                $ind_error = 0;
                                }
		}else { 
                              $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                              $msj[id]=0;
                              $ind_error = 1;
                             }

		$results = array();
                $respuesta = array($msj,$results);     
                
		return $respuesta;
                
	} // Fin de Registra Instalaciones favoritas al usuario
 
//========================================================================================================================
        
        public function invitarAmigos(stdClass $params) {
		
        try {    
                if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','id'=>'');
                $ind_error = 0;
                
                $encabezado = array();
                $datos = array();
                $encabezado = $params->invitados;
                
                $idInvita = $encabezado[0]->id;
                $cantInvitados = $encabezado[0]->cantInvitados;
                $datos = $encabezado[0]->datos;
                
                // echo $id,$cantInvitados;
                //print_r($encabezado);
                //print_r($datos);
                
                // Obtiene el nombre y apellidos del Usuario que invita..   
                $_result = $_db->query("SELECT EMail,Nombre,Apellidos FROM Usuario WHERE id = '".$idInvita."'")
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                         throw new Exception("0004");
                        }
                        
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $nombre = $results[0]["Nombre"];
                $apellidos = $results[0]["Apellidos"];
                $EMailDB = $results[0]["EMail"];
               
                for ( $i = 0; $i<=($cantInvitados-1); $i++ ) {
                
                    $correo      = $datos[$i]->correo;
                    $nombreAmigo = $datos[$i]->nombreAmigo;
                    //echo $correo,$nombreAmigo; 
                    
                    if ($EMailDB == $correo) { 
                             // Es el mismo correo del usuario que Inivta.
                             continue;
                             }              

                    // Revisa si la invitacion ya existe pero omite las denegadas.
                    $_result = $_db->query("SELECT id FROM UsuarioInvitaciones WHERE EMailAmigo = '".$correo."' and IdUsuario = ".$idInvita. " and StatusInvitacion = 'P'") 
                    or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                    if ($_result->num_rows > 0) {
                             $msj['codigoError']="0001";
                             $msj['mensaje']="INVITACION YA EXISTE SIN DENEGAR";
                    } else {
                            // Inserta la Invitacion no Existe o existen pero denegadas.
                            if($stmt = $_db->prepare("INSERT INTO UsuarioInvitaciones (IdUsuario,
                                                                           EMailAmigo,
                                                                           NombreAmigo,
                                                                           FechaInvitacion,
                                                                           StatusInvitacion
                                                                           ) VALUES (?, ?, ?, NOW(), 'P')")) {

                                $stmt->bind_param('iss',$idInvita,$correo,$nombreAmigo);

                                $idInvita = (int) $idInvita;
                                $correo = $_db->real_escape_string($correo);
                                $nombreAmigo = $_db->real_escape_string($nombreAmigo);

                                $stmt->execute();

                                $filas_afectadas = $stmt->affected_rows;

                                $stmt->close();

                                if ($filas_afectadas != 1) {
                                       throw new Exception("0003");

                                } else {
                                        $msj['codigoError']="0000";
                                        $msj['mensaje']="INVITACIONES REGISTRADA CORRECTAMENTE SqlState:".$_db->sqlstate;
                                        }

                             } else { 
                                      throw new Exception("0002"); 
                                     }

                    } // Fin IF 
                    
                    // No hubo errores entonces se procede a enviar el correo al Amigo.
                    $idx=md5($nombre).$id.md5($apellido);
                    $destinatario = $correo; 
                    $asunto = "Bienvenido al sitio web de los mejengueros de corazon: AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>Correo de Bienvenida</title> 
                    </head> 
                    <body> 
                    <h1>Hola '.$nombreAmigo.':</h1><br>
                    <p> 
                    <b>Bienvenido al sitio web de los mejengueros de corazon.</b><br><br>
                    
                    <b>Su Amigo '.$nombre.' '.$apellidos.' le envio una invitacion para unirse a la mejor red social de Costa Rica.</b><br><br>
                    
                    <b>Este sitio esta dedicado a los mejengueros de corazon, porque mejenguear es compartir.</b><br><br>
                    
                    <b>Favor dar click en el siguiente enlace para ir al sitio y registrarse.</b><br><br>

                    <b>Dar click aqui: <a href="www.ajugarfutbol.com">Ingresar</a></b><br><br>   
                    <b>O dar click en esta direccion: http://www.ajugarfutbol.com<br><br>   
           
                    <b>Luego de registrarse vaya a aceptar invitaciones, asi su amigo y usted estaran conectados.<br>   
                    <b>Esto les permitira compartir informacion en linea.<br><br>   
                    
                    <b>Si ya usted esta registrado solo vaya a aceptar invitaciones.<br><br>   
 
                    <b>Esperamos que disfrute este sitio web e invite a sus amigos a visitarlo.</b><br><br> 
                    <b>Muchas Gracias</b>
                    </p> 
                    </body> 
                    </html> 
                    '; 

                    $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                    $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                    $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; 

                    mail($destinatario,$asunto,$cuerpo,$headers); 
                    
                } // Fin del FOR
                
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el PREPARE SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR EN EL INSERT SqlState:'.$_db->sqlstate. '  Filas Afectadas: '.$filas_afectadas);                      
                        }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'USUARIO NO EXISTE');                      
                        }
                    $results = array();
                    $repuesta = array($msj,$results); 
                    return $repuesta;
                }
                
	} // Fin de function invitarAmigos
        
//=========================================================================================================================        
      
        public function aceptarInvitacion(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
            
                //echo 'paso0';
                $_db = $this->__construct();
                //echo 'paso000';
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $correoInvitado = $params->correoInvitado;
                $correo = $params->correo;
                $idInvitado = $params->id;
                $idInvitacion = $params->idInvitacion;
                                
                //echo 'paso1 '."SELECT id FROM Usuario WHERE EMail = '".$correo."'";
                // Obtiene el Id del Usuario que invito...   
                $_result = $_db->query("SELECT id FROM Usuario WHERE EMail = '".$correo."'")
                or die('Connect Error Select 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                         throw new Exception("0001");
                        }
                        
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $idInvitador = $results[0]["id"];
                //echo 'paso2 '.$idInvitador;
                               
                // Graba el registro del Amigo en el Usuario Invitado.
                $_result = $_db->query("SELECT id FROM UsuarioAmigos WHERE IdUsuario = ".$idInvitado." and IdAmigo= ".$idInvitador)
                or die('Connect Error Select 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                           if($stmt = $_db->prepare("INSERT INTO UsuarioAmigos (IdUsuario,IdAmigo,IdInvitacion) VALUES (?,?,?)")) {
                                $stmt->bind_param('iii',$idInvitado,$idInvitador,$idInvitacion);
                                $idInvitado = (int) $idInvitado;
                                $idInvitador = (int) $idInvitador;
                                $idInvitacion = (int) $idInvitacion;
                                $stmt->execute();
                                $filas_afectadas = $stmt->affected_rows;
                                $stmt->close();
                                if ($filas_afectadas != 1) {
                                        throw new Exception("0002");
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="AMIGO INIVTADO REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                            } else { 
                                    throw new Exception("0003"); 
                                   }
                  }              
                 //echo 'paso3';
      
                // Graba el registro del Amigo en el Usuario que Invito.
                $_result = $_db->query("SELECT id FROM UsuarioAmigos WHERE IdAmigo = ".$idInvitado." and IdUsuario = ".$idInvitador)
                or die('Connect Error Select 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                        if($stmt = $_db->prepare("INSERT INTO UsuarioAmigos (IdAmigo,IdUsuario,IdInvitacion) VALUES (?,?,?)")) {
                                $stmt->bind_param('iii',$idInvitado,$idInvitador,$idInvitacion);
                                $idInvitado = (int) $idInvitado;
                                $idInvitador = (int) $idInvitador;
                                $idInvitacion = (int) $idInvitacion;
                                $stmt->execute();
                                $filas_afectadas = $stmt->affected_rows;
                                $stmt->close();
                                if ($filas_afectadas != 1) {
                                        throw new Exception("0004");
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="AMIGO INVITADOR REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                            } else { 
                                    throw new Exception("0005"); 
                                   }
                }              
                
                // Actualiza el Status de la Invitacion.
                //echo 'paso4 '.$idInvitado.'  '.$correo;
               if ($stmt = $_db->prepare("UPDATE UsuarioInvitaciones SET StatusInvitacion='A' WHERE id=?")) {
			$stmt->bind_param('i', $idInvitacion);
                        $idInvitacion = (int) $idInvitacion;
                        $stmt->execute();
			$stmt->close();
		} else { 
                        throw new Exception("0006"); 
                       }
                //echo 'paso5';
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ACEPTAR UNA INVITACION TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'USUARIO QUE INVITO NO EXISTE','cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Amigo invitado - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Amigo invitado - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0004") {
                        $msj = array('codigoError'=>'0004','mensaje'=>'ERROR en el Insert del Amigo que invito - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0005") {
                        $msj = array('codigoError'=>'0005','mensaje'=>'ERROR en el Prepare del Amigo que invito - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0006") {
                        $msj = array('codigoError'=>'0006','mensaje'=>'ERROR en el Update de la Tabla de Invitaciones - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de function aceptar Invitacion
        
//=====================================================================================================================================        

        public function denegarInvitacion(stdClass $params) {
		
        try {   
                if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idInvitacion = $params->idInvitacion;
                
                if ($stmt = $_db->prepare("UPDATE UsuarioInvitaciones SET StatusInvitacion='D' WHERE id=?")) {
			$stmt->bind_param('i', $idInvitacion);
                        $idInvitacion = (int) $idInvitacion;
                        $stmt->execute();
			$stmt->close();
		} else { 
                        throw new Exception("0006"); 
                       }
                //echo 'paso5';
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE DENEGAR UNA INVITACION TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0006") {
                        $msj = array('codigoError'=>'0006','mensaje'=>'ERROR en el Update de la Tabla de Invitaciones - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de function denegar Invitacion
        
//======================================================================================================================================        

        public function obtenerInvitaciones(stdClass $params) {
		
        try {  
                if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadInvitaciones'=>'');
                $ind_error = 0;
                
                $correo = $params->correo;
                
                // Obtiene los datos de la invitacion..   
                $_result = $_db->query("SELECT A.Nombre, A.Apellidos, A.EMail, A.FotoFile, B.FechaInvitacion, B.id 
                                               FROM Usuario as A,UsuarioInvitaciones as B  
                                               WHERE B.EMailAmigo = '".$correo."' and A.id = B.IdUsuario and B.StatusInvitacion = 'P'")
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadInvitaciones = $_result->num_rows;
                if ($cantidadInvitaciones == 0) { 
                         throw new Exception("0001");
                        }
                        
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $msj['cantidadInvitaciones']=$cantidadInvitaciones;
                $repuesta = array($msj,$results);     
                
		return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'USUARIO NO TIENE INVITACIONES','cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de obtenerInvitaciones	
        
//=========================================================================================================================        
        
     public function obtenerListaAmigos(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadAmigos'=>'');
                $ind_error = 0;
                
                $idUsuario = $params->idUsuario;
                
                // Obtiene los datos de los Amigos.. 
                $_result = $_db->query("SELECT A.id, A.IdAmigo, A.IdInvitacion, B.EMail, B.FotoFile, B.Nombre, B.Apellidos  
                                               FROM UsuarioAmigos as A, Usuario as B  
                                               WHERE A.IdUsuario = ".$idUsuario." and A.IdAmigo = B.id")
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadAmigos = $_result->num_rows;
                if ($cantidadAmigos == 0) { throw new Exception("0001"); }
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $msj['cantidadAmigos']=$cantidadAmigos;
                $repuesta = array($msj,$results);     
                
		return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'USUARIO NO TIENE AMIGOS','cantidadAmigos'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de obtenerListaAmigos	
        
//=========================================================================================================================        

        public function eliminarAmigo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadAmigos'=>'');
                $ind_error = 0;
                
                $idAmigo = $params->idAmigo;
                $idUsuario = $params->idUsuario;
                $idInvitacion = $params->idInvitacion;
                
                // Borra los registros que forman la relacion de Amigos....
                $_result = $_db->query("DELETE FROM UsuarioAmigos  
                                               WHERE (idUsuario = ".$idUsuario." AND IdAmigo = ".$idAmigo.") OR (
                                                      idUsuario = ".$idAmigo."   AND IdAmigo = ".$idUsuario.")")
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
               
                // Marcar la invitacion que dio origen a la amistad como Denegada.... 
                if ($stmt = $_db->prepare("UPDATE UsuarioInvitaciones SET StatusInvitacion='D' WHERE id=?")) {
			$stmt->bind_param('i', $idInvitacion);
                        $idInvitacion = (int) $idInvitacion;
                        $stmt->execute();
			$stmt->close();
		} else { 
                        throw new Exception("0006"); 
                       }
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR UNA AMISTAD TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0006','mensaje'=>'ERROR EN EL UPDATE');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de eliminarAmigo	
        
//=========================================================================================================================        

        public function eliminarMensaje(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                $ind_error = 0;
                
                $idMensaje = $params->idMensaje;
                
                // Borra el Mensaje...
                $_result = $_db->query("DELETE FROM UsuarioMensajes WHERE id = ".$idMensaje)
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
               
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR MENSAJE TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                   
                    return $repuesta;}
                
        } // Fin de eliminarAmigo	
        
//=========================================================================================================================        
        
        public function enviaMensajeUsuario(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idUsuarioEnvia = $params->idUsuarioEnvia;
                $idUsuarioDestino = $params->idUsuarioDestino;
                $mensaje = $params->mensaje;
                $mensaje = substr($mensaje,0,512);
                // Graba el Mensaje
               if($stmt = $_db->prepare("INSERT INTO UsuarioMensajes (MsjGrupal,IdMensajeAnterior,IdUsuarioEnvia, IdUsuarioDestino,
                                                     Status, EliminadoUsuarioEnvia, EliminadoUsuarioDestino, Mensaje)
                                                     VALUES ('N',0,?,?,0,0,0,?)")) {
                    $stmt->bind_param('iis', $idUsuarioEnvia, $idUsuarioDestino, $mensaje);
                    $idUsuarioEnvia = (int) $idUsuarioEnvia;
                    $idUsuarioDestino = (int) $idUsuarioDestino;
                    $mensaje = $_db->real_escape_string($mensaje);
                    $stmt->execute();
                    $filas_afectadas = $stmt->affected_rows;
                    $stmt->close();
                    if ($filas_afectadas != 1) {
                            throw new Exception("0002");
                    } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="MENSAJE SE REGISTRO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                } else { 
                        throw new Exception("0003"); 
                       }
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ENVIO DE MENSAJE TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Mensaje - SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Insert del Mensaje - SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de function Enviar un Mensaje a un Usuario
        
//=====================================================================================================================================        
      
     public function leerListaMensajes(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadMensajes'=>'','cantidadMensajesPagina'=>'','cantidadPaginas'=>'');
                
                $idUsuario = $params->idUsuario;
                $rowsByPage = $params->rowsByPage;
                $pagina = $params->pagina;
                $offsetx = $rowsByPage * $pagina;
                               
                $cantidadMensajes = 0;
                $cantidadPaginas = 0;
                if ($pagina == 0) { // Primera Pagina.
                        // Obtiene la cantidad de mensajes del Usuario y calcula la cantidad de paginas..... 
                        $_result = $_db->query("SELECT id FROM UsuarioMensajes WHERE
                                               ((IdUsuarioDestino = " . $idUsuario . " AND EliminadoUsuarioDestino = 0) OR
                                                (IdUsuarioEnvia = " .   $idUsuario . " AND EliminadoUsuarioEnvia = 0 AND MsjGrupal = 'N'))")
                        or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                        $cantidadMensajes = $_result->num_rows;
                        if ($cantidadMensajes == 0) { throw new Exception("0001"); }
                        $cantidadPaginas = ceil($cantidadMensajes / $rowsByPage); 
                      }
                
                // Obtiene los datos de los Mensajes... 
                $_result = $_db->query("SELECT A.id, A.IdUsuarioEnvia, A.IdUsuarioDestino, A.Mensaje, A.FechaEnvio,
                                               B.EMail, B.FotoFile, B.Nombre, B.Apellidos, A.FechaRespuesta, A.IdMensajeRespuesta  
                                               FROM UsuarioMensajes as A, Usuario as B WHERE 
                                               ((A.IdUsuarioDestino = ".$idUsuario." AND A.IdUsuarioEnvia = B.id AND A.EliminadoUsuarioDestino = 0) OR
                                                (A.IdUsuarioEnvia   = ".$idUsuario." AND A.IdUsuarioDestino = B.id AND A.EliminadoUsuarioEnvia = 0 AND MsjGrupal = 'N'))      
                                               ORDER BY FechaEnvio DESC LIMIT ".$rowsByPage." OFFSET ".$offsetx)
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadMensajesPagina = $_result->num_rows;
                if ($cantidadMensajesPagina == 0) { throw new Exception("0002"); }
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $msj['cantidadMensajes']=$cantidadMensajes;
                $msj['cantidadMensajesPagina']=$cantidadMensajesPagina;
                $msj['cantidadPaginas']=$cantidadPaginas;
                for ($i=0; $i<$cantidadMensajes; $i++) {
                       $ok=htmlspecialchars($results[$i]["Mensaje"]); 
                       $results[$i]["Mensaje"]= nl2br($ok);
                        }
                $repuesta = array($msj,$results);     
           	return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'USUARIO NO TIENE MENSAJES','cantidadMensajes'=>'0');
                       }
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR INTERNO. USUARIO NO TIENE MENSAJES','cantidadMensajes'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de obtenerListaMensajes	
        
//=========================================================================================================================        

     public function leerMensaje(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadMensajes'=>'');
                $ind_error = 0;
                
                $idMensaje = $params->idMensajeRespuesta;
                
                // Obtiene los datos del Mensaje... 
                $_result = $_db->query("SELECT A.id, A.IdUsuarioEnvia, A.IdUsuarioDestino, A.Mensaje, A.FechaEnvio,
                                               B.EMail, B.FotoFile, B.Nombre, B.Apellidos, A.FechaRespuesta, A.IdMensajeRespuesta  
                                               FROM UsuarioMensajes as A, Usuario as B  
                                               WHERE A.id = ".$idMensaje." AND A.IdUsuarioEnvia = B.id AND
                                                     A.EliminadoUsuarioDestino = 0")
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadMensajes = $_result->num_rows;
                if ($cantidadMensajes == 0) { throw new Exception("0001"); }
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $msj['cantidadMensajes']=$cantidadMensajes;
                for ($i=0; $i<$cantidadMensajes; $i++) {
                       $ok=htmlspecialchars($results[$i]["Mensaje"]); 
                       $results[$i]["Mensaje"]= nl2br($ok);
                        }
                $repuesta = array($msj,$results);     
           	return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'MENSAJE NO EXISTE','cantidadMensajes'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de leerMensaje	
        

//=========================================================================================================================        

     public function dummyCall(stdClass $params) {
                   $results = array();
                   $msj = array();
                   $repuesta = array($msj,$results);
                   return $repuesta;
      } // Fin de dummyCall	

//=========================================================================================================================        
        
         public function responderMensajeUsuario(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado', idRespuesta=>'0');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'',idRespuesta=>'0');
                
                $idUsuarioEnvia = $params->idUsuarioEnvia;
                $idUsuarioDestino = $params->idUsuarioDestino;
                $idMensajeAnterior = $params->idMensajeAnterior;
                $mensaje = $params->mensaje;
                $mensaje = substr($mensaje,0,512);
                
               // Graba el Mensaje
               if($stmt = $_db->prepare("INSERT INTO UsuarioMensajes (IdMensajeAnterior,IdUsuarioEnvia, IdUsuarioDestino,
                                                     Status, EliminadoUsuarioEnvia, EliminadoUsuarioDestino, Mensaje)
                                                     VALUES (?,?,?,0,0,0,?)")) {
                    $stmt->bind_param('iiis', $idMensajeAnterior, $idUsuarioEnvia, $idUsuarioDestino, $mensaje);
                    $idMensajeAnterior = (int) $idMensajeAnterior;
                    $idUsuarioEnvia = (int) $idUsuarioEnvia;
                    $idUsuarioDestino = (int) $idUsuarioDestino;
                    $mensaje = $_db->real_escape_string($mensaje);
                    $stmt->execute();
                    $filas_afectadas = $stmt->affected_rows;
                    $idMensajeNuevo = $_db->insert_id;
                    $stmt->close();
                    if ($filas_afectadas != 1) {
                            throw new Exception("0002");
                    } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="MENSAJE SE REGISTRO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                } else { 
                        throw new Exception("0003"); 
                       }
                
                // Actualizar el campo de IdMensajeRespuesta... 
               
                if ($stmt = $_db->prepare("UPDATE UsuarioMensajes SET IdMensajeRespuesta=?, FechaRespuesta=?
                                                  WHERE id=?")) {
			$stmt->bind_param('isi', $idMensajeNuevo, date("Y-m-d H:i:s"), $idMensajeAnterior);
                        $idMensajeNuevo = (int) $idMensajeNuevo;
                        $idMensajeOriginal = (int) $idMensajeOriginal;
                        $stmt->execute();
			$stmt->close();
		} else { 
                        throw new Exception("0006"); 
                       }
                       
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ENVIO DE MENSAJE TERMINO SATISFACTORIAMENTE";
                $msj['idMensajeRespuesta']=$idMensajeNuevo;
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Mensaje - SqlState: '.$_db->sqlstate);
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Insert del Mensaje - SqlState: '.$_db->sqlstate);
                       }
                       if ($e->getMessage()=="0006") {
                        $msj = array('codigoError'=>'0006','mensaje'=>'ERROR en el UpDate del Mensaje - SqlState: '.$_db->sqlstate);
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de function Responder un Mensaje a un Usuario

//=====================================================================================================================================        
      
     public function crearEquipo(stdClass $params) {
		
        try {  
                if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    return $msj;
                 }
                     
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'',
                             'mensaje'=>'',
                             'cantidadEquipos'=>'',
                             'idEquipo'=>'',
                             'nombreEquipo'=>'',
                             'fotoFile'=>'',
                             'fileEscudo'=>'',
                             'idUsuarioAdmin'=>'',
                             'fotoCapitan'=>'',
                             'nombreCapitan'=>'',
                             'apellidosCapitan'=>'');
                
                $idUsuario = $params->idUsuario;
                $nombreEquipo = $params->nombreEquipo;
                $fileEscudo = 'Escudo01.jpg';
                $fileFoto   = '';
                  
                // Cuenta los Equipos donde esta el Jugador...
                $_result = $_db->query("SELECT A.id FROM Usuario as A, EquipoJugadores as B
                                               WHERE A.id = B.IdJugador AND B.IdJugador = ".$idUsuario)
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $msj['cantidadEquipos']=$_result->num_rows;
                
                
                // Obtiene los Datos del Jugador (Capitan)
                $_result = $_db->query("SELECT id as IdUsuarioAdmin, Nombre as NombreCapitan, Apellidos as ApellidosCapitan, FotoFile as FotoCapitan
                                               FROM Usuario WHERE id = ".$idUsuario." Limit 1")
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $usuario = array();
                while ($row = $_result->fetch_assoc()) {array_push($usuario, $row);}
                
                $msj['idUsuarioAdmin']  = $usuario[0]['IdUsuarioAdmin'];
                $msj['fotoCapitan']     = $usuario[0]['FotoCapitan'];
                $msj['nombreCapitan']   = $usuario[0]['NombreCapitan'];
                $msj['apellidosCapitan']= $usuario[0]['ApellidosCapitan'];
            
                // Graba el registro del Nuevo Equipo.
                if($stmt = $_db->prepare("INSERT INTO Equipo (IdUsuarioAdmin, NombreEquipo, FileEscudo, FileFoto) VALUES (?,?,?,?)")) {
                    $stmt->bind_param('isss',$idUsuario,$nombreEquipo,$fileEscudo,$fileFoto);
                    $idUsuario = (int) $idUsuario;
                    $nombreEquipo = $_db->real_escape_string($nombreEquipo);
                    $fileEscudo = $_db->real_escape_string($fileEscudo);
                    $fileFoto = $_db->real_escape_string($fileFoto);
                    $stmt->execute();
                    $idEquipo = $_db->insert_id;
                    $filas_afectadas = $stmt->affected_rows;
                    $stmt->close();
                    if ($filas_afectadas != 1) {
                            throw new Exception("0001");
                    } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="EQUIPO CREADO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                } else { 
                        throw new Exception("0001"); 
                        }

             // Graba el registro del Capitan en el Nuevo Equipo.
                if($stmt = $_db->prepare("INSERT INTO EquipoJugadores (IdEquipo,IdJugador,Status) VALUES (?,?,1)")) {
                    $stmt->bind_param('ii',$idEquipo,$idUsuario);
                    $idEquipo = (int) $idEquipo;
                    $idUsuario = (int) $idUsuario;
                    $stmt->execute();
                    $filas_afectadas = $stmt->affected_rows;
                    $stmt->close();
                    if ($filas_afectadas != 1) {
                            throw new Exception("0002");
                    } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="CAPITAN REGISTRADO CORRECTAMENTE EN EL EQUIPO SqlState:".$_db->sqlstate;}
                } else { 
                        throw new Exception("0002"); 
                        }

                $msj['idEquipo']     = $idEquipo;
                $msj['nombreEquipo'] = $nombreEquipo;
                $msj['fileEscudo']   = $fileEscudo;
                $msj['fotoFile']     = $fileFoto;
               
                $msj['codigoError'] = '0000';
                $msj['mensaje']     = 'PROCESO DE CREAR UN EQUIPO TERMINO SATISFACTORIAMENTE';
                               
                $repuesta = array($msj,array());     
           	return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'ERROR INSERT DEL EQUIPO','cantidadEquipos'=>'0');
                       }
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR INSERT DEL CAPITAN','cantidadEquipos'=>'0');
                       }
                    $repuesta = array($msj,array());     
           	    return $repuesta; }
                
        } // Fin de obtenerListaEquipos	
        

//=====================================================================================================================================        
      
     public function obtenerListaEquipos(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadEquipos'=>'');
                
                $idUsuario = $params->idUsuario;
                               
                $cantidadEquipos = 0;
                
                // Obtiene los datos de los Equipos a los cuales pertenece el Usuario... 
                $_result = $_db->query("SELECT A.id, A.IdUsuarioAdmin, A.NombreEquipo, A.FileEscudo, A.FileFoto,
                                               C.FotoFile as FotoCapitan, C.Nombre as NombreCapitan, C.Apellidos as ApellidosCapitan  
                                               FROM Equipo as A, EquipoJugadores as B, Usuario as C
                                               WHERE A.id = B.IdEquipo AND
                                                     C.id = A.IdUsuarioAdmin AND
                                                     B.IdJugador = ".$idUsuario.      
                                               " ORDER BY A.NombreEquipo")
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadEquipos = $_result->num_rows;
                if ($cantidadEquipos == 0) { throw new Exception("0001"); }
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $msj['cantidadEquipos']=$cantidadEquipos;
                $repuesta = array($msj,$results);     
           	return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'USUARIO NO TIENE EQUIPOS','cantidadEquipos'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de obtenerListaEquipos	
        
//=====================================================================================================================================        
      
     public function obtenerDatosEquipoyJugadores(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadJugadores'=>'','cantidadEdades'=>'','cantidadGeneros'=>'','cantidadFutboles'=>'');
                
                $idEquipo  = $params->idEquipo;
                
                // Obtiene la lista de los Tipos de Edades del Equipo..... 
                $cantidadEdades = 0;
                $_result = $_db->query("SELECT A.IdTipoEdad
                                               FROM EquipoTiposEdad as A
                                               WHERE A.IdEquipo = ".$idEquipo)
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadEdades = $_result->num_rows;
                $edades = array();
                while ($row = $_result->fetch_assoc()) {array_push($edades, $row);}
                $msj['cantidadEdades']=$cantidadEdades;
                
                // Obtiene la lista de los Tipos de Geneross del Equipo...... 
                $cantidadGeneros = 0;
                $_result = $_db->query("SELECT A.IdTipoGenero
                                               FROM EquipoTiposGenero as A
                                               WHERE A.IdEquipo = ".$idEquipo)
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadGeneros = $_result->num_rows;
                $generos = array();
                while ($row = $_result->fetch_assoc()) {array_push($generos, $row);}
                $msj['cantidadGeneros']=$cantidadGeneros;
                
                 // Obtiene la lista de los Tipos de Futbol del Equipo..... 
                $cantidadFutboles = 0;
                $_result = $_db->query("SELECT A.IdTipoFutbol
                                               FROM EquipoTiposFutbol as A
                                               WHERE A.IdEquipo = ".$idEquipo)
                or die('Connect Error 03 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadFutboles = $_result->num_rows;
                $futboles = array();
                while ($row = $_result->fetch_assoc()) {array_push($futboles, $row);}
                $msj['cantidadFutboles']=$cantidadFutboles;
                
                // Obtiene la lista de los Jugadores del Equipo..... 
                $cantidadJugadores = 0;
                $_result = $_db->query("SELECT A.IdJugador, B.Nombre, B.Apellidos, B.EMail, B.TelCelular, B.FotoFile  
                                               FROM EquipoJugadores as A, Usuario as B
                                               WHERE A.IdEquipo = ".$idEquipo." AND B.id = A.IdJugador     
                                               ORDER BY B.Nombre")
                or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadJugadores = $_result->num_rows;
                if ($cantidadJugadores == 0) { throw new Exception("0001"); }
                $jugadores = array();
                while ($row = $_result->fetch_assoc()) {array_push($jugadores, $row);}
                $msj['cantidadJugadores']=$cantidadJugadores;
                
                $datos = array($edades,$generos,$futboles,$jugadores);
                $repuesta = array($msj,$datos);     
           	return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'EQUIPO NO TIENE JUGADORES','cantidadJugadores'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de obtenerListaJugadoresEquipo	
        
//=========================================================================================================================        
      
     public function obtenerListaJugadoresDisp(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'','cantidadJugadoresDisp'=>'');
                
                $idEquipo  = $params->idEquipo;
                $idUsuario = $params->idUsuario;
                
                $cantidadJugadoresDisp = 0;

                // Obtiene los datos de los Jugadores que no estan en este Equipo y que son amigos de este Usuario... 
                $_result = $_db->query("SELECT C.id as IdUsuario, C.Nombre, C.Apellidos, C.EMail, C.TelCelular, C.FotoFile  
                                               FROM UsuarioAmigos as A
                                               LEFT JOIN EquipoJugadores as B ON A.IdAmigo = B.IdJugador AND B.IdEquipo =".$idEquipo.
                                             " LEFT JOIN Usuario as C ON A.IdAmigo = C.id  
                                               WHERE A.IdUsuario = ".$idUsuario." AND B.IdEquipo IS NULL
                                               ORDER BY C.Nombre, C.Apellidos")
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadJugadoresDisp = $_result->num_rows;
                if ($cantidadJugadoresDisp == 0) { throw new Exception("0001"); }
                $results = array();
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                $msj['cantidadJugadoresDisp']=$cantidadJugadoresDisp;
                $repuesta = array($msj,$results);     
           	return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0001','mensaje'=>'NO HAY JUGADORES DISPONIBLES','cantidadJugadoresDisp'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de obtenerListaJugadoresDisp	
        
//=========================================================================================================================        
        
        public function eliminarJugadorEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                $ind_error = 0;
                
                $idEquipo = $params->idEquipo;
                $idJugador = $params->idJugador;
                
                // Borra los registros que forma la relacion de Jugador/Equipo....
                $_result = $_db->query("DELETE FROM EquipoJugadores  
                                               WHERE IdEquipo = ".$idEquipo." AND IdJugador = ".$idJugador)
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR un JUGADOR TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de eliminarJugador en un Equipo	

        //=========================================================================================================================        

        public function incluirJugadorEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                $ind_error = 0;
                
                $idEquipo = $params->idEquipo;
                $idJugador = $params->idJugador;

                // Graba el registro del Jugador en la tabla de EquipoJugadores.
                $_result = $_db->query("SELECT id FROM EquipoJugadores WHERE IdEquipo = ".$idEquipo." and IdJugador = ".$idJugador)
                or die('Connect Error Select 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                           if($stmt = $_db->prepare("INSERT INTO EquipoJugadores (IdEquipo,IdJugador,Status) VALUES (?,?,1)")) {
                                $stmt->bind_param('ii',$idEquipo,$idJugador);
                                $idEquipo = (int) $idEquipo;
                                $idJugador = (int) $idJugador;
                                $stmt->execute();
                                $filas_afectadas = $stmt->affected_rows;
                                $stmt->close();
                                if ($filas_afectadas != 1) {
                                        throw new Exception("0002");
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="JUGADOR REGISTRADO CORRECTAMENTE EN EL EQUIPO SqlState:".$_db->sqlstate;}
                            } else { 
                                    throw new Exception("0003"); 
                                   }
                  }
                  
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE INCLUIR JUGADOR EN EL EQUIPO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Jugador en la Tabla EquipoJugadores -  SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Insert del Jugador - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de incluirJugador en un Equipo	

//=========================================================================================================================        
        
        public function cambiaEscudoEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                
                $idEquipo = $params->idEquipo;
                $fileEscudo = $params->fileEscudo;
               
               if ($stmt = $_db->prepare("UPDATE Equipo SET FileEscudo=? WHERE id=?")) {
			$stmt->bind_param('si', $fileEscudo,$idEquipo);
                        $idEquipo = (int) $idEquipo;
                        $fileEscudo = $_db->real_escape_string($fileEscudo);
                        $stmt->execute();
			$stmt->close();
		} else { 
                        throw new Exception("0001"); 
                       }
                //echo 'paso5';
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE CAMBIAR ESCUDO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0001") {
                        $msj = array('codigoError'=>'0006','mensaje'=>'FALLO CAMBIO DEL ESCUDO');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de cambiaEscudoEquipo	
        
// ==================================================================================================================================        

        public function actualizarTipoFutbolEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                            
                $idEquipo = $params->idEquipo;
                $idTipoFutbol = $params->idTipoFutbol;
                $checked = $params->checked;

                if ($checked=='true') {
                // Graba el registro de tipo de futbol en la tabla de EquipoTiposFutbol
                $_result = $_db->query("SELECT id FROM EquipoTiposFutbol WHERE IdEquipo = ".$idEquipo." and IdTipoFutbol = ".$idTipoFutbol)
                or die('Connect Error Select 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                           if($stmt = $_db->prepare("INSERT INTO EquipoTiposFutbol (IdEquipo,IdTipoFutbol) VALUES (?,?)")) {
                                $stmt->bind_param('ii',$idEquipo,$idTipoFutbol);
                                $idEquipo = (int) $idEquipo;
                                $idTipoFutbol = (int) $idTipoFutbol;
                                $stmt->execute();
                                $filas_afectadas = $stmt->affected_rows;
                                $stmt->close();
                                if ($filas_afectadas != 1) {
                                        throw new Exception("0002");
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="TIPO DE FUTBOL REGISTRADO CORRECTAMENTE EN EL EQUIPO SqlState:".$_db->sqlstate;}
                            } else { 
                                    throw new Exception("0003"); 
                                   }
                  }
                } else {
                    // Borra el Tipo de Futbol de un Equipo....
                    $_result = $_db->query("DELETE FROM EquipoTiposFutbol  
                                               WHERE IdEquipo = ".$idEquipo." AND IdTipoFutbol = ".$idTipoFutbol)
                    or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                }
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ACTUALIZAR EL TIPO DE FUTBOL EN EL EQUIPO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Tipo de Futbol en la Tabla EquipoTiposFutbol -  SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Insert del Tipo de Futbol - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de actualizarTipoFutbolEquipo	

// ==================================================================================================================================        

        public function actualizarTipoEdadEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                            
                $idEquipo = $params->idEquipo;
                $idTipoEdad = $params->idTipoEdad;
                $checked = $params->checked;

                if ($checked=='true') {
                // Graba el registro de tipo de futbol en la tabla de EquipoTiposFutbol
                $_result = $_db->query("SELECT id FROM EquipoTiposEdad WHERE IdEquipo = ".$idEquipo." and IdTipoEdad = ".$idTipoEdad)
                or die('Connect Error Select 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                           if($stmt = $_db->prepare("INSERT INTO EquipoTiposEdad (IdEquipo,IdTipoEdad) VALUES (?,?)")) {
                                $stmt->bind_param('ii',$idEquipo,$idTipoEdad);
                                $idEquipo = (int) $idEquipo;
                                $idTipoEdad = (int) $idTipoEdad;
                                $stmt->execute();
                                $filas_afectadas = $stmt->affected_rows;
                                $stmt->close();
                                if ($filas_afectadas != 1) {
                                        throw new Exception("0002");
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="TIPO DE EDAD REGISTRADO CORRECTAMENTE EN EL EQUIPO SqlState:".$_db->sqlstate;}
                            } else { 
                                    throw new Exception("0003"); 
                                   }
                  }
                } else {
                    // Borra el Tipo de Edad de un Equipo....
                    $_result = $_db->query("DELETE FROM EquipoTiposEdad  
                                               WHERE IdEquipo = ".$idEquipo." AND IdTipoEdad = ".$idTipoEdad)
                    or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                }
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ACTUALIZAR EL TIPO DE EDAD EN EL EQUIPO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Tipo de Edad en la Tabla EquipoTiposFutbol -  SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Insert del Tipo de Edad - SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de actualizarTipoEdadEquipo	

// ==================================================================================================================================        

        public function actualizarTipoGeneroEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                            
                $idEquipo = $params->idEquipo;
                $idTipoGenero = $params->idTipoGenero;
                $checked = $params->checked;

                if ($checked=='true') {
                // Graba el registro de tipo de futbol en la tabla de EquipoTiposFutbol
                $_result = $_db->query("SELECT id FROM EquipoTiposGenero WHERE IdEquipo = ".$idEquipo." and idTipoGenero = ".$idTipoGenero)
                or die('Connect Error Select 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                if ($_result->num_rows == 0) { 
                           if($stmt = $_db->prepare("INSERT INTO EquipoTiposGenero (IdEquipo,idTipoGenero) VALUES (?,?)")) {
                                $stmt->bind_param('ii',$idEquipo,$idTipoGenero);
                                $idEquipo = (int) $idEquipo;
                                $idTipoGenero = (int) $idTipoGenero;
                                $stmt->execute();
                                $filas_afectadas = $stmt->affected_rows;
                                $stmt->close();
                                if ($filas_afectadas != 1) {
                                        throw new Exception("0002");
                                } else {
                                            $msj['codigoError']="0000";
                                            $msj['mensaje']="TIPO DE GENEROL REGISTRADO CORRECTAMENTE EN EL EQUIPO SqlState:".$_db->sqlstate;}
                            } else { 
                                    throw new Exception("0003"); 
                                   }
                  }
                } else {
                    // Borra el Tipo de Genero de un Equipo....
                    $_result = $_db->query("DELETE FROM EquipoTiposGenero  
                                               WHERE IdEquipo = ".$idEquipo." AND IdTipoGenero = ".$idTipoGenero)
                    or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                }
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ACTUALIZAR EL TIPO DE GENERO EN EL EQUIPO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    if ($e->getMessage()=="0002") {
                        $msj = array('codigoError'=>'0002','mensaje'=>'ERROR en el Insert del Tipo de Genero en la Tabla EquipoTiposFutbol -  SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    if ($e->getMessage()=="0003") {
                        $msj = array('codigoError'=>'0003','mensaje'=>'ERROR en el Prepare del Insert del  Tipo de Genero  SqlState: '.$_db->sqlstate,'cantidadInvitaciones'=>'0');
                       }
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de actualizarTipoGeneroEquipo	

//=========================================================================================================================        
       
        public function eliminarEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                $ind_error = 0;
                
                $idEquipo = $params->idEquipo;
                
                // Borra el Equipo....
                $_result = $_db->query("DELETE FROM Equipo WHERE Id = ".$idEquipo )
                or die('Connect Error 01 (' . $_db->connect_errno . ') ' . $_db->connect_error);
              
                // Borra los registros que forma la relacion de Equipo / Jugadores
                $_result = $_db->query("DELETE FROM EquipoJugadores WHERE IdEquipo = ".$idEquipo )
                or die('Connect Error 02 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ELIMINAR EQUIPO Y SUS JUGADORES TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de eliminaEquipo	

//=========================================================================================================================        

   public function enviaMensajeJugadoresEquipo(stdClass $params) {
		
        try {   
                 if (!isset($_SESSION["UsuarioId"])){
                    $msj = array(codigoError=>'9999',mensaje=>'Usuario no ha ingresado');
                    $respuesta = array($msj); 
                    return $respuesta;
                 }
            
                $_db = $this->__construct();
                
                $msj = array('codigoError'=>'','mensaje'=>'');
                $ind_error = 0;
                
                $idEquipo         = $params->idEquipo;
                $nombreEquipo     = $params->nombreEquipo;
                $idUsuarioEnvia   = $params->idUsuarioEnvia;
                $idUsuarioDestino = '';
                $mensaje          = $params->mensaje;
                $mensaje          = substr($mensaje,0,450);
                $mensaje          = 'Mensaje enviado a todos los Jugadores del Equipo ' .$nombreEquipo. ': ' . $mensaje;

                // Obtiene la lista de los Jugadores del Equipo..... 
                $_result = $_db->query("SELECT A.IdJugador, B.Nombre, B.Apellidos, B.EMail, B.TelCelular, B.FotoFile  
                                               FROM EquipoJugadores as A, Usuario as B
                                               WHERE A.IdEquipo = ".$idEquipo." AND B.id = A.IdJugador     
                                               ORDER BY B.Nombre")
                or die('Connect Error 04 (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $jugadores = array();
                while ($row = $_result->fetch_assoc()) {
                       $idUsuarioDestino = $row[IdJugador];
                            if($stmt = $_db->prepare("INSERT INTO UsuarioMensajes (MsjGrupal,IdMensajeAnterior,IdUsuarioEnvia, IdUsuarioDestino,
                                                                    Status, EliminadoUsuarioEnvia, EliminadoUsuarioDestino, Mensaje)
                                                                    VALUES ('S',0,?,?,0,0,0,?)")) {
                                    $stmt->bind_param('iis', $idUsuarioEnvia, $idUsuarioDestino, $mensaje);
                                    $idUsuarioEnvia = (int) $idUsuarioEnvia;
                                    $idUsuarioDestino = (int) $idUsuarioDestino;
                                    $mensaje = $_db->real_escape_string($mensaje);
                                    $stmt->execute();
                                    $filas_afectadas = $stmt->affected_rows;
                                    $stmt->close();
                                    if ($filas_afectadas != 1) {
                                            throw new Exception("0002");
                                    } else {
                                                $msj['codigoError']="0000";
                                                $msj['mensaje']="MENSAJE SE REGISTRO CORRECTAMENTE SqlState:".$_db->sqlstate;}
                                } else { 
                                        throw new Exception("0003"); 
                                    }
                        
                } 
                
                $msj['codigoError']="0000";
                $msj['mensaje']="PROCESO DE ENVIAR MENSAJE A TODOS LOS JUGADORES DE UN EQUIPO TERMINO SATISFACTORIAMENTE";
                $results = array();
                $repuesta = array($msj,$results);     
                return $repuesta; }
                
                catch(Exception $e) {
                    $results = array();
                    $repuesta = array($msj,$results);
                    return $repuesta;}
                
        } // Fin de enviaMensajeJugadoresEquipo	

//=========================================================================================================================        

        
	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();

		return $this;
        } // Fin de Function __destruct
        
        
} // Fin de la Clase UsuarioDB

?>