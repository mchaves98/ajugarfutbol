Ext.define('AJugarFutbol.controller.administrador.EditarInstalacion', {
    extend: 'Ext.app.Controller',

    
    init: function() {         
         //console.log('Inicializando Controlador Clientes');
        this.control({             
            // Eventos de la Pantalla de Grid de Clientes 
            'winEditarInstalacion panel[itemId=formEditaInstalacion]':   {render: this.renderConsultaInstalacion},
            'winEditarInstalacion button[itemId=btnEIAplicarCambios]':   {click: this.editaInstalacion},
            'winEditarInstalacion combobox[itemId=cmbEIProvincia]':           {select: this.EditarPerfilSeleccionoProvincia},
            'winEditarInstalacion combobox[itemId=cmbEICanton]':              {select: this.EditarPerfilSeleccionoCanton},
            'winEditarInstalacion textfield[itemId=txtEITelefono1]':     {keyup: this.validarCampo},
            'winEditarInstalacion textfield[itemId=txtEITelefono2]':     {keyup: this.validarCampo},
            'winEditarInstalacion textfield[itemId=txtEIFax]':     {keyup: this.validarCampo},
            'winEditarInstalacion textfield[itemId=txtEITelefonoEncargado]':     {keyup: this.validarCampo},
            'winEditarInstalacion fileuploadfield[id=fileFotoUsuario]':  {change: this.changeSeleccionoFileFoto}
        });        
    },    
//=====================================================================================================================================    
//    // Selecciono File de la Foto a cargar al servidor en la Pantalla de Editar Perfil. 
    changeSeleccionoFileFoto: function() {
        var win = Ext.ComponentQuery.query('#winEditarInstalacion');
        win = win[0]; 
        var obj = win.query('#btnCargarFoto');
        obj = obj[0]; 
        obj.setDisabled(false); 
        obj = win.query('#fileFotoUsuario');
        obj = obj[0]; 
        obj.setVisible(false);  
    },
        
    // Tecla Enter en el campo filtro por nombre en el Grid de Clientes
    enterFiltroNombre: function(a,e,y) {
      if(e.keyCode==13) {this.clickBtnFiltrarClientes(); }
    }, // Fin de Tecla Enter en el campo contrase?a de la ventana Login    
//Consulta la instalacion
renderConsultaInstalacion: function(button) {
    var este=this;         
    
    var idInstalacion = Ext.ComponentQuery.query('#btnAdministracion');    
    idInstalacion =  idInstalacion[0]['idInstalacion'];           
    var failureAjaxFn = function(response, request) {  
          var errMessage = 'Error en la petición' + request.url + ' '  
          + ' status ' + response.status + ''  
          + ' statusText ' + response.statusText + ''  
          + ' responseText ' + response.responseText + '';  
          // console.log (errMessage);  
           alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
              Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
              Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
                           panelCentral =  panelCentral[0];
                           var view = Ext.create('AJugarFutbol.view.administrador.Home');           
                           panelCentral.removeAll();
                           panelCentral.add([view]); 
          }  // Fin Funcion para cuando falla el Ajax Request

     // Funcion para cuando el Ajax Request responde correctamente
   var successAjaxFn = function(response, request) { 
   var obj = Ext.JSON.decode(response.responseText,true);
   if (obj == null) {
        alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");   
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
                           panelCentral =  panelCentral[0];
                           var view2 = Ext.create('AJugarFutbol.view.administrador.Home');           
                           panelCentral.removeAll();
                           panelCentral.add([view2]); 
        return;
    }
   
   var cantFilas=obj.respuesta[0].mensaje.CantFilas;
   
     if(cantFilas>0){              
        var objx = Ext.ComponentQuery.query('#txtEINombreInstalacion');
        objx =  objx[0];    
        objx.setValue(obj.respuesta[1].results[0].NombreInst);

        objx = Ext.ComponentQuery.query('#txtEITelefono1');
        objx =  objx[0];    
        objx.setValue(obj.respuesta[1].results[0].Telefono1);

        objx = Ext.ComponentQuery.query('#txtEITelefono2');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].Telefono2);

        objx = Ext.ComponentQuery.query('#txtEIFax');
        objx =  objx[0];    
        objx.setValue(obj.respuesta[1].results[0].Fax);

        objx = Ext.ComponentQuery.query('#txtEICorreo');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].EMailInst);

        objx = Ext.ComponentQuery.query('#txtEIPaginaWeb');
        objx =  objx[0];    
        objx.setValue(obj.respuesta[1].results[0].URLPaginaWeb);
        
        objx = Ext.ComponentQuery.query('#imgEILogoInstalacion');
        objx =  objx[0];    
        objx.setSrc('resources/fotosInstalaciones/'+obj.respuesta[1].results[0].FileLogo);
        
        var Horario=obj.respuesta[1].results[0].DescHorario;
        var horaInicio='';
        var horaFinal='';        
        for(var i=0;i<18;i++)
        {            
            if(i<7) 
            {
               horaInicio=horaInicio+Horario.substring(i,i+1);
            }
            else
            {
                if(i>9)
                {
                    horaFinal=horaFinal+Horario.substring(i,i+1);
                }                
            }
        }        
        objx = Ext.ComponentQuery.query('#txtEITime1');
        objx =  objx[0];  
        objx.setValue(horaInicio);

        objx = Ext.ComponentQuery.query('#txtEITime2');
        objx =  objx[0];
        objx.setValue(horaFinal);

        objx = Ext.ComponentQuery.query('#txtEINombreEncargado');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].NombreContacto);

        objx = Ext.ComponentQuery.query('#txtEITelefonoEncargado');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].TelContacto);

        objx = Ext.ComponentQuery.query('#txtEICorreoEncargado');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].EMailContac);

        objx = Ext.ComponentQuery.query('#txtEILatitud');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].UbicGPSLat);

        objx = Ext.ComponentQuery.query('#txtEILongitud');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].UbicGPSLng);
        
           var storeProvincias = Ext.getStore('ubicacion.Provincias');
           var objy = Ext.ComponentQuery.query('#cmbEIProvincia');
           objy = objy[0];
           objy.clearValue();
           objy.doQuery();
           storeProvincias.clearFilter(true);
           storeProvincias.filter('TipoRegistro','1');

           objx = Ext.ComponentQuery.query('#cmbEIProvincia');
           var recordProv   = objx[0];
           objx = objx[0];
           objx.setValue(obj.respuesta[1].results[0].Provincia);

           este.EditarPerfilSeleccionoProvincia('',recordProv['lastSelection']);
           objx.collapse();           

           objx = Ext.ComponentQuery.query('#cmbEICanton');
           var recordCanton = objx[0];
           objx = objx[0]; 
           objx.setValue(obj.respuesta[1].results[0].Canton);
           este.EditarPerfilSeleccionoCanton('',recordCanton['lastSelection']);
           objx.collapse();           

           objx = Ext.ComponentQuery.query('#cmbEIDistrito');
           objx = objx[0]; 
           objx.setValue(obj.respuesta[1].results[0].Distrito);
           objx.collapse();           
        
        
        objx = Ext.ComponentQuery.query('#txtEIOtrasSenas');
        objx =  objx[0];
        objx.setValue(obj.respuesta[1].results[0].Direccion1);
        
        
     }
   }      
   var datos = '{"idInstalacion":"' + idInstalacion+ '"}';  
            
        Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta de las fotos de las instalaciones'},  
             params: {clasePhp: 'InstalacionDB',
                      metodo:   'getInstalacion',
                      datos:    datos}  
         }); // Fin de la llamada Ajax     
 },
