// contralodor cliente.
Ext.define('AJugarFutbol.controller.administracionx1.Clientes', {
    extend: 'Ext.app.Controller',
    
    init: function() {
         me = this;
         this.control({ 
            // Eventos de la Pantalla de Grid de Clientes 
            'pnlGridClientes button[id=btnFiltrarNombreCliente]':   {click: this.clickBtnFiltrarClientes},
            'pnlGridClientes textfield[id=txtFiltro01]':            {keyup: this.enterFiltroNombre},
            'pnlGridClientes button[id=btnIncluirClienteNuevo]':    {click: this.clickBtnInsertarClienteNuevo},
            'pnlGridClientes panel[id=pnlClientes01]':              {render: this.renderGridClientes},
            'pnlGridClientes' :                                     {hide: this.hideWindow, close: this.closeGridClientes},
            // Eventos de la Pantalla de Datos del Cliente
            'winDatosCliente combobox[id=cmbProvincia01]':       {select: this.winDatosClienteSeleccionoProvinciaCmb},
            'winDatosCliente combobox[id=cmbCanton01]':          {select: this.winDatosClienteSeleccionoCantonCmb},
            'winDatosCliente button[id=btnActualizarCliente]':   {click: this.clickBtnActualizarCliente},
            'winDatosCliente button[id=btnSalirDatosCliente]':   {click: this.clickBtnSalirDatosCliente},
            'winDatosCliente panel[id=pnlDatosCliente01]':       {render: this.renderPnlDatosCliente},
            'winDatosCliente textfield[id=txtCedulaJuridica01]':     {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtNombreLegal01]':        {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtNombreInstalacion01]':  {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtComentarioVendedor01]': {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtNombreDueno01]':        {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtApellidosDueno01]':     {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtTelefonoDueno01]':      {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtEMailDueno01]':         {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtNombreContacto01]':     {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtApellidosContacto01]':  {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtTelefonoContacto01]':   {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtEMailContacto01]':      {keyup: this.validarCampo},
            'winDatosCliente':                                      {hide: this.hideWindow, 
                                                                     show: this.showWinDatosCliente,                 
                                                                     close: this.closeWinDatosCliente}
        });
    },
    

//=====================================================================================================================================   
 
    // Tecla Enter en el campo filtro por nombre en el Grid de Clientes
    enterFiltroNombre: function(a,e,y) {
      if(e.keyCode==13) {this.clickBtnFiltrarClientes(); }
    }, // Fin de Tecla Enter en el campo contrase�a de la ventana Login

//========================================================================================================================== 
    
    showWinDatosCliente: function() {
        //console.log('showWinDatosCliente');
        var win = Ext.ComponentQuery.query('#winDatosCliente')[0]; 
       
        var objx = win.query('#cmbProvincia01');
        var objy = win.query('#cmbCanton01');
        var objz = win.query('#cmbDistrito01');
        //Obtengo valores
        var provValor=objx[0].getValue();
        var cantValor=objy[0].getValue();
        var distrValor=objz[0].getValue();
        //console.log(provValor,cantValor,distrValor);
        //Obtiene valor editable
        var editablex=objx[0].isDisabled();
        var editabley=objy[0].isDisabled();
        //Obtengo records
        var recordProv   = objx[0];        
        var recordCanton = objy[0];
        
        var storeProvincias = this.getStore('ubicacion.Provincias');
        objt = objx[0];
        objt.clearValue();
        objt.doQuery();
        storeProvincias.clearFilter(true);
        
        if(editablex || objx[0]['readOnly'] || provValor==null ){objx[0].collapse(); return;}        
        objx = objx[0];        
        objx.setValue('');
        objx.setValue(provValor);
        this.winDatosClienteSeleccionoProvinciaCmb('',recordProv['lastSelection']);
        objx.collapse();
        
        if(editabley || objy[0]['readOnly'] || cantValor==null ){ objy[0].collapse(); return;}        
        objy = objy[0]; 
        objy.setValue('');
        objy.setValue(cantValor);
        this.winDatosClienteSeleccionoCantonCmb('',recordCanton['lastSelection']);
        objy.collapse();

        objz = objz[0]; 
        objz.setValue('');
        objz.setValue(distrValor);
        objz.collapse();
    },

//==========================================================================================================================================
    // Se cerro un windows modal
    hideWindow: function(win) {
        semaforoAjaxMask=true;        
        win.destroy();
        var panelPapa = Ext.ComponentQuery.query('#viewport');
        panelPapa = panelPapa[0];
        panelPapa.getEl().unmask();
        document.getElementsByTagName("html")[0].style.overflow = "auto";
        },   
    
//======================================================================================================================================    
    
    // Click en Boton de Filtrar Clientes
    clickBtnFiltrarClientes: function() {
        var store = Ext.StoreMgr.lookup('storeCliente');
        var pnlGrdClientes = Ext.ComponentQuery.query('#pnlGridClientes')[0]; 
        var filtroNombre = pnlGrdClientes.query('#txtFiltro01')[0].getValue();
        var datos = '{"filtroNombre":"' + filtroNombre + '"}'; 
        var grdClientes = Ext.ComponentQuery.query('#grdPnlClientes01')[0];
        grdClientes.store.proxy.extraParams.datos = datos;
        grdClientes.store.loadPage(1);
        window.scrollTo(0,0);
    }, // Fin de Click en Boton Filtar Clientes

//======================================================================================================================================    

    clickBtnInsertarClienteNuevo:  function() {
          ////console.log('insertar Cliente Nuevo');
          var view = Ext.create('AJugarFutbol.view.administracionx1.DatosCliente');          
          view.show();    
          view.setTitle('Informaci\u00F3n de Cliente - Incluyendo Cliente');
          var obj = view.query('#btnActualizarCliente');
          obj[0].setDisabled(false);
          obj[0].setText('Incluir Cliente');
          obj[0].setTooltip('Dar click para incluir los datos de este Cliente');
          }, // Fin de Click en clickBtnInsertarClienteNuevo

//==========================================================================================================================

// Render de la Pantalla de Datos del Cliente
   renderPnlDatosCliente: function() {
        var win = Ext.ComponentQuery.query('#winDatosCliente')[0];
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
    }, // Fin de Render de la Pantalla de Datos del Cliente

//======================================================================================================================================

    clickBtnActualizarCliente: function(boton) {
        //console.log('clickBtnActualizarCliente');
        var window = Ext.ComponentQuery.query('#winDatosCliente')[0];
        var elMask = window.getEl();
        var grid = Ext.ComponentQuery.query('#grdPnlClientes01')[0];
        var accion = window.query('#btnActualizarCliente')[0].getText();
        var store = Ext.StoreMgr.lookup('storeCliente');
        var index = window.indexStore;
        var este = this;
        if (accion != 'Incluir Cliente') {
                var idCliente = store.data.items[index].data['IdCliente'];
                var estatusOriginal = store.data.items[index].data['EstatusOriginal'];
                var fechaCambioEstatusOrg = store.data.items[index].data['FechaCambioEstatusOrg'];
                } else {idCliente=0, estatusOriginal = '', fechaCambioEstatusOrg = new Date();}
        var nombreInstalacion, nombreLegal, cedulaJuridica, comentarioVendedor,
            fechaInicio, fechaTerminacion, idVendedor, nombreVendedor,
            codPais, codProv, codCanton, codDist,
            nombreDueno, apellidosDueno, nombreContacto, apellidosContacto, 
            telefonoDueno, telefonoContacto, eMailDueno, eMailContacto, idInstalacion, estatus, descEstatus,
            fechaCambioEstatus,fechaIniciox, fechaTerminacionx, fechaCambioEstatusx;
         
        var bajarDatosVistaDatosCliente = function(){
            cedulaJuridica = window.query('#txtCedulaJuridica01')[0].getValue();
            nombreInstalacion = window.query('#txtNombreInstalacion01')[0].getValue();
            nombreLegal = window.query('#txtNombreLegal01')[0].getValue();
            comentarioVendedor = window.query('#txtComentarioVendedor01')[0].getValue();
            nombreDueno = window.query('#txtNombreDueno01')[0].getValue();
            apellidosDueno = window.query('#txtApellidosDueno01')[0].getValue();
            telefonoDueno = window.query('#txtTelefonoDueno01')[0].getValue();
            eMailDueno = window.query('#txtEMailDueno01')[0].getValue();
            nombreContacto = window.query('#txtNombreContacto01')[0].getValue();
            apellidosContacto = window.query('#txtApellidosContacto01')[0].getValue();
            telefonoContacto = window.query('#txtTelefonoContacto01')[0].getValue();
            eMailContacto = window.query('#txtEMailContacto01')[0].getValue();
            fechaInicio = window.query('#dateFechaInicio01')[0].getValue();
            if(fechaInicio =='0000-00-00') {fechaInicio=null;}
            if(fechaInicio!=null) {
                    var anno=fechaInicio.getFullYear();        
                    var mes=fechaInicio.getMonth()+1;
                    var dia=fechaInicio.getDate();               
                    fechaIniciox=anno+'-'+mes+'-'+dia; 
            } else {fechaIniciox=null;}
            fechaTerminacion = window.query('#dateFechaTerminacion01')[0].getValue();
            if(fechaTerminacion =='0000-00-00') {fechaTerminacion=null;}
            if(fechaTerminacion!=null) {
                    anno=fechaTerminacion.getFullYear();        
                    mes=fechaTerminacion.getMonth()+1;
                    dia=fechaTerminacion.getDate();
                    fechaTerminacionx=anno+'-'+mes+'-'+dia; 
            } else {fechaTerminacionx=null;}
            if (estatus != estatusOriginal) {  fechaCambioEstatus = new Date();} else {fechaCambioEstatus = fechaCambioEstatusOrg;}
            anno=fechaCambioEstatus.getFullYear();        
            mes=fechaCambioEstatus.getMonth()+1;
            dia=fechaCambioEstatus.getDate();  
            var cero1='', cero2='';
                    if (mes <= 9) {cero1='0';}
                    if (dia <= 9) {cero2='0';}
            fechaCambioEstatusx=anno+'-'+cero1+mes+'-'+cero2+dia;
            fechaCambioEstatus = fechaCambioEstatusx;
            codPais = 1;
            codProv = window.query('#cmbProvincia01')[0].getValue();
            codCanton = window.query('#cmbCanton01')[0].getValue();
            codDist = window.query('#cmbDistrito01')[0].getValue();
            descEstatus = window.query('#cmbStatus01')[0].getRawValue();
            estatus = window.query('#cmbStatus01')[0].getValue();
            idVendedor = window.query('#cmbIdVendedor01')[0].getValue();
            nombreVendedor = window.query('#cmbIdVendedor01')[0].getRawValue();
            idInstalacion = window.query('#cmbIdInstalacion01')[0].getValue();
            if(estatus == null) {estatus='';}
            if(idVendedor == null) {idVendedor='';}
            if(nombreInstalacion == null) {nombreInstalacion='';}
            
            if (eMailDueno.length > 0) {
                var patronEMail = /^[a-z0-9\_\-\.]+@[a-z0-9\_\-\.]+\.[a-z]{2,}$/i;
                if (!patronEMail.test(eMailDueno)) {
                    elMask.mask();
                    Ext.MessageBox.show({
                        title: 'Atenci\u00F3n',
                        msg: 'EMail del Dueno es invalido. Solo se permiten letras: [a-z/A-Z], N\u00FAmeros: [0-1] y los siguientes caracteres: [.-_] y debe tener el siguiente formato: xxxxxxx@dominio.XXX',
                        buttons: Ext.MessageBox.OK,
                        modal: false,
                        closable : false,
                        fn: finMsgError,
                        icon: Ext.MessageBox.ERROR});
                    return false;
               }
            }
            if (eMailContacto.length > 0) {
                var patronEMail = /^[a-z0-9\_\-\.]+@[a-z0-9\_\-\.]+\.[a-z]{2,}$/i;
                if (!patronEMail.test(eMailContacto)) {
                    elMask.mask();
                    Ext.MessageBox.show({
                        title: 'Atenci\u00F3n',
                        msg: 'EMail del Contacto es invalido. Solo se permiten letras: [a-z/A-Z], N\u00FAmeros: [0-1] y los siguientes caracteres: [.-_] y debe tener el siguiente formato: xxxxxxx@dominio.XXX',
                        buttons: Ext.MessageBox.OK,
                        modal: false,
                        closable : false,
                        fn: finMsgError,
                        icon: Ext.MessageBox.ERROR});
                    return false;
               }
            }
            if (estatus.length == 0) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Estatus no puede quedar en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
               }
               if (idVendedor.length == 0) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Vendedor no puede quedar en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
               }
               if (nombreInstalacion.length == 0) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Nombre de la Instalacion no puede quedar en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
               }
            return true;
            }
            
        function finMsgError(){
            elMask.unmask();
            }
            
        var actualizarStore = function(){
            store.data.items[index].data['CedulaJuridica'] = cedulaJuridica;
            store.data.items[index].data['NombreLegal'] = nombreLegal;
            store.data.items[index].data['NombreInstalacion'] = nombreInstalacion;
            store.data.items[index].data['ApellidosDueno'] = apellidosDueno;
            store.data.items[index].data['NombreDueno'] = nombreDueno;
            store.data.items[index].data['TelefonoDueno'] = telefonoDueno;
            store.data.items[index].data['EMailDueno'] = eMailDueno;
            store.data.items[index].data['ApellidosContacto'] = apellidosContacto;
            store.data.items[index].data['NombreContacto'] = nombreContacto;
            store.data.items[index].data['TelefonoContacto'] = telefonoContacto;
            store.data.items[index].data['EMailContacto'] = eMailContacto;
            store.data.items[index].data['FechaInicio'] = fechaInicio;
            store.data.items[index].data['FechaTerminacion'] = fechaTerminacion;
            store.data.items[index].data['FechaCambioEstatus'] = fechaCambioEstatus;
            store.data.items[index].data['CodPais'] = codPais;
            store.data.items[index].data['CodProv'] = codProv;
            store.data.items[index].data['CodCanton'] = codCanton;
            store.data.items[index].data['CodDist'] = codDist;
            store.data.items[index].data['IdVendedor'] = idVendedor;
            store.data.items[index].data['NombreCompletoVendedor'] = nombreVendedor;
            store.data.items[index].data['ComentarioVendedor'] = comentarioVendedor;
            store.data.items[index].data['IdInstalacion'] = idInstalacion;
            store.data.items[index].data['Estatus'] = estatus;
            store.data.items[index].data['Descripcion'] = descEstatus;
                      }
    
        // Funcion para cuando falla el Ajax Request
        var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + ''; 
              alert("El servidor no contesto en la última transacción por un error en Internet.  Favor revise si la transación se completo.");
              window.close();
              }  // Fin Funcion para cuando falla el Ajax Request

        // Funcion para cuando el Ajax Request responde correctamente
        var successAjaxFn = function(response, request) { 
            var obj = Ext.JSON.decode(response.responseText,true);
            if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    window.close();
                    return;
            }
   
            if (accion == 'Incluir Cliente' ) {
                 if (obj.respuesta[0].mensaje.codigoError == '0001') {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Cliente ya Existe como: ' + obj.respuesta[0].mensaje.nombreYaExiste,
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                 // Limpia Filtros         
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#txtFiltro01')[0].setValue('');
                 este.clickBtnFiltrarClientes();
                 }
                 
            if (accion == 'Eliminar Cliente') {
                  if (obj.respuesta[0].mensaje.codigoError == '0001') {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Cliente tiene Contractos.  No se puede Eliminar!!!',                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                  if (obj.respuesta[0].mensaje.codigoError == '0002') {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Cliente tiene Pagos.  No se puede Eliminar!!!',                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                  if (obj.respuesta[0].mensaje.codigoError == '0003') {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Cliente tiene Contactos.  No se puede Eliminar!!!',                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                  este.clickBtnFiltrarClientes();
                 }
            
            if (accion == 'Actualizar Datos') {
                 actualizarStore();
                 grid.getView().refresh();
                 }
            
        window.close();
       
        } //  Fin Funcion para cuando el Ajax Request responde correctamente
        
        if (accion == 'Eliminar Cliente') { 
            store.removeAt(window.indexStore);
            var datos = '{"idCliente":"' + idCliente + '"}'; 
            Ext.Ajax.request({  
                    url: 'php/RouterDBAJugarFutbol.php',  
                    method: 'POST',  
                    success: successAjaxFn,  
                    failure: failureAjaxFn, 
                    timeout: 30000,  
                    headers: {'cabecera': 'Operaciones de DB al Objeto Equipo. Eliminar un Cliente'},  
                    params: {clasePhp: 'ModCRMDB',
                            metodo:   'eliminarCliente',
                            datos:    datos}  
                    }) // Fin de la llamada Ajax 
            }
        
        if (accion == 'Actualizar Datos') { 
            var indError = bajarDatosVistaDatosCliente();
            if (indError) {
                    datos = '{"idCliente":"'         + idCliente +
                           '","idInstalacion":"'     + idInstalacion +
                           '","idVendedor":"'        + idVendedor +
                           '","nombreInstalacion":"' + nombreInstalacion +
                           '","cedulaJuridica":"'    + cedulaJuridica +
                           '","nombreLegal":"'       + nombreLegal +
                           '","comentarioVendedor":"'+ comentarioVendedor +
                           '","nombreDueno":"'       + nombreDueno +
                           '","apellidosDueno":"'    + apellidosDueno +
                           '","eMailDueno":"'        + eMailDueno +
                           '","telefonoDueno":"'     + telefonoDueno +
                           '","nombreContacto":"'    + nombreContacto +
                           '","apellidosContacto":"' + apellidosContacto +
                           '","eMailContacto":"'     + eMailContacto +
                           '","telefonoContacto":"'  + telefonoContacto +
                           '","fechaInicio":"'       + fechaIniciox +
                           '","fechaTerminacion":"'  + fechaTerminacionx +
                           '","fechaCambioEstatus":"'+ fechaCambioEstatusx +
                           '","codPais":"'           + codPais +
                           '","codProv":"'           + codProv +
                           '","codCanton":"'         + codCanton +
                           '","codDist":"'           + codDist +
                           '","estatus":"'           + estatus +
                           '","estatusOrginal":"'    + estatusOriginal +
                           '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Cliente Equipo. Actualizar un Cliente'},  
                            params: {clasePhp: 'ModCRMDB',
                                    metodo:   'actualizarCliente',
                                    datos:    datos}  
                            }) // Fin de la llamada Ajax 
                    }
            }
        if (accion == 'Incluir Cliente') {
            if (bajarDatosVistaDatosCliente()) {
                 datos = '{"idInstalacion":"'        + idInstalacion +
                           '","idVendedor":"'        + idVendedor +
                           '","nombreInstalacion":"' + nombreInstalacion +
                           '","nombreLegal":"'       + nombreLegal +
                           '","cedulaJuridica":"'    + cedulaJuridica +
                           '","comentarioVendedor":"'+ comentarioVendedor +
                           '","nombreDueno":"'       + nombreDueno +
                           '","apellidosDueno":"'    + apellidosDueno +
                           '","eMailDueno":"'        + eMailDueno +
                           '","telefonoDueno":"'     + telefonoDueno +
                           '","nombreContacto":"'    + nombreContacto +
                           '","apellidosContacto":"' + apellidosContacto +
                           '","eMailContacto":"'     + eMailContacto +
                           '","telefonoContacto":"'  + telefonoContacto +
                           '","fechaInicio":"'       + fechaIniciox +
                           '","fechaTerminacion":"'  + fechaTerminacionx +
                           '","fechaCambioEstatus":"'+ fechaCambioEstatusx +
                           '","codPais":"'           + codPais +
                           '","codProv":"'           + codProv +
                           '","codCanton":"'         + codCanton +
                           '","codDist":"'           + codDist +
                           '","estatus":"'           + estatus +
                           '","fechaCambioEstatus":"'+ fechaCambioEstatusx +
                            '"}'; 
                        Ext.Ajax.request({
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Objeto Cliente. Incluir un Cliente Nuevo'},  
                            params: {clasePhp: 'ModCRMDB',
                                    metodo:   'incluirCliente',
                                    datos:    datos}  
                            }) // Fin de la llamada Ajax
                    }        
         }
    },
    
