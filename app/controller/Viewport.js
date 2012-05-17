Ext.define('AJugarFutbol.controller.Viewport', {
    extend: 'Ext.app.Controller',

    views: ['viewport.Viewport',
            'panelCentral.Home',
            'panelCentral.Reservar',
            'reserva.CalenReserva',
            'instalacion.MapaGoogle',
            'panelCentral.Equipos',
            'panelCentral.Partidos',
            'panelCentral.Retos',
            'usuario.Login',
            'usuario.Registrarse',
            'usuario.EditarPerfil',
            'panelCentral.Campeonatos',
            'reserva.CalenReservaAdm',
             ],

    stores: ['instalacion.Instalaciones','usuario.Usuarios','ubicacion.Provincias','ubicacion.Cantones','ubicacion.Distritos','catalogos.TipoSuperficies','catalogos.TipoCanchas'],

    models: ['instalacion.Instalacion','usuario.Usuario','ubicacion.Provincia','ubicacion.Canton','ubicacion.Distrito'],

    init: function() {
        var me = this;
        this.control({
             
             //------------------------------------
             //--Botones de pie de pagina
             //------------------------------------
             'viewport button[id=btnAcercaDe]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut},
             'viewport button[id=btnTerminos]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut},
             'viewport button[id=btnPreguntas]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut},
             'viewport button[id=btnPublicidad]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut},
             'viewport button[id=btnDesarrolladores]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut},
             'viewport button[id=btnMapaSitio]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut}, 
             'viewport button[id=btnCorreoAJugarFutbol]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut},              
             'viewport button[id=btnCorreoVentas]': {mouseover:this.botonesPieOver, mouseout:this.botonesPieOut}, 
            
             // Botones Arriba-Derecha
             'viewport button[id=btnIngresarPrincipal]':         {click:this.login},
             'viewport button[id=btnRegistrarsePrincipal]':      {click:this.registrarse},
             'viewport button[id=btnOlvideContrasenaPrincipal]': {click:this.olvideContrasena},
        
             //Control de la Administracion
             //'viewport button[id=btnAdministracion]':            {click:this.controlCanchas},
             //'viewport button[id=btnClientes]':                  {click:this.MantenimientoClientes},
              
             // Eventos Render 
             'viewport > panel':                        {render: this.onPanelRendered}, 
             
             'viewport > panel[id=plnPiePagina]':       {render: this.onPnlPiePaginaRendered},
             'viewport > panel[id=panel_central]':      {resize: this.resizePanelCentral},
         
             // Botones Menu Horizontal
             'viewport button[id=btnInicioPrincipal]': {click:this.inicio}, 
             'viewport button[id=btnBuscarCancha]':    {click:this.reservar}, 
             'viewport button[id=btnPatidos]':         {click:this.ventanaReserva}, 
             'viewport combobox[id=cmbReservaYA]':     {change:this.OnChangeComboInstalaciones}
           
         }); 
          
                
        Ext.Ajax.on('beforerequest', this.ponerMensajeEspera, this);
        Ext.Ajax.on('requestcomplete', this.quitarMensajeEspera, this); 
        Ext.Ajax.on('requestexception', this.quitarMensajeEspera, this);
        
   },
    
     
   clickBotonMenu: function(img) {
        img.setSrc(img.srcClick);
                
        switch(img.id) {
            
                         case 'btnEditarPerfilVertical':
                              me.editarPerfil();
                              break;
                              
                         case 'btnInvitaAmigos':
                              me.invitarAmigos();
                              break;
                              
                        case 'btnAceptarInvitacion':
                              me.aceptarInvitaciones();
                              break;      
                        
                        case 'btnMisAmigos':
                              me.misAmigos();
                              break;                        
                       
                       case 'btnMisEquipos':
                              me.misEquipos();
                              break;                        
                       
                   } // fin del switch del Menu de los botones
    },
    
    MouseOverBotonMenu: function(img) {
        img.setSrc(img.srcOver);
    },
    
    MouseOutBotonMenu: function(img) {
        img.setSrc(img.srcNormal);
    },
    
    MouseDownBotonMenu: function(img) {
        img.setSrc(img.srcDown);
    },
    
    MouseUpBotonMenu: function(img) {
        img.setSrc(img.srcUp);
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
   
   onPnlPiePaginaRendered: function() {
       //console.log('onPnlEncabezadoRendered');
  
       var viewPort = Ext.ComponentQuery.query('#viewport');
       viewPort =  viewPort[0];
 
       global_usuario = Ext.util.Cookies.get("UsuarioEmail");
       global_id_usuario = Ext.util.Cookies.get("UsuarioId");
       global_usuario_foto = Ext.util.Cookies.get("UsuarioFoto");
      
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
           
          //console.log('Respuesta del Ajax: cerrarSesion o reIngreso');
          var obj = Ext.JSON.decode(response.responseText); 
          //console.log(obj);
     
          var fotoUsuarioPrincipal = Ext.ComponentQuery.query('#imagenFotoPrincipal');
          fotoUsuarioPrincipal = fotoUsuarioPrincipal[0];
          var elemento = fotoUsuarioPrincipal.getEl();
          elemento.on('click',function() {alert("Click sobre  la foto");})
          //console.log(fotoUsuarioPrincipal,elemento);
             
          if (global_usuario == null || global_usuario == "") {
                   
                   //Es un ingreso de un usuario totalmente nuevo           
                   global_usuario = "";
                   
                   var cantidadInstalaciones = obj.respuesta[0].mensaje.cantidadInstalaciones;
                   instalacionFavoritas.removeAll();
                   for (var i=0; i<cantidadInstalaciones; i++) {
                        //console.log(obj.respuesta[1].results[1][i].id, obj.respuesta[1].results[1][i].NombreInst);
                        instalacionFavoritas.add({id:obj.respuesta[1].results[1][i].id, nombre:obj.respuesta[1].results[1][i].NombreInst});
                   } // Fin del FOR
                   
                    objx =  viewPort.query('#lblAdministracion');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    objx =  viewPort.query('#btnAdministracion');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    objx['idInstalacion'] = '';
                    objx['nombreInstalacion'] = '';
                    objx['direccion'] = '';
                    objx['encargado'] = '';
                    objx['correo']= '';
                    objx['telefono']= '';
                    objx['modoReservacion']= '';
                    objx =  viewPort.query('#btnClientes');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    objx['idInstalacion'] = '';
                    objx['nombreInstalacion'] = '';
                    

                   var objx = viewPort.query('#btnIngresarPrincipal');
                   objx = objx[0];           
                   objx.setText('Ingresar');
                   objx.setIcon('resources/imagenes/listo.png');
                   objx.setTooltip('Iniciar Sesi&oacute;n');                                  

                   objx =  viewPort.query('#btnRegistrarsePrincipal');           
                   objx = objx[0];
                   objx.setIcon('resources/imagenes/user.png');
                   objx.setText('Registrarse');
                   objx.setTooltip('Crear una cuenta');  

                   objx =  viewPort.query('#imagenFotoPrincipal');
                   objx = objx[0]; 
                   objx.setVisible(false); 

                   objx = viewPort.query('#cmbReservaYA');
                   objx = objx[0]; 
                   objx.setValue(null);

                   objx = viewPort.query('#btnOlvideContrasenaPrincipal');
                   objx = objx[0]; 
                   objx.setIcon('resources/imagenes/key.png');
                   objx.setText('&#191;Olvid&oacute; su contrase&ntilde;a?');
                   objx.setTooltip('Recuperar su contrase&ntilde;a?');  

                   var panelCentral = viewPort.query('#panel_central');
                   panelCentral =  panelCentral[0];
                   panelCentral.removeAll();
                   var view = Ext.widget('home');        
                   panelCentral.add([view]);
                   panelCentral.doLayout();

           } else {
                   //Es un Reingreso de un usuario que esta conectado permanentemente           
    
                   //console.log('Respuesta del Ajax: reIngreso');
                   if (obj.respuesta[0].mensaje.codigoError != '0000') {return;}

                   global_usuario = obj.respuesta[1].results[0][0].EMail;
                   global_nombre_usuario = obj.respuesta[1].results[0][0].Nombre;
                   global_apellidos_usuario = obj.respuesta[1].results[0][0].Apellidos;
                   global_tipo_usuario = obj.respuesta[1].results[0][0].TipoUsuario;
                   global_usuario_foto = obj.respuesta[1].results[0][0].FotoFile;
                  
                   if (global_tipo_usuario == 'A') {
                      // Es un Administrador de Instalaciones
                      //var obj1 =  viewPort.query('#lblAdministracion');
                      //obj1 = obj1[0]; 
                      //obj1.setVisible(true);
                      //var obj2 =  viewPort.query('#btnAdministracion');
                      //obj2 = obj2[0]; 
                      //obj2.setVisible(true);
                      obj2['idInstalacion']= obj.respuesta[0].mensaje.idInstalacion;
                      obj2['nombreInstalacion']= obj.respuesta[0].mensaje.nombreInstalacion;
                      obj2['direccion']= obj.respuesta[0].mensaje.direccion;
                      obj2['encargado']= obj.respuesta[0].mensaje.encargado;
                      obj2['correo']= obj.respuesta[0].mensaje.correo;
                      obj2['telefono']= obj.respuesta[0].mensaje.telefono;
                      obj2['modoReservacion']= obj.respuesta[0].mensaje.modoReservacion;
                      var obj3 =  viewPort.query('#btnClientes');
                      obj3 = obj3[0]; 
                      obj3.setVisible(true);
                      obj3['idInstalacion']= obj.respuesta[0].mensaje.idInstalacion;
                      obj3['nombreInstalacion']= obj.respuesta[0].mensaje.nombreInstalacion;
                      if (obj.respuesta[0].cantidadInstalaciones == 0) {
                                                obj1.setVisible(false);
                                                obj2.setVisible(false);
                                                obj3.setVisible(false);}
                      //console.log(objx);
                     } else 
                         {
                      // NO es un Administrador de Instalaciones
                      objx =  viewPort.query('#lblAdministracion');
                      objx = objx[0]; 
                      objx.setVisible(false);
                      objx =  viewPort.query('#btnAdministracion');
                      objx = objx[0]; 
                      objx.setVisible(false);
                      objx['idInstalacion'] = '';
                      objx['nombreInstalacion'] = '';
                      objx['direccion'] = '';
                      objx['encargado'] = '';
                      objx['correo']= '';
                      objx['telefono']= '';
                      objx['modoReservacion']= '';
                      objx =  viewPort.query('#btnClientes');
                      objx = objx[0]; 
                      objx.setVisible(false);
                      objx['idInstalacion'] = '';
                      objx['nombreInstalacion'] = '';
                     }

                   objx =  viewPort.query('#imagenFotoPrincipal');
                   objx = objx[0]; 
                   if (global_usuario_foto !== null) {
                       objx.setSrc('resources/fotosUsuarios/'+global_usuario_foto);
                       objx.setVisible(true);
                   } else {
                            objx.setVisible(false);
                           }             
                
                  objx = viewPort.query('#btnIngresarPrincipal');
                  objx = objx[0];           
                  objx.setText('<b>'+global_nombre_usuario+'</b>');
                  objx.setIcon('resources/imagenes/user.png');
                  objx.setTooltip('Modificar los datos de mi perfil');                                  

                  objx = viewPort.query('#btnRegistrarsePrincipal');           
                  objx = objx[0];
                  objx.setIcon('resources/imagenes/salir.png');
                  objx.setText('Salir');
                  objx.setTooltip('Cerrar la sesi&oacute;n');  

                  objx = viewPort.query('#cmbReservaYA');
                  objx = objx[0]; 
                  objx.setValue(null);

                  objx = viewPort.query('#btnOlvideContrasenaPrincipal');
                  objx = objx[0]; 
                  objx.setIcon('resources/imagenes/carta.png');
                  objx.setText('Mensajes de tus Amigos');
                  objx.setTooltip('Leer y contestar mensajes de tus Amigos');
                  
                  cantidadInstalaciones = obj.respuesta[0].mensaje.cantidadInstalaciones;

                  instalacionFavoritas.removeAll();
                  for (i=0; i<cantidadInstalaciones; i++) {
                           //console.log(i,obj.respuesta[1].results[1][i].id, obj.respuesta[1].results[1][i].NombreInst);
                           instalacionFavoritas.add({id:obj.respuesta[1].results[1][i].id, nombre:obj.respuesta[1].results[1][i].NombreInst});
                       } // Fin del FOR
           
                  panelCentral = viewPort.query('#panel_central');
                       panelCentral =  panelCentral[0];
                       panelCentral.removeAll();
                       view = Ext.widget('home');        
                       panelCentral.add([view]);
                       panelCentral.doLayout();

           
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
       //console.log('Llama al Ajax: reIngreso');
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Consulta un Usuario por el Id'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'reIngreso',
                      datos:    datos}  
             }); // Fin de la llamada Ajax
       } // Fin de IF de Usuario = Null
       
     },  // Fin onPnlPiePaginaRendered
  
