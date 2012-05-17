<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: Mail.php
*
*  Autor: Manuel Chaves
*  Fecha: 19-Abril
* 
*/

include("./Constantes.php");

class Mail

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
        
        public function enviarCorreo($destinatarios, $saludo, $asunto, $contenido, $alto, $dominio, $direccionFacebook, $img1, $img2, $img3) {
          $cuerpo = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                    <html xmlns="http://www.w3.org/1999/xhtml">
                    <head>
                       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                       <title>Correo</title>
                    </head>
                    <body style="background-color: #154305;	
                                 margin: 0px;
                                 height: '.$alto.'px; 
                                 width: 650px;">
                    <div style="clear:both;background-color:#154305;width:615px;height:'.$alto.'px">
                    <div  id="wrapper" style="width: 600px;
                                            display: block;
                                            margin: 5px;
                                            margin-right: auto; 
                                            margin-left: auto;">
                    <div id="header"> 
                        <div id="logo" style="background-color: #FFF;
                                                height: 87px;
                                                width: 190px;
                                                margin: 5px;
                                                border-bottom-right-radius:10px;
                                                border-bottom-left-radius:10px;
                                                float:left;
                                                padding-top: 3px;">
                                <img style="display: block; margin: 5px; margin-right: auto; margin-left: 10px;" 
                                src="'.$img1.'" width="175" height="84" />
                        </div>
                        <div id="usuario" style="float: left;
                                                color: #FFF;
                                                font-family: Arial, Helvetica, sans-serif;
                                                font-size: 14px;
                                                text-align: center;
                                                height: 87px;
                                                width: 210px;"> 
                                <br/> <h1>'.$saludo.'</h1>
                        </div>  
                    </div>
                    <div id="content" style="clear: both; margin: 5px;">
                        <div  id="asunto" style="background-color: #c80000;
                                                float: left; 
                                                border-radius:10px; 
                                                border: 1px solid #FFF; 
                                                margin-top: 30px; 
                                                max-width:500px;">
                        <div style="color:white;font-size:20px;text-align:center;margin-top:10px;margin-right:13px;margin-bottom:10px;margin-left:13px;">'.$asunto.'</div>
                        </h2>
                        </div>
                        <div id="contenido" style="clear: both;
                                                float: right;
                                                margin-top: 25px;
                                                background-color: #003442;
                                                border-radius:10px;
                                                border: 1px solid #FFF;
                                                max-width:500px;">
                                    <p style="font-family: Arial, Helvetica, sans-serif;
                                            font-size: 14px;
                                            color: #FFF;
                                            text-align: justify;
                                            margin-top: 10px;
                                            margin-right: 13px;
                                            margin-bottom: 10px;
                                            margin-left: 13px;">' 
                                            .$contenido.'
                                    </p>
                        </div>
                        <div id="links" style="clear: both;
                                            margin: 5px;
                                            margin-top: 30px;
                                            float: left;
                                            border-radius:10px;
                                            background-color:#FFF;">
                                <a href='.$dominio.' style="margin: 5px;">
                                    <img id="linkajf" style="margin-right:15px; margin: 5px;" src="'.$img2.'" width="30" height="28" />
                                </a>
                                <a href="'.$direccionFacebook.'" style="margin: 5px;">
                                    <img src="'.$img3.'" style="margin: 5px;" width="28" height="28" />
                                </a>
                        </div>
                        <div id="footer" style="clear: both;
                                                background-color: #c80000;
                                                float: left;
                                                border-radius:10px;
                                                border: 1px solid #FFF;
                                                margin-top: 15px;
                                                height:15px;
                                                width:600px;" >
                                                -

                        </div>
                    </div>
                    </div>
                    </div>
                    </body>
                    </html>';
          
                $headers = "From: ajugarfutbol<info@ajugarfutbol.com>\n"; 
                $headers .= "Reply-To: info@ajugarfutbol.com\n"; 
                $headers .= "Return-path: info@ajugarfutbol.com\n"; 
                $headers .= "MIME-Version: 1.0\n" ;  
                $headers .= "Content-type: text/html; charset=utf-8\n"; 

                mail($destinatarios,$asunto,$cuerpo,$headers); 

		return;
                
	} // Fin de function enviarCorreo

//=========================================================================================================================        

	public function __destruct()
	{
		$_db = $this->__construct();
		$_db->close();

		return $this;
        } // Fin de Function __destruct
        
        
} // Fin de la Clase Mail

?>