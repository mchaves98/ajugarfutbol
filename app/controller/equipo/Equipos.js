Ext.define('AJugarFutbol.controller.equipo.Equipos', {
    extend: 'Ext.app.Controller',

    views: ['equipo.MisEquipos', 'equipo.EnviarMensajeEquipo', 'equipo.CambiarEscudoEquipo', 'equipo.MiEquipo',
            'equipo.IncluirJugadoresEquipo'],

    stores: ['catalogos.TipoEquipoEdades','catalogos.TipoEquipoGeneros','catalogos.TipoFutboles'],

    models: ['catalogos.TipoEquipoEdad','catalogos.TipoEquipoGenero','catalogos.TipoFutbol'],
    
    init: function() {
         ////console.log('Inicializando Controlador Amigos');
        this.control({ 
            
            // Eventos de la Pantalla de Mis Equipos
            'winMisEquipos panel[id=plnMisEquipos]':                    {render: this.renderMisEquipos},
            'winMisEquipos button[itemId=btnEditarDatosEquipo]':        {click: this.clickBtnEditarDatosEquipo},
            'winMisEquipos button[itemId=btnEnviarMensajeEquipo01]':    {click: this.clickBtnEnviarMensajeEquipo},
            'winMisEquipos button[itemId=btnCrearEquipo]':              {click: this.clickBtnCrearEquipo},
            'winMisEquipos button[itemId=bntCambiarEscudo01]':          {click: this.clickBtnCambiarEscudoEquipo},
            'winMisEquipos button[itemId=btnEliminarEquipo01]':         {click: this.clickBtnEliminarEquipo},
       
       
             // Eventos de la Pantalla de EnviarMensaje (Equipo)
            'winEnviarMensajeEquipo panel[id=plnPrincipalMsjEq]':   {render: this.renderEnviarMensajeEquipo},
            'winEnviarMensajeEquipo button[itemId=btnEnviarMsjEq]': {click: this.clickBtnEnviarMsj},
            'winEnviarMensajeEquipo' :                              {hide: this.hideWindow,
                                                                    close: this.closewinEnviarMensajeEquipo,
                                                                    destroy: this.closewinEnviarMensajeEquipo},
                                                                
            // Eventos de la Pantalla de Cambiar Escudo
            'winCambiarEscudoEquipo panel[id=plnEscudos]':      {render: this.renderCambiarEscudoEquipo},
            'winCambiarEscudoEquipo dataview[id=dvEscudos]':    {selectionchange: this.SeleccionoEscudo},
            'winCambiarEscudoEquipo' :                          {hide: this.hideWindow,
                                                                 close: this.closewinCambiarEscudoEquipo,
                                                                 destroy: this.closewinCambiarEscudoEquipo},
                                                                     
            // Eventos de la Pantalla de Mi Equipo
            'winMiEquipo panel[id=plnEquipoBotones]':                 {render: this.renderMiEquipo},
            'winMiEquipo button[itemId=btnIncluirJugadores05]':       {click: this.clickBtnIncluirJugadores05},
            'winMiEquipo button[itemId=btnEnviarMensajeEquipo05]':    {click: this.clickBtnEnviarMensajeEquipo},
            'winMiEquipo button[itemId=btnVerEquipos05]':             {click: this.clickBtnVolverAVerEquipos},
            'winMiEquipo checkbox[idItem=checkboxEdad]':              {change: this.changeCheckBoxEdad},
            'winMiEquipo checkbox[idItem=checkboxGenero]':            {change: this.changeCheckBoxGenero},
            'winMiEquipo checkbox[idItem=checkboxTipoFutbol]':        {change: this.changeCheckBoxTipoFutbol},
            'winMiEquipo' :                                           {hide: this.hideWindow,
                                                                       close: this.closewinMiEquipo,
                                                                       destroy: this.closewinMiEquipo},
                                                                   
            // Eventos de la Pantalla de Incluir Jugadores al Equipo
            'winIncluirJugadoresEquipo panel[id=plnJugadoresDisp]':      {render: this.renderIncluirJugadoresEquipo},
            'winIncluirJugadoresEquipo' :                                {hide: this.hideWindow,
                                                                          close: this.closewinIncluirJugadoresEquipo,
                                                                          destroy: this.closewinIncluirJugadoresEquipo}  
        });
        
    },
    
//=====================================================================================================================================

    // Render de la Pantalla de EnviarMensajeEquipo
    renderEnviarMensajeEquipo: function() {
        //console.log('renderEnviarMensajeEquipo');
        var win = Ext.ComponentQuery.query('#winEnviarMensajeEquipo'); 
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
    }, // Fin de Render de la Pantalla de EnviarMensajeEquipo
//=====================================================================================================================================

    // Render de la Pantalla de Cambiar Escudo
    renderCambiarEscudoEquipo: function() {
        //console.log('renderCambiarEscudoEquipo');
        var win = Ext.ComponentQuery.query('#winCambiarEscudoEquipo'); 
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
    }, // Fin de Render de la Pantalla de Cambiar Escudo

//=====================================================================================================================================

    // Render de la Pantalla de Incluir Jugadores
    renderIncluirJugadoresEquipo: function() {
        //console.log('renderIncluirJugadoresEquipo');
        
        var win = Ext.ComponentQuery.query('#winIncluirJugadoresEquipo'); 
        win = win[0];
       
        var size = win.getSize();
        var anchoWin = size['width'];
        var pantalla=screen.width;
        if(pantalla>1024) {
                var mitadPantalla=pantalla/2;
                var puntoInicioX=mitadPantalla-(anchoWin/2);
                win.setPosition(puntoInicioX,200);
                }
        var panelPapa = Ext.ComponentQuery.query('#viewport');
        panelPapa = panelPapa[0];
        panelPapa.getEl().mask();
        semaforoAjaxMask = false;
        this.mon(win.getEl(), {click: {fn: this.SeleccionoJugador, scope: this}});
        window.scrollTo(0,0);

    }, // Fin de Render de la Pantalla de Incluir Jugadores

//=====================================================================================================================================

    // Render de la Pantalla de Editar Datos de Equipo
    renderMiEquipo: function() {
        ////console.log('RenderMiEquipo');
        var win = Ext.ComponentQuery.query('#winMiEquipo'); 
        win = win[0];
        window.scrollTo(0,0);
        var dvJugadores = win.query('#plnEquipoJugadores');
        dvJugadores = dvJugadores[0];
        //console.log(dvJugadores);
        this.mon(dvJugadores.getEl(), {click: {fn: this.clickJugadorMiEquipo, scope: this}});
    }, // Fin de Render de la Pantalla de  Editar Datos del Equipo
  
//=====================================================================================================================================

    // Se cerro la Pantalla de Enviar Mensaje
    closewinEnviarMensajeEquipo: function() {
       //console.log('closewinEnviarMensajeEquipo');
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, // Fin de Se cerro la Pantalla de Enviar MensajeEquipo

    // Se cerro la Pantalla de Cambiar Escudo del Equipo
    closewinCambiarEscudoEquipo: function() {
       //console.log('closewinCambiarEscudoEquipo');
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       document.getElementsByTagName("html")[0].style.overflow = "auto";
    }, // Fin de Se cerro la Pantalla de closewinCambiarEscudoEquipo
    
    // Se cerro la Pantalla de Incluir Jugadores
    closewinIncluirJugadoresEquipo: function() {
       //console.log('closewinIncluirJugadoresEquipo');
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       document.getElementsByTagName("html")[0].style.overflow = "auto";
       semaforoAjaxMask = true;
    }, // Fin de Se cerro la Pantalla de closewinIncluirJugadoresEquipo

    // Se cerro la Pantalla de EditarDatosEquipo
    closewinMiEquipo: function() {
        //console.log('closewinMiEquipo');
    }, // Fin de Se cerro la Pantalla de closewinCambiarEscudoEquipo


//=====================================================================================================================================    
    
    // Se cerro un windows modal
    hideWindow: function(win) {
        //console.log('hideWindow');
        //console.log(win);
        win.destroy();               
    },    // Fin de Se cerro la Pantalla de Olvido Clave
    
//========================================================================================================================    
    
    // Render del Panel de Mis Equipos
   renderMisEquipos: function() {

       ////console.log('Render mis Equipos'); 
       window.scrollTo(0,0);
       
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
               
               var win = Ext.ComponentQuery.query('#plnMisEquipos');
               win = win[0]; 
              
               var win1 = Ext.ComponentQuery.query('#winMisEquipos');
               win1 = win1[0];     
              
               var cantidadEquipos = obj.respuesta[0].mensaje.cantidadEquipos;
               if (cantidadEquipos == 0) {
                        new Ext.ux.Notification({
                        iconCls: 'error',
                        title:	 '<font size=2 color=red>Información</font>',
                        html:	 '<b>Usted no tiene Equipos por el momento.  Intente crear un Equipo!</b>',
                        autoDestroy: true,
                        width: 300,
                        hideDelay:  3000}).show(document); 
                        } 
               var equipos = new Array();
               win.removeAll();
               for (var i=0;i<=(cantidadEquipos-1);i++) {
                       var idEquipo = obj.respuesta[1].results[i].id;
                       var nombreEquipo = obj.respuesta[1].results[i].NombreEquipo;
                       var fotoFile = obj.respuesta[1].results[i].FileFoto;
                       var escudoFile = obj.respuesta[1].results[i].FileEscudo;
                       var idUsuarioAdmin = obj.respuesta[1].results[i].IdUsuarioAdmin;
                       var fotoCapitan = obj.respuesta[1].results[i].FotoCapitan;
                       var nombreCapitan = obj.respuesta[1].results[i].NombreCapitan;
                       var apellidosCapitan = obj.respuesta[1].results[i].ApellidosCapitan;
                       equipos[i] = me.creaPanelEquipo(i, idEquipo, nombreEquipo, fotoFile, escudoFile, idUsuarioAdmin,
                                                          fotoCapitan, nombreCapitan, apellidosCapitan );
                       } // Fin del For
               ////console.log(equipos);
               win.add(equipos);
                    
                win1.add({ 
                xtype: 'button',
                id: 'btnCrearEquipo',
                itemId: 'btnCrearEquipo',
                style: 'margin-top:5px;margin-left:20px;margin-bottom:20px;background:#F2F2F2;',  
                width: 720,
                height: 40,
                scale: 'large',                                        
                text: '<b><font size=4>Crear un Equipo</font><b>',
                tooltip: 'Crea un Equipo'
                });
              
                ////console.log(win1); 

             } // Fin de Funcion para cuando el Ajax Request responde correctamente


       var datos = '{"idUsuario":"' + global_id_usuario + '"}'; 
       ////console.log('Render mis Equipos / Ajax');  
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Lista de Equipos al cual pertenece un Usuario'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'obtenerListaEquipos',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
       
    }, // Fin de Render del Panel de Mis Amigos


//=========================================================================================================================

  // click en el boton Crear Equipo
   clickBtnCrearEquipo: function(button) {
      //console.log('clickbtnCrearEquipo');
      
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
               
               var win = Ext.ComponentQuery.query('#plnMisEquipos');
               win = win[0]; 
              
               var equipoNuevo = new Array();
               var cantidadEquipos = obj.respuesta[0].mensaje.cantidadEquipos;
               var idEquipo = obj.respuesta[0].mensaje.idEquipo;
               var nombreEquipo = obj.respuesta[0].mensaje.nombreEquipo;
               var fotoFile = obj.respuesta[0].mensaje.fileFoto;
               var escudoFile = obj.respuesta[0].mensaje.fileEscudo;
               var idUsuarioAdmin = obj.respuesta[0].mensaje.idUsuarioAdmin;
               var fotoCapitan = obj.respuesta[0].mensaje.fotoCapitan;
               var nombreCapitan = obj.respuesta[0].mensaje.nombreCapitan;
               var apellidosCapitan = obj.respuesta[0].mensaje.apellidosCapitan;
               equipoNuevo[0] = me.creaPanelEquipo(cantidadEquipos, idEquipo, nombreEquipo, fotoFile, escudoFile, idUsuarioAdmin,
                                                   fotoCapitan, nombreCapitan, apellidosCapitan );
               win.add(equipoNuevo);

             } // Fin de Funcion para cuando el Ajax Request responde correctamente


       var nombreEquipo = 'prueba';
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().mask();
       Ext.MessageBox.show({
           closable: false,
           msg: '<b>Nombre del Equipo:</b><br>(Máximo 25 Caracteres)',
           width:  150,
           height: 100,
           buttons: Ext.MessageBox.OKCANCEL,
           prompt: true,
           modal: false,
           fn: showResult01
       });
       
       function showResult01(btn,text){
            //console.log(btn,text);
            panelPapa.getEl().unmask();
            if (btn == 'ok') {
                    var nombreEquipo = text.substring(0,24); 
                    var datos = '{"idUsuario":"' + global_id_usuario + '","nombreEquipo":"' + nombreEquipo + '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Crear un Equipo y poner como Capitan al Usuario'},  
                            params: {clasePhp: 'UsuarioDB',
                                    metodo:   'crearEquipo',
                                    datos:    datos}  
                    }) // Fin de la llamada Ajax
            }         
       }       
   }, // fin clickBtnCrearEquipo
  
 //=========================================================================================================================
    
   // click en el boton Editar datos del equipo
   clickBtnEditarDatosEquipo: function(button) {
       //console.log('clickBtnEditarDatosEquipo' + button['idUsuarioAdmin']);
            
       var panelCentral = Ext.ComponentQuery.query('#panel_central');
       panelCentral =  panelCentral[0];
       panelCentral.removeAll();
       var windowx = Ext.widget('winMiEquipo');        
       panelCentral.add([windowx]);
       panelCentral.doLayout();     
       
       var lblNombreEquipo = windowx.query('#lblNombreEquipo05');
       lblNombreEquipo = lblNombreEquipo[0];
       var imgEscudo =  windowx.query('#imgEscudoEquipo05');
       imgEscudo = imgEscudo[0];
       var lblNombreCapitan = windowx.query('#lblNombreCapitan');
       lblNombreCapitan = lblNombreCapitan[0];
       var lblApellidosCapitan = windowx.query('#lblApellidosCapitan');
       lblApellidosCapitan = lblApellidosCapitan[0];
       var imgFotoCapitan = windowx.query('#imgFotoCapitan');
       imgFotoCapitan = imgFotoCapitan[0];
       var indSoloVer = false;
       if (button['idUsuarioAdmin'] != global_id_usuario) {
               indSoloVer = true;
               var bntIncluirJugadores = windowx.query('#btnIncluirJugadores05');
               bntIncluirJugadores = bntIncluirJugadores[0];
               bntIncluirJugadores.setDisabled(true);
               bntIncluirJugadores.setTooltip('Solo el Capitán puede incluir Jugadores en este Equipo');
              }
 
       var idEquipo       = button['idEquipo'];
       var idUsuarioAdmin = button['idUsuarioAdmin'];
       var nombreEquipo = button['nombreEquipo'];
       
       lblNombreEquipo.setText(nombreEquipo);
       lblNombreCapitan.setText(button['nombreCapitan']);
       lblApellidosCapitan.setText(button['apellidosCapitan']);
       imgEscudo.setSrc('resources/escudosEquipos/'+button['escudoFile']);
       imgFotoCapitan.setSrc('resources/fotosUsuarios/'+button['fotoCapitan']);
       
       windowx.setIdEquipo(idEquipo);
       windowx.setIdItemEquipo(button['idItem']);
       
       var btnIncluirJugadores =  windowx.query('#btnIncluirJugadores05');
       btnIncluirJugadores = btnIncluirJugadores[0];
       btnIncluirJugadores.idEquipo = idEquipo;
       btnIncluirJugadores.idUsuarioAdmin = idUsuarioAdmin;
       btnIncluirJugadores.nombreEquipo = nombreEquipo;
       
       var btnEnviarMensajeEquipo05 =  windowx.query('#btnEnviarMensajeEquipo05');
       btnEnviarMensajeEquipo05 = btnEnviarMensajeEquipo05[0];
       btnEnviarMensajeEquipo05.idEquipo = idEquipo;
       btnEnviarMensajeEquipo05.idUsuarioAdmin = idUsuarioAdmin;
       btnEnviarMensajeEquipo05.nombreEquipo = nombreEquipo;
       
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request
     
     // Funcion para cuando el Ajax responde correctamente
       var successAjaxFn = function(response, request) {  
            var obj = Ext.JSON.decode(response.responseText); 
            var cantidadJugadores = obj.respuesta[0].mensaje.cantidadJugadores;
            var cantidadEdades = obj.respuesta[0].mensaje.cantidadEdades;
            var cantidadGeneros = obj.respuesta[0].mensaje.cantidadGeneros;
            var cantidadFutboles = obj.respuesta[0].mensaje.cantidadFutboles;
            //console.log(cantidadGeneros);
            var storeJugador = Ext.create('Ext.data.Store', {
                               fields: ['idEquipo', 'idUsuarioAdmin', 'idJugador', 'nombreJugador', 'apellidosJugador', 'EMailJugador', 'telefonoJugador','urlFotoJugador']});
            for (var i=0; i<cantidadJugadores; i++) {
                    storeJugador.add({idEquipo          : idEquipo,
                                      idUsuarioAdmin    : idUsuarioAdmin, 
                                      idJugador         : obj.respuesta[1].results[3][i].IdJugador,
                                      nombreJugador     : obj.respuesta[1].results[3][i].Nombre,
                                      apellidosJugador  : obj.respuesta[1].results[3][i].Apellidos,
                                      EMailJugador      : obj.respuesta[1].results[3][i].EMail,
                                      telefonoJugador   : obj.respuesta[1].results[3][i].TelCelular,
                                      urlFotoJugador    : "resources/fotosUsuarios/" + obj.respuesta[1].results[3][i].FotoFile
                                     });
                    } // Fin del For para llenar el store de los Jugadores del Equipo
            
            var equipoEdades = new Array();
            for (i=0; i<cantidadEdades; i++) {
                    equipoEdades[i] = obj.respuesta[1].results[0][i].IdTipoEdad;
                    } // Fin del For para llenar el Array de Edades del Equipo
            
            var equipoGeneros = new Array();
            for (i=0; i<cantidadGeneros; i++) {
                    equipoGeneros[i] = obj.respuesta[1].results[1][i].IdTipoGenero;
                    } // Fin del For para llenar el Array de Generos del Equipo
            
            var equipoFutboles = new Array();
            for (i=0; i<cantidadFutboles; i++) {
                    equipoFutboles[i] = obj.respuesta[1].results[2][i].IdTipoFutbol;
                    } // Fin del For para llenar el Array de Generos del Equipo
            
            if (button['idUsuarioAdmin'] != global_id_usuario) {
                    var tplJugador = new Ext.XTemplate(
                        '<tpl for=".">',
                            '<div class="jugador-wrap" height="55" width="55">',
                            '<div class="jugador-box">',
                                    '<center>',
                                    '<span class="x-nombre-jugador">{nombreJugador} </span><br>',
                                    '<span class="x-apellidos-jugador">{apellidosJugador}</span><br>',
                                    '<img class-"x-foto-jugador" src="{urlFotoJugador}" title="{nombreJugador}" height="42" width="42"><br>',
                                    '</center>',
                            '</div>',
                            '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>');
            } else {
                    var tplJugador = new Ext.XTemplate(
                        '<tpl for=".">',
                            '<div class="jugador-wrap" height="55" width="55">',
                            '<div class="jugador-box">',
                                    '<center>',
                                    '<span class="x-nombre-jugador">{nombreJugador} </span><br>',
                                    '<span class="x-apellidos-jugador">{apellidosJugador}</span><br>',
                                    '<img class-"x-foto-jugador" src="{urlFotoJugador}" title="{nombreJugador}" height="42" width="42"><br>',
                                    '<button class="x-boton-jugador" type="button"> Eliminar </button>',
                                    '</center>',
                            '</div>',
                            '</div>',
                        '</tpl>',
                        '<div class="x-clear"></div>'); 
                }
                   
            var dvJugadores = new Ext.view.View({
                    id:     'dvJugadores',
                    itemId: 'dvJugadores',
                    autoScroll: true,
                    store: storeJugador, 
                    tpl: tplJugador,
                    trackOver: true,
                    width: 620,
                    multiSelect: true,
                    overClass: 'x-view-over', 
                    itemSelector: 'div.jugador-wrap',
                    selectedItemCls: 'jugador-box-selected',
                    emptyText: 'No images to display',
                    border: true
                });

            var dvJugadorx= windowx.query('#plnEquipoJugadores');
            dvJugadorx = dvJugadorx[0];
            dvJugadorx.add([dvJugadores]);
            
            var checks = new Array();
            var storeTipoEquipoEdades = aplicacion.getStore('catalogos.TipoEquipoEdades');
            var plnEdades = windowx.query('#plnEdad05');
            plnEdades = plnEdades[0];
            for (i=0; i < storeTipoEquipoEdades.getTotalCount(); i++) {
                var recordTipoEdad = storeTipoEquipoEdades.getAt(i);
                var checked=false;
                for (var j=0; j<cantidadEdades; j++) {if (recordTipoEdad.data.id == equipoEdades[j]){checked = true; break;}}
                checks[i] = [{
                            xtype     : 'checkbox',
                            idEdad    : recordTipoEdad.data.id,
                            idEquipo  : idEquipo,
                            boxLabel  : recordTipoEdad.data.Descripcion,
                            checked   : checked,
                            disabled  : indSoloVer,
                            margin    : '10,5,5,70',
                            inputValue: i,
                            id        : 'checkboxEdad'+i,
                            itemId    : 'checkboxEdad'+i,
                            idItem    : 'checkboxEdad'
                            }];
               } // Fin del For 
             plnEdades.add([checks]);
            
            checks = new Array();
            var storeTipoEquipoGenero = aplicacion.getStore('catalogos.TipoEquipoGeneros');
            var plnGeneros = windowx.query('#plnGenero05');
            plnGeneros = plnGeneros[0];
           for (i=0; i < storeTipoEquipoGenero.getTotalCount(); i++) {
                var recordTipoGenero = storeTipoEquipoGenero.getAt(i);
                checked=false;
                for (j=0; j<cantidadGeneros; j++) {if (recordTipoGenero.data.id == equipoGeneros[j]){checked = true; break;}}
                checks[i] = [{
                            xtype     : 'checkbox',
                            idGenero  : recordTipoGenero.data.id,
                            idEquipo  : idEquipo,
                            boxLabel  : recordTipoGenero.data.Descripcion,
                            checked   : checked,
                            disabled  : indSoloVer,
                            margin    : '10,5,5,70',
                            inputValue: i,
                            id        : 'checkboxGenero'+i,
                            itemId    : 'checkboxGenero'+i,
                            idItem    : 'checkboxGenero'
                            }];
               } // Fin del For 
            plnGeneros.add([checks]);
            
            checks = new Array();
            var storeTipoFutbol = aplicacion.getStore('catalogos.TipoFutboles');
            var plnFutboles = windowx.query('#plnTipoFutbol05');
            plnFutboles = plnFutboles[0];
            for (i=0; i < storeTipoFutbol.getTotalCount(); i++) {
                var recordTipoFutbol = storeTipoFutbol.getAt(i);
                checked=false;
                for (j=0; j<cantidadFutboles; j++) {if (recordTipoFutbol.data.id == equipoFutboles[j]){checked = true; break;}}
                checks[i] = [{
                            xtype     : 'checkbox',
                            idFutbol  : recordTipoFutbol.data.id,
                            idEquipo  : idEquipo,
                            boxLabel  : recordTipoFutbol.data.Descripcion,
                            checked   : checked,
                            disabled  : indSoloVer,
                            margin    : '10,5,5,70',
                            inputValue: i,
                            id        : 'checkboxTipoFutbol'+i,
                            itemId    : 'checkboxTipoFutbol'+i,
                            idItem    : 'checkboxTipoFutbol'
                            }];
               } // Fin del For 
            plnFutboles.add([checks]);
            
            var x = windowx.getPosition()[0];   
            var y = windowx.getPosition()[1]; 
            if (y<=5) {windowx.setPosition(x,10);}  
     
     
     
         } // Fin de Funcion para cuando el Ajax Request responde correctamente

       var datos = '{"idEquipo":"' + idEquipo + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Lista de los jugadores de un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'obtenerDatosEquipoyJugadores',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
         
   }, // fin clickBtnEditarDatosEquipo
     
