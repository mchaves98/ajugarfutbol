<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: UsuarioDB.php
*
*  Autor: Manuel Chaves
*  Fecha: 20/Dic/2011
*  
*  Variables de uso comun  
*
*/

if($_SERVER['SERVER_NAME'] == 'www.ajugarfutbol.com' || $_SERVER['SERVER_NAME'] == 'ajugarfutbol.com' ) {
		define('SERVIDOR','www.ajugarfutbol.com');
		define('USUARIODB','pagoscrn_user');
		define('PSW','prod01200');
		define('DATABASE','pagoscrn_AJugarFutbol');
                define('PATHWEB','www.ajugarfutbol.com');
                }
       
if($_SERVER['SERVER_NAME'] == 'www.pagoscr.net' || $_SERVER['SERVER_NAME'] == 'pagoscr.net') {
		define('SERVIDOR','www.pagoscr.net');
		define('USUARIODB','pagoscrn_prueba');
		define('PSW','prueba');
		define('DATABASE','pagoscrn_AJugarFutbolTest');
                define('PATHWEB','www.pagoscr.net');
	        }
              
if($_SERVER['SERVER_NAME'] == 'www.ajugarfutbol.net' || $_SERVER['SERVER_NAME'] == 'ajugarfutbol.net') { 
		define('SERVIDOR','localhost');
		define('USUARIODB','user');
		define('PSW','prod01200');
		define('DATABASE','AJugarFutbol');
                define('PATHWEB','www.ajugarfutbol.net');
                }

if($_SERVER['SERVER_NAME'] == 'localhost') { 
		define('SERVIDOR','localhost');
		define('USUARIODB','root');
		define('PSW','mac01200');
		define('DATABASE','AJugarFutbolTest');
                define('PATHWEB','localhost/ajugarfutbol');
                }

?>
