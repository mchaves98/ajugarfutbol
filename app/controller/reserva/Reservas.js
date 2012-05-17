Ext.define('AJugarFutbol.controller.reserva.Reservas', {
    extend: 'Ext.app.Controller',

    views: ['reserva.BusquedaReservar',
            'instalacion.Instalacion',
            'instalacion.Informacion',
            'instalacion.MapaGoogle',
            'instalacion.GaleriaFotos',
            'instalacion.Canchas',
            'instalacion.InstalacionPrueba',
            'instalacion.DetalleCanchas',
            'reserva.CalenReserva',
            'reserva.ConfirmaReservacion',
            'reserva.SimpleReservacion',
            'reserva.ApruebaReto'],   
    
    
    init: function() {        
        me=this;
        this.control({ 
            //Botones de ventana de Calendario Reservar
            'winCalenReserva button[id=btnCalenVolverBusqueda]':{click: this.volverAbusqueda},
            'winCalenReserva button[idItem=btnRealizaReservacion]':{click: this.prueba},
            'winCalenReserva combobox[id=cmbCanchas]':{change: this.seleccionoCanchaReserva},
            'winCalenReserva button[id=btnActualizar]':{click: this.seleccionoCanchaReserva},
            'winCalenReserva button[id=btnSemanaSiguiente]':{click: this.seleccionoSemanaSiguiente},
            'winCalenReserva button[id=btnSemanaAnterior]':{click: this.seleccionoSemanaAnterior},
            //Botones de la ventana Confirmar Reservacion
            'winConfirmaReservacion button[id=btnCancelaReservacion]':{click: this.cierraVentanaConfirmarReserva},
            'winConfirmaReservacion button[id=btnConfirmaReservacion]':{click: this.confirmarReserva},
            'winConfirmaReservacion checkboxfield[id=chkCREquipo]':{change: this.checkVentanaConfirmarReservacion},
            //FIN Botones de la ventana Confirmar Reservacion
            //Botones de la ventana Aprobar Reto            
            'winApruebaReto button[id=btnAceptaReto]':{click: this.confirmarReto},            
            'winApruebaReto button[id=btnCancelarReto]':{click: this.cierraVentanaReto},
            //FIN Botones de la ventana Aprobar Reto
            // Eventos de la Pantalla de Buscar Cancha 
            'winBusquedaReservar button[id=btnBuscar]':{click: this.buscarCancha},
            // Eventos de los combos de la Pantalla de Buscar Cancha 
            'winBusquedaReservar combobox[id=cmbProvincia]':  {select: this.seleccionoProvincia},
            'winBusquedaReservar combobox[id=cmbCanton]':     {select: this.seleccionoCanton},
            'winBusquedaReservar combobox[id=cmbDistrito]':   {select: this.seleccionoDistrito},
            // Eventos cada instalacion en la pantalla Buscar Cancha
            'winBusquedaReservar button[item=btnMapaGoogleInstalacion]':   {click: this.seleccionoMapa},
            'winBusquedaReservar button[item=btnCampeonatosInstalacion]':   {click: this.seleccionoCampeonatos},
            'winBusquedaReservar button[item=btnServiciosInstalacion]':   {click: this.seleccionoServicios},
            'winBusquedaReservar button[item=btnCanchasInstalacion]':   {click: this.seleccionoCanchas},
            'winBusquedaReservar button[item=btnGaleriaFotosInstalacion]':   {click: this.seleccionoGaleria},
            'winBusquedaReservar button[item=btnReservarInstalacion]':   {click: this.seleccionoReservar},
            //'winBusquedaReservar imageEx[item=imgFavoritaInstalacion]':   {click: this.clickBotonMenu},
            'winInformacion checkboxfield[id=infoChkFavorita]':   {change: this.seleccionoFavoritaInformacion},
            'winBusquedaReservar panel[id=plnInstalaciones]':{render: this.muestraInstalaciones},
            'winBusquedaReservar datefield[id=dteFecha]':{select: this.cambiaDiaALetra,render: this.cambiaDiaALetra},
            'winBusquedaReservar button[id=btnVerMasInstalaciones]':{click: this.verMasInstalaciones},
            //Cuando cierra las ventanas Windows
            'winConfirmaReservacion' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winApruebaReto' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},     
            'winCanchas' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},     
            'winMapaGoogle' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},     
            'winGaleriaFotos' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},     
            'winSimpleReservacion' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winSimpleReservacion button[id=btnSimpleReservacionSalir]' : {click: this.cierraVentanaSimpleReservacion}
        });
        
    },
//=========================================================================================================================
    cierraVentanaSimpleReservacion: function(button) {
       var win = Ext.ComponentQuery.query('#winSimpleReservacion');
        win = win[0];                 
        win.close();
},
//=========================================================================================================================
    cierraVentanasWin: function(button) {
        var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       semaforoAjaxMask=true;
},
//=========================================================================================================================
volverAbusqueda: function() {            
        var panel_central = Ext.ComponentQuery.query('#panel_central');
        panel_central = panel_central[0];             
        panel_central.removeAll();            
        panel_central.doLayout(); 
        
        var winBusquedaReservar = Ext.widget('winBusquedaReservar');                
                
        panel_central.add(winBusquedaReservar);    
        var obj  = winBusquedaReservar.query('#plnBusqueda');
        obj = obj[0];        
        obj.expand();
        obj.setHeight(200);
        panel_central.doLayout(); 
        panel_central.doAutoRender();
    },
    // Click en Boton fecha

    cambiaDiaALetra: function() {
        var win = Ext.ComponentQuery.query('#winBusquedaReservar');
        win = win[0]; 
        
        var obj = win.query('#dteFecha');
        obj = obj[0];   
        var fechaSelecciono = obj.getValue();
        //var anno=fechaSelecciono.getFullYear();        
        //var mes=fechaSelecciono.getMonth();
        //var dia=fechaSelecciono.getDate();               
        //fechaSelecciono=dia+'/'+mes+'/'+anno;
        var fechaHoy=new Date();
                
        var restaDias= fechaSelecciono.getTime()-fechaHoy.getTime();
        var diasD = Math.floor(restaDias/(1000 * 60 * 60 * 24));
        if(diasD<6)
        {
            if(diasD==-1){obj.setRawValue('Hoy');return;}
            else{if(diasD==0){obj.setRawValue('Mañana');return;}}
            
            var dia=fechaSelecciono.getDay(); 
            if(dia==1){obj.setRawValue('Este lunes');return;}
            if(dia==2){obj.setRawValue('Este martes');return;}
            if(dia==3){obj.setRawValue('Este miercoles');return;}
            if(dia==4){obj.setRawValue('Este jueves');return;}
            if(dia==5){obj.setRawValue('Este viernes');return;}
            if(dia==6){obj.setRawValue('Este sabado');return;}
            if(dia==0){obj.setRawValue('Este domingo');return;}
        }                
        /*if(fechaNacimiento!=null)
        {
            var anno=fechaNacimiento.getFullYear();        
            var mes=fechaNacimiento.getMonth();
            var dia=fechaNacimiento.getDate();               
            fechaNacimiento=anno+'-'+mes+'-'+dia; 
        }   */  
    },
    // Click en Boton buscar cancha 
