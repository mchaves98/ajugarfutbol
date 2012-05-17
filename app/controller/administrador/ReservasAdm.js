Ext.define('AJugarFutbol.controller.administrador.ReservasAdm', {
    extend: 'Ext.app.Controller',

    init: function() {        
        
        this.control({ 
            //Botones de ventana de Calendario Reservar                        
            'winCalenReservaAdm':{render: this.renderControlCancha},   
            'winCalenReservaAdm button[id=btnBloqueadaCalendario]':{click: this.renderBloqueoCancha},   
            'winCalenReservaAdm button[idItem=btnRealizaReservacion]':{click: this.realizaReservacion},            
            'winCalenReservaAdm combobox[id=cmbCanchas]':{change: this.seleccionoCanchaReserva},
            'winCalenReservaAdm button[id=btnActualizarCalenAdm]':{click: this.sincronizaCalendarioAdm},
            'winCalenReservaAdm button[id=btnSemanaSiguiente]':{click: this.seleccionoSemanaSiguiente},
            'winCalenReservaAdm button[id=btnSemanaAnterior]':{click: this.seleccionoSemanaAnterior},
            'winCalenReservaAdm datefield[id=dteFechaCalenAdm]':{change: this.seleccionoFechaEspecifica},
            //Mouse Over de todos los botones            
            'winCalenReservaAdm button[id=007]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=107]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=207]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=307]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=407]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=507]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=607]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=008]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=108]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=208]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=308]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=408]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=508]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=608]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=009]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=109]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=209]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=309]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=409]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=509]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=609]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=010]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=110]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=210]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=310]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=410]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=510]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=610]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=011]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=111]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=211]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=311]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=411]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=511]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},            
            'winCalenReservaAdm button[id=611]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=012]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=112]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=212]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=312]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=412]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=512]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=612]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=013]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=113]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=213]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=313]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=413]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=513]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=613]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=014]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=114]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=214]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=314]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=414]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=514]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=614]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=015]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=115]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=215]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=315]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=415]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=515]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=615]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=016]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=116]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=216]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=316]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=416]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=516]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=616]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=017]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=117]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=217]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=317]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=417]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=517]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=617]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=018]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=118]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=218]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=318]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=418]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=518]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=618]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=019]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=119]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=219]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=319]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=419]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=519]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=619]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=020]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=120]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=220]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=320]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=420]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=520]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=620]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=021]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=121]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=221]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=321]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=421]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=521]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=621]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=022]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=122]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=222]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=322]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=422]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=522]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            'winCalenReservaAdm button[id=622]':{mouseover: this.mouseOverBotones,mouseout:this.mouseOutBotones},
            //FIN
            //Botones de la ventana Consulta Cliente
            'winMasInformacionUsuario button[itemId=btnInfoEditaComentarioUsuario]':{click: this.editaComentarioConsultaCliente},
            'winMasInformacionUsuario button[itemId=btnInfoUsuarioSalir]':{click: this.salirConsultaCliente},
            //FIN Botones de la ventana Consulta Cliente
            //Botones de la ventana Aprobar una Reservacion
            'winApruebaReservacion button[id=btnAprobarReservacion]':{click: this.apruebaReservacionPendiente},
            'winApruebaReservacion button[id=btnCancelarReservacion]':{click: this.cancelaAprobacionReservacion},
            'winApruebaReservacion button[id=btnMasInfoUsuario]':{click: this.rendeConsultaUsuario},
            'winApruebaReservacion button[id=btnEditaComentarioReservacion]':{click: this.editaComentarioApruebaReserv},
            //FIN Botones de la ventana Aprobar una Reservacion
            //Botones de la ventana Crear una Reservacion            
            'winCrearReservacion button[id=btnCreaReservacion]':{click: this.apruebaCrearReservacion},
            'winCrearReservacion button[id=btnCancelarReservacion]':{click: this.cierraVentanaCrearReserva},
            //FIN Botones de la ventana Crear Reservacion
            ////Botones de la ventana Lista Espera        
            'winListaEspera button[id=btnLEListaEspera]':{click: this.apruebaListaEspera},
            'winListaEspera button[id=btnLECancelarReservacion]':{click: this.cancelaListaEspera},
            'winListaEspera combobox[id=cmbLEListaEspera]':{change: this.comboListaEspera},
            //FIN Botones de la ventana Lista Espera
            ////Botones de la ventana Buscar un reto en Administrador   
            'winBuscaRetoAdm radiofield[id=rdbClienteFrecuente]':{change: this.radiosUsuariowinBuscaRetoAdm}, 
            'winBuscaRetoAdm radiofield[id=rdbTodosUsuarios]':{change: this.radiosUsuariowinBuscaRetoAdm}, 
            'winBuscaRetoAdm radiofield[id=rdbRegistrar]':{change: this.radiosRegistrarwinBuscaRetoAdm},
            'winBuscaRetoAdm combobox[id=cmbRRComboClienteFrecuente]':{keyup: this.enterClienteUsuarioCombo},
            'winBuscaRetoAdm checkboxfield[id=chkRREquipo]':{change: this.cambioCheEquipos},
            'winBuscaRetoAdm button[id=btnAprobarReto]':{click: this.buscaRetoAdm},
            'winBuscaRetoAdm button[id=btnCancelarAlRetador]':{click: this.cancelaALRetador},
            'winBuscaRetoAdm button[id=btnEditaComentarioReservacion]':{click: this.editaComentarioBuscaReto},
            'winBuscaRetoAdm button[id=btnMasInfoUsuario]':{click: this.rendeConsultaUsuario},
            //FIN Botones de la ventana Buscar un reto en Administrador
            //Botones de la ventana Cancelar una Reservacion            
            'winCancelarReservacion button[id=btnCRCancelarReservacion]':{click: this.cancelaReservacion},
            'winCancelarReservacion button[id=btnCRSalir]':{click: this.cierraVentanaCancelarReserva},
            'winCancelarReservacion button[id=btnEditaComentarioReservacion]':{click: this.editaComentarioCancelaReserv},
            'winCancelarReservacion button[id=btnMasInfoUsuario]':{click: this.rendeConsultaUsuario},
            //Botones de la ventana BloquearCancha        
            'winBloqueoCancha button[itemId=btnAccionBloqueo]':{click: this.bloqueoCancha},            
            'winBloqueoCancha button[itemId=btnSalirBloqueo]':{click: this.cerrarbloqueoCancha},            
            //FIN Botones de la ventana BloquearCancha 
            ////Botones de la ventana Desbloqueo        
            'winDesbloqueo button[itemId=btnDesbloquear]':{click: this.desbloqueoReservacion},            
            'winDesbloqueo button[itemId=btnSalirDesbloqueo]':{click: this.cerrarWinDesbloqueo},    
            'winDesbloqueo button[id=btnEditaComentarioBloqueo]':{click: this.editaComentarioDesbloqueo},
            //'winDesbloqueo textareafield[id=txtComentarioBloqueo]':{blur: this.editaComentarioDesbloqueo},
            //FIN Botones de la ventana Desbloqueo 
            //Botones de la ventana Aprueba Reto adm            
            'winApruebaRetoAdm button[id=btnCancelarReto1]':{click: this.cancelaApruebaRetoAdm},            
            'winApruebaRetoAdm button[id=btnCancelarReto2]':{click: this.cancelaApruebaRetoAdm},  
            'winApruebaRetoAdm button[id=btnEditaComentarioReservacion1]':{click: this.editaComentarioReto},
            'winApruebaRetoAdm button[id=btnEditaComentarioReservacion2]':{click: this.editaComentarioReto},
            'winApruebaRetoAdm button[id=btnConfirmaReto]':{click: this.confirmaReto},
            'winApruebaRetoAdm button[id=btnMasInfoUsuario1]':{click: this.rendeConsultaUsuario},
            'winApruebaRetoAdm button[id=btnMasInfoUsuario2]':{click: this.rendeConsultaUsuario},
            //FIN Botones de la ventana Aprueba Reto adm
            'winCrearReservacion combobox[id=cmbRRComboClienteFrecuente]':{keyup: this.enterClienteUsuarioCombo},
            'winCrearReservacion checkboxfield[id=chkRREquipo]':{change: this.cambioCheEquipos},
            'winCrearReservacion radiofield[id=rdbTodosUsuarios]':{change: this.radioUsuarioCreaReservAdm},
            'winCrearReservacion radiofield[id=rdbClienteFrecuente]':{change: this.radioUsuarioCreaReservAdm},
            'winCrearReservacion radiofield[id=rdbRegistrar]':{change: this.radiosRegistrarCreaReservAdm},
            //FIN Botones de la ventana Confirmar Reservacion
            //Cuando cierra las ventanas Windows
            'winCrearReservacion' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winDesbloqueo' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winBloqueoCancha' : {close: this.cierraVentanaBloqueo,destroy: this.cierraVentanasWin,hide:this.cierraVentanaBloqueo},
            'winApruebaRetoAdm' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winCancelarReservacion' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winBuscaRetoAdm' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winListaEspera' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin},
            'winApruebaReservacion' : {close: this.cierraVentanasWin,destroy: this.cierraVentanasWin}            
        });        
    }, 
//=========================================================================================================================
    mouseOverBotones: function(button) {
                      
               
       var boton=Ext.get(button['id']);                     
       var color=boton.getStyle('background');
       var sacaHora=button['id'].substring(1,3);       
       if(parseInt(sacaHora)<10){sacaHora='0'+button['id'].substring(2,3);}
       var panel=Ext.get('pln'+sacaHora);              
       panel.setStyle("border-width","0px");
       panel.setStyle("border-style","solid");
       panel.setStyle("border-color",color);         
       panel.setStyle("border-left-width","17px");
       
       var dia='plnLunes';
       if(button['id'].substring(0,1)=='1'){dia='plnMartes';}
       else{
           if(button['id'].substring(0,1)=='2')
           {
               dia='plnMiercoles';           
           }
           else{
               if(button['id'].substring(0,1)=='3'){dia='plnJueves';}
               else{
                    if(button['id'].substring(0,1)=='4'){dia='plnViernes';}
                    else{
                        if(button['id'].substring(0,1)=='5'){dia='plnSabado';}
                        else
                        {if(button['id'].substring(0,1)=='6'){dia='plnDomingo';}}
                    }
                }
           }
               
       }
       panel=Ext.get(dia);              
       panel.setStyle("border-width","0px");
       panel.setStyle("border-style","solid");
       panel.setStyle("border-color",color);         
       panel.setStyle("border-top-width","12px");
},
//=========================================================================================================================
    mouseOutBotones: function(button) {
                                           
       var sacaHora=button['id'].substring(1,3);       
       if(parseInt(sacaHora)<10){sacaHora='0'+button['id'].substring(2,3);}
       var panel=Ext.get('pln'+sacaHora);              
       panel.setStyle("border-style","none");
       panel.setStyle("border-width","0px");
       panel.setStyle("border-color","#000"); 
       
       var dia='plnLunes';
       if(button['id'].substring(0,1)=='1'){dia='plnMartes';}
       else{
           if(button['id'].substring(0,1)=='2')
           {
               dia='plnMiercoles';           
           }
           else{
               if(button['id'].substring(0,1)=='3'){dia='plnJueves';}
               else{
                    if(button['id'].substring(0,1)=='4'){dia='plnViernes';}
                    else{
                        if(button['id'].substring(0,1)=='5'){dia='plnSabado';}
                        else
                        {if(button['id'].substring(0,1)=='6'){dia='plnDomingo';}}
                    }
                }
           }
               
       }
       panel=Ext.get(dia);   
       panel.setStyle("border-style","none");
       panel.setStyle("border-width","0px");
       panel.setStyle("border-color","#000"); 
},
//=========================================================================================================================
    cierraVentanasWin: function(win) {
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       semaforoAjaxMask=true;       
},

//=========================================================================================================================
    cierraVentanaBloqueo: function(win) {
       var panelPapa = Ext.ComponentQuery.query('#viewport');
       panelPapa = panelPapa[0];
       panelPapa.getEl().unmask();
       semaforoAjaxMask=true;     
       win.destroy();
},
//=========================================================================================================================
rendeConsultaUsuario: function(button) {    
      semaforoAjaxMask=false;     
      // Funcion para cuando falla el Ajax Request
      var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petición' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              // console.log (errMessage); 
              alert("El servidor no contesto la petici\u00fan, posiblemente existe un problema en Internet.  \n\
                     Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
                     Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
              }  // Fin Funcion para cuando falla el Ajax Request
        
      var instalacion =Ext.ComponentQuery.query('#btnAdministracion');
        // Funcion para cuando el Ajax Request responde correctamente
      var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);                                   
              //alert(obj.respuesta[0].mensaje.codigoError); 
          var objx = Ext.JSON.decode(response.responseText,true);
          if (objx == null) {
            alert("Existe un problema con el Servidor.  Revise su conexi\u00fann a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
            //win.close();
            return;
          }          
          var cantFilas=objx.respuesta[0].mensaje.CantFilas;
             
          if(cantFilas>0){
              var winConsultaUsuarioAdm =Ext.create('AJugarFutbol.view.administrador.MasInformacionUsuario'); 
              
              var obj=winConsultaUsuarioAdm.query('#lblInfoCedula');
              obj=obj[0];
              obj.setValue('<b>'+objx.respuesta[1].results[0].NoCedula+'</b>');

              obj=winConsultaUsuarioAdm.query('#btnInfoEditaComentarioUsuario');
              obj[0]['idPersona']=objx.respuesta[1].results[0].id;
              
              obj=winConsultaUsuarioAdm.query('#lblInfoNombre');
              obj=obj[0];
              obj.setValue('<b>'+objx.respuesta[1].results[0].Nombre+'</b>');

              obj=winConsultaUsuarioAdm.query('#lblInfoApellidos');
              obj=obj[0];
              obj.setValue('<b>'+objx.respuesta[1].results[0].Apellidos+'</b>');

              obj=winConsultaUsuarioAdm.query('#lblInfoTelefono1');
              obj=obj[0];
              obj.setValue('<b>'+objx.respuesta[1].results[0].TelCelular+'</b>');
              
              obj=winConsultaUsuarioAdm.query('#lblInfoTelefono2');
              obj=obj[0];
              obj.setValue('<b>'+objx.respuesta[1].results[0].Telefono2+'</b>');
              
              var genero='Masculino';
              if(objx.respuesta[1].results[0].Genero=='F'){genero='Femenino'}
              obj=winConsultaUsuarioAdm.query('#lblInfoGenero');
              obj=obj[0];
              obj.setValue('<b>'+genero+'</b>');
              
              var fechaN='';
              if(!(objx.respuesta[1].results[0].FechaNacimiento==null)){fechaN=objx.respuesta[1].results[0].FechaNacimiento;}
              obj=winConsultaUsuarioAdm.query('#lblInfoFechaNacimiento');
              obj=obj[0];
              obj.setValue('<b>'+fechaN+'</b>');

              var correo='';
              if(!(objx.respuesta[1].results[0].EMail==null)){correo=objx.respuesta[1].results[0].EMail;}
              obj=winConsultaUsuarioAdm.query('#lblInfoCorreo');
              obj=obj[0];
              obj.setValue('<b>'+correo+'</b>');

              var FotoFile=objx.respuesta[1].results[0].FotoFile;
              if(!(FotoFile==null||FotoFile=='null'||FotoFile==''))
              {
                  obj=winConsultaUsuarioAdm.query('#imgInfoFotoUsuario');
                  obj=obj[0]; 
                  obj.setSrc('resources/fotosUsuarios/'+FotoFile);
              }
              
              var provincia='';
              if(!(objx.respuesta[1].results[0].Provincia==null)){provincia=objx.respuesta[1].results[0].Provincia;}
              obj=winConsultaUsuarioAdm.query('#lblInfoProvincia');
              obj=obj[0];
              obj.setValue('<b>'+provincia+'</b>');

              var canton='';
              if(!(objx.respuesta[1].results[0].Canton==null)){canton=objx.respuesta[1].results[0].Canton;}
              obj=winConsultaUsuarioAdm.query('#lblInfoCanton');
              obj=obj[0];
              obj.setValue('<b>'+canton+'</b>');
              
              var distrito='';
              if(!(objx.respuesta[1].results[0].Distrito==null)){distrito=objx.respuesta[1].results[0].Distrito;}
              obj=winConsultaUsuarioAdm.query('#lblInfoDistrito');
              obj=obj[0];
              obj.setValue('<b>'+distrito+'</b>');
              
              var nivelConfianza='No s&eacute;';
              if(objx.respuesta[1].results[0].NivelConfianza=='2'){nivelConfianza='Malo';}else{
              if(objx.respuesta[1].results[0].NivelConfianza=='3'){nivelConfianza='Regular';}
              else{if(objx.respuesta[1].results[0].NivelConfianza=='4'){nivelConfianza='Bueno';}
              else{if(objx.respuesta[1].results[0].NivelConfianza=='5'){nivelConfianza='Excelente';}}}}
              obj=winConsultaUsuarioAdm.query('#lblInfoNivelConfianza');
              obj=obj[0];
              obj.setValue('<b>'+nivelConfianza+'</b>');

              var dias='';
              var simbolo='';
              if(objx.respuesta[1].results[0].JuegaLun=='1'){dias+=simbolo+'Lunes';simbolo=', ';}
              if(objx.respuesta[1].results[0].JuegaMar=='1'){dias+=simbolo+'Martes';simbolo=', ';}
              if(objx.respuesta[1].results[0].JuegaMie=='1'){dias+=simbolo+'Mi&eacute;rcoles';simbolo=', ';}
              if(objx.respuesta[1].results[0].JuegaJue=='1'){dias+=simbolo+'Jueves';simbolo=', ';}
              if(objx.respuesta[1].results[0].JuegaVie=='1'){dias+=simbolo+'Viernes';simbolo=', ';}
              if(objx.respuesta[1].results[0].JuegaSab=='1'){dias+=simbolo+'S&aacute;bado';simbolo=', ';}
              if(objx.respuesta[1].results[0].JuegaDom=='1'){dias+=simbolo+'Domingo';simbolo=', ';}
              obj=winConsultaUsuarioAdm.query('#lblInfoDiasJuega');
              obj=obj[0];
              obj.setValue('<b>'+dias+'</b>');
              
              obj=winConsultaUsuarioAdm.query('#btnInfoEditaComentarioUsuario');
              obj[0]['idPersona']=objx.respuesta[1].results[0].id;              

              obj=winConsultaUsuarioAdm.query('#txtInfoComentario');
              obj=obj[0];
              obj.setValue(objx.respuesta[1].results[0].Comentario);
              
              winConsultaUsuarioAdm.show();
          }
          else
              {
                   Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'No se encuentra en su lista de cliente',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
              }
                
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idUsuario":"' + button['idUsuario'] + '",';          
      datos += '"idInstalacion":"' + instalacion[0]['idInstalacion'] + '"}';        
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ClienteDB',
                   metodo:   'getConsultaUnoCliente',
                   datos:    datos}  
          }); // Fin de la llamada Ajax      
},
//=========================================================================================================================
editaComentarioConsultaCliente: function(button) {
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
        
      var instalacion =Ext.ComponentQuery.query('#btnAdministracion');
        // Funcion para cuando el Ajax Request responde correctamente
      var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);                                   
              //alert(obj.respuesta[0].mensaje.codigoError); 
          var objx = Ext.JSON.decode(response.responseText,true);
          if (objx == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    //win.close();
                    return;
                }
          Ext.ComponentQuery.query('#winMasInformacionUsuario')[0].close();
           new Ext.ux.Notification({
            iconCls: 'information',
            title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
            html:	 '<b>Edito correctamente el comentario</b>',
            autoDestroy: true,
            width: 300,
            hideDelay:  7000}).show(document);      
      }
      
      var comentario=Ext.ComponentQuery.query('#txtInfoComentario')[0].getValue();
      
     // alert(button['idPersona'] +' - '+instalacion[0]['idInstalacion']+'- '+comentario);
      var datos = '{"idPersona":"' + button['idPersona'] + '",';          
      datos += '"idInstalacion":"' + instalacion[0]['idInstalacion'] + '",'; 
      datos += '"comentario":"' + comentario + '"}'; 
      
      //return;
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ClienteDB',
                   metodo:   'editaComentarioCliente',
                   datos:    datos}  
          }); // Fin de la llamada Ajax      
},
//=========================================================================================================================
salirConsultaCliente: function(button) {
  var win=Ext.ComponentQuery.query('#winMasInformacionUsuario');
  win[0].close();
},
//=========================================================================================================================
editaComentarioApruebaReserv: function(button) {
    var idReservacion=Ext.ComponentQuery.query('#btnAprobarReservacion'); 
    idReservacion=idReservacion[0]['idReservacion'];       
    var comentario=Ext.ComponentQuery.query('#txtComentarioReservacion'); 
    comentario=comentario[0].getValue();       
    this.editaTodosComentarios(idReservacion,comentario);    
    var win=Ext.ComponentQuery.query('#winApruebaReservacion'); 
    win[0].close();
},
//=========================================================================================================================
editaComentarioBuscaReto: function(button) {
    var idReservacion=Ext.ComponentQuery.query('#btnAprobarReto'); 
    idReservacion=idReservacion[0]['idReservacion'];       
    var comentario=Ext.ComponentQuery.query('#txtComentarioReservacion'); 
    comentario=comentario[0].getValue();       
    this.editaTodosComentarios(idReservacion,comentario);    
    var win=Ext.ComponentQuery.query('#winBuscaRetoAdm'); 
    win[0].close();
},
//=========================================================================================================================
editaComentarioReto: function(button) {    
    var idReservacion=Ext.ComponentQuery.query('#btnCancelarReto'+button['id'].substring(29,30)); 
    idReservacion=idReservacion[0]['idReservacion'];       
    var comentario=Ext.ComponentQuery.query('#txtComentarioReservacion'+button['id'].substring(29,30)); 
    comentario=comentario[0].getValue();       
    this.editaTodosComentarios(idReservacion,comentario); 
    var win=Ext.ComponentQuery.query('#winApruebaRetoAdm'); 
    win[0].close();
},
//===========================================================================================================================
editaComentarioCancelaReserv: function(button) {
    var idReservacion=Ext.ComponentQuery.query('#btnCRCancelarReservacion'); 
    idReservacion=idReservacion[0]['idReservacion'];       
    var comentario=Ext.ComponentQuery.query('#txtCRComentarioReservacion'); 
    comentario=comentario[0].getValue();       
    this.editaTodosComentarios(idReservacion,comentario);    
    var win=Ext.ComponentQuery.query('#winCancelarReservacion'); 
    win[0].close();
},
//===========================================================================================================================
editaComentarioDesbloqueo: function(button) {    
    var idReservacion=Ext.ComponentQuery.query('#btnDesbloquear'); 
    idReservacion=idReservacion[0]['idReservacion'];       
    var comentario=Ext.ComponentQuery.query('#txtComentarioBloqueo'); 
    comentario=comentario[0].getValue();       
    this.editaTodosComentarios(idReservacion,comentario);    
    var win=Ext.ComponentQuery.query('#winDesbloqueo'); 
    win[0].close();
},
//=========================================================================================================================
editaTodosComentarios: function(idReservacion,comentario) {
    
    if(comentario.length>100)
    {       
            Ext.MessageBox.show({
                 title: 'Atenci&oacute;n',
                 msg: 'El comentario debe tener un m&aacute;ximo de 100 caracteres.',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});              
             return;
    }
    var este=this;
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    //win.close();
                    return;
                }
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has editado el comentario correctamente.</b>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);   
                este.seleccionoCanchaReserva(null,null);                
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion":"' + idReservacion + '",';      
      datos += '"comentario":"' + comentario + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'editaComentarioReservacion',
                   datos:    datos}  
          }); // Fin de la llamada Ajax       
},
//=========================================================================================================================
renderBloqueoCancha: function(button) {
    var panelPapa = Ext.ComponentQuery.query('#viewport');
    panelPapa = panelPapa[0];
    panelPapa.getEl().mask();
    
    semaforoAjaxMask=false;          
     var me=this;
    
    var tituloCancha = Ext.ComponentQuery.query('#cmbCanchas');
    tituloCancha = tituloCancha[0].getRawValue();    
    
    var winBloqueoCancha =Ext.create('AJugarFutbol.view.administrador.BloqueoCancha');    
            
    var fechaInicio = winBloqueoCancha.query('#lblTituloCanchaBloqueo');
   fechaInicio=fechaInicio[0].setValue('<span style="font-size:15px;"><b>'+tituloCancha+'</b></span>');
   
   winBloqueoCancha.show();      
   
    
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {             
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    winBloqueoCancha.close();
                    return;
                }
             var cantFilas=obj.respuesta[0].mensaje.CantFilas;   
             
              
              //alert(obj.respuesta[0].mensaje.codigoError);  
              var storeRolles = Ext.create('Ext.data.Store', {
                                    fields: ['id', 'FechaInicial', 'FechaFinal', 'HoraInicial', 
                                             'HoraFinal', 'Comentario']});
                                     
           for (var i=0; i<cantFilas; i++) {
                    var fechaInicial=obj.respuesta[1].results[0][i].FechaInicial;
                    fechaInicial=fechaInicial.replace("-", "/" );
                    fechaInicial=fechaInicial.replace("-", "/" );   
                    fechaInicial=new Date(fechaInicial);
                    var mes=fechaInicial.getMonth()+1;
                    fechaInicial=fechaInicial.getDate()+'/'+mes+'/'+fechaInicial.getFullYear();   
                    
                    var fechaFinal=obj.respuesta[1].results[0][i].FechaFinal;
                    fechaFinal=fechaFinal.replace("-", "/" );
                    fechaFinal=fechaFinal.replace("-", "/" );   
                    fechaFinal=new Date(fechaFinal);
                    mes=fechaFinal.getMonth()+1;
                    fechaFinal=fechaFinal.getDate()+'/'+mes+'/'+fechaFinal.getFullYear();   
                    
                    var ampmReservacion='de la ma&ntilde;ana';
                    var horaReservacion=obj.respuesta[1].results[0][i].HoraInicial.substring(0,2);
                    
                    if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
                    if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
                    {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
                    {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
                    if(horaReservacion==12){ampmReservacion='de la tarde';}
                    
                    var HoraInicial='A las '+horaReservacion+':00 '+ampmReservacion;
                    
                    
                    ampmReservacion='de la ma&ntilde;ana';
                    horaReservacion=obj.respuesta[1].results[0][i].HoraFinal.substring(0,2);   
                    if(horaReservacion<10)
                    {horaReservacion=obj.respuesta[1].results[0][i].HoraFinal.substring(1,2);}
                    horaReservacion=parseInt(horaReservacion)+1;                    
                    
                    if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
                    if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
                    {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
                    {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
                    if(horaReservacion==12){ampmReservacion='de la tarde';}
                    
                    var HoraFinal='A las '+horaReservacion+':00 '+ampmReservacion;
                    
                    storeRolles.add({ id               : obj.respuesta[1].results[0][i].id,
                                      FechaInicial        : fechaInicial,
                                      FechaFinal         : fechaFinal,
                                      HoraInicial     : HoraInicial,
                                      HoraFinal  : HoraFinal,
                                      Comentario        : obj.respuesta[1].results[0][i].Comentario
                                      });
                    } // Fin del For para llenar el store de Rolles        
                  
            var tplRolles = new Ext.XTemplate(
                '<tpl for=".">',
                    '<div class="bloqueo-wrap">',
                       '<div class="bloqueo-box">',
                            '<br>',
                            '<span class="x-Fecha-bloqueo" style="margin:20px;"><b>Fecha de Inicio:</b>  {FechaInicial}</span> <br>',
                            '<span class="x-Cancha-bloqueo" style="margin:20px;"><b>Fecha Final:</b>  {FechaFinal}</span> <br>',
                            '<span class="x-Tiempo-bloqueo" style="margin:20px;"><b>Hora Inicial:</b>  {HoraInicial}</span> <br>',
                            '<span class="x-Comentario-bloqueo" style="margin:20px;"> <b>Hora Final:</b>  {HoraFinal}</span> <br>',
                            '<span class="x-Comentario-bloqueo" style="margin:20px;"> <b>Comentario:</b>  {Comentario}</span> <br>',
                            '<center><button class="x-boton-bloqueo" type="button">Eliminar</button></center>',                            
                       '</div>',
                    '</div>',
                '</tpl>',
                '<div class="x-clear"></div>');
                   
                    
            var dvRolles = new Ext.view.View({
                    id:    'dvBloqueoCanchas',
                    itemId: 'dvBloqueoCanchas',
                    autoScroll: true,
                    store: storeRolles, 
                    tpl: tplRolles,
                    trackOver: true,
                    width: 350,
                    multiSelect: false,
                    overClass: 'x-view-over', 
                    itemSelector: 'div.bloqueo-wrap',
                    emptyText: 'No hay bloqueos para desplegar!',
                    border: true
                });                            
           
            winBloqueoCancha.query('#plnListadoBloqueosCancha')[0].add([dvRolles]);            
            me.mon(winBloqueoCancha.query('#plnListadoBloqueosCancha')[0].getEl(), {click: {fn: me.EliminarBloqueo, scope: me}});                 
       }
       
      // Find de Funcion para cuando el Ajax Request responde correctamente      
      var idCancha = Ext.ComponentQuery.query('#cmbCanchas');
      idCancha=idCancha[0].getValue();
            
      var datos = '{"idCancha":"' + idCancha + '",';            
      datos += '"estadoReservacion":"' + 8 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion.'},  
          params: {clasePhp: 'InstalacionDB',
                   metodo:  'getCanchasBloqueos',
                   datos:    datos}  
          }); // Fin de la llamada Ajax       
},
//=========================================================================================================================
bloqueoCancha: function(button) {   
   
   var este=this;
   
   var fechaInicio = Ext.ComponentQuery.query('#dateInicioBloqueo');
   fechaInicio=fechaInicio[0].getValue();
   
   var fechaFinal = Ext.ComponentQuery.query('#dateFinalBloqueo');
   fechaFinal=fechaFinal[0].getValue();
         
   var horaInicio = Ext.ComponentQuery.query('#timeInicioBloqueo');
   horaInicio=horaInicio[0].getValue();
   
   var horaFinal = Ext.ComponentQuery.query('#timeFinalBloqueo');
   horaFinal=horaFinal[0].getValue();
   
   if(fechaInicio==null||fechaFinal==null||horaInicio==null||horaFinal==null)
   {
       Ext.MessageBox.show({
         title: 'Atenci&oacute;n',
         msg: 'Faltan datos importantes',
         buttons: Ext.MessageBox.OK,
         icon: Ext.MessageBox.ERROR});                  
       return;}
   
   if(fechaInicio>fechaFinal)
   {
        Ext.MessageBox.show({
         title: 'Atenci&oacute;n',
         msg: 'La fecha inicial debe ser menor a la fecha final',
         buttons: Ext.MessageBox.OK,
         icon: Ext.MessageBox.ERROR});   
       return;}
   
   if(horaInicio>=horaFinal)
   {
        Ext.MessageBox.show({
         title: 'Atenci&oacute;n',
         msg: 'La hora inicial debe ser menor a la hora final',
         buttons: Ext.MessageBox.OK,
         icon: Ext.MessageBox.ERROR});   
     return;}
      
   
   var comentario = Ext.ComponentQuery.query('#txtComentarioBloqueo');
   comentario=comentario[0].getValue();
   
   var idCancha = Ext.ComponentQuery.query('#cmbCanchas');
   idCancha=idCancha[0].getValue();
   
   var dif= fechaFinal.getTime() - fechaInicio.getTime();
   dif=Math.floor(dif/(1000 * 60 * 60 * 24));
   
   var boton = Ext.ComponentQuery.query('#btnAccionBloqueo');
   boton=boton[0];
   boton.setDisabled(true);
   
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {             
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");                    
                    return;
                }
              //alert(obj.respuesta[0].mensaje.codigoError);             
              
                //win.close();
                if (obj.respuesta[0].mensaje.mensaje == '0') {
                     Ext.MessageBox.show({
                         title: 'Error',
                         msg: 'El bloqueo ya se encuentra en la cancha seleccionada',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});
                      boton.setDisabled(false);  
                 }else{                     
                    if(obj.respuesta[0].mensaje.mensaje == '1')
                    { 
                       Ext.MessageBox.show({
                         title: 'Error',
                         msg: 'Se encuentran reservaciones realizadas entre esa(s) fecha(s)',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR}); 
                     boton.setDisabled(false);
                    }
                    else{
                        if(obj.respuesta[0].mensaje.mensaje == '2'){                            
                                new Ext.ux.Notification({
                                iconCls: 'information',
                                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                                html:	 '<b>Has relizado el bloqueo correctamente.</b>',
                                autoDestroy: true,
                                width: 300,
                                hideDelay:  7000}).show(document);                                                    
                            este.seleccionoCanchaReserva(null,null);
                            var win = Ext.ComponentQuery.query('#winBloqueoCancha');   
                              win[0].close();
                        }else
                            {                                    
                               Ext.MessageBox.show({
                                 title: 'Error',
                                 msg: 'Desde la fecha de inicio a los proximo(s) se encuentran reservaciones realizadas',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.WARNING});  
                             boton.setDisabled(false);
                            }
                      }
                    }                                                           
       }
       
      var anno=fechaInicio.getFullYear();        
      var mes=fechaInicio.getMonth()+1;
      var dia=fechaInicio.getDate();
      fechaInicio=anno+'-'+mes+'-'+dia;
      
      anno=fechaFinal.getFullYear();        
      mes=fechaFinal.getMonth()+1;
      dia=fechaFinal.getDate();
      fechaFinal=anno+'-'+mes+'-'+dia;
      
      horaInicio=horaInicio.getHours();
      horaFinal=horaFinal.getHours()-1;
      
      var metodo = Ext.ComponentQuery.query('#rdbAvisarBloqueoCliente');
      metodo=metodo[0].getValue();  
      
      if(metodo==true){metodo='creaBloqueoAvisa';}else{metodo='creaBloqueoOmitir';}      
      // Find de Funcion para cuando el Ajax Request responde correctamente                         
      var datos = '{"idCancha":"' + idCancha + '",';            
      datos += '"fechaInicio":"' + fechaInicio + '",';
      datos += '"comentario":"' + comentario + '",';
      datos += '"fechaFinal":"' + fechaFinal + '",';
      datos += '"horaInicial":"' + horaInicio + '",';
      datos += '"horaFinal":"' + horaFinal + '",';
      datos += '"dif":"' + dif + '",';
      datos += '"idUsuarioRegistro":"' + global_id_usuario + '",';
      datos += '"estadoReservacion":"' + 8 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:  metodo,
                   datos:    datos}  
          }); // Fin de la llamada Ajax      
},
//=========================================================================================================
 
 EliminarBloqueo: function (e,target) {
       var me = this;       
       var view = Ext.ComponentQuery.query('#dvBloqueoCanchas')[0]; 
       if (target.className != 'x-boton-bloqueo') {return;}
       var item = view.findItemByChild(target);
       var record = view.store.getAt(view.indexOf(item));
       
       // Funcion para cuando falla el Ajax Request
       var failureAjaxFn = function(response, request) {  
              var errMessage = 'Error en la petici�n' + request.url + ' '  
              + ' status ' + response.status + ''  
              + ' statusText ' + response.statusText + ''  
              + ' responseText ' + response.responseText + '';  
              alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
              Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
              Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
              }  // Fin Funcion para cuando falla el Ajax Request

       // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) { 
            var obj = Ext.JSON.decode(response.responseText,true);
            if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");                    
                    return;
                }
            view.store.removeAt(view.indexOf(item));
            new Ext.ux.Notification({
                iconCls: 'error',
                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                html:	 '<b>Bloqueo eliminado correctamente!</b>',
                autoDestroy: true,
                width: 300,
                hideDelay:  2000}).show(document); 
            me.seleccionoCanchaReserva(null,null);
           } // Fin de Funcion para cuando el Ajax Request responde correctamente        
     
       var idBloqueo     = record.data.id;      
       var idCancha = Ext.ComponentQuery.query('#cmbCanchas');
       idCancha=idCancha[0].getValue();       
       
       var datos = '{"idBloqueo":"'    + idBloqueo +                   
                  '","idCancha":"'  + idCancha +'"}'; 
       Ext.Ajax.request({  
             url: 'php/RouterDBAJugarFutbol.php',  
             method: 'POST',  
             success: successAjaxFn,  
             failure: failureAjaxFn, 
             timeout: 30000,  
             headers: {'cabecera': 'Operaciones de DB al Objeto InstalacionReservaciones.'},  
             params: {clasePhp: 'ReservaDB',
                      metodo:   'eliminarBloqueoCancha',
                      datos:    datos}  
       }) // Fin de la llamada Ajax
 },
