Ext.define('AJugarFutbol.controller.ViewportAdmx1', {
    extend: 'Ext.app.Controller',

    views: ['administracionx1.ViewportAdmx1'],

   stores: ['ubicacion.Provincias','ubicacion.Cantones','ubicacion.Distritos',
            'instalacion.Instalaciones', 'catalogos.Vendedores', 'catalogos.StatusClientes',
            'catalogos.Clientes','catalogos.StatusContratos'],

    init: function() {
       var me = this;
       this.control({             
             'viewport button[id=btnIngresarPrincipal]':          {click:this.login},             
             'viewport button[id=btnOlvideContrasenaPrincipal]':  {click:this.olvideContrasena}, // Tambien Cerrar Sesion
             'viewport button[id=btnHome]':                       {click:this.home},
             'viewport button[id=btnEditarPerfilVertical]':       {click:this.procesarBotonOpcion},
             'viewport button[id=btnClientes]':                   {click:this.procesarBotonOpcion},
             'viewport button[id=btnContratos]':                  {click:this.procesarBotonOpcion},
             'viewport button[id=btnPagos]':                      {click:this.procesarBotonOpcion},
             'viewport button[id=btnContactos]':                  {click:this.procesarBotonOpcion},
             'viewport > panel':                                  {render: this.onPanelRendered}, 
             'viewport > panel[id=plnPiePagina]':                 {render: this.onPnlPiePaginaRendered},
             'viewport > panel[id=panel_central]':                {resize: this.resizePanelCentral},
             
             'winEnviarMensaje button[itemId=btnEnviaMensaje]':   {click: this.enviaMensaje},
             'winEnviarMensaje':                                  {hide: this.cierraVentana,                                                                      
                                                                   close: this.cierraVentana}
            
         });           
                
        Ext.Ajax.on('beforerequest', this.ponerMensajeEspera, this);
        Ext.Ajax.on('requestcomplete', this.quitarMensajeEspera, this); 
        Ext.Ajax.on('requestexception', this.quitarMensajeEspera, this);        
   },
    
   ponerMensajeEspera: function() {
       if (semaforoAjaxMask) {
          var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().mask('Procesando datos. Favor esperar...','msgwait');
       } 
   },
    
    quitarMensajeEspera: function() {
       if (semaforoAjaxMask) {
          var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().unmask();
       }
    },
    
 // ====================================================================================================================================    
    
    
   resizePanelCentral: function(panel,w,h) {
       //console.log(panel);
       var altura = panel.getHeight();
       var ancho = panel.getWidth();
       // console.log(altura);
       if (altura <= 600) {altura=600; 
                           panel.doComponentLayout(ancho, 600);
                          }
       
       var panelV = Ext.ComponentQuery.query('#plnMenuVertical');
       panelV =  panelV[0];
       panelV.setHeight(altura);
       
       var panelP = Ext.ComponentQuery.query('#plnPublicidad');
       panelP =  panelP[0];
       panelP.setHeight(altura);
   },
   
   
 // ====================================================================================================================================          
   home: function(button) {
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        var view = Ext.create('AJugarFutbol.view.administracionx1.Home');           
        panelCentral.removeAll();
        panelCentral.add([view]); 
   },
   
 // ====================================================================================================================================          
   cierraVentana: function(button) {
        var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().unmask();       
   },
// ====================================================================================================================================       
   renderEnviaMensaje: function(button) {
        var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().mask();
       var view = Ext.create('AJugarFutbol.view.administracionx1.EnviarMensaje');
       view.show();
   },
// ====================================================================================================================================       
   enviaMensaje: function(button) {
        var win=Ext.ComponentQuery.query('#winEnviarMensaje')[0];        
        
        var mensaje=Ext.ComponentQuery.query('#txtMensajeCorreo'); 
        mensaje=mensaje[0].getValue();        

       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              alert("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
              win.close();
       }  // Fin Funcion para cuando falla el Ajax Request
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
                var obj = Ext.JSON.decode(response.responseText,true); 
                if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has enviado el mensaje correctamente.</b>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);      
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente   

      var datos = '{"mensaje":"' + mensaje + '"}';

      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': ''},  
          params: {clasePhp: 'InstalacionDB',
                   metodo:   'enviaMensaje',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
   },
// ====================================================================================================================================    
   
   onPnlPiePaginaRendered: function() {
       var me = this;
       var viewPort = Ext.ComponentQuery.query('#viewport')[0];
 
       global_usuario = Ext.util.Cookies.get("UsuarioEmail");
       global_id_usuario = Ext.util.Cookies.get("UsuarioId");
       global_usuario_foto = Ext.util.Cookies.get("UsuarioFoto");
      
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              alert("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
       }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {
          var obj = Ext.JSON.decode(response.responseText,true); 
          if (obj == null) {
              alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
              return;
          }
          var fotoUsuarioPrincipal = Ext.ComponentQuery.query('#imagenFotoPrincipal');
          fotoUsuarioPrincipal = fotoUsuarioPrincipal[0];
          var elemento = fotoUsuarioPrincipal.getEl();
       
          elemento.on('click',function() {me.procesarBotonOpcion(viewPort.query('#btnEditarPerfilVertical')[0])})
             
          var IngresoNuevo = function(){

                    global_usuario = "";
                    global_nombre_usuario = "";
                    global_apellidos_usuario = "";
                    global_tipo_usuario = "";
                    global_usuario_foto = "";
                   
                    viewPort.query('#btnHome')[0].setVisible(false);
                    viewPort.query('#btnEditarPerfilVertical')[0].setVisible(false);
                    viewPort.query('#btnClientes')[0].setVisible(false);
                    viewPort.query('#btnContratos')[0].setVisible(false);
                    viewPort.query('#btnPagos')[0].setVisible(false);
                    viewPort.query('#btnContactos')[0].setVisible(false);
                    
                    objx = viewPort.query('#btnIngresarPrincipal')[0];
                    objx.setText('<font color=white><b>Ingresar</b></font');
                    objx.setIcon('resources/imagenes/iniciar.gif');
                    objx.setTooltip('Iniciar Sesi&oacute;n');                                   

                    objx =  viewPort.query('#imagenFotoPrincipal')[0].setVisible(false); 
                   
                    objx = Ext.ComponentQuery.query('#lblMenuHorizontalTitulo')[0].setValue('<b style="font-size:20px;margin-left:130px;"></b>');

                    objx = viewPort.query('#btnOlvideContrasenaPrincipal')[0];
                    objx.setIcon('resources/imagenes/key.png');
                    objx.setText('<font color=white><b>&#191;Clave?</b></font');
                    objx.setTooltip('Recuperar su contrase&ntilde;a?');  
                   
                    var view = Ext.create('AJugarFutbol.view.administracionx1.Login');
                    view.show();
                    
                    var panelCentral = Ext.ComponentQuery.query('#panel_central');
                    panelCentral =  panelCentral[0];
                    view = Ext.create('AJugarFutbol.view.administracionx1.Home');           
                    panelCentral.removeAll();
                    panelCentral.add([view]);
          } // Fin de Ingreso Nuevo   
             
          if (global_usuario == null || global_usuario == "") {
                   //Es un ingreso de un usuario totalmente nuevo           
                   IngresoNuevo();
                   return;
           } else {
                   //Es un Reingreso de un usuario que esta conectado permanentemente  
                   if (obj.respuesta[0].mensaje.codigoError != '0000') {me.olvideContrasena(); return;}
                   global_usuario = obj.respuesta[1].results[0][0].EMail;
                   global_nombre_usuario = obj.respuesta[1].results[0][0].Nombre;
                   global_apellidos_usuario = obj.respuesta[1].results[0][0].Apellidos;
                   global_tipo_usuario = obj.respuesta[1].results[0][0].EsJSoluciones;
                   global_usuario_foto = obj.respuesta[1].results[0][0].FotoFile;
                  
                   if (global_tipo_usuario == 'SI') {
                      // Es un Administrativo de JSolucionews
                      var objx = Ext.ComponentQuery.query('#lblMenuHorizontalTitulo');
                      objx[0].setValue('<center><div style="font-size:20px;width:865px;"><b>Sistema de Seguimiento de Clientes - JSoluciones, S.A.</b></div></center>');

                      viewPort.query('#btnHome')[0].setVisible(true);
                      viewPort.query('#btnEditarPerfilVertical')[0].setVisible(true);
                      viewPort.query('#btnClientes')[0].setVisible(true);
                      viewPort.query('#btnContratos')[0].setVisible(true);
                      viewPort.query('#btnPagos')[0].setVisible(true);
                      viewPort.query('#btnContactos')[0].setVisible(true);
                                         
                      var panelCentral = Ext.ComponentQuery.query('#panel_central');
                      panelCentral =  panelCentral[0];
                      view = Ext.create('AJugarFutbol.view.administracionx1.Home');           
                      panelCentral.removeAll();
                      panelCentral.add([view]); 
                     } else 
                         {
                          Ext.MessageBox.show({
                            title: 'Error',
                            msg: 'El sitio es restringido!',                          
                            icon: Ext.MessageBox.ERROR});                     
                      // NO es un Administrador de Instalaciones                      
                      viewPort.query('#plnMenuHorizontal')[0].setVisible(false);
                      viewPort.query('#btnHome')[0].setVisible(false);
                      viewPort.query('#btnEditarPerfilVertical')[0].setVisible(false);
                      viewPort.query('#btnClientes')[0].setVisible(false);
                      viewPort.query('#btnContratos')[0].setVisible(false);
                      viewPort.query('#btnPagos')[0].setVisible(false);
                      viewPort.query('#btnContactos')[0].setVisible(false);
                      viewPort.query('#imagenFotoPrincipal')[0].setVisible(false);
                      viewPort.query('#lblMenuHorizontalTitulo')[0].setValue('<b style="font-size:20px;margin-left:130px;"></b>');
                       
                   }
                   objx =  viewPort.query('#imagenFotoPrincipal')[0];
                   if (global_usuario_foto !== null) {
                       objx.setSrc('resources/fotosUsuarios/'+global_usuario_foto);
                       objx.setVisible(true);
                   } else { objx.setVisible(false);}             
                
                  objx = viewPort.query('#btnIngresarPrincipal')[0];
                  objx.setText('<font color=white><b>'+global_nombre_usuario+'</b></font');
                  objx.setIcon('resources/imagenes/perfil.png');
                  objx.setTooltip('Modificar los datos de mi perfil');                                  

                  objx = viewPort.query('#btnOlvideContrasenaPrincipal')[0];
                  objx.setIcon('resources/imagenes/cerrar.png');
                  objx.setText('<font color=white>Cerrar Sesi&oacute;n</font>');
                  objx.setTooltip('Cerrar la sesi&oacute;n');                  
            } // fin del IF 
           
       } // Find de Funcion para cuando el Ajax Request responde correctamente

        me = this;
        if (global_usuario == null || global_usuario == "") {
             global_usuario="";
             var datos = '{}'; 
             //console.log('Llama al Ajax: cerrarSesion');
             Ext.Ajax.request({  
                 url: 'php/RouterDBAJugarFutbol.php',  
                 method: 'POST',  
                 success: successAjaxFn,  
                 failure: failureAjaxFn, 
                 timeout: 30000,  
                 headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Cerrar la sesion'},  
                 params: {clasePhp: 'UsuarioDB',
                          metodo:   'cerrarSesion',
                          datos:    datos}  
                 }); // Fin de la llamada Ajax
                 //this.inicio();
       } else {   
       datos = '{"id":"' + global_id_usuario + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Reingreso'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'reIngreso',
                      datos:    datos}  
             }); // Fin de la llamada Ajax
       } // Fin de IF de Usuario = Null
       
     },  // Fin onPnlPiePaginaRendered
  
