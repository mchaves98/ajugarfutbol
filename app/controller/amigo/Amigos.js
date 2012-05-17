Ext.define('AJugarFutbol.controller.amigo.Amigos', {
    extend: 'Ext.app.Controller',

    views: ['amigo.InvitarAmigos', 'amigo.AceptarInvitaciones', 'amigo.MisAmigos','amigo.EnviarMensaje'],

    stores: [],

    models: [],
    
    
    init: function() {
         //console.log('Inicializando Controlador Amigos');
        this.control({ 
             // Eventos de la Pantalla de Aceptar Invitaciones
            'winAceptarInvitaciones panel[id=plnInvitaciones]':  {render: this.renderAceptarInvitaciones},
            'winAceptarInvitaciones button[itemId=btnAceptar]':  {click: this.clickBtnAceptarInvitacion},
            'winAceptarInvitaciones button[itemId=btnDenegar]':  {click: this.clickBtnDenegarInvitacion},

            // Eventos de la Pantalla de Mis Amigos
            'winMisAmigos panel[id=plnMisAmigos]':           {render: this.renderMisAmigos},
            'winMisAmigos button[itemId=btnEnviarMensaje]':  {click: this.clickBtnEnviarMensajeAmigo},
            'winMisAmigos button[itemId=btnEliminarAmigo]':  {click: this.clickBtnEliminarAmigo},

             // Eventos de la Pantalla de EnviarMensaje (Amigos)
            'winEnviarMensaje button[itemId=btnEnviarMsj]':            {click: this.clickBtnEnviarMsj},
            'winEnviarMensaje panel[id=plnPrincipalMsj]':              {render: this.renderEnviarMensaje},
            'winEnviarMensaje' :                                       {hide: this.hideWindow,
                                                                        close: this.closewinEnviarMensaje,
                                                                        destroy: this.closewinEnviarMensaje},

            // Eventos de la Pantalla de Invitar Amigos
            'winInvitarAmigos button[id=btnAgregar]': {click: this.invitarAgregarAmigo},
            'winInvitarAmigos button[id=btnEnviar]':  {click: this.invitarAmigosEnviar}
            
        });
        
    },
    
//=====================================================================================================================================

    // Render de la Pantalla de EnviarMensaje
    renderEnviarMensaje: function() {
        var win = Ext.ComponentQuery.query('#winEnviarMensaje'); 
        win = win[0];
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                  var mitadPantalla=pantalla/2;
                  var puntoInicioX=mitadPantalla-(anchoWin/2);
                  win.setPosition(puntoInicioX);
                  }
        var panelPapa = Ext.ComponentQuery.query('#viewport');
        panelPapa = panelPapa[0];
        panelPapa.getEl().mask();
    }, // Fin de Render de la Pantalla de EnviarMensaje
  
//=====================================================================================================================================

    // Se cerro la Pantalla de Enviar Mensaje
    closewinEnviarMensaje: function() {
       //document.getElementsByTagName("html")[0].style.overflow = "auto";
       //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
    }, // Fin de Se cerro la Pantalla de Enviar Mensaje

//=====================================================================================================================================    
    
     // Se cerro un windows modal
    hideWindow: function(win) {
        //console.log('Hide Window');
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
        win.destroy();
               
    },    // Fin de Se cerro la Pantalla de Olvido Clave
    
//========================================================================================================================    

    // Click en Boton Enviar en la Pantalla de Enviar Amigos
    invitarAmigosEnviar: function() {
        
        if (global_id_usuario == '' ) {
             Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Debe Ingresar antes de enviar una invitacion!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
       
        var win = Ext.ComponentQuery.query('#plnAmigos');
        win = win[0]; 
        //console.log(win);
        //console.log(global_contador);
       
        var ind_error = 0;
        var contador = 0;
        var datos = '';
        for (var i=0; i<=4; i++) { 
                
                var obj = win.query('#txtCorreo'+i);
                obj = obj[0];
                if (obj == null) {continue;}
                var correo = obj.getValue();

                obj = win.query('#txtNombreAmigo'+i);
                obj = obj[0]; 
                var nombreAmigo = obj.getValue();

                // Valida Datos en Blanco 
                 if (correo=='' && nombreAmigo =='') {
                       // Linea en Blanco no se Procesa
                       continue;}

                // Valida Datos en Blanco 
                if (correo=='' || nombreAmigo =='') {
                       // Linea con Datos incompletos se envia mensaje y se continua con la proxima linea
                       ind_error = 1;
                       continue;}
                
                if(i !== 0) {datos += ',';}
                datos +=  '{"correo":"' + correo + '",'
                datos += '"nombreAmigo":"' + nombreAmigo + '"}';
                
                contador = contador +1;
                                
        } // Fin del For
        
        if (ind_error == 1) {
            // Linea con Datos incompletos se envia mensaje y se continua con la proxima linea
           Ext.MessageBox.show({
                 title: 'Error',
                 msg: 'Existen una o varias lineas con datos imcompletos, falta el correo de su Amigo o su Nombre!',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});
           return;}

        // Datos correctos 
        datos = '{"invitados":[{"id":"' + global_id_usuario + '","cantInvitados":"'+contador+'","datos":['+datos+']}]}'
        //console.log(datos);
        
        // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);

             obj = Ext.JSON.decode(response.responseText); 

             if (obj.respuesta[0].mensaje.codigoError == '0000' ||
                 obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                     title: 'Mensaje',
                     msg: 'Invitaciones se enviaron satisfactoriamente!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.INFO});
                     }

             if (obj.respuesta[0].mensaje.codigoError == '0002' ||
                 obj.respuesta[0].mensaje.codigoError == '0003' ||
                 obj.respuesta[0].mensaje.codigoError == '0004') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'ERROR INTERNO!!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                     }

            var panelCentral = Ext.ComponentQuery.query('#panel_central');
            panelCentral =  panelCentral[0];
            var view = Ext.widget('home');
            panelCentral.removeAll();
            panelCentral.add([view]);
            panelCentral.doLayout();  

       } // Find de Funcion para cuando el Ajax Request responde correctamente

       Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Enviar invitaciones a Amigos'},  
          params: {clasePhp: 'UsuarioDB',
                   metodo:   'invitarAmigos',
                   datos:    datos}  
          }); // Fin de la llamada Ajax

           
    }, // Fin de Click en Boton Enviar en la Pantalla InvitarAmigos
