<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: RouterDBAJugarFutbol.php
*
*  Autor: Manuel Chaves
*  Fecha: 15/Dic/2011
*
*  Router para redirigir los llamados a las funciones de mantenimnientos a la Base de Datos 
*  Recibe: La clase.php a llamar, el metodo a invocar y los datos a pasarle al metodo
*  Devuelve: un string con los datos en JSon.
*
*/

session_start(); 
$clasePhp = $_REQUEST['clasePhp'];
$metodo   = $_REQUEST['metodo'];
$datos    = $_REQUEST['datos'];

if (isset($_REQUEST['tipoRetorno'])) {$tipoRetorno = $_REQUEST['tipoRetorno'];
} else {$tipoRetorno = '';}

if (isset($_REQUEST['sort']))   {$sort   = $_REQUEST['sort'];
} else {$sort = '';}

if (isset($_REQUEST['filter'])) {$filter = $_REQUEST['filter'];
} else {$filter = '';}

if (isset($_REQUEST['start']))  {$start  = $_REQUEST['start'];
} else {$start = '';}

if (isset($_REQUEST['limit']))  {$limit  = $_REQUEST['limit'];
} else {$limit = '';}

$_SESSION["sort"]   = $sort;
$_SESSION["filter"] = $filter;
$_SESSION["start"]  = $start;
$_SESSION["limit"]  = $limit;

if ($datos == null) {$datos = '{}';}
    
$datos = str_replace('\"','"',$datos);
$datos = json_decode($datos);


try {
     require_once("clasesDBPropias/$clasePhp.php");
     $obj = new $clasePhp();
     $result = call_user_func_array(array($obj, $metodo), array($datos));
    }
    catch(Exception $e){echo 'exception: '. $e->getMessage(). ' where: '. $e->getTraceAsString();}
    
    if ($tipoRetorno == null) { // Retorna datos normalmente.
            echo '{"respuesta":';    
            echo '[{"mensaje":'.json_encode($result[0]).'}'; // Devuelve resultado en Json  
            echo ',';
            echo '{"results":'.json_encode($result[1]).'}'; // Devuelve resultado en Json
            echo ']}';
            } else { // Retorna datos para un grid panel con paginacion
                $datosEncabezado = json_encode($result[0]);
                echo substr($datosEncabezado, 0, strlen($datosEncabezado)-1);
                echo ',';
                echo '"results":'.json_encode($result[1]).'}'; // Devuelve resultado en Json
            }
?>