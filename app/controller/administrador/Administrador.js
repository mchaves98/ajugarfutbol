Ext.define('AJugarFutbol.controller.administrador.Administrador', {
    extend: 'Ext.app.Controller',

    //views: ['administrador.Login','administrador.OlvidoPws', 'administrador.EditarPerfil'],

    stores: [],

    models: [],
    
    
    init: function() {
        
         //console.log('Inicializando Controlador Usuarios');
        this.control({ 
            
            // Eventos de la Pantalla de Login 
            'winLogin button[id=btnIngresar]':             {click: this.ingresar},
            'winLogin button[id=btnOlvidoContrasena]':     {click: this.olvidoPws},
            'winLogin textfield[id=txtContrasena]':        {keyup: this.enterLogin},
            'winLogin panel[id=plnPrincipal]':             {render: this.renderLogin},
            'winLogin' :                                   {hide: this.hideWindow, close: this.closeLogin},
                    
            // Eventos de la Pantalla de Olvido Clave 
	    'winOlvidoPws button[id=btnEnviar]':        {click: this.enviarPws},
            'winOlvidoPws panel[id=plnPrincipal03]':    {render: this.renderOlvidoPws},
            'winOlvidoPws' :                            {hide: this.hideWindow, close: this.closeOlvidoPws},
            
            // Eventos de la Pantalla de Editar Perfil
            'winEditarPerfil button[id=btnAplicarCambios]':        {click: this.clickBtnAplicarCambiosEditarPerfil},
            'winEditarPerfil button[id=btnAplicarCambios2]':       {click: this.clickBtnAplicarCambiosEditarPerfil},
            'winEditarPerfil combobox[id=cmbProvincia]':           {select: this.EditarPerfilSeleccionoProvincia},
            'winEditarPerfil combobox[id=cmbCanton]':              {select: this.EditarPerfilSeleccionoCanton},
            'winEditarPerfil fileuploadfield[id=fileFotoUsuario]': {change: this.changeSeleccionoFileFoto},
            'winEditarPerfil panel[id=tabPrincipal]':              {render: this.renderEditarPerfil},
            'winEditarPerfil textfield[id=txtCedula]':     {keyup: this.validarCampo},
            'winEditarPerfil textfield[id=txtNombre]':     {keyup: this.validarCampo},
            'winEditarPerfil textfield[id=txtApellido]':   {keyup: this.validarCampo},
            'winEditarPerfil textfield[id=txtApodo]':      {keyup: this.validarCampo},
            'winEditarPerfil textfield[id=txtTelefono]':   {keyup: this.validarCampo}           
           
        });
        
    },

//=========================================================================================================================
 
    // Selecciono File de la Foto a cargar al servidor en la Pantalla de Editar Perfil. 
    changeSeleccionoFileFoto: function() {
        var win = Ext.ComponentQuery.query('#winEditarPerfil');
        win = win[0]; 
        var obj = win.query('#btnCargarFoto');
        obj = obj[0]; 
        obj.setDisabled(false); 
        obj = win.query('#fileFotoUsuario');
        obj = obj[0]; 
        obj.setVisible(false);  
    },
    
//=========================================================================================================================

    // Click en Boton aplicar cambios en la pantalla editar perfil
    clickBtnAplicarCambiosEditarPerfil: function() {
        // console.log('Click en boton editar perfil ');
        var win = Ext.ComponentQuery.query('#winEditarPerfil');
        win = win[0]; 
        
        var elMask = Ext.ComponentQuery.query('#viewport')[0].getEl();
        
        var obj = win.query('#txtCorreo01');
        obj = obj[0]; 
        var correo = obj.getValue();        
        
        obj = win.query('#txtCedula');
        obj = obj[0]; 
        var cedula = obj.getValue();
        
        var cedulaOriginal = win.query('#plnCedula')[0].cedulaOriginal;
        
        obj = win.query('#txtContrasenaActual');
        obj = obj[0]; 
        var contrasenaActual = obj.getValue();
        
        obj = win.query('#txtNuevaContrasena');
        obj = obj[0]; 
        var contrasena = obj.getValue();
       
        obj = win.query('#txtConfirmarContrasena');
        obj = obj[0]; 
        var confirmarContrasena = obj.getValue();
        
        obj = win.query('#txtNombre');
        obj = obj[0]; 
        var nombre = obj.getValue();
        
        obj = win.query('#txtApellido');
        obj = obj[0]; 
        var apellido = obj.getValue();
        
        obj = win.query('#txtApodo');
        obj = obj[0]; 
        var apodo = obj.getValue();
        
        obj = win.query('#txtTelefono');
        obj = obj[0]; 
        var telefono = obj.getValue();
        
        obj = win.query('#dateFechaNacimiento');
        obj = obj[0];      
        var fechaNacimiento = obj.getValue();
        if(fechaNacimiento == '0000-00-00') {fechaNacimiento=null;}
        if(fechaNacimiento!=null){
            var anno=fechaNacimiento.getFullYear();        
            var mes=fechaNacimiento.getMonth()+1;
            var dia=fechaNacimiento.getDate();               
            fechaNacimiento=anno+'-'+mes+'-'+dia; 
            }        

        obj = win.query('#rbdMasculino');
        obj = obj[0];
        var genero = 'X';
        if(obj.getValue()) { genero = 'M';} else {genero = 'F';}
        
        obj = win.query('#cmbProvincia');
        obj = obj[0]; 
        var provincia = obj.getValue();
        
        obj = win.query('#cmbCanton');
        obj = obj[0]; 
        var canton = obj.getValue();
        
        obj = win.query('#cmbDistrito');
        obj = obj[0]; 
        var distrito = obj.getValue();
        
        obj = win.query('#imagenFoto');
        obj = obj[0]; 
        obj.src = 'resources/fotoUsuarios/desconocido.png';
        
            // Valida Datos
            if (cedula.length == 0 || cedula == null) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El N\u00FAmero de C\u00E9dula no puede quedar en blanco.  Este es un dato muy importante para hacer Reservaciones en Linea!!',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return;
               }
            if (nombre.length == 0 || nombre == null) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Nombre no puede quedar en blanco!!',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                   return;
               }
            if (apellido.length == 0 || apellido == null) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Apellido no puede quedar en blanco!!',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                   return;
               }
            if (telefono.length == 0 || telefono == null) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Tel\u00E9fono es un dato muy importante para hacer Reservaciones en Linea. Favor no lo deje en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                   return;
               }
            if (fechaNacimiento == '0000-00-00') {fechaNacimiento = null;}     
            if (fechaNacimiento == null) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Es muy importante que nos indique su Fecha de Nacimiento. Favor no deje este dato en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                   return;
               }
            if (provincia==null || canton==null || distrito==null) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Favor complete los datos de su Direcci\u00F3n.  Este dato es muy importante para anunciar retos y otras facilidades de esta p�gina Web',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                   return;
               }
            if ( telefono.length != 8 ) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Tel\u00E9fono deben tener 8 digitos',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return;
                }
            if ( cedula.length != 9 ) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El N\u00FAmero de C\u00E9dula debe tener m\u00EDnimo 9 digitos',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                 return;
                 }
            if (contrasenaActual != '' && contrasena != '' && confirmarContrasena != '') {
                    if (contrasenaActual == '' &&  (contrasena != '' && confirmarContrasena != '')) {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Para cambiar su contrase\u00F1a debe digitar su contrase\u00F1a actual!!',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;
                        }
                    if (contrasenaActual == contrasena) {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'La nueva contrase\u00F1a debe ser diferente a la contrase\u00F1a actual',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;
                        }
                    if (contrasena != confirmarContrasena) {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Debe confirmar la contrase\u00F1a correctamente',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;
                        }
                    if (contrasena.length < 6) {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'La nueva contrase\u00F1a debe tener al menos seis caracteres!!',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;
                        }
            }

                   
         
          function finMsgError(){
               elMask.unmask();
               }
       
          // Funcion para cuando falla el Ajax Request
          var failureAjaxFn = function(response, request) {  
                var errMessage = 'Error en la petición' + request.url + ' '  
                + ' status ' + response.status + ''  
                + ' statusText ' + response.statusText + ''  
                + ' responseText ' + response.responseText + '';  
                // console.log (errMessage);  
                var panelCentral = Ext.ComponentQuery.query('#panel_central');
                panelCentral =  panelCentral[0];
                view = Ext.create('AJugarFutbol.view.administrador.Home');           
                panelCentral.removeAll();
                panelCentral.add([view]);  
                alert("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
          }  // Fin Funcion para cuando falla el Ajax Request

          // Funcion para cuando el Ajax Request responde correctamente
          var successAjaxFn = function(response, request) {              
                obj = Ext.JSON.decode(response.responseText,true);
                if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    return;
                }
                if (obj.respuesta[0].mensaje.codigoError == '0001') {
                                elMask.mask();
                                Ext.MessageBox.show({
                                    title: 'Atenci\u00F3n',
                                    msg: 'Su contrase\u00F1a Actual es incorrecta. Favor intente de nuevo.',
                                    buttons: Ext.MessageBox.OK,
                                    modal: false,
                                    fn: finMsgError,
                                    icon: Ext.MessageBox.ERROR});
                                return;
                            }
                if (obj.respuesta[0].mensaje.codigoError == '0006') {
                                elMask.mask();
                                Ext.MessageBox.show({
                                    title: 'Atenci\u00F3n',
                                    msg: 'Su N\u00FAmero de C\u00E9dula ya existe en otro Usuario.  Contacte al WebMaster de este sitio: webmaster@ajugarFutbol.com',
                                    buttons: Ext.MessageBox.OK,
                                    modal: false,
                                    fn: finMsgError,
                                    icon: Ext.MessageBox.ERROR});
                                return;}         

                    // Todo correcto el Usuario fue ingresado en la Base de Datos.
                    new Ext.ux.Notification({
                        iconCls: 'Atenci\u00F3n',
                        title:	 '<font size=2 color=red>Informaci\u00F3n</font>',
                        html:	 '<b>Usted ha actualizado satisfactoriamente los datos de su Perfil!</b>',
                        autoDestroy: true,
                        width: 300,
                        hideDelay:  3000}).show(document); 
                    win.close();
                    var panelCentral = Ext.ComponentQuery.query('#panel_central');
                    panelCentral =  panelCentral[0];
                    var view = Ext.create('AJugarFutbol.view.administrador.Home');                    
                    panelCentral.removeAll();
                    panelCentral.add([view]);
                    panelCentral.doLayout(); 
          } // Find de Funcion para cuando el Ajax Request responde correctamente
       
        if(contrasenaActual !== '') {
        var param1 = hex_md5(contrasenaActual);
        var antes = '';
        var despues = '';
        var medio = '';
        var letras = '0123456789abcdef' 
        for (var ii=0; ii<10; ii++) {
            var rn = Math.floor(Math.random()*16);
            antes = antes + letras.substring(rn,rn+1);
            rn = Math.floor(Math.random()*16);
            despues = despues + letras.substring(rn,rn+1);
            rn = Math.floor(Math.random()*16);
            medio = medio + letras.substring(rn,rn+1);
            }
        var parte1 = param1.substring(0, 16);
        var parte2 = param1.substring(16, 32);     
        param1 = antes + parte1 + medio + parte2 + despues;} else {param1 = '';}
    
        if(contrasena !== '') {
            var param2 = hex_md5(contrasena);
            antes = '';
            despues = '';
            medio = '';
            letras = '0123456789abcdef' 
            for (ii=0; ii<10; ii++) {
                rn = Math.floor(Math.random()*16);
                antes = antes + letras.substring(rn,rn+1);
                rn = Math.floor(Math.random()*16);
                despues = despues + letras.substring(rn,rn+1);
                rn = Math.floor(Math.random()*16);
                medio = medio + letras.substring(rn,rn+1);
                }
            parte1 = param2.substring(0, 16);
            parte2 = param2.substring(16, 32);     
            param2 = antes + parte1 + medio + parte2 + despues; } else {param2 = '';}
        
        //xxxxxx=dad3a37aa9d50688b5157698acfd7aee
        
        var token = Ext.util.Cookies.get("Token");
        var datos = '{"idUsuario":"' + global_id_usuario + '",';         
        datos += '"token":"' + token + '",';
        datos += '"param1":"' + param1 + '",';
        datos += '"param2":"' + param2 + '",';           
        datos += '"nombre":"' + nombre + '",';
        datos += '"apellido":"' + apellido + '",';
        datos += '"apodo":"' + apodo + '",';
        datos += '"cedula":"' + cedula + '",';
        datos += '"cedulaOriginal":"' + cedulaOriginal + '",';
        datos += '"fechaNacimiento":"' + fechaNacimiento + '",';
        datos += '"telefono":"' + telefono + '",';
        datos += '"genero":"' + genero + '",';
        datos += '"provincia":"' + provincia + '",';
        datos += '"canton":"' + canton + '",';         
        datos += '"distrito":"' + distrito + '"}';
        Ext.Ajax.request({  
            url: 'php/RouterDBAJugarFutbol.php',  
            method: 'POST',               
            success: successAjaxFn,  
            failure: failureAjaxFn, 
            timeout: 30000,  
            headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Editar Perfil'},  
            params: {clasePhp: 'UsuarioDB',
                    metodo:   'EditarPerfil',
                    datos:    datos}  
            }); // Fin de la llamada Ajax

    }, // Fin de Click en Boton aplicar cambios en la pantalla editar perfil