//=========================================================================================================================

// Click en Boton Agregar en la Pantalla de Invitar Amigos
    invitarAgregarAmigo: function() {
        
        if (global_id_usuario == '' ) {
             Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Debe Ingresar antes de enviar una invitacion!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
            
        var win = Ext.ComponentQuery.query('#plnAmigos');
        win = win[0]; 
        global_contador = global_contador + 1;
        i=global_contador;
        if (global_contador <= 4) {
            win.add(
                    {xtype: 'panel',
                            id: 'plnAmigo'+i,
                            itemId: 'plnAmigo'+i,
                            width: 750,
                            height: 52,
                            bodyStyle:'background-color:transparent;border:none;',
                            layout: {columns: 3,type: 'table'},
                            items: [
                                    {xtype: 'textfield',id: 'txtCorreo',itemId: 'txtCorreo'+i,margin: 25,width: 291,fieldLabel: ',<b>Correo</b>',labelPad: -50},
                                    {xtype: 'textfield',id: 'txtNombreAmigo',itemId: 'txtNombreAmigo'+i,margin: 25,width: 170,fieldLabel: '<b>Nombre Amigo</b>',labelPad: -10},
                                     ]});
             
        } else {
            var botonAgregar = win.query('#btnAgregar');
            botonAgregar = botonAgregar[0];
            botonAgregar.setDisabled(true);
        }   
        
        win.doLayout();
     
    }, // Fin de Click en Boton Agregar en la Pantalla InvitarAmigos
//=========================================================================================================================
    
   // Render del Panel de Aceptar Invitaciones
   renderAceptarInvitaciones: function() {

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
               
               var win = Ext.ComponentQuery.query('#plnInvitaciones');
               win = win[0]; 
               
               var cantidadInvitaciones = obj.respuesta[0].mensaje.cantidadInvitaciones;
               if (cantidadInvitaciones == 0) {
                     new Ext.ux.Notification({
                        iconCls: 'error',
                        title:	 '<font size=2 color=red>Información</font>',
                        html:	 '<b>Usted no tiene invitaciones por el momento!</b>',
                        autoDestroy: true,
                        width: 300,
                        hideDelay:  3000}).show(document); 
               } else {
                   for (var i=0;i<=(cantidadInvitaciones-1);i++) {
                       var nombre = obj.respuesta[1].results[i].Nombre;
                       var apellidos = obj.respuesta[1].results[i].Apellidos;
                       var correo = obj.respuesta[1].results[i].EMail;
                       var fotoFile = obj.respuesta[1].results[i].FotoFile;
                       var fechaInvitacion = obj.respuesta[1].results[i].FechaInvitacion;
                       var idInvitacion = obj.respuesta[1].results[i].id;
                       win.add(me.creaPanelAceptarInvitacion(i,nombre,apellidos,correo,fotoFile,fechaInvitacion,idInvitacion));
                   } // Fin del For

               } // Fin del Else
               
             } // Fin de Funcion para cuando el Ajax Request responde correctamente


       datos = '{"correo":"' + global_usuario + '"}'; 
       //console.log('datos Ajax : '+datos);
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Consulta Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'obtenerInvitaciones',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
       
    }, // Fin de Render del Panel de Aceptar Invitaciones

