Ext.define('AJugarFutbol.controller.mensaje.Mensajes', {
    extend: 'Ext.app.Controller',

    views: ['mensaje.MisMensajes', 'mensaje.ResponderMensaje', 'mensaje.VerRespuesta'],

    stores: [],

    models: [],
    
    
    init: function() {
         //console.log('Inicializando Controlador Mensajes');
        this.control({ 
            
            // Eventos de la Pantalla de MisMensajes
            'winMisMensajes panel[id=plnMisMensajes]':                    {render: this.renderMisMensajes,
                                                                           afterlayout: this.afterlayoutMisMensajes},
            'winMisMensajes button[itemId=btnResponderMensaje]':          {click: this.clickBtnResponderMensaje},
            'winMisMensajes button[itemId=btnEliminarMensaje]':           {click: this.clickBtnEliminarMensaje},
            'winMisMensajes button[itemId=btnMasMensajes]':               {click: this.clickBtnMasMensajes},
            'winMisMensajes button[itemId=btnListarTodosMensajes]':       {click: this.clickBtnListarTodosMensajes},
            'winMisMensajes button[itemId=btnListarSoloRecibidos]':       {click: this.clickBtnListarSoloRecibidos},
            'winMisMensajes button[itemId=btnListarSoloEnviados]':        {click: this.clickBtnListarSoloEnviados},
            'winMisMensajes button[itemId=btnListarSoloSinContestar]':    {click: this.clickBtnListarSoloSinContestar},
            'winMisMensajes button[itemId=btnListarSoloContestados]':     {click: this.clickBtnListarSoloContestados},
           
            // Eventos de la Pantalla de ResponderMensaje
            'winResponderMensaje button[itemId=btnResponderMsj]':      {click: this.clickBtnResponderMsj},
            'winResponderMensaje panel[id=plnPrincipalMsj]':           {render: this.renderResponderMensaje},
            'winResponderMensaje' :                                    {hide: this.hideWindow, 
                                                                        close: this.closewinResponderMensaje,
                                                                        destroy: this.closewinResponderMensaje},

            // Eventos de la Pantalla de VerRespuesta
           'winVerRespuesta panel[id=plnPrincipalMsj]':               {render: this.renderVerRespuesta},
           'winVerRespuesta' :                                        {hide: this.hideWindow,
                                                                       close: this.closewinVerRespuesta,
                                                                       destroy: this.closewinVerRespuesta}
 
        });
        
    },
    
    
//=====================================================================================================================================
    
    // Render de la Pantalla de ResponderMensaje
    renderResponderMensaje: function() {
        var win = Ext.ComponentQuery.query('#winResponderMensaje'); 
        win = win[0];
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                  var mitadPantalla=pantalla/2;
                  var puntoInicioX=mitadPantalla-(anchoWin/2);
                  win.setPosition(puntoInicioX);
                  }
        //desplazamientoScrolls = getScrollXY();
        //window.scrollTo(0,0);
        //document.getElementsByTagName("html")[0].style.overflow = "hidden";
        var panelPapa = Ext.ComponentQuery.query('#viewport');
        panelPapa = panelPapa[0];
        panelPapa.getEl().mask();
    }, // Fin de Render de la Pantalla de ResponderMensaje
    
    
    // Render de la Pantalla de VerRespuesta
    renderVerRespuesta: function() {
        //console.log('renderWinVerRespuesta');
        var win = Ext.ComponentQuery.query('#winVerRespuesta'); 
        win = win[0];
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                  var mitadPantalla=pantalla/2;
                  var puntoInicioX=mitadPantalla-(anchoWin/2);
                  win.setPosition(puntoInicioX);
                  }
        //desplazamientoScrolls = getScrollXY();
        //window.scrollTo(0,0);
        //document.getElementsByTagName("html")[0].style.overflow = "hidden";
        var panelPapa = Ext.ComponentQuery.query('#viewport');
        panelPapa = panelPapa[0];
        panelPapa.getEl().mask();
    }, // Fin de Render de la Pantalla de VerRespuesta
    

//=====================================================================================================================================

    // Se cerro la Pantalla de Responder Mensaje
    closewinResponderMensaje: function(panel) {
       //console.log('closewinResponderMensaje');
       var iMensaje = panel.getIMensaje();
       var plnMensaje = Ext.ComponentQuery.query('#plnMensaje'+iMensaje);
       plnMensaje = plnMensaje[0];
       var boton = plnMensaje.query('#btnResponderMensaje');
       boton = boton[0];
       boton.setDisabled(false);
       //document.getElementsByTagName("html")[0].style.overflow = "auto";
       //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
    }, // Fin de Se cerro la Pantalla de Responder Mensaje


    // Se cerro la Pantalla de Ver Respuestas
    closewinVerRespuesta: function(panel) {
       //console.log('closeWinVerRespuesta');
       var iMensaje = panel.getIMensaje();
       var plnMensaje = Ext.ComponentQuery.query('#plnMensaje'+iMensaje);
       plnMensaje = plnMensaje[0];
       var boton = plnMensaje.query('#btnResponderMensaje');
       boton = boton[0];
       boton.setDisabled(false); 
       //document.getElementsByTagName("html")[0].style.overflow = "auto";
       //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
    }, // Fin de Se cerro la Pantalla de Ver Respuestas


//=====================================================================================================================================    
    
     // Se cerro un windows modal
    hideWindow: function(win) {
        //console.log('Hide Window');
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
        win.destroy();
               
    },    // Fin de Se cerro la Pantalla de Olvido Clave
    
