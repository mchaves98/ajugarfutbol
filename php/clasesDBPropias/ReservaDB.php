<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: ReservaDB.php
*
*  Autor: Javier Chaves
*  Fecha: 15/Dic/2011
*  
*  Contiene todos las rutinas para darle mantenimiento a las tablas relacionadas con el Objeto Reservacion. 
*
*/

include("./Constantes.php");
require_once("Mail.php");

class ReservaDB

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

        public function reservacionCancha($params){
        
 		$_db = $this->__construct();
                $idCancha = $params->idCancha;
                $idUsuario = $params->idUsuario;
                $idEquipo = $params->idEquipo;  
                $idUsuarioRegistro = $params->idUsuario;                
                $FechayHora = $params->fechaYhora;
                $tarifa = '0';
                $estadoReservacion =  $params->estadoReservacion;
                $modoReservacion = '0'; 
                $IndNoShow = '0';
                $FechaCancelacion = '2012-02-25';                  
                $comentarioReservacion = $params->comentarioReservacion;
                if($comentarioReservacion==""){$comentarioReservacion='Sin comentario';}
                $comentarioCancelacion ='Sin comentario';
                $comentarioNoShow = 'Sin comentario';
                $results = array();
                
                $_result = $_db->query("select      `CanchaReservaciones`.`id`
                                        from        `CanchaReservaciones`
                                        where       `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                    `CanchaReservaciones`.`idCancha`=".$idCancha)

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
            
            $filas=$_result->num_rows;
            if($estadoReservacion=='1'||$estadoReservacion==1){$filas=0;}
            if($estadoReservacion==6){$mjsCorreoRetador='el reto';}else{$mjsCorreoRetador='la reservaci&oacute;n';}
            if($filas > 0)
            {
                $registros=0;                
            }
            else
            {                
                 $registros=1;
                    if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                               IdPersona,
                                               IdEquipo,
                                               IdUsuarioRegistro,
                                               FechaHoraReservacion,
                                               Tarifa,
                                               EstadoReservacion,
                                               ModoReservacion,
                                               IndNoShow,
                                               FechaCancelacion,
                                               ComentarioReservacion,
                                               ComentarioCancelacion,
                                               ComentarioNoShow
                                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                        $stmt->bind_param('iiiisiiiissss',$idCancha,$idUsuario,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                         $estadoReservacion,$modoReservacion,$IndNoShow,
                                                         $FechaCancelacion,$comentarioReservacion,$comentarioCancelacion,$comentarioNoShow);
	
                        $idCancha = (int) $idCancha;
                        $idUsuario = (int) $idUsuario;
                        $idEquipo = (int) $idEquipo;
                        $idUsuarioRegistro = (int) $idUsuarioRegistro;
                        $FechayHora = $_db->real_escape_string($FechayHora);
                        $tarifa = (int) $tarifa;
                        $estadoReservacion = (int) $estadoReservacion;
                        $modoReservacion = (int) $modoReservacion;
                        $IndNoShow = (int) $IndNoShow;
                        $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);
                        $comentarioReservacion = $_db->real_escape_string($comentarioReservacion);
                        $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                        $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                        $stmt->execute();
                        $stmt->close();    
                        
                        $_result = $_db->query("select      `Persona`.`EMail` as EMail
                                                from        `Persona`
                                                where       `Persona`.`id`= ".$idUsuario)

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                        while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                        $correoUsuario=$results[0]["EMail"];                        
                        $destinatario = $correoUsuario; 
                        $asunto = "Confirmaci�n de Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te confirmamos '.$mjsCorreoRetador.' que realiz&oacute;. Queda en espera del administrador de la cancha aprobar o cancelar la reservaci&oacute;n.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reservaci&oacute;n o reto(s):</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 

                        //echo 'mail1';
                        //mail($destinatario,$asunto,$cuerpo,$headers);
                }
            }
                                                                                      		                
                $msj =  array('mensaje'=>'');
                $msj['mensaje']=$registros;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function reservacionCancha
//========================================================================================================================	

        public function reservacionReto($params){
        
            $_db = $this->__construct();
            $idCancha = $params->idCancha;
            $idUsuario = $params->idUsuario;
            $idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuario;                
            $FechayHora = $params->fechaYhora;
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                  
            $comentarioReservacion = $params->comentarioReservacion;
            if($comentarioReservacion==""){$comentarioReservacion='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            $results = array();
            $registros=1;
            
            $_result = $_db->query("select      `CanchaReservaciones`.`id`
                                    from        `CanchaReservaciones`
                                    where       `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and CanchaReservaciones.EstadoReservacion!=5 and
                                                `CanchaReservaciones`.`EstadoReservacion`=7 and 
                                                `CanchaReservaciones`.`idCancha`=".$idCancha)

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
            
            $filas=$_result->num_rows;            
            
            if($filas > 0)
            {
                $registros=0;                
            }
            else
            {             
             if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                               IdPersona,
                                               IdEquipo,
                                               IdUsuarioRegistro,
                                               FechaHoraReservacion,
                                               Tarifa,
                                               EstadoReservacion,
                                               ModoReservacion,
                                               IndNoShow,
                                               FechaCancelacion,
                                               ComentarioReservacion,
                                               ComentarioCancelacion,
                                               ComentarioNoShow
                                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                        $stmt->bind_param('iiiisiiiissss',$idCancha,$idUsuario,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                         $estadoReservacion,$modoReservacion,$IndNoShow,
                                                         $FechaCancelacion,$comentarioReservacion,$comentarioCancelacion,$comentarioNoShow);
	
                        $idCancha = (int) $idCancha;
                        $idUsuario = (int) $idUsuario;
                        $idEquipo = (int) $idEquipo;
                        $idUsuarioRegistro = (int) $idUsuarioRegistro;
                        $FechayHora = $_db->real_escape_string($FechayHora);
                        $tarifa = (int) $tarifa;
                        $estadoReservacion = (int) $estadoReservacion;
                        $modoReservacion = (int) $modoReservacion;
                        $IndNoShow = (int) $IndNoShow;
                        $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);
                        $comentarioReservacion = $_db->real_escape_string($comentarioReservacion);
                        $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                        $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                        $stmt->execute();
                        $stmt->close();    
                        
                        $_result = $_db->query("select     `Persona`.`EMail` as EMail,`Persona`.`Nombre`,`Persona`.`Apellidos`,`Persona`.`TelCelular`
                                                from       `Persona`
                                                where      `Persona`.`id`= ".$idUsuario)

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                        while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                        $correoUsuario=$results[0]["EMail"];
                        $nombreAceptaReto=$results[0]["Nombre"].' '.$results[0]["Apellidos"];
                        $telefonoAceptaReto=$results[0]["TelCelular"];
                        //Envio de conformacion del Reto
                        $destinatario = $correoUsuario; 
                        $asunto = "Confirmaci�n de Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te confirmamos que aceptastes un reto . Queda en espera del administrador de la cancha aprobar o cancelar el reto.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reto(s):</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 
                        
                        //mail($destinatario,$asunto,$cuerpo,$headers);
                        //======================================================================================
                        //Envio correo al que creo el reto
                        //======================================================================================
                        $destinatario = $correoUsuario; 
                        $asunto = "Confirmaci�n de Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te notificamos que su reto fue aceptado por '.$nombreAceptaReto.', si deseas comunicarte con esta persona tel.'.$telefonoAceptaReto.'. Queda en espera del administrador de la cancha aprobar o cancelar el reto.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reto:</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 
                        
                       // mail($destinatario,$asunto,$cuerpo,$headers);
                     }
                }      
                                                                              		                                                                             
                $msj =  array('mensaje'=>'');  
                $msj['mensaje']=$registros;
                $respuesta = array($msj,$results); 
                
		return $respuesta;                                
	                
        }  // Fin de function reservacionReto