//=========================================================================================================================
cerrarbloqueoCancha: function(button) {
     var win = Ext.ComponentQuery.query('#winBloqueoCancha');
     win[0].close();
},
//=========================================================================================================================
cerrarWinDesbloqueo: function(button) {
     var win = Ext.ComponentQuery.query('#winDesbloqueo');
     win[0].close();
},
//=========================================================================================================================  
// Cuando de abre la ventana Reservacion Pendiente
renderReservacionCancelar: function(button) {
    var winCancelarReservacion = Ext.create('AJugarFutbol.view.reserva.CancelarReservacion');
    
    var obj=winCancelarReservacion.query('#lblCRNombreUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['nombreUsuario']+'<b>');
    
    obj=winCancelarReservacion.query('#lblCRTelefonoUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['telefonoUsuario']+'<b>');

    obj=winCancelarReservacion.query('#btnMasInfoUsuario');
    obj[0]['idUsuario']=button['idUsuario'];    
    
    if(!(button['fotoUsuario']==null||button['fotoUsuario']=='null'||button['fotoUsuario']==''))
    {
        obj=winCancelarReservacion.query('#imgCRFotoUsuario');
        obj=obj[0];
        obj.setSrc('resources/fotosUsuarios/'+button['fotoUsuario']);        
    }    
    
    obj=winCancelarReservacion.query('#lblCRCorreoUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['correoUsuario']+'<b>');
    
    //Modifica fecha de solicitud de la reservacion
    obj=winCancelarReservacion.query('#lblCRFechaSolicitud');
    obj=obj[0];
    
    var fechaSolicitud=button['fechaSolicitud'];
    fechaSolicitud=fechaSolicitud.replace("-", "/" );
    fechaSolicitud=fechaSolicitud.replace("-", "/" );   
    fechaSolicitud=new Date(fechaSolicitud);
    
    var anno=fechaSolicitud.getFullYear();        
    var mes=fechaSolicitud.getMonth()+1;
    var dia=fechaSolicitud.getDate();
    var diaSemana=fechaSolicitud.getDay();
    
     if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
     
     if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
    
    obj.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');
    //FIN Modifica fecha de solicitud de la reservacion
    //===============================================================================================
    //Modifica fecha y hora de la reservacion      
      obj=winCancelarReservacion.query('#lblCRFechaExacta');
      obj=obj[0];
      var fechaReservacion=new Date(button['fecha']);
      var fechaYhora=button['fecha'];
      anno=fechaReservacion.getFullYear();        
      mes=fechaReservacion.getMonth()+1;
      diaSemana=fechaReservacion.getDay();
      //Cambia los meses
      if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
      //FIN  Cambia los meses
      //Cambia los dias                           
      if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
      //FIN Cambia los dias 
      dia=fechaReservacion.getDate();
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');

      obj=winCancelarReservacion.query('#lblCRHora');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
    //FIN Modifica fecha y hora de la reservacion
    //==================================================================================================================================
    
    obj=winCancelarReservacion.query('#txtCRComentarioReservacion');
    obj=obj[0];
    obj.setValue(button['comentarioReservacion']);    
    
    obj=winCancelarReservacion.query('#btnCRCancelarReservacion');
    obj[0]['idReservacion']=button['idReservacion'];
    obj[0]['correoUsuario']=button['correoUsuario'];
    obj[0]['estado']=button['estado'];
                
    winCancelarReservacion.show();     
}, // Fin Cuando de abre la ventana Reservacion Pendiente
//========================================================================================================================= 
// Cuando de abre la ventana Reservacion Pendiente
renderReservacionPendiente: function(button) {
    var winApruebaReservacion = Ext.create('AJugarFutbol.view.reserva.ApruebaReservacion');   
    
    var obj=winApruebaReservacion.query('#lblNombreUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['nombreUsuario']+'<b>');
    
    obj=winApruebaReservacion.query('#lblTelefonoUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['telefonoUsuario']+'<b>');
    
    obj=winApruebaReservacion.query('#btnMasInfoUsuario');
    obj=obj[0]['idUsuario']=button['idUsuario'];
    
    if(!(button['fotoUsuario']==null||button['fotoUsuario']=='null'||button['fotoUsuario']==''))
    {
        obj=winApruebaReservacion.query('#imgARFotoUsuario');
        obj=obj[0];
        obj.setSrc('resources/fotosUsuarios/'+button['fotoUsuario']);
    }    
    
    obj=winApruebaReservacion.query('#lblCorreoUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['correoUsuario']+'<b>');        
    
    //Modifica fecha de solicitud de la reservacion
    obj=winApruebaReservacion.query('#lblFechaSolicitud');
    obj=obj[0];
    
    var fechaSolicitud=button['fechaSolicitud'];
    fechaSolicitud=fechaSolicitud.replace("-", "/" );
    fechaSolicitud=fechaSolicitud.replace("-", "/" );   
    fechaSolicitud=new Date(fechaSolicitud);
    
    var anno=fechaSolicitud.getFullYear();        
    var mes=fechaSolicitud.getMonth()+1;
    var dia=fechaSolicitud.getDate();
    var diaSemana=fechaSolicitud.getDay();
    
     if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
     
     if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
    
    obj.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');
    //FIN Modifica fecha de solicitud de la reservacion
    //===============================================================================================
    //Modifica fecha y hora de la reservacion      
      obj=winApruebaReservacion.query('#lblFechaExacta');
      obj=obj[0];
      var fechaReservacion=new Date(button['fecha']);
      var fechaYhora=button['fecha'];
      anno=fechaReservacion.getFullYear();        
      mes=fechaReservacion.getMonth()+1;
      diaSemana=fechaReservacion.getDay();
      //Cambia los meses
      if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
      //FIN  Cambia los meses
      //Cambia los dias                           
      if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
      //FIN Cambia los dias 
      dia=fechaReservacion.getDate();
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');

      obj=winApruebaReservacion.query('#lblHora');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
    //FIN Modifica fecha y hora de la reservacion
    //==================================================================================================================================
    
    obj=winApruebaReservacion.query('#txtComentarioReservacion');
    obj=obj[0];
    obj.setValue(button['comentarioReservacion']);    
    
    obj=winApruebaReservacion.query('#btnAprobarReservacion');
    obj[0]['correoUsuario']=button['correoUsuario'];
    obj[0]['idReservacion']=button['idReservacion'];
    obj[0]['estado']=button['estado'];
        
    
    winApruebaReservacion.show();      
}, // Fin Cuando de abre la ventana Reservacion Pendiente
//========================================================================================================================= 
// Cuando de abre la ventana Reservacion Pendiente
renderReservacionListaEspera: function(button) {                        
    var winListaEspera = Ext.create('AJugarFutbol.view.reserva.ListaEspera');
     semaforoAjaxMask=false;
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
                    winListaEspera.close();
                    return;
                }
            var cantFilas=obj.respuesta[0].mensaje.CantFilas; 
            
            usuarioListaEspera.removeAll();
            var primerValor=obj.respuesta[1].results[0].id;                
            for(var i=0;i<cantFilas;i++)
            {
                usuarioListaEspera.add({id:obj.respuesta[1].results[i].id,infoBasic:obj.respuesta[1].results[i].infoBasic,comentario:obj.respuesta[1].results[i].ComentarioReservacion});
            }
            
            var objx = winListaEspera.query('#cmbLEListaEspera');
            objx=objx[0];             
            objx.setValue(primerValor); 
            
            var mensaje = winListaEspera.query('#lblLEInfo');
            mensaje=mensaje[0];            
            if(cantFilas>1){objx.expand();mensaje.setValue('Se encuentran <b>'+cantFilas+'</b> usuarios en la lista de espera.');}
            else{mensaje.setValue('<b>Solamente un usuario se encuentra en la lista de espera.</b>');objx.setReadOnly(true);}            
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente          
          
      var combo = Ext.ComponentQuery.query('#cmbCanchas');
      combo=combo[0]; 
      var horaParametro=button['id'];
      horaParametro=horaParametro.substring(1,3);        

      var fechaParametro=button['fecha'];
      var datos = '{"idCancha":"' + combo.getValue() + '",';          
      datos += '"fechayHora":"' + fechaParametro+' '+horaParametro+':00:00'+ '"}';      

      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',               
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto ReservaDB. Consulta los usuarios de la lista de espera.'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'getListaEspera',
                   datos:    datos}  
          }); // Fin de la llamada Ajax 
        
//=========================================================================================================================================
//=========================================================================================================================================           
    
    //Modifica fecha de solicitud de la reservacion
    obj=winListaEspera.query('#lblFechaSolicitud');
    obj=obj[0];
    
    var fechaSolicitud=button['fechaSolicitud'];
    fechaSolicitud=fechaSolicitud.replace("-", "/" );
    fechaSolicitud=fechaSolicitud.replace("-", "/" );   
    fechaSolicitud=new Date(fechaSolicitud);
    
    var anno=fechaSolicitud.getFullYear();        
    var mes=fechaSolicitud.getMonth()+1;
    var dia=fechaSolicitud.getDate();
    var diaSemana=fechaSolicitud.getDay();
    
     if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
     
     if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
    
    obj.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');
    //FIN Modifica fecha de solicitud de la reservacion
    //===============================================================================================
    //Modifica fecha y hora de la reservacion      
      obj=winListaEspera.query('#lblFechaExacta');
      obj=obj[0];
      var fechaReservacion=new Date(button['fecha']);
      var fechaYhora=button['fecha'];
      anno=fechaReservacion.getFullYear();        
      mes=fechaReservacion.getMonth()+1;
      diaSemana=fechaReservacion.getDay();
      //Cambia los meses
      if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
      //FIN  Cambia los meses
      //Cambia los dias                           
      if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
      //FIN Cambia los dias 
      dia=fechaReservacion.getDate();
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');

      obj=winListaEspera.query('#lblHora');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
    //FIN Modifica fecha y hora de la reservacion
    //==================================================================================================================================
    
    obj=winListaEspera.query('#txtComentarioReservacion');
    obj=obj[0];
    obj.setValue(button['comentarioReservacion']);    
    
    obj=winListaEspera.query('#btnLEListaEspera');
    obj[0]['fechayHora']=fechaYhora;    
    obj[0]['estado']=button['estado'];        
             
    winListaEspera.show();    
        
}, // Fin Cuando de abre la ventana Reservacion Pendiente
// ==========================================================================================================================================================================
// Cuando de abre la ventana Reservacion Pendiente
renderEspacioBloquedo: function(button) {                        

    var winDesbloqueo = Ext.create('AJugarFutbol.view.reserva.Desbloqueo');
     semaforoAjaxMask=false;
    //Modifica fecha de solicitud de la reservacion
    var obj=winDesbloqueo.query('#lblDesFechaSolicitud');
    obj=obj[0];
    
    var fechaSolicitud=button['fechaSolicitud'];
    fechaSolicitud=fechaSolicitud.replace("-", "/" );
    fechaSolicitud=fechaSolicitud.replace("-", "/" );   
    fechaSolicitud=new Date(fechaSolicitud);
    
    var anno=fechaSolicitud.getFullYear();        
    var mes=fechaSolicitud.getMonth()+1;
    var dia=fechaSolicitud.getDate();
    var diaSemana=fechaSolicitud.getDay();
    
     if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
     
     if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
    
    obj.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');
    //FIN Modifica fecha de solicitud de la reservacion
    //===============================================================================================
    //Modifica fecha y hora de la reservacion      
      obj=winDesbloqueo.query('#lblDesFecha');
      obj=obj[0];
      var fechaReservacion=new Date(button['fecha']);
      var fechaYhora=button['fecha'];
      anno=fechaReservacion.getFullYear();        
      mes=fechaReservacion.getMonth()+1;
      diaSemana=fechaReservacion.getDay();
      //Cambia los meses
      if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
      //FIN  Cambia los meses
      //Cambia los dias                           
      if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
      //FIN Cambia los dias 
      dia=fechaReservacion.getDate();
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');

      obj=winDesbloqueo.query('#lblDesHora');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
    //FIN Modifica fecha y hora de la reservacion
    //==================================================================================================================================
    
    obj=winDesbloqueo.query('#txtComentarioBloqueo');
    obj=obj[0];
    obj.setValue(button['comentarioReservacion']);    
    
    obj=winDesbloqueo.query('#btnDesbloquear');
    obj[0]['idReservacion']=button['idReservacion'];          
             
    winDesbloqueo.show();    
        
}, // Fin Cuando de abre la ventana Reservacion Pendiente
//========================================================================================================================= 
crearReservacion: function(button) {  
   
   var idInstalacion =Ext.ComponentQuery.query('#lblInstalacion');
   idInstalacion=idInstalacion[0]['idInst'];
      
   var winCrearReservacion = Ext.create('AJugarFutbol.view.reserva.CrearReservacion');
                        
    var obj=winCrearReservacion.query('#cmbRREquipos');
    obj=obj[0];
    obj.setVisible(false);

    obj=winCrearReservacion.query('#txtRRNombre');
    obj=obj[0];
    obj.setVisible(false);
    
    obj=Ext.ComponentQuery.query('#txtRRCedula');
    obj=obj[0];
    obj.setVisible(false);  

    obj=Ext.ComponentQuery.query('#txtRRTelefono2');
    obj=obj[0];
    obj.setVisible(false); 
    

    obj=winCrearReservacion.query('#txtRRTelefono');
    obj=obj[0];
    obj.setVisible(false);

    obj=winCrearReservacion.query('#txtRRCorreo');
    obj=obj[0];
    obj.setVisible(false);  

    obj=Ext.ComponentQuery.query('#RRgroup');
    obj=obj[0];
    obj.setVisible(false);  

    obj=Ext.ComponentQuery.query('#txtRRApellido');
    obj=obj[0];
    obj.setVisible(false);  

             
    var fechaYhora='';      
      
      obj=winCrearReservacion.query('#lblFechaSolicitud');
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

      obj=winCrearReservacion.query('#lblFechaExacta');
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
      obj.setValue('<b><font color=red>'+diaSemanal+', '+dia+' de '+mes+' del '+anno+'</font></b>');

      obj=winCrearReservacion.query('#lblHora');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');      

      obj=winCrearReservacion.query('#lblTarifaReservacion');
      obj=obj[0];
      if(button['tarifa']=='')
      {
          obj.setValue('No se encuentra registro');
      }else{obj.setValue('<b><font color=#FF0000>'+button['tarifa']+' colones</font></b>');} 
      
      
      obj=winCrearReservacion.query('#btnCreaReservacion');            
      obj=obj[0]['fechayHora']=fechaYhora;
      obj=obj[0]['estado']=button['estado'];
      obj=obj[0]['tarifa']=button['tariga'];
      
      
      obj=winCrearReservacion.query('#plnRRAdm');  
      obj=obj[0];
      obj.setHeight(76);

      semaforoAjaxMask=false;
      
      clientesUsuarios.removeAll(); 
      obj=winCrearReservacion.query('#cmbRRComboClienteFrecuente');
      obj=obj[0];
      obj.setRawValue('');
      obj.setValue(null);
      obj.focus();
              
      winCrearReservacion.setHeight(475);       
      winCrearReservacion.show();                  
winCrearReservacion.restore();      
},
//=================================================================================================================================================================
renderReto: function(button) {     
   var idInstalacion =Ext.ComponentQuery.query('#lblInstalacion');
   idInstalacion=idInstalacion[0]['idInst'];
      
   var winBuscaRetoAdm = Ext.create('AJugarFutbol.view.reserva.BuscaRetoAdm');
   
   var obj=winBuscaRetoAdm.query('#plnRRAdm');
   obj=obj[0];
   obj.setHeight(110);
   
   obj=winBuscaRetoAdm.query('#cmbRREquipos');  
   obj=obj[0];
   obj.setVisible(false);
   
   //Datos del Retador
   obj=winBuscaRetoAdm.query('#lblNombreUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['nombreUsuario']+'<b>');

    obj=winBuscaRetoAdm.query('#lblTelefonoUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['telefonoUsuario']+'<b>');
    
    obj=winBuscaRetoAdm.query('#btnMasInfoUsuario');
    obj[0]['idUsuario']=button['idUsuario'];  

    if(!(button['fotoUsuario']==null||button['fotoUsuario']=='null'||button['fotoUsuario']==''))
    {
        obj=winBuscaRetoAdm.query('#imgARFotoUsuario');
        obj=obj[0];
        obj.setSrc('resources/fotosUsuarios/'+button['fotoUsuario']);
    }    

    obj=winBuscaRetoAdm.query('#lblCorreoUsuario');
    obj=obj[0];
    obj.setValue('<b>'+button['correoUsuario']+'<b>');        

    //Modifica fecha de solicitud de la reservacion
   obj=winBuscaRetoAdm.query('#lblFechaSolicitud');
   obj=obj[0];
    
    var fechaSolicitud=button['fechaSolicitud'];
    fechaSolicitud=fechaSolicitud.replace("-", "/" );
    fechaSolicitud=fechaSolicitud.replace("-", "/" );   
    fechaSolicitud=new Date(fechaSolicitud);
    
    var anno=fechaSolicitud.getFullYear();        
    var mes=fechaSolicitud.getMonth()+1;
    var dia=fechaSolicitud.getDate();
    var diaSemana=fechaSolicitud.getDay();
    
     if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
     
     if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
    
    obj.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');
    //FIN Modifica fecha de solicitud de la reservacion
    //===============================================================================================
    //Modifica fecha y hora de la reservacion      
      obj=winBuscaRetoAdm.query('#lblFechaExacta');
      obj=obj[0];
      var fechaReservacion=new Date(button['fecha']);
      var fechaYhora=button['fecha'];
      anno=fechaReservacion.getFullYear();        
      mes=fechaReservacion.getMonth()+1;
      diaSemana=fechaReservacion.getDay();
      //Cambia los meses
      if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
      //FIN  Cambia los meses
      //Cambia los dias                           
      if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
      //FIN Cambia los dias 
      dia=fechaReservacion.getDate();
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');

      obj=winBuscaRetoAdm.query('#lblHora');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
    //FIN Modifica fecha y hora de la reservacion
    //==================================================================================================================================
   //Consulta a la base de datos clientes frecuentes
    semaforoAjaxMask=false;
      clientesUsuarios.removeAll(); 
      obj=winBuscaRetoAdm.query('#cmbRRComboClienteFrecuente');
      obj=obj[0];
      obj.setRawValue('');
      obj.setValue(null);
      obj.focus(); 
              
   obj=winBuscaRetoAdm.query('#txtComentarioReservacion');
   obj=obj[0];
   obj.setValue(button['comentarioReservacion']);    
      
   obj=winBuscaRetoAdm.query('#chkRREquipo');
   obj=obj[0];
   obj.setValue(false);
   obj.setDisabled(false);

   obj=winBuscaRetoAdm.query('#cmbRRComboClienteFrecuente');
   obj=obj[0];
   obj.setVisible(true);

   obj=winBuscaRetoAdm.query('#txtRRCedula');
   obj=obj[0];
   obj.setVisible(false);  

   obj=winBuscaRetoAdm.query('#txtRRTelefono2');
   obj=obj[0];
   obj.setVisible(false);  

   obj=winBuscaRetoAdm.query('#txtRRNombre');
   obj=obj[0];
   obj.setVisible(false);  

   obj=winBuscaRetoAdm.query('#txtRRTelefono');
   obj=obj[0];
   obj.setVisible(false);

   obj=winBuscaRetoAdm.query('#txtRRCorreo');
   obj=obj[0];
   obj.setVisible(false);

   obj=winBuscaRetoAdm.query('#RRgroup');
   obj=obj[0];
   obj.setVisible(false);  

   obj=winBuscaRetoAdm.query('#txtRRApellido');
   obj=obj[0];
   obj.setVisible(false); 
      
   obj=winBuscaRetoAdm.query('#btnAprobarReto');
   obj[0]['correoUsuario']=button['correoUsuario'];
   obj[0]['idReservacion']=button['idReservacion'];
   obj[0]['fechayHora']=fechaYhora;
   winBuscaRetoAdm.setHeight(580);
   winBuscaRetoAdm.show();      
},
//=================================================================================================================================================================
renderRetoAprobado: function(button) {     
   /*var idInstalacion =Ext.ComponentQuery.query('#lblInstalacion');
   idInstalacion=idInstalacion[0]['idInst'];*/
   var winApruebaRetoAdm = Ext.create('AJugarFutbol.view.reserva.ApruebaRetoAdm');
   
   //Datos del Retador
   var obj=winApruebaRetoAdm.query('#lblNombreUsuario1');
   obj=obj[0];
   obj.setValue('<b>'+button['nombreUsuario']+'<b>');
   
   obj=winApruebaRetoAdm.query('#btnCancelarReto1');
   obj=obj[0];
   obj.setText('<b>Cancelar a '+button['nombreUsuario']+'<b>');
   
    obj=winApruebaRetoAdm.query('#lblTelefonoUsuario1');
    obj=obj[0];
    obj.setValue('<b>'+button['telefonoUsuario']+'<b>');
    
    obj=winApruebaRetoAdm.query('#btnMasInfoUsuario1');
    obj[0]['idUsuario']=button['idUsuario'];    

    if(!(button['fotoUsuario']==null||button['fotoUsuario']=='null'||button['fotoUsuario']==''))
    {
        obj=winApruebaRetoAdm.query('#imgRTFotoUsuario1');
        obj=obj[0];
        obj.setSrc('resources/fotosUsuarios/'+button['fotoUsuario']);
    }    

    obj=winApruebaRetoAdm.query('#lblCorreoUsuario1');
    obj=obj[0];
    obj.setValue('<b>'+button['correoUsuario']+'<b>');        

    //Modifica fecha de solicitud de la reservacion
   obj=winApruebaRetoAdm.query('#lblFechaSolicitud1');
   obj=obj[0];
    
    var fechaSolicitud=button['fechaSolicitud'];
    fechaSolicitud=fechaSolicitud.replace("-", "/" );
    fechaSolicitud=fechaSolicitud.replace("-", "/" );   
    fechaSolicitud=new Date(fechaSolicitud);
    
    var anno=fechaSolicitud.getFullYear();        
    var mes=fechaSolicitud.getMonth()+1;
    var dia=fechaSolicitud.getDate();
    var diaSemana=fechaSolicitud.getDay();
    
     if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
     
     if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
    
    obj.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');
    //FIN Modifica fecha de solicitud de la reservacion
    //===============================================================================================
    //Modifica fecha y hora de la reservacion      
      obj=winApruebaRetoAdm.query('#lblFechaExacta1');
      obj=obj[0];
      var fechaReservacion=new Date(button['fecha']);
      var fechaYhora=button['fecha'];
      anno=fechaReservacion.getFullYear();        
      mes=fechaReservacion.getMonth()+1;
      diaSemana=fechaReservacion.getDay();
      //Cambia los meses
      if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
      }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
      {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}
      //FIN  Cambia los meses
      //Cambia los dias                           
      if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
      {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
      diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}
      //FIN Cambia los dias 
      dia=fechaReservacion.getDate();
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');
      obj=winApruebaRetoAdm.query('#lblFechaExacta2');
      obj=obj[0];
      obj.setValue('<b><font color=red>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'</font></b>');
      

      obj=winApruebaRetoAdm.query('#lblHora1');
      obj=obj[0];
      var horaReservacion=button['id'];
      var ampmReservacion='de la ma&ntilde;ana';
      horaReservacion=horaReservacion.substring(1,3);  
      fechaYhora+=' '+horaReservacion+':00:00';

      if(horaReservacion>12){ampmReservacion='de la tarde';if(horaReservacion==13){horaReservacion='01';}else{if(horaReservacion==14){horaReservacion='02';}else{
        if(horaReservacion==15){horaReservacion='03';}else{if(horaReservacion==16){horaReservacion='04';}else{if(horaReservacion==17)
        {horaReservacion='05';}else{if(horaReservacion==18){horaReservacion='06';}else{if(horaReservacion==19){horaReservacion='07';ampmReservacion='de la noche';}else
        {if(horaReservacion==20){horaReservacion='08';ampmReservacion='de la noche';}else{if(horaReservacion==21){horaReservacion='09';ampmReservacion='de la noche';}else{horaReservacion=10;ampmReservacion='de la noche';}}}}}}}}}}
        if(horaReservacion==12){ampmReservacion='de la tarde';}                
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
      obj=winApruebaRetoAdm.query('#lblHora2');
      obj=obj[0];
      obj.setValue('<b><font color=red>'+horaReservacion+':00 '+ampmReservacion+'</font></b>');
    //FIN Modifica fecha y hora de la reservacion
    //================================================================================================================================== 
    //Consulta los datos del usuario que acepto el reto        
     semaforoAjaxMask=false;
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
                    winApruebaRetoAdm.close();
                    return;
                }
                var cantFilas=obj.respuesta[0].mensaje.CantFilas;                 
                if(cantFilas>0)
                {                                
                   var objx=winApruebaRetoAdm.query('#lblNombreUsuario2');
                   objx=objx[0];                   
                   objx.setValue('<b>'+obj.respuesta[1].results[0].Nombre+' '+obj.respuesta[1].results[0].Apellidos+'<b>');                      
                   
                   objx=winApruebaRetoAdm.query('#btnCancelarReto2');
                   objx=objx[0];
                   objx.setText('<b>Cancelar a '+obj.respuesta[1].results[0].Nombre+' '+obj.respuesta[1].results[0].Apellidos+'<b>');
                   
                   objx=winApruebaRetoAdm.query('#btnMasInfoUsuario2');
                   objx[0]['idUsuario']=obj.respuesta[1].results[0].IdPersona; 
                   
                   objx=winApruebaRetoAdm.query('#lblTelefonoUsuario2');
                   objx=objx[0];
                   objx.setValue('<b>'+obj.respuesta[1].results[0].TelCelular+'<b>');

                   if(!(obj.respuesta[1].results[0].FotoFile==null||obj.respuesta[1].results[0].FotoFile=='null'||obj.respuesta[1].results[0].FotoFile==''))
                   {
                       objx=winApruebaRetoAdm.query('#imgRTFotoUsuario2');
                       objx=objx[0];
                       objx.setSrc('resources/fotosUsuarios/'+obj.respuesta[1].results[0].FotoFile);
                   }    

                   objx=winApruebaRetoAdm.query('#lblCorreoUsuario2');
                   objx=objx[0];
                   objx.setValue('<b>'+obj.respuesta[1].results[0].Email+'<b>');        
                   
                   var botonRetador2 = winApruebaRetoAdm.query('#btnCancelarReto2');
                   botonRetador2=botonRetador2[0];
                   botonRetador2['correoUsuario']=obj.respuesta[1].results[0].Email;
                   botonRetador2['idReservacion']=obj.respuesta[1].results[0].id;
                   
                   objx=winApruebaRetoAdm.query('#lblFechaSolicitud2');
                   objx=objx[0]; 
                   //Cambiar formato de fecha de solititud
                   fechaSolicitud=obj.respuesta[1].results[0].FechaSolicitud;
                   fechaSolicitud=fechaSolicitud.replace("-", "/" );
                   fechaSolicitud=fechaSolicitud.replace("-", "/" );   
                   fechaSolicitud=new Date(fechaSolicitud);

                   var anno=fechaSolicitud.getFullYear();        
                   var mes=fechaSolicitud.getMonth()+1;
                   var dia=fechaSolicitud.getDate();
                   var diaSemana=fechaSolicitud.getDay();

                    if(diaSemana==1){diaSemana='Lunes';}else{if(diaSemana==2){diaSemana='Martes';}else{if(diaSemana==3)
                     {diaSemana='Mi&eacute;rcoles';}else{if(diaSemana==4){diaSemana='Jueves';}else{if(diaSemana==5){
                     diaSemana='Viernes';}else{if(diaSemana==6){diaSemana='S&aacute;bado';}else{diaSemana='Domingo';}}}}}}

                    if(mes==1){mes='enero';}else{if(mes==2){mes='febrero';}else{if(mes==3){mes='marzo';}else{if(mes==4){mes='abril';}else{if(mes==5){mes='mayo';
                     }else{if(mes==6){mes='junio';}else{if(mes==7){mes='julio';}else{if(mes==8){mes='agosto';}else{if(mes==9){mes='setiembre';}else{if(mes==10)
                     {mes='octubre';}else{if(mes==11){mes='noviembre';}else{mes='diciembre';}}}}}}}}}}}

                   objx.setValue('<b>'+diaSemana+', '+dia+' de '+mes+' del '+anno+'<b>');                   
                    //================================================================================================================
                    //Modifica fecha de solicitud de la reservacion
                   objx=winApruebaRetoAdm.query('#txtComentarioReservacion2');
                   objx=objx[0];   
                   objx.setValue(obj.respuesta[1].results[0].ComentarioReservacion); 
                   obj=winApruebaRetoAdm.query('#txtComentarioReservacion1');
                   obj=obj[0];
                   obj.setValue(button['comentarioReservacion']);   

                   obj=winApruebaRetoAdm.query('#btnConfirmaReto');
                   obj=obj[0];   

                   if(button['estado']=='RSC'){winApruebaRetoAdm.setHeight(435);obj.setVisible(true);}else{winApruebaRetoAdm.setHeight(404);obj.setVisible(false);}

                   var botonRetador1 = winApruebaRetoAdm.query('#btnCancelarReto1');
                   botonRetador1=botonRetador1[0];
                   botonRetador1['correoUsuario']=button['correoUsuario'];
                   botonRetador1['idReservacion']=button['idReservacion'];
                   winApruebaRetoAdm.show();
                } 
                else
                {                              
                    Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'Hubo un error desconocido. Pongase en contacto con el administrador del sitio',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                  return;                          
                }

           } // Find de Funcion para cuando el Ajax Request responde correctamente         
              var idCancha = Ext.ComponentQuery.query('#cmbCanchas');
              idCancha=idCancha[0];
              
              var datos = '{"idCancha":"' + idCancha.getValue() + '",';                          
              datos += '"fechaYhora":"' + fechaYhora + '"}';              
              Ext.Ajax.request({  
                  url: 'php/RouterDBAJugarFutbol.php',  
                  method: 'POST',               
                  success: successAjaxFn,  
                  failure: failureAjaxFn, 
                  timeout: 30000,  
                  headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta los clientes frecuentes por instalacion'},  
                  params: {clasePhp: 'ReservaDB',
                           metodo:   'getUsuarioAceptoReto',
                           datos:    datos}  
                  }); // Fin de la llamada Ajax                                 
},
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Campeonatos
    realizaReservacion: function(button) {           
          var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().mask();  
          if(global_id_usuario==''||global_id_usuario==null)
          {                
                Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'Acceso Restringido. P&oacute;ngase en contacto con el administrador del sitio',
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
                     msg: 'Bloquedo. El campo esta fuera del rango de horario de la cancha seleccionada.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});
                     panelPapa = Ext.ComponentQuery.query('#viewport');
                     panelPapa = panelPapa[0];
                     panelPapa.getEl().unmask();
                     semaforoAjaxMask=true;
                  return; 
              }              
              else
              {
                  if(button['estado']=='O')
                  {
                       this.renderReservacionCancelar(button);
                  }
                  else
                  {
                      if(button['estado']=='D')
                      {
                          this.crearReservacion(button);
                      }
                      else
                      {
                          if(button['estado']=='A'||button['estado']=='C')
                          {
                              this.renderReservacionPendiente(button);                          
                          }
                          else
                          {
                              if(button['estado']=='L')
                              {
                                this.renderReservacionListaEspera(button);                                
                              }
                              else
                              {
                                  if(button['estado']=='RP'||button['estado']=='RSC')
                                  {
                                      this.renderRetoAprobado(button);
                                  }
                                  else
                                  {
                                      if(button['estado']=='BU')
                                      {
                                         this.renderEspacioBloquedo(button);
                                      }
                                      else{
                                        this.renderReto(button);
                                      }
                                  }
                              }
                          }
                      }
                  }
              }
          }          
    }, // Fin de Selecciono en la pantalla instalacion el boton Campeonatos
//=========================================================================================================================  
  // Selecciono en la pantalla instalacion el boton Reservar
    renderControlCancha: function() {  
        
        var panelPapa = Ext.ComponentQuery.query('#viewport');
          panelPapa = panelPapa[0];
          panelPapa.getEl().mask();  
         var instalacion =Ext.ComponentQuery.query('#btnAdministracion');          
         
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
                    var panel_central = Ext.ComponentQuery.query('#panel_central');
                        panel_central = panel_central[0];                               
                        panel_central.removeAll(); 
                    return;
                }
            var cantFilas=obj.respuesta[0].mensaje.CantFilas; 
            if(cantFilas>0)
            {                                
                canchasInstalacion.removeAll();
                var primerValor=obj.respuesta[1].results[0].id
                for(var i=0;i<cantFilas;i++)
                {
                    canchasInstalacion.add({id:obj.respuesta[1].results[i].id,nombre:obj.respuesta[1].results[i].NombreCancha});
                }               
                var winCalenReservaAdm =Ext.ComponentQuery.query('winCalenReservaAdm');                  

                var objx = winCalenReservaAdm[0].query('#lblInstalacion');                
                objx[0]['idInst']=instalacion[0]['idInstalacion'];
                objx[0]['direccion']=instalacion[0]['direccion'];
                objx[0]['telefono']=instalacion[0]['telefono'];
                objx[0]['modoReservacion']=instalacion[0]['modoReservacion'];
                objx[0]['correo']=instalacion[0]['correo'];                
                
                objx = winCalenReservaAdm[0].query('#cmbCanchas');
                objx=objx[0];               
                objx.setValue(primerValor);                                                                                  
            } 
            else
               {
                   Ext.MessageBox.show({
                         title: 'Mensaje',
                         msg: 'No se encontraron canchas disponibles',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.INFO});
                     
                        var panel_central2 = Ext.ComponentQuery.query('#panel_central');
                        panel_central2 = panel_central2[0];                               
                        panel_central2.removeAll();                                  
                      return; 
               }
           
       } // Find de Funcion para cuando el Ajax Request responde correctamente          
          var datos = '{"idInstalacion":"' + instalacion[0]['idInstalacion'] + '"}';              
          Ext.Ajax.request({  
              url: 'php/RouterDBAJugarFutbol.php',  
              method: 'POST',               
              success: successAjaxFn,  
              failure: failureAjaxFn, 
              timeout: 30000,  
              headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta las canchas de la instalacion'},  
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
              alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
                      Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
                      Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
              }  // Fin Funcion para cuando falla el Ajax Request
        var nombreInstalacion=Ext.ComponentQuery.query('#cmbCanchas');   
        nombreInstalacion=nombreInstalacion[0].getRawValue();
       
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
        muestrafechas.setValue('<p style="font-size:15px;">Est&aacute;s viendo de: <b>'+fecha1+'</b> al <b>'+fecha2+'. <font color=red>'+nombreInstalacion+'</font></b></p>');        
        
        var dp=0;
        if(controlFechaBoton[0]['contador']==0&&controlFechaBoton[0]['entraHoy']==true)
        //if(new Date()==new Date(controlFechaBoton[0]['controlFecha']))
        {
            var diaSem =Ext.ComponentQuery.query('#lbl'+0);
            diaSem=diaSem[0];
            diaSem.setValue('<b>HOY</b>');
            diaSem =Ext.ComponentQuery.query('#lbl'+1);
            diaSem=diaSem[0];
            diaSem.setValue('<b>Ma&ntilde;ana</b>');
            
            muestrafechas.setValue('<p style="font-size:15px;">Est&aacute;s viendo de: <b>HOY a este '+fecha2+'. <font color=red>'+nombreInstalacion+'</font></b></p>'); 
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

            var obj = Ext.JSON.decode(response.responseText,true);
            if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    var panel_central2 = Ext.ComponentQuery.query('#panel_central');
                        panel_central2 = panel_central2[0];                               
                        panel_central2.removeAll();       
                    return;
                }
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
                    boton[0]['idUsuario']='',
                    boton[0]['nombreUsuario']='',
                    boton[0]['fotoUsuario']='',
                    boton[0]['correoUsuario']='',
                    boton[0]['telefonoUsuario']='',
                    boton[0]['idReservacion']='',
                    boton[0]['fechaSolicitud']='',
                    boton[0]['comentarioReservacion']='',
                    boton[0]['tarifa']='';
                    
                    estadoBoton='B';
                    boton[0]['estado']=estadoBoton;
                    boton=boton[0];
                    boton.setTooltip('<p><font size="4">Bloqueado</font></p>');
                    boton.setText('');
                }                
            }  
            //
            var calenInfo =Ext.ComponentQuery.query('#lblCalenInfo');
            calenInfo=calenInfo[0];              
            var contadorBuscaReto=0;
            var contadorSinConfirmar=0;
            var contadorDisponibles=0;
            var contadorOcupadas=0; 
            var contadorRetos=0;
            var contadorEspaciosReservados=0;
            // 
            for(var i=HoraInicio+1;i<=HoraFinal;i++)            
            {                   
                if(i<=9){HoraBoton='0'+i}else{HoraBoton=i}                
                horaTooltip=HoraBoton;
                if(horaTooltip>12){if(horaTooltip==13){horaTooltip=1;}else{if(horaTooltip==14){horaTooltip=2;}else{
                if(horaTooltip==15){horaTooltip=3;}else{if(horaTooltip==16){horaTooltip=4;}else{if(horaTooltip==17)
                {horaTooltip=5;}else{if(horaTooltip==18){horaTooltip=6;}else{if(horaTooltip==19){horaTooltip=7;}else
                {if(horaTooltip==20){horaTooltip=8;}else{if(horaTooltip==21){horaTooltip=9;}else{horaTooltip=10;}}}}}}}}}}
                                
                if(HoraBoton>=12){ampmTooltip='p.m';}
                colorEstado='#D7DF01';
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
                    boton[0].setText('');
                    if(cantFilasTarifas>0)
                    {
                        for(var t=0;t<cantFilasTarifas;t++)
                        {    
                            var quitaCero='';                            
                            if(0==parseInt(HoraBoton)){quitaCero=HoraBoton.substring(1,2);}else{quitaCero=HoraBoton;}                
                            //alert(HoraBoton+' hora de la BD: '+parseInt(obj.respuesta[1].results[1][t].HoraInicio));
                            if(parseInt(quitaCero)>=parseInt(obj.respuesta[1].results[1][t].HoraInicio)&&parseInt(quitaCero)<=parseInt(obj.respuesta[1].results[1][t].HoraFinal)&&parseInt(diaTarifa)==parseInt(obj.respuesta[1].results[1][t].DiaSemana))
                            {                                                                
                                tarifaCanchaToolTip='<p><font size="4">Tarifa: '+obj.respuesta[1].results[1][t].Tarifa+' colones</font></p>';
                                boton[0]['tarifa']=obj.respuesta[1].results[1][t].Tarifa;
                                
                                boton[0].setTooltip('<b><font size="4">Disponible</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>'+tarifaCanchaToolTip);                    
                                colorBoton.setStyle("background","#04B404");
                                estadoBoton='D';
                                contadorDisponibles++;
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
                            if(horaReservacion<10){horaReservacion='0'+''+horaReservacion;}
                            
                            if(diaSemanaEstado<=diaReservacion){calculaDia=diaReservacion-diaSemanaEstado;}
                            else{calculaDia=1+((6-diaSemanaEstado)+diaReservacion);}
                            
                            if(estadoReserva==1){colorEstado='#FE9A2E';contadorDisponibles--;contadorEspaciosReservados++;
                            mensaje='<b><font size="4">Lista de Espera</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='L';}                                                        
                        
                            if(estadoReserva==2){colorEstado='#CC2EFA';contadorDisponibles--;contadorEspaciosReservados++;
                            mensaje='<b><font size="4">Sin Aprobar</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='A';
                            mensaje+='<p><font size="4">De: '+obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos+'</font></p>';
                            mensaje+='<p><font size="4">Tel: '+obj.respuesta[1].results[0][j].TelCelular+'</font></p>';}
                        
                            if(estadoReserva==3){colorEstado='#CC2EFA';contadorSinConfirmar++;contadorDisponibles--;contadorEspaciosReservados++;
                            mensaje='<b><font size="4">Sin Confirmar</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='C';
                            mensaje+='<p><font size="4">De: '+obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos+'</font></p>';
                            mensaje+='<p><font size="4">Tel: '+obj.respuesta[1].results[0][j].TelCelular+'</font></p>';}
                            
                            if(estadoReserva==4){colorEstado='#FF0000';contadorOcupadas++;contadorDisponibles--;contadorEspaciosReservados++;
                            mensaje='<b><font size="4">Confirmado</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='O';
                            mensaje+='<p><font size="4">De: '+obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos+'</font></p>';
                            mensaje+='<p><font size="4">Tel: '+obj.respuesta[1].results[0][j].TelCelular+'</font></p>';}
                            
                            if(estadoReserva==6){colorEstado='#58D3F7';contadorBuscaReto++;contadorDisponibles--;contadorEspaciosReservados++;
                            mensaje='<b><font size="4">'+obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos+' busca reto</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='R';}
                            
                            if(estadoReserva==7){colorEstado='#0404B4';contadorRetos++;contadorBuscaReto--;
                            mensaje='<b><font size="4">Reto Confirmado</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='RP';}
                            
                            if(estadoReserva==8){colorEstado='#D7DF01';contadorDisponibles--;
                            mensaje='<b><font size="4">Bloqueado</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p><font size="4"><p>Motivo: '+obj.respuesta[1].results[0][j].ComentarioReservacion+'</font></p>';estadoBoton='BU';}                       
                            
                            if(estadoReserva==10){colorEstado='#CC2EFA';contadorSinConfirmar++;contadorBuscaReto--;
                            mensaje='<b><font size="4">Reto Sin Confirmar</font></b><p><font size="4">Fecha: '+dia+'/'+mes+'/'+anno+'</font></p><p><font size="4">Hora: '+horaTooltip+':00 '+ampmTooltip+'</font></p>';estadoBoton='RSC';}                       
                            
                            boton = Ext.get(calculaDia+''+horaReservacion);
                            boton.setStyle("background",colorEstado);
                            boton.setStyle("background",colorEstado);

                            boton=Ext.ComponentQuery.query('#'+calculaDia+''+horaReservacion);                            
                            if(estadoReserva==10)
                            {
                                boton[0].setText('<font color=white size="2">Reto</font>');
                            }else
                            {
                                if(obj.respuesta[1].results[0][j].IdRol==null)
                                {
                                    boton[0].setText('');                                    
                                }
                                else{
                                    boton[0].setText('<font color=white size="2">Rol</font>');
                                }
                            }
                            boton[0]['estado']=estadoBoton;
                                if(estadoReserva!=7&&estadoReserva!=10){
                                    boton[0]['idUsuario']=obj.respuesta[1].results[0][j].idUsuario;
                                    boton[0]['nombreUsuario']=obj.respuesta[1].results[0][j].Nombre+' '+obj.respuesta[1].results[0][j].Apellidos;
                                    boton[0]['fotoUsuario']=obj.respuesta[1].results[0][j].FotoFile;
                                    boton[0]['correoUsuario']=obj.respuesta[1].results[0][j].Email;
                                    boton[0]['telefonoUsuario']=obj.respuesta[1].results[0][j].TelCelular;
                                    boton[0]['idReservacion']=obj.respuesta[1].results[0][j].id;                            
                                    boton[0]['fechaSolicitud']=obj.respuesta[1].results[0][j].FechaSolicitud;
                                    boton[0]['comentarioReservacion']=obj.respuesta[1].results[0][j].ComentarioReservacion;                                    
                                }
                            boton=boton[0];
                            boton.setTooltip(mensaje);
                         }
                     }
                }                
           }
                      
           var mustraContadores='<span style="font-size:15px;">-Se encuentran: Disponibles: <b>'+contadorDisponibles+'</b></span>';
           mustraContadores=mustraContadores+'<p><span style="font-size:15px;margin-left:109px;">Reservado: <b>'+contadorEspaciosReservados+'</b> (Busca Reto: <b>'+contadorBuscaReto+'</b>, Retos: <b>'+contadorRetos+'</b>, Sin Confirmar: <b>'+contadorSinConfirmar+'</b> y Ocupadas: <b>'+contadorOcupadas+'</b>)</span></p>'
           calenInfo.setValue(mustraContadores);
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
                       metodo:   'getCanchaAdm',
                       datos:    datos}  
              }); // Fin de la llamada Ajax
           //this.sincronizaCalendarioAdm();
              
    },// Fin de Selecciono en la pantalla instalacion el boton Reserva    