//=========================================================================================================================
    
   // click en el boton Aceptar en la invitacion
   clickBtnAceptarInvitacion: function(button) {
        //console.log('Toco Aceptar: '+button['idItem']);
       
       // Funcion para cuando falla el Ajax Request
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
               me.setText('<b>Aceptada</b>');
               me.setTooltip('Invitación fue aceptada.');
               me.setDisabled(true);
               var panel = me.up('panel');
               var botonDenegar = panel.query('#btnDenegar'); 
               botonDenegar = botonDenegar[0];
               botonDenegar.setDisabled(true);
               botonDenegar.setTooltip('Invitación ya fue aceptada');
               
             } // Fin de Funcion para cuando el Ajax Request responde correctamente

       var i = button['idItem'];
       var correo = button['correo'];
       var idInvitacion = button['idInvitacion'];
       var datos = '{"correoInvitado":"' + global_usuario + 
                    '","correo":"' + correo +
                    '","id":"' + global_id_usuario + 
                    '","idInvitacion":"' + idInvitacion + '"}'; 
       //console.log('datos Ajax : '+datos);
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Consulta Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'aceptarInvitacion',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
             
    }, // Fin de clickBtnAceptarInvitacion
     
//=========================================================================================================================

 // Click en el boton de denegar en la Invitacion
   clickBtnDenegarInvitacion: function(button) {
        //console.log('Toco Denegar: '+button['idItem']);
  
  // Funcion para cuando falla el Ajax Request
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
               me.setText('<b>Denegada</b>');
               me.setTooltip('Invitación fue denegada.');
               me.setDisabled(true);
               var panel = me.up('panel');
               var botonAceptar = panel.query('#btnAceptar'); 
               botonAceptar = botonAceptar[0];
               botonAceptar.setDisabled(true);
               botonAceptar.setTooltip('Invitación ya fue denegada');
               } // Fin de Funcion para cuando el Ajax Request responde correctamente
       
       var idInvitacion = button['idInvitacion'];
       var datos = '{"idInvitacion":"' + idInvitacion + '"}'; 
       //console.log('datos Ajax : '+datos);
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Consulta Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'denegarInvitacion',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
   
 }, // Fin de clickBtnDenegarInvitacion
     