//========================================================================================================================    

   afterlayoutMisMensajes: function() {
       //console.log('afterlayoutMisMensajes');
       },
  
    
    // Render del Panel de Mis Mensajes
   renderMisMensajes: function() {

       //console.log('Render Mis Mensajes');
       var rowsByPage = 10;
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var me = this;
       var successAjaxFn = function(response, request) {  
               var obj = Ext.JSON.decode(response.responseText); 
               
               var win = Ext.ComponentQuery.query('#plnMisMensajes');
               win = win[0]; 
               
               var win1 = Ext.ComponentQuery.query('#winMisMensajes');
               win1 = win1[0];     
               
               var cantidadMensajesPagina = obj.respuesta[0].mensaje.cantidadMensajesPagina;
               var cantidadMensajes = obj.respuesta[0].mensaje.cantidadMensajes;
               var cantidadPaginas = obj.respuesta[0].mensaje.cantidadPaginas;
               if (cantidadMensajes == 0) {
                   Ext.MessageBox.show({
                     title: 'Mensaje',
                     msg: 'Usted no tiene Mensajes por el momento!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.INFO});
               } else {
                    var mensajes = new Array();
                    layoutMisMensajes = false;
                    win.removeAll();
                    tipoFiltroMensajes = 1;
                    win.add({
                                xtype: 'panel',
                                id: 'pnlBotonesMisMensajes',
                                itemId: 'pnlBotonesMisMensajes',
                                height: 33,
                                width: 725,
                                layout: {type: 'table'},
                                //bodyStyle: 'border:none;',
                                margin: 5,
                                colspan: 2,
                                items: [
                                    {
                                        height: 22,
                                        xtype: 'label',
                                        text: 'Filtrar Mensajes:',
                                        padding: '20 0 0 10',
                                        style: {'color': 'red','font-size': '16px','font-weight':'bold'}
                                    },
                                    {
                                        xtype: 'button',
                                        height: 22,
                                        id: 'btnListarTodosMensajes',
                                        itemId: 'btnListarTodosMensajes',
                                        style: {'margin-top':'5px','margin-left':'20px'},
                                        width: 90,
                                        text: '<b><u>Todos</u></b>',
                                        tooltip: 'Ver todos los mensajes'
                                    },
                                    {
                                        xtype: 'button',
                                        height: 22,
                                        id: 'btnListarSoloRecibidos',
                                        itemId: 'btnListarSoloRecibidos',
                                        style: 'margin-top:5px;margin-left:20px;',
                                        width: 90,
                                        text: 'Recibidos',
                                        tooltip: 'Ver solo los mensajes recibidos'
                                    },
                                    {
                                        xtype: 'button',
                                        height: 22,
                                        id: 'btnListarSoloEnviados',
                                        itemId: 'btnListarSoloEnviados',
                                        style: 'margin-top:5px;margin-left:20px;',
                                        width: 90,
                                        text: 'Enviados',
                                        tooltip: 'Ver solo los mensajes enviados'
                                    },
                                    {
                                        xtype: 'button',
                                        height: 22,
                                        id: 'btnListarSoloSinContestar',
                                        itemId: 'btnListarSoloSinContestar',
                                        style: 'margin-top:5px;margin-left:20px;',
                                        width: 90,
                                        text: 'Sin Contestar',
                                        tooltip: 'Ver solo los mensajes sin contestar'
                                    },
                                    {
                                        xtype: 'button',
                                        height: 22,
                                        id: 'btnListarSoloContestados',
                                        itemId: 'btnListarSoloContestados',
                                        style: 'margin-top:5px;margin-left:20px;',
                                        width: 90,
                                        text: 'Contestados',
                                        tooltip: 'Ver solo los mensajes contestados'
                                    }
                                ]
                            });
                    imensaje = 0
                    for (var i=0; i<cantidadMensajesPagina; i++) {
                           var nombre = obj.respuesta[1].results[i].Nombre;
                           var apellidos = obj.respuesta[1].results[i].Apellidos;
                           var correo = obj.respuesta[1].results[i].EMail;
                           var fotoFile = obj.respuesta[1].results[i].FotoFile;
                           var idUsuarioEnvia = obj.respuesta[1].results[i].IdUsuarioEnvia;
                           var idUsuarioDestino = obj.respuesta[1].results[i].IdUsuarioDestino;
                           var idMensaje = obj.respuesta[1].results[i].id;
                           var mensaje = obj.respuesta[1].results[i].Mensaje;
                           var fechaEnvio = obj.respuesta[1].results[i].FechaEnvio;
                           var fechaRespuesta = obj.respuesta[1].results[i].FechaRespuesta;
                           var idRespuesta = obj.respuesta[1].results[i].IdMensajeRespuesta;
                           while(mensaje.indexOf('%0A')!=-1) {mensaje = mensaje.replace('%0A','\n');}      
                           mensaje = unescape(mensaje);
                           mensajes[i] = me.creaPanelMiMensaje(imensaje, idUsuarioEnvia, nombre, apellidos, correo, fotoFile, 
                                                           idUsuarioDestino, idMensaje, mensaje, fechaEnvio, fechaRespuesta, idRespuesta);
                           imensaje = imensaje + 1;     
                       } // Fin del For
                    
                    win.add(mensajes);
               
                    if (cantidadPaginas > 1) { 
                    win1.add({ 
                            xtype: 'button',
                            id: 'btnMasMensajes',
                            itemId: 'btnMasMensajes',
                            icon: 'resources/imagenes/masAbajo.png',
                            style: 'margin-top:5px;margin-left:20px;margin-bottom:20px;background:#F2F2F2;',  
                            width: 708,
                            height: 42,
                            cantRegistros: cantidadMensajes,
                            paginaActual: 0,
                            paginaFinal: cantidadPaginas,
                            rowsByPage: rowsByPage,
                            iconAlign:'bottom',
                            scale: 'large',                                        
                            text: '<b><font size=2>Ver m&aacute;s resultados...</font><b>',
                            tooltip: 'Ver m&aacute;s resultados'
                             });
                         }  
                         layoutMisMensajes = true;
                         win1.doLayout();  
               
           } // Fin del Else
               
             } // Fin de Funcion para cuando el Ajax Request responde correctamente

       var datos = '{"idUsuario":"' + global_id_usuario + '","rowsByPage":"' + rowsByPage + '","pagina":"0"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Leer Lista de Mensajes'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'leerListaMensajes',
                      datos:    datos}
       }); // Fin de la llamada Ajax

     
    }, // Fin de Render del Panel de Mis Mensajes