//=========================================================================================================================  
//Radios botones de la ventana Crear Reservacion
    radioUsuarioCreaReservAdm: function(check) {         
      var obj;      
      if(check['value']==true){                
                            
              obj=Ext.ComponentQuery.query('#chkRREquipo');
              obj=obj[0];
              obj.setValue(false);
              obj.setDisabled(false);
              
              obj=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
              obj=obj[0];
              obj.setVisible(true);
              clientesUsuarios.removeAll(); 
              obj.setRawValue('');
              obj.setValue(null);
              obj.focus();

              obj=Ext.ComponentQuery.query('#txtRRCedula');
              obj=obj[0];
              obj.setVisible(false);  
              
              obj=Ext.ComponentQuery.query('#txtRRTelefono2');
              obj=obj[0];
              obj.setVisible(false);  
              
              obj=Ext.ComponentQuery.query('#txtRRNombre');
              obj=obj[0];
              obj.setVisible(false);  

              obj=Ext.ComponentQuery.query('#txtRRTelefono');
              obj=obj[0];
              obj.setVisible(false);

              obj=Ext.ComponentQuery.query('#txtRRCorreo');
              obj=obj[0];
              obj.setVisible(false);

              obj=Ext.ComponentQuery.query('#RRgroup');
              obj=obj[0];
              obj.setVisible(false);  

              obj=Ext.ComponentQuery.query('#txtRRApellido');
              obj=obj[0];
              obj.setVisible(false); 

              obj=Ext.ComponentQuery.query('#plnRRAdm');
              obj=obj[0];
              obj.setHeight(76);

              obj=Ext.ComponentQuery.query('#winCrearReservacion');
              obj=obj[0];
              obj.setHeight(475);

              obj=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
              obj=obj[0];
              obj.focus();  
       }
    }, // Fin Cierra Ventana de confirmar reservacion
