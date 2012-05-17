Ext.define('AJugarFutbol.controller.administrador.Clientes', {
    extend: 'Ext.app.Controller',

    stores: [],

    models: [],
    
    init: function() {
         ////console.log('Inicializando Controlador Clientes');
         me = this;
         this.control({ 
           
            // Eventos de la Pantalla de Grid de Clientes 
            'pnlGridClientes button[id=btnFiltrarNombreCliente]':   {click: this.clickBtnFiltrarClientes},
            'pnlGridClientes textfield[id=txtFiltro01]':            {keyup: this.enterFiltroNombre},
            'pnlGridClientes button[id=btnIncluirClienteNuevo]':    {click: this.clickBtnInsertarClienteNuevo},
            'pnlGridClientes checkbox[id=checkboxControl]':         {change: this.changecheckboxControl},
            'pnlGridClientes panel[id=pnlClientes01]':              {render: this.renderGridClientes},
            'pnlGridClientes' :                                     {hide: this.hideWindow, close: this.closeGridClientes},
            
            // Eventos de la Pantalla de Datos del Cliente
            'winDatosCliente combobox[id=cmbProvincia01]':       {select: this.winDatosClienteSeleccionoProvinciaCmb},
            'winDatosCliente combobox[id=cmbCanton01]':          {select: this.winDatosClienteSeleccionoCantonCmb},
            'winDatosCliente button[id=btnActualizarCliente]':   {click: this.clickBtnActualizarCliente},
            'winDatosCliente button[id=btnSalirDatosCliente]':   {click: this.clickBtnSalirDatosCliente},
            'winDatosCliente panel[id=pnlDatosCliente01]':       {render: this.renderPnlDatosCliente},
            'winDatosCliente textfield[id=txtCedulaCliente01]':     {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtNombreCliente01]':     {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtApellidoCliente01]':   {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtTelefono1Cliente]':    {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtTelefono2Cliente]':    {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtEMailCliente]':        {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtNivelConfianza01]':    {keyup: this.validarCampo},
            'winDatosCliente textfield[id=txtComentarioCliente01]': {keyup: this.validarCampo},
            'winDatosCliente fileuploadfield[id=fileFotoUsuario]':  {change: this.changeSeleccionoFileFoto},
            'winDatosCliente':                                      {hide: this.hideWindow, 
                                                                     show: this.showWinDatosCliente,                 
                                                                     close: this.closeWinDatosCliente},
            //Eventos de la Pantalla de Rol de Clientes                                                                 
            'winRolCliente':                                        {hide: this.hideWindow,                                                                      
                                                                     close: this.closeWinDatosCliente},
            'winRolCliente button[itemId=btnAgregarRolCliente]':    {click: this.agregaRolCliente},
            'winRolCliente datefield[itemId=dteFechaInicio]':       {change: this.seleccionoFechaRol},
            'winRolCliente combobox[id=cmbCanchaRolCliente]':       {select: this.winRolClienteSeleccionoCanchaCmb}
       
        });
        
    },
    

//=====================================================================================================================================   
 
    // Selecciono File de la Foto a cargar al servidor en la Pantalla de Editar Perfil. 
    changeSeleccionoFileFoto: function() {
        var win = Ext.ComponentQuery.query('#winDatosCliente');
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
    }, // Fin de Tecla Enter en el campo contrase�a de la ventana Login

//========================================================================================================================== 
    
    showWinDatosCliente: function() {
        //console.log('showWinDatosCliente');
        var win = Ext.ComponentQuery.query('#winDatosCliente'); 
        win=win[0];
      
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
        storeProvincias.filter('TipoRegistro','1');
        
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
        var pnlGrdClientes = Ext.ComponentQuery.query('#pnlGridClientes')[0]; 
        var idInstalacion = Ext.ComponentQuery.query('#btnAdministracion')[0]['idInstalacion']; 
        var filtroNombre = pnlGrdClientes.query('#txtFiltro01')[0].getValue();
        if(pnlGrdClientes.query('#checkboxLunx')[0].getValue()) {var filtroLun = '1';} else {filtroLun='9';}
        if(pnlGrdClientes.query('#checkboxMarx')[0].getValue()) {var filtroMar = '1';} else {filtroMar='9';}
        if(pnlGrdClientes.query('#checkboxMiex')[0].getValue()) {var filtroMie = '1';} else {filtroMie='9';}
        if(pnlGrdClientes.query('#checkboxJuex')[0].getValue()) {var filtroJue = '1';} else {filtroJue='9';}
        if(pnlGrdClientes.query('#checkboxViex')[0].getValue()) {var filtroVie = '1';} else {filtroVie='9';}
        if(pnlGrdClientes.query('#checkboxSabx')[0].getValue()) {var filtroSab = '1';} else {filtroSab='9';}
        if(pnlGrdClientes.query('#checkboxDomx')[0].getValue()) {var filtroDom = '1';} else {filtroDom='9';}
        var datos = '{"idInstalacion":"'  + idInstalacion +
                     '","filtroNombre":"' + filtroNombre +
                     '","filtroLun":"'  + filtroLun +
                     '","filtroMar":"'  + filtroMar +
                     '","filtroMie":"'  + filtroMie +
                     '","filtroJue":"'  + filtroJue +
                     '","filtroVie":"'  + filtroVie +
                     '","filtroSab":"'  + filtroSab +
                     '","filtroDom":"'  + filtroDom +
                     '"}'; 
        var grdClientes = Ext.ComponentQuery.query('#grdPnlClientes01')[0];
        grdClientes.store.proxy.extraParams.datos = datos;
        grdClientes.store.loadPage(1);
        window.scrollTo(0,0);
    }, // Fin de Click en Boton Filtar Clientes

//======================================================================================================================================    

    clickBtnInsertarClienteNuevo:  function() {
          ////console.log('insertar Cliente Nuevo');
          var view = Ext.create('AJugarFutbol.view.administrador.DatosCliente');          
          view.show();    
          view.setTitle('Informaci\u00F3n de Cliente - Incluyendo Cliente');
          var obj = view.query('#btnActualizarCliente');
          obj[0].setDisabled(false);
          obj[0].setText('Incluir Cliente');
          obj[0].setTooltip('Dar click para incluir los datos de este Cliente');
          
          obj = view.query('#formFileFoto');
          obj[0].setVisible(false);
          
          view.query('#rbtnMasculinoCliente01')[0].setValue(true);
          view.query('#rbtnFemeninoCliente01')[0].setValue(false);
          }, // Fin de Click en Boton Filtar Clientes

//==========================================================================================================================

   changecheckboxControl:  function() {
        if(Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxControl')[0].getValue()) {
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxLunx')[0].setValue(true);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMarx')[0].setValue(true);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMiex')[0].setValue(true);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxJuex')[0].setValue(true);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxViex')[0].setValue(true);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxSabx')[0].setValue(true);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxDomx')[0].setValue(true);
        } else {
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxLunx')[0].setValue(false);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMarx')[0].setValue(false);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMiex')[0].setValue(false);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxJuex')[0].setValue(false);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxViex')[0].setValue(false);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxSabx')[0].setValue(false);
                    Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxDomx')[0].setValue(false);
        }        
   }, // Fin de change check box Control