//========================================================================================================================	

        public function buscaRetoAdm($params){
        
            $_db = $this->__construct();
            $idCancha = $params->idCancha;
            $idUsuario = $params->idUsuario;            
            $idUsuarioRegistro = $params->usuarioRegistro;                
            $idEquipo = $params->idEquipo;              
            $FechayHora = $params->fechaYhora;
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;
            $fechaYhoraCorreo=$params->fechaYhoraCorreo;
            $nombreCanchaCorreo=$params->nombreCanchaCorreo;        
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                  
            $comentarioReservacion = $params->comentarioReservacion;
            $comentarioRetador = $params->comentarioRetador;
            $idReservacionRetador = $params->idReservacionRetador;
            if($comentarioReservacion==""){$comentarioReservacion='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            
            $registros=1;
            $results = array();
            
            $_result = $_db->query("select      `CanchaReservaciones`.`id`
                                    from        `CanchaReservaciones`
                                    where       `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and CanchaReservaciones.EstadoReservacion!=5 and
                                                `CanchaReservaciones`.`EstadoReservacion`=7 and 
                                                `CanchaReservaciones`.`idCancha`=".$idCancha)

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
            
            $filas=$_result->num_rows;            
            
            if($filas > 0)
            {
                $registros=0;                
            }
            else
            {             
             if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                               IdPersona,
                                               IdEquipo,
                                               IdUsuarioRegistro,
                                               FechaHoraReservacion,
                                               Tarifa,
                                               EstadoReservacion,
                                               ModoReservacion,
                                               IndNoShow,
                                               FechaCancelacion,
                                               ComentarioReservacion,
                                               ComentarioCancelacion,
                                               ComentarioNoShow
                                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                        $stmt->bind_param('iiiisiiiissss',$idCancha,$idUsuario,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                         $estadoReservacion,$modoReservacion,$IndNoShow,
                                                         $FechaCancelacion,$comentarioReservacion,$comentarioCancelacion,$comentarioNoShow);
	
                        $idCancha = (int) $idCancha;
                        $idUsuario = (int) $idUsuario;
                        $idEquipo = (int) $idEquipo;
                        $idUsuarioRegistro = (int) $idUsuarioRegistro;
                        $FechayHora = $_db->real_escape_string($FechayHora);
                        $tarifa = (int) $tarifa;
                        $estadoReservacion = (int) $estadoReservacion;
                        $modoReservacion = (int) $modoReservacion;
                        $IndNoShow = (int) $IndNoShow;
                        $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);
                        $comentarioReservacion = $_db->real_escape_string($comentarioReservacion);
                        $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                        $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                        $stmt->execute();
                        $registros = $stmt->affected_rows;
                        $stmt->close();    
                        
                        $_result = $_db->query("select `Persona`.`EMail` as EMail,`Persona`.`Nombre`,`Persona`.`Apellidos`,`Persona`.`TelCelular`
                                                from   `Persona`,`CanchaReservaciones`
                                                where  `CanchaReservaciones`.FechaHoraReservacion='".$FechayHora."' and `CanchaReservaciones`.IdCancha=".$idCancha." and 
                                                       `CanchaReservaciones`.IdPersona=`Persona`.id and
                                                        (CanchaReservaciones.EstadoReservacion=6 or CanchaReservaciones.EstadoReservacion=10) 
                                                        order by `CanchaReservaciones`.id asc")

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                        while ($row = $_result->fetch_assoc()) {array_push($results, $row);}                        
                        $nombreAceptaReto=$results[1]["Nombre"].' '.$results[1]["Apellidos"];
                        $telefonoAceptaReto=$results[1]["TelCelular"];                        
                        //Envio de conformacion del Reto
                        $destinatarios = $results[1]["EMail"]; 
                        $asunto = "Reservación de Cancha - Reto"; 
                        $saludo = 'Hey '.$results[1]["Nombre"].'!';
                        $dominio= 'http://'.PATHWEB;
                        $nombreRetador=$results[0]["Nombre"].' '.$results[0]["Apellidos"];
                        $telefonoRetador=$results[0]["TelCelular"];
                        $contenido ='Se ha realizado una reservaci&oacute;n correctamente a su nombre en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.
                                     <br>Y te hemos encontrado un reto contra '.$nombreRetador.' si deseas comunicarte con esta persona llama al: '.$telefonoRetador.', este reto ser&aacute; para el d&iacute;a ya mencionado.
                                     <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                     <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                     <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                     <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                        $alto = 590;
                        $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                        $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                        $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                        $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                        $mail = new Mail;
                        $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                        //======================================================================================
                        //Envio correo al que creo el reto
                        //======================================================================================
                        $destinatarios = $results[0]["EMail"]; 
                        $asunto = "Reservación de Cancha - Reto"; 
                        $saludo = 'Hey '.$results[0]["Nombre"].'!';
                        $contenido ='Se ha realizado una reservaci&oacute;n correctamente a su nombre en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.
                                     <br>Y te hemos encontrado un reto contra '.$nombreAceptaReto.' si deseas comunicarte con esta persona llama al: '.$telefonoAceptaReto.', este reto ser&aacute; para el d&iacute;a ya mencionado.
                                     <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                     <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                     <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                     <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                        $alto = 590;
                        $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                        $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                        $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                        $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                        $mail = new Mail;
                        $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                     }
                        if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET ComentarioReservacion=? WHERE id=?")) {                        
                            $stmt->bind_param('si',$comentarioRetador,$idReservacionRetador);	

                            $comentarioRetador = $_db->real_escape_string($comentarioRetador);
                            $idReservacionRetador = (int) $idReservacionRetador;

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
                }      
                                                                              		                                                                             
                $msj =  array('mensaje'=>'');  
                $msj['mensaje']=$registros;
                $respuesta = array($msj,$results); 
                
		return $respuesta;                                
	                
        }  // Fin de function buscaRetoAdm
//========================================================================================================================	

        public function getUsuarioAceptoReto($params){        
            $_db = $this->__construct();
            $idCancha = $params->idCancha;
            $FechayHora = $params->fechaYhora;
            
            $results = array();
            
            $_result = $_db->query("select  `CanchaReservaciones`.`id`,                                            
                                            CanchaReservaciones.FechaSolicitud,
                                            CanchaReservaciones.FechaHoraReservacion,
                                            CanchaReservaciones.ComentarioReservacion,
                                            CanchaReservaciones.IdPersona,
                                            Persona.Nombre,
                                            Persona.Apellidos,
                                            Persona.TelCelular,
                                            Persona.Email,
                                            Persona.FotoFile
                                
                                    from    `CanchaReservaciones`,Persona
                                    where   `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and
                                            (`CanchaReservaciones`.`EstadoReservacion`=10 or `CanchaReservaciones`.`EstadoReservacion`=7) and Persona.id=CanchaReservaciones.IdPersona and 
                                            `CanchaReservaciones`.`idCancha`=".$idCancha)

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                                                               
            while ($row = $_result->fetch_assoc()) {
                    array_push($results, $row);
            }
            $NoFilas = sizeof($results);
            $msj =  array('mensaje'=>'','CantFilas'=>'');
            $msj['CantFilas']=$NoFilas;
                         
            $respuesta = array($msj,$results); 

            return $respuesta;                                
	                
        }  // Fin de function buscaRetoAdm
//========================================================================================================================

        public function creaReservacionAdm($params){
        
 		$_db = $this->__construct();
                $idCancha = $params->idCancha;
                $idUsuario = $params->idUsuario;                
                $idEquipo = $params->idEquipo;  
                $idUsuarioRegistro = $params->idUsuarioRegistro;                
                $FechayHora = $params->fechaYhora;
                $fechaYhoraCorreo=$params->fechaYhoraCorreo;
                $nombreCanchaCorreo=$params->nombreCanchaCorreo;                                
                $tarifa = '0';
                $estadoReservacion =  $params->estadoReservacion;                
                $modoReservacion = '0'; 
                $IndNoShow = '0';
                $FechaCancelacion = '2012-02-25';                  
                $comentarioReservacion = $params->comentarioReservacion;
                if($comentarioReservacion==""){$comentarioReservacion='Sin comentario';}
                $comentarioCancelacion ='Sin comentario';
                $comentarioNoShow = 'Sin comentario';
                $results = array();                 
                $_result = $_db->query("select      `CanchaReservaciones`.`id`
                                        from        `CanchaReservaciones`
                                        where       `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                    `CanchaReservaciones`.`idCancha`=".$idCancha)

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                              
            if($_result->num_rows > 0)
            {
                $registros=0;   
            }
            else
            {                
                 $registros=1;
                    if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                               IdPersona,
                                               IdEquipo,
                                               IdUsuarioRegistro,
                                               FechaHoraReservacion,
                                               Tarifa,
                                               EstadoReservacion,
                                               ModoReservacion,
                                               IndNoShow,
                                               FechaCancelacion,
                                               ComentarioReservacion,
                                               ComentarioCancelacion,
                                               ComentarioNoShow
                                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                        $stmt->bind_param('iiiisiiiissss',$idCancha,$idUsuario,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                         $estadoReservacion,$modoReservacion,$IndNoShow,
                                                         $FechaCancelacion,$comentarioReservacion,$comentarioCancelacion,$comentarioNoShow);
	
                        $idCancha = (int) $idCancha;
                        $idUsuario = (int) $idUsuario;
                        $idEquipo = (int) $idEquipo;
                        $idUsuarioRegistro = (int) $idUsuarioRegistro;
                        $FechayHora = $_db->real_escape_string($FechayHora);
                        $tarifa = (int) $tarifa;
                        $estadoReservacion = (int) $estadoReservacion;
                        $modoReservacion = (int) $modoReservacion;
                        $IndNoShow = (int) $IndNoShow;
                        $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);
                        $comentarioReservacion = $_db->real_escape_string($comentarioReservacion);
                        $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                        $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                        $stmt->execute();
                        $stmt->close();  
                        
                        $mencionaReto='';$mencionaRetoTitulo='';
                        if($estadoReservacion==6){$mencionaReto='<br>Te estamos buscando un reto para que puedas mejenguear, cuando encontremos a tu contrincante te enviaremos un correo.';$mencionaRetoTitulo=' - Reto';}
                        $_result = $_db->query("select      `Persona`.`EMail` as EMail,Nombre
                                                from        `Persona`
                                                where       `Persona`.`id`= ".$idUsuario)

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                        while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                        $destinatarios = $results[0]["EMail"];  
                        $nombre=$results[0]["Nombre"];                                                                         
                        $asunto = "Reservación de Cancha".$mencionaRetoTitulo; 
                        $saludo = 'Hey '.$nombre.'!';
                        $dominio= 'http://'.PATHWEB;
                        $contenido ='Se ha realizado una reservaci&oacute;n correctamente a su nombre en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.
                                     '.$mencionaReto.'
                                     <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                     <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                     <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                     <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                        $alto = 570;
                        $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                        $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                        $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                        $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                        $mail = new Mail;
                        $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                }
            }
                                                                                     		                
                $msj =  array('mensaje'=>'');
                $msj['mensaje']=$registros;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function creaReservacionAdm
//========================================================================================================================	

        public function creaReservacion_y_registraUsuarioAdm($params){
                    
            $_db = $this->__construct();
            $idCancha = $params->idCancha; 
            $idInstalacion = $params->idInstalacion; 
            $idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuarioRegistro;                
            $FechayHora = $params->fechaYhora;
            $fechaYhoraCorreo=$params->fechaYhoraCorreo;
            $nombreCanchaCorreo=$params->nombreCanchaCorreo; 
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;                
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                  
            $comentarioReservacion = $params->comentarioReservacion;
            if($comentarioReservacion==""){$comentarioReservacion='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            $msj = array('codigoError'=>'','mensaje'=>'','id'=>'');
            $ind_error = 0;
            //============================================================================================
            //Variables para registrar usuario
            $correo = $params->correoRegistar;
            if($correo==""){$correo="null";}
            $tipoUsuario = 'R';
            $codPais = 1;  
            //=============================================================================
            //Crea contrase�a para el usuario a registrar por parte del administrador
            /*$keychars = "abcdefghijklmnpqrstuvwxyz23456789";
            $length = 6;
            $randkey = "";
            $max=strlen($keychars)-1;
            for ($i=0;$i<$length;$i++) {$randkey .= substr($keychars, rand(0, $max), 1);}
            $contrasena = $randkey;
            $contrasenaMd5 = md5($contrasena);*/          
            //FIN Crea contrase�a para el usuario a registrar por parte del administrador
            //=============================================================================
            $cedula = $params->cedulaRegistar;
            $nombre = $params->nombreRegistar;
            $apellido = $params->apellidoRegistar;
            $telefono = $params->telefonoRegistar;
            $telefono2 = $params->telefono2Registar;
            $genero = $params->generoRegistar;
            $idUsuario='';     
            $results = array(); 
            // Valida que el correo no exista.   
            $_result = $_db->query("SELECT Persona.id FROM Persona,InstalacionClientes WHERE EMail = '".$correo."' or NoCedula= '".$cedula."' and InstalacionClientes.IdPersona=Persona.id") 
            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
            if ($_result->num_rows > 0) { 
                     $msj['codigoError']="0001";
                     $msj['mensaje']="CORREO YA EXISTE";
                     $msj['id']=0;
                     $ind_error = 1;
            } else {
                //Inserta el Usuario
                $_result = $_db->query("SELECT id FROM Persona WHERE EMail = '".$correo."' or NoCedula= '".$cedula."'") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}                
                if ($_result->num_rows > 0) {                          
                    $idUsuario=$results[0]["id"]; 
                         $msj['codigoError']="0001";
                         $msj['mensaje']="CORREO YA EXISTE";
                         $msj['id']=0;
                         $ind_error = 1;
                }else{
                    if($correo=="null"){$correo="";}
                    if($stmt = $_db->prepare("INSERT INTO Persona (NoCedula,
                                                                   EMail,
                                                                   Nombre,
                                                                   Apellidos,
                                                                   TelCelular,
                                                                   Telefono2,
                                                                   Genero,
                                                                   CodPais                                                               
                                                                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")) {

                            $stmt->bind_param('sssssssi',$cedula,$correo,$nombre,$apellido,
                                                             $telefono,$telefono2,$genero,
                                                             $codPais);

                            $cedula = $_db->real_escape_string($cedula);
                            $correo = $_db->real_escape_string($correo);                        
                            $nombre = $_db->real_escape_string($nombre);
                            $apellido = $_db->real_escape_string($apellido);
                            $telefono = $_db->real_escape_string($telefono);
                            $telefono2 = $_db->real_escape_string($telefono2);
                            $genero = $_db->real_escape_string($genero);
                            $codPais = (int) $codPais;

                            $stmt->execute();

                            // echo 'paso4 filas afectadas:'.$stmt->affected_rows;
                            $filas_afectadas = $stmt->affected_rows;

                            $idUsuario = $_db->insert_id;
                            $stmt->close();

                            if ($filas_afectadas != 1) {
                                    $msj['codigoError']="0003";
                                    $msj['mensaje']="ERROR EN EL INSERT SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;                                
                                    $ind_error = 1;

                            } else {
                                    $msj['codigoError']="0000";
                                    $msj['mensaje']="USUARIO REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;                                
                                    $ind_error = 0;
                                    }

                         } else { $msj['codigoError']="0002";
                                  $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;                              
                                  $ind_error = 1;
                                 } 
                }
              //=====================================================================================================================================
              //Luego de registrar al usuario lo regitro en la tabla de clientes frecuentes de la instalacion              
              //=====================================================================================================================================
             
                if($stmt = $_db->prepare("INSERT INTO InstalacionClientes
                                                              (IdInstalacion,
                                                               IdPersona,                                                               
                                                               NivelConfianza                                                               
                                                               ) VALUES (?,?,0)")) {

                        $stmt->bind_param('ii',$idInstalacion,$idUsuario);
                        	
                        $idInstalacion = (int) $idInstalacion;                        
                        $idUsuario = (int) $idUsuario;                        

                        $stmt->execute();

                        // echo 'paso4 filas afectadas:'.$stmt->affected_rows;
                        $filas_afectadas = $stmt->affected_rows;

                        //$idUsuario = $_db->insert_id;
                        $stmt->close();

                        if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL INSERT SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;                                
                                $ind_error = 1;

                        } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="USUARIO REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;                                
                                $ind_error = 0;
                                }

                     } else { $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;                              
                              $ind_error = 1;
                             }             
                                                          
                             
              //=====================================================================================================================================
              //Luego de registrar al cliente frecuente por parte del administrador se realiza la reservacion
              //=====================================================================================================================================

                $_result = $_db->query("select      `CanchaReservaciones`.`id`
                                        from        `CanchaReservaciones`
                                        where       `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                    `CanchaReservaciones`.`idCancha`=".$idCancha)

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                if($_result->num_rows > 0)
                {
                    $registros=0;   
                }
                else
                {                
                     $registros=1;
                        if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                                   IdPersona,
                                                   IdEquipo,
                                                   IdUsuarioRegistro,
                                                   FechaHoraReservacion,
                                                   Tarifa,
                                                   EstadoReservacion,
                                                   ModoReservacion,
                                                   IndNoShow,
                                                   FechaCancelacion,
                                                   ComentarioReservacion,
                                                   ComentarioCancelacion,
                                                   ComentarioNoShow
                                                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                            $stmt->bind_param('iiiisiiiissss',$idCancha,$idUsuario,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                             $estadoReservacion,$modoReservacion,$IndNoShow,
                                                             $FechaCancelacion,$comentarioReservacion,$comentarioCancelacion,$comentarioNoShow);

                            $idCancha = (int) $idCancha;
                            $idUsuario = (int) $idUsuario;
                            $idEquipo = (int) $idEquipo;
                            $idUsuarioRegistro = (int) $idUsuarioRegistro;
                            $FechayHora = $_db->real_escape_string($FechayHora);
                            $tarifa = (int) $tarifa;
                            $estadoReservacion = (int) $estadoReservacion;
                            $modoReservacion = (int) $modoReservacion;
                            $IndNoShow = (int) $IndNoShow;
                            $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);
                            $comentarioReservacion = $_db->real_escape_string($comentarioReservacion);
                            $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                            $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                            $stmt->execute();
                            $stmt->close();                        
                    }
                }
                $msj['mensaje']=$registros;                        
                $destinatarios = $correo;     
                $mencionaReto='';$mencionaRetoTitulo='';
                if($estadoReservacion==6){$mencionaReto='<br>Te estamos buscando un reto para que puedas mejenguear, cuando encontremos a tu contrincante te enviaremos un correo.';$mencionaRetoTitulo=' - Reto';}
                $asunto = "Reservación de Cancha".$mencionaRetoTitulo; 
                $saludo = 'Hey '.$nombre.'!';
                $dominio= 'http://'.PATHWEB;
                $contenido ='Se ha realizado una reservaci&oacute;n correctamente a su nombre en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'. '.$mencionaReto.'. 
                             <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                             <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                             <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                             <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                $alto = 570;
                $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                $mail = new Mail;
                $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
            }
                        
                $results = array();                                              		                                                                             
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function creaReservacionAdm
//========================================================================================================================	

        public function buscaReto_y_registraUsuario($params){
                    
            $_db = $this->__construct();
            $idCancha = $params->idCancha; 
            $idInstalacion = $params->idInstalacion; 
            $idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuarioRegistro;                
            $FechayHora = $params->fechaYhora;
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                  
            $comentarioRetador = $params->comentarioRetador;
            $idReservacionRetador = $params->idReservacionRetador;
            $comentarioReservacion = $params->comentarioReservacion;
            $fechaYhoraCorreo=$params->fechaYhoraCorreo;
            $nombreCanchaCorreo=$params->nombreCanchaCorreo;      
            if($comentarioReservacion==""){$comentarioReservacion='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            $msj = array('codigoError'=>'','mensaje'=>'','id'=>'');
            $ind_error = 0;
            //============================================================================================
            //Variables para registrar usuario
            $correo = $params->correoRegistar;
            if($correo==""){$correo="null";}
            $tipoUsuario = 'R';
            $codPais = 1;  
            //=============================================================================
            //Crea contrase�a para el usuario a registrar por parte del administrador
            /*$keychars = "abcdefghijklmnpqrstuvwxyz23456789";
            $length = 6;
            $randkey = "";
            $max=strlen($keychars)-1;
            for ($i=0;$i<$length;$i++) {$randkey .= substr($keychars, rand(0, $max), 1);}
            $contrasena = $randkey;
            $contrasenaMd5 = md5($contrasena);*/          
            //FIN Crea contrase�a para el usuario a registrar por parte del administrador
            //=============================================================================
            $cedula = $params->cedulaRegistar;
            $nombre = $params->nombreRegistar;
            $apellido = $params->apellidoRegistar;
            $telefono = $params->telefonoRegistar;
            $telefono2 = $params->telefono2Registar;
            $genero = $params->generoRegistar;
            $idUsuario='';    
            $results = array(); 
            // Valida que el correo no exista.   
            $_result = $_db->query("SELECT Persona.id FROM Persona,InstalacionClientes WHERE EMail = '".$correo."' or NoCedula= '".$cedula."' and InstalacionClientes.IdPersona=Persona.id") 
            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
            if ($_result->num_rows > 0) { 
                     $msj['codigoError']="0001";
                     $msj['mensaje']="CORREO YA EXISTE";
                     $msj['id']=0;
                     $ind_error = 1;
            } else {
                //Inserta el Usuario
                $_result = $_db->query("SELECT id FROM Persona WHERE EMail = '".$correo."' or NoCedula= '".$cedula."'") 
                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);
                while ($row = $_result->fetch_assoc()) {array_push($results, $row);}                
                if ($_result->num_rows > 0) {                          
                    $idUsuario=$results[0]["id"]; 
                         $msj['codigoError']="0001";
                         $msj['mensaje']="CORREO YA EXISTE";
                         $msj['id']=0;
                         $ind_error = 1;
                }else{
                    if($correo=="null"){$correo="";}
                    if($stmt = $_db->prepare("INSERT INTO Persona (NoCedula,
                                                                   EMail,
                                                                   Nombre,
                                                                   Apellidos,
                                                                   TelCelular,
                                                                   Telefono2,
                                                                   Genero,
                                                                   CodPais                                                               
                                                                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)")) {

                            $stmt->bind_param('sssssssi',$cedula,$correo,$nombre,$apellido,
                                                             $telefono,$telefono2,$genero,
                                                             $codPais);

                            $cedula = $_db->real_escape_string($cedula);
                            $correo = $_db->real_escape_string($correo);                        
                            $nombre = $_db->real_escape_string($nombre);
                            $apellido = $_db->real_escape_string($apellido);
                            $telefono = $_db->real_escape_string($telefono);
                            $telefono2 = $_db->real_escape_string($telefono2);
                            $genero = $_db->real_escape_string($genero);
                            $codPais = (int) $codPais;

                            $stmt->execute();

                            // echo 'paso4 filas afectadas:'.$stmt->affected_rows;
                            $filas_afectadas = $stmt->affected_rows;

                            $idUsuario = $_db->insert_id;
                            $stmt->close();

                            if ($filas_afectadas != 1) {
                                    $msj['codigoError']="0003";
                                    $msj['mensaje']="ERROR EN EL INSERT SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;                                
                                    $ind_error = 1;

                            } else {
                                    $msj['codigoError']="0000";
                                    $msj['mensaje']="USUARIO REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;                                
                                    $ind_error = 0;
                                    }

                         } else { $msj['codigoError']="0002";
                                  $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;                              
                                  $ind_error = 1;
                                 } 
                }
              //=====================================================================================================================================
              //Luego de registrar al usuario lo regitro en la tabla de clientes frecuentes de la instalacion              
              //=====================================================================================================================================
             
                if($stmt = $_db->prepare("INSERT INTO InstalacionClientes
                                                              (IdInstalacion,
                                                               IdPersona,                                                               
                                                               NivelConfianza                                                               
                                                               ) VALUES (?,?,0)")) {

                        $stmt->bind_param('ii',$idInstalacion,$idUsuario);
                        	
                        $idInstalacion = (int) $idInstalacion;                        
                        $idUsuario = (int) $idUsuario;                        

                        $stmt->execute();

                        // echo 'paso4 filas afectadas:'.$stmt->affected_rows;
                        $filas_afectadas = $stmt->affected_rows;

                        //$idUsuario = $_db->insert_id;
                        $stmt->close();

                        if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL INSERT SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;                                
                                $ind_error = 1;

                        } else {
                                $msj['codigoError']="0000";
                                $msj['mensaje']="USUARIO REGISTRADO CORRECTAMENTE SqlState:".$_db->sqlstate;                                
                                $ind_error = 0;
                                }

                     } else { $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;                              
                              $ind_error = 1;
                             }             
                                                          
                             
              //=====================================================================================================================================
              //Luego de registrar al cliente frecuente por parte del administrador se realiza la reservacion
              //=====================================================================================================================================

                $_result = $_db->query("select      `CanchaReservaciones`.`id`
                                        from        `CanchaReservaciones`
                                        where       `CanchaReservaciones`.`FechaHoraReservacion`= '".$FechayHora."' and CanchaReservaciones.EstadoReservacion!=5 and
                                                    `CanchaReservaciones`.`EstadoReservacion`=7 and 
                                                    `CanchaReservaciones`.`idCancha`=".$idCancha)

                or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                if($_result->num_rows > 0)
                {
                    $registros=0;   
                }
                else
                {                
                     $registros=1;
                        if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                                   IdPersona,
                                                   IdEquipo,
                                                   IdUsuarioRegistro,
                                                   FechaHoraReservacion,
                                                   Tarifa,
                                                   EstadoReservacion,
                                                   ModoReservacion,
                                                   IndNoShow,
                                                   FechaCancelacion,
                                                   ComentarioReservacion,
                                                   ComentarioCancelacion,
                                                   ComentarioNoShow
                                                   ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                            $stmt->bind_param('iiiisiiiissss',$idCancha,$idUsuario,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                             $estadoReservacion,$modoReservacion,$IndNoShow,
                                                             $FechaCancelacion,$comentarioReservacion,$comentarioCancelacion,$comentarioNoShow);

                            $idCancha = (int) $idCancha;
                            $idUsuario = (int) $idUsuario;
                            $idEquipo = (int) $idEquipo;
                            $idUsuarioRegistro = (int) $idUsuarioRegistro;
                            $FechayHora = $_db->real_escape_string($FechayHora);
                            $tarifa = (int) $tarifa;
                            $estadoReservacion = (int) $estadoReservacion;
                            $modoReservacion = (int) $modoReservacion;
                            $IndNoShow = (int) $IndNoShow;
                            $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);
                            $comentarioReservacion = $_db->real_escape_string($comentarioReservacion);
                            $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                            $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                            $stmt->execute();
                            $stmt->close();                        
                    }
                }
                $msj['mensaje']=$registros;                
                $_result = $_db->query("select `Persona`.`EMail` as EMail,`Persona`.`Nombre`,`Persona`.`Apellidos`,`Persona`.`TelCelular`                    
                                                from   `Persona`,`CanchaReservaciones`
                                                where  `CanchaReservaciones`.FechaHoraReservacion='".$FechayHora."' and `CanchaReservaciones`.IdCancha=".$idCancha." and 
                                                       `CanchaReservaciones`.IdPersona=`Persona`.id and
                                                        (CanchaReservaciones.EstadoReservacion=6 or CanchaReservaciones.EstadoReservacion=10) 
                                                        order by `CanchaReservaciones`.id asc")

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row);}                        
                    $nombreAceptaReto=$results[1]["Nombre"].' '.$results[1]["Apellidos"];
                    $telefonoAceptaReto=$results[1]["TelCelular"];                        
                    //Envio de conformacion del Reto
                    $destinatarios = $results[1]["EMail"]; 
                    $asunto = "Reservación de Cancha - Reto"; 
                    $saludo = 'Hey '.$results[1]["Nombre"].'!';
                    $dominio= 'http://'.PATHWEB;
                    $nombreRetador=$results[0]["Nombre"].' '.$results[0]["Apellidos"];
                    $telefonoRetador=$results[0]["TelCelular"];
                    $contenido ='Se ha realizado una reservaci&oacute;n correctamente a su nombre en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.
                                 <br>Y te hemos encontrado un reto contra '.$nombreRetador.' si deseas comunicarte con esta persona llama al: '.$telefonoRetador.', este reto ser&aacute; para el d&iacute;a ya mencionado.
                                 <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                 <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                 <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                 <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                    $alto = 550;
                    $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                    $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                    $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                    $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                    $mail = new Mail;
                    $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                    //======================================================================================
                    //Envio correo al que creo el reto
                    //======================================================================================
                    $destinatarios = $results[0]["EMail"]; 
                    $asunto = "Reservación de Cancha - Reto"; 
                    $saludo = 'Hey '.$results[0]["Nombre"].'!';
                    $contenido ='Se ha realizado una reservaci&oacute;n correctamente a su nombre en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.
                                 <br>Y te hemos encontrado un reto contra '.$nombreAceptaReto.' si deseas comunicarte con esta persona llama al: '.$telefonoAceptaReto.', este reto ser&aacute; para el d&iacute;a ya mencionado.
                                 <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                 <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                 <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                 <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                    $alto = 550;
                    $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                    $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                    $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                    $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                    $mail = new Mail;
                    $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                //
                if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET ComentarioReservacion=? WHERE id=?")) {                        
                            $stmt->bind_param('si',$comentarioRetador,$idReservacionRetador);	

                            $comentarioRetador = $_db->real_escape_string($comentarioRetador);
                            $idReservacionRetador = (int) $idReservacionRetador;

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
            }
                        
                $results = array();                                              		                                                                             
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function buscaReto_y_registraUsuario
//========================================================================================================================	

        public function aprobarReservacionAdm($params){
        
            $_db = $this->__construct();            
            $idReservacion = $params->idReservacion;
            $correoUsuario = $params->correoUsuario;
            $comentario = $params->comentario;
            $estado = $params->estado;              
            
            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=?, ComentarioReservacion=? WHERE id=?")) {                        
                $stmt->bind_param('isi',$estado,$comentario,$idReservacion);	
                
                $idReservacion = (int) $idReservacion;
                $estado = (int) $estado;
                $comentario = $_db->real_escape_string($comentario);

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                            $msj['codigoError']="0000";
                            $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;

                            $destinatario = $correoUsuario; 

                            $asunto = "Aprobada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                            $cuerpo = ' 
                            <html> 
                            <head> 
                               <title>ajugarfutbol.com</title> 
                            </head> 
                            <body> 
                            <h1><font color=black>Te confirmamos que el administrador de la cancha <font color=red>aprob&oacute;</font> tu reservaci&oacute;n pendiente.</font></h1> 
                            <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                            <p> 
                            <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                            <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                            <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                            </p> 
                            </body> 
                            </html>'; 

                            $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                            $headers .= "MIME-Version: 1.0\n" ;  
                            $headers .= "Content-type: text/html; charset=utf-8\n"; 

                           
                            //mail($destinatario,$asunto,$cuerpo,$headers);
                        }
                
                
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             }                                                                       		                                     

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function aprobarReservacionAdm
//========================================================================================================================

        public function cancelaReservacionAdm($params){           
            $_db = $this->__construct();
            $idReservacion = $params->idReservacion;
            $correoUsuario = $params->correoUsuario;
            $fechaYhoraCorreo=$params->fechaYhoraCorreo;
            $nombreCanchaCorreo=$params->nombreCanchaCorreo;   
            $estado = $params->estado;      
            $results = array(); 
            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=? WHERE id=?")) {                        
                $stmt->bind_param('ii',$estado,$idReservacion);	
                
                $idReservacion = (int) $idReservacion;
                $estado = (int) $estado;

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                        $msj['codigoError']="0000";
                        $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                        
                        //Consulto Nombre
                        $_result = $_db->query("select   `Nombre`
                                                from     `Persona`
                                                where    `Persona`.`EMail`= '".$correoUsuario."'")

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error); 
                        while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                        if($results[0]["Nombre"]!=null||$results[0]["Nombre"]!=''){
                            $nombreUsuario=$results[0]["Nombre"];
                            $destinatarios=$correoUsuario;
                            $asunto = "Reservación de Cancha - Cancelada"; 
                            $saludo = 'Hey '.$nombreUsuario.'!';
                            $dominio= 'http://'.PATHWEB;
                            $contenido ='Se ha <font color=red><b>cancelado</b></font> su reservaci&oacute;n en la cancha '.$nombreCanchaCorreo.' del d&iacute;a '.$fechaYhoraCorreo.'.
                                         <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo.</br> 
                                         <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s.<br>Te esperamos! Muchas Gracias.                                   
                                         <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                         <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                            $alto = 500;
                            $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                            $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                            $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                            $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                            $mail = new Mail;
                            $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                        }
                        }
                        
                
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             }                                                                       		                                     

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function cancelaReservacionAdm
        //