//==========================================================================================================================
    enterClienteUsuarioCombo: function(a,e,y) {    
            
      if(e.keyCode==13){  
          var combo=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente')[0];
          var like=combo.getRawValue();          
          if (like.length<4) {
             Ext.MessageBox.show({
                 title: 'Error',
                 msg: 'Debe digitar al menos 4 caracteres',
                 buttons: Ext.MessageBox.OK,
                 icon: Ext.MessageBox.ERROR});                                                                         
             combo.setValue(null);
              return;
          }
          
          var usuario=Ext.ComponentQuery.query('#rdbTodosUsuarios')[0].getValue();
          var metodo='getClientesFrecuentes';
          if(usuario==true){metodo='getUsuariosPublicos';}
          
          var idInstalacion =Ext.ComponentQuery.query('#lblInstalacion');
          idInstalacion=idInstalacion[0]['idInst'];

          var obj;       

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

                    var combo=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
                    combo=combo[0];

                    var obj = Ext.JSON.decode(response.responseText,true);
                    if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");                        
                        return;
                    }
                    var cantFilas=obj.respuesta[0].mensaje.CantFilas; 
                    if(cantFilas>0)
                    {                                
                        clientesUsuarios.removeAll();                
                        for(var i=0;i<cantFilas;i++)
                        {
                            clientesUsuarios.add({id:obj.respuesta[1].results[i].id,infoBasic:obj.respuesta[1].results[i].infoBasic});
                        }                                                
                    }                     
               } // Find de Funcion para cuando el Ajax Request responde correctamente                      

                  var datos = '{"idInstalacion":"' + idInstalacion + '",';
                  datos += '"like":"' + like + '"}';              
                  Ext.Ajax.request({  
                      url: 'php/RouterDBAJugarFutbol.php',  
                      method: 'POST',               
                      success: successAjaxFn,  
                      failure: failureAjaxFn, 
                      timeout: 30000,  
                      headers: {'cabecera': 'Operaciones de DB al Objeto Instalacion. Consulta los clientes frecuentes por instalacion'},  
                      params: {clasePhp: 'ReservaDB',
                               metodo:   metodo,
                               datos:    datos}  
                      }); // Fin de la llamada Ajax  
      }
    }, // Fin Cierra Ventana de confirmar reservacion
 //==============================================================================================================================
   radiosRegistrarCreaReservAdm: function(check) {         
       var obj;            
        if(check['value']==true)
        {          
              obj=Ext.ComponentQuery.query('#chkRREquipo');
              obj=obj[0];
              obj.setValue(false);
              obj.setDisabled(true);

              obj=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
              obj=obj[0];
              obj.setVisible(false);
              
              obj=Ext.ComponentQuery.query('#txtRRCedula');
              obj=obj[0];
              obj.setVisible(true); 
              obj.reset();
              
              obj=Ext.ComponentQuery.query('#txtRRTelefono2');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();
              
              obj=Ext.ComponentQuery.query('#txtRRNombre');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();

              obj=Ext.ComponentQuery.query('#txtRRTelefono');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();

              obj=Ext.ComponentQuery.query('#txtRRCorreo');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();
              obj.setValue('');

              obj=Ext.ComponentQuery.query('#RRgroup');
              obj=obj[0];
              obj.setVisible(true);  

              obj=Ext.ComponentQuery.query('#txtRRApellido');
              obj=obj[0];
              obj.setVisible(true); 
              obj.reset();

              obj=Ext.ComponentQuery.query('#plnRRAdm');
              obj=obj[0];
              obj.setHeight(245);                                            

              obj=Ext.ComponentQuery.query('#winCrearReservacion');
              obj=obj[0];
              obj.setHeight(640);

              obj=Ext.ComponentQuery.query('#txtRRCedula');
              obj=obj[0];
              obj.focus();            
        }
    }, // Fin Cierra Ventana de confirmar reservacion
 //=========================================================================================================================  