//========================================================================================================================    
    
   // ClickBtnListarTodosMensajes de Mis Mensajes
   clickBtnListarTodosMensajes: function() {
        tipoFiltroMensajes = 1;
        layoutMisMensajes = false;
        var datos = '{}'; 
        
        var successAjaxFn = function(response, request) {  
            var pnlBotones = Ext.ComponentQuery.query('#pnlBotonesMisMensajes');
            pnlBotones = pnlBotones[0];
            var boton = pnlBotones.query('#btnListarTodosMensajes');
            boton = boton[0];
            boton.setText('<b><u>Todos</b></u>');
            boton = pnlBotones.query('#btnListarSoloRecibidos');
            boton = boton[0];
            boton.setText('Recibidos');
            boton = pnlBotones.query('#btnListarSoloEnviados');
            boton = boton[0];
            boton.setText('Enviados');
            boton = pnlBotones.query('#btnListarSoloSinContestar');
            boton = boton[0];
            boton.setText('Sin Contestar');
            boton = pnlBotones.query('#btnListarSoloContestados');
            boton = boton[0];
            boton.setText('Contestados');
            var win = Ext.ComponentQuery.query('#plnMisMensajes');
            win = win[0]; 
            var mensaje = win.query('panel[title="Mi Mensaje"]');
            for (var i = 0; i< mensaje.length; i++) {
                boton = mensaje[i].query('#btnResponderMensaje');
                boton = boton[0];
                if (boton != null) {mensaje[i].setVisible(true);}
            }    
            layoutMisMensajes = true;
            var win1 = Ext.ComponentQuery.query('#winMisMensajes');
            win1 = win1[0];     
            win1.doLayout();  
        
        } // Fin de Ajax Satisfactorio      
        
       var failureAjaxFn = function(response, request) {  
            layoutMisMensajes = true;
        } // Fin de Ajax Satisfactorio
       
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Dummy call'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'dummyCall',
                      datos:    datos}
       }); // Fin de la llamada dummy Ajax
        
   },

//========================================================================================================================    
    
    // ClickBtnListarSoloRecibidos de Mis Mensajes
   clickBtnListarSoloRecibidos: function() {
        tipoFiltroMensajes = 2;
 layoutMisMensajes = false;
        var datos = '{}'; 
        
        var successAjaxFn = function(response, request) {  
            var pnlBotones = Ext.ComponentQuery.query('#pnlBotonesMisMensajes');
            pnlBotones = pnlBotones[0];
            var boton = pnlBotones.query('#btnListarTodosMensajes');
            boton = boton[0];
            boton.setText('Todos');
            boton = pnlBotones.query('#btnListarSoloRecibidos');
            boton = boton[0];
            boton.setText('<b><u>Recibidos</b></u>');
            boton = pnlBotones.query('#btnListarSoloEnviados');
            boton = boton[0];
            boton.setText('Enviados');
            boton = pnlBotones.query('#btnListarSoloSinContestar');
            boton = boton[0];
            boton.setText('Sin Contestar');
            boton = pnlBotones.query('#btnListarSoloContestados');
            boton = boton[0];
            boton.setText('Contestados');
            var win = Ext.ComponentQuery.query('#plnMisMensajes');
            win = win[0]; 
            var mensaje = win.query('panel[title="Mi Mensaje"]');
            for (var i = 0; i< mensaje.length; i++) {
                boton = mensaje[i].query('#btnResponderMensaje');
                boton = boton[0];
                if (boton != null) {
                if (boton['idUsuarioEnvia']==global_id_usuario) {
                        mensaje[i].setVisible(false);
                        } else {mensaje[i].setVisible(true);}
                }
            }
            layoutMisMensajes = true;
            var win1 = Ext.ComponentQuery.query('#winMisMensajes');
            win1 = win1[0];     
            win1.doLayout();  
        } // Fin de Ajax Satisfactorio      
        
       var failureAjaxFn = function(response, request) {  
            layoutMisMensajes = true;
        } // Fin de Ajax Satisfactorio
       
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Dummy call'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'dummyCall',
                      datos:    datos}
       }); // Fin de la llamada dummy Ajax
   },