//========================================================================================================================
        public function creaBloqueoAvisa($params){
            date_default_timezone_set("America/Costa_Rica");
            $_db = $this->__construct();            
            $fechaInicio=$params->fechaInicio;  
            $fechaFinal=$params->fechaFinal;  
            $horaInicial=$params->horaInicial;
            $horaFinal=$params->horaFinal;
            $idCancha=$params->idCancha;
            $comentario=$params->comentario;
            $dif=$params->dif;        
            $dif = (int) $dif; 
            //$idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuarioRegistro;             
            $idCancha = (int) $idCancha;              
            $fechaInicio = $_db->real_escape_string($fechaInicio);             
            $fechaFinal = $_db->real_escape_string($fechaFinal); 
            $horaInicial = (int) $horaInicial; 
            $horaFinal = (int) $horaFinal;
            $diferenciaHoras=$horaFinal-$horaInicial;            
            if($horaInicial<10){$horaInicial="0".$horaInicial;}
            if($horaFinal<10){$horaFinal="0".$horaFinal;}
            //Datos de Reservacion
            $idEquipo = 0;//$params->idEquipo;              
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;            
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                              
            if($comentario==""){$comentario='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            //FIN                   
            $registros=null;
            $results = array();       
            
            $_result = $_db->query("select `ReservacionBloqueo`.`id`
                                    from   `ReservacionBloqueo`
                                    where  `ReservacionBloqueo`.`FechaInicial`<='".$fechaInicio."' and 
                                           `ReservacionBloqueo`.`FechaFinal`>='".$fechaFinal."' and 
                                           `ReservacionBloqueo`.`HoraInicial`<='".$horaInicial.":00:00' and 
                                           `ReservacionBloqueo`.`HoraFinal`>='".$horaFinal.":00:00' and 
                                           `ReservacionBloqueo`.`IdCancha`=".$idCancha." and Estado=1")

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

            if($_result->num_rows > 0)
            {
                $registros=0;   
            }
             else {
                 $fechaInicio = explode("-",$fechaInicio);                    
                 for($i=0;$i<=$dif;$i++)
                 {   
                     $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+$i,$fechaInicio[0]);   
                     $fecha = date("Y/m/d", $fecha_cambiada);                        
                     for($j=0;$j<=$diferenciaHoras;$j++)
                     {                         
                         $hora=$horaInicial+$j;
                         if($hora<10){$hora="0".$hora;}                         
                         $fechaYHora=$fecha." ".$hora.":00:00";   

                         $_result = $_db->query("select  `CanchaReservaciones`.`id`
                                                from     `CanchaReservaciones`
                                                where    `CanchaReservaciones`.`FechaHoraReservacion`= '".$fechaYHora."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                         `CanchaReservaciones`.`idCancha`=".$idCancha)

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                        if($_result->num_rows > 0)
                        {
                            $registros=1;
                            $dif=$dif+2;
                            break;
                        }
                     }                     
                  }                  
                  if($registros!=1){                     
                     //Inserta en la Tabla RolPersonaReservacion
                     $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+0,$fechaInicio[0]);                     
                     $fecha = date("Y/m/d", $fecha_cambiada);                                                               
                     if($stmt = $_db->prepare("INSERT INTO ReservacionBloqueo (IdCancha,
                                                       FechaInicial,
                                                       FechaFinal,
                                                       HoraInicial,
                                                       HoraFinal,
                                                       Comentario,
                                                       IdUsuarioRegistro
                                                       ) VALUES (?, ?, ?, ?, ?, ?, ?)")) {

                                $stmt->bind_param('isssssi',$idCancha,$fecha,$fechaFinal,$horaInicialGuarda,$horaFinal,$comentario,$idUsuarioRegistro);
                                
                                $idCancha = (int) $idCancha;                                
                                $idUsuarioRegistro = (int) $idUsuarioRegistro;                                                                                                                                                              
                                $fecha = $_db->real_escape_string($fecha);    
                                $fechaFinal = $_db->real_escape_string($fechaFinal);    
                                $horaInicialGuarda = $_db->real_escape_string($horaInicial.':00:00');   
                                $horaFinal = $_db->real_escape_string($horaFinal.':00:00');   
                                $comentario = $_db->real_escape_string($comentario);   
                                $stmt->execute();
                                $id = $stmt->insert_id;
                                $stmt->close();  
                     }                     
                     //Inserta Todas las Reservaciones del bloqueo   
                     $idPersona=$idUsuarioRegistro;                     
                     for($i=0;$i<=$dif;$i ++)
                     {
                         $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+$i,$fechaInicio[0]);   
                         $fecha = date("Y/m/d", $fecha_cambiada); 
                         for($j=0;$j<=$diferenciaHoras;$j++)
                         {   
                             $hora=$horaInicial+$j;
                             if($hora<10){$hora="0".$hora;}                         
                             $fechaYHora=$fecha." ".$hora.":00:00";   
                        
                             if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                                           IdPersona,
                                                           IdEquipo,
                                                           IdUsuarioRegistro,
                                                           FechaHoraReservacion,
                                                           Tarifa,
                                                           EstadoReservacion,
                                                           ModoReservacion,
                                                           IndNoShow,
                                                           FechaCancelacion,
                                                           ComentarioReservacion,
                                                           ComentarioCancelacion,
                                                           ComentarioNoShow,
                                                           IdBloqueo
                                                           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                                    $stmt->bind_param('iiiisiiiissssi',$idCancha,$idPersona,$idEquipo,$idUsuarioRegistro,$fechaYHora,$tarifa,
                                                                     $estadoReservacion,$modoReservacion,$IndNoShow,
                                                                     $FechaCancelacion,$comentario,$comentarioCancelacion,$comentarioNoShow,$id);

                                    $idCancha = (int) $idCancha;
                                    $idPersona = (int) $idPersona;
                                    $idEquipo = (int) $idEquipo;
                                    $id = (int) $id;
                                    $idUsuarioRegistro = (int) $idUsuarioRegistro;
                                    $fechaYHora = $_db->real_escape_string($fechaYHora);
                                    $tarifa = (int) $tarifa;
                                    $estadoReservacion = (int) $estadoReservacion;
                                    $modoReservacion = (int) $modoReservacion;
                                    $IndNoShow = (int) $IndNoShow;
                                    $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);                                
                                    $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                                    $comentario = $_db->real_escape_string($comentario);
                                    $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                                    $stmt->execute();                                    
                                    $stmt->close();                                                                          
                               }       
                               
                         }                                 
                     }$registros=2;                        
                 }
            }
            /*            
                        $registros=1;
                        

                    $_result = $_db->query("select      `Persona`.`EMail` as EMail
                                            from        `Persona`
                                            where       `Persona`.`id`= ".$idUsuario)

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                    $correoUsuario=$results[0]["EMail"];                        
                    $destinatario = $correoUsuario; 
                    $asunto = "Recordatorio de Reservaci�n de Cancha. AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>ajugarfutbol.com</title> 
                    </head> 
                    <body> 
                    <h1><font color=black>Te confirmamos que tienes una reservaci&oacute;n pendiente.</font></h1> 
                    <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                    <p> 
                    <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                    <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                    <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                    </p> 
                    </body> 
                    </html>'; 

                    $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; 

                    //echo 'mail1';
                    //mail($destinatario,$asunto,$cuerpo,$headers);            
                }*/
                $results = array();                                                          		                
                $msj =  array('mensaje'=>'');
                $msj['mensaje']=$registros;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function creaRolCliente