//Radios botones de la ventana Crear Reservacion
    radiosUsuariowinBuscaRetoAdm: function(check) {         
      var obj;      
       if(check['value']==true){                
       //Desabilita componentes
              obj=Ext.ComponentQuery.query('#chkRREquipo');
              obj=obj[0];
              obj.setValue(false);
              obj.setDisabled(false);
              
              obj=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
              obj=obj[0];
              obj.setVisible(true);
              clientesUsuarios.removeAll(); 
              obj.setRawValue('');
              obj.setValue(null);
              obj.focus();

              obj=Ext.ComponentQuery.query('#txtRRCedula');
              obj=obj[0];
              obj.setVisible(false);  
              
              obj=Ext.ComponentQuery.query('#txtRRTelefono2');
              obj=obj[0];
              obj.setVisible(false);  
              
              obj=Ext.ComponentQuery.query('#txtRRNombre');
              obj=obj[0];
              obj.setVisible(false);  

              obj=Ext.ComponentQuery.query('#txtRRTelefono');
              obj=obj[0];
              obj.setVisible(false);

              obj=Ext.ComponentQuery.query('#txtRRCorreo');
              obj=obj[0];
              obj.setVisible(false);

              obj=Ext.ComponentQuery.query('#RRgroup');
              obj=obj[0];
              obj.setVisible(false);  

              obj=Ext.ComponentQuery.query('#txtRRApellido');
              obj=obj[0];
              obj.setVisible(false); 

              obj=Ext.ComponentQuery.query('#plnRRAdm');
              obj=obj[0];
              obj.setHeight(110);

              obj=Ext.ComponentQuery.query('#winBuscaRetoAdm');
              obj=obj[0];
              obj.setHeight(580);

              obj=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
              obj=obj[0];
              obj.focus();  
       }
    }, // Fin Cierra Ventana de confirmar reservacion
 //==============================================================================================================================
   radiosRegistrarwinBuscaRetoAdm: function(check) {         
       var obj;            
        if(check['value']==true)
        {          
              obj=Ext.ComponentQuery.query('#chkRREquipo');
              obj=obj[0];
              obj.setValue(false);
              obj.setDisabled(true);

              obj=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
              obj=obj[0];
              obj.setVisible(false);
              
              obj=Ext.ComponentQuery.query('#txtRRCedula');
              obj=obj[0];
              obj.setVisible(true); 
              obj.reset();
              
              obj=Ext.ComponentQuery.query('#txtRRTelefono2');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();
              
              obj=Ext.ComponentQuery.query('#txtRRNombre');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();

              obj=Ext.ComponentQuery.query('#txtRRTelefono');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();

              obj=Ext.ComponentQuery.query('#txtRRCorreo');
              obj=obj[0];
              obj.setVisible(true);
              obj.reset();
              obj.setValue('');

              obj=Ext.ComponentQuery.query('#RRgroup');
              obj=obj[0];
              obj.setVisible(true);  

              obj=Ext.ComponentQuery.query('#txtRRApellido');
              obj=obj[0];
              obj.setVisible(true); 
              obj.reset();

              obj=Ext.ComponentQuery.query('#plnRRAdm');
              obj=obj[0];
              obj.setHeight(280);                                            

              obj=Ext.ComponentQuery.query('#winBuscaRetoAdm');
              obj=obj[0];
              obj.setHeight(755);

              obj=Ext.ComponentQuery.query('#txtRRCedula');
              obj=obj[0];
              obj.focus();            
        }
    }, // Fin Cierra Ventana de confirmar reservacion    