//=========================================================================================================================    
   
    onPanelRendered: function() {
        //console.log('onWinportRendered');
        var panelCentral = Ext.ComponentQuery.query('#viewport');
              panelCentral =  panelCentral[0];
              var pantalla=screen.width;
              var mitadPantalla;
              var puntoInicioX;
              
              if(pantalla>1024)
              {
                  mitadPantalla=pantalla/2;
                  puntoInicioX=mitadPantalla-512;
                  panelCentral.setPosition(puntoInicioX,10);
              }
    },

//=========================================================================================================================    

    procesarBotonOpcion: function(boton) {
       var botton = boton.id;  
       if (global_usuario == '' || global_usuario==null) {
           new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                html:	 '<b>Debe Ingresar antes de usar esta opci&oacute;n!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document); 
                return;}
       var me = this;
 
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              alert("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
       }  // Fin Funcion para cuando falla el Ajax Request
     
       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {
            var obj = Ext.JSON.decode(response.responseText,true); 
            if (obj == null) {
                alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                return; 
            }
            if (obj.respuesta[0].mensaje.codigoError != '0000') {me.olvideContrasena(); return;}
            var panelCentral = Ext.ComponentQuery.query('#panel_central');
            panelCentral =  panelCentral[0];
            var view;
            switch (botton) {
                    case 'btnClientes':
                      view = Ext.create('AJugarFutbol.view.administracionx1.GridClientes');
                      break;
                    case 'btnContratos':
                      view = Ext.create('AJugarFutbol.view.administracionx1.GridContratos');
                      break;
                    case 'btnPagos':
                      view = Ext.create('AJugarFutbol.view.administracionx1.GridContratos');
                      break;
                    case 'btnContactos':
                      view = Ext.create('AJugarFutbol.view.administracionx1.GridContactos');
                      break;
                    case 'btnEditarPerfilVertical':
                      view = Ext.create('AJugarFutbol.view.administracionx1.EditarPerfil');
                      break;
            }
            panelCentral.removeAll();
            panelCentral.add([view]);
       } // Fin Funcion para cuando el Ajax Request responde correctamente
    
       var token = Ext.util.Cookies.get("Token");
       datos = '{"id":"' + global_id_usuario +
           '","token":"' + token +
           '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Validar el Token'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'validarToken',
                      datos:    datos}  
             }); // Fin de la llamada Ajax
       }, // Fin de controlCanchas
      