//==========================================================================================================================

    // Click en Boton registrarse en Pantalla de Login 
    registrarse: function() {
        var win = Ext.ComponentQuery.query('#winLogin');
        win = win[0]; 
        win.hide();
        
        var view = Ext.create('AJugarFutbol.view.usuario.Registrarse');        
        view.show();

    }, // Fin de Click en Boton registrarse en Pantalla de Login

//==========================================================================================================================
     
    // Click en Boton Olvido Clave en Pantalla de Login
    olvidoPws: function() {
        var win = Ext.ComponentQuery.query('#winLogin');
        win = win[0]; 
        win.hide();
        
        var view = Ext.create('AJugarFutbol.view.administrador.OlvidoPws');
        view.show();
        
    }, // Fin de Click en Boton olvidoPws en Pantalla de Login


//==========================================================================================================================

    // Render de la Pantalla de Editar el Perfil
    renderEditarPerfil: function() {

       var este = this;
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + ''; 
              var panelCentral = Ext.ComponentQuery.query('#panel_central');
              panelCentral =  panelCentral[0];
              view = Ext.create('AJugarFutbol.view.administrador.Home');           
              panelCentral.removeAll();
              panelCentral.add([view]); 
              alert("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
              }  // Fin Funcion para cuando falla el Ajax Request


       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
               var obj = Ext.JSON.decode(response.responseText,true);
               if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    return;
               }
               if (obj.respuesta[0].mensaje.codigoError != '0000') {
                 // console.log("Sesion aun no esta abioerta");
                 return;}

               var win = Ext.ComponentQuery.query('#winEditarPerfil');
               win = win[0]; 
               
               var objx = win.query('#txtCorreo01');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].EMail);
               
               objx = win.query('#txtCedula');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].NoCedula);
               
               win.query('#plnCedula')[0].cedulaOriginal=obj.respuesta[1].results[0].NoCedula;
               
               objx = win.query('#txtNombre');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].Nombre); 
               
               objx = win.query('#txtApellido');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].Apellidos); 
               
               objx = win.query('#txtApodo');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].Apodo);
               
               objx = win.query('#txtTelefono');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].TelCelular);
               
               var storeProvincias = este.getStore('ubicacion.Provincias');
               var objy = win.query('#cmbProvincia');
               objy = objy[0];
               objy.clearValue();
               objy.doQuery();
               storeProvincias.clearFilter(true);
               storeProvincias.filter('TipoRegistro','1');
               
               objx = win.query('#cmbProvincia');
               var recordProv   = objx[0];
               objx = objx[0];
               objx.setValue(obj.respuesta[1].results[0].CodProv);
               
               este.EditarPerfilSeleccionoProvincia('',recordProv['lastSelection']);
               objx.collapse();
               
               objx = win.query('#cmbCanton');
               var recordCanton = objx[0];
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].CodCanton);
               este.EditarPerfilSeleccionoCanton('',recordCanton['lastSelection']);
               objx.collapse();
               
               objx = win.query('#cmbDistrito');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].CodDist);
               objx.collapse();
               
               objx = win.query('#dateFechaNacimiento');
               objx = objx[0]; 
               if (obj.respuesta[1].results[0].FechaNacimiento == '0000-00-00') {obj.respuesta[1].results[0].FechaNacimiento=null;}
               objx.setValue(obj.respuesta[1].results[0].FechaNacimiento);
               
               objx = win.query('#rbdFemenino');
               objx = objx[0]; 
               if(obj.respuesta[1].results[0].Genero=='F'){objx.setValue(true);}  
               
               objx = win.query('#imagenFoto');
               objx = objx[0]; 
         
               var fotofile = obj.respuesta[1].results[0].FotoFile;
               if (fotofile !== null) {objx.setSrc('resources/fotosUsuarios/'+fotofile);}
               else {objx.src = objx.setSrc('resources/imagenes/desconocido.jpg');}
            
       } // Find de Funcion para cuando el Ajax Request responde correctamente

       var datos = '{"correo":"' + global_usuario + '"}'; 
       //console.log('datos Ajax : '+datos);
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Consulta Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'getConsultaUno',
                      datos:    datos}  
             }); // Fin de la llamada Ajax
        
    }, // Fin de Click en Boton registrarse en Pantalla de Login