//=========================================================================================================================    
   
    onPanelRendered: function() {
        console.log('onWinportRendered');
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

    //controlCanchas: function() {
    //   var panelCentral = Ext.ComponentQuery.query('#panel_central');
    //   panelCentral =  panelCentral[0];       
    //   var view = Ext.widget('winCalenReservaAdm');
    //   panelCentral.removeAll();
   //    panelCentral.add([view]);
   //    panelCentral.doLayout();         
   // },
//=========================================================================================================================    

   // MantenimientoClientes: function() {
   //    var panelCentral = Ext.ComponentQuery.query('#panel_central');
   //    panelCentral =  panelCentral[0];       
  //     var view = Ext.widget('pnlGridClientes');
  //     panelCentral.removeAll();
  //     panelCentral.add([view]);
  //     panelCentral.doLayout();         
  //  },
//=========================================================================================================================    



    botonesPieOver: function(button) {
	// console.log('MouseOver en boton login en la vista de viewport');
        if (button.getText() == '<small style="background:#F2F2F2;">Acerca de AJugarFutbol.com</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>Acerca de AJugarFutbol.com</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">Terminos y condiciones</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>Terminos y condiciones</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">Preguntas frecuentes</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>Preguntas frecuentes</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">Publicidad</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>Publicidad</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">Desarrolladores</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>Desarrolladores</small>');
        }
        if (button.getText() == '<small style="background:#F2F2F2;">Mapa del Sitio</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>Mapa del Sitio</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">WebMaster@ajugarfutbol.com</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>WebMaster@ajugarfutbol.com</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">&copy;2012 Desarrollado por Web System Costa Rica. Todos los derechos reservados</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>&copy;2012 Desarrollado por Web System Costa Rica. Todos los derechos reservados</small>');
           }
        if (button.getText() == '<small style="background:#F2F2F2;">ventas@ajugarfutbol.com</small>') {
             button.setText('<small style="color:#0404B4;background:#F2F2F2";>ventas@ajugarfutbol.com</small>');
           }
        
    },
    