//========================================================================================================================    
    
    // ClickBtnListarSoloEnviados de Mis Mensajes
   clickBtnListarSoloEnviados: function() {
        tipoFiltroMensajes = 3;
        layoutMisMensajes = false;
        var datos = '{}'; 
        
        var successAjaxFn = function(response, request) {  
            var pnlBotones = Ext.ComponentQuery.query('#pnlBotonesMisMensajes');
            pnlBotones = pnlBotones[0];
            var boton = pnlBotones.query('#btnListarTodosMensajes');
            boton = boton[0];
            boton.setText('Todos');
            boton = pnlBotones.query('#btnListarSoloRecibidos');
            boton = boton[0];
            boton.setText('Recibidos');
            boton = pnlBotones.query('#btnListarSoloEnviados');
            boton = boton[0];
            boton.setText('<b><u>Enviados</b></u>');
            boton = pnlBotones.query('#btnListarSoloSinContestar');
            boton = boton[0];
            boton.setText('Sin Contestar');
            boton = pnlBotones.query('#btnListarSoloContestados');
            boton = boton[0];
            boton.setText('Contestados');
            var win = Ext.ComponentQuery.query('#plnMisMensajes');
            win = win[0]; 
            var mensaje = win.query('panel[title="Mi Mensaje"]');
            for (var i = 0; i< mensaje.length; i++) {
                boton = mensaje[i].query('#btnResponderMensaje');
                boton = boton[0];
                if (boton != null) {
                if (boton['idUsuarioEnvia']!=global_id_usuario) {
                        mensaje[i].setVisible(false);
                        } else {mensaje[i].setVisible(true);}
                }
            }
            layoutMisMensajes = true;
            var win1 = Ext.ComponentQuery.query('#winMisMensajes');
            win1 = win1[0];     
            win1.doLayout();  
        } // Fin de Ajax Satisfactorio      
        
       var failureAjaxFn = function(response, request) {  
            layoutMisMensajes = true;
        } // Fin de Ajax Satisfactorio
       
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Dummy call'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'dummyCall',
                      datos:    datos}
       }); // Fin de la llamada dummy Ajax
   },
//========================================================================================================================    
    
   // ClickBtnListarSoloSinContestar de Mis Mensajes
   clickBtnListarSoloSinContestar: function() {
        tipoFiltroMensajes = 4;
        layoutMisMensajes = false;
        var datos = '{}'; 
        
        var successAjaxFn = function(response, request) {  
            var pnlBotones = Ext.ComponentQuery.query('#pnlBotonesMisMensajes');
            pnlBotones = pnlBotones[0];
            var boton = pnlBotones.query('#btnListarTodosMensajes');
            boton = boton[0];
            boton.setText('Todos');
            boton = pnlBotones.query('#btnListarSoloRecibidos');
            boton = boton[0];
            boton.setText('Recibidos');
            boton = pnlBotones.query('#btnListarSoloEnviados');
            boton = boton[0];
            boton.setText('Enviados');
            boton = pnlBotones.query('#btnListarSoloSinContestar');
            boton = boton[0];
            boton.setText('<b><u>Sin Contestar</b></u>');
            boton = pnlBotones.query('#btnListarSoloContestados');
            boton = boton[0];
            boton.setText('Contestados');
            var win = Ext.ComponentQuery.query('#plnMisMensajes');
            win = win[0]; 
            var mensaje = win.query('panel[title="Mi Mensaje"]');
            for (var i = 0; i< mensaje.length; i++) {
                boton = mensaje[i].query('#btnResponderMensaje');
                boton = boton[0];
                if (boton != null) {
                     if (boton['idUsuarioEnvia']==global_id_usuario) {
                                 mensaje[i].setVisible(false);
                     } else {
                             if (boton['contestado']=='1') {
                                     mensaje[i].setVisible(false);
                                 } else {mensaje[i].setVisible(true);}
            
                             }
                }              
            }
            layoutMisMensajes = true;
            var win1 = Ext.ComponentQuery.query('#winMisMensajes');
            win1 = win1[0];     
            win1.doLayout();  
        } // Fin de Ajax Satisfactorio      
        
       var failureAjaxFn = function(response, request) {  
            layoutMisMensajes = true;
        } // Fin de Ajax Satisfactorio
       
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Dummy call'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'dummyCall',
                      datos:    datos}
       }); // Fin de la llamada dummy Ajax
 
   },

//========================================================================================================================    
    
    // ClickBtnListarSoloContestados de Mis Mensajes
   clickBtnListarSoloContestados: function() {
        tipoFiltroMensajes = 5;
        layoutMisMensajes = false;
        var datos = '{}'; 
        
        var successAjaxFn = function(response, request) {  
            var pnlBotones = Ext.ComponentQuery.query('#pnlBotonesMisMensajes');
            pnlBotones = pnlBotones[0];
            var boton = pnlBotones.query('#btnListarTodosMensajes');
            boton = boton[0];
            boton.setText('Todos');
            boton = pnlBotones.query('#btnListarSoloRecibidos');
            boton = boton[0];
            boton.setText('Recibidos');
            boton = pnlBotones.query('#btnListarSoloEnviados');
            boton = boton[0];
            boton.setText('Enviados');
            boton = pnlBotones.query('#btnListarSoloSinContestar');
            boton = boton[0];
            boton.setText('Sin Contestar');
            boton = pnlBotones.query('#btnListarSoloContestados');
            boton = boton[0];
            boton.setText('<b><u>Contestados</b></u>');
            var win = Ext.ComponentQuery.query('#plnMisMensajes');
            win = win[0]; 
            var mensaje = win.query('panel[title="Mi Mensaje"]');
            for (var i = 0; i< mensaje.length; i++) {
                boton = mensaje[i].query('#btnResponderMensaje');
                boton = boton[0];
                if (boton != null) {
                     if (boton['idUsuarioEnvia']==global_id_usuario) {
                                 mensaje[i].setVisible(false);
                     } else {
                             if (boton['contestado']=='0') {
                                     mensaje[i].setVisible(false);
                                 } else {mensaje[i].setVisible(true);}
            
                             }
                }
            }
            layoutMisMensajes = true;
            var win1 = Ext.ComponentQuery.query('#winMisMensajes');
            win1 = win1[0];     
            win1.doLayout();  
        } // Fin de Ajax Satisfactorio      
        
       var failureAjaxFn = function(response, request) {  
            layoutMisMensajes = true;
        } // Fin de Ajax Satisfactorio
       
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Dummy call'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'dummyCall',
                      datos:    datos}
       }); // Fin de la llamada dummy Ajax
        
   },