//==========================================================================================================================
   
    // Click en Boton Ingresar en Pantalla de Login
    // Autor: Manuel Chaves
    ingresar: function(button) {
        // console.log('Click en el botón Ingresar en la vista de login:' );
        
        var win = Ext.ComponentQuery.query('#winLogin')[0];
        
        var obj = win.query('#txtCorreo');
        obj = obj[0]; 
        var correo = obj.getValue();
        
        obj = win.query('#txtContrasena');
        obj = obj[0]; 
        var contrasena = obj.getValue();
        
        obj = win.query('#chkNoCerrarSesion');
        obj = obj[0]; 
        var chkNoCerrarSesion = obj.getValue();
        
        if (correo=='' || contrasena=='') {
               // Datos estan en blanco
               Ext.MessageBox.show({
                     title: 'Atenci\u00F3n',
                     msg: 'Faltan Datos!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
               return;}

       // Datos no estan en Blanco 

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
             
             obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;  
             }
             if (obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                     title: 'Atenci\u00F3n',
                     msg: 'Correo Restringido!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
                 
             if (obj.respuesta[0].mensaje.codigoError == '0002') {
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'contrase\u00F1a Invalida!',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}
             
             if (obj.respuesta[0].mensaje.codigoError == '0003') {
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Esta cuenta no ha sido activada! Revise su correo.',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}
             
           // Todo correcto el Usuario puede ingresar.

           global_id_usuario = obj.respuesta[1].results[0][0].id;
           global_usuario = obj.respuesta[1].results[0][0].EMail;
           global_nombre_usuario = obj.respuesta[1].results[0][0].Nombre;
           global_apellidos_usuario = obj.respuesta[1].results[0][0].Apellidos;
           global_tipo_usuario = obj.respuesta[1].results[0][0].TipoUsuario;
           global_usuario_foto = obj.respuesta[1].results[0][0].FotoFile;           

           if (global_tipo_usuario == 'A') {
                // Es un Administrador de Instalaciones
                objx =  Ext.ComponentQuery.query('#btnEditarPerfilVertical');
                objx = objx[0]; 
                objx.setVisible(true);
                objx =  Ext.ComponentQuery.query('#btnClientes');
                objx = objx[0]; 
                objx.setVisible(true);
                objx =  Ext.ComponentQuery.query('#btnAdministracion');
                objx = objx[0]; 
                objx.setVisible(true);
                objx['idInstalacion'] = obj.respuesta[0].mensaje.idInstalacion;
                objx['nombreInstalacion'] = obj.respuesta[0].mensaje.nombreInstalacion;
                objx['direccion'] = obj.respuesta[0].mensaje.direccion;
                objx['encargado'] = obj.respuesta[0].mensaje.encargado;
                objx['correo'] = obj.respuesta[0].mensaje.correo;
                objx['telefono'] = obj.respuesta[0].mensaje.telefono;
                objx['modoReservacion'] = obj.respuesta[0].mensaje.modoReservacion;                
                
                objx =  Ext.ComponentQuery.query('#btnEditarInstalacion');
                objx = objx[0]; 
                objx.setVisible(true);
                
                objx =  Ext.ComponentQuery.query('#btnHome');
                objx = objx[0]; 
                objx.setVisible(true);
                  
                
                } else 
                    {
                    // NO es un Administrador de Instalaciones
                    objx =  Ext.ComponentQuery.query('#btnEditarPerfilVertical');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    objx =  Ext.ComponentQuery.query('#btnClientes');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    objx =  Ext.ComponentQuery.query('#btnAdministracion');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    objx['idInstalacion'] = '';
                    objx['nombreInstalacion'] = '';
                    objx['direccion'] = '';
                    objx['encargado'] = '';
                    objx['correo']= '';
                    objx['telefono']= '';
                    objx['modoReservacion']= '';
                    
                    objx =  Ext.ComponentQuery.query('#btnEditarInstalacion');
                    objx = objx[0]; 
                    objx.setVisible(false);
                    
                    objx =  Ext.ComponentQuery.query('#btnHome');
                    objx = objx[0]; 
                    objx.setVisible(false);
                  
                    
                    Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'ACCESO RESTRINGIDO!',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                  
                   global_id_usuario = '';
                   global_usuario = '';
                   global_nombre_usuario = '';
                   global_apellidos_usuario = '';
                   global_tipo_usuario = '';
                   global_usuario_foto = '';
                 return;
                }

           var objx = Ext.ComponentQuery.query('#btnIngresarPrincipal');
           objx = objx[0];           
           objx.setText('<font color=white><b>'+global_nombre_usuario+'</b></font');
           objx.setIcon('resources/imagenes/perfil.png');
           objx.setTooltip('Modificar los datos de mi perfil');                                   
           
           objx = Ext.ComponentQuery.query('#imagenFotoPrincipal');
           objx = objx[0]; 
           objx.setSrc('resources/fotosUsuarios/'+global_usuario_foto);
           objx.setVisible(true);
 
           objx = Ext.ComponentQuery.query('#btnOlvideContrasenaPrincipal');
           objx = objx[0]; 
           objx.setIcon('resources/imagenes/cerrar.png');
           objx.setText('<font color=white>Cerrar Sesi&oacute;n</font>');
           objx.setTooltip('Cerrar la sesi&oacute;n');
           
           objx = Ext.ComponentQuery.query('#lblMenuHorizontalTitulo');
           objx = objx[0];            
           objx.setValue('<center><div style="font-size:20px;width:865px;"><b>'+obj.respuesta[0].mensaje.nombreInstalacion+'</b></div></center>');
                   
           new Ext.ux.Notification({
                iconCls: 'Atenci\u00F3n',
                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                html:	 '<b>Bienvenido: '+ global_nombre_usuario +', Usted ha ingresado satisfactoriamente a este sitio web!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  5000}).show(document); 
               
           win.hide();  
             
           var panelCentral = Ext.ComponentQuery.query('#panel_central');
           panelCentral =  panelCentral[0];
           var view = Ext.create('AJugarFutbol.view.administrador.Home');         
           panelCentral.removeAll();
           panelCentral.add([view]);                          

       } // Find de Funcion para cuando el Ajax Request responde correctamente


      var param1 = hex_md5(contrasena);
      var antes = '';
      var despues = '';
      var medio = '';
      var letras = '0123456789abcdef' 
      for (var ii=0; ii<10; ii++) {
            var rn = Math.floor(Math.random()*16);
            antes = antes + letras.substring(rn,rn+1);
            rn = Math.floor(Math.random()*16);
            despues = despues + letras.substring(rn,rn+1);
            rn = Math.floor(Math.random()*16);
            medio = medio + letras.substring(rn,rn+1);
            }
       var parte1 = param1.substring(0, 16);
       var parte2 = param1.substring(16, 32);     
       param1 = antes + parte1 + medio + parte2 + despues;    
     
       var datos = '{"correo":"' + correo + 
                    '","param1":"' + param1 +
                    '","chkNoCerrarSesion":"' + chkNoCerrarSesion +
                    '"}'; 
       // console.log('datos Ajax : '+datos);
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Validar Ingreso'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'validarIngreso',
                      datos:    datos}  
             }); // Fin de la llamada Ajax
     },  // Fin Click en Boton Ingresar en Pantalla de Login
//=========================================================================================================================    
        
    // Tecla Enter en el campo contrase\u00F1a de la ventana Login
    enterLogin: function(a,e,y) {
        // console.log('Pulse Tecla: '+e.keyCode);
        
        if(e.keyCode==13)
        {            
            var button;
            this.ingresar(button);                      
        }
        
    }, // Fin de Tecla Enter en el campo contrase\u00F1a de la ventana Login
        
//========================================================================================================================== 
    // Show de la Pantalla de Login
    showLogin: function(win) {
        //console.log('Show de la vista de login');
        var map = new Ext.util.KeyMap(Ext.getBody(), [{
                key: Ext.EventObject.ESC,
                defaultEventAction: 'preventDefault',
                scope: this,
                fn: function(){
                    //console.log(win);
                    win.close();}
        }]);        
        
    }, // Fin de Show de la Pantalla de Login

//========================================================================================================================== 

    // Selecciono una Provincia en Pantalla de Editar Perfil
    EditarPerfilSeleccionoProvincia: function(combobox, record) {
         var win = Ext.ComponentQuery.query('#winEditarPerfil');
         win = win[0]; 
        
        var objx = win.query('#cmbProvincia');
        var valor=objx[0].getValue();
        var editablex=objx[0].isDisabled();
        if(editablex || objx[0]['readOnly'] || valor==null){objx[0].collapse(); return;}      
       
        var prov = record[0];
        prov = prov.data;
        var provNombre = prov.DesLarga;
        var provCodProv = prov.CodProv;
        var storeCantones = this.getStore('ubicacion.Cantones');
        var obj = win.query('#cmbCanton');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        obj = win.query('#cmbDistrito');
        obj = obj[0];
        obj.clearValue();
        storeCantones.clearFilter(true);
        storeCantones.filter('CodProv',provCodProv);
        storeCantones.filter('TipoRegistro','1');
        //console.log('Seleciono la Provincia: ' + provNombre + ' ' + provCodProv + ' ' + prov.id + ' en la vista de Editar Perfil');
        
    }, // Fin de Selecciono una Provincia en Pantalla de Editar Perfil
//========================================================================================================================
    
    // Selecciono un Canton en Pantalla de Editar Perfil
    EditarPerfilSeleccionoCanton: function(combobox, record) {
        var win = Ext.ComponentQuery.query('#winEditarPerfil');
        win = win[0]; 
        
        var objx = win.query('#cmbCanton');
        var valor=objx[0].getValue();
        var editablex=objx[0].isDisabled();
        //console.log(editablex,objx[0]['readOnly'],valor);
        if(editablex || objx[0]['readOnly'] || valor==null){objx[0].collapse(); return;}      
        
        var canton = record[0];
        canton = canton.data;
        var cantonNombre = canton.DesLarga;
        var cantonCodProv = canton.CodProv;
        var cantonCodCanton = canton.CodCanton;
        var storeDistritos = this.getStore('ubicacion.Distritos');
        var obj = win.query('#cmbDistrito');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        storeDistritos.clearFilter(true);
        storeDistritos.filter('CodProv',cantonCodProv);
        storeDistritos.filter('CodCanton',cantonCodCanton);
        storeDistritos.filter('TipoRegistro','1');
        window.scrollTo(0,0);          
        
    }, // Fin de Selecciono un Canton en Editar Perfil

//====================================================================================================================================
     
    // Render de la Pantalla de Login
    renderLogin: function() {
        // console.log('Render de Login');
        var win = Ext.ComponentQuery.query('#winLogin'); 
        win = win[0];
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                  var mitadPantalla=pantalla/2;
                  var puntoInicioX=mitadPantalla-(anchoWin/2);
                  win.setPosition(puntoInicioX,200);
                  }
        desplazamientoScrolls = getScrollXY();
        window.scrollTo(0,0);
        document.getElementsByTagName("html")[0].style.overflow = "hidden"; 
    }, // Fin de Render de la Pantalla de Login


    // Render de la Pantalla de OlvidoPws
    renderOlvidoPws: function() {
        //console.log('Render de OlvidoPws');
        var win = Ext.ComponentQuery.query('#winOlvidoPws'); 
        win = win[0];
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                  var mitadPantalla=pantalla/2;
                  var puntoInicioX=mitadPantalla-(anchoWin/2);
                  win.setPosition(puntoInicioX,250);
                  }
        desplazamientoScrolls = getScrollXY();
        window.scrollTo(0,0);
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
    }, // Fin de Render de la Pantalla de OlvidoPws
  