//=========================================================================================================================
    // click en el DataView / Boton de eliminar un Jugador
    clickJugadorMiEquipo: function(e,target) {
        //console.log(target.className);
        var me = this;
        var view = Ext.ComponentQuery.query('#dvJugadores'); 
        view = view[0];
        
        if (target.className != 'x-boton-jugador') {return;}
        
        var item = view.findItemByChild(target);
        var record = view.store.getAt(view.indexOf(item));
        
        ////console.log(view.indexOf(item));
        ////console.log(view.store);
        ////console.log(record.data);
        ////console.log(record.data.idEquipo);
        ////console.log(record.data.idJugador);
        ////console.log(record.data.idUsuarioAdmin);
        
        if (record.data.idJugador == record.data.idUsuarioAdmin) {
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>El Capitán del Equipo no se puede eliminar!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document); 
                return;}
        
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request
     
       // Funcion para cuando el Ajax responde correctamente
       var successAjaxFn = function(response, request) {  
            var obj = Ext.JSON.decode(response.responseText);
            
            view.store.removeAt(view.indexOf(item));
            
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>El Jugador ' + record.data.nombreJugador + ' ' + record.data.apellidosJugador + ' fue eliminado de este equipo!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  3000}).show(document);
       
         } // Fin de Funcion para cuando el Ajax Request responde correctamente

       var datos = '{"idEquipo":"' + record.data.idEquipo + '","idJugador":"' + record.data.idJugador + '"}';
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Elimina un Jugador en un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'eliminarJugadorEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
        
        //var filtrarStoreJugadoresFn= function(record,id) {
           ////console.log('Filtra');
           //if (record.data.apellidosJugador == 'Chaves') {return true;}
           //return false;
        //}
        //view.store.filterBy(filtrarStoreJugadoresFn, this);
        //view.store.sort('apellidosJugador', 'ASC');
        
    },
    