//========================================================================================================================    

    // ClickBtnMasMensaje de Mis Mensajes
   clickBtnMasMensajes: function() {

        var rowsByPage = 10;
       
        var win = Ext.ComponentQuery.query('#plnMisMensajes');
        win = win[0]; 
        //console.log(win);
        
        var win1 = Ext.ComponentQuery.query('#winMisMensajes');
        win1 = win1[0];
        var btnMasMensajes = win1.query('#btnMasMensajes');
        btnMasMensajes = btnMasMensajes[0];
        //console.log(btnMasMensajes); 
       
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var me = this;
       var successAjaxFn = function(response, request) {  
                var obj = Ext.JSON.decode(response.responseText); 
                var cantidadMensajesPagina = obj.respuesta[0].mensaje.cantidadMensajesPagina;
                //console.log ('cantidadMensajesPagina: '+cantidadMensajesPagina);
                var mensajes = new Array();
                var imensajeAnterior = imensaje;
                for (var i=0; i<cantidadMensajesPagina; i++) {
                       var nombre = obj.respuesta[1].results[i].Nombre;
                       var apellidos = obj.respuesta[1].results[i].Apellidos;
                       var correo = obj.respuesta[1].results[i].EMail;
                       var fotoFile = obj.respuesta[1].results[i].FotoFile;
                       var idUsuarioEnvia = obj.respuesta[1].results[i].IdUsuarioEnvia;
                       var idUsuarioDestino = obj.respuesta[1].results[i].IdUsuarioDestino;
                       var idMensaje = obj.respuesta[1].results[i].id;
                       var mensaje = obj.respuesta[1].results[i].Mensaje;
                       var fechaEnvio = obj.respuesta[1].results[i].FechaEnvio;
                       var fechaRespuesta = obj.respuesta[1].results[i].FechaRespuesta;
                       var idRespuesta = obj.respuesta[1].results[i].IdMensajeRespuesta;
                       while(mensaje.indexOf('%0A')!=-1) {mensaje = mensaje.replace('%0A','\n');}      
                       mensaje = unescape(mensaje);
                       mensajes[i] = me.creaPanelMiMensaje(imensaje, idUsuarioEnvia, nombre, apellidos, correo, fotoFile, 
                                                       idUsuarioDestino, idMensaje, mensaje, fechaEnvio, fechaRespuesta, idRespuesta);
                       imensaje = imensaje + 1;
                       } // Fin del For

                    win.add(mensajes);
                    
                    switch(tipoFiltroMensajes) {
                            
                            case 1:
                            break;
                            
                            case 2:
                            //console.log('filtrar solo recibidos');
                            win = Ext.ComponentQuery.query('#plnMisMensajes');
                            win = win[0]; 
                            var mensajex = win.query('panel[title="Mi Mensaje"]');
                            for ( i = imensajeAnterior; i<imensaje; i++ ) {
                                boton = mensajex[i].query('#btnResponderMensaje');
                                boton = boton[0];
                                if (boton != null) {
                                    mensajex[i].setVisible(true);
                                    if (boton['idUsuarioEnvia']==global_id_usuario) {
                                        mensajex[i].setVisible(false);
                                        }
                                }
                            } 
                            break;
                            
                            case 3:
                            //console.log('filtrar solo enviados');
                            win = Ext.ComponentQuery.query('#plnMisMensajes');
                            win = win[0]; 
                            mensajex = win.query('panel[title="Mi Mensaje"]');
                            for ( i = imensajeAnterior; i<imensaje; i++ ) {
                                boton = mensajex[i].query('#btnResponderMensaje');
                                boton = boton[0];
                                if (boton != null) {
                                    mensajex[i].setVisible(true);
                                    if (boton['idUsuarioEnvia']!=global_id_usuario) {
                                        mensajex[i].setVisible(false);
                                        }
                                }
                            }
                            break;
                            
                            case 4:
                            win = Ext.ComponentQuery.query('#plnMisMensajes');
                            win = win[0]; 
                            mensajex = win.query('panel[title="Mi Mensaje"]');
                            for ( i = imensajeAnterior; i<imensaje; i++ ) {
                                boton = mensajex[i].query('#btnResponderMensaje');
                                boton = boton[0];
                                if (boton != null) {
                                    mensajex[i].setVisible(true);
                                    if (boton['idUsuarioEnvia']==global_id_usuario) {
                                        mensajex[i].setVisible(false);
                                        } else {
                                            if (boton['contestado']=='1') {
                                                  mensajex[i].setVisible(false);                                        
                                                  }
                                             }
                                }
                            }    
                            break;
                            
                            case 5:
                            win = Ext.ComponentQuery.query('#plnMisMensajes');
                            win = win[0]; 
                            mensajex = win.query('panel[title="Mi Mensaje"]');
                            for ( i = imensajeAnterior; i<imensaje; i++ ) {
                                boton = mensajex[i].query('#btnResponderMensaje');
                                boton = boton[0];
                                if (boton != null) {
                                    mensajex[i].setVisible(true);
                                    if (boton['idUsuarioEnvia']==global_id_usuario) {
                                        mensajex[i].setVisible(false);
                                        } else {
                                            if (boton['contestado']=='0') {
                                                  mensajex[i].setVisible(false);                                        
                                                  }
                                             }
                                }
                            }   
                            break;
                            
                    }
                    
                    if (pagina+1 == paginaFinal) {
                           btnMasMensajes.setText('No hay más mensajes para mostrar.....');
                           btnMasMensajes.setDisabled(true);
                           btnMasMensajes.setTooltip('Fin de los mensajes disponibles');
                    }
                    
                    btnMasMensajes['paginaActual'] = btnMasMensajes['paginaActual'] + 1;
                    
               
             } // Fin de Funcion para cuando el Ajax Request responde correctamente

       //console.log(btnMasMensajes); 
       var pagina = btnMasMensajes['paginaActual'] + 1;
       var paginaFinal = btnMasMensajes['paginaFinal'];
       rowsByPage = btnMasMensajes['rowsByPage'];
       var datos = '{"idUsuario":"' + global_id_usuario + '","rowsByPage":"' + rowsByPage + '","pagina":"' + pagina + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Leer Lista de Mensajes'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'leerListaMensajes',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
       
    }, // ClickBtnMasMensaje de Mis Mensajes
     