//=========================================================================================================================  
 // Cuando da check en ventana de crear Reservacion y en la ventana busca reto adm
    cambioCheEquipos: function(combobox, record) {
         var obj=Ext.ComponentQuery.query('#cmbRREquipos');
         obj=obj[0];
         
         if(combobox['value']==true)
          {
              obj.setVisible(true);
              obj.focus();
          }
          else
          {
              obj.setVisible(false); 
          }
    },// Cuando da check en ventana de crear Reservacion y en la ventana busca reto adm
  //=========================================================================================================================  
  // Cierra Ventana de cancelar reservacion
    cierraVentanaCancelarReserva: function(button) {
        var win = Ext.ComponentQuery.query('#winCancelarReservacion');
        win = win[0];                 
        win.close();
    }, // Fin Cierra Ventana de cancelar reservacion
//=========================================================================================================================  
  // Cierra Ventana de cancelar reservacion
    cierraVentanaCrearReserva: function(button) {
        var win = Ext.ComponentQuery.query('#winCrearReservacion');
        win = win[0];                 
        win.close();
    }, // Fin Cierra Ventana de cancelar reservacion
    //=========================================================================================================================  
 // Cierra Ventana de confirmar reservacion
    cierraVentanaConfirmarReserva: function(button) {
        var win = Ext.ComponentQuery.query('#winConfirmaReservacion');
        win = win[0];                 
        win.close();
    }, // Fin Cierra Ventana de confirmar reservacion
//=========================================================================================================================  
  // Cierra Ventana de confirmar reservacion
    comboListaEspera: function(combox,record) {
        
        var comentarioUsuario=combox['displayTplData'][0]['comentario'];        
        
        var comentarioReservacion = Ext.ComponentQuery.query('#txtComentarioReservacion');
        comentarioReservacion = comentarioReservacion[0];          
        comentarioReservacion.setValue(comentarioUsuario);
    }, // Fin Cierra Ventana de confirmar reservacion
//=========================================================================================================================  
//  // Boton CONFIRMA Ventana de confirmar reservacion
    apruebaListaEspera: function(button) {  
        var win=Ext.ComponentQuery.query('#winListaEspera'); 
        win=win[0];        
        
        var este=this;
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true); 
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
              //alert(obj.respuesta[0].mensaje.codigoError);             
              
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has realizado la reservaci&oacute;n correctamente.</b><p>Recuerde que puedes cancelar est&aacute; reservaci&oacute;n</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);      
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente   
      var combo = Ext.ComponentQuery.query('#cmbCanchas');
      combo=combo[0];
      
      var comboUsuarioLista = Ext.ComponentQuery.query('#cmbLEListaEspera');
      comboUsuarioLista=comboUsuarioLista[0];
            
      var datos = '{"fechaYhora":"' + button['fechayHora'] + '",';
      datos += '"idUsuario":"' + comboUsuarioLista.getValue() + '",';
      datos += '"idCancha":"' + combo.getValue() + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion en lista de espera como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'aprobarReservacionListaEsperaAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