//========================================================================================================================
        public function creaBloqueoOmitir($params){
            date_default_timezone_set("America/Costa_Rica");
            $_db = $this->__construct();            
            $fechaInicio=$params->fechaInicio;  
            $fechaFinal=$params->fechaFinal;  
            $horaInicial=$params->horaInicial;
            $horaFinal=$params->horaFinal;
            $idCancha=$params->idCancha;  
            $comentario=$params->comentario;
            $dif=$params->dif;        
            $dif = (int) $dif; 
            //$idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuarioRegistro;             
            $idCancha = (int) $idCancha;              
            $fechaInicio = $_db->real_escape_string($fechaInicio); 
            $fechaFinal = $_db->real_escape_string($fechaFinal); 
            $horaInicial = (int) $horaInicial; 
            $horaFinal = (int) $horaFinal;
            $diferenciaHoras=$horaFinal-$horaInicial;            
            if($horaInicial<10){$horaInicial="0".$horaInicial;}
            if($horaFinal<10){$horaFinal="0".$horaFinal;}
            //Datos de Reservacion
            $idEquipo = 0;//$params->idEquipo;              
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;            
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                              
            if($comentario==""){$comentario='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            //FIN                   
            $registros=null;
            $results = array();       
            
            $_result = $_db->query("select `ReservacionBloqueo`.`id`
                                    from   `ReservacionBloqueo`
                                    where  `ReservacionBloqueo`.`FechaInicial`<='".$fechaInicio."' and 
                                           `ReservacionBloqueo`.`FechaFinal`>='".$fechaFinal."' and 
                                           `ReservacionBloqueo`.`HoraInicial`<='".$horaInicial.":00:00' and 
                                           `ReservacionBloqueo`.`HoraFinal`>='".$horaFinal.":00:00' and 
                                           `ReservacionBloqueo`.`IdCancha`=".$idCancha." and Estado=1")

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

            if($_result->num_rows > 0)
            {
                $registros=0;   
            }
             else {                    
                 $fecha = $fechaInicio;                                                                               
                 if($stmt = $_db->prepare("INSERT INTO ReservacionBloqueo (IdCancha,
                                                   FechaInicial,
                                                   FechaFinal,
                                                   HoraInicial,
                                                   HoraFinal,
                                                   Comentario,
                                                   IdUsuarioRegistro
                                                   ) VALUES (?, ?, ?, ?, ?, ?, ?)")) {

                            $stmt->bind_param('isssssi',$idCancha,$fecha,$fechaFinal,$horaInicialGuarda,$horaFinal,$comentario,$idUsuarioRegistro);

                            $idCancha = (int) $idCancha;                                
                            $idUsuarioRegistro = (int) $idUsuarioRegistro;                                                                                                                                                              
                            $fecha = $_db->real_escape_string($fecha);    
                            $fechaFinal = $_db->real_escape_string($fechaFinal);    
                            $horaInicialGuarda = $_db->real_escape_string($horaInicial.':00:00');   
                            $horaFinal = $_db->real_escape_string($horaFinal.':00:00');   
                            $comentario = $_db->real_escape_string($comentario);   
                            $stmt->execute();
                            $id = $stmt->insert_id;
                            $stmt->close();  
                 }
                 $idPersona=$idUsuarioRegistro; 
                 $fechaInicio = explode("-",$fechaInicio);
                 for($i=0;$i<=$dif;$i++)
                 {   
                     $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+$i,$fechaInicio[0]);   
                     $fecha = date("Y/m/d", $fecha_cambiada);                        
                     for($j=0;$j<=$diferenciaHoras;$j++)
                     {                         
                         $hora=$horaInicial+$j;
                         if($hora<10){$hora="0".$hora;}                         
                         $fechaYHora=$fecha." ".$hora.":00:00";   

                         $_result = $_db->query("select  `CanchaReservaciones`.`id`
                                                from     `CanchaReservaciones`
                                                where    `CanchaReservaciones`.`FechaHoraReservacion`= '".$fechaYHora."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                         `CanchaReservaciones`.`idCancha`=".$idCancha)

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                        if($_result->num_rows <= 0)
                        {
                            $registros=2;
                           if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                                                               IdPersona,
                                                                               IdEquipo,
                                                                               IdUsuarioRegistro,
                                                                               FechaHoraReservacion,
                                                                               Tarifa,
                                                                               EstadoReservacion,
                                                                               ModoReservacion,
                                                                               IndNoShow,
                                                                               FechaCancelacion,
                                                                               ComentarioReservacion,
                                                                               ComentarioCancelacion,
                                                                               ComentarioNoShow,
                                                                               IdBloqueo
                                                                               ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                                    $stmt->bind_param('iiiisiiiissssi',$idCancha,$idPersona,$idEquipo,$idUsuarioRegistro,$fechaYHora,$tarifa,
                                                                     $estadoReservacion,$modoReservacion,$IndNoShow,
                                                                     $FechaCancelacion,$comentario,$comentarioCancelacion,$comentarioNoShow,$id);

                                    $idCancha = (int) $idCancha;
                                    $idPersona = (int) $idPersona;
                                    $idEquipo = (int) $idEquipo;
                                    $id = (int) $id;
                                    $idUsuarioRegistro = (int) $idUsuarioRegistro;
                                    $fechaYHora = $_db->real_escape_string($fechaYHora);
                                    $tarifa = (int) $tarifa;
                                    $estadoReservacion = (int) $estadoReservacion;
                                    $modoReservacion = (int) $modoReservacion;
                                    $IndNoShow = (int) $IndNoShow;
                                    $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);                                
                                    $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                                    $comentario = $_db->real_escape_string($comentario);
                                    $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                                    $stmt->execute();                                    
                                    $stmt->close();                                                                          
                             }
                        }
                     }                     
                  }
            }
            /*            
                        $registros=1;
                        

                    $_result = $_db->query("select      `Persona`.`EMail` as EMail
                                            from        `Persona`
                                            where       `Persona`.`id`= ".$idUsuario)

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                    $correoUsuario=$results[0]["EMail"];                        
                    $destinatario = $correoUsuario; 
                    $asunto = "Recordatorio de Reservaci�n de Cancha. AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>ajugarfutbol.com</title> 
                    </head> 
                    <body> 
                    <h1><font color=black>Te confirmamos que tienes una reservaci&oacute;n pendiente.</font></h1> 
                    <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                    <p> 
                    <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                    <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                    <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                    </p> 
                    </body> 
                    </html>'; 

                    $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; 

                    //echo 'mail1';
                    //mail($destinatario,$asunto,$cuerpo,$headers);            
                }*/
                $results = array();                                                          		                
                $msj =  array('mensaje'=>'');
                $msj['mensaje']=$registros;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function creaBloqueoOmitir
//========================================================================================================================
        public function creaRolClienteAvisa($params){
            $_db = $this->__construct();
            date_default_timezone_set("America/Costa_Rica");
            
            $fechaInicio=$params->fechaInicio;            
            $cuantoTiempo=$params->cuantoTiempo;
            $idCancha=$params->idCancha;
            $hora=$params->hora;
            $dia=$params->dia;
            $comentario=$params->comentario;
            $idPersona = $params->idPersona;
            //$idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuarioRegistro; 
            $cuantoTiempo = (int) $cuantoTiempo;   
            $idCancha = (int) $idCancha;   
            $dia = (int) $dia;   
            $idPersona = (int) $idPersona; 
            $idUsuarioRegistro = (int) $idUsuarioRegistro; 
            $fechaInicio = $_db->real_escape_string($fechaInicio); 
            $comentario = $_db->real_escape_string($comentario);
            $hora = (int) $hora;
            if($hora<10){$hora="0".$hora;}                     
            //Datos de Reservacion
            $idEquipo = 0;//$params->idEquipo;              
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;
            $estadoReservacion = (int) $estadoReservacion; 
            if($estadoReservacion!=6){$estadoReservacion=3;}
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                              
            if($comentario==""){$comentario='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            //FIN
            $j=0;                
            $registros=null;
            $results = array(); 
            $idRol=null;
            
            $_result = $_db->query("select      `RolPersonaReservacion`.`id`
                                    from        `RolPersonaReservacion`
                                    where       `RolPersonaReservacion`.`IdPersona`= ".$idPersona." and weekday(RolPersonaReservacion.FechaHoraReservacion)=".$dia." 
                                                and TIME(RolPersonaReservacion.FechaHoraReservacion)='".$hora.":00:00' 
                                                and `RolPersonaReservacion`.`IdCancha`=".$idCancha." 
                                                and FechaHoraFinal>='".$fechaInicio."' AND Estado=1")

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

            if($_result->num_rows > 0)
            {
                $registros=0;   
            }
             else {
                 $fechaInicio = explode("-",$fechaInicio);   
                 for($i =0;$i<$cuantoTiempo;$i ++)
                 {
                     $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+$j,$fechaInicio[0]);   
                     $fecha = date("Y/m/d", $fecha_cambiada);                
                     $fecha=$fecha." ".$hora.":00:00";
                     $j=$j+7;
                     
                     $_result = $_db->query("select  `CanchaReservaciones`.`id`
                                            from     `CanchaReservaciones`
                                            where    `CanchaReservaciones`.`FechaHoraReservacion`= '".$fecha."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                     `CanchaReservaciones`.`idCancha`=".$idCancha)

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

                    if($_result->num_rows > 0)
                    {
                        $registros=1;                        
                        break;
                    }
                  }
                  if($registros!=1){                     
                     //Inserta en la Tabla RolPersonaReservacion                     
                     $fecha = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+0,$fechaInicio[0]);                     
                     $fecha = date("Y/m/d", $fecha);     
                     $fecha=$fecha." ".$hora.":00:00";
                     $fechaFinal=mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+($cuantoTiempo-1)*7,$fechaInicio[0]);                     
                     $fechaFinal = date("Y/m/d", $fechaFinal);   
                     $fechaFinal=$fechaFinal." ".$hora.":00:00";                     
                     $cuantoTiempo=$cuantoTiempo.' semanas';
                     if($stmt = $_db->prepare("INSERT INTO RolPersonaReservacion (IdPersona,
                                                       IdCancha,
                                                       FechaHoraReservacion,
                                                       FechaHoraFinal,
                                                       TiempoRol,
                                                       idUsuarioRegistro,
                                                       Comentario
                                                       ) VALUES (?, ?, ?, ?, ?, ?, ?)")) {

                                $stmt->bind_param('iisssis',$idPersona,$idCancha,$fecha,$fechaFinal,$cuantoTiempo,$idUsuarioRegistro,$comentario);

                                $idPersona = (int) $idPersona; 
                                $idCancha = (int) $idCancha;
                                $idUsuario = (int) $idUsuario;                                
                                $idUsuarioRegistro = (int) $idUsuarioRegistro;                                                                                                                                                              
                                $fecha = $_db->real_escape_string($fecha);    
                                $fechaFinal = $_db->real_escape_string($fechaFinal);    
                                $cuantoTiempo = $_db->real_escape_string($cuantoTiempo);   
                                $stmt->execute();
                                $idRol = $stmt->insert_id;
                                $stmt->close();  
                     }
                     //Inserta Todas las Reservaciones del Rol
                     $j=0;
                     $cuantoTiempo = (int) $cuantoTiempo;                        
                     for($i =0;$i<$cuantoTiempo;$i ++)                     
                     {                         
                         $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+$j,$fechaInicio[0]);   
                         $FechayHora = date("Y/m/d", $fecha_cambiada);                             
                         $j=$j+7;
                         $FechayHora=$FechayHora." ".$hora.":00:00";                         
                         if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                                       IdPersona,
                                                       IdEquipo,
                                                       IdUsuarioRegistro,
                                                       FechaHoraReservacion,
                                                       Tarifa,
                                                       EstadoReservacion,
                                                       ModoReservacion,
                                                       IndNoShow,
                                                       FechaCancelacion,
                                                       ComentarioReservacion,
                                                       ComentarioCancelacion,
                                                       ComentarioNoShow,
                                                       IdRol
                                                       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                                $stmt->bind_param('iiiisiiiissssi',$idCancha,$idPersona,$idEquipo,$idUsuarioRegistro,$FechayHora,$tarifa,
                                                                 $estadoReservacion,$modoReservacion,$IndNoShow,
                                                                 $FechaCancelacion,$comentario,$comentarioCancelacion,$comentarioNoShow,$idRol);

                                $idCancha = (int) $idCancha;
                                $idRol = (int) $idRol;
                                $idUsuario = (int) $idUsuario;
                                $idEquipo = (int) $idEquipo;
                                $idUsuarioRegistro = (int) $idUsuarioRegistro;
                                $FechayHora = $_db->real_escape_string($FechayHora);
                                $tarifa = (int) $tarifa;
                                $estadoReservacion = (int) $estadoReservacion;
                                $modoReservacion = (int) $modoReservacion;
                                $IndNoShow = (int) $IndNoShow;
                                $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);                                
                                $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                                $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                                $stmt->execute();
                                $stmt->close(); 
                                                                   
                           }
                           $registros=2; 
                     }                                          
                 }
            }
            /*            
                        $registros=1;
                        

                    $_result = $_db->query("select      `Persona`.`EMail` as EMail
                                            from        `Persona`
                                            where       `Persona`.`id`= ".$idUsuario)

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                    $correoUsuario=$results[0]["EMail"];                        
                    $destinatario = $correoUsuario; 
                    $asunto = "Recordatorio de Reservaci�n de Cancha. AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>ajugarfutbol.com</title> 
                    </head> 
                    <body> 
                    <h1><font color=black>Te confirmamos que tienes una reservaci&oacute;n pendiente.</font></h1> 
                    <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                    <p> 
                    <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                    <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                    <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                    </p> 
                    </body> 
                    </html>'; 

                    $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; 

                    //echo 'mail1';
                    //mail($destinatario,$asunto,$cuerpo,$headers);            
                }*/
                $results = array();                                                          		                
                $msj =  array('mensaje'=>'');
                $msj['mensaje']=$registros;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function creaRolCliente