//=========================================================================================================================

   // click en el boton Responder Mensaje en Panel de Mensaje
   clickBtnResponderMensaje: function(button) {
       button.setDisabled(true);
       if (button['contestado'] == '0') {
                    // Responder Mensaje
                    var view = Ext.widget('winResponderMensaje');
                    view.show();
                    view.setTitle('Responder Mensaje de: ' + button['nombre']);
                    view.setIdUsuarioDestino(button['idUsuarioEnvia']);
                    view.setIdUsuarioEnvia(global_id_usuario);
                    view.setIdMensaje(button['idMensaje']);
                    view.setIMensaje(button['idItem']);
                    view.setNombre(button['idItem']);
                    var i = button['idItem'];                    
                    var obj1 =  Ext.ComponentQuery.query('#txtMsj05' + i);
                    obj1 = obj1[0];
                    var obj2 =   view.query('#txtMsj');
                    obj2 = obj2[0];
                    var mensajeAResponder =obj1['value'];                    
                    while(mensajeAResponder.indexOf('<br>')!=-1) { mensajeAResponder = mensajeAResponder.replace('<br>','\n'); }
                    obj2.setValue(mensajeAResponder);
         } else {
                        // Leer respuesta a un mensaje ya contestado
                       // Funcion para cuando falla el Ajax Request
                       var failureAjaxFn = function(response, request) {  
                              var errMessage = 'Error en la petición' + request.url + ' '  
                              + ' status ' + response.status + ''  
                              + ' statusText ' + response.statusText + ''  
                              + ' responseText ' + response.responseText + '';  
                              }  // Fin Funcion para cuando falla el Ajax Request

                       // Funcion para cuando el Ajax Request responde correctamente
                       var successAjaxFn = function(response, request) { 
                                var obj = Ext.JSON.decode(response.responseText);
                                var mensaje = unescape(obj.respuesta[1].results[0].Mensaje);
                                var fechaEnvio = obj.respuesta[1].results[0].FechaEnvio;
                                
                                var view = Ext.widget('winVerRespuesta');
                                view.show();
                                view.setIMensaje(button['idItem']);
                                view.setTitle('Mensaje Recibido de: ' + button['nombre'] + 
                                    '<b>&nbsp&nbsp&nbsp&nbsp&nbsp&nbspContestado el:&nbsp</b>' +  fechaEnvio);
                                var obj1 =  view.query('#txtRespuesta');
                                obj1 = obj1[0];
                                while(mensaje.indexOf('<br>')!=-1) { mensaje = mensaje.replace('<br>','\n'); }
                                obj1.setValue(mensaje);
                                
                                var obj2 =   view.query('#txtMsj');
                                obj2 = obj2[0];
                                var i = button['idItem'];
                                obj1 =  Ext.ComponentQuery.query('#txtMsj05' + i);
                                obj1 = obj1[0];
                                mensaje = obj1['value'];
                                while(mensaje.indexOf('<br>')!=-1) { mensaje = mensaje.replace('<br>','\n'); }
                                obj2.setValue(mensaje);
                          } // Fin de Funcion para cuando el Ajax Request responde correctamente

                       
                       var idMensajeRespuesta = button['idRespuesta'];
                       var datos = '{"idMensajeRespuesta":"' + idMensajeRespuesta + '"}'; 
                       Ext.Ajax.request({  
                             url: 'php/RouterDBAJugarFutbol.php',  
                             method: 'POST',  
                             success: successAjaxFn,  
                             failure: failureAjaxFn, 
                             timeout: 30000,  
                             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Leer un Mensaje'},  
                             params: {clasePhp: 'UsuarioDB',
                                      metodo:   'leerMensaje',
                                      datos:    datos}  
                       }) // Fin de la llamada Ajax
             
         } 
            
   }, // clickBtnResponderMensaje
     
//=========================================================================================================================

 // Click en el boton de Eliminar en Panel de Mensaje
   clickBtnEliminarMensaje: function(button) {
       // Funcion para cuando falla el Ajax Request
       button.setDisabled(true);
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var me = button;
       var successAjaxFn = function(response, request) { 
               var obj = Ext.JSON.decode(response.responseText);
               var win = Ext.ComponentQuery.query('#plnMisMensajes');
               win = win[0];
               var i = button['idItem'];
               win.remove('plnMensaje'+i);
               } // Fin de Funcion para cuando el Ajax Request responde correctamente
       
       var idMensaje = button['idMensaje'];
       //console.log(button);
       var datos = '{"idMensaje":"' + idMensaje + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Marcar Mensaje como Eliminado por el Usuario Destino'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'eliminarMensaje',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
   
 }, // Fin de clickBtnEliminarMensaje
 //      