//=========================================================================================================================    
//Consulta la instalacion
editaInstalacion: function(button) { 
   var idInstalacion = Ext.ComponentQuery.query('#btnAdministracion');
    idInstalacion =  idInstalacion[0]['idInstalacion'];        
       
   var form = Ext.ComponentQuery.query('#formEditaInstalacion');
   form =  form[0];         
   form=form.getForm();
   form=form.isValid();
   
   if(form==false)
   {
       Ext.MessageBox.show({
             title: 'Atenci&oacute;n',
             msg: 'En el formulario se encuentran errores.',
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.ERROR});
       return;
   }
   
   var telefono1=Ext.ComponentQuery.query('#txtEITelefono1');
   telefono1=telefono1[0];
   telefono1=telefono1.getValue();
   
   var telefono2=Ext.ComponentQuery.query('#txtEITelefono2');
   telefono2=telefono2[0];
   telefono2=telefono2.getValue();
   
   var fax=Ext.ComponentQuery.query('#txtEIFax');
   fax=fax[0];
   fax=fax.getValue();
   
   var telefonoEncargado=Ext.ComponentQuery.query('#txtEITelefonoEncargado');
   telefonoEncargado=telefonoEncargado[0];
   telefonoEncargado=telefonoEncargado.getValue();
   
   var latitud=Ext.ComponentQuery.query('#txtEILatitud');
   latitud=latitud[0];
   latitud=latitud.getValue();
   
   var longitud=Ext.ComponentQuery.query('#txtEILongitud');
   longitud=longitud[0];
   longitud=longitud.getValue();
    
   
   if(isNaN(telefono1)||isNaN(telefono2)||isNaN(fax)||isNaN(telefonoEncargado))
    {
        Ext.MessageBox.show({
             title: 'Atenci&oacute;n',
             msg: 'Los tel&eacute;fonos debe tener 8 d&iacute;gitos y solo se aceptan n&uacute;meros.',
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.ERROR});              
         return;
    }
    
    if(isNaN(latitud)||isNaN(longitud))
    {
        Ext.MessageBox.show({
             title: 'Atenci&oacute;n',
             msg: 'Latitud y Longitud solo se aceptan n&uacute;meros.',
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.ERROR});              
         return;
    }
    
   var primeraHora=Ext.ComponentQuery.query('#txtEITime1');
   primeraHora=primeraHora[0];
   var string1=primeraHora.getRawValue();
   primeraHora=primeraHora.getValue();
   
   var segundaHora=Ext.ComponentQuery.query('#txtEITime2');   
   segundaHora=segundaHora[0];
   var string2=segundaHora.getRawValue();
   segundaHora=segundaHora.getValue();
   
   if(primeraHora>=segundaHora)
   {
       Ext.MessageBox.show({
             title: 'Atenci&oacute;n',
             msg: 'Horario General: Debe ser menor la primera hora.',
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.ERROR});              
         return;
   }
   
   var horarioGeneral=string1+' a '+string2;   
    
   var nombreInstalacion=Ext.ComponentQuery.query('#txtEINombreInstalacion');
   nombreInstalacion=nombreInstalacion[0];
   nombreInstalacion=nombreInstalacion.getValue();
   
   var correoInstalacion=Ext.ComponentQuery.query('#txtEICorreo');
   correoInstalacion=correoInstalacion[0];
   correoInstalacion=correoInstalacion.getValue();
   
   var paginaWeb=Ext.ComponentQuery.query('#txtEIPaginaWeb');
   paginaWeb=paginaWeb[0];
   paginaWeb=paginaWeb.getValue();
   
   var nombreEncargado=Ext.ComponentQuery.query('#txtEINombreEncargado');
   nombreEncargado=nombreEncargado[0];
   nombreEncargado=nombreEncargado.getValue();
   
   var correoEncargado=Ext.ComponentQuery.query('#txtEICorreoEncargado');
   correoEncargado=correoEncargado[0];
   correoEncargado=correoEncargado.getValue();
      
   var provincia=Ext.ComponentQuery.query('#cmbEIProvincia');
   provincia=provincia[0];
   provincia=provincia.getValue();   
   
   var canton=Ext.ComponentQuery.query('#cmbEICanton');
   canton=canton[0];
   canton=canton.getValue();
   
   var distrito=Ext.ComponentQuery.query('#cmbEIDistrito');
   distrito=distrito[0];
   distrito=distrito.getValue();
   
   var detallesDireccion=Ext.ComponentQuery.query('#txtEIOtrasSenas');
   detallesDireccion=detallesDireccion[0];
   detallesDireccion=detallesDireccion.getValue();
      
   
    var failureAjaxFn = function(response, request) {  
          var errMessage = 'Error en la petición' + request.url + ' '  
          + ' status ' + response.status + ''  
          + ' statusText ' + response.statusText + ''  
          + ' responseText ' + response.responseText + '';  
          // console.log (errMessage);  
          alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
              Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
              Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
          }  // Fin Funcion para cuando falla el Ajax Request

   var successAjaxFn = function(response, request) { 
   var obj = Ext.JSON.decode(response.responseText,true);
   if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");                    
                    return;
                }
         new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                html:	 '<b>Usted ha actualizado satisfactoriamente los datos de la instalaci&oacute;n!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document); 
         return;
   }      
   var datos = '{"idInstalacion":"' + idInstalacion + '",';         
      datos += '"telefono1":"' + telefono1 + '",';
      datos += '"telefono2":"' + telefono2 + '",';           
      datos += '"fax":"' + fax + '",';
      datos += '"telefonoEncargado":"' + telefonoEncargado + '",';
      datos += '"latitud":"' + latitud + '",';
      datos += '"longitud":"' + longitud + '",';
      datos += '"horarioGeneral":"' + horarioGeneral + '",';
      datos += '"nombreInstalacion":"' + nombreInstalacion + '",';
      datos += '"correoInstalacion":"' + correoInstalacion + '",';
      datos += '"paginaWeb":"' + paginaWeb + '",';
      datos += '"nombreEncargado":"' + nombreEncargado + '",';
      datos += '"correoEncargado":"' + correoEncargado + '",';
      datos += '"detallesDireccion":"' + detallesDireccion + '",';      
      datos += '"provincia":"' + provincia + '",';
      datos += '"canton":"' + canton + '",';         
      datos += '"distrito":"' + distrito + '"}';
    Ext.Ajax.request({  
         url: 'php/RouterDBAJugarFutbol.php',  
         method: 'POST',  
         success: successAjaxFn,  
         failure: failureAjaxFn, 
         timeout: 30000,  
         headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta de las fotos de las instalaciones'},  
         params: {clasePhp: 'InstalacionDB',
                  metodo:   'editaInstalacion',
                  datos:    datos}  
     }); // Fin de la llamada Ajax   

     var panelCentral = Ext.ComponentQuery.query('#panel_central');
       panelCentral =  panelCentral[0];       
       var view = Ext.create('AJugarFutbol.view.administrador.Home');
       panelCentral.removeAll();
       panelCentral.add([view]);


},
//===================================================================================================================================================
       // Selecciono una Provincia en Pantalla de Editar Perfil
    EditarPerfilSeleccionoProvincia: function(combobox, record) {        
         var win = Ext.ComponentQuery.query('#winEditarInstalacion');
         win = win[0]; 
        
        var objx = win.query('#cmbEIProvincia');
        var valor=objx[0].getValue();
        var editablex=objx[0].isDisabled();
        if(editablex || objx[0]['readOnly'] || valor==null){objx[0].collapse(); return;}      
       
        var prov = record[0];
        prov = prov.data;
        var provNombre = prov.DesLarga;
        var provCodProv = prov.CodProv;
        var storeCantones = this.getStore('ubicacion.Cantones');
        var obj = win.query('#cmbEICanton');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        obj = win.query('#cmbEIDistrito');
        obj = obj[0];
        obj.clearValue();
        storeCantones.clearFilter(true);
        storeCantones.filter('CodProv',provCodProv);
        storeCantones.filter('TipoRegistro','1');
        //objx.collapse();
    }, // Fin de Selecciono una Provincia en Pantalla de Editar Perfil