//==========================================================================================================================

// Render de la Pantalla de Datos del Cliente
   renderPnlDatosCliente: function() {
        var win = Ext.ComponentQuery.query('#winDatosCliente'); 
        win=win[0];
        
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
        ////console.log('clickBtnActualizarCliente');
        var window = Ext.ComponentQuery.query('#winDatosCliente')[0];
        var elMask = window.getEl();
        var grid = Ext.ComponentQuery.query('#grdPnlClientes01')[0];
        var accion = window.query('#btnActualizarCliente')[0].getText();
        var store = Ext.StoreMgr.lookup('storeCliente');
        var index = window.indexStore;
        var este = this;
        if (accion != 'Incluir Cliente') {
                var idPersona     = store.data.items[index].data['IdPersona'];
                var idInstalacion = store.data.items[index].data['IdInstalacion'];
                var esUsuario     = store.data.items[index].data['EsUsuario'];
                var esCliente     = store.data.items[index].data['EsCliente'];
               } else {idPersona=0;
                       idInstalacion = Ext.ComponentQuery.query('#btnAdministracion')[0].idInstalacion;
                       esUsuario='??'; esCliente= '??'}
        var noCedula, apellidos, nombre, telCelular, telefono2, eMail, fechaNacimiento, fechaNacimientox, codProv, codCanton, codDist, genero;
        var comentario, nivelConfianza, juegaLun, juegaMar, juegaMie, juegaJue, juegaVie, juegaSab, juegaDom;
         
        var bajarDatosVistaDatosCliente = function(){
            noCedula = window.query('#txtCedulaCliente01')[0].getValue();
            apellidos = window.query('#txtApellidoCliente01')[0].getValue();
            nombre = window.query('#txtNombreCliente01')[0].getValue();
            telCelular = window.query('#txtTelefono1Cliente')[0].getValue();
            telefono2 = window.query('#txtTelefono2Cliente')[0].getValue();
            eMail = window.query('#txtEMailCliente')[0].getValue();
            fechaNacimiento = window.query('#dateFechaNacimiento01')[0].getValue();
            if(fechaNacimiento =='0000-00-00') {fechaNacimiento=null;}
            if(fechaNacimiento!=null) {
                    var anno=fechaNacimiento.getFullYear();        
                    var mes=fechaNacimiento.getMonth()+1;
                    var dia=fechaNacimiento.getDate();               
                    fechaNacimientox=anno+'-'+mes+'-'+dia; 
            } else {fechaNacimientox=null;}
            codProv = window.query('#cmbProvincia01')[0].getValue();
            codCanton = window.query('#cmbCanton01')[0].getValue();
            codDist = window.query('#cmbDistrito01')[0].getValue();
            genero = 'F';
            if (window.query('#rbtnMasculinoCliente01')[0].getValue()) {genero = 'M';}
            comentario = window.query('#txtComentarioCliente01')[0].getValue();
                   
            if (window.query('#rdbNoseDatosCliente')[0].getValue())      {nivelConfianza = '1';}
            if (window.query('#rdbMaloDatosCliente')[0].getValue())      {nivelConfianza = '2';}
            if (window.query('#rdbRegularDatosCliente')[0].getValue())   {nivelConfianza = '3';}
            if (window.query('#rdbBuenoDatosCliente')[0].getValue())     {nivelConfianza = '4';}
            if (window.query('#rdbExcelenteDatosCliente')[0].getValue()) {nivelConfianza = '5';} 
            
            juegaLun=0; juegaMar=0; juegaMie=0; juegaJue=0; juegaVie=0; juegaSab=0; juegaDom=0;
            if(window.query('#checkboxLun')[0].getValue() == true) {juegaLun=1;}
            if(window.query('#checkboxMar')[0].getValue() == true) {juegaMar=1;}
            if(window.query('#checkboxMie')[0].getValue() == true) {juegaMie=1;}
            if(window.query('#checkboxJue')[0].getValue() == true) {juegaJue=1;}
            if(window.query('#checkboxVie')[0].getValue() == true) {juegaVie=1;}
            if(window.query('#checkboxSab')[0].getValue() == true) {juegaSab=1;}
            if(window.query('#checkboxDom')[0].getValue() == true) {juegaDom=1;}
           
            if (eMail.length > 0) {
                var patronEMail = /^[a-z0-9\_\-\.]+@[a-z0-9\_\-\.]+\.[a-z]{2,}$/i;
                if (!patronEMail.test(eMail)) {
                    elMask.mask();
                    Ext.MessageBox.show({
                        title: 'Atenci\u00F3n',
                        msg: 'EMail es invalido. Solo se permiten letras: [a-z/A-Z], N\u00FAmeros: [0-1] y los siguientes caracteres: [.-_] y debe tener el siguiente formato: xxxxxxx@dominio.XXX',
                        buttons: Ext.MessageBox.OK,
                        modal: false,
                        closable : false,
                        fn: finMsgError,
                        icon: Ext.MessageBox.ERROR});
                    return false;
               }
            }
            if (noCedula.length == 0 && eMail.length == 0) {
                   elMask.mask();
                   Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Se debe digitar un N\u00FAmero de C\u00E9dula o un EMail',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
               }
              if (nombre.length == 0) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Se debe digitar un Nombre',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
                }
            if (apellidos.length == 0) {
                  elMask.mask();
                  Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Se debe digitar al menos un Apellido',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
                }
            if (telCelular.length == 0 && telefono2 == 0) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'Se debe digitar al menos un N\u00FAmero de Tel\u00E9fono',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
                }
            if ((telCelular.length < 8  && telCelular.length > 0) || (telefono2.length < 8 && telefono2.length > 0)) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci&oacuten',
                      msg: 'Los Tel\u00E9fonos deben tener 8 digitos',
                      buttons: Ext.MessageBox.OK,
                      modal: false,
                      closable : false,
                      fn: finMsgError,
                      icon: Ext.MessageBox.ERROR});
                  return false;
                }
            if (noCedula.length < 9 && noCedula.length > 0) {
                 elMask.mask();
                 Ext.MessageBox.show({
                      title: 'Atenci\u00F3n',
                      msg: 'El N\u00FAmero de C\u00E9dula debe tener m\u00EDnimo 9 digitos',
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
            store.data.items[index].data['NoCedula'] = noCedula;
            store.data.items[index].data['Apellidos'] = apellidos;
            store.data.items[index].data['Nombre'] = nombre;
            store.data.items[index].data['NombreCompleto'] = nombre + ' ' + apellidos;
            store.data.items[index].data['TelCelular'] = telCelular;
            store.data.items[index].data['Telefono2'] = telefono2;
            store.data.items[index].data['FechaNacimiento'] = fechaNacimiento;
            store.data.items[index].data['CodProv'] = codProv;
            store.data.items[index].data['CodCanton'] = codCanton;
            store.data.items[index].data['CodDist'] = codDist;
            store.data.items[index].data['Genero'] = genero; 
            store.data.items[index].data['EMail'] = eMail;
            store.data.items[index].data['Comentario'] = comentario;
            store.data.items[index].data['NivelConfianza'] = nivelConfianza;
            store.data.items[index].data['JuegaLun'] = juegaLun;
            store.data.items[index].data['JuegaMar'] = juegaMar;
            store.data.items[index].data['JuegaMie'] = juegaMie;
            store.data.items[index].data['JuegaJue'] = juegaJue;
            store.data.items[index].data['JuegaVie'] = juegaVie;
            store.data.items[index].data['JuegaSab'] = juegaSab;
            store.data.items[index].data['JuegaDom'] = juegaDom;
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
                 ////console.log('incluir final');
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
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxControl')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxLunx')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMarx')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMiex')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxJuex')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxViex')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxSabx')[0].setValue(true);
                 Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxDomx')[0].setValue(true);
                 este.clickBtnFiltrarClientes();
                 }
                 
            if (accion == 'Eliminar Cliente') {
                  este.clickBtnFiltrarClientes();
                 }
            
            if (accion == 'Actualizar Datos') {
                if (obj.respuesta[0].mensaje.codigoError == '0005') {
                            elMask.mask();
                            Ext.MessageBox.show({
                                title: 'Atenci\u00F3n',
                                msg: 'EMail ya Existe en este Cliente: ' + obj.respuesta[0].mensaje.nombreYaExiste,
                                buttons: Ext.MessageBox.OK,
                                modal: false,
                                closable : false,
                                fn: finMsgError,
                                icon: Ext.MessageBox.ERROR});
                            return;}
                    if (obj.respuesta[0].mensaje.codigoError == '0006') {
                            elMask.mask();
                            Ext.MessageBox.show({
                                title: 'Atenci\u00F3n',
                                msg: 'N\u00FAmero de C\u00E9dula ya Existe en este Cliente: ' + obj.respuesta[0].mensaje.nombreYaExiste,
                                buttons: Ext.MessageBox.OK,
                                modal: false,
                                closable : false,
                                fn: finMsgError,
                                icon: Ext.MessageBox.ERROR});
                             return;}
                 actualizarStore();
                 grid.getView().refresh();
                 }
            
        window.close();
       
        } //  Fin Funcion para cuando el Ajax Request responde correctamente
        
        if (accion == 'Eliminar Cliente') { 
            ////console.log('eliminar');
            store.removeAt(window.indexStore);
            var datos = '{"idPersona":"'     + idPersona +
                       '","idInstalacion":"' + idInstalacion +
                       '","esUsuario":"'     + esUsuario +
                       '","esCliente":"'     + esCliente + '"}'; 
            Ext.Ajax.request({  
                    url: 'php/RouterDBAJugarFutbol.php',  
                    method: 'POST',  
                    success: successAjaxFn,  
                    failure: failureAjaxFn, 
                    timeout: 30000,  
                    headers: {'cabecera': 'Operaciones de DB al Objeto Equipo. Eliminar un Cliente'},  
                    params: {clasePhp: 'ClienteDB',
                            metodo:   'eliminarCliente',
                            datos:    datos}  
                    }) // Fin de la llamada Ajax 
            }
        
        if (accion == 'Actualizar Datos') { 
            var indError = bajarDatosVistaDatosCliente();
            var cambioCedula = 0;
            var cambioEMail = 0;
            if (store.data.items[index].data['NoCedula'] != noCedula) {cambioCedula=1;}
            if (store.data.items[index].data['EMail'] != eMail) {cambioEMail=1;}
            if (indError) {
                    datos = '{"idPersona":"'       + idPersona +
                        '","idInstalacion":"'   + idInstalacion +
                        '","esUsuario":"'       + esUsuario +
                        '","esCliente":"'       + esCliente +
                        '","cambioCedula":"'    + cambioCedula +
                        '","cambioEMail":"'     + cambioEMail +
                        '","nombre":"'          + nombre +
                        '","apellidos":"'       + apellidos +
                        '","eMail":"'           + eMail +
                        '","noCedula":"'        + noCedula +
                        '","telCelular":"'      + telCelular +
                        '","telefono2":"'       + telefono2 +
                        '","genero":"'          + genero +
                        '","fechaNacimiento":"' + fechaNacimientox +
                        '","codProv":"'         + codProv +
                        '","codCanton":"'       + codCanton +
                        '","codDist":"'         + codDist +
                        '","comentario":"'      + comentario +
                        '","nivelConfianza":"'  + nivelConfianza +
                        '","juegaLun":"'        + juegaLun +
                        '","juegaMar":"'        + juegaMar +
                        '","juegaMie":"'        + juegaMie +
                        '","juegaJue":"'        + juegaJue +
                        '","juegaVie":"'        + juegaVie +
                        '","juegaSab":"'        + juegaSab +
                        '","juegaDom":"'        + juegaDom +
                            '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Cliente Equipo. Actualizar un Cliente'},  
                            params: {clasePhp: 'ClienteDB',
                                    metodo:   'actualizarCliente',
                                    datos:    datos}  
                            }) // Fin de la llamada Ajax 
                    }
            }
        if (accion == 'Incluir Cliente') {
            //console.log('incluir');
            if (bajarDatosVistaDatosCliente()) {
                    datos = '{"idInstalacion":"'   + idInstalacion +
                        '","nombre":"'          + nombre +
                        '","apellidos":"'       + apellidos +
                        '","eMail":"'           + eMail +
                        '","noCedula":"'        + noCedula +
                        '","telCelular":"'      + telCelular +
                        '","telefono2":"'       + telefono2 +
                        '","genero":"'          + genero +
                        '","fechaNacimiento":"' + fechaNacimientox +
                        '","codProv":"'         + codProv +
                        '","codCanton":"'       + codCanton +
                        '","codDist":"'         + codDist +
                        '","comentario":"'      + comentario +
                        '","nivelConfianza":"'  + nivelConfianza +
                        '","juegaLun":"'        + juegaLun +
                        '","juegaMar":"'        + juegaMar +
                        '","juegaMie":"'        + juegaMie +
                        '","juegaJue":"'        + juegaJue +
                        '","juegaVie":"'        + juegaVie +
                        '","juegaSab":"'        + juegaSab +
                        '","juegaDom":"'        + juegaDom +
                            '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Objeto Cliente. Incluir un Cliente Nuevo'},  
                            params: {clasePhp: 'ClienteDB',
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
 seleccionoFechaRol: function() {
    var fechaInicio= Ext.ComponentQuery.query('#dteFechaInicio');
    fechaInicio = fechaInicio[0].getValue(); 
                        
    fechaInicio=new Date(fechaInicio);
    var dia=fechaInicio.getDay();
    
     var diaRol= Ext.ComponentQuery.query('#lblDiaMuestraRol');
     diaRol = diaRol[0];
    
    if(dia==1){diaRol.setValue('<b>Todos los lunes</b>');}
    if(dia==2){diaRol.setValue('<b>Todos los martes</b>');}
    if(dia==3){diaRol.setValue('<b>Todos los mi&eacute;rcoles</b>');}
    if(dia==4){diaRol.setValue('<b>Todos los jueves</b>');}
    if(dia==5){diaRol.setValue('<b>Todos los viernes</b>');}
    if(dia==6){diaRol.setValue('<b>Todos los s&aacute;bados</b>');}
    if(dia==0){diaRol.setValue('<b>Todos los domingos</b>');}
       
    },
//======================================================================================================================================
    // Click en agregar rol cliente en la ventana Rol de cliente
 agregaRolCliente: function() {
        
     var botonRol= Ext.ComponentQuery.query('#btnAgregarRolCliente')[0];
     botonRol.setDisabled(true);
     
        var win= Ext.ComponentQuery.query('#winRolCliente')[0];                
        
        var cuantoTiempo= Ext.ComponentQuery.query('#cmbTiempoRolCliente');
        var cuantoTiempoDisplay=cuantoTiempo[0].getRawValue();
        cuantoTiempo = cuantoTiempo[0].getValue();       
        
        var idCancha= Ext.ComponentQuery.query('#cmbCanchaRolCliente');
        idCancha = idCancha[0].getValue();
        
        var avisar= Ext.ComponentQuery.query('#rdbAvisarRolCliente');
        avisar = avisar[0].getValue();
        
        var omitir= Ext.ComponentQuery.query('#rdbOmitirRolCliente');
        omitir = omitir[0].getValue();
        
        var hora= Ext.ComponentQuery.query('#timeHoraRolCliente');
        hora = hora[0].getValue();      
        
        if(hora==24)
            {
                Ext.MessageBox.show({
                 title: 'Atenci&oacute;n',
                 msg: 'La hora del Rol es incorrecto',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});
              botonRol.setDisabled(false);
            return;
            }
        
        var comentario= Ext.ComponentQuery.query('#txtComentarioRolCliente');
        comentario = comentario[0].getValue();
        comentario = escape(comentario);

        var idPersona= Ext.ComponentQuery.query('#lblCedulaRolCliente');
        idPersona = idPersona[0]['idPersona'];
                
        var fechaInicio= Ext.ComponentQuery.query('#dteFechaInicio');
        fechaInicio = fechaInicio[0].getValue();                       
        
        if(fechaInicio==null||cuantoTiempo==null||idCancha==null||hora==null)
        {
            Ext.MessageBox.show({
             title: 'Atenci&oacute;n',
             msg: 'Faltan datos importantes',
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.ERROR});  
         botonRol.setDisabled(false);
         return;
        }        
        if(avisar==false&&omitir==false)
        {
            Ext.MessageBox.show({
             title: 'Atenci&oacute;n',
             msg: 'Debe seleccionar la opci\u00F3n "Importante"',
             buttons: Ext.MessageBox.OK,
             icon: Ext.MessageBox.ERROR});              
         botonRol.setDisabled(false);
         return;
        }        
       //hora=hora.getHours();
       var mes=fechaInicio.getMonth()+1;
       var dia=fechaInicio.getDay();
       if(dia==0){dia=6;}else{dia=dia-1;}
       fechaInicio=fechaInicio.getFullYear()+'-'+mes+'-'+fechaInicio.getDate();        
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              alert ("El servidor no contesto en la última transacción por un error en Internet.  Refresque los datos y revise si el rol fue agregado.");
              botonRol.setDisabled(false);
              win.close();
              }  // Fin Funcion para cuando falla el Ajax Request
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
               var obj = Ext.JSON.decode(response.responseText,true);                                         
               if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    botonRol.setDisabled(false);
                    win.close();
                    return;
               }
               if (obj.respuesta[0].mensaje.mensaje == '0') {
                     Ext.MessageBox.show({
                         title: 'Error',
                         msg: 'El cliente ya se encuentra con este rol',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});         
                     botonRol.setDisabled(false);
                        //win.close();                                     
                      return;
                 }else{                     
                    if(obj.respuesta[0].mensaje.mensaje == '1')
                    { 
                       Ext.MessageBox.show({
                         title: 'Error',
                         msg: 'Se encuentran reservaciones realizadas a esa hora y en ese d\u00EDa',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});   
                     botonRol.setDisabled(false);
                        //win.close();                                     
                      return;  
                    }
                    else{
                        if(obj.respuesta[0].mensaje.mensaje == '2'){
                                
                                var store = Ext.StoreMgr.lookup('storeCliente');
                                var index = Ext.ComponentQuery.query('#btnAgregarRolCliente')[0].indexCliente;
                                win.close();
                                store.data.items[index].data['TieneRolles'] = 'SI';
                                Ext.ComponentQuery.query('#grdPnlClientes01')[0].getView().refresh();
                                new Ext.ux.Notification({
                                    iconCls: 'information',
                                    title:	 '<font size=2 color=red>Informaci\u00F3n</font>',
                                    html:	 '<b>Has relizado la reservaci\u00F3n correctamente.</b><p>Recuerde que puedes cancelar est\u00E1 reservaci\u00F3n</p>',
                                    autoDestroy: true,
                                    width: 300,
                                    hideDelay:  7000}).show(document);                        
                            return;             
                        }else
                            {                                    
                               Ext.MessageBox.show({
                                 title: 'Error',
                                 msg: 'Desde la fecha de inicio a los proximo(s) '+cuantoTiempoDisplay+' se encuentran reservaciones realizadas',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.WARNING});  
                             botonRol.setDisabled(false);
                              return;       
                            }
                      }
                    }
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente      
             
      var estadoReservacion= Ext.ComponentQuery.query('#chkBuscaReto');
      estadoReservacion = estadoReservacion[0].getValue();
      if(estadoReservacion==true){estadoReservacion=6;}else{estadoReservacion=4;}      
      var metodo='';
      if(avisar==true){metodo='creaRolClienteAvisa';}else{metodo='creaRolClienteOmitir';}
             
      var datos = '{"cuantoTiempo":"' + cuantoTiempo + '",';
      datos += '"fechaInicio":"' + fechaInicio + '",';      
      datos += '"hora":"' + hora + '",';
      datos += '"dia":"' + dia + '",';
      datos += '"idCancha":"' + idCancha + '",';
      datos += '"idPersona":"' + idPersona + '",';
      datos += '"estadoReservacion":"' + estadoReservacion + '",';
      datos += '"idUsuarioRegistro":"' + global_id_usuario + '",';
      datos += '"comentario":"' + comentario + '"}';        
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion.Crea Rol a Cliente'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   metodo,
                   datos:    datos}  
          }); // Fin de la llamada Ajax
    }, // Fin de Click en agregar rol cliente en la ventana Rol de cliente