//=========================================================================================================================    
    
    botonesPieOut: function(button) {
	// console.log('MouseOver en boton login en la vista de viewport');
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>Acerca de AJugarFutbol.com</small>') {
             button.setText('<small style="background:#F2F2F2;">Acerca de AJugarFutbol.com</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>Terminos y condiciones</small>') {
             button.setText('<small style="background:#F2F2F2;">Terminos y condiciones</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>Preguntas frecuentes</small>') {
             button.setText('<small style="background:#F2F2F2;">Preguntas frecuentes</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>Publicidad</small>') {
             button.setText('<small style="background:#F2F2F2;">Publicidad</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>Desarrolladores</small>') {
             button.setText('<small style="background:#F2F2F2;">Desarrolladores</small>');
        }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>Mapa del Sitio</small>') {
             button.setText('<small style="background:#FF2F2F2FF;">Mapa del Sitio</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>WebMaster@ajugarfutbol.com</small>') {
             button.setText('<small style="background:#F2F2F2;">WebMaster@ajugarfutbol.com</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>&copy;2012 Desarrollado por Web System Costa Rica. Todos los derechos reservados</small>') {
             button.setText('<small style="background:#F2F2F2;">&copy;2012 Desarrollado por Web System Costa Rica. Todos los derechos reservados</small>');
           }
        if (button.getText() == '<small style="color:#0404B4;background:#F2F2F2";>ventas@ajugarfutbol.com</small>') {
             button.setText('<small style="background:#F2F2F2;">ventas@ajugarfutbol.com</small>');
           }
    },

//=========================================================================================================================    
 
// Este boton puede ser Ingresar o Editar Perfil, depende si el usuario esta loggeado.
login: function(button) {     
       if(global_usuario=='' || global_usuario==null)
       {
           var view = Ext.widget('winLogin');
           view.show();
       }
       else
       {
           var panelCentral = Ext.ComponentQuery.query('#panel_central');
           panelCentral =  panelCentral[0];
           view = Ext.widget('winEditarPerfil');
           panelCentral.removeAll();
           panelCentral.add([view]);
           panelCentral.doLayout();  
       }         
    }, // fin function login
    // 
//=========================================================================================================================    
    
 olvideContrasena: function(button) {  
     
       if (global_usuario==null || global_usuario=='') { 
             // No hay Usuario conectado.
             view = Ext.widget('winOlvidoPws');
             view.show();
           } else {
                   // Hay Usuario conectado, el boton se convierte en Leer Mensajes.
                   var panelCentral = Ext.ComponentQuery.query('#panel_central');
                   panelCentral =  panelCentral[0];
                   panelCentral.removeAll();
                   var view = Ext.widget('winMisMensajes');
                   panelCentral.add([view]);
                   var win1 = Ext.ComponentQuery.query('#winMisMensajes');
                   win1 = win1[0];    
                   }
      }, // fin function login
     
//=========================================================================================================================    

// Este boton puede ser Registrarse o Salir, depende si el usuario esta loggeado.
registrarse: function() {
       
         var view;
         if (global_usuario==null || global_usuario=='') { 
          
             view = Ext.widget('winRegistrarse');
             view.show();
             var obj = view.query('#txtCorreo02');
             obj = obj[0]; 
         
          } else {
           
                   global_usuario = '';
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

                           obj = Ext.JSON.decode(response.responseText); 

                           var viewPort = Ext.ComponentQuery.query('#viewport');
                           viewPort =  viewPort[0];

                           var objx = viewPort.query('#btnIngresarPrincipal');
                           objx = objx[0];           
                           objx.setText('Ingresar');
                           objx.setIcon('resources/imagenes/listo.png');
                           objx.setTooltip('Iniciar Sesi&oacute;n');                                  

                           objx =  viewPort.query('#btnRegistrarsePrincipal');           
                           objx = objx[0];
                           objx.setIcon('resources/imagenes/user.png');
                           objx.setText('Registrarse');
                           objx.setTooltip('Crear una cuenta');  

                           objx =  viewPort.query('#imagenFotoPrincipal');
                           objx = objx[0]; 
                           objx.setVisible(false); 

                           objx = viewPort.query('#cmbReservaYA');
                           objx = objx[0]; 
                           objx.setValue(null);

                           objx = viewPort.query('#btnOlvideContrasenaPrincipal');
                           objx = objx[0]; 
                           objx.setIcon('resources/imagenes/key.png');
                           objx.setText('&#191;Olvid&oacute; su contrase&ntilde;a?');
                           objx.setTooltip('Recuperar su contrase&ntilde;a?');  

                           // limpia las variables de Administrador
                           objx =  viewPort.query('#lblAdministracion');
                           objx = objx[0]; 
                           objx.setVisible(false);
                           objx =  viewPort.query('#btnAdministracion');
                           objx = objx[0]; 
                           objx.setVisible(false);
                           objx['idInstalacion'] = '';
                           objx['nombreInstalacion'] = '';
                           objx['direccion'] = '';
                           objx['encargado'] = '';
                           objx['correo']= '';
                           objx['telefono']= '';
                           objx['modoReservacion']= '';

                           var cantidadInstalaciones = obj.respuesta[0].mensaje.cantidadInstalaciones;
                           instalacionFavoritas.removeAll();
                           for (var i=0; i<cantidadInstalaciones; i++) {
                                //console.log(obj.respuesta[1].results[1][i].id, obj.respuesta[1].results[1][i].NombreInst);
                                instalacionFavoritas.add({id:obj.respuesta[1].results[1][i].id, nombre:obj.respuesta[1].results[1][i].NombreInst});
                           } // Fin del FOR

                           var panelCentral = viewPort.query('#panel_central');
                           panelCentral =  panelCentral[0];
                           panelCentral.removeAll();
                           view = Ext.widget('home');        
                           panelCentral.add([view]);
                           panelCentral.doLayout();

                   } // Find de Funcion para cuando el Ajax Request responde correctamente

                   datos = '{}'; 
                   // console.log('datos Ajax : '+datos);

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
    },

//=========================================================================================================================    

  OnChangeComboInstalaciones: function() { 
 
  },


 inicio: function() { 
        // console.log('Click en boton Inicio en el Menu Principal Horizontal');
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        panelCentral.removeAll();
        var view = Ext.widget('home');        
        panelCentral.add([view]);
        panelCentral.doLayout();        
     },  // fin function Inicio

//=========================================================================================================================    
 
 reservar: function() { 
        // console.log('Click en boton Reserva en el Menu Principal Horizontal');
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];        
        panelCentral.removeAll();                
        var view = Ext.widget('winBusquedaReservar'); 
        view.doLayout();
        
        panelCentral.add(view);
        var obj  = panelCentral.query('#plnBusqueda');
        obj = obj[0];        
        obj.expand();
        
        panelCentral.doAutoRender();
        panelCentral.doLayout();        
     },  // fin function Inicio

//=========================================================================================================================    

instalaciones: function() { 
        // console.log('Click en boton Instalaciones en el Menu Principal Horizontal');
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        panelCentral.removeAll();
        var view1 = Ext.create('AJugarFutbol.view.instalacion.Instalaciones');        
        panelCentral.add([view1]);
        panelCentral.doLayout();
     },  // fin function instalaciones

//=========================================================================================================================    
     
ventanaReserva: function() { 
        // console.log('Click en boton Reserva en el Menu Principal Horizontal');
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];        
        panelCentral.removeAll();    
        
        var view = Ext.widget('winCalenReserva');         
        
        panelCentral.add([view]);
        panelCentral.doLayout();
     },  // fin function partidos

//=========================================================================================================================    
     
equipos: function() { 
        //console.log('Click en boton Equipos en el Menu Principal Horizontal');
        var view = Ext.widget('winMapaGoogle'); 
        view.show();
     },  // fin function equipos

//=========================================================================================================================    

retos: function() { 
        // console.log('Click en boton Retos en el Menu Principal Horizontal');
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        panelCentral.removeAll();
        var view = Ext.widget('retos');        
        panelCentral.add([view]);
        panelCentral.doLayout();
     },  // fin function retos
     
//=========================================================================================================================    

editarPerfil: function() {
   
     if (global_id_usuario == '' || global_id_usuario==null) {
        new Ext.ux.Notification({
            iconCls: 'error',
            title:	 '<font size=2 color=red>Información</font>',
            html:	 '<b>Debe Ingresar antes de editar los datos de su Perfil!</b>',
            autoDestroy: true,
            width: 300,
            hideDelay:  3000}).show(document); 
            return;}
       
   var panelCentral = Ext.ComponentQuery.query('#panel_central');
   panelCentral =  panelCentral[0];
   panelCentral.removeAll();
   var view = Ext.widget('winEditarPerfil');
   panelCentral.add([view]);
   panelCentral.doLayout();
   
   
    }, // editarPerfil   

//=========================================================================================================================    

 invitarAmigos: function() { 
     
         if (global_id_usuario == '' || global_id_usuario==null) {
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>Debe Ingresar antes de enviar una invitación!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document); 
                return;}

        global_contador = 0;
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        panelCentral.removeAll();
        var view = Ext.widget('winInvitarAmigos');        
        panelCentral.add([view]);
        panelCentral.doLayout();
     },  // fin function invitarAmigos

//=========================================================================================================================    
     
aceptarInvitaciones: function() { 
         if (global_id_usuario == '' || global_id_usuario==null) {
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>Debe Ingresar antes de aceptar invitaciones!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document); 
                return;}

       global_contador = 0;
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        panelCentral.removeAll();
        var view = Ext.widget('winAceptarInvitaciones');        
        panelCentral.add([view]);
        panelCentral.doLayout();
     },  // fin aceptarInvitaciones
 