//=========================================================================================================================

   // Crea panel Aceptar una Invitacion
   creaPanelAceptarInvitacion: function(i,nombre,apellidos,correo,fotoFile,fechaInvitacion,idInvitacion) {
   frmInvitacion[0]['id'] = 'plnInvitacion'+i;
   frmInvitacion[0]['itemId'] = 'plnInvitacion'+i;
   frmInvitacion[0]['items'][0]['id'] = 'plnFieldSet'+i;
   frmInvitacion[0]['items'][0]['itemId'] = 'plnFieldSet'+i;
   frmInvitacion[0]['items'][0]['items'][0]['id'] = 'imgFoto'+i;
   frmInvitacion[0]['items'][0]['items'][0]['itemId'] = 'imgFoto'+i;
   frmInvitacion[0]['items'][0]['items'][0]['src'] = 'resources/fotosUsuarios/'+fotoFile;
   frmInvitacion[0]['items'][0]['items'][1]['id'] = 'plnInfo'+i;
   frmInvitacion[0]['items'][0]['items'][1]['itemId'] = 'plnInfo'+i;
   frmInvitacion[0]['items'][0]['items'][1]['items'][0]['id'] = 'lblCorreo'+i;
   frmInvitacion[0]['items'][0]['items'][1]['items'][0]['itemId'] = 'lblCorreo'+i;
   frmInvitacion[0]['items'][0]['items'][1]['items'][0]['value'] = '<b>'+correo+'</b>';
   frmInvitacion[0]['items'][0]['items'][1]['items'][1]['id'] = 'lblNombre'+i;
   frmInvitacion[0]['items'][0]['items'][1]['items'][1]['itemId'] = 'lblNombre'+i;
   frmInvitacion[0]['items'][0]['items'][1]['items'][1]['value'] = '<b>'+nombre+' '+apellidos+'</b>'
   frmInvitacion[0]['items'][0]['items'][2]['items'][0]['id'] = 'btnAceptar'+i;
   frmInvitacion[0]['items'][0]['items'][2]['items'][0]['itemId'] = 'btnAceptar';
   frmInvitacion[0]['items'][0]['items'][2]['items'][0]['correo'] = correo;
   frmInvitacion[0]['items'][0]['items'][2]['items'][0]['idInvitacion'] = idInvitacion;    
   frmInvitacion[0]['items'][0]['items'][2]['items'][0]['idItem'] = i;    
   frmInvitacion[0]['items'][0]['items'][2]['items'][1]['id'] = 'btnDenegar'+i;
   frmInvitacion[0]['items'][0]['items'][2]['items'][1]['itemId'] = 'btnDenegar';
   frmInvitacion[0]['items'][0]['items'][2]['items'][1]['correo'] = correo;
   frmInvitacion[0]['items'][0]['items'][2]['items'][1]['idInvitacion'] = idInvitacion;    
   frmInvitacion[0]['items'][0]['items'][2]['items'][1]['idItem'] = i;    
   //console.log(frmInvitacion);
   return frmInvitacion;
   
   }, // Crea panel Aceptar una Invitacion

//========================================================================================================================    
    
    // Render del Panel de Mis Amigos
   renderMisAmigos: function() {

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
               
               var win = Ext.ComponentQuery.query('#plnMisAmigos');
               win = win[0]; 
               
               var cantidadAmigos = obj.respuesta[0].mensaje.cantidadAmigos;
               if (cantidadAmigos == 0) {
                   Ext.MessageBox.show({
                     title: 'Mensaje',
                     msg: 'Usted no tiene Amigos por el momento.  Revise si tiene invitaciones.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.INFO});
               } else {
                   for (var i=0;i<=(cantidadAmigos-1);i++) {
                       var nombre = obj.respuesta[1].results[i].Nombre;
                       var apellidos = obj.respuesta[1].results[i].Apellidos;
                       var correo = obj.respuesta[1].results[i].EMail;
                       var fotoFile = obj.respuesta[1].results[i].FotoFile;
                       var idAmistad = obj.respuesta[1].results[i].id;
                       var idAmigo = obj.respuesta[1].results[i].IdAmigo;
                       var idInvitacion = obj.respuesta[1].results[i].IdInvitacion;
                       win.add(me.creaPanelMiAmigo(i, idAmigo, nombre, apellidos, correo, fotoFile, idAmistad, idInvitacion));
                   } // Fin del For

               } // Fin del Else
               
             } // Fin de Funcion para cuando el Ajax Request responde correctamente


       var datos = '{"idUsuario":"' + global_id_usuario + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Lista de Amigos de un Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'obtenerListaAmigos',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
       
    }, // Fin de Render del Panel de Mis Amigos

//=========================================================================================================================
    
   // click en el boton Enviar Mensaje en Panel de Amigo
   clickBtnEnviarMensajeAmigo: function(button) {
        // console.log('Toco EnviarMensajeAmigo: '+button['idItem']);
        var view = Ext.widget('winEnviarMensaje');
            view.show();
            view.setTitle('Enviar Mensaje a: ' + button['nombre']);
            view.setIdUsuarioDestino(button['idAmigo']);
            view.setIdUsuarioEnvia(global_id_usuario);
            
   }, // fin clickBtnEnviarMensajeAmigo
     
//=========================================================================================================================

 // Click en el boton de Eliminar en Panel de Amigo
   clickBtnEliminarAmigo: function(button) {
       // Funcion para cuando falla el Ajax Request
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
               var win = Ext.ComponentQuery.query('#plnMisAmigos');
               win = win[0];
               var i = button['idItem'];
               win.remove('plnAmigo'+i);
               //me.setText('<b>Eliminado</b>');
               //me.setTooltip('Amistad fue eliminada');
               //me.setDisabled(true);
               //var panel = me.up('panel');
               //var botonEnviarMsj = panel.query('#btnEnviarMensaje'); 
               //botonEnviarMsj = botonEnviarMsj[0];
               //botonEnviarMsj.setTooltip('Amistad fue eliminada');
               //botonEnviarMsj.setDisabled(true);
               } // Fin de Funcion para cuando el Ajax Request responde correctamente
       
       var idAmigo = button['idAmigo'];
       var idInvitacion = button['idInvitacion'];
       var datos = '{"idAmigo":"' + idAmigo + '","idUsuario":"' + global_id_usuario + '","idInvitacion":"' + idInvitacion + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Eliminar Amigo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'eliminarAmigo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
   
 }, // Fin de clickBtnEliminarAmigo
 //      