//======================================================================================================================================

    // Render de la Pantalla GridClientes
    renderGridClientes: function() {
        //console.log('Render GridClientes');
        var me = this;
        
        var cargarDatosVistaDatosCliente = function(vista,store,index){
            //console.log('cargardatods');
            vista.setIdPersona(store.data.items[index].data['IdPersona']);
            vista.setIndexStore(index);
            vista.query('#txtCedulaCliente01')[0].setValue(store.data.items[index].data['NoCedula']);
            vista.query('#txtApellidoCliente01')[0].setValue(store.data.items[index].data['Apellidos']);
            vista.query('#txtNombreCliente01')[0].setValue(store.data.items[index].data['Nombre']);
            vista.query('#txtTelefono1Cliente')[0].setValue(store.data.items[index].data['TelCelular']);
            vista.query('#txtTelefono2Cliente')[0].setValue(store.data.items[index].data['Telefono2']);
            if (store.data.items[index].data['FechaNacimiento'] == '0000-00-00') {store.data.items[index].data['FechaNacimiento']=null;}
            vista.query('#dateFechaNacimiento01')[0].setValue(store.data.items[index].data['FechaNacimiento']);
            
            if(store.data.items[index].data['CodProv']!=0)   {vista.query('#cmbProvincia01')[0].setValue(store.data.items[index].data['CodProv']);
                                                             } else {vista.query('#cmbProvincia01')[0].setValue(null);}  
            if(store.data.items[index].data['CodCanton']!=0) {vista.query('#cmbCanton01')[0].setValue(store.data.items[index].data['CodCanton']);
                                                             } else {vista.query('#cmbCanton01')[0].setValue(null);}
            if(store.data.items[index].data['CodDist']!=0)   { vista.query('#cmbDistrito01')[0].setValue(store.data.items[index].data['CodDist']);
                                                             } else { vista.query('#cmbDistrito01')[0].setValue(null);}
            vista.query('#rbtnMasculinoCliente01')[0].setValue(false);          
            vista.query('#rbtnFemeninoCliente01')[0].setValue(false);
            if (store.data.items[index].data['Genero'] == 'M') {vista.query('#rbtnMasculinoCliente01')[0].setValue(true);
                                                        } else {vista.query('#rbtnFemeninoCliente01')[0].setValue(true);}
            vista.query('#txtEMailCliente')[0].setValue(store.data.items[index].data['EMail']);
            if (store.data.items[index].data['FotoFile']==null) {store.data.items[index].data['FotoFile']='desconocido.jpg';}  
            vista.query('#imgFotoCliente01')[0].setSrc('resources/fotosUsuarios/'+store.data.items[index].data['FotoFile']);            
            vista.query('#txtComentarioCliente01')[0].setValue(store.data.items[index].data['Comentario']);
          
            switch(store.data.items[index].data['NivelConfianza']) {
                 case '0':  vista.query('#rdbNoseDatosCliente')[0].setValue(true);      break;
                 case '1':  vista.query('#rdbNoseDatosCliente')[0].setValue(true);      break;
                 case '2':  vista.query('#rdbMaloDatosCliente')[0].setValue(true);      break;
                 case '3':  vista.query('#rdbRegularDatosCliente')[0].setValue(true);   break;
                 case '4':  vista.query('#rdbBuenoDatosCliente')[0].setValue(true);     break;      
                 case '5':  vista.query('#rdbExcelenteDatosCliente')[0].setValue(true); break;  } 
          
            vista.query('#checkboxLun')[0].setValue(false);
            vista.query('#checkboxMar')[0].setValue(false);
            vista.query('#checkboxMie')[0].setValue(false);
            vista.query('#checkboxJue')[0].setValue(false);
            vista.query('#checkboxVie')[0].setValue(false);
            vista.query('#checkboxSab')[0].setValue(false);
            vista.query('#checkboxDom')[0].setValue(false);
            if (store.data.items[index].data['JuegaLun'] == '1') {vista.query('#checkboxLun')[0].setValue(true);}
            if (store.data.items[index].data['JuegaMar'] == '1') {vista.query('#checkboxMar')[0].setValue(true);}
            if (store.data.items[index].data['JuegaMie'] == '1') {vista.query('#checkboxMie')[0].setValue(true);}
            if (store.data.items[index].data['JuegaJue'] == '1') {vista.query('#checkboxJue')[0].setValue(true);}
            if (store.data.items[index].data['JuegaVie'] == '1') {vista.query('#checkboxVie')[0].setValue(true);}
            if (store.data.items[index].data['JuegaSab'] == '1') {vista.query('#checkboxSab')[0].setValue(true);}
            if (store.data.items[index].data['JuegaDom'] == '1') {vista.query('#checkboxDom')[0].setValue(true);}
           return;
        }
        
        
        var visualizarDatosCliente = function(grid,rowindex,colindex) {
            //console.log('Visualizar Registro'); 
            var view = Ext.create('AJugarFutbol.view.administrador.DatosCliente');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Cliente - Visualizando Datos');
            var obj = view.query('#btnActualizarCliente');
            obj[0].setDisabled(true);
            obj[0].setText('Consulta');
            obj[0].setTooltip('Deshabilitado esta consultando datos');

            obj = view.query('#formFileFoto');
            obj[0].setVisible(false);          

            obj = view.query('.textfield');
            for (var i=0; i < obj.length; i++){obj[i].setReadOnly(true);}
            obj = view.query('.checkbox');
            for (i=0; i < obj.length; i++){obj[i].setReadOnly(true);}
            obj = view.query('.radiofield');
            for (i=0; i < obj.length; i++){obj[i].setReadOnly(true);}
            cargarDatosVistaDatosCliente(view,grid.store,rowindex);
          }
          
        var editarDatosCliente = function(grid,rowindex,colIndex) {
            //console.log('Editar Registro');
            var view = Ext.create('AJugarFutbol.view.administrador.DatosCliente');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Cliente - Editando Datos');
            var obj = view.query('#btnActualizarCliente');
            obj[0].setDisabled(false);
            obj[0].setText('Actualizar Datos');
            obj[0].setTooltip('Dar click para actualizar los datos de este Cliente');
            // bloquea los datos personales cuando el cliente es usuario.
            if (grid.store.data.items[rowindex].data['EsUsuario'] == 'SI') {
                    view.query('#txtCedulaCliente01')[0].setDisabled(true);
                    view.query('#txtNombreCliente01')[0].setDisabled(true);
                    view.query('#txtApellidoCliente01')[0].setDisabled(true);
                    view.query('#rbtnMasculinoCliente01')[0].setDisabled(true);
                    view.query('#rbtnFemeninoCliente01')[0].setDisabled(true);
                    view.query('#dateFechaNacimiento01')[0].setDisabled(true);
                    view.query('#txtEMailCliente')[0].setDisabled(true);
                    view.query('#cmbProvincia01')[0].setDisabled(true);
                    view.query('#cmbCanton01')[0].setDisabled(true);
                    view.query('#cmbDistrito01')[0].setDisabled(true);
                    //No puede cargar foto
                    view.query('#formFileFoto')[0].setVisible(false);                 
                    }             
            cargarDatosVistaDatosCliente(view,grid.store,rowindex);
          }
          
        var eliminarCliente = function(grid,rowindex,colIndex) {
            if(grid.store.data.items[rowindex].data['TieneRolles'] == 'SI') {
                        var elMask = Ext.ComponentQuery.query('#viewport')[0].getEl();
                        elMask.mask();
                        function finMsgErrorx(){elMask.unmask(); return;}
                        Ext.MessageBox.show({
                            title: 'Mensaje',
                            msg: 'Cliente tiene rolles.  Primero debe eliminar los rolles para poder eliminar este cliente',
                            buttons: Ext.MessageBox.OK,
                            fn: finMsgErrorx,
                            modal: false,
                            closable : false,
                            icon: Ext.MessageBox.INFO});
                        return;} 
            var view = Ext.create('AJugarFutbol.view.administrador.DatosCliente');          
            view.show();    
            view.setTitle('Informaci\u00F3n de Cliente - Eliminando Datos');
            var obj = view.query('#btnActualizarCliente');
            obj[0].setDisabled(false);
            obj[0].setText('Eliminar Cliente');
            obj[0].setTooltip('Dar click para eliminar este Cliente');

            obj = view.query('#formFileFoto');
            obj[0].setVisible(false); 

            obj = view.query('.textfield');
            for (var i=0; i < obj.length; i++){obj[i].setDisabled(true);}
            obj = view.query('.checkbox');
            for (i=0; i < obj.length; i++){obj[i].setDisabled(true);}
            obj = view.query('.radiofield');
            for (i=0; i < obj.length; i++){obj[i].setDisabled(true);}
            cargarDatosVistaDatosCliente(view,grid.store,rowindex);
          }  
          
       var rolCliente = function(grid,rowindex,colIndex) {         
            var view = Ext.create('AJugarFutbol.view.administrador.RolCliente');                    
            var obj = view.query('#lblCedulaRolCliente');    
            obj[0].setValue('<b>'+grid.store.data.items[rowindex].data['NoCedula']+'</b>');          

            obj = view.query('#lblNombreRolCliente');    
            obj[0].setValue('<b>'+grid.store.data.items[rowindex].data['NombreCompleto']+'</b>');   

            obj = view.query('#lblCedulaRolCliente');              
            obj[0]['idPersona']=grid.store.data.items[rowindex].data['IdPersona']; 

            var telefono2=' - '+grid.store.data.items[rowindex].data['Telefono2'];
            if(grid.store.data.items[rowindex].data['Telefono2']==''){telefono2='';}
            obj = view.query('#lblTelefonosRolCliente');    
            obj[0].setValue('<b>'+grid.store.data.items[rowindex].data['TelCelular']+telefono2+'</b>');          

            obj = view.query('#lblCorreoRolCliente');    
            obj[0].setValue('<b>'+grid.store.data.items[rowindex].data['EMail']+'</b>');          

            var nivelConfianza = 'No s&eacute;';
            switch(grid.store.data.items[rowindex].data['NivelConfianza']) {
                case '2':  nivelConfianza='Malo';  break;
                case '3':  nivelConfianza='Regular';  break;
                case '4':  nivelConfianza='Bueno';   break;      
                case '5':  nivelConfianza='Excelente';  break;  } 
            obj = view.query('#lblNivelConfianzaRolCliente');    
            obj[0].setValue('<b>'+nivelConfianza+'</b>');   

            view.query('#btnAgregarRolCliente')[0].indexCliente = rowindex; 

            var idInstalacion =Ext.ComponentQuery.query('#btnAdministracion');
            idInstalacion=idInstalacion[0]['idInstalacion'];  
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
                            msg: 'No se encontraron canchas disponibles',
                            buttons: Ext.MessageBox.OK,
                            icon: Ext.MessageBox.INFO});
                        return; }
            var storeRolles = Ext.create('Ext.data.Store', {
                                        fields: ['id', 'IdPersona', 'IdCancha', 'NombreCancha', 
                                                'FechaHoraReservacion', 'TiempoRol', 'Comentario']});
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
               
                    if(dia==1){dia='lunes';}
                    if(dia==2){dia='martes';}
                    if(dia==3){dia='mi&eacute;rcoles';}
                    if(dia==4){dia='jueves';}
                    if(dia==5){dia='viernes';}
                    if(dia==6){dia='s&aacute;bados';}
                    if(dia==0){dia='domingos';}

                    var ampmReservacion='de la ma&ntilde;ana';
                    var horaReservacion=hora;

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
                headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta las canchas de la instalacion'},  
                params: {clasePhp: 'InstalacionDB',
                        metodo:   'getCanchasInstalacion_RollesPersona',
                        datos:    datos}  
                }); // Fin de la llamada Ajax

            view.show();
            var panelPapa = Ext.ComponentQuery.query('#viewport');
            panelPapa = panelPapa[0];
            panelPapa.getEl().mask();
            return;
          
          }
          
        var idInstalacion = Ext.ComponentQuery.query('#btnAdministracion')[0]['idInstalacion']; 
        var filtroNombre = '';
        var filtroLun = '1';
        var filtroMar = '1';
        var filtroMie = '1';
        var filtroJue = '1';
        var filtroVie = '1';
        var filtroSab = '1';
        var filtroDom = '1';
        var datos = '{"idInstalacion":"'  + idInstalacion +
                     '","filtroNombre":"' + filtroNombre +
                     '","filtroLun":"'  + filtroLun +
                     '","filtroMar":"'  + filtroMar +
                     '","filtroMie":"'  + filtroMie +
                     '","filtroJue":"'  + filtroJue +
                     '","filtroVie":"'  + filtroVie +
                     '","filtroSab":"'  + filtroSab +
                     '","filtroDom":"'  + filtroDom +
                     '"}'; 
                 
        var storeCliente = Ext.create('Ext.data.Store', {
                           storeId: 'storeCliente',
                           pageSize: 12, 
                           proxy: {
                                    type: 'ajax',
                                    actionMethods : 'POST',
                                    timeout: 30000,
                                    url: 'php/RouterDBAJugarFutbol.php', 
                                    extraParams: {
                                                  clasePhp: 'ClienteDB',
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
                                            view = Ext.create('AJugarFutbol.view.administrador.Home');           
                                            panelCentral.removeAll();
                                            panelCentral.add([view]);  
                                            alert ("El servidor no contesto la petición, posiblemente existe un problema en Internet.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                                         }}      
                                  },
                            sorters: [{property : 'NombreCompleto', direction: 'ASC'}],
                            //filters: [{property : 'IdInstalacion', value   : '1'}],
                            fields: ['IdInstalacion',
                                     'IdPersona',
                                     'EsUsuario',
                                     'EsCliente',
                                     'TieneRolles',
                                     'Nombre', 
                                     'Apellidos',
                                     'NombreCompleto',
                                     'NoCedula', 
                                     'TelCelular', 
                                     'Telefono2', 
                                     'Genero', 
                                     'FechaNacimiento',
                                     'CodProv',
                                     'CodCanton',
                                     'CodDist',
                                     'EMail',
                                     'FotoFile',
                                     'JuegaLun',
                                     'JuegaMar',
                                     'JuegaMie',
                                     'JuegaJue',
                                     'JuegaVie',
                                     'JuegaSab',
                                     'JuegaDom',
                                     'Comentario',
                                     'NivelConfianza']});
        
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
                                id: 'FotoFile',
                                dataIndex: 'FotoFile',
                                width: 25,
                                height: 25,
                                sortable: false,
                                renderer: function (value) {
                                    return '<img src="resources/fotosUsuarios/'+value+'" height="22" width="20">';
                                }
                            },
                           {
                                id: 'Nombre',
                                text: "Nombre Completo",
                                dataIndex: 'NombreCompleto',
                                width: 175,
                                sortable: false
                            },{
                                text: "No.C\u00E9dula",
                                dataIndex: 'NoCedula',
                                width: 77,
                                sortable: false,
                                align: 'center'
                            },{
                                text: "Tel\u00E9fono 1",
                                dataIndex: 'TelCelular',
                                width: 70,
                                sortable: false,
                                align: 'center'
                            },{
                                text: "Tel\u00E9fono 2",
                                dataIndex: 'Telefono2',
                                width: 70,
                                sortable: false,
                                align: 'center'
                            },{
                                text: "Confianza",
                                dataIndex: 'NivelConfianza',
                                width: 65,
                                sortable: false,
                                align: 'center',
                                renderer: function (value) {
                                    if (value <= 1) {return 'No S\u00E9';}
                                    if (value == 2) {return 'Malo';}
                                    if (value == 3) {return 'Regular';}
                                    if (value == 4) {return 'Bueno';}
                                    if (value == 5) {return 'Excelente';}
                                    return 'Error';
                                }

                            },{
                                text: "G\u00E9nero",
                                dataIndex: 'Genero',
                                width: 50,
                                sortable: false,
                                align: 'center'
                            },{
                                xtype:'actioncolumn',
                                    width: 135,
                                    items: [{
                                            icon: 'resources/imagenes/information.png',
                                            tooltip: 'Visualizar datos del Cliente',
                                            iconCls: 'x-icon-grid',
                                            handler: visualizarDatosCliente

                                            },{
                                            icon: 'resources/imagenes/editar.png',
                                            tooltip: 'Editar los datos del Cliente',
                                            iconCls: 'x-icon-grid',
                                            handler: editarDatosCliente

                                            },{
                                            icon: 'resources/imagenes/delete.png',
                                            tooltip: 'Eliminar el Cliente',
                                            iconCls: 'x-icon-grid',
                                            handler: eliminarCliente
                                            },{
                                            icon: 'resources/imagenes/rolClientes.png',                                            
                                            tooltip: 'Incluir o eliminar Rol del Cliente',
                                            iconCls: 'x-icon-grid',
                                            handler: rolCliente}
                                    ]

                            },{
                                text: "Rol",
                                dataIndex: 'TieneRolles',
                                width: 50,
                                sortable: false,
                                align: 'center',     
                                renderer: function (value) {
                                    var imagen;
                                    if (value == 'SI') {imagen = '<img src="resources/imagenes/che.png" height="22" width="20">';}
                                                       else {imagen='';}
                                    return imagen;
                                }

                            }
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
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxControl')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxLunx')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMarx')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxMiex')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxJuex')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxViex')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxSabx')[0].setValue(true);
        Ext.ComponentQuery.query('#pnlGridClientes')[0].query('#checkboxDomx')[0].setValue(true);
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
        storeCantones.filter('TipoRegistro','1');
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
        storeDistritos.filter('TipoRegistro','1');
    }, // Fin de Selecciono un Canton en Editar Perfil