//========================================================================================================================= 
  // Boton CONFIRMA Ventana de confirmar reservacion
    apruebaReservacionPendiente: function(button) {        
        var win=Ext.ComponentQuery.query('#winApruebaReservacion'); 
        win=win[0];   
        
        var comentario = Ext.ComponentQuery.query('#txtComentarioReservacion');
        comentario=comentario[0].getValue();
        
        var este=this;
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true); 
              //alert(obj.respuesta[0].mensaje.codigoError);             
              if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has confirmado la reservaci&oacute;n correctamente.</b><p>Recuerde que puedes cancelar est&aacute; reservaci&oacute;n</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);   
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                         
      var datos = '{"idReservacion":"' + button['idReservacion'] + '",';            
      datos += '"correoUsuario":"' + button['correoUsuario'] + '",';
      datos += '"comentario":"' + comentario + '",';
      datos += '"estado":"' + 4 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'aprobarReservacionAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
 //========================================================================================================================= 
  // Boton Aprueba Reto Ventana de Busca Reto adm
    buscaRetoAdm: function(button) {       
        var opcion=1;
        var idCancha=Ext.ComponentQuery.query('#cmbCanchas');
        idCancha=idCancha[0];
        var nombreCanchaCorreo=idCancha.getRawValue();
        idCancha=idCancha.getValue();
        
        var fechaCorreo=Ext.ComponentQuery.query('#lblFechaExacta'); 
        fechaCorreo=fechaCorreo[0].getValue();
        
        var horaCorreo=Ext.ComponentQuery.query('#lblHora'); 
        horaCorreo=horaCorreo[0].getValue();
        
        var fechaYhoraCorreo=fechaCorreo+' a las '+horaCorreo;   
        
        var este=this;
        
         var win=Ext.ComponentQuery.query('#winBuscaRetoAdm'); 
         win=win[0]; 
         
         var comentario=Ext.ComponentQuery.query('#txtComentarioReservacionContrincante'); 
         comentario=comentario[0].getValue(); 
         
        var comentarioRetador = Ext.ComponentQuery.query('#txtComentarioReservacion');
        comentarioRetador=comentarioRetador[0].getValue();
        
        var idReservacionRetador = Ext.ComponentQuery.query('#btnAprobarReto');
        idReservacionRetador=idReservacionRetador[0]['idReservacion'];
        var correoCreoReto=idReservacionRetador[0]['correoUsuario'];
        
        var registrar=Ext.ComponentQuery.query('#rdbRegistrar');
        registrar=registrar[0];
        registrar=registrar.getValue();
        if(registrar==true){opcion=2;}
        if(opcion==1)
        {
                var cliente=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
                cliente=cliente[0];
                var displayCliente=cliente.getRawValue();
                cliente=cliente.getValue();            
                if(cliente==null||displayCliente==null||displayCliente=='')
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'El cliente es incorrecto',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }                     
                 // Funcion para cuando falla el Ajax Request
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

                // Funcion para cuando el Ajax Request responde correctamente
               var successAjaxFn = function(response, request) {               
                     var obj = Ext.JSON.decode(response.responseText,true);
                     if (obj == null) {
                            alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");                            
                            return;
                        }
                     //console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);             
                       if (obj.respuesta[0].mensaje.mensaje == '0') {
                         Ext.MessageBox.show({
                             title: 'Error',
                             msg: 'Hace unos segundos el campo fue reservado',
                             buttons: Ext.MessageBox.OK,
                             icon: Ext.MessageBox.ERROR});                                   
                            win.close();           
                            este.seleccionoCanchaReserva(null,null);
                          return;
                     }else{
                         win.close();
                        new Ext.ux.Notification({
                            iconCls: 'information',
                            title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                            html:	 '<b>Has realizado el reto correctamente.</b><p></p>',
                            autoDestroy: true,
                            width: 300,
                            hideDelay:  7000}).show(document);  
                        este.seleccionoCanchaReserva(null,null);
                        return;
                        }

               } // Find de Funcion para cuando el Ajax Request responde correctamente       

              var usuarioRegistro=global_id_usuario;
              var instalacion =Ext.ComponentQuery.query('#lblInstalacion');
              instalacion=instalacion[0];

              var estadoReservacion=10;      

              var datos = '{"idCancha":"' + idCancha + '",';
              datos += '"idUsuario":"' + cliente + '",';
              datos += '"usuarioRegistro":"' + usuarioRegistro + '",';
              datos += '"estadoReservacion":"' + estadoReservacion + '",';
              datos += '"comentarioReservacion":"' + comentario + '",';
              datos += '"comentarioRetador":"' + comentarioRetador + '",';
              datos += '"idReservacionRetador":"' + idReservacionRetador + '",';              
              datos += '"idEquipo":"' + 0 + '",';      
              datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",'; 
              datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",';
              datos += '"fechaYhora":"' + button['fechayHora'] + '"}';      
              //console.log('datos Ajax : '+datos);

              Ext.Ajax.request({  
                  url: 'php/RouterDBAJugarFutbol.php',  
                  method: 'POST',  
                  success: successAjaxFn,  
                  failure: failureAjaxFn, 
                  timeout: 30000,  
                  headers: {'cabecera': 'Operaciones de DB al Objeto Reto. Registrar una Reto'},  
                  params: {clasePhp: 'ReservaDB',
                           metodo:   'buscaRetoAdm',
                           datos:    datos}  
                  }); // Fin de la llamada Ajax   
        }
        else
        {
            if(opcion==2)
            {
                var nombreUsuario=Ext.ComponentQuery.query('#txtRRNombre');
                nombreUsuario=nombreUsuario[0];
                nombreUsuario=nombreUsuario.getValue();
                
                var cedulaUsuario=Ext.ComponentQuery.query('#txtRRCedula');
                cedulaUsuario=cedulaUsuario[0];
                cedulaUsuario=cedulaUsuario.getValue();
                
                var telefono2Usuario=Ext.ComponentQuery.query('#txtRRTelefono2');
                telefono2Usuario=telefono2Usuario[0];
                telefono2Usuario=telefono2Usuario.getValue();
                
                var apellidoUsuario=Ext.ComponentQuery.query('#txtRRApellido');
                apellidoUsuario=apellidoUsuario[0];
                apellidoUsuario=apellidoUsuario.getValue();
                
                var telefonoUsuario=Ext.ComponentQuery.query('#txtRRTelefono');
                telefonoUsuario=telefonoUsuario[0];
                telefonoUsuario=telefonoUsuario.getValue();
                
                var correoUsuario=Ext.ComponentQuery.query('#txtRRCorreo');
                correoUsuario=correoUsuario[0];
                correoUsuario=correoUsuario.getValue();
                
                var genero='M';
                var rdbRRFemenino=Ext.ComponentQuery.query('#rdbRRFemenino');
                rdbRRFemenino=rdbRRFemenino[0];
                rdbRRFemenino=rdbRRFemenino.getValue();
                if(rdbRRFemenino==true){genero='F';}
                
                var form=Ext.ComponentQuery.query('#plnRRAdm');
                form=form[0];
                form=form.getForm();
                form=form.isValid();
                
                if(form==false)
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'Se encuentr&aacute;n errores en el formulario.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }
                
                if(isNaN(telefonoUsuario))
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'El tel&eacute;fono debe tener 8 d&iacute;gitos y solo se aceptan n&uacute;meros.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }
                
                if(isNaN(telefonoUsuario))
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'El tel&eacute;fono debe tener 8 d&iacute;gitos y solo se aceptan n&uacute;meros.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }
                
                if(cedulaUsuario==''&&correoUsuario=='')
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'Debe ingresar una c&eacute;dula o un correo',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }                
                        // Funcion para cuando falla el Ajax Request
                   failureAjaxFn = function(response, request) {  
                          var errMessage = 'Error en la petición' + request.url + ' '  
                          + ' status ' + response.status + ''  
                          + ' statusText ' + response.statusText + ''  
                          + ' responseText ' + response.responseText + '';  
                          // console.log (errMessage);  
                           alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
                              Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
                              Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
                          }  // Fin Funcion para cuando falla el Ajax Request

                    // Funcion para cuando el Ajax Request responde correctamente
                   successAjaxFn = function(response, request) {  
                         //console.log (' Response del Ajax Request: ' + response.responseText);

                         var obj = Ext.JSON.decode(response.responseText,true);
                         if (obj == null) {
                                alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                                return;
                            }
                         // console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);             
                         if (obj.respuesta[0].mensaje.codigoError == '0001') {
                             Ext.MessageBox.show({
                                 title: 'Atenci&oacute;n',
                                 msg: 'El usuario se encuentr&aacute; registrado.',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.ERROR});                                                                                                     
                              return;
                         }
                         
                          if (obj.respuesta[0].mensaje.mensaje == '0') {
                             Ext.MessageBox.show({
                                 title: 'Error',
                                 msg: 'Hace unos segundos el campo fue reservado',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.ERROR});                                   
                                win.close();           
                                este.seleccionoCanchaReserva(null,null);
                              return;
                         }else{
                             win.close();
                            new Ext.ux.Notification({
                                iconCls: 'information',
                                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                                html:	 '<b>Has relizado la reto correctamente.</b><p>Recuerde que puedes cancelar est&aacute; reservaci&oacute;n</p>',
                                autoDestroy: true,
                                width: 300,
                                hideDelay:  9000}).show(document);     
                            este.seleccionoCanchaReserva(null,null);
                            return;
                            }

                   } // Find de Funcion para cuando el Ajax Request responde correctamente       
                  
                  instalacion =Ext.ComponentQuery.query('#lblInstalacion');
                  instalacion=instalacion[0];                  
                  estadoReservacion=7;                        
                  var idUsuarioRegistro=global_id_usuario;
                  var idInstalacion=instalacion['idInst'];

                  datos = '{"idCancha":"' + idCancha + '",';
                  datos += '"idInstalacion":"' + idInstalacion + '",';
                  datos += '"cedulaRegistar":"' + cedulaUsuario + '",';
                  datos += '"nombreRegistar":"' + nombreUsuario + '",';
                  datos += '"apellidoRegistar":"' + apellidoUsuario + '",';
                  datos += '"telefonoRegistar":"' + telefonoUsuario + '",';
                  datos += '"telefono2Registar":"' + telefono2Usuario + '",';
                  datos += '"correoRegistar":"' + correoUsuario + '",';
                  datos += '"generoRegistar":"' + genero + '",';
                  datos += '"idUsuarioRegistro":"' + idUsuarioRegistro + '",';
                  datos += '"estadoReservacion":"' + estadoReservacion + '",';
                  datos += '"idEquipo":"' + 0 + '",';
                  datos += '"fechaYhora":"' + button['fechayHora'] + '",'; 
                  datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",'; 
                  datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",';
                  datos += '"comentarioRetador":"' + comentarioRetador + '",';
                  datos += '"idReservacionRetador":"' + idReservacionRetador + '",';
                  datos += '"comentarioReservacion":"' + comentario + '"}';

                  //console.log('datos Ajax : '+datos);                  
                  Ext.Ajax.request({  
                      url: 'php/RouterDBAJugarFutbol.php',  
                      method: 'POST',  
                      success: successAjaxFn,  
                      failure: failureAjaxFn, 
                      timeout: 30000,  
                      headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Registrar una Reservacion como administrador'},  
                      params: {clasePhp: 'ReservaDB',
                               metodo:   'buscaReto_y_registraUsuario',
                               datos:    datos}  
                      }); // Fin de la llamada Ajax
            }
        }
    }, // Fin Boton Aprueba Reto Ventana de Busca Reto adm
//=========================================================================================================================  
  // Boton CONFIRMA Ventana de confirmar reservacion
    cancelaReservacion: function(button) {        
        var win=Ext.ComponentQuery.query('#winCancelarReservacion'); 
        win=win[0];
        
        var nombreCanchaCorreo=Ext.ComponentQuery.query('#cmbCanchas');
        nombreCanchaCorreo=nombreCanchaCorreo[0].getRawValue();
        
        var fechaCorreo=Ext.ComponentQuery.query('#lblCRFechaExacta'); 
        fechaCorreo=fechaCorreo[0].getValue();
        
        var horaCorreo=Ext.ComponentQuery.query('#lblCRHora'); 
        horaCorreo=horaCorreo[0].getValue();
        
        var fechaYhoraCorreo=fechaCorreo+' a las '+horaCorreo;    
        
        var este = this;
               
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);                                         
              if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has cancelado la reservaci&oacute;n correctamente.</b><p>El campo se encontr&aacute; habilitado para realizar una nueva reservaci&oacute;n</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);   
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion":"' + button['idReservacion'] + '",';
      datos += '"correoUsuario":"' + button['correoUsuario'] + '",';
      datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",';
      datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",';
      datos += '"estado":"' + 5 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'cancelaReservacionAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
//=========================================================================================================================  
  // Boton CONFIRMA Ventana de desbloqueo
 desbloqueoReservacion: function(button) {        
        var win=Ext.ComponentQuery.query('#winDesbloqueo'); 
        win=win[0];
        
        var este = this;
               
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true); 
              if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has desbloqueado el espacio correctamente.</b>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);   
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion":"' + button['idReservacion'] + '",';
      datos += '"correoUsuario":"",';
      datos += '"estado":"' + 5 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'cancelaReservacionAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CONFIRMA Ventana de desbloqueo
//=========================================================================================================================  
  // Boton CONFIRMA Ventana de confirmar reservacion
    cancelaAprobacionReservacion: function(button) {        
        var win=Ext.ComponentQuery.query('#winApruebaReservacion'); 
        win=win[0];
        
        var idReservacion=Ext.ComponentQuery.query('#btnAprobarReservacion'); 
        var correoUsuario=idReservacion[0]['correoUsuario'];
        idReservacion=idReservacion[0]['idReservacion']; 
        
        var nombreCanchaCorreo=Ext.ComponentQuery.query('#cmbCanchas');
        nombreCanchaCorreo=nombreCanchaCorreo[0].getRawValue();
        
        var fechaCorreo=Ext.ComponentQuery.query('#lblFechaExacta'); 
        fechaCorreo=fechaCorreo[0].getValue();
        
        var horaCorreo=Ext.ComponentQuery.query('#lblHora'); 
        horaCorreo=horaCorreo[0].getValue();
        
        var fechaYhoraCorreo=fechaCorreo+' a las '+horaCorreo;     
        
        
        var este=this;
        
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
              //alert(obj.respuesta[0].mensaje.codigoError);             
              
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has cancelado la reservaci&oacute;n correctamente.</b><p>El campo se encontr&aacute; habilitado para realizar una nueva reservaci&oacute;n</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);  
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion":"' + idReservacion + '",';
      datos += '"correoUsuario":"' + correoUsuario + '",';    
      datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",';
      datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",';
      datos += '"estado":"' + 5 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'cancelaReservacionAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
//=========================================================================================================================  
  // Boton CONFIRMA Ventana de confirmar reservacion
    cancelaALRetador: function(button) {        
        var win=Ext.ComponentQuery.query('#winBuscaRetoAdm'); 
        win=win[0];
        
        var este=this;
        
        var idReservacion=Ext.ComponentQuery.query('#btnAprobarReto'); 
        var correoUsuario=idReservacion[0]['correoUsuario'];
        idReservacion=idReservacion[0]['idReservacion']; 
        
        var nombreCanchaCorreo=Ext.ComponentQuery.query('#cmbCanchas');
        nombreCanchaCorreo=nombreCanchaCorreo[0].getRawValue();
        
        var fechaCorreo=Ext.ComponentQuery.query('#lblFechaExacta'); 
        fechaCorreo=fechaCorreo[0].getValue();
        
        var horaCorreo=Ext.ComponentQuery.query('#lblHora'); 
        horaCorreo=horaCorreo[0].getValue();
        
        var fechaYhoraCorreo=fechaCorreo+' a las '+horaCorreo;        
        
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);     
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
              //alert(obj.respuesta[0].mensaje.codigoError);             
              
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has cancelado el reto correctamente.</b><p>El campo se encontr&aacute; habilitado para realizar una nueva reservaci&oacute;n</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);   
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion":"' + idReservacion + '",';
      datos += '"correoUsuario":"' + correoUsuario + '",';  
      datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",';
      datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",';
      datos += '"estado":"' + 5 + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'cancelaALRetadorAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
//=========================================================================================================================  
  // Boton Cancela Ventana de winApruebaRetoAdm
    cancelaApruebaRetoAdm: function(button) {        
        var win=Ext.ComponentQuery.query('#winApruebaRetoAdm'); 
        win=win[0];
        
        var este=this;
        
        var idReservacion1=Ext.ComponentQuery.query('#btnCancelarReto1'); 
        var correoUsuario1=idReservacion1[0]['correoUsuario'];
        idReservacion1=idReservacion1[0]['idReservacion']; 
        
        var idReservacion2=Ext.ComponentQuery.query('#btnCancelarReto2'); 
        var correoUsuario2=idReservacion2[0]['correoUsuario'];
        idReservacion2=idReservacion2[0]['idReservacion']; 
        
        var retoACancelar=button['id'].substring(15,16);
        
        var nombreCanchaCorreo=Ext.ComponentQuery.query('#cmbCanchas');
        nombreCanchaCorreo=nombreCanchaCorreo[0].getRawValue();        
        
        var fechaCorreo=Ext.ComponentQuery.query('#lblFechaExacta1'); 
        fechaCorreo=fechaCorreo[0].getValue();
        
        var horaCorreo=Ext.ComponentQuery.query('#lblHora1'); 
        horaCorreo=horaCorreo[0].getValue();
        
        var fechaYhoraCorreo=fechaCorreo+' a las '+horaCorreo;        
        
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
              //alert(obj.respuesta[0].mensaje.codigoError);             
              
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has cancelado el reto correctamente.</b><p></p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document); 
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion1":"' + idReservacion1 + '",';
      datos += '"correoUsuario1":"' + correoUsuario1 + '",';
      datos += '"idReservacion2":"' + idReservacion2 + '",';
      datos += '"correoUsuario2":"' + correoUsuario2 + '",';
      datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",'; 
      datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",'; 
      datos += '"retoACancelar":"' + retoACancelar + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'modificaRetoAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CANCELA Ventana de winApruebaRetoAdm
//=========================================================================================================================  
  // Boton Cancela Ventana de winApruebaRetoAdm
    confirmaReto: function(button) {        
        var win=Ext.ComponentQuery.query('#winApruebaRetoAdm'); 
        win=win[0];
        
        var este=this;
        
        var idReservacion=Ext.ComponentQuery.query('#btnCancelarReto2'); 
        var correoUsuario=idReservacion[0]['correoUsuario'];
        idReservacion=idReservacion[0]['idReservacion']; 
        
        var comentarioRetador=Ext.ComponentQuery.query('#txtComentarioReservacion1'); 
        comentarioRetador=comentarioRetador[0].getValue();
        
        var comentarioContrincante=Ext.ComponentQuery.query('#txtComentarioReservacion2'); 
        comentarioContrincante=comentarioContrincante[0].getValue();     
        
        var idReservacionRetador=Ext.ComponentQuery.query('#btnCancelarReto1'); 
        idReservacionRetador=idReservacionRetador[0]['idReservacion'];     
        
         // Funcion para cuando falla el Ajax Request
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
        
        // Funcion para cuando el Ajax Request responde correctamente
       var successAjaxFn = function(response, request) {  
             //console.log (' Response del Ajax Request: ' + response.responseText);
             var obj = Ext.JSON.decode(response.responseText,true);
             if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
              //alert(obj.respuesta[0].mensaje.codigoError);             
              
                win.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has confirmado el reto correctamente.</b><p></p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document); 
                este.seleccionoCanchaReserva(null,null);
                return;
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente                   
      var datos = '{"idReservacion":"' + idReservacion + '",';  
      datos += '"idReservacionRetador":"' + idReservacionRetador + '",';
      datos += '"comentarioRetador":"' + comentarioRetador + '",';     
      datos += '"comentarioContrincante":"' + comentarioContrincante + '",';     
      datos += '"correoUsuario":"' + correoUsuario + '"}';    
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'confirmaReto',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
    }, // Fin Boton CANCELA Ventana de winApruebaRetoAdm
