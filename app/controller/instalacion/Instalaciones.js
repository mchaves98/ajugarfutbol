Ext.define('AJugarFutbol.controller.instalacion.Instalaciones', {
    extend: 'Ext.app.Controller',

    views: ['instalacion.Instalacion','instalacion.Instalaciones'],   
    
    
    init: function() {                
        this.control({             
            // Eventos de la Pantalla de Instalaciones
            'winInstalaciones panel[id=plnInstalaciones]':{render: this.muestraInstalaciones}            
        });
        
    },

    // Se abre la ventana de Instalaciones
    muestraInstalaciones: function() {
            
            var plnInstalaciones = Ext.ComponentQuery.query('#plnInstalaciones');
            plnInstalaciones =  plnInstalaciones[0];
            plnInstalaciones.removeAll();
                 // Funcion para cuando falla el Ajax Request
            var failureAjaxFn = function(response, request) {  
                  var errMessage = 'Error en la petición' + request.url + ' '  
                  + ' status ' + response.status + ''  
                  + ' statusText ' + response.statusText + ''  
                  + ' responseText ' + response.responseText + '';  
                  // console.log (errMessage);  
                  }  // Fin Funcion para cuando falla el Ajax Request


           // Funcion para cuando el Ajax Request responde correctamente
           var successAjaxFn = function(response, request) {  
                  //console.log (' Response del Ajax Request: ' + response.responseText);

           var obj = Ext.JSON.decode(response.responseText); 
           var todasInstalaciones=new Array();
           var winInstalacion;
           var cantFilas=obj.respuesta[0].mensaje.CantFilas;                      
        
        for(var i=0;i<cantFilas;i++)
        {            
            winInstalacion='winInstalacion'+i;
            winInstalacion= Ext.widget('winInstalacion',{id:winInstalacion,alias:'widget.'+winInstalacion,itemId:winInstalacion});                       
            
                //Cambia ID a los componentes de la pantalla Instalacion
                var cambiaID = winInstalacion.query('#chkFavorita');            
                cambiaID[0]['id']=obj.respuesta[1].results[i].id;
                
                cambiaID = winInstalacion.query('#plnInfo');                            
                cambiaID[0]['id']='plnInfo'+obj.respuesta[1].results[i].id;                                                
                cambiaID = winInstalacion.query('#btnInfo');                            
                cambiaID[0]['id']='btnInfo'+obj.respuesta[1].results[i].id;
                cambiaID[0]['itemId']='btnInfo'+obj.respuesta[1].results[i].id;   
                
                cambiaID = winInstalacion.query('#plnMapaGoogle');                            
                cambiaID[0]['id']='plnMapaGoogle'+obj.respuesta[1].results[i].id;
                cambiaID = winInstalacion.query('#btnMapa');            
                cambiaID[0]['id']='btnMapa'+obj.respuesta[1].results[i].id;
                cambiaID[0]['itemId']='btnMapa'+obj.respuesta[1].results[i].id;                
                
                cambiaID = winInstalacion.query('#plnGaleria');                            
                cambiaID[0]['id']='plnGaleria'+obj.respuesta[1].results[i].id;
                cambiaID = winInstalacion.query('#btnGaleria');            
                cambiaID[0]['id']='btnGaleria'+obj.respuesta[1].results[i].id; 
                cambiaID[0]['itemId']='btnGaleria'+obj.respuesta[1].results[i].id; 
                
                cambiaID = winInstalacion.query('#plnCampeonatos');                            
                cambiaID[0]['id']='plnCampeonatos'+obj.respuesta[1].results[i].id;
                cambiaID = winInstalacion.query('#btnCampeonatos');            
                cambiaID[0]['id']='btnCampeonatos'+obj.respuesta[1].results[i].id; 
                cambiaID[0]['itemId']='btnCampeonatos'+obj.respuesta[1].results[i].id; 
                
                cambiaID = winInstalacion.query('#plnCanchas');                            
                cambiaID[0]['id']='plnCanchas'+obj.respuesta[1].results[i].id;
                cambiaID = winInstalacion.query('#btnCanchas');            
                cambiaID[0]['id']='btnCanchas'+obj.respuesta[1].results[i].id;  
                cambiaID[0]['itemId']='btnCanchas'+obj.respuesta[1].results[i].id;  
                
                cambiaID = winInstalacion.query('#btnReservar');            
                cambiaID[0]['id']='btnReservar'+obj.respuesta[1].results[i].id;  
                cambiaID[0]['itemId']='btnReservar'+obj.respuesta[1].results[i].id;  
                //Fin de Cambia ID a los componentes de la pantalla Instalacion
                        
            //Componentes de la Pantalla Instalaciones
            objx = winInstalacion.query('#lblTitulo');
            objx = objx[0];         
            objx.setText(obj.respuesta[1].results[i].NombreInst);

            objx = winInstalacion.query('#lblDireccionReservar');
            objx = objx[0];         
            objx.setText(obj.respuesta[1].results[i].Provincia+', '+obj.respuesta[1].results[i].Canton);
            
            objx = winInstalacion.query('#btnInfo'+obj.respuesta[1].results[i].id)
            objx = objx[0];         
            objx.setTooltip('Tel: '+obj.respuesta[1].results[i].Telefono1+' - '+obj.respuesta[1].results[i].Direccion1);
            
            objx = winInstalacion.query('#chkFavorita',{id:i});                         
            objx = objx[0];
            
            if(global_id_usuario==''||global_id_usuario==null)
            {                         
                objx.setVisible(false);
            }
            else
            {
               if(obj.respuesta[1].results[i].IdInstalacion==null)
               {                             
                    objx.setValue(false);
               }
               else
               {                             
                    objx.setValue(true);                    
               }
                 
            }
            todasInstalaciones[i]=winInstalacion; 
       }
        plnInstalaciones.add(todasInstalaciones);
        plnInstalaciones.doLayout();     
     }
     
    
      var idUsuario='';
       if(global_id_usuario==''||global_id_usuario==null)
       {
           idUsuario='null'
       }
       else
       {
           idUsuario=global_id_usuario;
       }
       datos = '{"idUsuario":"' + idUsuario + '"}'; 
           Ext.Ajax.request({  
                 url: 'php/RouterDBAJugarFutbol.php',  
                 method: 'POST',  
                 success: successAjaxFn,  
                 failure: failureAjaxFn, 
                 timeout: 30000,  
                 headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta todas las instalaciones'},  
                 params: {clasePhp: 'InstalacionDB',
                          metodo:   'getTodosRegistros',
                          datos:    datos}  
                 }); // Fin de la llamada Ajax                
    } // Fin Pantalla de Listado de Instalaciones
 });