//========================================================================================================================

        public function creaRolClienteOmitir($params){
            $_db = $this->__construct();
            date_default_timezone_set("America/Costa_Rica");
            
            $fechaInicio=$params->fechaInicio;            
            $cuantoTiempo=$params->cuantoTiempo;
            $idCancha=$params->idCancha;
            $hora=$params->hora;
            $dia=$params->dia;
            $comentario=$params->comentario;
            $idPersona = $params->idPersona;
            //$idEquipo = $params->idEquipo;  
            $idUsuarioRegistro = $params->idUsuarioRegistro; 
            $cuantoTiempo = (int) $cuantoTiempo;   
            $idCancha = (int) $idCancha;   
            $dia = (int) $dia;               
            $idPersona = (int) $idPersona; 
            $idUsuarioRegistro = (int) $idUsuarioRegistro; 
            $fechaInicio = $_db->real_escape_string($fechaInicio);             
            $comentario = $_db->real_escape_string($comentario);
            $hora = (int) $hora;
            if($hora<10){$hora="0".$hora;}                       
            //Datos de Reservacion
            $idEquipo = 0;//$params->idEquipo;              
            $tarifa = '0';
            $estadoReservacion =  $params->estadoReservacion;
            $estadoReservacion = (int) $estadoReservacion; 
            if($estadoReservacion!=6){$estadoReservacion=3;} 
            $modoReservacion = '0'; 
            $IndNoShow = '0';
            $FechaCancelacion = '2012-02-25';                              
            if($comentario==""){$comentario='Sin comentario';}
            $comentarioCancelacion ='Sin comentario';
            $comentarioNoShow = 'Sin comentario';
            //FIN              
            $registros=null;
            $results = array(); 
            $idRol=null;
                                  
            $_result = $_db->query("select      `RolPersonaReservacion`.`id`
                                    from        `RolPersonaReservacion`
                                    where       `RolPersonaReservacion`.`IdPersona`= ".$idPersona." and weekday(RolPersonaReservacion.FechaHoraReservacion)=".$dia." and 
                                                TIME(RolPersonaReservacion.FechaHoraReservacion)='".$hora.":00:00' 
                                                and `RolPersonaReservacion`.`IdCancha`=".$idCancha." 
                                                and FechaHoraFinal>='".$fechaInicio."' AND Estado=1")

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);

            if($_result->num_rows > 0)
            {
                $registros=0;   
            }
             else {
                 //Inserta la tabla RolPersonaReservacion                                                 
                 $fecha=$fechaInicio." ".$hora.":00:00"; 
                 $fechaInicio = explode("-",$fechaInicio);     
                 $fechaFinal=mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+($cuantoTiempo-1)*7,$fechaInicio[0]);
                 $fechaFinal = date("Y/m/d", $fechaFinal);   
                 $fechaFinal=$fechaFinal." ".$hora.":00:00"; 
                 $cuantoTiempo=$cuantoTiempo.' semanas';
                 if($stmt = $_db->prepare("INSERT INTO RolPersonaReservacion (IdPersona,
                                                   IdCancha,
                                                   FechaHoraReservacion,
                                                   FechaHoraFinal,
                                                   TiempoRol,
                                                   idUsuarioRegistro,
                                                   Comentario
                                                   ) VALUES (?, ?, ?, ?, ?, ?, ?)")) {

                            $stmt->bind_param('iisssis',$idPersona,$idCancha,$fecha,$fechaFinal,$cuantoTiempo,$idUsuarioRegistro,$comentario);

                            $idPersona = (int) $idPersona; 
                            $idCancha = (int) $idCancha;
                            $idUsuario = (int) $idUsuario;                                
                            $idUsuarioRegistro = (int) $idUsuarioRegistro;                                                                                                                                                              
                            $fecha = $_db->real_escape_string($fecha);     
                            $fechaFinal = $_db->real_escape_string($fechaFinal);     
                            $cuantoTiempo = $_db->real_escape_string($cuantoTiempo);   
                            $stmt->execute();
                            $idRol = $stmt->insert_id;
                            $stmt->close();                              
                 }
                 //Inserta todas las reservaciones del Rol                 
                 $j=0;
                 $cuantoTiempo = (int) $cuantoTiempo;   
                 for($i =0;$i<$cuantoTiempo;$i ++)
                 {
                     $fecha_cambiada = mktime(0,0,0,$fechaInicio[1],$fechaInicio[2]+$j,$fechaInicio[0]);   
                     $fecha = date("Y/m/d", $fecha_cambiada);                                     
                     $fecha=$fecha." ".$hora.":00:00";
                     $j=$j+7;
                     
                     $_result = $_db->query("select   `CanchaReservaciones`.`id`
                                             from     `CanchaReservaciones`
                                             where    `CanchaReservaciones`.`FechaHoraReservacion`= '".$fecha."' and CanchaReservaciones.EstadoReservacion!=5 and 
                                                      `CanchaReservaciones`.`idCancha`=".$idCancha)

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error); 
                    if($_result->num_rows <= 0)
                    {   
                        $registros=2;
                        if($stmt = $_db->prepare("INSERT INTO CanchaReservaciones (IdCancha,
                                                       IdPersona,
                                                       IdEquipo,
                                                       IdUsuarioRegistro,
                                                       FechaHoraReservacion,
                                                       Tarifa,
                                                       EstadoReservacion,
                                                       ModoReservacion,
                                                       IndNoShow,
                                                       FechaCancelacion,
                                                       ComentarioReservacion,
                                                       ComentarioCancelacion,
                                                       ComentarioNoShow,
                                                       IdRol
                                                       ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)")) {

                                $stmt->bind_param('iiiisiiiissssi',$idCancha,$idPersona,$idEquipo,$idUsuarioRegistro,$fecha,$tarifa,
                                                                 $estadoReservacion,$modoReservacion,$IndNoShow,
                                                                 $FechaCancelacion,$comentario,$comentarioCancelacion,$comentarioNoShow,$idRol);

                                $idRol = (int) $idRol;
                                $idCancha = (int) $idCancha;
                                $idUsuario = (int) $idUsuario;
                                $idEquipo = (int) $idEquipo;
                                $idUsuarioRegistro = (int) $idUsuarioRegistro;
                                $fecha = $_db->real_escape_string($fecha);
                                $tarifa = (int) $tarifa;
                                $estadoReservacion = (int) $estadoReservacion;
                                $modoReservacion = (int) $modoReservacion;
                                $IndNoShow = (int) $IndNoShow;
                                $FechaCancelacion = $_db->real_escape_string($FechaCancelacion);                                
                                $comentarioCancelacion = $_db->real_escape_string($comentarioCancelacion);
                                $comentarioNoShow = $_db->real_escape_string($comentarioNoShow);

                                $stmt->execute();
                                $stmt->close();  
                           }/**else { 
                                $msj =  array('mensaje'=>'');   
                                $msj['codigoError']="0002";
                                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                                             }  */
                     }
                 }                  
            }
            /*            
                        $registros=1;
                        

                    $_result = $_db->query("select      `Persona`.`EMail` as EMail
                                            from        `Persona`
                                            where       `Persona`.`id`= ".$idUsuario)

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error);   
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                    $correoUsuario=$results[0]["EMail"];                        
                    $destinatario = $correoUsuario; 
                    $asunto = "Recordatorio de Reservaci�n de Cancha. AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>ajugarfutbol.com</title> 
                    </head> 
                    <body> 
                    <h1><font color=black>Te confirmamos que tienes una reservaci&oacute;n pendiente.</font></h1> 
                    <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                    <p> 
                    <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                    <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                    <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                    </p> 
                    </body> 
                    </html>'; 

                    $headers = 'from: <webmaster@ajugarfutbol.com>\n';                         
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; 

                    //echo 'mail1';
                    //mail($destinatario,$asunto,$cuerpo,$headers);            
                }*/
                $results = array();                                                          		                
                $msj =  array('mensaje'=>'');
                $msj['mensaje']=$registros;
                
                $respuesta = array($msj,$results); 
                
		return $respuesta;
	                
        }  // Fin de function creaRolCliente
 
