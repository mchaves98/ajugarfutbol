Ext.define('AJugarFutbol.controller.usuario.Usuarios', {
    extend: 'Ext.app.Controller',

    views: ['usuario.Login', 'usuario.Registrarse', 'usuario.OlvidoPws', 'usuario.EditarPerfil'],

    stores: [],

    models: [],
    
    
    init: function() {
         //console.log('Inicializando Controlador Usuarios');
        this.control({ 
            
            // Eventos de la Pantalla de Login 
            'winLogin button[id=btnIngresar]':             {click: this.ingresar},
	    'winLogin button[id=btnRegistrarse]':          {click: this.registrarse},
            'winLogin button[id=btnOlvidoContrasena]':     {click: this.olvidoPws},
            'winLogin textfield[id=txtContrasena]':        {keyup: this.enterLogin},
            'winLogin panel[id=plnPrincipal]':             {render: this.renderLogin},
            'winLogin' :                                   {hide: this.hideWindow, close: this.closeLogin},
           
            // Eventos de la Pantalla de Registrarse
            'winRegistrarse button[id=btnRegistrarse01]': {click: this.registrarseGrabar},
            'winRegistrarse panel[id=plnPrincipal01]':    {render: this.renderRegistrarse},
            'winRegistrarse' :                            {hide: this.hideWindow, close: this.closeRegistrarse},
            
            // Eventos de la Pantalla de Olvido Clave 
	    'winOlvidoPws button[id=btnEnviar]':        {click: this.enviarPws},
            'winOlvidoPws panel[id=plnPrincipal03]':    {render: this.renderOlvidoPws},
            'winOlvidoPws' :                            {hide: this.hideWindow, close: this.closeOlvidoPws},
            
            // Eventos de la Pantalla de Editar Perfil
            'winEditarPerfil button[id=btnAplicarCambios]':        {click: this.EditarPerfil},
            'winEditarPerfil button[id=btnAplicarCambios2]':       {click: this.EditarPerfil},
            'winEditarPerfil combobox[id=cmbProvincia]':           {select: this.EditarPerfilSeleccionoProvincia},
            'winEditarPerfil combobox[id=cmbCanton]':              {select: this.EditarPerfilSeleccionoCanton},
            'winEditarPerfil fileuploadfield[id=fileFotoUsuario]': {change: this.changeSeleccionoFileFoto},
            'winEditarPerfil panel[id=tabPrincipal]':              {render: this.consultaEditarPerfil}
           
        });
        
    },
    
    
    
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
    EditarPerfil: function() {
        // console.log('Click en boton editar perfil ');
        //alert('Hola mundo');
        var win = Ext.ComponentQuery.query('#winEditarPerfil');
        win = win[0]; 
        
        var obj = win.query('#txtCorreo01');
        obj = obj[0]; 
        var correo = obj.getValue();        
        
        obj = win.query('#txtCedula');
        obj = obj[0]; 
        var cedula = obj.getValue();
        
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
        if(fechaNacimiento!=null)
        {
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
        //console.log(obj);
        obj.src = 'resources/fotoUsuarios/foto32.png';
        

        // Valida Datos en Blanco 
        if (cedula==''||correo=='' || nombre==''  || apellido=='' ||
            provincia==null || canton==null || distrito==null ||
            apodo=='' || telefono==''||fechaNacimiento==null) {
               // Datos estan en blanco
               Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Faltan Datos!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
               return;}
         
        //Valida contrase�as
        if (contrasenaActual!=''&&(contrasenaActual == contrasena)) {
              Ext.MessageBox.show({
                 title: 'Error',
                 msg: 'Contraseña actual debe ser diferente a la nueva contraseña',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});
              return;                         
            }
            
        //Valida contrase�as
        if (contrasena != ''&&(contrasena!=confirmarContrasena)) {
              Ext.MessageBox.show({
                 title: 'Error',
                 msg: 'Debe confirmar la contraseña correctamente!',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});
              return;                         
            }
           
         // Datos correctos 
         // 
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
                     
         if (obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                      title: 'Error',
                      msg: 'Contraseña Actual Invalida!',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}

             // Todo correcto el Usuario fue ingresado en la Base de Datos.
             new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>Usted ha actualizado satisfactoriamente los datos de su Perfil!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document); 
             win.close();

            var panelCentral = Ext.ComponentQuery.query('#panel_central');
            panelCentral =  panelCentral[0];
            var view = Ext.widget('home');
            panelCentral.removeAll();
            panelCentral.add([view]);
            panelCentral.doLayout(); 
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente
       
          var datos = '{"idUsuario":"' + global_id_usuario + '",';         
          datos += '"contrasenaActual":"' + contrasenaActual + '",';
          datos += '"contrasena":"' + contrasena + '",';           
          datos += '"nombre":"' + nombre + '",';
          datos += '"apellido":"' + apellido + '",';
          datos += '"apodo":"' + apodo + '",';
          datos += '"cedula":"' + cedula + '",';
          datos += '"fechaNacimiento":"' + fechaNacimiento + '",';
          datos += '"telefono":"' + telefono + '",';
          datos += '"genero":"' + genero + '",';
          datos += '"provincia":"' + provincia + '",';
          datos += '"canton":"' + canton + '",';         
          datos += '"distrito":"' + distrito + '"}';
          //console.log('datos Ajax : '+datos);

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
        
        var view = Ext.widget('winRegistrarse');
        view.show();

    }, // Fin de Click en Boton registrarse en Pantalla de Login

//==========================================================================================================================
     
    // Click en Boton Olvido Clave en Pantalla de Login
    olvidoPws: function() {
        var win = Ext.ComponentQuery.query('#winLogin');
        win = win[0]; 
        win.hide();
        
        var view = Ext.widget('winOlvidoPws');
        view.show();
        
    }, // Fin de Click en Boton olvidoPws en Pantalla de Login


//==========================================================================================================================

    // Render de la Pantalla de Editar el Perfil
    consultaEditarPerfil: function() {
       
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
             // console.log (' Response del Ajax Request: ' + response.responseText);
            
              var obj = Ext.JSON.decode(response.responseText); 

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
               
               objx = win.query('#cmbProvincia');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].CodProv);
               
               objx = win.query('#cmbCanton');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].CodCanton);
               
               objx = win.query('#cmbDistrito');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].CodDist);
               
               objx = win.query('#dateFechaNacimiento');
               objx = objx[0]; 
               objx.setValue(obj.respuesta[1].results[0].FechaNacimiento);
               
               objx = win.query('#rbdFemenino');
               objx = objx[0]; 
               if(obj.respuesta[1].results[0].Genero=='F'){objx.setValue(true);}  
               
               objx = win.query('#imagenFoto');
               objx = objx[0]; 
               //console.log(objx);
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
        
        var win = Ext.ComponentQuery.query('#winLogin');
        win = win[0]; 
        
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
                     title: 'Error',
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
              // console.log (errMessage);  
              }  // Fin Funcion para cuando falla el Ajax Request


       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             
             obj = Ext.JSON.decode(response.responseText); 

             if (obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Correo no Registrado!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
                 
             if (obj.respuesta[0].mensaje.codigoError == '0002') {
                 Ext.MessageBox.show({
                      title: 'Error',
                      msg: 'Contrasena Invalida!',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}
             
             if (obj.respuesta[0].mensaje.codigoError == '0003') {
                 Ext.MessageBox.show({
                      title: 'Error',
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
           cantidadInstalaciones = obj.respuesta[0].mensaje.cantidadInstalaciones;
           instalacionFavoritas.removeAll();
           for (i=0; i<cantidadInstalaciones; i++) {
                    // console.log(obj.respuesta[1].results[1][i].id,obj.respuesta[1].results[1][i].NombreInst);
                    instalacionFavoritas.add({id:obj.respuesta[1].results[1][i].id, nombre:obj.respuesta[1].results[1][i].NombreInst});
                } // Fin del FOR
 

           if (global_tipo_usuario == 'A') {
                // Es un Administrador de Instalaciones
                objx =  Ext.ComponentQuery.query('#lblAdministracion');
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
                //console.log(objx);
                } else 
                    {
                    // NO es un Administrador de Instalaciones
                    objx =  Ext.ComponentQuery.query('#lblAdministracion');
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
                    //console.log(objx);
                }

           var objx = Ext.ComponentQuery.query('#btnIngresarPrincipal');
           objx = objx[0];           
           objx.setText('<b>'+global_nombre_usuario+'</b>');
           objx.setIcon('resources/imagenes/user.png');
           objx.setTooltip('Modificar los datos de mi perfil');                                  

           objx = Ext.ComponentQuery.query('#btnRegistrarsePrincipal');           
           objx = objx[0];
           objx.setIcon('resources/imagenes/salir.png');
           objx.setText('Salir');
           objx.setTooltip('Cerrar la sesi&oacute;n');  
           
           objx = Ext.ComponentQuery.query('#imagenFotoPrincipal');
           objx = objx[0]; 
           objx.setSrc('resources/fotosUsuarios/'+global_usuario_foto);
           objx.setVisible(true);
         
           objx = Ext.ComponentQuery.query('#cmbReservaYA');
           objx = objx[0]; 
           objx.setValue(null);
 
           objx = Ext.ComponentQuery.query('#btnOlvideContrasenaPrincipal');
           objx = objx[0]; 
           objx.setIcon('resources/imagenes/carta.png');
           objx.setText('Mensajes de tus Amigos');
           objx.setTooltip('Leer y contestar mensajes de tus Amigos');  
           
           new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>Bienvenido: '+ global_nombre_usuario +', Usted ha ingresado satisfactoriamente a este sitio web!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  5000}).show(document); 
               
           win.hide();  
             
           var panelCentral = Ext.ComponentQuery.query('#panel_central');
           panelCentral =  panelCentral[0];
           var view = Ext.widget('home');
           panelCentral.removeAll();
           panelCentral.add([view]);
           panelCentral.doLayout();                             

       } // Find de Funcion para cuando el Ajax Request responde correctamente


       var datos = '{"correo":"' + correo + '","contrasena":"' + contrasena + '","chkNoCerrarSesion":"' + chkNoCerrarSesion + '"}'; 
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
        
    // Tecla Enter en el campo contrase�a de la ventana Login
    enterLogin: function(a,e,y) {
        // console.log('Pulse Tecla: '+e.keyCode);
        
        if(e.keyCode==13)
        {            
            var button;
            this.ingresar(button);                      
        }
        
    }, // Fin de Tecla Enter en el campo contrase�a de la ventana Login
        
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
 
    // Click en Boton registrarse en Pantalla de Registrarse
    registrarseGrabar: function() {
        // console.log('Click en el botón registrarse en la vista de registrarse'); 

        var win = Ext.ComponentQuery.query('#winRegistrarse');
        win = win[0]; 
        
        var obj = win.query('#txtCorreo02');
        obj = obj[0]; 
        var correo = obj.getValue();
        
        obj = win.query('#txtNuevaContrasena');
        obj = obj[0]; 
        var contrasena = obj.getValue();
        
        obj = win.query('#txtConfirmarContrasena');
        obj = obj[0]; 
        var confirmarContrasena = obj.getValue();
        
        obj = win.query('#txtNombre');
        obj = obj[0]; 
        var nombre = obj.getValue();
        
        obj = win.query('#txtApellidos');
        obj = obj[0]; 
        var apellido = obj.getValue();
        
        obj = win.query('#txtTelefono');
        obj = obj[0]; 
        var telefono = obj.getValue();
        
        obj = win.query('#rdbMasculino');
        obj = obj[0];
        var genero = 'X';
        if(obj.getValue()) { genero = 'M';} else {genero = 'F';}
        
        // Valida Datos en Blanco 
        if (correo=='' || contrasena=='' || confirmarContrasena=='' || 
            nombre==''  || apellido=='' || telefono=='') {
               // Datos estan en blanco
               Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Faltan Datos!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
               return;}
           
        // Valida confirmacion de Contrasenas  
        if (contrasena != confirmarContrasena) {
              Ext.MessageBox.show({
                 title: 'Error',
                 msg: 'Debe confirmar la contrasena correctamente!',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});
              return;
                         
            }
                
       // Datos correctos 
        
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

             obj = Ext.JSON.decode(response.responseText); 

             // console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);

             if (obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Correo ya Existe!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
                 
             if (obj.respuesta[0].mensaje.codigoError == '0002' || obj.respuesta[0].mensaje.codigoError == '0003' ) {
                 Ext.MessageBox.show({
                      title: 'Error',
                      msg: 'ERROR INTERNO DEL SITIO. FAVOR INTENTE MAS TARDE! '+ obj.respuesta[0].mensaje.codigoError,
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}

             // Todo correcto el Usuario fue inmgresado en la Base de Datos.

            // console.log('Usuario pudo Ingresa');
            // console.log(obj.respuesta[1].results[0].Nombre);  
            Ext.MessageBox.alert({
                title: 'Bienvenido',
                msg: 'Usted se ha registrado correctamente en AJugarFutbol.Com.\n\Revise su correo electronico y proceda a activar su cuenta.  Muchas Gracias',                                 buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO,
                fn: function(btn, text){win.hide()}
            });

            var viewPort = Ext.ComponentQuery.query('#viewport');
            viewPort =  viewPort[0];
            var panelCentral = viewPort.query('#panel_central');
               panelCentral =  panelCentral[0];
               panelCentral.removeAll();
               var view = Ext.widget('home');        
               panelCentral.add([view]);
               panelCentral.doLayout();                           
      } // Find de Funcion para cuando el Ajax Request responde correctamente


      var datos = '{"correo":"' + correo + '",';
      datos += '"contrasena":"' + contrasena + '",';
      datos += '"nombre":"' + nombre + '",';
      datos += '"apellido":"' + apellido + '",';
      datos += '"telefono":"' + telefono + '",';
      datos += '"genero":"' + genero + '"}';

      //console.log('datos Ajax : '+datos);
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Registrar Usuario'},  
          params: {clasePhp: 'UsuarioDB',
                   metodo:   'registrarUsuario',
                   datos:    datos}  
          }); // Fin de la llamada Ajax
            
           
    }, // Fin de Click en Boton registrarse en Pantalla de Registrarse
//=========================================================================================================================

       // Selecciono una Provincia en Pantalla de Editar Perfil
    EditarPerfilSeleccionoProvincia: function(combobox, record) {
        var prov = record[0];
        prov = prov.data;
        var provNombre = prov.DesLarga;
        var provCodProv = prov.CodProv;
        var storeCantones = this.getStore('ubicacion.Cantones');
        var win = Ext.ComponentQuery.query('#winEditarPerfil');
        win = win[0]; 
        var obj = win.query('#cmbCanton');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        obj = win.query('#cmbDistrito');
        obj = obj[0];
        obj.clearValue();
        storeCantones.clearFilter(true);
        storeCantones.filter('CodProv',provCodProv);
        //console.log('Seleciono la Provincia: ' + provNombre + ' ' + provCodProv + ' ' + prov.id + ' en la vista de Editar Perfil');
        
    }, // Fin de Selecciono una Provincia en Pantalla de Editar Perfil
//========================================================================================================================
    
    // Selecciono un Canton en Pantalla de Editar Perfil
    EditarPerfilSeleccionoCanton: function(combobox, record) {
        var canton = record[0];
        canton = canton.data;
        var cantonNombre = canton.DesLarga;
        var cantonCodProv = canton.CodProv;
        var cantonCodCanton = canton.CodCanton;
        var storeDistritos = this.getStore('ubicacion.Distritos');
        var win = Ext.ComponentQuery.query('#winEditarPerfil');
        win = win[0]; 
        var obj = win.query('#cmbDistrito');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        storeDistritos.clearFilter(true);
        storeDistritos.filter('CodProv',cantonCodProv);
        storeDistritos.filter('CodCanton',cantonCodCanton);
        
    }, // Fin de Selecciono un Canton en Editar Perfil

//=========================================================================================================================    


    // Render de la Pantalla de Registrarse
    renderRegistrarse: function(panel) {
        // console.log('Render de Registrarse');
        var win = Ext.ComponentQuery.query('#winRegistrarse'); 
        win = win[0];
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                  var mitadPantalla=pantalla/2;
                  var puntoInicioX=mitadPantalla-(anchoWin/2);
                  win.setPosition(puntoInicioX,100);
                  }
        desplazamientoScrolls = getScrollXY();
        window.scrollTo(0,0);
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
     }, // Fin de Render de la Pantalla de Registrarse

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

    // Se cerro la Pantalla de Registrarse
    closeRegistrarse: function() {
       //console.log('Se cerro la vista registrarse');
       document.getElementsByTagName("html")[0].style.overflow = "auto";
       //window.scrollTo(desplazamientoScrolls[0],desplazamientoScrolls[1]);
    }, // Fin de Se cerro la Pantalla de Registrarse


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
                     title: 'Error',
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
              // console.log (errMessage);  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);

             obj = Ext.JSON.decode(response.responseText); 

             //console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);

             if (obj.respuesta[0].mensaje.codigoError == '0001') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Correo no existe!',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}
                 
             if (obj.respuesta[0].mensaje.codigoError == '0002') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Esta cuenta no ha sido activada! Revise su correo.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                 return;}    
                 
             if (obj.respuesta[0].mensaje.codigoError == '0003' || obj.respuesta[0].mensaje.codigoError == '0004' ) {
                 Ext.MessageBox.show({
                      title: 'Error',
                      msg: 'ERROR INTERNO DEL SITIO. FAVOR INTENTE MAS TARDE!',
                      buttons: Ext.MessageBox.OK,
                      icon: Ext.MessageBox.ERROR});
                 return;}

             // Datos Correctos.

            // console.log('Usuario pudo Ingresa');
            // console.log(obj.respuesta[1].results[0].Nombre); 
            
            Ext.MessageBox.alert({
                title: 'Recuperar contraseña',
                msg: 'Favor revise su correo, se le ha enviado un correo con su contraseña.',                                 buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO,
                fn: function(btn, text){win.hide()}
                });
                
            var panelCentral = Ext.ComponentQuery.query('#panel_central');
            panelCentral =  panelCentral[0];
            var view = Ext.widget('home');
            panelCentral.removeAll();
            panelCentral.add([view]);
            panelCentral.doLayout();  

      } // Fin de Funcion para cuando el Ajax Request responde correctamente

      datos = '{"correo":"' + correo + '"}';
      //console.log('datos Ajax : '+datos);
      
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
    
    
    } // Fin de Click en Boton enviar en Pantalla de Olvido Clave

});