//=========================================================================================================================

   // Crea panel Mensaje
   creaPanelMiMensaje: function(ii, idUsuarioEnvia, nombre, apellidos, correo, fotoFile, idUsuarioDestino,
                                idMensaje, mensaje, fechaEnvio, fechaRespuesta, idRespuesta) {
   
   frmMensaje = [{
                    xtype: 'panel',
                    id: 'plnMensaje',
                    itemId: 'plnMensaje',
                    margin: 10,
                    width: 715,
                    title : 'Mi Mensaje',
                    bodyStyle:'background-color:transparent;border:none;',  
                    layout: {columns: 2,type: 'table'},
                    
                    items: [{xtype: 'fieldset',
                            id: 'plnFieldSet05',
                            itemId: 'plnFieldSet05',
                            width: 710,
                            margin: 5,
                            layout: {columns: 2,type: 'table'},
                            nombreUsuarioEnvia: 'nombre+apellidos',
                            title: 'Mensaje de: ',
                            items: [
                                {
                                    xtype: 'image',
                                    id: 'imgFoto05',
                                    itemId: 'imgFoto05',
                                    height: 53,
                                    width: 50,
                                    src: 'resources/fotosUsuarios/+fotoFile'
                                },
                                {
                                    xtype: 'panel',
                                    id: 'plnInfo05',
                                    itemId: 'plnInfo05',
                                    width: 620,
                                    margin: 5,
                                    items: [
                                         {
                                            xtype     : 'textarea',
                                            bodyStyle:'background-color:transparent;border:none;',    
                                            id        : 'txtMsj05',
                                            itemId    : 'txtMsj05',
                                            name      : 'txtMsj05',
                                            margin    : '10 10 10 10',
                                            grow      : true,
                                            autoScroll : true,
                                            readOnly  : true,
                                            width     : 610
                                        }
                                    ],
                                    beforeLayout: function() {
                                        //if (layoutMisMensajes) {console.log('beforeLayout20 true'); } else {console.log('beforeLayout20 false');}
                                        return layoutMisMensajes; }
                                },
                                {
                                    xtype: 'panel',
                                    height: 30,
                                    width: 250,
                                    layout: {type: 'table'},
                                    bodyStyle: 'border:none;',
                                    margin: 5,
                                    colspan: 2,
                                    items: [
                                        {
                                            xtype: 'button',
                                            height: 22,
                                            id: 'btnResponderMensaje',
                                            itemId: 'btnResponderMensaje',
                                            idItem: 0,
                                            idUsuarioEnvia: 'idUsuarioEnvia',
                                            idUsuarioDestino: 'idUsuarioDestino',
                                            idMensaje: 'idMensaje',
                                            idRespuesta: 'idRespuesta',
                                            fechaEnvio: 'fechaEnvio',
                                            contestado: '0',
                                            style: 'margin-top:5px;margin-left:20px;',
                                            width: 90,
                                            text: 'Responder',
                                            tooltip: 'Responder el Mensaje a su Amigo'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 22,
                                            id: 'btnEliminarMensaje',
                                            itemId: 'btnEliminarMensaje',
                                            idItem: 0,
                                            idUsuarioEnvia: 'idUsuarioEnvia',
                                            idUsuarioDestino: 'idUsuarioDestino',
                                            idMensaje: 'idMensaje',
                                            fechaEnvio: 'fechaEnvio',
                                            style: 'margin-top:5px;margin-left:20px;',
                                            width: 90,
                                            text: 'Eliminar',
                                            tooltip: 'Eliminar el Mensaje'
                                        }
                                    ],
                                    beforeLayout: function() {
                                        //if (layoutMisMensajes) {console.log('beforeLayout2 true'); } else {console.log('beforeLayout2 false');}
                                        return layoutMisMensajes; }
        
                                }       
                            ],
                            beforeLayout: function() {
                                //if (layoutMisMensajes) {console.log('beforeLayout3 true'); } else {console.log('beforeLayout3 false');}
                                return layoutMisMensajes; }
        
                       }
                  ],
                           
                  beforeLayout: function() {
                      //if (layoutMisMensajes) {console.log('beforeLayout4 true'); } else {console.log('beforeLayout4 false');}
                      return layoutMisMensajes; },
                  
                  beforeComponentLayout: function() {
                      //if (layoutMisMensajes) {console.log('beforeComponetLayout4 true'); } else {console.log('beforeComponetLayout4 false');}
                      return layoutMisMensajes; }
                                
                }];
   
   if (fechaRespuesta == null) {
       if (idUsuarioEnvia == global_id_usuario) {
               var titulo = '<b>Mensaje enviado a:&nbsp'+nombre+' '+apellidos+'</b>  el: '+fechaEnvio;
           } else {
                   titulo = '<b>Mensaje recibido de:&nbsp'+nombre+' '+apellidos+'</b>  el: '+fechaEnvio;
                  }
   } else {
       if (idUsuarioEnvia == global_id_usuario) {
                      titulo = '<b>Mensaje enviado a: '+nombre+' '+apellidos+'</b>  el: '+fechaEnvio; 
              } else {
                      titulo = '<b>Mensaje Recibido de: '+nombre+' '+apellidos+'</b>  el: '+fechaEnvio +'<b>&nbsp&nbsp&nbspContestado el:&nbsp</b>' +  fechaRespuesta; 
                     }
          }       
   frmMensaje[0]['id'] = 'plnMensaje'+ii;
   frmMensaje[0]['itemId'] = 'plnMensaje'+ii;
   frmMensaje[0]['items'][0]['id'] = 'plnFieldSet05'+ii;
   frmMensaje[0]['items'][0]['itemId'] = 'plnFieldSet05'+ii;
   frmMensaje[0]['items'][0]['nombreUsuarioEnvia'] = nombre+' '+apellidos;
   frmMensaje[0]['items'][0]['title'] = titulo;
   frmMensaje[0]['items'][0]['items'][0]['id'] = 'imgFoto05'+ii;
   frmMensaje[0]['items'][0]['items'][0]['itemId'] = 'imgFoto05'+ii;
   frmMensaje[0]['items'][0]['items'][0]['src'] = 'resources/fotosUsuarios/'+fotoFile;
   frmMensaje[0]['items'][0]['items'][1]['id'] = 'plnInfo05'+ii;
   frmMensaje[0]['items'][0]['items'][1]['itemId'] = 'plnInfo05'+ii;
   
   frmMensaje[0]['items'][0]['items'][1]['items'][0]['id'] = 'txtMsj05'+ii;
   frmMensaje[0]['items'][0]['items'][1]['items'][0]['itemId'] = 'txtMsj05'+ii;
   frmMensaje[0]['items'][0]['items'][1]['items'][0]['html'] = mensaje;
   frmMensaje[0]['items'][0]['items'][1]['items'][0]['value'] = mensaje;
   frmMensaje[0]['items'][0]['items'][1]['items'][0]['rawValue'] = mensaje;
                       
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['id'] = 'btnResponderMensaje'+ii;
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['itemId'] = 'btnResponderMensaje';
   if (fechaRespuesta == null) {
                                frmMensaje[0]['items'][0]['items'][2]['items'][0]['text'] = 'Responder';
                                frmMensaje[0]['items'][0]['items'][2]['items'][0]['contestado'] = '0';
                                frmMensaje[0]['items'][0]['items'][2]['items'][0]['idRespuesta'] = idRespuesta;
                                frmMensaje[0]['items'][0]['items'][2]['items'][0]['tooltip']= 'Responder el Mensaje a su Amigo';
        } else {            
                frmMensaje[0]['items'][0]['items'][2]['items'][0]['text'] = 'Ver Respuesta';
                frmMensaje[0]['items'][0]['items'][2]['items'][0]['contestado'] = '1';
                frmMensaje[0]['items'][0]['items'][2]['items'][0]['idRespuesta'] = idRespuesta;
                frmMensaje[0]['items'][0]['items'][2]['items'][0]['tooltip']= 'Ver Respuesta enviada a su Amigo';
               }
   if (idUsuarioEnvia == global_id_usuario) {
         frmMensaje[0]['items'][0]['items'][2]['items'][0]['disabled']=true;
         frmMensaje[0]['items'][0]['items'][2]['items'][0]['hidden']=true;
      }
      
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['idMensaje'] = idMensaje;
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['correo'] = correo;
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['nombre'] = nombre+' '+apellidos;
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['idUsuarioEnvia'] = idUsuarioEnvia;    
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['idUsuarioDestino'] = idUsuarioDestino;    
   frmMensaje[0]['items'][0]['items'][2]['items'][0]['idItem'] = ii;    
   
   frmMensaje[0]['items'][0]['items'][2]['items'][1]['text'] = 'Eliminar';
   frmMensaje[0]['items'][0]['items'][2]['items'][1]['id'] = 'btnEliminarMensaje'+ii;
   frmMensaje[0]['items'][0]['items'][2]['items'][1]['itemId'] = 'btnEliminarMensaje';
   frmMensaje[0]['items'][0]['items'][2]['items'][1]['idItem'] = ii;
   frmMensaje[0]['items'][0]['items'][2]['items'][1]['idMensaje'] = idMensaje;
   return frmMensaje[0];
   
   }, // Crea panel de Mensaje
    
