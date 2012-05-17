<?php
/*
*
*  WebSite: AJugarFutbol.Com
*  File: CargarFotoUsuario.php
*
*  Autor: Manuel Chaves
*  Fecha: 05/Enero/2012
*  
*  Carga la foto del Usuario
*
*/

require_once("clasesDBPropias/UsuarioDB.php");
require_once("clasesDBPropias/InstalacionDB.php");

try {

header('Content-Type: text/html');
// echo 'real path: '. realpath('../../resources/fotosUsuarios'); 


if(!isset($_FILES['file'])) {
               $msj[message] = "NOT Uploaded";
               $msj[success]= false;
               $msj[errors]= 'No se indico el nombre del archivo.';
               die(json_encode($msj));
    }

$id = $_POST['idHidden01'];

if ($_POST['ancho01'] != null) { $ancho = $_POST['ancho01']; } else { $ancho = 100; }
if ($_POST['alto01'] != null)  { $alto  = $_POST['alto01'];  } else { $alto = 100; }
if ($_POST['clase01'] != null) { $clase = $_POST['clase01']; } else { $clase = 'UsuarioDB'; }
if ($_POST['directorio01'] != null) { $directorio = $_POST['directorio01']; } else { $directorio = 'fotosUsuarios'; }

$file = $_FILES['file'];

$info = getimagesize($file['tmp_name']);
$msj[tmpfile]= $file['tmp_name'];
$contentType = $info['mime'];
$oldWidth  =  $info[0];
$oldHeight =  $info[1];
if ($oldWidth >= $oldHeight) {// La foto es Horizontal
         $xdst = 0;
         $factor = $alto / $oldWidth;
         $ydst = round(($alto - ($factor * $oldHeight)) / 2) ;
         $newWidth  =  $ancho;
         $newHeight =  round($oldHeight * $factor);
    } else {// La foto es Vertical
            $ydst = 0;
            $factor = $ancho / $oldHeight;
            $xdst = round(($ancho - ($factor * $oldWidth)) / 2) ;
            $newHeight  =  $alto;
            $newWidth =  round($oldWidth * $factor);
           }

if (!is_uploaded_file($file['tmp_name'])) {
   $msj[file]=$file['name']; 
         $msj[message] = "NOT Uploaded";
         $msj[success]= false;
         $msj[errors]= 'No se pudo bajar el archivo. Error de Seguridad.'; 
         die(json_encode($msj));
} 

if(!($contentType =='image/jpeg' || $contentType =='image/gif' || $contentType =='image/png' )) {
         $msj[file]=$file['name']; 
         $msj[message] = "NOT Uploaded";
         $msj[success]= false;
         $msj[errors]= 'Tipo de Archivo no permitido. Solo: gif, png o jpeg.'; 
         die(json_encode($msj));
   }
      
if ($_FILES['file']['error'] > 0) {
     $msj[file]=$file['name']; 
     $msj[message] = $_FILES['file']['error'];
     $msj[success]= false;
     $msj[errors]= 'No se pudo bajar el archivo. Error Interno';
     echo json_encode($msj);
   }
   
$MaxFileeSize = 4 * 1024 * 1024; 
if ($_FILES['file']['size'] >= $MaxFileeSize) {
         $msj[file]=$file['name']; 
         $msj[message] = "NOT Uploaded";
         $msj[success]= false;
         $msj[errors]= 'El archivo es muy grande, no se pudo bajar.'; 
         die(json_encode($msj));
  }
  
$reducirCalidad = false;
if ($_FILES['file']['size'] >= 5000) { $reducirCalidad = true; }

if($contentType =='image/jpeg' ) {$extension = '.jpg';}
if($contentType =='image/png' )  {$extension = '.png';}
if($contentType =='image/gif' )  {$extension = '.gif';}

$keychars = "abcdefghijkLmnpqrstuvwxyz23456789";
$length = 8;
$randkey = "";
$max=strlen($keychars)-1;
for ($i=0;$i<$length;$i++) {$randkey .= substr($keychars, rand(0, $max), 1);}
$aleatorio = $randkey;

if ($reducirCalidad) {$fileDestino =  "../resources/".$directorio."/foto".$aleatorio.$id.$extension;
                     } else {$fileNewDestino =  "../resources/".$directorio."/fotoA".$aleatorio.$id.$extension;
                             $fileDestino =  "../resources/".$directorio."/fotoA".$aleatorio.$id.$extension;} 
                     
if(move_uploaded_file($file['tmp_name'], $fileDestino)){        
        // Todo correcto el archivo se bajo satisfactoriamente
        if ($reducirCalidad) {
                switch( $extension ) {
                    case '.gif': $imagen_src = imagecreatefromgif( $fileDestino ); break;
                    case '.jpg': $imagen_src = imagecreatefromjpeg( $fileDestino ); break;
                    case '.png': $imagen_src = imagecreatefrompng( $fileDestino ); break;
                    }
                

                //$imagen_dst = @imagecreatetruecolor($newWidth, $newHeight);
                //if ( empty($imagen_dst) ) {$imagen_dst = imagecreate($newWidth, $newHeight);}
                $imagen_dst = @imagecreatetruecolor($ancho, $alto);
                if ( empty($imagen_dst) ) {$imagen_dst = imagecreate($ancho, $alto);}
                
                imagealphablending($imagen_dst, false);
                $blanco = imagecolorallocate ($imagen_dst, 255, 255, 255);
                imagefill ($imagen_dst , 0, 0, $blanco );
                
                //imagecopyresampled($imagen_dst,$imagen_src,0,0,0,0,$newWidth,$newHeight,imagesx($imagen_src),imagesy($imagen_src));
                imagecopyresampled($imagen_dst,$imagen_src,$xdst,$ydst,0,0,$newWidth,$newHeight,imagesx($imagen_src),imagesy($imagen_src));
                
                $fileNewDestino =  "../resources/".$directorio."/fotoA".$aleatorio.$id.$extension;
                switch( $extension ) {
                    case '.gif': imagegif( $imagen_dst, $fileNewDestino ); break;
                    case '.jpg': imagejpeg( $imagen_dst, $fileNewDestino ); break;
                    case '.png': imagepng( $imagen_dst, $fileNewDestino );  break;
                    }
                imagedestroy( $imagen_src );
                imagedestroy( $imagen_dst );
                if ( file_exists( $fileDestino ) ) { unlink( $fileDestino ); }
                }

        list($width, $height, $type, $attr) = getimagesize($fileNewDestino);
        $msj[info]= $info;
        $msj[contentType]=  $info['mime'];
        $msj[oldwidth] =   $info[0];
        $msj[oldheight]=  $info[1];
        $msj[size]=$file['size']; 
        $msj[file]=$file['name']; 
        $msj[filedestino]=$fileNewDestino; 
        $msj[newwidth]=$width; 
        $msj[newheight]=$height; 
        $msj[xdst]=$xdst; 
        $msj[ydst]=$ydst; 
        $msj[ancho]=$newWidth; 
        $msj[alto]=$newHeight; 
        $msj[message] = "Uploaded";
        $msj[success]= true;
        $msj[errors]= 'no hay errores';
        if ($clase == 'InstalacionDB') {$usuario = new InstalacionDB;}
        if ($clase == 'UsuarioDB')     {$usuario = new UsuarioDB;}
        $usuario->grabarNombreFoto("fotoA".$aleatorio.$id.$extension,$id);
        $msj[fotofile]= "fotoA".$aleatorio.$id.$extension;
        echo json_encode($msj);
} else {
        $msj[file]=$file['name']; 
        $msj[success]= false;
        $msj[errors]= 'No se pudo bajar el archivo.';
        echo json_encode($msj);
       } 

} // fin del try

catch (Exception $e){    
         $msj[file]=$file['name']; 
         $msj[success]= false;
         $msj[errors]= $e->getMessage();
         echo json_encode($msj);
    }


?>