//=========================================================================================================================  
  // Boton CANCELA Ventana de lISTA ESPERA<
cancelaListaEspera: function(button) {                    
    var winListaEspera=Ext.ComponentQuery.query('winListaEspera');
    winListaEspera=winListaEspera[0];
    
    var este=this;
    
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
          
          winListaEspera.close();
                new Ext.ux.Notification({
                    iconCls: 'information',
                    title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                    html:	 '<b>Has cancelado la reservaci&oacute;n correctamente.</b><p>El campo se encontr&aacute; habilitado para realizar una nueva reservaci&oacute;n</p>',
                    autoDestroy: true,
                    width: 300,
                    hideDelay:  7000}).show(document);      
                 este.seleccionoCanchaReserva(null,null);
                return;           
                              
       } // Find de Funcion para cuando el Ajax Request responde correctamente          
          
      var combo = Ext.ComponentQuery.query('#cmbCanchas');
      combo=combo[0];                  

      var fechaYhora = Ext.ComponentQuery.query('#btnLEListaEspera');      
      fechaYhora=fechaYhora[0];
      fechaYhora=fechaYhora['fechayHora'];
            
      var datos = '{"fechaYhora":"' + fechaYhora + '",';      
      datos += '"idCancha":"' + combo.getValue() + '"}';
      
      Ext.Ajax.request({  
          url: 'php/RouterDBAJugarFutbol.php',  
          method: 'POST',  
          success: successAjaxFn,  
          failure: failureAjaxFn, 
          timeout: 30000,  
          headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Aprobar una Reservacion en lista de espera como administrador'},  
          params: {clasePhp: 'ReservaDB',
                   metodo:   'cancelarReservacionListaEsperaAdm',
                   datos:    datos}  
          }); // Fin de la llamada Ajax   
                   
    }, // Fin Boton CANCELA Ventana de lISTA ESPERA<
//=========================================================================================================================  
  // Boton CONFIRMA Ventana de confirmar reservacion
    apruebaCrearReservacion: function(button) {              
       var idCancha=Ext.ComponentQuery.query('#cmbCanchas');
        idCancha=idCancha[0];
        var nombreCanchaCorreo=idCancha.getRawValue();
        idCancha=idCancha.getValue();
        
        var win=Ext.ComponentQuery.query('#winCrearReservacion'); 
        win=win[0];
        
        var fechaCorreo=Ext.ComponentQuery.query('#lblFechaExacta'); 
        fechaCorreo=fechaCorreo[0].getValue();
        
        var horaCorreo=Ext.ComponentQuery.query('#lblHora'); 
        horaCorreo=horaCorreo[0].getValue();
        
        var fechaYhoraCorreo=fechaCorreo+' a las '+horaCorreo;                
        
        var este=this;
        
        var opcion=1;
        var failureAjaxFn;
        var successAjaxFn;
        var datos;
        var estadoReservacion;
        var instalacion;
        var idUsuarioRegistro=global_id_usuario;
        
        var rdbRegistrar=Ext.ComponentQuery.query('#rdbRegistrar');
        rdbRegistrar=rdbRegistrar[0];
        rdbRegistrar=rdbRegistrar.getValue();
        if(rdbRegistrar==true){opcion=2;}              
        
        var comentario=Ext.ComponentQuery.query('#txtComentarioReservacion');
        comentario=comentario[0];
        comentario=comentario.getValue();
        
        var buscaReto=Ext.ComponentQuery.query('#chkRRBuscaReto');
        buscaReto=buscaReto[0];
        buscaReto=buscaReto.getValue();
        
        if(comentario.length>100)
        {       
                Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'El comentario debe tener un m&aacute;ximo de 100 caracteres.',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});              
                 return;
        }
        
        if(opcion==1)
        {    
            var cliente=Ext.ComponentQuery.query('#cmbRRComboClienteFrecuente');
            cliente=cliente[0];
            var displayCliente=cliente.getRawValue();
            cliente=cliente.getValue();            
            if(cliente==null||displayCliente==null||displayCliente=='')
            {
                Ext.MessageBox.show({
                     title: 'Atenci&oacute;n',
                     msg: 'El cliente es incorrecto',
                     buttons: Ext.MessageBox.OK,
                     icon: Ext.MessageBox.ERROR});              
                 return;
            }           

             // Funcion para cuando falla el Ajax Request
           failureAjaxFn = function(response, request) {  
                  var errMessage = 'Error en la petición' + request.url + ' '  
                  + ' status ' + response.status + ''  
                  + ' statusText ' + response.statusText + ''  
                  + ' responseText ' + response.responseText + '';  
                  // console.log (errMessage);  
                  alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
                              Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
                              Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
                  }  // Fin Funcion para cuando falla el Ajax Request

            // Funcion para cuando el Ajax Request responde correctamente
           successAjaxFn = function(response, request) {  
                 //console.log (' Response del Ajax Request: ' + response.responseText);

                 var obj = Ext.JSON.decode(response.responseText,true); 
                 if (obj == null) {
                    alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                    win.close();
                    return;
                }
                 // console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);             
                  if (obj.respuesta[0].mensaje.mensaje == '0') {
                     Ext.MessageBox.show({
                         title: 'Error',
                         msg: 'Hace unos segundos el campo fue reservado',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});                                   
                        win.close();    
                        este.seleccionoCanchaReserva(null,null);
                      return;
                 }else{
                     win.close();
                    new Ext.ux.Notification({
                        iconCls: 'information',
                        title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                        html:	 '<b>Has relizado la reservaci&oacute;n correctamente.</b><p>Recuerde que puedes cancelar est&aacute; reservaci&oacute;n</p>',
                        autoDestroy: true,
                        width: 300,
                        hideDelay:  7000}).show(document);    
                    este.seleccionoCanchaReserva(null,null);
                    return;
                    }

           } // Find de Funcion para cuando el Ajax Request responde correctamente       
          
          instalacion =Ext.ComponentQuery.query('#lblInstalacion');
          instalacion=instalacion[0];
          estadoReservacion=3;
          if(instalacion['modoReservacion']==5){estadoReservacion=1;}
          else{
              if(instalacion['modoReservacion']==8){estadoReservacion=4;}
              else{
                  if(instalacion['modoReservacion']==6){estadoReservacion=3;}
              }
          }
          if(buscaReto==true){estadoReservacion=6;}

          datos = '{"idCancha":"' + idCancha + '",';
          datos += '"idUsuario":"' + cliente + '",';          
          datos += '"idUsuarioRegistro":"' + idUsuarioRegistro + '",';
          datos += '"estadoReservacion":"' + estadoReservacion + '",';
          datos += '"idEquipo":"' + 0 + '",';
          datos += '"fechaYhora":"' + button['fechayHora'] + '",'; 
          datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",'; 
          datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",'; 
          datos += '"comentarioReservacion":"' + comentario + '"}';

          //console.log('datos Ajax : '+datos);

          Ext.Ajax.request({  
              url: 'php/RouterDBAJugarFutbol.php',  
              method: 'POST',  
              success: successAjaxFn,  
              failure: failureAjaxFn, 
              timeout: 30000,  
              headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Registrar una Reservacion como administrador'},  
              params: {clasePhp: 'ReservaDB',
                       metodo:   'creaReservacionAdm',
                       datos:    datos}  
              }); // Fin de la llamada Ajax   
        }
        else
        {
            if(opcion==2)
            {
                var nombreUsuario=Ext.ComponentQuery.query('#txtRRNombre');
                nombreUsuario=nombreUsuario[0];
                nombreUsuario=nombreUsuario.getValue();
                
                var cedulaUsuario=Ext.ComponentQuery.query('#txtRRCedula');
                cedulaUsuario=cedulaUsuario[0];
                cedulaUsuario=cedulaUsuario.getValue();
                
                var telefono2Usuario=Ext.ComponentQuery.query('#txtRRTelefono2');
                telefono2Usuario=telefono2Usuario[0];
                telefono2Usuario=telefono2Usuario.getValue();
                
                var apellidoUsuario=Ext.ComponentQuery.query('#txtRRApellido');
                apellidoUsuario=apellidoUsuario[0];
                apellidoUsuario=apellidoUsuario.getValue();
                
                var telefonoUsuario=Ext.ComponentQuery.query('#txtRRTelefono');
                telefonoUsuario=telefonoUsuario[0];
                telefonoUsuario=telefonoUsuario.getValue();
                
                var correoUsuario=Ext.ComponentQuery.query('#txtRRCorreo');
                correoUsuario=correoUsuario[0];
                correoUsuario=correoUsuario.getValue();
                
                var genero='M';
                var rdbRRFemenino=Ext.ComponentQuery.query('#rdbRRFemenino');
                rdbRRFemenino=rdbRRFemenino[0];
                rdbRRFemenino=rdbRRFemenino.getValue();
                if(rdbRRFemenino==true){genero='F';}
                
                var form=Ext.ComponentQuery.query('#plnRRAdm');
                form=form[0];
                form=form.getForm();
                form=form.isValid();
                
                if(form==false)
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'Se encuentr&aacute;n errores en el formulario.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }
                
                if(cedulaUsuario==''&&correoUsuario=='')
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'Debe ingresar una c&eacute;dula o un correo',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }  
                
                if(isNaN(telefonoUsuario))
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'El tel&eacute;fono debe tener 8 d&iacute;gitos y solo se aceptan n&uacute;meros.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }
                
                if(isNaN(telefono2Usuario)&&!(telefono2Usuario==''))
                {
                    Ext.MessageBox.show({
                         title: 'Atenci&oacute;n',
                         msg: 'El tel&eacute;fono 2 debe tener 8 d&iacute;gitos y solo se aceptan n&uacute;meros.',
                         buttons: Ext.MessageBox.OK,
                         icon: Ext.MessageBox.ERROR});              
                     return;
                }                
                        // Funcion para cuando falla el Ajax Request
                   failureAjaxFn = function(response, request) {  
                          var errMessage = 'Error en la petición' + request.url + ' '  
                          + ' status ' + response.status + ''  
                          + ' statusText ' + response.statusText + ''  
                          + ' responseText ' + response.responseText + '';  
                          // console.log (errMessage);  
                          alert("El servidor no contesto la peticion, posiblemente existe un problema en Internet.  \n\
                              Revise su conexión a Internet e intente de nuevo. O bien actualice el sitio presionando 'F5'.  \n\
                              Si el error persiste contacte a Soporte Técnico de AjugarFutbol.com");return;
                          }  // Fin Funcion para cuando falla el Ajax Request

                    // Funcion para cuando el Ajax Request responde correctamente
                   successAjaxFn = function(response, request) {  
                         //console.log (' Response del Ajax Request: ' + response.responseText);
                         var obj = Ext.JSON.decode(response.responseText,true); 
                         if (obj == null) {
                                alert("Existe un problema con el Servidor.  Revise su conexión a Internet e intente de nuevo.  Si el error persiste contacte a Soporte Técnico de AjugarFutbol.Com");
                                win.close();
                                return;
                            }                         
                         // console.log(obj.respuesta[0].mensaje.codigoError + '  ' + obj.respuesta[0].mensaje.mensaje);             
                         if (obj.respuesta[0].mensaje.codigoError == '0001') {
                             Ext.MessageBox.show({
                                 title: 'Atenci&oacute;n',
                                 msg: 'El usuario se encuentr&aacute; registrado.',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.ERROR});                                                                                                     
                              return;
                         }
                         
                          if (obj.respuesta[0].mensaje.mensaje == '0') {
                             Ext.MessageBox.show({
                                 title: 'Error',
                                 msg: 'Hace unos segundos el campo fue reservado',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.ERROR});                                   
                                win.close(); 
                                este.seleccionoCanchaReserva(null,null);
                              return;
                         }else{
                             win.close();
                            new Ext.ux.Notification({
                                iconCls: 'information',
                                title:	 '<font size=2 color=red>Informaci&oacute;n</font>',
                                html:	 '<b>Has relizado la reservaci&oacute;n correctamente.</b><p><b> Al usuario registrado se le envi&oacute; la contrase&ntilde;a al correo registrado.</b></p><p>Recuerde que puedes cancelar est&aacute; reservaci&oacute;n</p>',
                                autoDestroy: true,
                                width: 300,
                                hideDelay:  9000}).show(document);         
                            este.seleccionoCanchaReserva(null,null);
                            return;
                            }

                   } // Find de Funcion para cuando el Ajax Request responde correctamente       
                  
                  instalacion =Ext.ComponentQuery.query('#lblInstalacion');
                  instalacion=instalacion[0];                  
                  estadoReservacion=3;
                  if(instalacion['modoReservacion']==5){estadoReservacion=1;}
                  else{
                      if(instalacion['modoReservacion']==8){estadoReservacion=4;}
                      else{
                          if(instalacion['modoReservacion']==6){estadoReservacion=3;}
                      }
                  }
                  var idInstalacion=instalacion['idInst'];

                  datos = '{"idCancha":"' + idCancha + '",';
                  datos += '"idInstalacion":"' + idInstalacion + '",';
                  datos += '"cedulaRegistar":"' + cedulaUsuario + '",';
                  datos += '"nombreRegistar":"' + nombreUsuario + '",';
                  datos += '"apellidoRegistar":"' + apellidoUsuario + '",';
                  datos += '"telefonoRegistar":"' + telefonoUsuario + '",';
                  datos += '"telefono2Registar":"' + telefono2Usuario + '",';
                  datos += '"correoRegistar":"' + correoUsuario + '",';
                  datos += '"generoRegistar":"' + genero + '",';
                  datos += '"idUsuarioRegistro":"' + idUsuarioRegistro + '",';
                  datos += '"estadoReservacion":"' + estadoReservacion + '",';
                  datos += '"idEquipo":"' + 0 + '",';
                  datos += '"fechaYhora":"' + button['fechayHora'] + '",';    
                  datos += '"fechaYhoraCorreo":"' + fechaYhoraCorreo + '",'; 
                  datos += '"nombreCanchaCorreo":"' + nombreCanchaCorreo + '",'; 
                  datos += '"comentarioReservacion":"' + comentario + '"}';

                  //console.log('datos Ajax : '+datos);                  
                  Ext.Ajax.request({  
                      url: 'php/RouterDBAJugarFutbol.php',  
                      method: 'POST',  
                      success: successAjaxFn,  
                      failure: failureAjaxFn, 
                      timeout: 30000,  
                      headers: {'cabecera': 'Operaciones de DB al Objeto Reservacion. Registrar una Reservacion como administrador'},  
                      params: {clasePhp: 'ReservaDB',
                               metodo:   'creaReservacion_y_registraUsuarioAdm',
                               datos:    datos}  
                      }); // Fin de la llamada Ajax
            }
        }                    
    }, // Fin Boton CONFIRMA Ventana de confirmar reservacion
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
        
        this.seleccionoCanchaReserva(null,null);
    }, // Fin de  Selecciono en la pantalla Calendario Reservar el boton semana siguiente    
//========================================================================================================================= 
  // Selecciono en la pantalla Calendario Reservar el boton semana siguiente
    seleccionoFechaEspecifica: function(dtFecha) {
        var obj = Ext.ComponentQuery.query('#btnSemanaSiguiente');
        obj[0]['controlFecha']=new Date(dtFecha['value']);
        obj[0]['entraHoy']=false;
        this.seleccionoCanchaReserva(null,null);        
    }, // Fin de  Selecciono en la pantalla Calendario Reservar el boton semana siguiente
 
sincronizaCalendarioAdm: function() {
     this.seleccionoCanchaReserva(null,null);
    /*var obj = Ext.ComponentQuery.query('#btnSemanaSiguiente');
    var self = this;
       ID=window.setTimeout(function() {            
            self.seleccionoCanchaReserva(null,null); 
            }, 50000); */
    } // Fin 
 });