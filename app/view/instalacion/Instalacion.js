Ext.define('AJugarFutbol.view.instalacion.Instalacion' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.winInstalacion',  

    height: 220,
    id: 'winInstalacion',
    itemId: 'winInstalacion',
    bodyStyle:'border:none;',    
    style:'margin-top:10px;margin-left:32px;',
    width: 210,    
    layout: {columns: 1,type: 'table'},   

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 154,
                    id: 'plnsubPrincipal',
                    itemId: 'plnsubPrincipal',
                    width: 210,
                    bodyStyle:'border:none;',
                    layout: {columns: 2,type: 'table'},
                    items: [
                         {
                            xtype: 'panel',
                            height: 29,
                            id: 'plnTitulo',
                            itemId: 'plnTitulo',
                            layout: {column:2,type: 'table'},
                            bodyStyle:'border:none;background:#F2F2F2;',
                            colspan:2,
                            width: 210,                                                       
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 29,      
                                    layout: {align: 'left',pack: 'center',type: 'vbox'},
                                    bodyStyle:'border:none;background:#F2F2F2;',                                    
                                    width: 131,                          
                                    items: [
                                        {
                                            xtype: 'label',
                                            id: 'lblTitulo',
                                            itemId: 'lblTitulo',                                                                                                            
                                            text: 'Nombre',
                                            style:'margin-top:4px;',
                                            tooltip: 'Nombre de la cancha'
                                        },
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 29,
                                    id: 'plnFavorita',
                                    itemId: 'plnFavorita',
                                    layout: {column:2,type: 'table'},
                                    bodyStyle:'border:none;background:#F2F2F2;',                                    
                                    width: 79,                          
                                    items: [
                                        {
                                            id: 'chkFavorita',
                                            itemId: 'chkFavorita',
                                            idItem:'btnInfo',
                                            xtype: 'checkboxfield',                                    
                                            boxLabel: 'Favorita',
                                            style:'margin-top:4px;'
                                        },
                                         {
                                            xtype: 'image',
                                            height: 16,                                                         
                                            itemId: 'imgEsFavorita',
                                            idItem:'',
                                            width: 16,
                                            src: 'resources/imagenes/NoFavorito2.png',
                                            style:'margin-left:2px;margin-top:4px;'                                    
                                        }
                                    ]
                                },
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 125,
                            id: 'plnLogo',
                            itemId: 'plnLogo',
                            bodyStyle:'border:none;',
                            width: 115,
                            layout: {
                                type: 'fit'
                            },
                            rowspan: 5,
                            items: [
                                {
                                    xtype: 'image',
                                    height: 162,
                                    id: 'imgLogo',
                                    itemId: 'imgLogo',
                                    width: 184,
                                    src: 'resources/imagenes/desconocido.jpg'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 25,
                            id: 'plnInfo',
                            itemId: 'plnInfo',                            
                            bodyStyle:'border:none;',
                            width: 92,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnInfo',                                    
                                    itemId: 'btnInfo',
                                    idItem:'btnInfo',
                                    margin: 3,
                                    style: 'border:0px;background:#FFF;',
                                    text: '<b>Informaci&oacute;n</b>',
                                    tooltip: 'Ver información detallada del lugar'                                                                                                   
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 25,
                            id: 'plnMapaGoogle',
                            itemId: 'plnMapaGoogle',
                            bodyStyle:'border:none;',
                            width: 92,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnMapa',
                                    itemId: 'btnMapa',
                                    idItem:'btnMapa',
                                    margin: 3,
                                    style: 'border:0px;background:#FFF;',
                                    text: '<b>Mapa Google</b>',
                                    tooltip: 'Ver mapa google del lugar'                                                                      
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 25,
                            id: 'plnGaleria',
                            itemId: 'plnGaleria',
                            bodyStyle:'border:none;',
                            width: 92,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnGaleria',
                                    itemId: 'btnGaleria',
                                    idItem:'btnGaleria',
                                    margin: 3,
                                    style: 'border:0px;background:#FFF;',
                                    text: '<b>Galer&iacute;a Fotos</b>',
                                    tooltip: 'Ver fotos del lugar'                                    
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 25,
                            id: 'plnCampeonatos',
                            itemId: 'plnCampeonatos',
                            bodyStyle:'border:none;',
                            width: 92,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnCampeonatos',
                                    itemId: 'btnCampeonatos',
                                    idItem:'btnCampeonatos',
                                    margin: 3,
                                    style: 'border:0px;background:#FFF;',
                                    text: '<b>Campeonatos</b>',
                                    tooltip: 'Ver los campeonatos disponibles'                                    
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 25,
                            id: 'plnCanchas',
                            itemId: 'plnCanchas',
                            bodyStyle:'border:none;',
                            width: 92,
                            rowspan: 5,
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnCanchas',
                                    itemId: 'btnCanchas',
                                    idItem:'btnCanchas',
                                    margin: 3,
                                    style: 'border:0px;background:#FFF;',
                                    text: '<b>Canchas</br>',
                                    tooltip: 'Ver canchas disponibles'                                    
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 28,
                    id: 'plnDireccionReservar',
                    itemId: 'plnDireccionReservar',
                    bodyStyle:'border:none;',              
                    style:'margin-top:5px;',
                    width: 210,                    
                    items: [
                        {
                            xtype: 'label',                    
                            id: 'lblDireccionReservar',
                            itemId: 'lblDireccionReservar',                            
                            width: 210
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 28,
                    id: 'plnReservar',
                    itemId: 'plnReservar',
                    bodyStyle:'border:none;',                    
                    width: 210,
                    layout: {align: 'center',pack: 'center',type: 'vbox'},
                    items: [
                        {
                            xtype: 'button',
                            id: 'btnReservar',
                            itemId: 'btnReservar',
                            idItem:'btnReservar',
                            idInstalacion:'0',
                            nombreInstalacion:'',
                            direccion:'',
                            telefono:'',
                            encargado:'',
                            correo:'',
                            modoReservacion:'',
                            tooltip: 'Ver disponibilidad en esta cancha',
                            icon: 'resources/imagenes/reservar.png',
                            iconCls: 'x-btn-text-icon',
                            text: 'Reservar'                                    
                        }
                    ]
                }                                           
            ]            
        });

        me.callParent(arguments);
    }
});