//========================================================================================================================

        public function cancelaALRetadorAdm($params){           
            $_db = $this->__construct();
            $idReservacion = $params->idReservacion;            
            $correoUsuario = $params->correoUsuario;
            $nombreCanchaCorreo = $params->nombreCanchaCorreo;
            $fechaYhoraCorreo = $params->fechaYhoraCorreo;
            $estado = $params->estado;   
            $results = array(); 
            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=? WHERE id=?")) {                        
                $stmt->bind_param('ii',$estado,$idReservacion);	
                
                $idReservacion = (int) $idReservacion;
                $estado = (int) $estado;

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                        $msj['codigoError']="0000";
                        $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                        //Consulto Nombre
                        $_result = $_db->query("select   `Nombre`
                                                from     `Persona`
                                                where    `Persona`.`EMail`= '".$correoUsuario."'")

                        or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error); 
                        while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                        if($results[0]["Nombre"]!=null||$results[0]["Nombre"]!=''){
                            $nombreUsuario=$results[0]["Nombre"];
                            $destinatarios=$correoUsuario;
                            $asunto = "Reservación de Cancha - Cancelada"; 
                            $saludo = 'Hey '.$nombreUsuario.'!';
                            $dominio= 'http://'.PATHWEB;
                            $contenido ='Se ha <font color=red><b>cancelado</b></font> su reservaci&oacute;n en la cancha '.$nombreCanchaCorreo.' del d&iacute;a '.$fechaYhoraCorreo.'.
                                         <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. </br>
                                         <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s.</br> <br>Te esperamos! Muchas Gracias.</br>                                   
                                         <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                         <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                            $alto = 500;
                            $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                            $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                            $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                            $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                            $mail = new Mail;
                            $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                        }
                        }
                        
                
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             }                                                                       		                                     

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function cancelaReservacionAdm
//========================================================================================================================

        public function eliminarReservacionesRollCliente($params){           
            $_db = $this->__construct();            
            $idRoll=$params->idRoll;
            $idCancha=$params->idCancha;
            //$correoUsuario = $params->correoUsuario;
            $estado = 5;
            $results=array();
            
            $_result = $_db->query("select   `CanchaReservaciones`.`FechaHoraReservacion`
                                    from     `CanchaReservaciones`
                                    where    `CanchaReservaciones`.`IdRol`= ".$idRoll." and CanchaReservaciones.EstadoReservacion!=5 and 
                                             `CanchaReservaciones`.`idCancha`=".$idCancha." and FechaHoraReservacion>=now()")

            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error); 
            while ($row = $_result->fetch_assoc()) {array_push($results, $row);}              
            
            if($_result->num_rows > 0)                
            {               
                $NoFilas = sizeof($results);
                for($i=0;$i<$NoFilas;$i++)
                {
                    $fechaReservacion=$results[$i]["FechaHoraReservacion"];
                    if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=? WHERE FechaHoraReservacion=? and IdCancha=? and FechaHoraReservacion>=now()")) {                        
                        $stmt->bind_param('isi',$estado,$fechaReservacion,$idCancha);	

                        $estado = (int) $estado;                    
                        $fechaReservacion = $_db->real_escape_string($fechaReservacion);
                        $idCancha = (int) $idCancha;

                        $stmt->execute();                                
                        $stmt->close();

                    }else { 
                        $msj =  array('mensaje'=>'');   
                        $msj['codigoError']="0002";
                                      $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                                     } 
                }
            }
            //Inactiva el Rol
                if($stmt = $_db->prepare("UPDATE RolPersonaReservacion SET Estado=0 WHERE id=?")) {                        
                    $stmt->bind_param('i',$idRoll);	

                    $idRoll = (int) $idRoll;                                

                    $stmt->execute();                                
                    $stmt->close();                
                    $msj['codigoError']="0000";
                    $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;                

                    /*$destinatario = $correoUsuario; 

                    $asunto = "Cancelada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                    $cuerpo = ' 
                    <html> 
                    <head> 
                       <title>ajugarfutbol.com</title> 
                    </head> 
                    <body> 
                    <h1><font color=black>Fue <font color=red>cancelada</font> tu reservaci&oacute;n por parte del administrador de la cancha.</font></h1>                        
                    <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                    <p> 
                    <p><h3>Si deseas contactar al administrador:</h3></p>
                    <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                    <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                    </p> 
                    </body> 
                    </html>'; 

                    $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                    $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                    $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                    $headers .= "MIME-Version: 1.0\n" ;  
                    $headers .= "Content-type: text/html; charset=utf-8\n"; */

                            //echo 'mail1';
                            //mail($destinatario,$asunto,$cuerpo,$headers);                       
                }else { 
                    $msj =  array('mensaje'=>'');   
                    $msj['codigoError']="0002";
                                  $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                                      } 
            
            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function eliminarReservacionesRollCliente