//=========================================================================================================================    

misAmigos: function() {
  
   if (global_id_usuario == '' || global_id_usuario==null ) {
       
   new Ext.ux.Notification({
        iconCls: 'error',
        title:	 '<font size=2 color=red>Información</font>',
        html:	 '<b>Debe Ingresar antes de ver a sus Amigos!</b>',
        autoDestroy: true,
        width: 300,
        hideDelay:  3000}).show(document); 
    return;}
   
   var panelCentral = Ext.ComponentQuery.query('#panel_central');
   panelCentral =  panelCentral[0];
   panelCentral.removeAll();
   var view = Ext.widget('winMisAmigos');
   panelCentral.add([view]);
   panelCentral.doLayout();
   
   }, // Fin misAmigos

//=========================================================================================================================    

misEquipos: function() {
  
   if (global_id_usuario == '' || global_id_usuario==null ) {
       
   new Ext.ux.Notification({
        iconCls: 'error',
        title:	 '<font size=2 color=red>Información</font>',
        html:	 '<b>Debe Ingresar antes de ver a sus Equipos!</b>',
        autoDestroy: true,
        width: 300,
        hideDelay:  3000}).show(document); 
    return;}

    var panelCentral = Ext.ComponentQuery.query('#panel_central');
    panelCentral =  panelCentral[0];
    panelCentral.removeAll();
    var view = Ext.widget('winMisEquipos');
    panelCentral.add([view]);
    var win1 = Ext.ComponentQuery.query('#winMisEquipos');
    win1 = win1[0];    
   
   } // Fin misEquipos

//=========================================================================================================================    


}) // Fin de la Clase