//=========================================================================================================================    

    // Selecciono una cancha en la pantalla de rolles
    winRolClienteSeleccionoCanchaCmb: function(combobox, record) {
        var win = Ext.ComponentQuery.query('#winRolCliente')[0];
        var cancha = record[0];
        cancha = cancha.data;
        var tipoHora = cancha.tipoHora;
        var obj = win.query('#timeHoraRolCliente')[0];
        obj.clearValue();
        obj.doQuery();
        storeHoras.clearFilter(true);
        storeHoras.filter('tipoHora',tipoHora);
    }, // Fin de Selecciono un Cancha

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

 },
 
 //=========================================================================================================
 
 EliminarRoll: function (e,target) {
       var me = this;
       var view = Ext.ComponentQuery.query('#dvRolles')[0]; 
       if (target.className != 'x-boton-Roll') {return;}
       var item = view.findItemByChild(target);
       var record = view.store.getAt(view.indexOf(item));
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';
              var window = Ext.ComponentQuery.query('#winRolCliente')[0].close(); 
              alert ("El servidor no contesto en la última transacción por un error en Internet.  Refresque los datos y revise si el rol fue eliminado.");
              return;
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) { 
            var obj = Ext.JSON.decode(response.responseText,true);
            if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    return;
            }
            view.store.removeAt(view.indexOf(item));
            var store = Ext.StoreMgr.lookup('storeCliente');
            var index = Ext.ComponentQuery.query('#btnAgregarRolCliente')[0].indexCliente;
            if (view.store.count() > 0) {store.data.items[index].data['TieneRolles'] = 'SI';
                 } else {store.data.items[index].data['TieneRolles'] = 'NO';}
            Ext.ComponentQuery.query('#grdPnlClientes01')[0].getView().refresh();
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>Roll Eliminado correctamente!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  2000}).show(document); 
           } // Fin de Funcion para cuando el Ajax Request responde correctamente
            
       var idRoll     = record.data.id
       var idPersona  = record.data.IdPersona;
       var idCancha   = record.data.IdCancha;       
       var datos = '{"idRoll":"'    + idRoll + 
                  '","idPersona":"' + idPersona +
                  '","idCancha":"'  + idCancha +
                  '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto InstalacionReservaciones.  Eliminar las reservaciones de un roll a un Cliente'},  
             params: {clasePhp: 'ReservaDB',
                      metodo:   'eliminarReservacionesRollCliente',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
       
}           

});