//=========================================================================================================================
 
changeCheckBoxTipoFutbol: function(checkBox) {
       //console.log('changeCheckBoxTipoFutbol');
       //console.log(checkBox.idEquipo);
       //console.log(checkBox.idFutbol);
       //console.log(checkBox.checked);
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
             semaforoAjaxMask = true;
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request
     
       // Funcion para cuando el Ajax responde correctamente
       var successAjaxFn = function(response, request) { 
            semaforoAjaxMask = true;
         } // Fin de Funcion para cuando el Ajax Request responde correctamente
         
       semaforoAjaxMask = false;
       var datos = '{"idEquipo":"' + checkBox.idEquipo + '","idTipoFutbol":"' + checkBox.idFutbol + '","checked":"' + checkBox.checked +'"}';
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Actualiza los Tipos de Futbol de un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'actualizarTipoFutbolEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
},

//========================================================================================================================================/
 
changeCheckBoxEdad: function(checkBox) {
       //console.log('changeCheckBoxEdad');
       //console.log(checkBox.idEquipo);
       //console.log(checkBox.idEdad);
       //console.log(checkBox.checked);
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {
               semaforoAjaxMask = true;
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request
     
       // Funcion para cuando el Ajax responde correctamente
       var successAjaxFn = function(response, request) {  
            semaforoAjaxMask = true;
         } // Fin de Funcion para cuando el Ajax Request responde correctamente
  
       semaforoAjaxMask = false;
       var datos = '{"idEquipo":"' + checkBox.idEquipo + '","idTipoEdad":"' + checkBox.idEdad + '","checked":"' + checkBox.checked +'"}';
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Actualiza los Tipos de Futbol de un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'actualizarTipoEdadEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
}, 

//========================================================================================================================================/

changeCheckBoxGenero: function(checkBox) {
       //console.log('changeCheckBoxGenero');
       //console.log(checkBox);
       //console.log(checkBox.idEquipo);
       //console.log(checkBox.idGenero);
       //console.log(checkBox.checked);
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              semaforoAjaxMask = true;
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request
     
       // Funcion para cuando el Ajax responde correctamente
       var successAjaxFn = function(response, request) {
            semaforoAjaxMask = true;
         } // Fin de Funcion para cuando el Ajax Request responde correctamente

       semaforoAjaxMask = false;
       var datos = '{"idEquipo":"' + checkBox.idEquipo + '","idTipoGenero":"' + checkBox.idGenero + '","checked":"' + checkBox.checked +'"}';
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Actualiza los Tipos de Futbol de un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'actualizarTipoGeneroEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
},

//========================================================================================================================================/
 
// Pantalla para incluir Jugadores a un Equipo
clickBtnIncluirJugadores05: function(button) {
    //console.log('clickBtnIncluirJugadores05');
      
    if (button.idUsuarioAdmin != global_id_usuario) {return;}
            
    var win = Ext.widget('winIncluirJugadoresEquipo');
    win.show();
    win.setTitle('Incluyendo jugadores al Equipo: ' + button.nombreEquipo);
    var idEquipo = button.idEquipo;
    var idUsuarioAdmin = button.idUsuarioAdmin;
    win.setIdEquipo(idEquipo);
    win.setIdUsuarioAdmin(idUsuarioAdmin);
    
    // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request
     
       // Funcion para cuando el Ajax responde correctamente
       var successAjaxFn = function(response, request) {  
            var obj = Ext.JSON.decode(response.responseText); 
       
            var cantidadJugadoresDisp = obj.respuesta[0].mensaje.cantidadJugadoresDisp;
            var storeJugadoresDisp = Ext.create('Ext.data.Store', {
                                    fields: ['idEquipo', idUsuarioAdmin, 'idJugador', 'nombreJugador', 'apellidosJugador', 'EMailJugador', 'telefonoJugador','urlFotoJugador']});
            for (var i=0; i<cantidadJugadoresDisp; i++) {
                    storeJugadoresDisp.add({idEquipo          : idEquipo,
                                            idUsuarioAdmin    : idUsuarioAdmin,
                                            idJugador         : obj.respuesta[1].results[i].IdUsuario,
                                            nombreJugador     : obj.respuesta[1].results[i].Nombre,
                                            apellidosJugador  : obj.respuesta[1].results[i].Apellidos,
                                            EMailJugador      : obj.respuesta[1].results[i].EMail,
                                            telefonoJugador   : obj.respuesta[1].results[i].TelCelular,
                                            urlFotoJugador    : "resources/fotosUsuarios/" + obj.respuesta[1].results[i].FotoFile
                                     });
                    } // Fin del For para llenar el store
                               
           var tplJugadoresDisp = new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="jugador-wrap-Disp" height="55" width="55">',
                       '<div class="jugador-box-Disp">',
                            '<center>',
                            '<span class="x-nombre-jugador">{nombreJugador} </span><br>',
                            '<span class="x-apellidos-jugador">{apellidosJugador}</span><br>',
                            '<img class-"x-foto-jugador" src="{urlFotoJugador}" title="{nombreJugador}" height="42" width="42"><br>',
                            '<button class="x-boton-jugador-Disp" type="button"> Incluir </button>',
                            '</center>',
                       '</div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>');                   
                   
            var dvJugadoresDisp = new Ext.view.View({
                    id:     'dvJugadoresDisp',
                    itemId: 'dvJugadoresDisp',
                    autoScroll: true,
                    store: storeJugadoresDisp, 
                    tpl: tplJugadoresDisp,
                    trackOver: true,
                    width: 600,
                    height: 215,
                    multiSelect: true,
                    simpleSelect : true,
                    overClass: 'x-view-over', 
                    itemSelector: 'div.jugador-wrap-Disp',
                    selectedItemCls: 'jugador-box-selected-Disp',
                    emptyText: 'No images to display',
                    border: true
                });

            var dvJugadoresDispx= win.query('#pnlDvJugadoresDisp');
            dvJugadoresDispx = dvJugadoresDispx[0];
            dvJugadoresDispx.add([dvJugadoresDisp]);   

         } // Fin de Funcion para cuando el Ajax Request responde correctamente

       var datos = '{"idEquipo":"' + idEquipo + '","idUsuario":"' + global_id_usuario + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Obtener Lista de los jugadores Disponibles para incluir en un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'obtenerListaJugadoresDisp',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
    
      
    },

