Ext.define('AJugarFutbol.controller.administracionx1.Contratos', {
    extend: 'Ext.app.Controller',
    
    init: function() {
         me = this;
         this.control({ 
            // Eventos de la Pantalla de Grid de Contratos 
            'pnlGridContratos button[id=btnFiltrarNombreCliente]':   {click: this.clickBtnFiltrarClientes},
            'pnlGridContratos textfield[id=txtFiltro02]':            {keyup: this.enterFiltroNombre},
            'pnlGridContratos button[id=btnIncluirContratoNuevo]':   {click: this.clickBtnInsertarContratoNuevo},
            'pnlGridContratos panel[id=pnlContratos02]':             {render: this.renderGridContratos},
            'pnlGridContratos' :                                     {hide: this.hideWindow, close: this.closeGridContratos},
            // Eventos de la Pantalla de Datos del Contrato
            'winDatosContrato button[id=btnActualizarContrato]':   {click: this.clickBtnActualizarContrato},
            'winDatosContrato button[id=btnSalirDatosContrato]':   {click: this.clickBtnSalirDatosContrato},
            'winDatosContrato button[id=btnGenerarPagos]':           {click: this.clickBtnGenerarPagos},
            'winDatosContrato panel[id=pnlDatosContrato02]':       {render: this.renderPnlDatosContrato},
            'winDatosContrato textfield[id=txtPorcComision02]':     {keyup: this.validarCampo},
            'winDatosContrato textfield[id=txtCantCanchas02]':      {keyup: this.validarCampo},
            'winDatosContrato textfield[id=txtCantUsuarios02]':     {keyup: this.validarCampo},
            'winDatosContrato textfield[id=txtComentarioContrato02]': {keyup: this.validarCampo},
            'winDatosContrato textfield[id=txtMesesContrato02]':    {keyup: this.validarCampo},
            'winDatosContrato textfield[id=txtMontoMesDolares02]':  {keyup: this.validarCampo},
            'winDatosContrato textfield[id=txtServicioFacturar02]': {keyup: this.validarCampo},
            'winDatosContrato':                                      {hide: this.hideWindow, 
                                                                     show: this.showWinDatosContrato,                 
                                                                     close: this.closeWinDatosContrato}
        });
    },
    

//=====================================================================================================================================   
 
    // Tecla Enter en el campo filtro por nombre en el Grid de Contratos
    enterFiltroNombre: function(a,e,y) {
      if(e.keyCode==13) {this.clickBtnFiltrarClientes(); }
    }, // Fin de Tecla Enter en el campo contrase�a de la ventana Login

//========================================================================================================================== 
    
    showWinDatosContrato: function() {
        var win = Ext.ComponentQuery.query('#winDatosContrato')[0]; 
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
    
    // Click en Boton de Filtrar Contratos
    clickBtnFiltrarClientes: function() {
        console.log('clickBtnFiltrarClientes');
        var store = Ext.StoreMgr.lookup('storeContrato');
        var pnlGrdContratos = Ext.ComponentQuery.query('#pnlGridContratos')[0]; 
        var filtroNombre = pnlGrdContratos.query('#txtFiltro02')[0].getValue();
        var datos = '{"filtroNombre":"' + filtroNombre + '"}'; 
        var grdContratos = Ext.ComponentQuery.query('#grdPnlContratos02')[0];
        grdContratos.store.proxy.extraParams.datos = datos;
        grdContratos.store.loadPage(1);
        window.scrollTo(0,0);
    }, // Fin de Click en Boton Filtar Contratos

//======================================================================================================================================    

    clickBtnInsertarContratoNuevo:  function() {
          console.log('clickBtnInsertarContratoNuevo');
          var view = Ext.create('AJugarFutbol.view.administracionx1.DatosContrato');          
          view.show();    
          view.setTitle('Informaci\u00F3n de Contrato - Incluyendo Contrato');
          var obj = view.query('#btnActualizarContrato');
          obj[0].setDisabled(false);
          obj[0].setText('Incluir Contrato');
          obj[0].setTooltip('Dar click para incluir los datos de este Contrato');
          view.query('#btnGenerarPagos')[0].setDisabled(true);
          view.query('#txtNumeroContrato02')[0].setReadOnly(false);
          }, // Fin de Click en clickBtnInsertarContratoNuevo

//==========================================================================================================================

// Render de la Pantalla de Datos del Contrato
   renderPnlDatosContrato: function() {
        console.log('renderPnlDatosContrato');
        var win = Ext.ComponentQuery.query('#winDatosContrato')[0];
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
    }, // Fin de Render de la Pantalla de Datos del Contrato

//======================================================================================================================================
  clickBtnActualizarContrato: function(boton) {
        var window = Ext.ComponentQuery.query('#winDatosContrato')[0];
        var elMask = window.getEl();
        var elMask1 = Ext.ComponentQuery.query('#viewport')[0].getEl();
        var grid = Ext.ComponentQuery.query('#grdPnlContratos02')[0];
        var accion = window.query('#btnActualizarContrato')[0].getText();
        var store = Ext.StoreMgr.lookup('storeContrato');
        var index = window.indexStore;
        var este = this;
        if (accion != 'Incluir Contrato') {
                var pagosGenerados = store.data.items[index].data['PagosGenerados'];
                var idContrato = store.data.items[index].data['IdContrato'];
                var estatusOriginal = store.data.items[index].data['EstatusOriginal'];
                var fechaCambioEstatusOrg = store.data.items[index].data['FechaCambioEstatusOrg'];
                } else { pagosGenerados = 'NO', idContrato=0, estatusOriginal = '', fechaCambioEstatusOrg = new Date();}
        var noContrato, idCliente, nombreInstalacion, idVendedor, nombreVendedor, comentarioContrato, 
            fechaInicio, fechaTerminacion, fechaPrimerPago, porcComision, cantCanchas, cantUsuarios,
            mesesContrato, montoMesDolares, pagaPrimerMes, cantPagos, estatus, descEstatus, fechaCambioEstatus, 
            fechaPrimerPagox, fechaIniciox, fechaTerminacionx, fechaCambioEstatusx, servicioFacturar;
         
        var bajarDatosVistaDatosContrato = function(){
            noContrato = window.query('#txtNumeroContrato02')[0].getValue();
            idCliente = window.query('#cmbIdCliente02')[0].getValue();
            nombreInstalacion = window.query('#cmbIdCliente02')[0].getRawValue();
            idVendedor = window.query('#cmbIdVendedor02')[0].getValue();
            nombreVendedor = window.query('#cmbIdVendedor02')[0].getRawValue();
            comentarioContrato = window.query('#txtComentarioContrato02')[0].getValue();
            porcComision = window.query('#txtPorcComision02')[0].getValue();
            cantCanchas = window.query('#txtCantCanchas02')[0].getValue();
            cantUsuarios = window.query('#txtCantUsuarios02')[0].getValue();
            mesesContrato =  window.query('#txtMesesContrato02')[0].getValue();
            montoMesDolares =  window.query('#txtMontoMesDolares02')[0].getValue();
            servicioFacturar =  window.query('#txtServicioFacturar02')[0].getValue();
            pagaPrimerMes = 'NO'; if (window.query('#rbtnSiPaga02')[0].getValue()) {pagaPrimerMes='SI';}
            if (pagaPrimerMes == 'NO') {cantPagos = mesesContrato - 1;} else {cantPagos = mesesContrato;}
            fechaInicio = window.query('#dateFechaInicio02')[0].getValue();
            fechaPrimerPago = window.query('#dateFechaInicio02')[0].getValue();
            if(fechaInicio =='0000-00-00') {fechaInicio=null;}
            var fecha=fechaInicio;
            if(fechaInicio!=null) {
                    fechaPrimerPago.setMonth(fechaPrimerPago.getMonth() + 1);
                    var anno=fechaInicio.getFullYear();        
                    var mes=fechaInicio.getMonth()+1;
                    var dia=fechaInicio.getDate();
                    var cero1='', cero2=''; if (mes <= 9) {cero1='0';} if (dia <= 9) {cero2='0';}
                    fechaIniciox=anno+'-'+cero1+mes+'-'+cero2+dia;
                    anno=fechaPrimerPago.getFullYear();        
                    mes=fechaPrimerPago.getMonth()+1;
                    dia=fechaPrimerPago.getDate();
                    cero1='', cero2=''; if (mes <= 9) {cero1='0';} if (dia <= 9) {cero2='0';}
                    fechaPrimerPagox=anno+'-'+cero1+mes+'-'+cero2+dia;
                    fechaPrimerPago = fechaPrimerPagox;
            } else {fechaIniciox=null; fechaPrimerPagox=null;}
            fechaTerminacion = window.query('#dateFechaTerminacion02')[0].getValue();
            if(fechaTerminacion =='0000-00-00') {fechaTerminacion=null;}
            if(fechaTerminacion!=null) {
                    anno=fechaTerminacion.getFullYear();        
                    mes=fechaTerminacion.getMonth()+1;
                    dia=fechaTerminacion.getDate();
                    cero1='', cero2=''; if (mes <= 9) {cero1='0';} if (dia <= 9) {cero2='0';}
                    fechaTerminacionx=anno+'-'+cero1+mes+'-'+cero2+dia; 
            } else {fechaTerminacionx=null;}
            
            if (estatus != estatusOriginal) {  fechaCambioEstatus = new Date();} else {fechaCambioEstatus = fechaCambioEstatusOrg;}
            anno=fechaCambioEstatus.getFullYear();        
            mes=fechaCambioEstatus.getMonth()+1;
            dia=fechaCambioEstatus.getDate();  
            cero1='', cero2=''; if (mes <= 9) {cero1='0';} if (dia <= 9) {cero2='0';}
            fechaCambioEstatusx=anno+'-'+cero1+mes+'-'+cero2+dia;
            fechaCambioEstatus = fechaCambioEstatusx;
            
            descEstatus = window.query('#cmbStatus02')[0].getRawValue();
            estatus = window.query('#cmbStatus02')[0].getValue();
            if(estatus == null)    {estatus=''; descEstatus='';}
            if(idCliente == null)  {idCliente=''; nombreInstalacion='';}
            if(idVendedor == null) {idVendedor=''; nombreVendedor='';}
            if(servicioFacturar == null) {servicioFacturar='';}
            console.log(fechaInicio);
             
            if (estatus.length == 0) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Estatus no puede quedar en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      icon: Ext.MessageBox.ERROR});
                  return false;
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
               if (noContrato.length == 0) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Número del Contrato no puede quedar en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
               }
               if (idCliente.length == 0) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Cliente no puede quedar en blanco',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
               }
               if (servicioFacturar.length == 0) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El Cliente no puede quedar en blanco',
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
            console.log(fechaInicio);
            store.data.items[index].data['NoContrato'] =         noContrato;
            store.data.items[index].data['IdCliente'] =          idCliente;
            store.data.items[index].data['NombreInstalacion'] =  nombreInstalacion;
            store.data.items[index].data['IdVendedor'] =         idVendedor;
            store.data.items[index].data['NombreCompletoVendedor'] = nombreVendedor;
            store.data.items[index].data['PorcComision'] =       porcComision;
            store.data.items[index].data['CantidadCanchas'] =    cantCanchas;
            store.data.items[index].data['CantidadUsuarios'] =   cantUsuarios;
            store.data.items[index].data['MontoMesDolares'] =    montoMesDolares;
            store.data.items[index].data['MesesContrato'] =      mesesContrato;
            store.data.items[index].data['PagaPrimerMes'] =      pagaPrimerMes;
            store.data.items[index].data['CantidadPagos'] =      cantPagos;
            store.data.items[index].data['FechaInicioContrato'] =fechaInicio;
            store.data.items[index].data['FechaTerminaContrato'] = fechaTerminacion;
            store.data.items[index].data['FechaCambioEstatus'] = fechaCambioEstatus;
            store.data.items[index].data['FechaPrimerPago'] =    fechaPrimerPago;
            store.data.items[index].data['ComentarioContrato'] = comentarioContrato;
            store.data.items[index].data['EstatusContrato'] =    estatus;
            store.data.items[index].data['ServicioFacturar'] =   servicioFacturar;
            store.data.items[index].data['Descripcion'] =        descEstatus;
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
   
            if (accion == 'Incluir Contrato' ) {
                if (obj.respuesta[0].mensaje.codigoError == '0001') {
                        elMask.mask();
                        elMask1.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Cliente ya tiene un Contrato con la misma Fecha de Inicio!!',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                 if (obj.respuesta[0].mensaje.codigoError == '0002') {
                        elMask.mask();
                        elMask1.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Número de Contrato ya Existe!!',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                    if (obj.respuesta[0].mensaje.codigoError == '0003' || obj.respuesta[0].mensaje.codigoError == '0004') {
                        elMask.mask();
                        elMask1.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Existe un error interno en el Sistema.  Intente de nuevo!!',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}
                 // Limpia Filtros         
                 Ext.ComponentQuery.query('#pnlGridContratos')[0].query('#txtFiltro02')[0].setValue('');
                 este.clickBtnFiltrarClientes();
                 }
                 
            if (accion == 'Eliminar Contrato') {
                  if (obj.respuesta[0].mensaje.codigoError == '0001') {
                        elMask.mask();
                        elMask1.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Este Contrato tiene Pagos.  No se puede Eliminar!!!',                            buttons: Ext.MessageBox.OK,
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
        
        if (accion == 'Eliminar Contrato') { 
            store.removeAt(window.indexStore);
            var datos = '{"idContrato":"' + idContrato + '"}'; 
            Ext.Ajax.request({  
                    url: 'php/RouterDBAJugarFutbol.php',  
                    method: 'POST',  
                    success: successAjaxFn,  
                    failure: failureAjaxFn, 
                    timeout: 30000,  
                    headers: {'cabecera': 'Operaciones de DB al Objeto Equipo. Eliminar un Contrato'},  
                    params: {clasePhp: 'ModCRMDB',
                            metodo:   'eliminarContrato',
                            datos:    datos}  
                    }) // Fin de la llamada Ajax 
            }
        
        if (accion == 'Actualizar Datos') { 
            var indError = bajarDatosVistaDatosContrato();
            if (indError) {
                    datos = '{"idContrato":"'         + idContrato +
                           '","noContrato":"'         + noContrato +
                           '","idCliente":"'          + idCliente +
                           '","idVendedor":"'         + idVendedor +
                           '","porcComision":"'       + porcComision +
                           '","fechaInicio":"'        + fechaIniciox +
                           '","fechaTermina":"'       + fechaTerminacionx +
                           '","fechaPrimerPago":"'    + fechaPrimerPagox +
                           '","cantidadCanchas":"'    + cantCanchas +
                           '","cantidadUsuarios":"'   + cantUsuarios +
                           '","montoMesDolares":"'    + montoMesDolares +
                           '","mesesContrato":"'      + mesesContrato +
                           '","pagaPrimerMes":"'      + pagaPrimerMes +
                           '","cantidadPagos":"'      + cantPagos +
                           '","servicioFacturar":"'   + servicioFacturar +
                           '","fechaCambioEstatus":"' + fechaCambioEstatusx +
                           '","comentario":"'         + comentarioContrato +
                           '","estatus":"'            + estatus +
                           '","estatusOrginal":"'     + estatusOriginal +
                           '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Contrato Equipo. Actualizar un Contrato'},  
                            params: {clasePhp: 'ModCRMDB',
                                    metodo:   'actualizarContrato',
                                    datos:    datos}  
                            }) // Fin de la llamada Ajax 
                    }
            }
        if (accion == 'Incluir Contrato') {
            if (bajarDatosVistaDatosContrato()) {
                   datos = '{"noContrato":"'          + noContrato +
                           '","idCliente":"'          + idCliente +
                           '","idVendedor":"'         + idVendedor +
                           '","porcComision":"'       + porcComision +
                           '","fechaInicio":"'        + fechaIniciox +
                           '","fechaTermina":"'       + fechaTerminacionx +
                           '","fechaPrimerPago":"'    + fechaPrimerPagox +
                           '","cantidadCanchas":"'    + cantCanchas +
                           '","cantidadUsuarios":"'   + cantUsuarios +
                           '","montoMesDolares":"'    + montoMesDolares +
                           '","mesesContrato":"'      + mesesContrato +
                           '","pagaPrimerMes":"'      + pagaPrimerMes +
                           '","cantidadPagos":"'      + cantPagos +
                           '","servicioFacturar":"'   + servicioFacturar +
                           '","fechaCambioEstatus":"' + fechaCambioEstatusx +
                           '","comentario":"'         + comentarioContrato +
                           '","estatus":"'            + estatus +
                           '","estatusOrginal":"'     + estatusOriginal +
                           '","pagosGnerados":"'      + pagosGenerados +
                           '"}'; 
                         Ext.Ajax.request({
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Objeto Contrato. Incluir un Contrato Nuevo'},  
                            params: {clasePhp: 'ModCRMDB',
                                    metodo:   'incluirContrato',
                                    datos:    datos}  
                            }) // Fin de la llamada Ajax
                    }        
         }
    },
    
