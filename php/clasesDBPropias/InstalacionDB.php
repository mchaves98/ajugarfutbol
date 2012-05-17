<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: InstalacionDB.php
*
*  Autor: Javier Chaves
*  Fecha: 15/Dic/2011
*  
*  Contiene todos las rutinas para darle mantenimiento a las tablas relacionadas con el Objeto Instalaciones. 
*
*/

include("./Constantes.php");

class InstalacionDB

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

        public function getTodosRegistros($params){
        
 		$_db = $this->__construct();
                $idUsuario = $params->idUsuario;
                $pagInicio = $params->pagInicio;
                $pagFinal = $params->pagFinal;
                
                $_result = $_db->query("SELECT `Instalacion`.`id` FROM `Instalacion`") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                $cantidadInstalaciones=$_result->num_rows;
                
                //Consulta
                $_result = $_db->query("SELECT
                                                `Instalacion`.`id`,
                                                `Instalacion`.`NombreInst`,
                                                `Instalacion`.`NombreContacto`,
                                                `Instalacion`.`Telefono1`,
                                                `Instalacion`.`Telefono2`,
                                                `Instalacion`.`Fax`,
                                                `Instalacion`.`MetodoReservacion`,
                                                `Instalacion`.`URLPaginaWeb`,
                                                `Instalacion`.`EMailInst`,
                                                `Instalacion`.`Direccion1`,
                                                `Instalacion`.`UbicGPSLat`,
                                                `Instalacion`.`UbicGPSLng`,
                                                `Instalacion`.`DescHorario`,
                                                `Cat_Provincia`.`DesLarga` as Provincia,
                                                `Cat_Canton`.`DesLarga` as Canton,
                                                `Cat_Distrito`.`DesLarga` as Distrito,                                                                                                
                                                `Instalacion`.`FileLogo`,
                                                `UsuarioInstalaciones`.`IdInstalacion`
                                        FROM    
                                                `Instalacion`                                      
                                        
                                        left join (`UsuarioInstalaciones`) 
                                               on (`UsuarioInstalaciones`.`IdInstalacion`=`Instalacion`.`id` and
                                                   `UsuarioInstalaciones`.`IdUsuario`=".$idUsuario.")
                                        left join (`Cat_Provincia`,`Cat_Canton`,`Cat_Distrito`)
                                               on (`Instalacion`.`CodProv`=`Cat_Provincia`.`CodProv` and
                                                   `Instalacion`.`CodCanton`=`Cat_Canton`.`CodCanton` and 
                                                   `Instalacion`.`CodDist`=`Cat_Distrito`.`CodDist`) limit ".$pagInicio.",".$pagFinal) 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                
                $results = array();                                              
		while ($row = $_result->fetch_assoc()) {
                        array_push($results, $row);
		}
                $NoFilas = sizeof($results);
                
                $msj =  array('CantFilas'=>'','cantidadInstalaciones'=>'');
                $msj['CantFilas']=$NoFilas;
                $msj['cantidadInstalaciones']=$cantidadInstalaciones;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function getTodosRegistros
//========================================================================================================================	

        public function enviaMensaje($params){
        
 		$_db = $this->__construct();
                $mensaje = $params->mensaje;
                
                
                $destinatario = 'info@ajugarfutbol.com';
                $asunto = "Mensaje de un Usuario desde el sitio"; 
                $cuerpo = ' 
                <html> 
                <head> 
                   <title>ajugarfutbol.com</title> 
                </head> 
                <body> 
                <h1><font color=black>Mensaje:</font></h1> 
                <p><h2><font color="#0099FF">'.$mensaje.'</font></h2></p>                 
                </body> 
                </html>'; 

                $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                $headers .= "MIME-Version: 1.0\n" ;  
                $headers .= "Content-type: text/html; charset=utf-8\n"; 

                mail($destinatario,$asunto,$cuerpo,$headers);
                
                $results = array();     
                $msj =  array('CantFilas'=>'','cantidadInstalaciones'=>'');
                $msj['CantFilas']='';                
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function getTodosRegistros        
//========================================================================================================================	

        public function getConsultaBusqueda($params){
        
             	$_db = $this->__construct();
                $idUsuario = $params->idUsuario;
                $provincia = $params->provincia;
                $canton = $params->canton;
                $distrito = $params->distrito;    
                $tipoCancha = $params->tipoCancha;    
                $superficie = $params->superficie;   
                $filtroProvincia="";
                $filtroCanton="";
                $filtroDistrito="";
                $filtroTipoCancha="";
                $filtroSuperficie="";                
                
                if($provincia!="null"){$filtroProvincia="where `Instalacion`.`CodProv`=".$provincia;}
                if($canton!="null"){$filtroCanton=" and `Instalacion`.`CodCanton`=".$canton;}
                if($distrito!="null"){$filtroDistrito=" and `Instalacion`.`CodDist`=".$distrito;}
                
                if($tipoCancha!="null"){$filtroTipoCancha=" and `Cat_TipoFutbol`.`id`=".$tipoCancha;}
                if($superficie!="null"){$filtroSuperficie=" and `Cat_TipoSuperficie`.`id`=".$superficie;}
                
                
                $_result = $_db->query("SELECT
                                                `Instalacion`.`id`,
                                                `Instalacion`.`NombreInst`,
                                                `Instalacion`.`NombreContacto`,
                                                `Instalacion`.`Telefono1`,
                                                `Instalacion`.`Telefono2`,
                                                `Instalacion`.`Fax`,
                                                `Instalacion`.`MetodoReservacion`,
                                                `Instalacion`.`URLPaginaWeb`,
                                                `Instalacion`.`EMailInst`,
                                                `Instalacion`.`Direccion1`,
                                                `Instalacion`.`UbicGPSLat`,
                                                `Instalacion`.`UbicGPSLng`,
                                                `Instalacion`.`DescHorario`,
                                                `Cat_Provincia`.`DesLarga` as Provincia,
                                                `Cat_Canton`.`DesLarga` as Canton,
                                                `Cat_Distrito`.`DesLarga` as Distrito,                                                                                                
                                                `Instalacion`.`FileLogo`,
                                                `UsuarioInstalaciones`.`IdInstalacion`
                                        FROM    
                                                `Instalacion`                                      
                                        
                                        left join (`UsuarioInstalaciones`) 
                                               on (`UsuarioInstalaciones`.`IdInstalacion`=`Instalacion`.`id` and
                                                   `UsuarioInstalaciones`.`IdUsuario`=".$idUsuario.")
                                        left join (`Cat_Provincia`,`Cat_Canton`,`Cat_Distrito`)
                                               on (`Instalacion`.`CodProv`=`Cat_Provincia`.`CodProv` and
                                                   `Instalacion`.`CodCanton`=`Cat_Canton`.`CodCanton` and 
                                                   `Instalacion`.`CodDist`=`Cat_Distrito`.`CodDist`)
                                                   
                                        inner join (`Cat_TipoFutbol`,`Cat_TipoSuperficie`,`Cancha`)
                                               on (`Cancha`.`IdTipoFutbol`=`Cat_TipoFutbol`.`id` and
                                                   `Cancha`.`IdTipoSuperficie`=`Cat_TipoSuperficie`.`id` and
                                                   `Cancha`.`IdInstalacion`=`Instalacion`.`id`".$filtroTipoCancha.$filtroSuperficie.")
                                                        ".$filtroProvincia.$filtroCanton.$filtroDistrito.
                                        
                                        " GROUP BY `Instalacion`.`id`")  
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
        }  // Fin de function getConsultaBusqueda        
 
//========================================================================================================================
  public function getCanchaPorInstalacion($params){
        
 		$_db = $this->__construct();
                $idInstalacion = $params->idInstalacion;
                
                $_result = $_db->query("select 
                                               Cancha.id,
                                               Cancha.IdInstalacion,       
                                               Cat_TipoFutbol.Descripcion as Tipo,
                                               Cat_TipoSuperficie.Descripcion as Superficie,
                                               Cancha.Dimensiones,
                                               Cancha.HoraInicia,
                                               Cancha.HoraTermina,
                                               Cancha.CanchaFoto
       
                                        from 
                                               Cancha,
                                               Instalacion,
                                               Cat_TipoFutbol,
                                               Cat_TipoSuperficie
       
                                        where 
                                               Cancha.IdInstalacion=Instalacion.id and 
                                               Cancha.IdTipoSuperficie=Cat_TipoSuperficie.id and 
                                               Cat_TipoFutbol.id=Cancha.IdTipoFutbol and        
                                               Instalacion.id=".$idInstalacion) 
                        
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
	                
        }  // Fin de function getCanchaPorInstalacion
//========================================================================================================================
public function getCanchasInstalacion_RollesPersona($params){
        
        $_db = $this->__construct();
        $idInstalacion = $params->idInstalacion;                
        $idPersona     = $params->idPersona;                
        // Obtiene Canchas de la Instalacion               
        $cmdSql = "SELECT id, NombreCancha, HoraInicia, HoraTermina, TipoHora
                            FROM Cancha WHERE IdInstalacion=".$idInstalacion;

        $_resultCanchas = $_db->query($cmdSql)                        
        or die('Connect Error 01 ('.$cmdSql.'  '. $_db->connect_errno . ') ' . $_db->connect_error);
        $resultsCanchas = array();                                              
        while ($row = $_resultCanchas->fetch_assoc()) {array_push($resultsCanchas, $row);}         
        $NoFilas = sizeof($resultsCanchas);
        $msj =  array('CantFilas'=>'','CantRolles'=>'');
        $msj['CantFilas']=$NoFilas;
        // Obtiene Rolles de la Persona
        $cmdSql = "SELECT A.id, A.IdPersona, A.FechaHoraReservacion, A.TiempoRol, A.Comentario,A.FechaHoraFinal,
                          A.IdCancha, B.NombreCancha, B.IdInstalacion, C.NombreInst
                            FROM  RolPersonaReservacion AS A, Cancha AS B, Instalacion AS C
                            WHERE A.IdPersona=".$idPersona.
                            " AND B.IdInstalacion = ".$idInstalacion.
                            " AND A.IdCancha = B.id ".
                            " AND B.IdInstalacion = C.id AND A.FechaHoraFinal>=now() AND A.Estado=1";
        $_resultRolles = $_db->query($cmdSql)                        
        or die('Connect Error 01 ('.$cmdSql.'  '. $_db->connect_errno . ') ' . $_db->connect_error);
        $resultsRolles = array();                                              
        while ($row = $_resultRolles->fetch_assoc()) {array_push($resultsRolles, $row);}         
        $msj['CantRolles'] = sizeof($resultsRolles);
        $results = array($resultsCanchas,$resultsRolles);      
        $respuesta = array($msj,$results); 
        return $respuesta;
	                
}  // Fin de function getCanchasInstalacion_RollesPersona  
//================================================================================================================================
public function getCanchasBloqueos($params){        
        $_db = $this->__construct();
        $idCancha = $params->idCancha;     
        
        // Obtiene Canchas de la Instalacion               
        $cmdSql = "SELECT id, FechaInicial,FechaFinal,HoraInicial,HoraFinal,Comentario
                            FROM ReservacionBloqueo WHERE CONCAT(FechaFinal,' ',HoraFinal)>=NOW() and Estado=1 and IdCancha=".$idCancha." order by FechaRegistro DESC";

        $_resultCanchas = $_db->query($cmdSql)                        
        or die('Connect Error 01 ('.$cmdSql.'  '. $_db->connect_errno . ') ' . $_db->connect_error);
        
        $resultsCanchas = array();                                              
        while ($row = $_resultCanchas->fetch_assoc()) {array_push($resultsCanchas, $row);}         
        $NoFilas = sizeof($resultsCanchas);
        
        $msj =  array('CantFilas'=>'');
        $msj['CantFilas']=$NoFilas;

        $results = array($resultsCanchas);      
        $respuesta = array($msj,$results); 
        return $respuesta;
	                
}  // Fin de function getCanchasInstalacion_RollesPersona        
//========================================================================================================================
  public function getCanchasInstalacion($params){
        
 		$_db = $this->__construct();
                $idInstalacion = $params->idInstalacion;                
                
                $_resultCanchas = $_db->query("select   Cancha.id,
                                                        Cancha.NombreCancha,                                                        
                                                        Cancha.HoraInicia,
                                                        Cancha.HoraTermina
                                                from    Cancha
                                                where   IdInstalacion=".$idInstalacion)                        
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                
                $results = array();                                              
		while ($row = $_resultCanchas->fetch_assoc()) {
                        array_push($results, $row);
		}                
                $NoFilas = sizeof($results);

                $msj =  array('CantFilas'=>'');
                $msj['CantFilas']=$NoFilas;

                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function getCanchasInstalacion
                        
//========================================================================================================================
  public function getCanchasInstalacionCombo($params){
        
                $_db = $this->__construct();
                $idCancha = $params->idCancha;
                $fecha1 = $params->fecha1;
                $fecha2 = $params->fecha2;

                $_resultCanchas = $_db->query("select   Cancha.id,
                                                        Cancha.NombreCancha,
                                                        Cancha.HoraInicia,
                                                        Cancha.HoraTermina
                                                from    Cancha
                                                where   Cancha.id=".$idCancha)                        
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                
                $results = array();                                              
		while ($row = $_resultCanchas->fetch_assoc()) {
                        array_push($results, $row);
		}                
                                                                    
               $_resultDisponibilidad = $_db->query("select     CanchaReservaciones.EstadoReservacion,
                                                                CanchaReservaciones.ModoReservacion,                                                                
                                                                CanchaReservaciones.FechaSolicitud,
                                                                CanchaReservaciones.FechaHoraReservacion,
                                                                CanchaReservaciones.IdPersona as idUsuario,                                                                
                                                                Persona.Nombre,
                                                                Persona.Apellidos,
                                                                Persona.TelCelular,
                                                                Persona.Email,
                                                                Persona.FotoFile

                                                        from    CanchaReservaciones,Persona 

                                                        where   CanchaReservaciones.idCancha=".$idCancha." and Persona.id=CanchaReservaciones.IdPersona and
                                                                FechaHoraReservacion BETWEEN '".$fecha1."' and '".$fecha2."' and CanchaReservaciones.EstadoReservacion!=5
                                                                      order by FechaSolicitud")

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                              

                while ($row = $_resultDisponibilidad->fetch_assoc()) {
                        array_push($results, $row);
                }
                
                $_tarifas = $_db->query("select     `CanchaTarifas`.`DiaSemana`,
                                                    `CanchaTarifas`.`HoraInicio`,
                                                    `CanchaTarifas`.`HoraFinal`,
                                                    `CanchaTarifas`.`Tarifa`
                                                    
                                         from       `CanchaTarifas` 

                                         where   `CanchaTarifas`.`idCancha`=".$idCancha)

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                              
                $resultsTarifas = array();
                while ($row = $_tarifas->fetch_assoc()) {
                        array_push($resultsTarifas, $row);
                }
                
                $msj =  array('CantFilas'=>'','CantFilasTarifas'=>'');
                
                $NoFilasTarifas = sizeof($resultsTarifas);                                                                      
                $msj['CantFilasTarifas']=$NoFilasTarifas;       
                
                $NoFilas = sizeof($results);                
                $msj['CantFilas']=$NoFilas;
                
                $results=array($results,$resultsTarifas);
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function getCanchasInstalacionCombo
//========================================================================================================================
  public function getCanchaAdm($params){
        
                $_db = $this->__construct();
                $idCancha = $params->idCancha;
                $fecha1 = $params->fecha1;
                $fecha2 = $params->fecha2;                

                $_resultCanchas = $_db->query("select   Cancha.id,
                                                        Cancha.NombreCancha,
                                                        Cancha.HoraInicia,
                                                        Cancha.HoraTermina
                                                from    Cancha
                                                where   Cancha.id=".$idCancha)                        
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                
                $results = array();                                              
		while ($row = $_resultCanchas->fetch_assoc()) {
                        array_push($results, $row);
		}                
                                                                    
               $_resultDisponibilidad = $_db->query("select     CanchaReservaciones.EstadoReservacion,
                                                                CanchaReservaciones.id,
                                                                CanchaReservaciones.ModoReservacion,                                                                                                                                
                                                                CanchaReservaciones.FechaSolicitud,
                                                                CanchaReservaciones.FechaHoraReservacion,
                                                                CanchaReservaciones.ComentarioReservacion,
                                                                CanchaReservaciones.IdPersona as idUsuario,
                                                                CanchaReservaciones.IdRol as IdRol,
                                                                Persona.Nombre,
                                                                Persona.Apellidos,
                                                                Persona.TelCelular,
                                                                Persona.Email,
                                                                Persona.FotoFile

                                                        from    CanchaReservaciones,Persona 

                                                        where   CanchaReservaciones.idCancha=".$idCancha." and
                                                                Persona.id=CanchaReservaciones.IdPersona and 
                                                                FechaHoraReservacion BETWEEN '".$fecha1."' and '".$fecha2."' and CanchaReservaciones.EstadoReservacion!=5
                                                                     order by FechaSolicitud")

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                              

                while ($row = $_resultDisponibilidad->fetch_assoc()) {
                        array_push($results, $row);
                }

                $_tarifas = $_db->query("select     `CanchaTarifas`.`DiaSemana`,
                                                    `CanchaTarifas`.`HoraInicio`,
                                                    `CanchaTarifas`.`HoraFinal`,
                                                    `CanchaTarifas`.`Tarifa`
                                                    
                                         from       `CanchaTarifas` 

                                         where   `CanchaTarifas`.`idCancha`=".$idCancha)

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                              
                $resultsTarifas = array();
                while ($row = $_tarifas->fetch_assoc()) {
                        array_push($resultsTarifas, $row);
                }
                
                $msj =  array('CantFilas'=>'','CantFilasTarifas'=>'');
                
                $NoFilasTarifas = sizeof($resultsTarifas);                                                                      
                $msj['CantFilasTarifas']=$NoFilasTarifas;       
                
                $NoFilas = sizeof($results);                
                $msj['CantFilas']=$NoFilas;
                
                $results=array($results,$resultsTarifas);
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function getCanchaAdm                        
//========================================================================================================================
         public function getInstalacioFotos($params){
        
             	$_db = $this->__construct();
                $idInstalacion = $params->idInstalacion;                
                
                $_result = $_db->query("select 
                                                InstalacionFotos.InstalacionFoto,
                                                `Instalacion`.`NombreInst`,
                                                `Cat_Provincia`.`DesLarga` as Provincia,
                                                `Cat_Canton`.`DesLarga` as Canton,
                                                `Cat_Distrito`.`DesLarga` as Distrito   
                                        from    
                                                Instalacion,InstalacionFotos,`Cat_Provincia`,`Cat_Canton`,`Cat_Distrito`
                                                
                                        where 
                                                Instalacion.id=".$idInstalacion." and Instalacion.id=InstalacionFotos.IdInstalacion and 
                                                `Instalacion`.`CodProv`=`Cat_Provincia`.`CodProv` and
                                                `Instalacion`.`CodCanton`=`Cat_Canton`.`CodCanton` and 
                                                `Instalacion`.`CodDist`=`Cat_Distrito`.`CodDist`")  
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
        }  // Fin de function getInstalacioFotos
//========================================================================================================================
         public function getInstalacion($params){
        
             	$_db = $this->__construct();
                $idInstalacion = $params->idInstalacion;                
                
                $_result = $_db->query("select  `Instalacion`.`id`,
                                                `Instalacion`.`NombreInst`,
                                                `Instalacion`.`NombreContacto`,
                                                `Instalacion`.`TelContacto`,
                                                `Instalacion`.`EMailContac`,
                                                `Instalacion`.`Telefono1`,
                                                `Instalacion`.`Telefono2`,
                                                `Instalacion`.`Fax`,
                                                `Instalacion`.`MetodoReservacion`,
                                                `Instalacion`.`URLPaginaWeb`,
                                                `Instalacion`.`EMailInst`,
                                                `Instalacion`.`Direccion1`,
                                                `Instalacion`.`UbicGPSLat`,
                                                `Instalacion`.`UbicGPSLng`,
                                                `Instalacion`.`DescHorario`,
                                                `Instalacion`.`FileLogo`,
                                                `Instalacion`.`CodProv` as Provincia,
                                                `Instalacion`.`CodCanton` as Canton,
                                                `Instalacion`.`CodDist` as Distrito
                                        from    
                                                Instalacion
                                                
                                        where 
                                                Instalacion.id=".$idInstalacion)  
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
        }  // Fin de function getInstalacion
//========================================================================================================================
  public function editaInstalacion($params){
        
        $_db = $this->__construct();
        $idInstalacion = $params->idInstalacion;     
        $NombreInst = $params->nombreInstalacion;
        $NombreContacto = $params->nombreEncargado;
        $TelContacto = $params->telefonoEncargado;
        $EMailContac = $params->correoEncargado;
        $Telefono1 = $params->telefono1;
        $Telefono2 = $params->telefono2;
        $Fax = $params->fax;
        $URLPaginaWeb = $params->paginaWeb;
        $EMailInst = $params->correoInstalacion;
        $Direccion1 = $params->detallesDireccion;
        $UbicGPSLat = $params->latitud;
        $UbicGPSLng = $params->longitud;
        $DescHorario = $params->horarioGeneral;
        $CodProv = $params->provincia;
        $CodCanton = $params->canton;
        $CodDist = $params->distrito;        
        
        if($stmt = $_db->prepare("UPDATE Instalacion SET NombreInst=?,
                                                         NombreContacto=?,
                                                         TelContacto=?,
                                                         EMailContac=?,
                                                         Telefono1=?,                                                              
                                                         Telefono2=?,
                                                         Fax=?,
                                                         URLPaginaWeb=?,
                                                         EMailInst=?,
                                                         Direccion1=?,
                                                         UbicGPSLat=?,
                                                         UbicGPSLng=?,
                                                         DescHorario=?,
                                                         CodProv=?,
                                                         CodCanton=?,
                                                         CodDist=?
                                                         WHERE id=?")) {
                        $stmt->bind_param('ssssssssssddsiiii',$NombreInst,$NombreContacto,$TelContacto,$EMailContac,
                                                         $Telefono1,$Telefono2,$Fax,
                                                         $URLPaginaWeb,$EMailInst,$Direccion1,$UbicGPSLat,$UbicGPSLng,$DescHorario,$CodProv,$CodCanton,$CodDist,$idInstalacion);                       
                	$NombreInst = $_db->real_escape_string($NombreInst);
			$NombreContacto = $_db->real_escape_string($NombreContacto);			
                        $TelContacto = $_db->real_escape_string($TelContacto);
                        $EMailContac = $_db->real_escape_string($EMailContac);
                        $Telefono1 = $_db->real_escape_string($Telefono1);
                        $Telefono2 = $_db->real_escape_string($Telefono2);
                        $Fax = $_db->real_escape_string($Fax);
                        $URLPaginaWeb = $_db->real_escape_string($URLPaginaWeb);
                        $EMailInst = $_db->real_escape_string($EMailInst);
                        $Direccion1 = $_db->real_escape_string($Direccion1);
                        $DescHorario = $_db->real_escape_string($DescHorario);
                        $idInstalacion=(int)$idInstalacion;                      
                        $UbicGPSLat = (double) $UbicGPSLat;
                        $UbicGPSLng = (double) $UbicGPSLng;
                        $CodCanton = (int) $CodCanton;
                        $CodProv = (int) $CodProv;
                        $CodDist = (int) $CodDist;
                        
                        $stmt->execute();
                        $filas_afectadas = $stmt->affected_rows;
                        $stmt->close();                       
                                
        } else { throw new Exception("0005");}  
        
        $msj =  array('CantFilas'=>'');        
        $results=array();
        $respuesta = array($msj,$results); 

        return $respuesta;	                                                               	                
}  // Fin de function editaInstalacion
//
//================================================================================================================                      
        // Grabar el nombre del archivo del logo de la instalacion
        public function grabarNombreFoto($foto,$id)
	{
                $_db = $this->__construct();
                
                
                // echo $foto;                
                if ($stmt = $_db->prepare("UPDATE Instalacion SET FileLogo=? WHERE id=?")) {
			$stmt->bind_param('si', $foto, $id);

			$foto = $_db->real_escape_string($foto);
			$id = (int) $id;

			$stmt->execute();
				
			$stmt->close();
		}

		return; 
                
	} // Fin de function grabarNombreFoto
//========================================================================================================================
        
	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();

		return $this;
        } // Fin de Function __destruct
        
        
} // Fin de la Clase IntalacionDB
?>