<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: ActivarCuenta.php
*
*  Autor: Manuel Chaves
*  Fecha: 22/Dic/2011
*  
*  Activa una cuenta recien registrada. 
*
*/

header ('Location: ../index.html');

require_once('clasesDBPropias/UsuarioDB.php');

$id = $_REQUEST['id'];
$id = substr($id, 32, -32);// devuelve id del Usuario a Activar
$usuario = new UsuarioDB;
$usuario->activarCuenta($id);

?>