//=========================================================================================================================    
 
// Este boton puede ser Ingresar o Editar Perfil, depende si el usuario esta loggeado.
login: function(button) {  
    var view ;
       if(global_usuario=='' || global_usuario==null)
       {   view = Ext.create('AJugarFutbol.view.administracionx1.Login');   
           view.show();
       } else {
                var panelCentral = Ext.ComponentQuery.query('#panel_central');
                panelCentral =  panelCentral[0];
                view = Ext.create('AJugarFutbol.view.administracionx1.EditarPerfil');           
                panelCentral.removeAll();
                panelCentral.add([view]);           
       }         
    }, // fin function login
 
//=========================================================================================================================    
    
 olvideContrasena: function(button) {  
        var view;
         if (global_usuario==null || global_usuario=='') { 
             view = Ext.create('AJugarFutbol.view.administracionx1.OlvidoPws');   
             view.show();
          } else { global_usuario = '';
                   global_id_usuario = '';
                   global_nombre_usuario = '';
                   global_apellidos_usuario = '';
                   global_tipo_usuario = '';
                   global_usuario_foto = '';

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
                           var obj = Ext.JSON.decode(response.responseText); 
                           var viewPort = Ext.ComponentQuery.query('#viewport')[0];
                           var objx = viewPort.query('#btnIngresarPrincipal')[0];
                           objx.setText('<font color=white><b>Ingresar</b></font');
                           objx.setIcon('resources/imagenes/iniciar.png');
                           objx.setTooltip('Iniciar Sesi&oacute;n');                                   
                           objx =  viewPort.query('#imagenFotoPrincipal')[0];
                           objx.setVisible(false); 
                           objx = viewPort.query('#btnOlvideContrasenaPrincipal')[0];
                           objx.setIcon('resources/imagenes/key.png');
                           objx.setText('<font color=white><b>&#191;Clave?</b></font');
                           objx.setTooltip('Recuperar su contrase&ntilde;a?');  
                           viewPort.query('#btnHome')[0].setVisible(false);
                           viewPort.query('#btnEditarPerfilVertical')[0].setVisible(false);
                           viewPort.query('#btnClientes')[0].setVisible(false);
                           viewPort.query('#btnContratos')[0].setVisible(false);
                           viewPort.query('#btnPagos')[0].setVisible(false);
                           viewPort.query('#btnContactos')[0].setVisible(false);
                           viewPort.query('#imagenFotoPrincipal')[0].setVisible(false);
                           viewPort.query('#lblMenuHorizontalTitulo')[0].setValue('<b style="font-size:20px;margin-left:130px;"></b>');
                           view = Ext.create('AJugarFutbol.view.administracionx1.Login');   
                           view.show();
                           var panelCentral = Ext.ComponentQuery.query('#panel_central');
                           panelCentral =  panelCentral[0];
                           view = Ext.create('AJugarFutbol.view.administracionx1.Home');           
                           panelCentral.removeAll();
                           panelCentral.add([view]); 
                   } // Find de Funcion para cuando el Ajax Request responde correctamente

                   var datos = '{}'; 
                   Ext.Ajax.request({  
                         url: 'php/RouterDBAJugarFutbol.php',  
                         method: 'POST',  
                         success: successAjaxFn,  
                         failure: failureAjaxFn, 
                         timeout: 30000,  
                         headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Cerrar Sesion'},  
                         params: {clasePhp: 'UsuarioDB',
                                  metodo:   'cerrarSesion',
                                  datos:    datos}  
                         }); // Fin de la llamada Ajax
     }
} // fin function login
     
//=========================================================================================================================      

}) // Fin de la Clase