//======================================================================================================================================

    clickBtnGenerarPagos: function(boton) {
        var window = Ext.ComponentQuery.query('#winDatosContrato')[0];
        var elMask = window.getEl();
        var store = Ext.StoreMgr.lookup('storeContrato');
        var index = window.indexStore;
        var este = this;
        var idContrato = store.data.items[index].data['IdContrato'];
        var pagosGenerados = store.data.items[index].data['PagosGenerados'];
        if (pagosGenerados == 'SI') {
             elMask.mask();
             elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Pagos ya fueron generados anteriormente.  Si desea generarlos de nuevo los debe borrar manualmente!!',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return;}

        var idCliente, noContrato, idVendedor, fechaInicio, fechaPrimerPago, cantCanchas, cantUsuarios,
            mesesContrato, montoMesDolares, pagaPrimerMes, cantPagos, estatus, 
            fechaPrimerPagox, fechaIniciox, servicioFacturar ;
        
        var bajarDatosVistaDatosContrato = function(){
            idCliente = window.query('#cmbIdCliente02')[0].getValue();
            noContrato = window.query('#txtNumeroContrato02')[0].getValue();
            mesesContrato =  window.query('#txtMesesContrato02')[0].getValue();
            montoMesDolares =  window.query('#txtMontoMesDolares02')[0].getValue();
            servicioFacturar =  window.query('#txtServicioFacturar02')[0].getValue();
            pagaPrimerMes = 'NO'; if (window.query('#rbtnSiPaga02')[0].getValue()) {pagaPrimerMes='SI';}
            if (pagaPrimerMes == 'NO') {cantPagos = mesesContrato - 1;} else {cantPagos = mesesContrato;}
            fechaInicio = window.query('#dateFechaInicio02')[0].getValue();
            if(fechaInicio =='0000-00-00') {fechaInicio=null;}
            fechaPrimerPago = new Date();
            if(fechaInicio!=null) {
                    fechaPrimerPago.setMonth(fechaInicio.getMonth() + 1);
                    var anno=fechaInicio.getFullYear();        
                    var mes=fechaInicio.getMonth()+1;
                    var dia=fechaInicio.getDate();
                    var cero1='', cero2=''; if (mes <= 9) {cero1='0';} if (dia <= 9) {cero2='0';}
                    fechaIniciox=anno+'-'+cero1+mes+'-'+cero2+dia;
                    anno=fechaPrimerPago.getFullYear();        
                    mes=fechaPrimerPago.getMonth()+1;
                    dia=fechaPrimerPago.getDate();
                    cero1='', cero2=''; if (mes <= 9) {cero1='0';} if (dia <= 9) {cero2='0';}
                    fechaPrimerPagox=anno+'-'+cero1+mes+'-'+cero2+dia;
                    fechaPrimerPago = fechaPrimerPagox;
            } else {fechaIniciox=null; fechaPrimerPagox=null;}
               
            estatus = window.query('#cmbStatus02')[0].getValue();
            if(mesesContrato == null)    {mesesContrato='';}
            if(pagaPrimerMes == null)    {pagaPrimerMes='';}
            if(montoMesDolares == null)  {montoMesDolares='';}
            if(estatus == null)    {estatus='';}
            if(idCliente == null)  {idCliente='';}
            if(idVendedor == null) {idVendedor='';}
            if(estatus == null) {estatus='';}
     
            var indError = false;
            if (noContrato.length == 0)      {indError=true;}
            if (idVendedor.length == 0)      {indError=true;}
            if (idCliente.length == 0)       {indError=true;}
            if (mesesContrato.length == 0)   {indError=true;}
            if (pagaPrimerMes.length == 0)   {indError=true;}
            if (montoMesDolares.length == 0) {indError=true;}
            if (fechaIniciox.length == 0)    {indError=true;}
            if (estatus.length == 0)         {indError=true;}
            
            if (indError) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Datos incompletos.  No se pueden generar los pagos!!',
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
                    return;  }
            if (obj.respuesta[0].mensaje.codigoError == '0000') {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Pagos generados correctamente.  Favor Revisar.',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        window.close();
                        return;}
            if (obj.respuesta[0].mensaje.codigoError != '0000') {
                        elMask.mask();
                        Ext.MessageBox.show({
                            title: 'Atenci\u00F3n',
                            msg: 'Pagos no fueron generados.  Existe un error.',
                            buttons: Ext.MessageBox.OK,
                            modal: false,
                            closable : false,
                            fn: finMsgError,
                            icon: Ext.MessageBox.ERROR});
                        return;}       
                 store.data.items[index].data['PagosGenerados']='SI';
                 este.clickBtnActualizarContrato();
        } //  Fin Funcion para cuando el Ajax Request responde correctamente
        
            var indError = bajarDatosVistaDatosContrato();
            if (indError) {
                    datos = '{"idContrato":"'         + idContrato +
                           '","idCliente":"'          + idCliente +
                           '","fechaInicio":"'        + fechaInicio +
                           '","fechaPrimerPago":"'    + fechaPrimerPago +
                           '","montoMesDolares":"'    + montoMesDolares +
                           '","mesesContrato":"'      + mesesContrato +
                           '","pagaPrimerMes":"'      + pagaPrimerMes +
                           '","cantidadPagos":"'      + cantPagos +
                           '","servicioFacturar":"'   + servicioFacturar +
                           '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Contrato Equipo. Generar los Pagos de un Contrato'},  
                            params: {clasePhp: 'ModCRMDB',
                                    metodo:   'generarPagosContrato',
                                    datos:    datos}  
                            }) // Fin de la llamada Ajax 
            }
    },
    