//
//==============================================================================================
//
    buscarCancha: function() {
            
            var win = Ext.ComponentQuery.query('#winBusquedaReservar');
            win = win[0];
            
            var plnInstalaciones = win.query('#plnInstalaciones');
            plnInstalaciones = plnInstalaciones[0];            
            plnInstalaciones.removeAll();          
            plnInstalaciones.doLayout();
            
            var plnBusqueda = Ext.ComponentQuery.query('#plnBusqueda');
            plnBusqueda =  plnBusqueda[0];    
            
            var verMas= Ext.ComponentQuery.query('#btnVerMasInstalaciones');
            verMas=verMas[0];
            verMas.setVisible(false);
            
            //Obtengo los valores de los filtros(Provincia, Cant�n, Distrito, Superficie, Tipo, Fecha y hora)
            var provincia = Ext.ComponentQuery.query('#cmbProvincia');
            provincia =  provincia[0];
            var provDescripcion=provincia.getRawValue(); 
            provincia=provincia.getValue();             
            
            var canton = Ext.ComponentQuery.query('#cmbCanton');
            canton =  canton[0];
            var cantDescripcion=canton.getRawValue();
            canton=canton.getValue(); 
            
            var distrito = Ext.ComponentQuery.query('#cmbDistrito');
            distrito =  distrito[0];
            var distDescripcion=distrito.getRawValue();
            distrito=distrito.getValue();  
            
            var superficie = Ext.ComponentQuery.query('#cmbTipoSuperficie');
            superficie =  superficie[0];
            var superfDescripcion=superficie.getRawValue();
            superficie=superficie.getValue(); 
            
            var tipoCancha = Ext.ComponentQuery.query('#cmbTipoCancha');
            tipoCancha =  tipoCancha[0];
            var TipoCacDescripcion=tipoCancha.getRawValue();
            tipoCancha=tipoCancha.getValue(); 
            //Fin de obtener valores
            
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

           var obj = Ext.JSON.decode(response.responseText); 
           var todasInstalaciones=new Array();
           var winInstalacion;
           var cantFilas=obj.respuesta[0].mensaje.CantFilas;                      
           var j=0;
        if(cantFilas>0)
        {    
            plnBusqueda.toggleCollapse();
            for(var i=0;i<cantFilas;i++)
                {            
                    winInstalacion='winInstalacionInicial'+obj.respuesta[1].results[i].id;
                    winInstalacion= Ext.widget('winInstalacionPrueba', {id:winInstalacion,alias:'widget.'+winInstalacion,itemId:winInstalacion});

                    //Cambia ID a los componentes de la pantalla Instalacion                    
                    var cambiaID = winInstalacion.query('#imgFavoritaInstalacion');                    
                    cambiaID[0]['itemId']='imgFavoritaInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['id']='imgFavoritaInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                  
                    
                    cambiaID = winInstalacion.query('#imgLogoInstalacion');                            
                    cambiaID[0]['itemId']='imgLogoInstalacion'+obj.respuesta[1].results[i].id;  
                    
                    cambiaID = winInstalacion.query('#lblTituloFavorita');                            
                    cambiaID[0]['itemId']='lblTituloFavorita'+obj.respuesta[1].results[i].id;                                                            
                    
                    cambiaID = winInstalacion.query('#lblNombreInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblNomnbreInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<span style="font-size:20px;color:white;"><b>'+obj.respuesta[1].results[i].NombreInst+'</b></span>';                    
                    
                    cambiaID = winInstalacion.query('#lblEncargadoInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblEncargadoInstalacion'+obj.respuesta[1].results[i].id;    
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].NombreContacto+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblTelefonosInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblTelefonosInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].Telefono1+' - '+obj.respuesta[1].results[i].Telefono2+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblCorreoInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblCorreoInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].EMailInst+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblFaxInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblFaxInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].Fax+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblPaginaWebInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblPaginaWebInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].URLPaginaWeb+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblHorarioInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblHorarioInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].DescHorario+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblDireccionInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblDireccionInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].Distrito+', '+obj.respuesta[1].results[i].Canton+' de '+obj.respuesta[1].results[i].Provincia+'</b>';                    
                    //Botones
                    cambiaID = winInstalacion.query('#btnMapaGoogleInstalacion');
                    cambiaID[0]['itemId']='btnMapaGoogleInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#btnCampeonatosInstalacion');                 
                    cambiaID[0]['itemId']='btnCampeonatosInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#btnServiciosInstalacion');                   
                    cambiaID[0]['itemId']='btnServiciosInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#btnCanchasInstalacion');                     
                    cambiaID[0]['itemId']='btnCanchasInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;

                    cambiaID = winInstalacion.query('#btnGaleriaFotosInstalacion');                
                    cambiaID[0]['itemId']='btnGaleriaFotosInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    

                    cambiaID = winInstalacion.query('#btnReservarInstalacion');                                 
                    cambiaID[0]['itemId']='btnReservarInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;
                    cambiaID[0]['nombreInstalacion']=obj.respuesta[1].results[i].NombreInst;
                    cambiaID[0]['direccion']=obj.respuesta[1].results[i].Canton+', '+obj.respuesta[1].results[i].Distrito+' de '+obj.respuesta[1].results[i].Provincia;
                    cambiaID[0]['telefono']=obj.respuesta[1].results[i].Telefono1;
                    cambiaID[0]['modoReservacion']=obj.respuesta[1].results[i].MetodoReservacion;
                    cambiaID[0]['encargado']=obj.respuesta[1].results[i].NombreContacto;
                    cambiaID[0]['correo']=obj.respuesta[1].results[i].EMailInst;
                    // FIN Botones
                    //Fin de Cambia ID a los componentes de la pantalla Instalacion

                    //Llena los datos de cada instalacion en el Array global(global_instalaciones) 
                    global_instalaciones[j]=obj.respuesta[1].results[i].id;
                    global_instalaciones[j+1]=obj.respuesta[1].results[i].NombreInst;
                    global_instalaciones[j+2]=obj.respuesta[1].results[i].Canton+', '+obj.respuesta[1].results[i].Distrito+' de '+obj.respuesta[1].results[i].Provincia;
                    global_instalaciones[j+3]=obj.respuesta[1].results[i].UbicGPSLat;                
                    global_instalaciones[j+4]=obj.respuesta[1].results[i].UbicGPSLng;                    
                    global_instalaciones[j+5]=obj.respuesta[1].results[i].IdInstalacion; 
                    j+=6;                
                    // FIN Llena los datos de cada instalacion en el Array global(global_instalaciones)

                    //Componentes de la Pantalla Instalaciones
                    var objx = winInstalacion.query('#imgLogoInstalacion'+obj.respuesta[1].results[i].id);
                    objx = objx[0];         
                    objx.setSrc(obj.respuesta[1].results[i].FileLogo);
                    
                    var tituloFavorita=winInstalacion.query('#lblTituloFavorita'+obj.respuesta[1].results[i].id); 
                    tituloFavorita=tituloFavorita[0];
                    
                    objx = winInstalacion.query('#imgFavoritaInstalacion'+obj.respuesta[1].results[i].id);                    
                    objx = objx[0];
                                        
                    if(global_id_usuario==''||global_id_usuario==null)
                    {                            
                        objx.setVisible(false);                        
                    }
                    else
                    {
                       if(obj.respuesta[1].results[i].IdInstalacion==null)
                       {                          
                           tituloFavorita.setValue('<span style="font-size:20px;color:white;">Agregar Favorita</span>');
                            objx.setSrc("resources/imagenes/estrellaN.png"); 
                            objx.setSrcNormal("resources/imagenes/estrellaN.png");
                            objx.setSrcDown("resources/imagenes/estrella.png");
                            objx.setSrcUp("resources/imagenes/estrellaN.png");
                            objx.setSrcClick("resources/imagenes/estrella.png");
                            objx.setSrcOver("resources/imagenes/estrella.png");
                            objx['valor']=false;
                       }
                       else
                       {   
                           tituloFavorita.setValue('<span style="font-size:20px;color:white;margin-left:80px;">Favorita</span>');
                            objx.setSrc("resources/imagenes/estrella.png");
                            objx.setSrcNormal("resources/imagenes/estrella.png");
                            objx.setSrcDown("resources/imagenes/estrellaN.png");
                            objx.setSrcUp("resources/imagenes/estrella.png");
                            objx.setSrcClick("resources/imagenes/estrellaN.png");
                            objx.setSrcOver("resources/imagenes/estrellaN.png");
                            objx['valor']=true;
                       }
                    }
                    todasInstalaciones[i]=winInstalacion;  
               }
                    plnInstalaciones.add(todasInstalaciones);
                    plnInstalaciones.doLayout();              
       }
       else
       {
           Ext.MessageBox.show({
                 title: 'Mensaje',
                 msg: 'No se encontraron resultados',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.INFO});
              return; 
       }
     }
         
      var idUsuario='';
       if(global_id_usuario==''||global_id_usuario==null)
       {
           idUsuario=null;
       }
       else
       {
           idUsuario=global_id_usuario;
       }
       if(provDescripcion=='Todas las Provincias'){provincia="null"}
       if(cantDescripcion=='Todos los Cantones'){canton="null"}
       if(distDescripcion=='Todos los Distritos'){distrito="null"}
       if(superfDescripcion=='Todas las Superficies'){superficie="null"}
       if(TipoCacDescripcion=='Todos los tipos'){tipoCancha="null"}
       
       var datos = '{"idUsuario":"' + idUsuario + '",';
       datos += '"provincia":"' + provincia + '",';
       datos += '"canton":"' + canton + '",';         
       datos += '"distrito":"' + distrito + '",';         
       datos += '"tipoCancha":"' + tipoCancha + '",';         
       datos += '"superficie":"' + superficie + '"}';
       //console.log (datos);
           Ext.Ajax.request({  
                 url: 'php/RouterDBAJugarFutbol.php',  
                 method: 'POST',  
                 success: successAjaxFn,  
                 failure: failureAjaxFn, 
                 timeout: 30000,  
                 headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta las instalaciones'},  
                 params: {clasePhp: 'InstalacionDB',
                          metodo:   'getConsultaBusqueda',
                          datos:    datos}  
                 }); // Fin de la llamada Ajax                
    },// Fin en Boton buscar cancha    
    
//=========================================================================================================================
 // Selecciono una Provincia en Pantalla de busca cancha
    seleccionoProvincia: function(combobox, record) {
        var win = Ext.ComponentQuery.query('#winBusquedaReservar');
            win = win[0]; 
        
        var canton = win.query('#cmbCanton');
        canton = canton[0];
        
        var distrito = win.query('#cmbDistrito');
        distrito = distrito[0];
        if(combobox['value']==0)
        {
           canton.setValue(0);
           distrito.setValue(0);
           canton.setDisabled(true);
           distrito.setDisabled(true);
        }
        else
        {
            var prov = record[0];
            prov = prov.data;
            var provNombre = prov.DesLarga;
            var provCodProv = prov.CodProv;
            var storeCantones = this.getStore('ubicacion.Cantones');
                        
            canton.setDisabled(false);
            canton.clearValue();
            canton.doQuery();
            
            distrito.clearValue();
            storeCantones.clearFilter(true);
            storeCantones.filter('CodProv',provCodProv);                        
        }
        canton.setRawValue('Todos los Cantones');
        canton.collapse();
        //console.log('Seleciono la Provincia: ' + provNombre + ' ' + provCodProv + ' ' + prov.id + ' en la vista de busca cancha');
        
    }, // Fin de Selecciono una Provincia en Pantalla busca cancha
//========================================================================================================================
    
    // Selecciono un Canton en Pantalla de busca cancha
    seleccionoCanton: function(combobox, record) {
        var win = Ext.ComponentQuery.query('#winBusquedaReservar');
            win = win[0]; 
        
        var canton = win.query('#cmbCanton');
        canton = canton[0];
        
        var distrito = win.query('#cmbDistrito');
        distrito = distrito[0];  

        if(combobox['rawValue']=='Todos los Cantones')
        {
           distrito.setValue(0);
           distrito.setDisabled(true);
        }
        else
        {
            var Secanton = record[0];
            Secanton = Secanton.data;
            var cantonNombre = Secanton.DesLarga;
            var cantonCodProv = Secanton.CodProv;
            var cantonCodCanton = Secanton.CodCanton;
            var storeDistritos = this.getStore('ubicacion.Distritos');            

            distrito.setDisabled(false);
            distrito.clearValue();
            distrito.doQuery();
            storeDistritos.clearFilter(true);
            storeDistritos.filter('CodProv',cantonCodProv);
            storeDistritos.filter('CodCanton',cantonCodCanton);                        
        }
        distrito.setRawValue('Todos los Distritos');
        distrito.collapse();
        //console.log('Seleciono el Canton: ' + cantonNombre + ' ' + cantonCodProv + ' ' + cantonCodCanton + ' ' + canton.id + ' en la vista de busca cancha');
        
    }, // Fin de Selecciono un Canton en Pantalla de busca cancha