//=========================================================================================================================

   clickBtnVolverAVerEquipos: function(button) {
        var panelCentral = Ext.ComponentQuery.query('#panel_central');
        panelCentral =  panelCentral[0];
        panelCentral.removeAll();
        var view = Ext.widget('winMisEquipos');
        panelCentral.add([view]);
        var win1 = Ext.ComponentQuery.query('#winMisEquipos');
        win1 = win1[0];    
},

//=========================================================================================================================

// click en el boton Enviar Mensaje en Panel de Amigo
   clickBtnEnviarMensajeEquipo: function(button) {
            //console.log('clickBtnEnviarMensajeEquipo');
            var view = Ext.widget('winEnviarMensajeEquipo');
            view.show();
            view.setTitle('Mensaje a los Jugadores del Equipo: ' + button['nombreEquipo']);
            view.setIdEquipo(button['idEquipo']);
            view.setNombreEquipo(button['nombreEquipo']);
            view.setIdUsuarioEnvia(button['idUsuarioAdmin']);
   }, // fin clickBtnEnviarMensajeEquipo
     
//=========================================================================================================================
    
   // click en el boton clickBtnCambiarEscudoEquipo
   clickBtnCambiarEscudoEquipo: function(button) {
            //console.log('clickBtnCambiarEscudoEquipo' + button['idUsuarioAdmin']);
            
            if (button['idUsuarioAdmin'] != global_id_usuario) {return;}
            
            var view = Ext.widget('winCambiarEscudoEquipo');
            view.show();
            view.setTitle('Cambiando el escudo al Equipo: ' + button['nombreEquipo']);
            view.setIdEquipo(button['idEquipo']);
            view.setFileEscudoOrig(button['escudoFile']);
            view.setIdItem(button['idItem']);   
            var idItem = button['idItem'];
            var idEquipo = button['idEquipo'];
            
            var storeEscudos = Ext.create('Ext.data.Store', {
                                    fields: ['id', 'idItem', 'idEquipo', 'escudoUrl'],
                                    data : [{id: '01' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo01.jpg'},
                                            {id: '02' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo02.jpg'},
                                            {id: '03' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo03.jpg'},
                                            {id: '04' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo04.jpg'},
                                            {id: '05' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo05.jpg'},
                                            {id: '06' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo06.jpg'},
                                            {id: '07' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo07.jpg'},
                                            {id: '08' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo08.jpg'},
                                            {id: '09' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo09.jpg'},
                                            {id: '10' , idItem: idItem , idEquipo: idEquipo, escudoUrl : 'resources/escudosEquipos/Escudo10.jpg'}] 
                               });
                               
            var tplEscudos = new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="escudo-wrap">',
                       '<div class="escudo-box">',
                            '<img src="{escudoUrl}" title="{escudoUrl}">',
                       '</div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>');
                   
                   
            var dvEscudos = new Ext.view.View({
                    id:    'dvEscudos',
                    itemId: 'dvEscudos',
                    autoScroll: true,
                    store: storeEscudos, 
                    tpl: tplEscudos,
                    trackOver: true,
                    width: 1400,
                    multiSelect: false,
                    overClass: 'x-view-over', 
                    itemSelector: 'div.escudo-wrap',
                    selectedItemCls: 'escudo-box-selected',
                    emptyText: 'No images to display',
                    border: true
                });

            var dvEscudox= view.query('#pnlDvEscudos');
            dvEscudox = dvEscudox[0];
            dvEscudox.add([dvEscudos]);
                               
   }, // fin clickBtnCambiarEscudoEquipo
     
//=========================================================================================================================
    
   // click en el boton clickBtnEliminarEquipo
   clickBtnEliminarEquipo: function(button) {
        console.log('clickBtnEliminarEquipo' + button['idUsuarioAdmin']);
            
        if (button['idUsuarioAdmin'] != global_id_usuario) {return;}
       
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
               var plnMisEquipos = Ext.ComponentQuery.query('#plnMisEquipos');
               plnMisEquipos = plnMisEquipos[0];
               //console.log(plnMisEquipos);
               plnMisEquipos.remove('plnEquipo'+button['idItem']);
               //plnMisEquipos.doLayout();
           } // Fin de Funcion para cuando el Ajax Request responde correctamente

       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().mask();
       Ext.MessageBox.show({
           closable: false,
           msg: "<b>Favor confirmar la eliminación del equipo: " + button['nombreEquipo'] +"</b>",
           width:  150,
           height: 100,
           buttons: Ext.MessageBox.OKCANCEL,
           modal: false,
           fn: showResult02
       });
       
       function showResult02(btn){
            ////console.log(btn);
            panelPapa.getEl().unmask();
            if (btn == 'ok') {
                    var datos = '{"idEquipo":"' + button['idEquipo'] + '"}'; 
                    Ext.Ajax.request({  
                            url: 'php/RouterDBAJugarFutbol.php',  
                            method: 'POST',  
                            success: successAjaxFn,  
                            failure: failureAjaxFn, 
                            timeout: 30000,  
                            headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Eliminar un Equipo y sus Jugtadores'},  
                            params: {clasePhp: 'UsuarioDB',
                                    metodo:   'eliminarEquipo',
                                    datos:    datos}  
                    }) // Fin de la llamada Ajax
             } 
   }
                               
   }, // fin clickBtnEliminarEquipo
     
//=========================================================================================================================

   // Crea panel Equipo
   creaPanelEquipo: function(ii, idEquipo, nombreEquipo, fotoFile, escudoFile, idUsuarioAdmin, fotoCapitan, nombreCapitan, apellidosCapitan) {
   
   pnlEquipo = [{
                    xtype: 'panel',
                    id:     'plnEquipo',
                    itemId: 'plnEquipo',
                    margin: 10,
                    width: 358,
                    bodyStyle:'background-color:transparent;border:none;',  
                    layout: {columns: 3,type: 'table'},
                    overCls: 'x-panel-over',
                    items: [{
                            xtype: 'fieldset',
                            id: 'plnFieldSetEquipo04',
                            itemId: 'plnFieldSetEquipo04',
                            width: 350,
                            height: 138,
                            margin: 5,
                            layout: {columns: 2,type: 'table'},
                            title: '<b><font size=3>'+nombreEquipo+'</font></b>',
                            bodyStyle:'background-color:transparent;border:none;',  
                            items: [{
                                    xtype: 'image',
                                    height: 101,
                                    width: 101,
                                    id:     'imgEscudoEquipo04',
                                    itemId: 'imgEscudoEquipo04',
                                    rowspan: 3,
                                    idEquipo: idEquipo,
                                    idUsuarioAdmin: idUsuarioAdmin,
                                    nombreEquipo: nombreEquipo,
                                    escudoFile: escudoFile,
                                    fotoFile: fotoFile,
                                    src: 'resources/escudosEquipos/' + escudoFile,     
                                    tooltip: 'Cambiar el escudo del Equipo'
                                },
                                {
                                    xtype: 'panel',
                                    width: 250,
                                    layout: {type: 'table'},
                                    margin: '5px 5px 5px 5px',
                                    bodyStyle:'background-color:transparent;border:none;',  
                                    items: [{
                                            xtype: 'button',
                                            height: 32,
                                            id:     'btnEditarDatosEquipo',
                                            itemId: 'btnEditarDatosEquipo',
                                            idItem: 0,
                                            idEquipo: idEquipo,
                                            idUsuarioAdmin: idUsuarioAdmin,
                                            nombreEquipo: nombreEquipo,
                                            escudoFile: escudoFile,
                                            fotoFile: fotoFile,
                                            fotoCapitan: fotoCapitan,
                                            nombreCapitan: nombreCapitan,
                                            apellidosCapitan: apellidosCapitan,                                            style: 'margin-top:5px;margin-left:20px;',
                                            width: 90,
                                            text: 'Editar Datos',
                                            tooltip: 'Editar Datos Generales del Equipo'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 32,
                                            id:     'btnEnviarMensajeEquipo01',
                                            itemId: 'btnEnviarMensajeEquipo01',
                                            idItem: 0,
                                            idEquipo: idEquipo,
                                            idUsuarioAdmin: idUsuarioAdmin,
                                            nombreEquipo: nombreEquipo,
                                            style: 'margin-top:5px;margin-left:20px;',
                                            width: 90,
                                            text: 'Enviar Mensaje',
                                            tooltip: 'Enviar mensaje a todos los Jugadores del Equipo'
                                        }]
                                 },
                                 {
                                    xtype: 'panel',
                                    height: 30,
                                    width: 250,
                                    layout: {type: 'table'},
                                    margin: 5,
                                    bodyStyle:'background-color:transparent;border:none;',  
                                    items: [{
                                            xtype: 'displayfield',
                                            id: 'lblMensaje',
                                            itemId: 'lblMensaje',
                                            margin: '5px',
                                            width: 245,
                                            value: ''
                                           }]
                                  },
                                  {
                                    xtype: 'panel',
                                    layout: {type: 'table'},
                                    margin: 5,
                                    bodyStyle:'background-color:transparent;border:none;',  
                                    items: [{
                                            xtype: 'button',
                                            height: 20,
                                            width: 90,
                                            idItem: 0,
                                            idEquipo: idEquipo,
                                            idUsuarioAdmin: idUsuarioAdmin,
                                            nombreEquipo: nombreEquipo,
                                            escudoFile: escudoFile,
                                            fotoFile: fotoFile,
                                            id:'btnCambiarEscudo01',
                                            itemId:'btnCambiarEscudo01',
                                            style:'border:0px; background:#ffffff',
                                            text: 'Cambiar Escudo',
                                            tooltip:'Cambiar el escudo del Equipo'
                                           },
                                           {
                                            xtype: 'button',
                                            height: 20,
                                            width: 86,
                                            idItem: 0,
                                            idEquipo: idEquipo,
                                            idUsuarioAdmin: idUsuarioAdmin,
                                            nombreEquipo: nombreEquipo,
                                            id:'btnEliminarEquipo01',
                                            itemId:'btnEliminarEquipo01',
                                            style:'border:0px; margin-top:0px; margin-bottom:0px; margin-right:0x; margin-left:40px; background:#ffffff',
                                            text: 'Eliminar',
                                            tooltip:'Eliminar el Equipo'
                                           }]
                                  }]
                              }]
                         }];
   
   
   pnlEquipo[0]['id']     = 'plnEquipo'+ii;
   pnlEquipo[0]['itemId'] = 'plnEquipo'+ii;
   
   pnlEquipo[0]['items'][0]['id']     = 'plnFieldSetEquipo04'+ii;
   pnlEquipo[0]['items'][0]['itemId'] = 'plnFieldSetEquipo04'+ii;
   
   pnlEquipo[0]['items'][0]['items'][0]['id']     = 'imgEscudoEquipo04'+ii;
   pnlEquipo[0]['items'][0]['items'][0]['itemId'] = 'imgEscudoEquipo04'+ii;
   pnlEquipo[0]['items'][0]['items'][0]['src'] = 'resources/escudosEquipos/'+escudoFile;
   pnlEquipo[0]['items'][0]['items'][0]['idEquipo'] = idEquipo;
   pnlEquipo[0]['items'][0]['items'][0]['idUsuarioAdmin'] = idUsuarioAdmin;
   pnlEquipo[0]['items'][0]['items'][0]['nombreEquipo'] = nombreEquipo;
   pnlEquipo[0]['items'][0]['items'][0]['escudoFile'] = escudoFile;   
   pnlEquipo[0]['items'][0]['items'][0]['fotoFile'] = fotoFile;   
   pnlEquipo[0]['items'][0]['items'][0]['idItem'] = ii;   
   
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['id']     = 'btnEditarDatosEquipo'+ii;
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['itemId'] = 'btnEditarDatosEquipo';
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['idEquipo'] = idEquipo;
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['idUsuarioAdmin'] = idUsuarioAdmin;
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['nombreEquipo'] = nombreEquipo;
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['escudoFile'] = escudoFile;   
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['fotoFile'] = fotoFile;  
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['fotoCapitan'] = fotoCapitan;  
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['nombreCapitan'] = nombreCapitan;  
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['apellidosCapitan'] = apellidosCapitan;  
   
   pnlEquipo[0]['items'][0]['items'][1]['items'][0]['idItem'] = ii;    
   
   pnlEquipo[0]['items'][0]['items'][1]['items'][1]['id']     = 'btnEnviarMensajeEquipo01'+ii;
   pnlEquipo[0]['items'][0]['items'][1]['items'][1]['itemId'] = 'btnEnviarMensajeEquipo01';
   pnlEquipo[0]['items'][0]['items'][1]['items'][1]['idEquipo'] = idEquipo;
   pnlEquipo[0]['items'][0]['items'][1]['items'][1]['idUsuarioAdmin'] = idUsuarioAdmin;
   pnlEquipo[0]['items'][0]['items'][1]['items'][1]['nombreEquipo'] = nombreEquipo;
   pnlEquipo[0]['items'][0]['items'][1]['items'][1]['idItem'] = ii;    
   
   pnlEquipo[0]['items'][0]['items'][2]['items'][0]['id']     = 'lblMensaje'+ii;
   pnlEquipo[0]['items'][0]['items'][2]['items'][0]['itemId'] = 'lblMensaje';
   
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['idEquipo'] = idEquipo;
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['idUsuarioAdmin'] = idUsuarioAdmin;
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['nombreEquipo'] = nombreEquipo;
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['escudoFile'] = escudoFile;   
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['fotoFile'] = fotoFile;   
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['idItem'] = ii;    
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['id']     = 'bntCambiarEscudo01'+ii;
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['itemId'] = 'bntCambiarEscudo01';      
   pnlEquipo[0]['items'][0]['items'][3]['items'][0]['text']   = '<u>Cambiar Escudo</u>';
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['idItem'] = ii;
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['idEquipo'] = idEquipo;
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['idUsuarioAdmin'] = idUsuarioAdmin;
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['nombreEquipo'] = nombreEquipo;
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['id']     = 'btnEliminarEquipo01'+ii;
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['itemId'] = 'btnEliminarEquipo01';      
   pnlEquipo[0]['items'][0]['items'][3]['items'][1]['text']   = '<u>Eliminar</u>'; 
   
   if (idUsuarioAdmin == global_id_usuario) {
         pnlEquipo[0]['items'][0]['items'][2]['items'][0]['value'] = '<b>Usted es el Capitán en este equipo.</b>';
         pnlEquipo[0]['items'][0]['items'][3]['items'][0]['disabled']=false;
         pnlEquipo[0]['items'][0]['items'][3]['items'][0]['hidden']=false;
         pnlEquipo[0]['items'][0]['items'][3]['items'][1]['disabled']=false;
         pnlEquipo[0]['items'][0]['items'][3]['items'][1]['hidden']=false;
         pnlEquipo[0]['items'][0]['items'][1]['items'][0]['disabled']=false;
         pnlEquipo[0]['items'][0]['items'][1]['items'][0]['hidden']=false;
         } else {
            pnlEquipo[0]['items'][0]['items'][2]['items'][0]['value'] = 'Usted es Jugador en este equipo.'; 
            pnlEquipo[0]['items'][0]['items'][3]['items'][0]['disabled']=true;
            pnlEquipo[0]['items'][0]['items'][3]['items'][0]['hidden']=true;
            pnlEquipo[0]['items'][0]['items'][3]['items'][1]['disabled']=true;
            pnlEquipo[0]['items'][0]['items'][3]['items'][1]['hidden']=true;
            pnlEquipo[0]['items'][0]['items'][1]['items'][0]['text'] = 'Ver Datos';
            
         }
   
   return pnlEquipo[0];
   
   }, // Crea panel de Equipo
    
//=========================================================================================================================

clickBtnEnviarMsj: function (button) {
    
       //console.log('clickBtnEnviarMsj');

       var win = Ext.ComponentQuery.query('#winEnviarMensajeEquipo');
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
     
       var objx = win.query('#txtMsjEq');
       objx = objx[0]; 
       var mensaje = objx.getValue();
       mensaje = escape(mensaje);
       
       var idEquipo       = win.getIdEquipo();
       var nombreEquipo   = win.getNombreEquipo();
       var idUsuarioEnvia = global_id_usuario;
       
       //console.log(idEquipo,idUsuarioEnvia,mensaje);
       var datos = '{"idEquipo":"' + idEquipo + '","nombreEquipo":"' + nombreEquipo + '","idUsuarioEnvia":"' + idUsuarioEnvia + '","mensaje":"' + mensaje + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Enviar un Mensaje a un Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'enviaMensajeJugadoresEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
   
 },  // Fin de clickBtnEnviarMsj

// ========================================================================================================================

SeleccionoEscudo: function (Element) {
        ////console.log('SeleccionoEscudo');     
        ////console.log(Element['selected']['items'][0].data.idItem);
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) { 
                    var ventana = Element['selected']['items'][0]['data']['idItem'];
                    var plnEquipo = Ext.ComponentQuery.query('#plnEquipo'+ventana);
                    plnEquipo = plnEquipo[0];
                    var imgEscudo = plnEquipo.query('#imgEscudoEquipo04'+ventana);
                    imgEscudo = imgEscudo[0];
                    imgEscudo.setSrc(Element['selected']['items'][0]['data']['escudoUrl']);
                    var win = Ext.ComponentQuery.query('#winCambiarEscudoEquipo');
                    win = win[0];
                    win.close(); 
           } // Fin de Funcion para cuando el Ajax Request responde correctamente
     
       var idEquipo   = Element['selected']['items'][0]['data']['idEquipo'];
       var fileEscudo = 'Escudo' + Element['selected']['items'][0]['data']['id'] + '.jpg';
       
       var datos = '{"idEquipo":"' + idEquipo + '","fileEscudo":"' + fileEscudo + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Equipo. Cambiar el Escudo al Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'cambiaEscudoEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
},

// =======================================================================================================================================

   SeleccionoJugador: function (e,target) {
       //console.log('SeleccionoJugador');  
       //console.log(target);
       //console.log(target.className);
       var me = this;
       var view = Ext.ComponentQuery.query('#dvJugadoresDisp'); 
       view = view[0];
       var view2 = Ext.ComponentQuery.query('#dvJugadores'); 
       view2 = view2[0];
      
       if (target.className != 'x-boton-jugador-Disp') {return;}
        
       var item = view.findItemByChild(target);
       var record = view.store.getAt(view.indexOf(item));
      
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
            view2.store.add({idEquipo          : record.data.idEquipo,
                             idUsuarioAdmin    : record.data.idUsuarioAdmin,
                             idJugador         : record.data.idJugador,
                             nombreJugador     : record.data.nombreJugador,
                             apellidosJugador  : record.data.apellidosJugador,
                             EMailJugador      : record.data.EMailJugador,
                             telefonoJugador   : record.data.telefonoJugador,
                             urlFotoJugador    : record.data.urlFotoJugador
                          });
            view2.store.sort([{property : 'nombreJugador',direction: 'ASC'},
                              {property : 'apellidosJugador',direction: 'ASC'}
                            ]);
            view.store.removeAt(view.indexOf(item));
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Información</font>',
                html:	 '<b>El Jugador ' + record.data.nombreJugador + ' ' + record.data.apellidosJugador + ' fue incluido en este Equipo!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  2000}).show(document); 
           } // Fin de Funcion para cuando el Ajax Request responde correctamente
     
       ////console.log(record);
       var idEquipo   = record.data.idEquipo;
       var idJugador  = record.data.idJugador;
       
       var datos = '{"idEquipo":"' + idEquipo + '","idJugador":"' + idJugador + '"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto Equipo. Cambiar el Escudo al Equipo'},  
             params: {clasePhp: 'UsuarioDB',
                      metodo:   'incluirJugadorEquipo',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
       
}           

});