//========================================================================================================================
    
    // Selecciono un Canton en Pantalla de Editar Perfil
    EditarPerfilSeleccionoCanton: function(combobox, record) {
        var win = Ext.ComponentQuery.query('#winEditarInstalacion');
        win = win[0]; 
        
        var objx = win.query('#cmbEICanton');
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
        var obj = win.query('#cmbEIDistrito');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        storeDistritos.clearFilter(true);
        storeDistritos.filter('CodProv',cantonCodProv);
        storeDistritos.filter('CodCanton',cantonCodCanton);
        storeDistritos.filter('TipoRegistro','1');
        window.scrollTo(0,0);          
    }, // Fin de Selecciono un Canton en Editar Perfil
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
       
       if (campo.tipoCampo == 'SoloLetras') {caracteresValidos  = 'áéíóúabcdefghijklmnñopqrsuvtxyzABCDEFGHIJKLMNÑOPQRSUVTXYZ';}
       if (campo.tipoCampo == 'SoloLetrasConPunto-Coma') {caracteresValidos  = 'áéíóúabcdefghijklmnñopqrsutvxyzABCDEFGHIJKLMNÑOPQRSUTVXYZ.,;';}
       if (campo.tipoCampo == 'SoloNumeros') {caracteresValidos  = '0123456789';}
       if (campo.tipoCampo == 'NumerosConPunto-Coma') {caracteresValidos  = '0123456789.,';}
       if (campo.tipoCampo == 'Letras-Numeros') {caracteresValidos  = 'áéíóúabcdefghijklmnñopqrsutvxyzABCDEFGHIJKLMNÑOPQRSUTVXYZ0123456789';}
       if (campo.tipoCampo == 'Letras-NumerosConPunto-Coma') {caracteresValidos  = 'abcdefghijklmnñopqrsutvxyzABCDEFGHIJKLMNÑOPQRSUTVXYZ0123456789.,;';}
       if (campo.tipoCampo == 'EMail') {caracteresValidos  = 'abcdefghijklmnopqrsutvxyzABCDEFGHIJKLMNOPQRSUTVXYZ0123456789_-.@';}
       if (campo.tipoCampo == 'Texto') {caracteresValidos  = 'áéíóúabcdefghijklmnñopqrsutvxyzABCDEFGHIJKLMNÑOPQRSUTVXYZ0123456789.,;()=+-!?:';}
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
//=========================================================================================================================    
});