//========================================================================================================================

    // Selecciono un Distrito en Pantalla de busca cancha
    seleccionoDistrito: function(combobox, record) {
        /*var distrito = record[0];
        distrito = distrito.data;
        var distritoNombre = distrito.DesLarga;
        var distritoCodDist = distrito.CodDist;*/        
        
    }, // Fin de Selecciono un Distrito en Pantalla de busca cancha
//========================================================================================================================= 
  // Selecciono en la pantalla instalacion el boton Informacion
    seleccionoServicios: function(button) {          
        alert('En construccion...');
        //Acceso a los componentes de la ventana informacion        
                     
    }, // Fin de Selecciono en la pantalla instalacion el boton Informacion
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Mapa
    seleccionoMapa: function(button) {       
         var view =Ext.widget('winMapaGoogle');         
         var obj;         
        //Acceso a los componentes de la ventana Mapa Google        
        for(var i=0;i<global_instalaciones.length;i++)
        {            
            if(global_instalaciones[i]==button['idInst'])
            {    
                view.setTitle(global_instalaciones[i+1]+' - '+global_instalaciones[i+2]);
                obj = view.query('#gmapPanel');
                obj[0]['setCenter']['lat']=parseFloat((global_instalaciones[i+3]));
                obj[0]['setCenter']['lng']=parseFloat((global_instalaciones[i+4]));

                break;
            }
        }
        view.show(); 
        var panelPapa = Ext.ComponentQuery.query('#viewport');
        panelPapa = panelPapa[0];
        panelPapa.getEl().mask();         
        
    }, // Fin de Selecciono en la pantalla instalacion el boton Mapa
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Galeria
    seleccionoGaleria: function(button) {    
        semaforoAjaxMask=false;
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

           var obj = Ext.JSON.decode(response.responseText); 
           var cantFilas=obj.respuesta[0].mensaje.CantFilas;                        
           htmlGaleriaFotos="";
           htmlOpcionesGaleria="";
           slideshow="";
              if(cantFilas>0)
              {
                for(var i=0;i<cantFilas;i++)
                {
                    htmlGaleriaFotos+="<li><img src='resources/fotosInstalaciones/"+obj.respuesta[1].results[i].InstalacionFoto+"' width='700' height='440'/></li>";
                    htmlOpcionesGaleria+="<li onClick='slideshow.pos("+i+")'></li>";
                }
                
                var view = Ext.widget('winGaleriaFotos');                
                view.setTitle(obj.respuesta[1].results[0].NombreInst+' - '+obj.respuesta[1].results[0].Distrito+', '+obj.respuesta[1].results[0].Canton+' de '+obj.respuesta[1].results[0].Provincia);
                
                view.show();  
                var panelPapa = Ext.ComponentQuery.query('#viewport');
                  panelPapa = panelPapa[0];
                  panelPapa.getEl().mask(); 
                var duracion=1000;
                
                slideshow=new TINY.slider.slide('slideshow',{
                id:'slider',
                auto:duracion,
                resume:false,
                vertical:false,
                navid:'pagination',
                activeclass:'current',
                position:0,
                rewind:false,
                elastic:true,
                left:'slideleft',
                right:'slideright'
                });        
              }
              else
               {
                   Ext.MessageBox.show({
                         title: 'Mensaje',
                         msg: 'No se encontraron fotos en esta instalaci&oacute;n',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.INFO});
                      return; 
               }                               
           }
           
           var datos = '{"idInstalacion":"' + button['idInst'] + '"}';  
            
            Ext.Ajax.request({  
                 url: 'php/RouterDBAJugarFutbol.php',  
                 method: 'POST',  
                 success: successAjaxFn,  
                 failure: failureAjaxFn, 
                 timeout: 30000,  
                 headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta de las fotos de las instalaciones'},  
                 params: {clasePhp: 'InstalacionDB',
                          metodo:   'getInstalacioFotos',
                          datos:    datos}  
             }); // Fin de la llamada Ajax                                                                        
    }, // Fin de Selecciono en la pantalla instalacion el boton Galeria
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Campeonatos
    prueba: function(button) {        
          if(button['vUsuario']==true)
          {
              this.campoOcupadoUsuario();
              return; 
          }
          if(global_id_usuario==''||global_id_usuario==null)
          {
                Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'Si desea realizar reservaciones debe ingresar al sitio.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                  return; 
          }
          else
          {
              if(button['estado']=='B')
              {
                  Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'El campo seleccionado se encontra bloquedo',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                  return; 
              }
              else
              {
                  if(button['estado']=='O')
                  {
                       this.campoOcupado();
                      return; 
                  }
                  else
                  {
                      if(button['estado']=='A'||button['estado']=='C')
                      {
                         this.campoSinAprobar();
                          return; 
                      }
                      else
                      {
                          if(button['estado']=='R')
                          {
                              this.renderWinRetos(button);                                                            
                          }
                          else{                          
                              var obj;
                              var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
                              instalacion=instalacion[0];
                              if(instalacion['modoReservacion']=='1')
                              {
                                  var winSimpleReservacion =Ext.widget('winSimpleReservacion');  
                                  obj=winSimpleReservacion.query('#lblSRNombreEncargado');
                                  obj=obj[0];
                                  obj.setValue('<b>'+instalacion['encargado']+'</b>');

                                  obj=winSimpleReservacion.query('#lblSRNombreCancha');
                                  obj=obj[0];
                                  obj.setValue(instalacion.getValue());

                                  obj=winSimpleReservacion.query('#lblSRTelefono');
                                  obj=obj[0];
                                  obj.setValue('<b>'+instalacion['telefono']+'</b>');

                                  obj=winSimpleReservacion.query('#lblSRCorreo');
                                  obj=obj[0];
                                  obj.setValue('<b>'+instalacion['correo']+'</b>');

                                  obj=winSimpleReservacion.query('#lblSRDireccion');
                                  obj=obj[0];
                                  obj.setValue('<b>'+instalacion['direccion']+'</b>');
                                  winSimpleReservacion.show();
                                  return;
                              }

                              var fechaYhora='';

                              var winConfirmaReservacion =Ext.widget('winConfirmaReservacion');                         
                              obj=winConfirmaReservacion.query('#cmbCREquipos');
                              obj=obj[0];
                              obj.setVisible(false);                              


                              obj=winConfirmaReservacion.query('#lblLugarReservacion');
                              obj=obj[0];
                              obj.setValue('<b>'+instalacion['nombreInstalacion']+'</b>');

                              obj=winConfirmaReservacion.query('#lblFechaExacta');
                              obj=obj[0];

                              var fechaReservacion=new Date(button['fecha']);                          
                              fechaYhora=button['fecha'];                                   
                              var mes=fechaReservacion.getMonth()+1;
                              var diaSemanal=fechaReservacion.getDay();
                              //Cambia los meses
                              if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
                              }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
                              {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
                              //FIN  Cambia los meses
                              //Cambia los dias                           
                              if(diaSemanal==1){diaSemanal='Lunes';}else{if(diaSemanal==2){diaSemanal='Martes';}else{if(diaSemanal==3)
                              {diaSemanal='Mi&eacute;rcoles';}else{if(diaSemanal==4){diaSemanal='Jueves';}else{if(diaSemanal==5){
                              diaSemanal='Viernes';}else{if(diaSemanal==6){diaSemanal='S&aacute;bado';}else{diaSemanal='Domingo';}}}}}}
                              //FIN Cambia los dias                               
                              var dia=fechaReservacion.getDate();
                              
                              var horaReservacion=button['id'];
                              var ampmReservacion='de la ma&ntilde;ana';
                              horaReservacion=horaReservacion.substring(1,3);  
                              fechaYhora+=' '+horaReservacion+':00:00';

                              if(horaReservacion>12){ampmReservacion='de la tarde'; if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
                                if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
                                {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
                                {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
                                if(horaReservacion==12){ampmReservacion='de la tarde';}   
                                
                              obj.setValue('<b><font color=#FF0000>'+diaSemanal+' '+dia+' de '+mes+', a las '+horaReservacion+':00 '+ampmReservacion+'</font></b>');                              

                              obj=winConfirmaReservacion.query('#lblNotaDetalle');
                              obj=obj[0];
                              if(instalacion['modoReservacion']=='5'){                             
                                  obj.setValue('<b>Nota: Ser&aacute; inclu&iacute;do en una lista de espera. El administrador de la cancha seleccionara un usuario.</b>');
                                  obj=winConfirmaReservacion.query('#btnConfirmaReservacion');
                                  obj=obj[0];
                                  obj.setText('<b>Incluirme en la lista</b>');  }
                              else{
                              obj.setValue('<b>Nota: Esta reservaci&oacute;n ser&aacute revisada por el administrador de la cancha, puede que se ponga en contacto con usted.</b>'); }

                              obj=winConfirmaReservacion.query('#lblTarifaReservacion');
                              obj=obj[0];
                              if(button['tarifa']=='')
                              {
                                  obj.setValue('<b>No se encuentra registro</b>');
                              }else{obj.setValue('<b><font color=#FF0000>'+button['tarifa']+' colones</font></b>');}                          

                              obj=winConfirmaReservacion.query('#btnConfirmaReservacion');
                              obj=obj[0]['fechayHora']=fechaYhora;
                              obj=obj[0]['estado']=button['estado'];
                              winConfirmaReservacion.show();
                              var panelPapa = Ext.ComponentQuery.query('#viewport');
                              panelPapa = panelPapa[0];
                              panelPapa.getEl().mask();
                          }
                      }
                  }
              }
          }          
    }, // Fin de Selecciono en la pantalla instalacion el boton Campeonatos
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Canchas
    renderWinRetos: function(button) {                  
         
          var obj;
         
          var fechaYhora='';

          var winApruebaReto =Ext.widget('winApruebaReto');                                             

          obj=winApruebaReto.query('#lblNombreUsuario');
          obj=obj[0];
          obj.setValue('<b>'+button['RTNombre']+'</b>');

          obj=winApruebaReto.query('#lblTelefonoUsuario');
          obj=obj[0];
          obj.setValue('<b>'+button['RTtelefono']+'</b>');
          
          obj=winApruebaReto.query('#lblCorreoUsuario');
          obj=obj[0];
          obj.setValue('<b>'+button['RTCorreo']+'</b>');
          
          obj=winApruebaReto.query('#imgRTFotoUsuario');
          obj=obj[0];
          obj.setSrc('resources/fotosUsuarios/'+button['RTFileFoto']);
          

          obj=winApruebaReto.query('#lblFechaSolicitud');
          obj=obj[0];
          var fechaSolicitud=new Date();
          var anno=fechaSolicitud.getFullYear();        
          var mes=fechaSolicitud.getMonth()+1;
          var diaSemanal=fechaSolicitud.getDay();
          if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
          }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
          {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
          var dia=fechaSolicitud.getDate();
          // Cambia los dias
          if(diaSemanal==1){diaSemanal='Lunes';}else{if(diaSemanal==2){diaSemanal='Martes';}else{if(diaSemanal==3)
          {diaSemanal='Mi&eacute;rcoles';}else{if(diaSemanal==4){diaSemanal='Jueves';}else{if(diaSemanal==5){
          diaSemanal='Viernes';}else{if(diaSemanal==6){diaSemanal='S&aacute;bado';}else{diaSemanal='Domingo';}}}}}}
          //FIN Cambia los dias

          obj.setValue('<b>'+diaSemanal+', '+dia+' de '+mes+' del '+anno+'</b>');

          obj=winApruebaReto.query('#lblFechaExacta');
          obj=obj[0];

          var fechaReservacion=new Date(button['fecha']);                          
          fechaYhora=button['fecha'];
          anno=fechaReservacion.getFullYear();        
          mes=fechaReservacion.getMonth()+1;
          diaSemanal=fechaReservacion.getDay();
          //Cambia los meses
          if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
          }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
          {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
          //FIN  Cambia los meses
          //Cambia los dias                           
          if(diaSemanal==1){diaSemanal='Lunes';}else{if(diaSemanal==2){diaSemanal='Martes';}else{if(diaSemanal==3)
          {diaSemanal='Mi&eacute;rcoles';}else{if(diaSemanal==4){diaSemanal='Jueves';}else{if(diaSemanal==5){
          diaSemanal='Viernes';}else{if(diaSemanal==6){diaSemanal='S&aacute;bado';}else{diaSemanal='Domingo';}}}}}}
          //FIN Cambia los dias 
          dia=fechaReservacion.getDate();
          obj.setValue('<b><font color=#FF0000>'+diaSemanal+', '+dia+' de '+mes+' del '+anno+'</font></b>');

          obj=winApruebaReto.query('#lblHora');
          obj=obj[0];
          var horaReservacion=button['id'];
          var ampmReservacion='de la ma&ntilde;ana';
          horaReservacion=horaReservacion.substring(1,3);  
          fechaYhora+=' '+horaReservacion+':00:00';

          if(horaReservacion>12){ampmReservacion='de la tarde'; if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
            if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
            {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
            {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
            if(horaReservacion==12){ampmReservacion='de la tarde';}                            
          obj.setValue('<b><font color=#FF0000>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');         

          obj=winApruebaReto.query('#lblTarifaReservacion');
          obj=obj[0];
          if(button['tarifa']=='')
          {
              obj.setValue('No se encuentra registro');
          }else{obj.setValue('<b><font color=#FF0000>'+button['tarifa']+' colones</font></b>');}                          

          obj=winApruebaReto.query('#btnAceptaReto');
          obj=obj[0]['fechayHora']=fechaYhora;
          obj=obj[0]['estado']=button['estado'];
          winApruebaReto.show();  
          var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().mask();
       
    }, // Fin de Selecciono en la pantalla instalacion el boton Canchas
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Canchas
    campoOcupado: function(button) {                  
         var obj;
          var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
          instalacion=instalacion[0];
          
          var winSimpleReservacion =Ext.widget('winSimpleReservacion');  
          obj=winSimpleReservacion.query('#lblSRNombreEncargado');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['encargado']+'</b>');

          obj=winSimpleReservacion.query('#lblSRNombreCancha');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['nombreInstalacion']+'</b>');

          obj=winSimpleReservacion.query('#lblSRTelefono');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['telefono']+'</b>');

          obj=winSimpleReservacion.query('#lblMensajeUsuario');
          obj=obj[0];
          obj.setValue('<b>El campo seleccionado se encuentra <font color=red>ocupado</font>, si desea cancelar una reservaci&oacute;n o un reto, por favor p&oacute;ngase en contacto con el administrador de la cancha.</b>');
          
          obj=winSimpleReservacion.query('#lblSRCorreo');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['correo']+'</b>');

          obj=winSimpleReservacion.query('#lblSRDireccion');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['direccion']+'</b>');
          winSimpleReservacion.show();
           var panelPapa = Ext.ComponentQuery.query('#viewport');
                              panelPapa = panelPapa[0];
                              panelPapa.getEl().mask();
                 
    }, // Fin de Selecciono en la pantalla instalacion el boton Canchas
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Canchas
    campoOcupadoUsuario: function(button) {                  
         var obj;
          var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
          instalacion=instalacion[0];
          
          var winSimpleReservacion =Ext.widget('winSimpleReservacion');  
          obj=winSimpleReservacion.query('#lblSRNombreEncargado');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['encargado']+'</b>');

          obj=winSimpleReservacion.query('#lblSRNombreCancha');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['nombreInstalacion']+'</b>');

          obj=winSimpleReservacion.query('#lblSRTelefono');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['telefono']+'</b>');

          obj=winSimpleReservacion.query('#lblMensajeUsuario');
          obj=obj[0];
          obj.setValue('<b><font color=red>Esta es su reservaci&oacute;n</font>, si desea cancelar esta reservaci&oacute;n o reto, por favor p&oacute;ngase en contacto con el administrador de la cancha.</b>');
          
          obj=winSimpleReservacion.query('#lblSRCorreo');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['correo']+'</b>');

          obj=winSimpleReservacion.query('#lblSRDireccion');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['direccion']+'</b>');
          winSimpleReservacion.show();
           var panelPapa = Ext.ComponentQuery.query('#viewport');
                              panelPapa = panelPapa[0];
                              panelPapa.getEl().mask();
                 
    }, // Fin de Selecciono en la pantalla instalacion el boton Canchas
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Canchas
    campoSinAprobar: function(button) {                  
         var obj;
          var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
          instalacion=instalacion[0];
          
          var winSimpleReservacion =Ext.widget('winSimpleReservacion');  
          obj=winSimpleReservacion.query('#lblSRNombreEncargado');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['encargado']+'</b>');

          obj=winSimpleReservacion.query('#lblSRNombreCancha');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['nombreInstalacion']+'</b>');

          obj=winSimpleReservacion.query('#lblSRTelefono');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['telefono']+'</b>');

          obj=winSimpleReservacion.query('#lblMensajeUsuario');
          obj=obj[0];
          obj.setValue('<b>El campo seleccionado se encuentra <font color=red>sin aprobar</font>, queda en espera de la decisi&oacute;n del admnistrador de la cancha. Si desea cancelar una reservaci&oacute;n o un reto, por favor p&oacute;ngase en contacto con el administrador de la cancha.</b>');
          
          obj=winSimpleReservacion.query('#lblSRCorreo');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['correo']+'</b>');

          obj=winSimpleReservacion.query('#lblSRDireccion');
          obj=obj[0];
          obj.setValue('<b>'+instalacion['direccion']+'</b>');
          winSimpleReservacion.show();
           var panelPapa = Ext.ComponentQuery.query('#viewport');
                              panelPapa = panelPapa[0];
                              panelPapa.getEl().mask();
                 
    }, // Fin de Selecciono en la pantalla instalacion el boton Canchas
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Canchas
    seleccionoCanchas: function(button) {   
        semaforoAjaxMask=false;
         //Funcion para cuando falla el Ajax Request
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
           var obj = Ext.JSON.decode(response.responseText); 
           var winDetalleCanchas;
           var cantFilas=obj.respuesta[0].mensaje.CantFilas;                        
              if(cantFilas>0)
              {
                var winCancha =Ext.widget('winCanchas');                
                  
                var objx = winCancha.query('#lblCantidadCanchas');
                objx=objx[0];               
                objx.setValue('<b>Cantidad de canchas disponibles: '+cantFilas+'</b>'); 
                
                objx = winCancha.query('#imgFotoCancha');
                objx=objx[0];
                objx.setSrc('resources/fotosCanchas/'+obj.respuesta[1].results[0].CanchaFoto);
                
                objx = winCancha.query('#fdsCanchas');
                objx=objx[0];
                //objx.removeAll();          
                objx.doLayout();
                var todasDetallesInstalacion= new Array();
                for(var i=0;i<cantFilas;i++)
                {
                    winDetalleCanchas='winDetalleCanchas'+i;
                    winDetalleCanchas= Ext.widget('winDetalleCanchas', {id:winDetalleCanchas,alias:'widget.'+winDetalleCanchas,itemId:winDetalleCanchas});

                    
                    var cambiaDetalles = winDetalleCanchas.query('#lblTipoFut');                               
                    cambiaDetalles[0]['id']='lblTipoFut'+obj.respuesta[1].results[i].id;          
                    cambiaDetalles[0]['rawValue']=obj.respuesta[1].results[i].Tipo;         
                    
                    cambiaDetalles = winDetalleCanchas.query('#lblSuperficie');            
                    cambiaDetalles[0]['id']='lblSuperficie'+obj.respuesta[1].results[i].id;            
                    cambiaDetalles[0]['rawValue']=obj.respuesta[1].results[i].Superficie;         
                    
                    cambiaDetalles = winDetalleCanchas.query('#lblDimension');            
                    cambiaDetalles[0]['id']='lblDimension'+obj.respuesta[1].results[i].id;           
                    cambiaDetalles[0]['rawValue']=obj.respuesta[1].results[i].Dimensiones;         
                    
                    cambiaDetalles = winDetalleCanchas.query('#lblHoraInicio');            
                    cambiaDetalles[0]['id']='lblHoraInicio'+obj.respuesta[1].results[i].id;      
                    cambiaDetalles[0]['rawValue']='De: '+obj.respuesta[1].results[i].HoraInicia+' a '+obj.respuesta[1].results[i].HoraTermina;
                      
                    todasDetallesInstalacion[i]=winDetalleCanchas;                    
                }
                objx.add([todasDetallesInstalacion]);
                objx.doLayout();                 
                winCancha.show();
                var panelPapa = Ext.ComponentQuery.query('#viewport');
                  panelPapa = panelPapa[0];
                  panelPapa.getEl().mask();
                
              }
              else
               {
                   Ext.MessageBox.show({
                         title: 'Mensaje',
                         msg: 'No se encontraron canchas',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.INFO});
                      return; 
               }
           }
           
            var datos = '{"idInstalacion":"' + button['idInst'] + '"}';              
            Ext.Ajax.request({  
                 url: 'php/RouterDBAJugarFutbol.php',  
                 method: 'POST',  
                 success: successAjaxFn,  
                 failure: failureAjaxFn, 
                 timeout: 30000,  
                 headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta de las canchas de la instalacion'},  
                 params: {clasePhp: 'InstalacionDB',
                          metodo:   'getCanchaPorInstalacion',
                          datos:    datos}  
             }); // Fin de la llamada Ajax           
       
    }, // Fin de Selecciono en la pantalla instalacion el boton Canchas
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Reservar
    seleccionoReservar: function(button) {
        
         var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              // console.log (errMessage);  
              }  // Fin Funcion para cuando falla el Ajax Request
              
        var successAjaxFn = function(response, request) {              

            var obj = Ext.JSON.decode(response.responseText);   
            var cantFilas=obj.respuesta[0].mensaje.CantFilas; 
            if(cantFilas>0)
            {
                 var panel_central = Ext.ComponentQuery.query('#panel_central');
                panel_central = panel_central[0];                               
                panel_central.removeAll();          
                panel_central.doLayout();
                
                canchasInstalacion.removeAll();
                var primerValor=obj.respuesta[1].results[0].id;
                for(var i=0;i<cantFilas;i++)
                {                    
                    canchasInstalacion.add({id:obj.respuesta[1].results[i].id,nombre:obj.respuesta[1].results[i].NombreCancha});
                }        
                var winCalenReserva =Ext.widget('winCalenReserva');                

                var objx = winCalenReserva.query('#lblInstalacion');
                objx[0]['direccion']=button['direccion'];
                objx[0]['telefono']=button['telefono'];
                objx[0]['modoReservacion']=button['modoReservacion'];
                objx[0]['correo']=button['correo'];
                objx[0]['nombreInstalacion']=button['nombreInstalacion'];
                objx[0]['encargado']=button['encargado'];
                objx=objx[0];               
                objx.setValue('<b style="font-size:15px;">'+button['nombreInstalacion']+'</b>'); 
                
                objx = winCalenReserva.query('#cmbCanchas');
                objx=objx[0];               
                objx.setValue(primerValor); 
                
                panel_central.add(winCalenReserva);          
                panel_central.doLayout();            
            } 
            else
               {
                   Ext.MessageBox.show({
                         title: 'Mensaje',
                         msg: 'No se encontraron canchas disponibles',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.INFO});
                      return; 
               }
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente
          
           var datos = '{"idInstalacion":"' + button['idInst'] + '"}';              

          Ext.Ajax.request({  
              url: 'php/RouterDBAJugarFutbol.php',  
              method: 'POST',               
              success: successAjaxFn,  
              failure: failureAjaxFn, 
              timeout: 30000,  
              headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Agregar o Eliminar Instalacion favorita'},  
              params: {clasePhp: 'InstalacionDB',
                       metodo:   'getCanchasInstalacion',
                       datos:    datos}  
              }); // Fin de la llamada Ajax
        
    }, // Fin de Selecciono en la pantalla instalacion el boton Reservar
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Reservar
    seleccionoCanchaReserva: function(combobox, record) {        
         var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              // console.log (errMessage);  
              }  // Fin Funcion para cuando falla el Ajax Request
              
        var controlFechaBoton=Ext.ComponentQuery.query('#btnSemanaSiguiente');         
        var fecha1Parametro;
        var fecha2Parametro;
        var fecha1;
        var fecha2;
        var fechaBoton;
        var sumaFechas=0;
        var estadoBoton;
        var horaTooltip=7;
        var ampmTooltip='a.m';
        var diaSemanalMuestra=0;
        var muestrafechas =Ext.ComponentQuery.query('#lblFechas'); 
        muestrafechas=muestrafechas[0];
        //Primer Fecha de la semana
        fecha1=controlFechaBoton[0]['controlFecha'];        
        var anno=fecha1.getFullYear();        
        var mes=fecha1.getMonth()+1;
        var dia=fecha1.getDate();
        var diaSemana=fecha1.getDay();
        diaSemanalMuestra=diaSemana;
        //Cambia los dias                           
          if(diaSemanalMuestra==1){diaSemanalMuestra='Lunes';}else{if(diaSemanalMuestra==2){diaSemanalMuestra='Martes';}else{if(diaSemanalMuestra==3)
          {diaSemanalMuestra='Mi&eacute;rcoles';}else{if(diaSemanalMuestra==4){diaSemanalMuestra='Jueves';}else{if(diaSemanalMuestra==5){
          diaSemanalMuestra='Viernes';}else{if(diaSemanalMuestra==6){diaSemanalMuestra='S&aacute;bado';}else{diaSemanalMuestra='Domingo';}}}}}}
          //FIN Cambia los dias
        var diaSemanaEstado=fecha1.getDay();
        fecha1=diaSemanalMuestra+', '+dia+'/'+mes+'/'+anno;        
        fecha1Parametro=anno+'-'+mes+'-'+dia;
        //Segunda Fecha de la semana
        var hoy=controlFechaBoton[0]['controlFecha'];
        fecha2=new Date(hoy.getTime() + (6 * 24 * 3600 * 1000));            
        anno=fecha2.getFullYear();        
        mes=fecha2.getMonth()+1;
        dia=fecha2.getDate(); 
        diaSemanalMuestra=fecha2.getDay();
        //Cambia los dias                           
          if(diaSemanalMuestra==1){diaSemanalMuestra='Lunes';}else{if(diaSemanalMuestra==2){diaSemanalMuestra='Martes';}else{if(diaSemanalMuestra==3)
          {diaSemanalMuestra='Mi&eacute;rcoles';}else{if(diaSemanalMuestra==4){diaSemanalMuestra='Jueves';}else{if(diaSemanalMuestra==5){
          diaSemanalMuestra='Viernes';}else{if(diaSemanalMuestra==6){diaSemanalMuestra='S&aacute;bado';}else{diaSemanalMuestra='Domingo';}}}}}}
          //FIN Cambia los dias
        fecha2=diaSemanalMuestra+', '+dia+'/'+mes+'/'+anno;
        
        fecha2Parametro=new Date(hoy.getTime() + (7 * 24 * 3600 * 1000));            
        anno=fecha2Parametro.getFullYear();        
        mes=fecha2Parametro.getMonth()+1;
        dia=fecha2Parametro.getDate();               
        fecha2Parametro=anno+'-'+mes+'-'+dia;        
        muestrafechas.setValue('<p style="font-size:15px;">Est&aacute;s viendo de: <b>'+fecha1+'</b> al <b>'+fecha2+'</b></p>');        
        
        var dp=0;
        if(controlFechaBoton[0]['contador']==0)
        {
            var diaSem =Ext.ComponentQuery.query('#lbl'+0);
            diaSem=diaSem[0];
            diaSem.setValue('<b>HOY</b>');
            diaSem =Ext.ComponentQuery.query('#lbl'+1);
            diaSem=diaSem[0];
            diaSem.setValue('<b>Mañana</b>');
            
            muestrafechas.setValue('<p style="font-size:15px;">Est&aacute;s viendo de: <b>HOY a este '+fecha2+'</b></p>'); 
            dp=2;
            
            if(diaSemana==6){diaSemana=1;}else{
            if(diaSemana==5){diaSemana=0;}
            else{diaSemana=diaSemana+2;}} 
        }                  
        for(var d=dp;d<=6;d++)
        {
            diaSem =Ext.ComponentQuery.query('#lbl'+d);
            diaSem=diaSem[0];            
            
            if(diaSemana==1){diaSem.setValue('<b>Lunes</b>');}
            if(diaSemana==2){diaSem.setValue('<b>Martes</b>');}
            if(diaSemana==3){diaSem.setValue('<b>Mi&eacute;rcoles</b>');}
            if(diaSemana==4){diaSem.setValue('<b>Jueves</b>');}
            if(diaSemana==5){diaSem.setValue('<b>Viernes</b>');}
            if(diaSemana==6){diaSem.setValue('<b>S&aacute;bado</b>');}
            if(diaSemana==0){diaSem.setValue('<b>Domingo</b>');}
                        
            if(diaSemana==6){diaSemana=0;}else{diaSemana++;}
        }
        
        var successAjaxFn = function(response, request) {              

            var obj = Ext.JSON.decode(response.responseText);
           // console.log(obj);return;
            var cantFilas=obj.respuesta[0].mensaje.CantFilas;
            var cantFilasTarifas=obj.respuesta[0].mensaje.CantFilasTarifas;
            
            var HoraInicio=obj.respuesta[1].results[0][0].HoraInicia;
            var HoraFinal=obj.respuesta[1].results[0][0].HoraTermina;                
            HoraInicio=HoraInicio.substring(0,2)-1;
            HoraFinal=HoraFinal.substring(0,2)-1;
            HoraFinal=HoraFinal+1;
            var boton='';
            var FechaHoraReservacion;
            var horaReservacion;
            var diaReservacion;                
            var colorEstado="#01DF01";
            var HoraBoton=HoraInicio+1;
            var j;
            var mensaje;
            var estadoReserva;
            var tarifaCanchaToolTip='';
            var diaTarifa="";              
            for(var k=7;k<=22;k++)
            {
                if(k<=9){HoraBoton='0'+k}else{HoraBoton=k}
                colorEstado='#D7DF01';
                for(var diaBoton=0;diaBoton<7;diaBoton++)
                {
                    boton = Ext.get(diaBoton+''+HoraBoton);
                    boton.setStyle("background",colorEstado);
                    
                    boton=Ext.ComponentQuery.query('#'+diaBoton+''+HoraBoton);
                    boton[0]['fecha']='';
                    boton[0]['tarifa']='';
                    boton[0]['RTNombre']='';
                    boton[0]['RTCorreo']='';
                    boton[0]['RTtelefono']='';
                    boton[0]['RTFileFoto']='';
                    estadoBoton='B';
                    boton[0]['estado']=estadoBoton;
                    boton[0]['vUsuario']=false;
                    boton=boton[0];
                    boton.setTooltip('<p><font size="4">Bloquedo</font></p>');
                   
                }                
            }
            var contadorReservaciones=0;
            var calenInfo =Ext.ComponentQuery.query('#lblCalenInfo');
            calenInfo=calenInfo[0];            
            for(var i=HoraInicio+1;i<=HoraFinal;i++)
            {                   
                
                if(i<=9){HoraBoton='0'+i}else{HoraBoton=i}
                horaTooltip=HoraBoton;
                if(horaTooltip>12){if(horaTooltip==13){horaTooltip=1;}else{if(horaTooltip==14){horaTooltip=2;}else{
                if(horaTooltip==15){horaTooltip=3;}else{if(horaTooltip==16){horaTooltip=4;}else{if(horaTooltip==17)
                {horaTooltip=5;}else{if(horaTooltip==18){horaTooltip=6;}else{if(horaTooltip==19){horaTooltip=7;}else
                {if(horaTooltip==20){horaTooltip=8;}else{if(horaTooltip==21){horaTooltip=9;}else{horaTooltip=10;}}}}}}}}}}
                                
                if(HoraBoton>=12){ampmTooltip='p.m';}
                colorEstado='#04B404';
                for(diaBoton=0;diaBoton<7;diaBoton++)
                {
                    boton = Ext.get(diaBoton+''+HoraBoton);                   
                    var colorBoton=boton;
                    boton=Ext.ComponentQuery.query('#'+diaBoton+''+HoraBoton);
                    if(sumaFechas==0){fechaBoton=hoy;}
                    else{fechaBoton=new Date(hoy.getTime() + (sumaFechas * 24 * 3600 * 1000));}
                    anno=fechaBoton.getFullYear();        
                    mes=fechaBoton.getMonth()+1;
                    dia=fechaBoton.getDate();
                    diaTarifa=fechaBoton.getDay();
                    fechaBoton=anno+'/'+mes+'/'+dia;
                    boton[0]['fecha']=fechaBoton;
                    estadoBoton='B';
                    boton[0]['estado']=estadoBoton;                                        
                    if(cantFilasTarifas>0)
                    {
                        for(var t=0;t<cantFilasTarifas;t++)
                        {                                                        
                            if(parseInt(HoraBoton)>=parseInt(obj.respuesta[1].results[1][t].HoraInicio)&&parseInt(HoraBoton)<=parseInt(obj.respuesta[1].results[1][t].HoraFinal)&&parseInt(diaTarifa)==parseInt(obj.respuesta[1].results[1][t].DiaSemana))
                            {
                                tarifaCanchaToolTip='<p><font size="4">Tarifa: '+obj.respuesta[1].results[1][t].Tarifa+' colones</font></p>';
                                boton[0]['tarifa']=obj.respuesta[1].results[1][t].Tarifa;
                                
                                boton[0].setTooltip('<b><font size="4">Disponible</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+tarifaCanchaToolTip);                    
                                colorBoton.setStyle("background","#04B404");
                                estadoBoton='D';
                                boton[0]['estado']=estadoBoton; 
                                break;
                            }
                            else{tarifaCanchaToolTip='';}
                        }
                    }                                        
                    if(sumaFechas==6){sumaFechas=0;}else{sumaFechas++;}
                }
                boton=boton[0];
                if(cantFilas>1)
                {      
                    //======================================================
                    //Parametros para la logica del retador                                        
                    for(j=1;j<cantFilas;j++)
                    {                        
                        FechaHoraReservacion=obj.respuesta[1].results[0][j].FechaHoraReservacion;                       
                        FechaHoraReservacion=FechaHoraReservacion.replace("-", "/" );
                        FechaHoraReservacion=FechaHoraReservacion.replace("-", "/" );                                                
                        
                        FechaHoraReservacion=new Date(FechaHoraReservacion);                        
                        horaReservacion=FechaHoraReservacion.getHours();
                        diaReservacion=FechaHoraReservacion.getDay();
                        anno=FechaHoraReservacion.getFullYear();        
                        mes=FechaHoraReservacion.getMonth()+1;
                        dia=FechaHoraReservacion.getDate();
                        estadoReserva=obj.respuesta[1].results[0][j].EstadoReservacion;
                        if(horaReservacion==HoraBoton)
                        {   
                            var calculaDia;
                            var usuario='';
                            var vUsuario=false;
                            var muestraReto=obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos+' te esta retando';
                            if(obj.respuesta[1].results[0][j].idUsuario==global_id_usuario){
                                usuario='<p><font color=red size="4">Esta es su reservaci&oacute;n</font></p>';
                                 vUsuario=true;                                 
                                 contadorReservaciones++;                                 
                                 if(contadorReservaciones==1){
                                 calenInfo.setValue('<span style="font-size:15px;"><b>-Importante: </b>En este calendario semanal se encuentra <b>1</b> reservaci&oacute;n realizada por usted. Si desea cancelar debe contactar al administrador de la cancha.</span>');
                                 }else
                                 {calenInfo.setValue('<span style="font-size:15px;"><b>-Importante: </b>En este calendario semanal se encuentran <b>'+ contadorReservaciones +'</b> reservaciones realizadas por usted. Si desea cancelar debe contactar al administrador de la cancha.</span>');}
                            }                        
                            
                            if(horaReservacion<10){horaReservacion='0'+''+horaReservacion;}                            
                            if(diaSemanaEstado<=diaReservacion){calculaDia=diaReservacion-diaSemanaEstado;}
                            else{calculaDia=1+((6-diaSemanaEstado)+diaReservacion);}
                            
                            if(estadoReserva==1){
                                colorEstado='#FE9A2E';
                                mensaje='<b><font size="4">Lista de Espera</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+usuario;
                                estadoBoton='L';}
                            if(estadoReserva==2){
                                colorEstado='#CC2EFA';
                                mensaje='<b><font size="4">Sin Aprobar</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+usuario;
                                estadoBoton='A';}
                            if(estadoReserva==3){
                                colorEstado='#58D3F7';
                                mensaje='<b><font size="4">Sin Confirmar</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+usuario;
                                estadoBoton='C';}
                            if(estadoReserva==4){
                                colorEstado='#FF0000';
                                mensaje='<b><font size="4">Ocupado</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+usuario;
                                estadoBoton='O';}                                                                                   
                            if(estadoReserva==6){                                    
                                if(obj.respuesta[1].results[0][j].idUsuario==global_id_usuario){muestraReto='Usted realizo este reto';}
                                var nombreRetador=obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos;                                    
                                var telefonoRetador=obj.respuesta[1].results[0][j].TelCelular;
                                var correoRetador=obj.respuesta[1].results[0][j].Email;
                                var fotoRetador=obj.respuesta[1].results[0][j].FotoFile;                                   
                                colorEstado='#58D3F7';
                                mensaje='<b><font size="4">'+muestraReto+'</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+usuario;
                                estadoBoton='R';}
                            if(estadoReserva==7){
                                if(obj.respuesta[1].results[0][j].idUsuario==global_id_usuario){muestraReto='Usted acepto este reto';}
                                colorEstado='#0404B4';
                                mensaje='<b><font size="4">Reto</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+usuario;
                                estadoBoton='A';}
                           
                            boton = Ext.get(calculaDia+''+horaReservacion);
                            boton.setStyle("background",colorEstado);
                            boton.setStyle("background",colorEstado);
                            
                            boton=Ext.ComponentQuery.query('#'+calculaDia+''+horaReservacion);
                            boton[0]['estado']=estadoBoton;
                            boton[0]['vUsuario']=vUsuario;
                            boton[0]['RTNombre']=nombreRetador;
                            boton[0]['RTCorreo']=correoRetador;
                            boton[0]['RTtelefono']=telefonoRetador;
                            boton[0]['RTFileFoto']=fotoRetador;
                            boton=boton[0];
                            boton.setTooltip(mensaje);
                         }                        
                     }
                }else{calenInfo.setValue('<span style="font-size:15px;"><b>-Importante: </b>En este calendario semanal <b>NO</b> se encuentran reservaciones realizadas por usted.</span>');}                
           }                                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente
         var combo = Ext.ComponentQuery.query('#cmbCanchas');
         combo=combo[0];
         var datos = '{"idCancha":"' + combo.getValue() + '",';
          datos += '"fecha1":"' + fecha1Parametro + '",';
          datos += '"fecha2":"' + fecha2Parametro + '"}';          
          
          Ext.Ajax.request({  
              url: 'php/RouterDBAJugarFutbol.php',  
              method: 'POST',               
              success: successAjaxFn,  
              failure: failureAjaxFn, 
              timeout: 30000,  
              headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta disponibilidad de cancha'},  
              params: {clasePhp: 'InstalacionDB',
                       metodo:   'getCanchasInstalacionCombo',
                       datos:    datos}  
              }); // Fin de la llamada Ajax
        
    }, // Fin de Selecciono en la pantalla instalacion el boton Reserva
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Reservar
    seleccionoFavoritaInformacion: function(checkbox) {
        var win = Ext.ComponentQuery.query('#winBusquedaReservar');
        win = win[0];     
        
        var obj = win.query('#chkFavorita');        
        //console.log (obj[2]);  
        for(var i=0;i<obj.length;i++){            
            if(obj[i]['id']=='chkFavorita'+checkbox['itemId']){
               obj=obj[i];
               obj.setValue(checkbox['value']);
               break;
            }  
        }                
                    
        //if(checkbox['value']==true){obj.setValue(true);}else{obj.setValue(false)}  
        
    }, // Fin de Selecciono en la pantalla instalacion el boton Reservar
//=========================================================================================================================  
  // Cierra Ventana de confirmar reservacion
    cierraVentanaConfirmarReserva: function(button) {
        var win = Ext.ComponentQuery.query('#winConfirmaReservacion');
        win = win[0];                 
        win.close();
    }, // Fin Cierra Ventana de confirmar reservacion
//=========================================================================================================================  
  // Cierra Ventana de Aprueba Reto
    cierraVentanaReto: function(button) {
        var win = Ext.ComponentQuery.query('#winApruebaReto');
        win = win[0];                 
        win.close();
    }, // Fin Cierra Ventana de Aprueba Reto
//=========================================================================================================================  
  // Boton CONFIRMA Ventana de confirmar reservacion
    confirmarReserva: function(button) {
        var idCancha=Ext.ComponentQuery.query('#cmbCanchas');
        idCancha=idCancha[0];
        idCancha=idCancha.getValue();
        
        var comentario=Ext.ComponentQuery.query('#txtComentarioReservacion');
        comentario=comentario[0];
        comentario=comentario.getValue();
        
        if(comentario.length>100)
        {       
                Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'El comentario debe tener un m&aacute;ximo de 100 caracteres.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});              
                 return;
        }
        
        var win=Ext.ComponentQuery.query('#winConfirmaReservacion'); 
        win=win[0];        
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

             var obj = Ext.JSON.decode(response.responseText);                           
             // console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);             
             if (obj.respuesta[0].mensaje.mensaje == '0') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Hace unos segundos el campo fue reservado',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});                                   
                    win.close();                                     
                  return;
             }else{
                 win.close();
                 new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Información</font>',
                    html:	 '<b>Has relizado la reservaci&oacute;n correctamente.</b><p>Puede que el administrador de la cancha se ponga en contacto con usted.</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);                                                                                    
                return;
                }
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente       

      var idUsuario=global_id_usuario;
      var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
      instalacion=instalacion[0];
      
      var estadoReservacion=2;
      var reto =Ext.ComponentQuery.query('#rdbReto');
      reto=reto[0];
      if(reto.getValue()==true){estadoReservacion=6;}else{     
      if(instalacion['modoReservacion']==5){estadoReservacion=1;}
      else{if(instalacion['modoReservacion']==8){estadoReservacion=4;}}}
       
      var datos = '{"idCancha":"' + idCancha + '",';
      datos += '"idUsuario":"' + idUsuario + '",';
      datos += '"estadoReservacion":"' + estadoReservacion + '",';
      datos += '"idEquipo":"' + 0 + '",';
      datos += '"fechaYhora":"' + button['fechayHora'] + '",';          
      datos += '"comentarioReservacion":"' + comentario + '"}';

      //console.log('datos Ajax : '+datos);
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Registrar una Reservacion'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'reservacionCancha',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
          
          this.seleccionoCanchaReserva(null,null);
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
//========================================================================================================================= 
  // Boton CONFIRMA Ventana de confirmar reservacion
    confirmarReto: function(button) {       
        var idCancha=Ext.ComponentQuery.query('#cmbCanchas');
        idCancha=idCancha[0];
        idCancha=idCancha.getValue();
        
        var comentario=Ext.ComponentQuery.query('#txtComentarioReservacion');
        comentario=comentario[0];
        comentario=comentario.getValue();
        
        if(comentario.length>100)
        {       
                Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'El comentario debe tener un m&aacute;ximo de 100 caracteres.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});              
                 return;
        }
        
        var win=Ext.ComponentQuery.query('#winApruebaReto'); 
        win=win[0];        
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

             var obj = Ext.JSON.decode(response.responseText);                           
             // console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);             
               if (obj.respuesta[0].mensaje.mensaje == '0') {
                 Ext.MessageBox.show({
                     title: 'Error',
                     msg: 'Hace unos segundos el campo fue reservado',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});                                   
                    win.close();                                     
                  return;
             }else{
                 win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Información</font>',
                    html:	 '<b>Has aceptado el reto correctamente.</b><p>Puede que el administrador de la cancha se ponga en contacto con usted.</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);                                                                                    
                return;
                }
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente       

      var idUsuario=global_id_usuario;
      var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
      instalacion=instalacion[0];
      
      var estadoReservacion=7;      
       
      var datos = '{"idCancha":"' + idCancha + '",';
      datos += '"idUsuario":"' + idUsuario + '",';
      datos += '"estadoReservacion":"' + estadoReservacion + '",';
      datos += '"idEquipo":"' + 0 + '",';
      datos += '"fechaYhora":"' + button['fechayHora'] + '",';          
      datos += '"comentarioReservacion":"' + comentario + '"}';

      //console.log('datos Ajax : '+datos);
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reto. Registrar una Reto'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'reservacionReto',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
          
          this.seleccionoCanchaReserva(null,null);
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
//========================================================================================================================= 
  // Check en el la ventana de confirmar reservacion (Equipos)
    checkVentanaConfirmarReservacion: function(checkbox) {
        var obj=Ext.ComponentQuery.query('#cmbCREquipos');
        obj=obj[0];
        if(checkbox['value']==false)
        {
            obj.setVisible(false);
        }
        else
        {
            obj.setVisible(true);
        }                    
    },//FIN Check en el la ventana de confirmar reservacion (Equipos)
//========================================================================================================================= 
  // Selecciono en la pantalla Calendario Reservar el boton semana siguiente
    seleccionoSemanaSiguiente: function(button) {
        var obj = Ext.ComponentQuery.query('#btnSemanaAnterior');
        obj=obj[0];
        obj.setDisabled(false);
                
        button['controlFecha']=new Date(button['controlFecha'].getTime() + (7 * 24 * 3600 * 1000));
        button['contador']=button['contador']+1;
        this.seleccionoCanchaReserva(null,null);
    }, // Fin de  Selecciono en la pantalla Calendario Reservar el boton semana siguiente
//========================================================================================================================= 
  // Selecciono en la pantalla Calendario Reservar el boton semana siguiente
    seleccionoSemanaAnterior: function(button) {
        var obj = Ext.ComponentQuery.query('#btnSemanaSiguiente');
        obj[0]['contador']=obj[0]['contador']-1;
        obj[0]['controlFecha']=new Date(obj[0]['controlFecha'].getTime() - (7 * 24 * 3600 * 1000));
        
        if(obj[0]['contador']==0)
        {
            button.setDisabled(true);
        }
        this.seleccionoCanchaReserva(null,null);
    }, // Fin de  Selecciono en la pantalla Calendario Reservar el boton semana siguiente
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el check de favorito
    clickBotonMenu: function(checkbox) {        
         var idUsuario =global_id_usuario;
         var idInstalacion =checkbox['idInst'];         
         var valorCheck=checkbox['valor'];
         
         var win = Ext.ComponentQuery.query('#winBusquedaReservar');
         win = win[0]; 

         var imagenFavorita= win.query('#imgFavoritaInstalacion'+idInstalacion);
         imagenFavorita=imagenFavorita[0];      
         
          var tituloFavorita=win.query('#lblTituloFavorita'+idInstalacion); 
          tituloFavorita=tituloFavorita[0];
         
         if(valorCheck==false)
         {
                imagenFavorita.setSrc("resources/imagenes/estrella.png");
                imagenFavorita.setSrcNormal("resources/imagenes/estrella.png");
                imagenFavorita.setSrcDown("resources/imagenes/estrellaN.png");
                imagenFavorita.setSrcUp("resources/imagenes/estrella.png");
                imagenFavorita.setSrcClick("resources/imagenes/estrellaN.png");
                imagenFavorita.setSrcOver("resources/imagenes/estrellaN.png");
                tituloFavorita.setValue('<span style="font-size:20px;color:white;margin-left:80px;">Favorita</span>');
                imagenFavorita['valor']=true;
                valorCheck=true;
         }
         
         else
         {
                imagenFavorita.setSrc("resources/imagenes/estrellaN.png");
                imagenFavorita.setSrcNormal("resources/imagenes/estrellaN.png");
                imagenFavorita.setSrcDown("resources/imagenes/estrella.png");
                imagenFavorita.setSrcUp("resources/imagenes/estrellaN.png");
                imagenFavorita.setSrcClick("resources/imagenes/estrella.png");
                imagenFavorita.setSrcOver("resources/imagenes/estrella.png");
                tituloFavorita.setValue('<span style="font-size:20px;color:white;">Agregar Favorita</span>');
                imagenFavorita['valor']=false;
                valorCheck=false;
         }
         
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
                 var obj = Ext.JSON.decode(response.responseText);                                             
         } // Find de Funcion para cuando el Ajax Request responde correctamente
       
          var datos = '{"idUsuario":"' + idUsuario + '",';
          datos += '"valorCheck":"' + valorCheck + '",';
          datos += '"idInstalacion":"' + idInstalacion + '"}';          

          Ext.Ajax.request({  
              url: 'php/RouterDBAJugarFutbol.php',  
              method: 'POST',               
              success: successAjaxFn,  
              failure: failureAjaxFn, 
              timeout: 30000,  
              headers: {'cabecera': 'Operaciones de DB al Objeto Usuario. Agregar o Eliminar Instalacion favorita'},  
              params: {clasePhp: 'UsuarioDB',
                       metodo:   'agregaInstalacionFavorito',
                       datos:    datos}  
              }); // Fin de la llamada Ajax
    }, // Fin de Selecciono en la pantalla instalacion el check de favorito
//========================================================================================================================= 
    // Click en Boton buscar cancha    
    muestraInstalaciones: function() {            
            var win = Ext.ComponentQuery.query('#winBusquedaReservar');
            win = win[0];            
            
            var btnVerMasInstalaciones = win.query('#btnVerMasInstalaciones');
            btnVerMasInstalaciones=btnVerMasInstalaciones[0];            
            btnVerMasInstalaciones.setVisible(false);
            
            var pagInicio=btnVerMasInstalaciones['pagInicio'];
            var pagFinal=btnVerMasInstalaciones['pagFinal'];            
            var plnInstalaciones = win.query('#plnInstalaciones');
            plnInstalaciones = plnInstalaciones[0];            
            
            var plnBusqueda = Ext.ComponentQuery.query('#plnBusqueda');
            plnBusqueda =  plnBusqueda[0];            
            
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
           var todasInstalaciones=new Array();
           var winInstalacion;
           var cantFilas=obj.respuesta[0].mensaje.CantFilas;
           
           btnVerMasInstalaciones['totalFilas']=obj.respuesta[0].mensaje.cantidadInstalaciones;
           
           if(obj.respuesta[0].mensaje.cantidadInstalaciones<=pagFinal)
            {                                
                btnVerMasInstalaciones.setVisible(false);            
            }
            else
            {
                btnVerMasInstalaciones.setVisible(true);            
            }            
            var j=0;
            if(cantFilas>0)
            {    
                for(var i=0;i<cantFilas;i++)
                {            
                    winInstalacion='winInstalacionInicial'+obj.respuesta[1].results[i].id;
                    winInstalacion= Ext.widget('winInstalacionPrueba', {id:winInstalacion,alias:'widget.'+winInstalacion,itemId:winInstalacion});

                    //Cambia ID a los componentes de la pantalla Instalacion                    
                    var cambiaID = winInstalacion.query('#imgFavoritaInstalacion');                    
                    cambiaID[0]['itemId']='imgFavoritaInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['id']='imgFavoritaInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                  
                    
                    cambiaID = winInstalacion.query('#imgLogoInstalacion');                            
                    cambiaID[0]['itemId']='imgLogoInstalacion'+obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#lblTituloFavorita');                            
                    cambiaID[0]['itemId']='lblTituloFavorita'+obj.respuesta[1].results[i].id;                                                            
                    
                    cambiaID = winInstalacion.query('#lblNombreInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblNomnbreInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<span style="font-size:20px;color:white;"><b>'+obj.respuesta[1].results[i].NombreInst+'</b></span>';                    
                    
                    cambiaID = winInstalacion.query('#lblEncargadoInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblEncargadoInstalacion'+obj.respuesta[1].results[i].id;    
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].NombreContacto+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblTelefonosInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblTelefonosInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].Telefono1+' - '+obj.respuesta[1].results[i].Telefono2+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblCorreoInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblCorreoInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].EMailInst+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblFaxInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblFaxInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].Fax+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblPaginaWebInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblPaginaWebInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].URLPaginaWeb+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblHorarioInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblHorarioInstalacion'+obj.respuesta[1].results[i].id; 
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].DescHorario+'</b>';
                    
                    cambiaID = winInstalacion.query('#lblDireccionInstalacion');                                                                   
                    cambiaID[0]['itemId']='lblDireccionInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['rawValue']='<b>'+obj.respuesta[1].results[i].Distrito+', '+obj.respuesta[1].results[i].Canton+' de '+obj.respuesta[1].results[i].Provincia+'</b>';                    
                    //Botones
                    cambiaID = winInstalacion.query('#btnMapaGoogleInstalacion');
                    cambiaID[0]['itemId']='btnMapaGoogleInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#btnCampeonatosInstalacion');                 
                    cambiaID[0]['itemId']='btnCampeonatosInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#btnServiciosInstalacion');                   
                    cambiaID[0]['itemId']='btnServiciosInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    
                    
                    cambiaID = winInstalacion.query('#btnCanchasInstalacion');                     
                    cambiaID[0]['itemId']='btnCanchasInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;

                    cambiaID = winInstalacion.query('#btnGaleriaFotosInstalacion');                
                    cambiaID[0]['itemId']='btnGaleriaFotosInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;                    

                    cambiaID = winInstalacion.query('#btnReservarInstalacion');                                 
                    cambiaID[0]['itemId']='btnReservarInstalacion'+obj.respuesta[1].results[i].id;
                    cambiaID[0]['idInst']=obj.respuesta[1].results[i].id;
                    cambiaID[0]['nombreInstalacion']=obj.respuesta[1].results[i].NombreInst;
                    cambiaID[0]['direccion']=obj.respuesta[1].results[i].Canton+', '+obj.respuesta[1].results[i].Distrito+' de '+obj.respuesta[1].results[i].Provincia;
                    cambiaID[0]['telefono']=obj.respuesta[1].results[i].Telefono1;
                    cambiaID[0]['modoReservacion']=obj.respuesta[1].results[i].MetodoReservacion;
                    cambiaID[0]['encargado']=obj.respuesta[1].results[i].NombreContacto;
                    cambiaID[0]['correo']=obj.respuesta[1].results[i].EMailInst;
                    // FIN Botones
                    //Fin de Cambia ID a los componentes de la pantalla Instalacion

                    //Llena los datos de cada instalacion en el Array global(global_instalaciones) 
                    global_instalaciones[j]=obj.respuesta[1].results[i].id;
                    global_instalaciones[j+1]=obj.respuesta[1].results[i].NombreInst;
                    global_instalaciones[j+2]=obj.respuesta[1].results[i].Canton+', '+obj.respuesta[1].results[i].Distrito+' de '+obj.respuesta[1].results[i].Provincia;
                    global_instalaciones[j+3]=obj.respuesta[1].results[i].UbicGPSLat;                
                    global_instalaciones[j+4]=obj.respuesta[1].results[i].UbicGPSLng;                    
                    global_instalaciones[j+5]=obj.respuesta[1].results[i].IdInstalacion; 
                    j+=6;                
                    // FIN Llena los datos de cada instalacion en el Array global(global_instalaciones)

                    //Componentes de la Pantalla Instalaciones
                    var objx = winInstalacion.query('#imgLogoInstalacion'+obj.respuesta[1].results[i].id);
                    objx = objx[0];         
                    objx.setSrc(obj.respuesta[1].results[i].FileLogo);
                    
                    var tituloFavorita=winInstalacion.query('#lblTituloFavorita'+obj.respuesta[1].results[i].id); 
                    tituloFavorita=tituloFavorita[0];
                    
                    objx = winInstalacion.query('#imgFavoritaInstalacion'+obj.respuesta[1].results[i].id);                    
                    objx = objx[0];
                                        
                    if(global_id_usuario==''||global_id_usuario==null)
                    {                            
                        objx.setVisible(false);                                                
                    }
                    else
                    {
                       if(obj.respuesta[1].results[i].IdInstalacion==null)
                       {     
                            tituloFavorita.setValue('<span style="font-size:20px;color:white;">Agregar Favorita</span>');
                            objx.setSrc("resources/imagenes/estrellaN.png"); 
                            objx.setSrcNormal("resources/imagenes/estrellaN.png");
                            objx.setSrcDown("resources/imagenes/estrella.png");
                            objx.setSrcUp("resources/imagenes/estrellaN.png");
                            objx.setSrcClick("resources/imagenes/estrella.png");
                            objx.setSrcOver("resources/imagenes/estrella.png");
                            objx['valor']=false;
                       }
                       else
                       {                                                
                            objx.setSrc("resources/imagenes/estrella.png");
                            objx.setSrcNormal("resources/imagenes/estrella.png");
                            objx.setSrcDown("resources/imagenes/estrellaN.png");
                            objx.setSrcUp("resources/imagenes/estrella.png");
                            objx.setSrcClick("resources/imagenes/estrellaN.png");
                            objx.setSrcOver("resources/imagenes/estrellaN.png");
                            objx['valor']=true;
                            tituloFavorita.setValue('<span style="font-size:20px;color:white;margin-left:80px;">Favorita</span>');
                       }
                    }
                    todasInstalaciones[i]=winInstalacion;  
               }
                    plnInstalaciones.add(todasInstalaciones);
                    plnInstalaciones.doLayout();               
           }
           else
           {
               Ext.MessageBox.show({
                     title: 'Mensaje',
                     msg: 'No se encontraron resultados',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.INFO});
                  return; 
           }
     }
         
      var idUsuario='';
       if(global_id_usuario==''||global_id_usuario==null)
       {
           idUsuario=null;
       }
       else
       {
           idUsuario=global_id_usuario;
       }
          var datos = '{"idUsuario":"' + idUsuario + '",';
          datos += '"pagInicio":"' + pagInicio + '",';          
          datos += '"pagFinal":"' + pagFinal + '"}';
       
           Ext.Ajax.request({  
                 url: 'php/RouterDBAJugarFutbol.php',  
                 method: 'POST',  
                 success: successAjaxFn,  
                 failure: failureAjaxFn, 
                 timeout: 30000,  
                 headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta las instalaciones'},  
                 params: {clasePhp: 'InstalacionDB',
                          metodo:   'getTodosRegistros',
                          datos:    datos}  
                 }); // Fin de la llamada Ajax                
    },// Fin en Boton buscar cancha 
  
verMasInstalaciones: function(button) {          
        button['pagInicio']=button['pagInicio']+9;
        button['pagFinal']=button['pagFinal']+9;                                
        this.muestraInstalaciones();
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
    }
   
 });