//======================================================================================================================================

    clickBtnSalirDatosCliente: function() {
        //console.log('clickBtnSalirDatosCliente'); 
         Ext.ComponentQuery.query('#winDatosCliente')[0].close();
        },
        
//======================================================================================================================================

    // Se cerro la Pantalla de Datos del Cliente
    closeWinDatosCliente: function() {
       //console.log('closeWinDatosCliente');
       semaforoAjaxMask=true;
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, // Fin de Se cerro la Pantalla de Datos del Cliente

//======================================================================================================================================

    // Render de la Pantalla GridClientes
    renderGridClientes: function() {
        //console.log('Render GridClientes');
        var me = this;
        
        var cargarDatosVistaDatosCliente = function(vista,store,index){
            vista.setIdCliente(store.data.items[index].data['IdCliente']);
            vista.setIndexStore(index);
            vista.query('#txtCedulaJuridica01')[0].setValue(store.data.items[index].data['CedulaJuridica']);
            vista.query('#txtNombreInstalacion01')[0].setValue(store.data.items[index].data['NombreInstalacion']);
            vista.query('#txtNombreLegal01')[0].setValue(store.data.items[index].data['NombreLegal']);
            vista.query('#txtComentarioVendedor01')[0].setValue(store.data.items[index].data['ComentarioVendedor']);
            vista.query('#txtApellidosDueno01')[0].setValue(store.data.items[index].data['ApellidosDueno']);
            vista.query('#txtNombreDueno01')[0].setValue(store.data.items[index].data['NombreDueno']);
            vista.query('#txtTelefonoDueno01')[0].setValue(store.data.items[index].data['TelefonoDueno']);
            vista.query('#txtEMailDueno01')[0].setValue(store.data.items[index].data['EMailDueno']);
            vista.query('#txtApellidosContacto01')[0].setValue(store.data.items[index].data['ApellidosContacto']);
            vista.query('#txtNombreContacto01')[0].setValue(store.data.items[index].data['NombreContacto']);
            vista.query('#txtTelefonoContacto01')[0].setValue(store.data.items[index].data['TelefonoContacto']);
            vista.query('#txtEMailContacto01')[0].setValue(store.data.items[index].data['EMailContacto']);
            if (store.data.items[index].data['FechaInicio'] == '0000-00-00') {store.data.items[index].data['FechaInicio']=null;}
            vista.query('#dateFechaInicio01')[0].setValue(store.data.items[index].data['FechaInicio']);
            if (store.data.items[index].data['FechaTerminacion'] == '0000-00-00') {store.data.items[index].data['FechaTerminacion']=null;}
            vista.query('#dateFechaTerminacion01')[0].setValue(store.data.items[index].data['FechaTerminacion']);
            if(store.data.items[index].data['CodProv']!=0)   {vista.query('#cmbProvincia01')[0].setValue(store.data.items[index].data['CodProv']);
                                                             } else {vista.query('#cmbProvincia01')[0].setValue(null);}  
            if(store.data.items[index].data['CodCanton']!=0) {vista.query('#cmbCanton01')[0].setValue(store.data.items[index].data['CodCanton']);
                                                             } else {vista.query('#cmbCanton01')[0].setValue(null);}
            if(store.data.items[index].data['CodDist']!=0)   { vista.query('#cmbDistrito01')[0].setValue(store.data.items[index].data['CodDist']);
                                                             } else { vista.query('#cmbDistrito01')[0].setValue(null);}
            if(store.data.items[index].data['IdInstalacion']!=0)   { vista.query('#cmbIdInstalacion01')[0].setValue(store.data.items[index].data['IdInstalacion']);
                                                                   } else { vista.query('#cmbIdInstalacion01')[0].setValue(null);}
            vista.query('#cmbIdVendedor01')[0].setValue(store.data.items[index].data['IdVendedor']);
            vista.query('#cmbStatus01')[0].setValue(store.data.items[index].data['Estatus']);
            return;
        }
          
        var editarDatosCliente = function(grid,rowindex,colIndex) {
            //console.log('Editar Registro');
            var view = Ext.create('AJugarFutbol.view.administracionx1.DatosCliente');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Cliente - Editando Datos');
            var obj = view.query('#btnActualizarCliente');
            obj[0].setDisabled(false);
            obj[0].setText('Actualizar Datos');
            obj[0].setTooltip('Dar click para actualizar los datos de este Cliente');
            cargarDatosVistaDatosCliente(view,grid.store,rowindex);
          }
          
        var eliminarCliente = function(grid,rowindex,colIndex) {
            var view = Ext.create('AJugarFutbol.view.administracionx1.DatosCliente');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Cliente - Eliminando Datos');
            var obj = view.query('#btnActualizarCliente');
            obj[0].setDisabled(false);
            obj[0].setText('Eliminar Cliente');
            obj[0].setTooltip('Dar click para eliminar este Cliente');
            cargarDatosVistaDatosCliente(view,grid.store,rowindex);
          }  
        var filtroNombre = '';
        var datos = '{"filtroNombre":"' + filtroNombre + '"}'; 
                 
        var storeCliente = Ext.create('Ext.data.Store', {
                           storeId: 'storeCliente',
                           pageSize: 18, 
                           proxy: {
                                    type: 'ajax',
                                    actionMethods : 'POST',
                                    timeout: 30000,
                                    url: 'php/RouterDBAJugarFutbol.php', 
                                    extraParams: {
                                                  clasePhp: 'ModCRMDB',
                                                  metodo:   'getCargaGridClientes',
                                                  datos: datos,
                                                  tipoRetorno: 'GridPaginacion'
                                                 },
                                    reader: {
                                             root: 'results',
                                             totalProperty: 'cantidadRegistros'
                                            },
                                    afterRequest: function(request, success) {
                                         if(success == false) {
                                            var panelCentral = Ext.ComponentQuery.query('#panel_central');
                                            panelCentral =  panelCentral[0];
                                            view = Ext.create('AJugarFutbol.view.administracionx1.Home');           
                                            panelCentral.removeAll();
                                            panelCentral.add([view]);  
                                            alert ("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                                         }}      
                                  },
                            sorters: [{property : 'NombreInstalacion', direction: 'ASC'}],
                            fields: ['IdCliente', 
                                     'NombreInstalacion', 
                                     'CedulaJuridica',
                                     'NombreLegal',
                                     'NombreDueno',
                                     'ApellidosDueno',
                                     'TelefonoDueno',
                                     'EMailDueno',
                                     'NombreContacto',
                                     'ApellidosContacto',
                                     'TelefonoContacto',
                                     'EMailContacto',
                                     'FechaInicio',
                                     'FechaTerminacion',
                                     'IdVendedor',
                                     'NombreCompletoVendedor',
                                     'IdInstalacion',
                                     'CodProv',
                                     'CodCanton',
                                     'CodDist',
                                     'EMail',
                                     'Estatus',
                                     'EstatusOriginal',
                                     'Descripcion',
                                     'FechaCambioEstatus',
                                     'FechaCambioEstatusOrg',
                                     'ComentarioVendedor']});
        
        var gridClientes = Ext.create('Ext.grid.Panel', {
                    id:     'grdPnlClientes01',
                    itemId: 'grdPnlClientes01',
                    width: 720,
                    height: 455,
                    store: storeCliente,
                    renderTo: 'pnlClientes01-body',
                    viewConfig: {loadingText: undefined, loadMask: false,
                                 listeners: {itemdblclick: {fn: function(dataview, record, item, index, e) {editarDatosCliente(dataview,index,0);}}}},
     
                    columns:[
                           {
                                id: 'NombreInstalacion',
                                text: "Nombre Instalacion",
                                dataIndex: 'NombreInstalacion',
                                width: 180,
                                sortable: false, 
                                align: 'center'
                            },{
                                text: "Nombre Vendedor",
                                dataIndex: 'NombreCompletoVendedor',
                                width: 150,
                                sortable: false,
                                align: 'center'
                            },{
                                text: "Descripcion",
                                dataIndex: 'Descripcion',
                                width: 185,
                                sortable: false,
                                align: 'center'
                            },{
                                text: "Fecha Estatus",
                                dataIndex: 'FechaCambioEstatus',
                                width: 100,
                                sortable: false,
                                align: 'center'
                            },{
                                xtype:'actioncolumn',
                                    width: 100,
                                    items: [{
                                            icon: 'resources/imagenes/editar.png',
                                            tooltip: 'Editar los datos del Cliente',
                                            iconCls: 'x-icon-grid',
                                            handler: editarDatosCliente

                                            },{
                                            icon: 'resources/imagenes/delete.png',
                                            tooltip: 'Eliminar el Cliente',
                                            iconCls: 'x-icon-grid',
                                            handler: eliminarCliente
                                            }
                                    ]

                            },
                    ],
                    // paging bar on the bottom
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeCliente,
                        displayInfo: true,
                        displayMsg: 'Desplegando Clientes {0} - {1} de {2}',
                        nextText:  'Pr\u00F3xima p\u00E1gina',
                        firstText: 'Primer p\u00E1gina',
                        lastText:  'Ultima p\u00E1gina',
                        prevText:  'p\u00E1gina anterior',
                        refreshText: 'Refrescar los datos',
                        afterPageText: 'de {0}',
                        beforePageText: 'p\u00E1gina',
                        emptyMsg: "No hay Clientes para desplegar",
                        items:[]
                        })
            });

        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#txtFiltro01')[0].setValue('');
        storeCliente.loadPage(1);
        window.scrollTo(0,0);
    
    }, // Fin de Render de la Pantalla GridClientes


//=====================================================================================================================================

    // Se cerro la Pantalla de Registrarse
    closeGridClientes: function() {
       //console.log('Se cerro la vista GridCliente');
      
      }, // Fin de Se cerro la Pantalla de GridCliente

//=========================================================================================================================

    // Selecciono una Provincia en Pantalla de Editar Perfil
    winDatosClienteSeleccionoProvinciaCmb: function(combobox, record) {
        //console.log('winDatosClienteSeleccionoProvinciaCmb');
        var win = Ext.ComponentQuery.query('#winDatosCliente');
        win = win[0]; 
        
        var objx = win.query('#cmbProvincia01');
        var valor=objx[0].getValue();
        var editablex=objx[0].isDisabled();
        if(editablex || objx[0]['readOnly'] || valor==null){objx[0].collapse(); return;}   
        
        var prov = record[0];
        prov = prov.data;
        var provNombre = prov.DesLarga;
        var provCodProv = prov.CodProv;
        var storeCantones = this.getStore('ubicacion.Cantones');
        var obj = win.query('#cmbCanton01');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        obj = win.query('#cmbDistrito01');
        obj = obj[0];
        obj.clearValue();
        storeCantones.clearFilter(true);
        storeCantones.filter('CodProv',provCodProv);
        ////console.log('Seleciono la Provincia: ' + provNombre + ' ' + provCodProv + ' ' + prov.id + ' en la vista de Editar Perfil');
        
    }, // Fin de Selecciono una Provincia en Pantalla de Editar Perfil
//========================================================================================================================
    
    // Selecciono un Canton en Pantalla de Editar Perfil
    winDatosClienteSeleccionoCantonCmb: function(combobox, record) {
        //console.log('winDatosClienteSeleccionoCantonCmb');
        var win = Ext.ComponentQuery.query('#winDatosCliente');
        win = win[0]; 
        
        var objx = win.query('#cmbCanton01');
        var valor=objx[0].getValue();
        var editablex=objx[0].isDisabled();
        //console.log(valor);
        if(editablex || objx[0]['readOnly'] || valor==null){objx[0].collapse(); return;}      
        
        var canton = record[0];
        canton = canton.data;
        var cantonNombre = canton.DesLarga;
        var cantonCodProv = canton.CodProv;
        var cantonCodCanton = canton.CodCanton;
        var storeDistritos = this.getStore('ubicacion.Distritos');
        var obj = win.query('#cmbDistrito01');
        obj = obj[0];
        obj.clearValue();
        obj.doQuery();
        storeDistritos.clearFilter(true);
        storeDistritos.filter('CodProv',cantonCodProv);
        storeDistritos.filter('CodCanton',cantonCodCanton);
       
    }, // Fin de Selecciono un Canton en Editar Perfil

//=========================================================================================================================    

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
       if (campo.tipoCampo == 'Numeros-guiones') {caracteresValidos  = '0123456789-';}
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