//========================================================================================================================

        public function eliminarBloqueoCancha($params){           
            $_db = $this->__construct();            
            $idBloqueo=$params->idBloqueo;
            $idCancha=$params->idCancha;
            //$correoUsuario = $params->correoUsuario;
            $estado = 5;
            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=? WHERE IdBloqueo=? and IdCancha=? and FechaHoraReservacion>=now()")) {                        
                $stmt->bind_param('iii',$estado,$idBloqueo,$idCancha);	
                
                $idBloqueo = (int) $idBloqueo;
                $idCancha = (int) $idCancha;
                $estado = (int) $estado;

                $stmt->execute();                                
                $stmt->close();
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             } 
                                        
            //Inactiva el Rol
            if($stmt = $_db->prepare("UPDATE ReservacionBloqueo SET Estado=0 WHERE id=?")) {                        
                $stmt->bind_param('i',$idBloqueo);	
                
                $idBloqueo = (int) $idBloqueo;                                
 
                $stmt->execute();                                
                $stmt->close();                
                $msj['codigoError']="0000";
                $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;                
                
                /*$destinatario = $correoUsuario; 

                $asunto = "Cancelada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                $cuerpo = ' 
                <html> 
                <head> 
                   <title>ajugarfutbol.com</title> 
                </head> 
                <body> 
                <h1><font color=black>Fue <font color=red>cancelada</font> tu reservaci&oacute;n por parte del administrador de la cancha.</font></h1>                        
                <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                <p> 
                <p><h3>Si deseas contactar al administrador:</h3></p>
                <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                </p> 
                </body> 
                </html>'; 

                $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                $headers .= "MIME-Version: 1.0\n" ;  
                $headers .= "Content-type: text/html; charset=utf-8\n"; */

                        //echo 'mail1';
                        //mail($destinatario,$asunto,$cuerpo,$headers);                       
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             } 
            

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function eliminarReservacionesRollCliente
//========================================================================================================================

        public function modificaRetoAdm($params){           
            $_db = $this->__construct();
            $idReservacion1 = $params->idReservacion1;
            $idReservacion2 = $params->idReservacion2;
            $correoUsuario1 = $params->correoUsuario1;
            $correoUsuario2 = $params->correoUsuario2;                        
            $retoACancelar  = $params->retoACancelar;
            $fechaYhoraCorreo  = $params->fechaYhoraCorreo;
            $nombreCanchaCorreo  = $params->nombreCanchaCorreo;
            $results = array(); 
            
            $instruccion='';
            $correoAlCancelado='';
            if($retoACancelar=='1'){$instruccion=$idReservacion1;$correoAlCancelado=$correoUsuario1;}else{$instruccion=$idReservacion2;$correoAlCancelado=$correoUsuario2;}            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=5 WHERE id=?")) {                        
                $stmt->bind_param('i',$instruccion);	
                
                $instruccion = (int) $instruccion;                

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                            $msj['codigoError']="0000";
                            $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                            //Consulto Nombre
                            $_result = $_db->query("select   `Nombre`
                                                    from     `Persona`
                                                    where    `Persona`.`EMail`= '".$correoAlCancelado."'")

                            or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error); 
                            while ($row = $_result->fetch_assoc()) {array_push($results, $row);}
                            if($results[0]["Nombre"]!=null||$results[0]["Nombre"]!=''){                                
                                $destinatarios = $correoAlCancelado;
                                $asunto = "Reservación de Cancha - Reto Cancelado"; 
                                $saludo = 'Hey '.$results[0]["Nombre"].'!';
                                $contenido ='Se ha <font color=red><b>cancelado</b></font> su reservaci&oacute;n en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.                                            
                                             <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                             <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                             <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                             <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                                $alto = 550;
                                $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                                $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                                $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                                $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                                $mail = new Mail;
                                $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                            }
                        }
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             }                                                                       		                                     
                             
            //Actualiza el otro retador
            //===============================================================================================================================        
            $results = array();             
            if($retoACancelar=='1'){$instruccion=$idReservacion2;$correoAlCancelado=$correoUsuario2;}else{$instruccion=$idReservacion1;$correoAlCancelado=$correoUsuario1;}            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=6 WHERE id=?")) {                        
                $stmt->bind_param('i',$instruccion);	
                
                $instruccion = (int) $instruccion;                

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();

                $msj['codigoError']="0000";
                $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;                 
                //Consulto Nombre
                    $_result = $_db->query("select   `Nombre`,EMail
                                            from     `Persona`
                                            where    `Persona`.`EMail`= '".$correoAlCancelado."'")

                    or die('Connect Error (' . $_db->connect_errno . ') ' . $_db->connect_error); 
                    while ($row = $_result->fetch_assoc()) {array_push($results, $row);}

                    if($results[0]["EMail"]!=null||$results[0]["EMail"]!=''){
                    $destinatarios = $correoAlCancelado;
                    $asunto = "Reservación de Cancha - Contrincante Cancelado"; 
                    $saludo = 'Hey '.$results[0]["Nombre"].'!';
                    $contenido ='Se ha <font color=red><b>cancelado</b></font> a su contrincante en la cancha '.$nombreCanchaCorreo.' el d&iacute;a '.$fechaYhoraCorreo.'.
                                 <br>Pero muy pronto te encontraremos un reto, para que puedas mejenguear. Te enviaremos un correo.
                                 <br>Si por alg&uacute;n motivo usted desconoce de est&aacute; reservaci&oacute;n por favor ignore este correo. 
                                 <br><br>Te recordamos que muy pronto podr&aacute;s realizar reservaciones en l&iacute;nea, retos, equipos, jugadores, campeonatos y mucho m&aacute;s. Te esperamos! Muchas Gracias.                                   
                                 <br><br>Dar click aqui para ir al sitio: <a href="http://'.PATHWEB.'">Ingresar</a></br>
                                 <br> O dar click en esta dirección: http://'.PATHWEB.'</br>';

                    $alto = 550;
                    $img1 = 'http://www.ajugarfutbol.com/resources/imagenes/LogoCorreo.png';
                    $img2 = 'http://www.ajugarfutbol.com/resources/imagenes/LinkCorreo.png';
                    $img3 = 'http://www.ajugarfutbol.com/resources/imagenes/FaceCorreo.png';
                    $direccionFacebook = 'http://www.facebook.com/ajugarfut';
                    $mail = new Mail;
                    $mail->enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3);
                  }          
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             }
                             
            
            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function cancelaReservacionAdm
