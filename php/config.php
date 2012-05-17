<?php
$API = array(
		'usuarioDBExtJs'=>array(
				'methods'=>array(
                                                'getUsuarios'=>array('len'=>1),
						
				)
		),
                 'ubicacionDBExtJs'=>array(
				'methods'=>array(
                                                'getProvincias'=>array('len'=>1),
                                                'getCantones'=>array('len'=>1),
                                                'getDistritos'=>array('len'=>1)						
				)
		),
                'instalacionDBExtJs'=>array(
				'methods'=>array(
                                                'getTodasInstalaciones'=>array('len'=>1)						
				)
		),
                'catalogosDBExtJs'=>array(
				'methods'=>array(
                                                'getTipoSuperficie'=>array('len'=>1),
                                                'getTipoCancha'=>array('len'=>1),
                                                'getTipoEquipoEdad'=>array('len'=>1),
                                                'getTipoEquipoGenero'=>array('len'=>1),
                                                'getTipoFutbol'=>array('len'=>1),
                                                'getClientes'=>array('len'=>1),
                                                'getVendedores'=>array('len'=>1),
                                                'getStatusContratos'=>array('len'=>1),
                                                'getStatusClientes'=>array('len'=>1)
				)
		)    
);

?>