//======================================================================================================================================

    clickBtnSalirDatosContrato: function() {
          Ext.ComponentQuery.query('#winDatosContrato')[0].close();
        },
        
//======================================================================================================================================

    // Se cerro la Pantalla de Datos del Contrato
    closeWinDatosContrato: function() {
       //console.log('closeWinDatosContrato');
       semaforoAjaxMask=true;
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, // Fin de Se cerro la Pantalla de Datos del Contrato

//======================================================================================================================================

    // Render de la Pantalla GridContratos
    renderGridContratos: function() {
        console.log('renderGridContratos');
        var me = this;
        
        var cargarDatosVistaDatosContrato = function(vista,store,index){
            console.log(store);
            vista.setIdContrato(store.data.items[index].data['IdContrato']);
            vista.setIndexStore(index);
            vista.query('#txtNumeroContrato02')[0].setValue(store.data.items[index].data['NoContrato']);
            vista.query('#cmbIdCliente02')[0].setValue(store.data.items[index].data['IdCliente']);
            vista.query('#cmbIdVendedor02')[0].setValue(store.data.items[index].data['IdVendedor']);
            vista.query('#txtPorcComision02')[0].setValue(store.data.items[index].data['PorcComision']);
            vista.query('#txtCantCanchas02')[0].setValue(store.data.items[index].data['CantidadCanchas']);
            vista.query('#txtCantUsuarios02')[0].setValue(store.data.items[index].data['CantidadUsuarios']);
            vista.query('#txtComentarioContrato02')[0].setValue(store.data.items[index].data['ComentarioContrato']);
            vista.query('#txtMesesContrato02')[0].setValue(store.data.items[index].data['MesesContrato']);
            vista.query('#txtMontoMesDolares02')[0].setValue(store.data.items[index].data['MontoMesDolares']);
            vista.query('#txtServicioFacturar02')[0].setValue(store.data.items[index].data['ServicioFacturar']);
            vista.query('#txtCantidadPagos02')[0].setValue(store.data.items[index].data['CantidadPagos']);
            if (store.data.items[index].data['FechaInicioContrato'] == '0000-00-00') {store.data.items[index].data['FechaInicioContrato']=null;}
            vista.query('#dateFechaInicio02')[0].setValue(store.data.items[index].data['FechaInicioContrato']);
            if (store.data.items[index].data['FechaTerminacionContrato'] == '0000-00-00') {store.data.items[index].data['FechaTerminaContrato']=null;}
            vista.query('#dateFechaTerminacion02')[0].setValue(store.data.items[index].data['FechaTerminaContrato']);
            if (store.data.items[index].data['FechaPrimerPago'] == '0000-00-00') {store.data.items[index].data['FechaPrimerPago']=null;}
            vista.query('#dateFechaPrimerPago02')[0].setValue(store.data.items[index].data['FechaPrimerPago']);
            vista.query('#rbtnSiPaga02')[0].setValue(false); vista.query('#rbtnNoPaga02')[0].setValue(false);
            if (store.data.items[index].data['PagaPrimerMes'] == 'SI') {vista.query('#rbtnSiPaga02')[0].setValue(true);
                                                                } else {vista.query('#rbtnNoPaga02')[0].setValue(true);}
            vista.query('#cmbStatus02')[0].setValue(store.data.items[index].data['EstatusContrato']);
            vista.query('#lblPagosOk')[0].setVisible(false);
            if (store.data.items[index].data['PagosGenerados'] == 'SI') {vista.query('#lblPagosOk')[0].setVisible(true);}
            return;
        }
          
        var editarDatosContrato = function(grid,rowindex,colIndex) {
            //console.log('Editar Registro');
            var view = Ext.create('AJugarFutbol.view.administracionx1.DatosContrato');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Contrato - Editando Datos');
            var obj = view.query('#btnActualizarContrato');
            obj[0].setDisabled(false);
            obj[0].setText('Actualizar Datos');
            obj[0].setTooltip('Dar click para actualizar los datos de este Contrato');
            view.query('#btnGenerarPagos')[0].setDisabled(false);
            view.query('#txtNumeroContrato02')[0].setReadOnly(true);
            cargarDatosVistaDatosContrato(view,grid.store,rowindex);
          }
          
        var visualizarPagosContrato  = function(grid,rowindex,colIndex) {
          
            var view = Ext.create('AJugarFutbol.view.administradorx1.PagosContrato');                    
            var obj = view.query('#lblCedulaRolCliente');    
            obj[0].setValue('<b>'+grid.store.data.items[rowindex].data['NoCedula']+'</b>');          

            obj = view.query('#lblNombreRolCliente');    
            obj[0].setValue('<b>'+grid.store.data.items[rowindex].data['NombreCompleto']+'</b>');   

            obj = view.query('#lblCedulaRolCliente');              
            obj[0]['idPersona']=grid.store.data.items[rowindex].data['IdPersona']; 

            semaforoAjaxMask=false;
            
            var failureAjaxFn = function(response, request) {  
                var errMessage = 'Error en la petición' + request.url + ' '  
                + ' status ' + response.status + ''  
                + ' statusText ' + response.statusText + ''  
                + ' responseText ' + response.responseText + '';
                view.close();
                alert("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                return;    
            }  // Fin Funcion para cuando falla el Ajax Request

            var successAjaxFn = function(response, request) {              
                var obj = Ext.JSON.decode(response.responseText,true);
                if (obj == null) {
                    view.close();
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    return;
                }
                var cantFilas=obj.respuesta[0].mensaje.CantFilas; 
                var cantRolles=obj.respuesta[0].mensaje.CantRolles; 
                if(cantFilas>0) {
                    canchasInstalacion.removeAll();                
                    for(var i=0;i<cantFilas;i++) { canchasInstalacion.add({id:obj.respuesta[1].results[0][i].id,
                                                                           nombre:obj.respuesta[1].results[0][i].NombreCancha,
                                                                           tipoHora:obj.respuesta[1].results[0][i].TipoHora});}                                                                                          
                }
                else { Ext.MessageBox.show({
                            title: 'Mensaje',
                            msg: 'No se encontraron Pagos para este Contrato!!',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO});
                        return; }
            
            var storePagos = Ext.create('Ext.data.Store', {
                                        fields: ['id', 'MesCobro', 'MontoDolares', 'FechaVencimiento', 
                                                'FormaPago', 'NoDocumento', 'FechaPgo', 'BancoDeposito', 'NoRecibo']});
            for (i=0; i<cantRolles; i++) {               
                    var fechaInicial=obj.respuesta[1].results[1][i].FechaHoraReservacion;
                    fechaInicial=fechaInicial.replace("-", "/" );
                    fechaInicial=fechaInicial.replace("-", "/" );   
                    fechaInicial=new Date(fechaInicial);
                    var mes=fechaInicial.getMonth()+1;
                    fechaInicial=fechaInicial.getDate()+'/'+mes+'/'+fechaInicial.getFullYear();   

                    var fechaFinal=obj.respuesta[1].results[1][i].FechaHoraFinal;
                    fechaFinal=fechaFinal.replace("-", "/" );
                    fechaFinal=fechaFinal.replace("-", "/" );   
                    fechaFinal=new Date(fechaFinal);
                    mes=fechaFinal.getMonth()+1;
                    var hora=fechaFinal.getHours();
                    var minutos=fechaFinal.getMinutes();
                    if(minutos==0){minutos='00';}
                    var dia=fechaFinal.getDay();
                    fechaFinal=fechaFinal.getDate()+'/'+mes+'/'+fechaFinal.getFullYear();   
               
                    if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
                    if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
                    {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
                    {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}                           
                     else{if(horaReservacion==22){horaReservacion=10;ampmReservacion='de la noche';}else{horaReservacion=11;ampmReservacion='de la noche';} }}}}}}}}}}
                    if(horaReservacion==12){ampmReservacion='de la tarde';}               
                    var HoraFinal=horaReservacion + ':' + minutos + ' '+ ampmReservacion;
                    
                    var comentario = obj.respuesta[1].results[1][i].Comentario; 
                    while(comentario.indexOf('%0A')!=-1) {comentario = comentario.replace('%0A','. ');}      
                    comentario = unescape(comentario);
                    storeRolles.add({ id             : obj.respuesta[1].results[1][i].id,
                                IdPersona        : obj.respuesta[1].results[1][i].IdPersona,
                                diaHora          : dia+' a las '+HoraFinal,
                                IdCancha         : obj.respuesta[1].results[1][i].IdCancha,
                                NombreCancha     : obj.respuesta[1].results[1][i].NombreCancha,
                                FechaHoraReservacion  : fechaInicial,
                                FechaHoraFinal   :fechaFinal,
                                TiempoRol        : obj.respuesta[1].results[1][i].TiempoRol,
                                Comentario       : comentario
                                });
                        } // Fin del For para llenar el store de Rolles

                var tplRolles = new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="roll-wrap">',
                        '<div class="roll-box">',
                                '<br>',
                                '<span class="x-Fecha-Roll">      <b style="margin-left:20px;">D&iacute;a y Hora:</b> Todos los      {diaHora} </span> <br>',
                                '<span class="x-Fecha-Roll">      <b style="margin-left:20px;">Fecha Inicio: </b>      {FechaHoraReservacion} </span> <br>',
                                '<span class="x-Fecha-Roll">      <b style="margin-left:20px;">Fecha Final: </b>       {FechaHoraFinal} </span> <br>',
                                '<span class="x-Cancha-Roll">     <b style="margin-left:20px;">Cancha: </b>     {NombreCancha}         </span> <br>',
                                '<span class="x-Tiempo-Roll">     <b style="margin-left:20px;">Tiempo: </b>     {TiempoRol}            </span> <br>',
                                '<span class="x-Comentario-Roll"> <b style="margin-left:20px;">Comentario: </b> {Comentario}           </span> <br>',
                                '<center><button class="x-boton-Roll" type="button" style="width:90px;height:25px;margin-top:5px;margin-bottom:10px;"> Eliminar </button></center>',                            
                        '</div>',
                        '</div>',
                    '</tpl>',
                    '<div class="x-clear"></div>');


                var dvRolles = new Ext.view.View({
                        id:    'dvRolles',
                        itemId: 'dvRolles',
                        autoScroll: true,
                        store: storeRolles, 
                        tpl: tplRolles,
                        trackOver: true,
                        width: 380,
                        multiSelect: false,
                        overClass: 'x-view-over', 
                        itemSelector: 'div.roll-wrap',
                        emptyText: 'No hay rolles para desplegar!',
                        border: true
                    });

                view.query('#pnlListaRoles01')[0].add([dvRolles]);
                me.mon(view.query('#pnlListaRoles01')[0].getEl(), {click: {fn: me.EliminarRoll, scope: me}});

            }  // Find de Funcion para cuando el Ajax Request responde correctamente


            var datos = '{"idInstalacion":"' + idInstalacion +
                        '","idPersona":"'     + grid.store.data.items[rowindex].data['IdPersona'] +
                        '"}';              
            Ext.Ajax.request({  
                url: 'php/RouterDBAJugarFutbol.php',  
                method: 'POST',               
                success: successAjaxFn,  
                failure: failureAjaxFn, 
                timeout: 30000,  
                headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta los Pagos de un Contrato'},  
                params: {clasePhp: 'ModCRMDB',
                        metodo:   'getPagosContrato',
                        datos:    datos}  
                }); // Fin de la llamada Ajax

            view.show();
            var panelPapa = Ext.ComponentQuery.query('#viewport');
            panelPapa = panelPapa[0];
            panelPapa.getEl().mask();
            return;
          
            
            
        }
          
        var eliminarContrato = function(grid,rowindex,colIndex) {
            var view = Ext.create('AJugarFutbol.view.administracionx1.DatosContrato');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Contrato - Eliminando Datos');
            var obj = view.query('#btnActualizarContrato');
            obj[0].setDisabled(false);
            obj[0].setText('Eliminar Contrato');
            obj[0].setTooltip('Dar click para eliminar este Contrato');
            view.query('#btnGenerarPagos')[0].setDisabled(true);
            cargarDatosVistaDatosContrato(view,grid.store,rowindex);
          }  
        var filtroNombre = '';
        var datos = '{"filtroNombre":"' + filtroNombre + '"}'; 
                 
        var storeContrato = Ext.create('Ext.data.Store', {
                           storeId: 'storeContrato',
                           pageSize: 18, 
                           proxy: {
                                    type: 'ajax',
                                    actionMethods : 'POST',
                                    timeout: 30000,
                                    url: 'php/RouterDBAJugarFutbol.php', 
                                    extraParams: {
                                                  clasePhp: 'ModCRMDB',
                                                  metodo:   'getCargaGridContratos',
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
                            fields: [ 'IdContrato',
                                      'NoContrato',
                                      'IdCliente',
                                      'NombreInstalacion',
                                      'IdVendedor',
                                      'NombreCompletoVendedor',
                                      'PorcComision',
                                      'CantidadCanchas',
                                      'CantidadUsuarios',
                                      'MontoMesDolares',
                                      'MesesContrato',
                                      'PagaPrimerMes',
                                      'CantidadPagos',
                                      'FechaInicioContrato',
                                      'FechaTerminaContrato',
                                      'FechaCambioEstatus',
                                      'FechaPrimerPago',
                                      'ServicioFacturar',
                                      'ComentarioContrato',
                                      'EstatusContrato',
                                      'Descripcion',
                                      'PagosGenerados',
                                      'EstatusOriginal',
                                      'FechaCambioEstatusOrg']});
        
        var gridContratos = Ext.create('Ext.grid.Panel', {
                    id:     'grdPnlContratos02',
                    itemId: 'grdPnlContratos02',
                    width: 720,
                    height: 455,
                    store: storeContrato,
                    renderTo: 'pnlContratos02-body',
                    viewConfig: {loadingText: undefined, loadMask: false,
                                 listeners: {itemdblclick: {fn: function(dataview, record, item, index, e) {editarDatosContrato(dataview,index,0);}}}},
     
                    columns:[
                           {
                                id: 'NoContrato',
                                text: "Contrato",
                                dataIndex: 'NoContrato',
                                width: 50,
                                sortable: true, 
                                align: 'center'
                            },
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
                                width: 140,
                                sortable: false,
                                align: 'center'
                            },{
                                text: "Fecha Estatus",
                                dataIndex: 'FechaCambioEstatus',
                                width: 90,
                                sortable: false,
                                align: 'center'
                            },{
                                xtype:'actioncolumn',
                                    width: 130,
                                    items: [{
                                            icon: 'resources/imagenes/editar.png',
                                            tooltip: 'Editar los datos del Contrato',
                                            iconCls: 'x-icon-grid',
                                            handler: editarDatosContrato

                                            },{
                                            icon: 'resources/imagenes/Pagos.jpg',
                                            tooltip: 'Ver Pagos del Contrato',
                                            iconCls: 'x-icon-grid',
                                            handler: visualizarPagosContrato
                                            },
                                            {
                                            icon: 'resources/imagenes/delete.png',
                                            tooltip: 'Eliminar el Contrato',
                                            iconCls: 'x-icon-grid',
                                            handler: eliminarContrato
                                            }
                                    ]

                            },
                    ],
                    // paging bar on the bottom
                    bbar: Ext.create('Ext.PagingToolbar', {
                        store: storeContrato,
                        displayInfo: true,
                        displayMsg: 'Desplegando Contratos {0} - {1} de {2}',
                        nextText:  'Pr\u00F3xima p\u00E1gina',
                        firstText: 'Primer p\u00E1gina',
                        lastText:  'Ultima p\u00E1gina',
                        prevText:  'p\u00E1gina anterior',
                        refreshText: 'Refrescar los datos',
                        afterPageText: 'de {0}',
                        beforePageText: 'p\u00E1gina',
                        emptyMsg: "No hay Contratos para desplegar",
                        items:[]
                        })
            });

        Ext.ComponentQuery.query('#pnlGridContratos')[0].query('#txtFiltro02')[0].setValue('');
        storeContrato.loadPage(1);
        window.scrollTo(0,0);
    
    }, // Fin de Render de la Pantalla GridContratos


//=====================================================================================================================================

    // Se cerro la Pantalla de Registrarse
    closeGridContratos: function() {
       //console.log('Se cerro la vista GridContrato');
      
      }, // Fin de Se cerro la Pantalla de GridContrato

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
       if (campo.tipoCampo == 'NumerosConPunto') {caracteresValidos  = '0123456789.';}
       if (campo.tipoCampo == 'Numeros-guiones') {caracteresValidos  = '0123456789-';}
       if (campo.tipoCampo == 'Letras-Numeros') {caracteresValidos  = 'áéíóúabcdefghijklmnopqrsutvwxyzABCDEFGHIJKLMNOPQRSUTVXWYZ0123456789'+'\u00D1'+'\u00F1'}
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