//=====================================================================================================================================
    // Se cerro la Pantalla de Login
    closeLogin: function() {
        // console.log('se cerro la vista de login');
       document.getElementsByTagName("html")[0].style.overflow = "auto";
       //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
    }, // Fin de se cerro la Pantalla de Login


    // Se cerro la Pantalla de Olvido Claves
    closeOlvidoPws: function() {
       // console.log('Se cerro la vista OlvidoPws');
       document.getElementsByTagName("html")[0].style.overflow = "auto";
       //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
    },    // Fin de Se cerro la Pantalla de Olvido Clave


//=====================================================================================================================================    
    
     // Se cerro un windows modal
    hideWindow: function(win) {
        //console.log('Hide Window');
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
        win.destroy();
               
    },    // Fin de Se cerro la Pantalla de Olvido Clave

//=========================================================================================================================

    // Click en Boton en Pantalla de Olvido pws
    enviarPws: function() {
    
    // console.log('Click en el botón enviar en la vista de olvidoPws');        
        var win = Ext.ComponentQuery.query('#winOlvidoPws');
        win = win[0]; 
        
        var obj = win.query('#txtCorreo03');
        obj = obj[0]; 
        var correo = obj.getValue();
     
        // Valida Datos en Blanco 
        if (correo=='') {
               // Datos estan en blanco
               Ext.MessageBox.show({
                     title: 'Atenci\u00F3n',
                     msg: 'Debe digitar un correo',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
               return;}
           
        // Datos correctos 
        
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

             obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
             }
             if (obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                     title: 'Atenci\u00F3n',
                     msg: 'Correo no existe!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
                 
             if (obj.respuesta[0].mensaje.codigoError == '0002') {
                 Ext.MessageBox.show({
                     title: 'Atenci\u00F3n',
                     msg: 'Esta cuenta no ha sido activada! Revise su correo.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}    
                 
             if (obj.respuesta[0].mensaje.codigoError == '0003' || obj.respuesta[0].mensaje.codigoError == '0004' ) {
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'ERROR INTERNO DEL SITIO. FAVOR INTENTE MAS TARDE!',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}

             // Datos Correctos.

            Ext.MessageBox.alert({
                title: 'Recuperar contrase\u00F1a',
                msg: 'Favor revise su correo, se le ha enviado un correo con su contrase\u00F1a.',                                 buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO,
                fn: function(btn, text){win.hide()}
                });
                
            var panelCentral = Ext.ComponentQuery.query('#panel_central');
            panelCentral =  panelCentral[0];
            panelCentral.removeAll();

      } // Fin de Funcion para cuando el Ajax Request responde correctamente

      var datos = '{"correo":"' + correo +
                 '","tipoUsuario":"Admin"}';
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Recordar contrasena al Usuario'},  
          params: {clasePhp: 'UsuarioDB',
                   metodo:   'recordarContrasena',
                   datos:    datos}  
          }); // Fin de la llamada Ajax
    
    
    },  // Fin de Click en Boton enviar en Pantalla de Olvido Clave

//=========================================================================================================================================

  validarCampo: function(campo,e) {
       
       if (e.isNavKeyPress())  {return;}
       if (e.isSpecialKey())   {return;}
      
       var caracteresValidos = '';
       
       var largo = campo.largo;
       if (largo == 0 || largo == '' || largo == null) {largo = 20;}
       
       var valorMinimo = campo.valorMinimo;
       if (valorMinimo == null) {valorMinimo = -99999999999999999;}
       
       var valorMaximo = campo.valorMaximo;
       if (valorMaximo == 0 || valorMaximo == '' || valorMaximo == null) {valorMaximo = 99999999999999999;}
       
       if (campo.tipoCampo == 'SoloLetras') {caracteresValidos  = 'áéíóúabcdefghijklmnopqrsuvtxwyzABCDEFGHIJKLMNOPQRSUVTWXYZ'+'\u00D1'+'\u00F1';}
       if (campo.tipoCampo == 'SoloLetrasConPunto-Coma') {caracteresValidos  = 'áéíóúabcdefghijklmnopqrsutvwxyzABCDEFGHIJKLMNOPQRSUTVWXYZ.,;'+'\u00D1'+'\u00F1';}
       if (campo.tipoCampo == 'SoloNumeros') {caracteresValidos  = '0123456789';}
       if (campo.tipoCampo == 'NumerosConPunto-Coma') {caracteresValidos  = '0123456789.,';}
       if (campo.tipoCampo == 'Letras-Numeros') {caracteresValidos  = 'áéíóúabcdefghijklmnopqrsutvwxyzABCDEFGHIJKLMNOPQRSUTVXWYZ0123456789';+'\u00D1'+'\u00F1'}
       if (campo.tipoCampo == 'Letras-NumerosConPunto-Coma') {caracteresValidos  = 'abcdefghijklmnopqrsutvxwyzABCDEFGHIJKLMNOPQRSUTVXWYZ0123456789.,;'+'\u00D1'+'\u00F1';}
       if (campo.tipoCampo == 'EMail') {caracteresValidos  = 'abcdefghijklmnopqrsutvwxyzABCDEFGHIJKLMNOPQRSUTVXWYZ0123456789_-.@';}
       if (campo.tipoCampo == 'Texto') {caracteresValidos  = 'áéíóúabcdefghijklmnopqrsutvxwyzABCDEFGHIJKLMNOPQRSUTVXWYZ0123456789.,;()=+-!?:'+'\u00D1'+'\u00F1';}
       if (campo.aceptaBlancos == 'SI') {caracteresValidos = caracteresValidos + ' ';}
       
       var valorCampo = campo.getRawValue();
       var longitudActualCampo = valorCampo.length;
       var invalido = false;
       var campoCorregido = '';
       for (var i=0; i<longitudActualCampo; i++) {
            var caracter = valorCampo.substring(i,i+1);
            var p = caracteresValidos.indexOf(caracter); 
            if (p == -1) {invalido=true; } else {campoCorregido = campoCorregido + caracter;}
            }
       if  (campoCorregido.length > largo) {invalido=true; }
       if (campo.tipoCampo == 'SoloNumeros' && !invalido) {
                if (campoCorregido < valorMinimo) {campoCorregido = valorMinimo; invalido=true; } 
                if (campoCorregido > valorMaximo) {campoCorregido = valorMaximo; invalido=true; } 
            }
             
       if (invalido) {campo.setRawValue(campoCorregido.substring(0,largo));} 
       
       return;

 }

});