//=========================================================================================================================

   // Crea panel Amigo
   creaPanelMiAmigo: function(i, idAmigo, nombre, apellidos, correo, fotoFile, idAmistad, idInvitacion) {
   frmAmigo[0]['id'] = 'plnAmigo'+i;
   frmAmigo[0]['itemId'] = 'plnAmigo'+i;
   frmAmigo[0]['items'][0]['id'] = 'plnFieldSet04'+i;
   frmAmigo[0]['items'][0]['itemId'] = 'plnFieldSet04'+i;
   frmAmigo[0]['items'][0]['items'][0]['id'] = 'imgFoto04'+i;
   frmAmigo[0]['items'][0]['items'][0]['itemId'] = 'imgFoto04'+i;
   frmAmigo[0]['items'][0]['items'][0]['src'] = 'resources/fotosUsuarios/'+fotoFile;
   frmAmigo[0]['items'][0]['items'][1]['id'] = 'plnInfo04'+i;
   frmAmigo[0]['items'][0]['items'][1]['itemId'] = 'plnInfo04'+i;
   frmAmigo[0]['items'][0]['items'][1]['items'][0]['id'] = 'lblCorreo04'+i;
   frmAmigo[0]['items'][0]['items'][1]['items'][0]['itemId'] = 'lblCorreo04'+i;
   frmAmigo[0]['items'][0]['items'][1]['items'][0]['value'] = '<b>'+correo+'</b>';
   frmAmigo[0]['items'][0]['items'][1]['items'][1]['id'] = 'lblNombre04'+i;
   frmAmigo[0]['items'][0]['items'][1]['items'][1]['itemId'] = 'lblNombre04'+i;
   frmAmigo[0]['items'][0]['items'][1]['items'][1]['value'] = '<b>'+nombre+' '+apellidos+'</b>'
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['id'] = 'btnEnviarMensaje'+i;
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['itemId'] = 'btnEnviarMensaje';
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['idAmigo'] = idAmigo;
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['correo'] = correo;
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['nombre'] = nombre+' '+apellidos;
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['idAmistad'] = idAmistad;    
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['idInvitacion'] = idInvitacion;    
   frmAmigo[0]['items'][0]['items'][2]['items'][0]['idItem'] = i;    
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['id'] = 'btnEliminarAmigo'+i;
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['itemId'] = 'btnEliminarAmigo';
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['idAmigo'] = idAmigo;
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['correo'] = correo;
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['nombre'] = nombre+' '+apellidos;
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['idAmistad'] = idAmistad;    
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['idInvitacion'] = idInvitacion;    
   frmAmigo[0]['items'][0]['items'][2]['items'][1]['idItem'] = i;    
   return frmAmigo;
   
   }, // Crea panel de Amigo
    
//=========================================================================================================================

clickBtnEnviarMsj: function (button) {

       var win = Ext.ComponentQuery.query('#winEnviarMensaje');
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
                win = win.close();
           } // Fin de Funcion para cuando el Ajax Request responde correctamente
     
     
       var objx = win.query('#txtMsj');
       objx = objx[0]; 
       var idUsuarioEnvia = win.getIdUsuarioEnvia();
       var idUsuarioDestino = win.getIdUsuarioDestino();
       var mensaje = objx.getValue();
       // console.log(mensaje);
       mensaje = escape(mensaje);
       var datos = '{"idUsuarioEnvia":"' + idUsuarioEnvia + '","idUsuarioDestino":"' + idUsuarioDestino + '","mensaje":"' + mensaje + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Enviar un Mensaje a un Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'enviaMensajeUsuario',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
   
 }  // Fin de clickBtnEnviarMsj

// ========================================================================================================================

});
