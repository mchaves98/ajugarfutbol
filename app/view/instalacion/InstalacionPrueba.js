Ext.define('AJugarFutbol.view.instalacion.InstalacionPrueba' ,{
    extend: 'Ext.panel.Panel',
    
    alias : 'widget.winInstalacionPrueba',
    
    id: 'winInstalacionPrueba',
    itemId: 'winInstalacionPrueba',
    height: 245,
    width: 759,    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 255,
                    width: 762,
                    layout: {columns: 2,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'panel',
                            bodyStyle: 'border:none;background:#B40431;',
                            width: 762,
                            layout: {columns: 3,type: 'table'},
                            colspan: 2,
                            items: [
                            {
                                xtype: 'panel',
                                height: 40,                            
                                bodyStyle: 'border:none;background:#B40431;',
                                width: 555,                            
                                items: [
                                    {
                                        xtype: 'displayfield',                                        
                                        itemId: 'lblNombreInstalacion',
                                        width: 555,  
                                        margin: 5,
                                        value: '<span style="font-size:20px;color:white;"><b>Nombre</b></span>'
                                    }
                                ]
                             },
                             {
                                xtype: 'panel',
                                height: 40,                           
                                bodyStyle: 'border:none;background:#B40431;',
                                width: 160,                                                                
                                items: [
                                    {
                                        xtype: 'displayfield',                                        
                                        itemId: 'lblTituloFavorita',
                                        width: 160,                                        
                                        margin: 5                                        
                                    }                                    
                                ]
                              },
                              {
                                    xtype: 'imageEx',
                                    id: 'imgFavoritaInstalacion',
                                    itemId: 'imgFavoritaInstalacion',
                                    item:'imgFavoritaInstalacion',
                                    idInst:'',
                                    valor:true,
                                    height: 35,                            
                                    width: 35,
                                    overCls:'x-imageExOver',
                                    style:'margin-left:0px;',
                                    controller: 'reserva.Reservas',
                                    src: 'resources/imagenes/estrella.png',                                        
                                    srcNormal:  'resources/imagenes/estrella.png',
                                    srcDown:    'resources/imagenes/estrella.png',
                                    srcUp:      'resources/imagenes/estrella.png',
                                    srcOver:    'resources/imagenes/estrella.png',
                                    srcClick:   'resources/imagenes/estrella.png'
                              }
                            ]
                        },                                                
                        {
                            xtype: 'image',                            
                            itemId: 'imgLogoInstalacion',
                            height: 115,
                            style: 'margin-left:10px;margin-right:5px;',
                            width: 144,
                            src: 'resources/imagenes/logosInstalaciones/fut3.png'
                        },
                        {
                            xtype: 'fieldset',
                            height: 115,                            
                            width: 587,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Informaci&oacute;n</span>',
                            items: [
                                {
                                    xtype: 'displayfield',                                         
                                    itemId: 'lblEncargadoInstalacion',
                                    style: 'margin-left:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Encargado',
                                    width: 250,
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',                                    
                                    itemId: 'lblTelefonosInstalacion',
                                    style: 'margin-left:70px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tel&eacute;fono(s)',
                                    width: 250,
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',                                    
                                    itemId: 'lblCorreoInstalacion',
                                    style: 'margin-left:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Correo',
                                    width: 250,
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',                                    
                                    itemId: 'lblFaxInstalacion',
                                    style: 'margin-left:70px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fax',
                                    width: 250,
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',                                    
                                    itemId: 'lblPaginaWebInstalacion',
                                    style: 'margin-left:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'P&aacute;gina Web',
                                    width: 250,
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',                                    
                                    itemId: 'lblHorarioInstalacion',
                                    style: 'margin-left:70px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Horario',
                                    width: 250,
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',                                    
                                    itemId: 'lblDireccionInstalacion',
                                    style: 'margin-left:10px;',
                                    width: 400,
                                    value: 'Display Field',
                                    fieldLabel: 'Direcci&oacute;n',
                                    labelPad: -20,
                                    colspan: 2
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 54,
                            style: 'margin-left:10px;',
                            width: 741,
                            layout: {columns: 6,type: 'table'},
                            bodyStyle: 'border:none;background-color:transparent;',
                            colspan: 2,
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnMapaGoogleInstalacion',
                                    item:'btnMapaGoogleInstalacion',
                                    idInst:'',
                                    height: 25,
                                    style: 'margin-top:5px;margin-left:20px;',
                                    width: 100,
                                    text: 'Mapa Google'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnCampeonatosInstalacion',
                                    item:'btnCampeonatosInstalacion',
                                    idInst:'',
                                    height: 25,
                                    style: 'margin-top:5px;margin-left:17px;',
                                    width: 100,
                                    text: 'Campeonatos'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnServiciosInstalacion',
                                    item:'btnServiciosInstalacion',
                                    idInst:'',
                                    height: 25,
                                    style: 'margin-top:5px;margin-left:17px;',
                                    width: 100,
                                    text: 'Servicios'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnCanchasInstalacion',
                                    item:'btnCanchasInstalacion',
                                    idInst:'',
                                    height: 25,
                                    style: 'margin-top:5px;margin-left:17px;',
                                    width: 100,
                                    text: 'Canchas'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnGaleriaFotosInstalacion',
                                    item:'btnGaleriaFotosInstalacion',
                                    idInst:'',
                                    height: 25,
                                    style: 'margin-top:5px;margin-left:17px;',
                                    width: 100,
                                    text: 'Galer&iacute;a Fotos'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnReservarInstalacion',
                                    item:'btnReservarInstalacion',
                                    idInst:'',                                    
                                    nombreInstalacion:'',
                                    direccion:'',
                                    telefono:'',
                                    encargado:'',
                                    correo:'',
                                    modoReservacion:'',
                                    height: 48,
                                    scale: 'large',                                    
                                    style: 'margin-left:22px;margin-top:5px;',                                    
                                    width: 124,
                                    text: '<b style="font-size:15px;">Reservar</b>'
                                }
                            ]
                        },
                        {
                            xtype: 'image',
                            height: 15,
                            style: 'margin-left:10px;',
                            width: 740,
                            src: 'resources/imagenes/separador.gif',
                            colspan: 2
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});