//=========================================================================================================================

clickBtnResponderMsj: function (button) {

       var win = Ext.ComponentQuery.query('#winResponderMensaje');
       win = win[0];
        
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) { 
               var obj = Ext.JSON.decode(response.responseText);
               if (obj.respuesta[0].mensaje.codigoError != '0000') {
                   Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Error Interno: No se pudo enviar el mensaje!. Intente luego.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
               } 
               var iMensaje = win.getIMensaje();
               var panelMsj = Ext.ComponentQuery.query('#plnFieldSet05'+iMensaje);
               panelMsj = panelMsj[0];
               var nombreUsuarioEnvia = panelMsj['nombreUsuarioEnvia']; 
               panelMsj.setTitle('<b>Mensaje de: ' + nombreUsuarioEnvia + '<b>&nbsp&nbsp&nbsp&nbsp&nbspContestado Hoy&nbsp</b>');
               var botonResponder = panelMsj.query('#btnResponderMensaje');
               botonResponder = botonResponder[0];
               // console.log(botonResponder);
               botonResponder.setText('Ver Respuesta');
               botonResponder['contestado'] = '1';
               botonResponder['idRespuesta']=obj.respuesta[0].mensaje.idMensajeRespuesta;
               win = win.close();
           } // Fin de Funcion para cuando el Ajax Request responde correctamente
     
     
       var objx = win.query('#txtRespuesta');
       objx = objx[0]; 
       var idUsuarioEnvia    = win.getIdUsuarioEnvia();
       var idUsuarioDestino  = win.getIdUsuarioDestino();
       var idMensajeAnterior = win.getIdMensaje();
       var mensaje = escape(objx.getValue());
       var datos = '{"idUsuarioEnvia":"' + idUsuarioEnvia +
                    '","idMensajeAnterior":"' + idMensajeAnterior +
                    '","idUsuarioDestino":"' + idUsuarioDestino +
                    '","mensaje":"' + mensaje + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Responder un Mensaje a un Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'responderMensajeUsuario',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
   
 }  // Fin de clickBtnResponderMsj

//=====================================================================================================================================

});