//========================================================================================================================	
        public function aprobarReservacionListaEsperaAdm($params){
        
            $_db = $this->__construct();            
            $fechaYhora = $params->fechaYhora;
            $idCancha = $params->idCancha; 
            $idUsuario= $params->idUsuario; 
            
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=4 WHERE idPersona=? and FechaHoraReservacion=? and idCancha=?")) {                        
                $stmt->bind_param('isi',$idUsuario,$fechaYhora,$idCancha);	
                
                $idUsuario = (int) $idUsuario;
                $fechaYhora = $_db->real_escape_string($fechaYhora);
                $idCancha = (int) $idCancha;

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();                
                
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                        $msj['codigoError']="0000";
                        $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                        
                        /*$destinatario = $correoUsuario; 
                        
                        $asunto = "Aprobada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te confirmamos que el administrador de la cancha <font color=red>aprob&oacute;</font> tu reservaci&oacute;n pendiente.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                        $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 

                        //echo 'mail1';
                        mail($destinatario,$asunto,$cuerpo,$headers);*/
                        }
                
                
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             }   
            //Actuliza usuarios que quedaron fuera de la lista de espera
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=5 WHERE FechaHoraReservacion=? and idCancha=? and EstadoReservacion=1")) {                        
                $stmt->bind_param('si',$fechaYhora,$idCancha);	
                                
                $fechaYhora = $_db->real_escape_string($fechaYhora);
                $idCancha = (int) $idCancha;

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();                
                
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                        $msj['codigoError']="0000";
                        $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                        
                        /*$destinatario = $correoUsuario; 
                        
                        $asunto = "Aprobada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te confirmamos que el administrador de la cancha <font color=red>aprob&oacute;</font> tu reservaci&oacute;n pendiente.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                        $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 

                        //echo 'mail1';
                        mail($destinatario,$asunto,$cuerpo,$headers);*/
                        }
                
                
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             } 
                             
                             

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function aprobarReservacionAdm               
//========================================================================================================================	
        public function cancelarReservacionListaEsperaAdm($params){
        
            $_db = $this->__construct();            
            $fechaYhora = $params->fechaYhora;
            $idCancha = $params->idCancha; 
              
            //Actuliza usuarios que quedaron fuera de la lista de espera
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=5 WHERE FechaHoraReservacion=? and idCancha=? and EstadoReservacion=1")) {                        
                $stmt->bind_param('si',$fechaYhora,$idCancha);	
                                
                $fechaYhora = $_db->real_escape_string($fechaYhora);
                $idCancha = (int) $idCancha;

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();                
                
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                        $msj['codigoError']="0000";
                        $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                        
                        /*$destinatario = $correoUsuario; 
                        
                        $asunto = "Aprobada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te confirmamos que el administrador de la cancha <font color=red>aprob&oacute;</font> tu reservaci&oacute;n pendiente.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                        $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 

                        //echo 'mail1';
                        mail($destinatario,$asunto,$cuerpo,$headers);*/
                        }
                
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             } 
                             
                             

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function aprobarReservacionAdm  
//========================================================================================================================	
        public function confirmaReto($params){
        
            $_db = $this->__construct();            
            $idReservacion = $params->idReservacion;
            $idReservacionRetador = $params->idReservacionRetador;
            $correoUsuario = $params->correoUsuario; 
            $comentarioRetador = $params->comentarioRetador; 
            $comentarioContrincante = $params->comentarioContrincante; 
              
            //Actuliza usuarios que quedaron fuera de la lista de espera
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET EstadoReservacion=7,ComentarioReservacion=? WHERE id=? and EstadoReservacion=10")) {                        
                $stmt->bind_param('si',$comentarioContrincante,$idReservacion);	
                                                
                $comentarioContrincante = $_db->real_escape_string($comentarioContrincante);
                $idReservacion = (int) $idReservacion;                

                $stmt->execute();                
                
                $filas_afectadas = $stmt->affected_rows;
                $stmt->close();                
                
                if ($filas_afectadas != 1) {
                                $msj['codigoError']="0003";
                                $msj['mensaje']="ERROR EN EL UPDATE SqlState:".$_db->sqlstate. "  Filas Afectadas: ".$filas_afectadas;
                
                } else {
                        $msj['codigoError']="0000";
                        $msj['mensaje']="Reservacion actualizada correctamente SqlState:".$_db->sqlstate;
                        
                        /*$destinatario = $correoUsuario; 
                        
                        $asunto = "Aprobada la Reservaci�n de Cancha. AJugarFutbol.com"; 
                        $cuerpo = ' 
                        <html> 
                        <head> 
                           <title>ajugarfutbol.com</title> 
                        </head> 
                        <body> 
                        <h1><font color=black>Te confirmamos que el administrador de la cancha <font color=red>aprob&oacute;</font> tu reservaci&oacute;n pendiente.</font></h1> 
                        <p><h2><font color="#0099FF">Canchas de f&uacute;tbol &#8226; Reservaciones en l&iacute;nea &#8226; Retos &#8226; Equipos &#8226; Campeonatos &#8226; y mucho m&aacute;s</font></h2></p>
                        <p> 
                        <p><h3>Si deseas consultar su reservaci&oacute;n:</h3></p>
                        <b>Dar click aqu&iacute; para ir al sitio: <a href="http://www.ajugarfutbol.com">Ingresar</a></b><br><br>
                        <b>O dar click en esta direcci&oacute;n: http://www.ajugarfutbol.com<br><br>                           
                        </p> 
                        </body> 
                        </html>'; 

                        $headers = 'From: Webmaster@AJugarFutbol.Com <webmaster@ajugarfutbol.com>\n'; 
                        $headers .= "Reply-To: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "Return-path: webmaster@ajugarfutbol.com\n"; 
                        $headers .= "MIME-Version: 1.0\n" ;  
                        $headers .= "Content-type: text/html; charset=utf-8\n"; 

                        //echo 'mail1';
                        mail($destinatario,$asunto,$cuerpo,$headers);*/
                        }
                       if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET ComentarioReservacion=? WHERE id=?")) {                        
                            $stmt->bind_param('si',$comentarioRetador,$idReservacionRetador);	

                            $comentarioRetador = $_db->real_escape_string($comentarioRetador);
                            $idReservacionRetador = (int) $idReservacionRetador;

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
            }else { 
                $msj =  array('mensaje'=>'');   
                $msj['codigoError']="0002";
                              $msj['mensaje']="ERROR en el PREPARE SqlState: ".$_db->sqlstate;
                             } 
                             
                             

            $respuesta = array($msj); 

            return $respuesta;
        }// Fin de function confirmaReto  
//========================================================================================================================	
        public function editaComentarioReservacion($params){
        
            $_db = $this->__construct();            
            $idReservacion = $params->idReservacion;
            $comentario = $params->comentario; 
              
            //Actuliza usuarios que quedaron fuera de la lista de espera
            if($stmt = $_db->prepare("UPDATE CanchaReservaciones SET ComentarioReservacion=? WHERE id=?")) {                        
                $stmt->bind_param('si',$comentario,$idReservacion);	
                                
                $comentario = $_db->real_escape_string($comentario);
                $idReservacion = (int) $idReservacion;

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
//=======================================================================================================================================================
public function getListaEspera($params){
        
             	$_db = $this->__construct();
                $idCancha = $params->idCancha;                
                $fechayHora = $params->fechayHora;                
                
                $_result = $_db->query("SELECT  `Persona`.`id`,CanchaReservaciones.ComentarioReservacion,
                                                CONCAT(`Persona`.`Nombre`,' ',`Persona`.`Apellidos`,' - Tel: ',`Persona`.`TelCelular`,' - Correo: ',`Persona`.`EMail`) as infoBasic 

                                        FROM  `Persona`,`CanchaReservaciones`
                                        where `Persona`.`id`= `CanchaReservaciones`.`idPersona` and                                         
                                              `CanchaReservaciones`.`FechaHoraReservacion`='".$fechayHora."' and 
                                              `CanchaReservaciones`.`idCancha`=".$idCancha." and 
                                              `CanchaReservaciones`.`EstadoReservacion`!=5")  
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
        public function getClientesFrecuentes($params){
        
             	$_db = $this->__construct();
                $idInstalacion = $params->idInstalacion;
                $like= $params->like;
                
                $_result = $_db->query("SELECT  `Persona`.id, 
                                                CONCAT(`Persona`.Nombre,' ',`Persona`.Apellidos,' - Tel: ',`Persona`.TelCelular,' - Correo: ',`Persona`.EMail) as infoBasic 
                                        
                                        FROM    `Persona`,`InstalacionClientes` 
       
                                        where   (`Persona`.Nombre like '%".$like."%' or
                                                `Persona`.Apellidos like '%".$like."%' or
                                                `Persona`.TelCelular like '%".$like."%' or
                                                `Persona`.EMail like '%".$like."%') and                                        
                                                `InstalacionClientes`.`idInstalacion`=".$idInstalacion." and 
                                                `InstalacionClientes`.`IdPersona`=`Persona`.id")  
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
        public function getUsuariosPublicos($params){
        
             	$_db = $this->__construct();
                $idInstalacion = $params->idInstalacion; 
                $like= $params->like;
                
                $_result = $_db->query("SELECT  `Persona`.id, 
                                                CONCAT(`Persona`.Nombre,' ',`Persona`.Apellidos,' - Tel: ',`Persona`.TelCelular,' - Correo: ',`Persona`.EMail) as infoBasic 
                                        
                                        FROM    `Persona`,Usuario
       
                                        where  (`Persona`.Nombre like '%".$like."%' or
                                                `Persona`.Apellidos like '%".$like."%' or
                                                `Persona`.TelCelular like '%".$like."%' or
                                                `Persona`.EMail like '%".$like."%') and    
                                               (Usuario.`TipoUsuario`='R' or Usuario.`TipoUsuario`='A') and Persona.id=Usuario.IdPersona")  
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
        
	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();

		return $this;
        } // Fin de Function __destruct
        
        
} // Fin de la Clase ReservaDB
?>