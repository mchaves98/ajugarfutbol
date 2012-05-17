   Ext.define('AJugarFutbol.view.reserva.ApruebaRetoAdm', {
       extend: 'Ext.window.Window',

    alias : 'widget.winApruebaRetoAdm',
    id: 'winApruebaRetoAdm',
    itemId: 'winApruebaRetoAdm',
    height: 404,
    width: 991,
    layout: {columns: 3,type: 'table'},
    bodyStyle: 'border:none;background:white;',
    title: 'Reto Aprobado',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 370,
                    width: 472,
                    layout: {columns: 1,type: 'table'},
                    bodyStyle: 'border:none;background:white;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 120,
                            width: 471,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'background:#DFE7EF;border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 120,
                                    width: 369,
                                    bodyStyle: 'background:#DFE7EF;border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblInfoRetador1',
                                            itemId: 'lblInfoRetador1',
                                            style: 'margin-top:5px;margin-left:10px;',
                                            value: '<b>Datos del Retador:</b>'                                            
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblNombreUsuario1',
                                            itemId: 'lblNombreUsuario1',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblTelefonoUsuario1',
                                            itemId: 'lblTelefonoUsuario1',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Tel&eacute;fono',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCorreoUsuario1',
                                            itemId: 'lblCorreoUsuario1',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Correo',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'button',                                            
                                            id: 'btnMasInfoUsuario1',
                                            itemId: 'btnMasInfoUsuario1',
                                            icon: 'resources/imagenes/information.png',
                                            style: 'margin-left:10px;',                                            
                                            text: 'Mas informaci&oacute;n...',
                                            idUsuario:''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 120,
                                    width: 101,
                                    layout: {type: 'fit'},
                                    bodyStyle: 'background:#DFE7EF;border:none;',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'imgRTFotoUsuario1',
                                            itemId: 'imgRTFotoUsuario1',
                                            height: 80,
                                            width: 200,
                                            src: 'resources/imagenes/desconocido.jpg'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 170,
                            style: 'margin-left:5px;margin-top:10px;',
                            width: 461,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaSolicitud1',
                                    itemId: 'lblFechaSolicitud1',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Solicitud',
                                    labelWidth: 140,
                                    colspan:2
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta1',
                                    itemId: 'lblFechaExacta1',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHora1',
                                    itemId: 'lblHora1',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                /*{
                                    xtype: 'displayfield',
                                    id: 'lblTarifaReservacion1',
                                    itemId: 'lblTarifaReservacion1',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tarifa',
                                    labelWidth: 140
                                },*/
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtComentarioReservacion1',
                                    itemId: 'txtComentarioReservacion1',
                                    style: 'margin-top:5px;margin-left:5px;',                                    
                                    fieldLabel: 'Comentarios',
                                    labelWidth: 140,
                                    width: 365
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnEditaComentarioReservacion1',
                                    itemId: 'btnEditaComentarioReservacion1',
                                    icon: 'resources/imagenes/disk.png',
                                    style: 'border:0px;background:#FFF;margin-bottom:28px;margin-right:8px;',//DFE7EF
                                    text: '<b>Guardar</b>'
                                }                           
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 58,
                            width: 465,
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelarReto1',
                                    itemId: 'btnCancelarReto1',   
                                    icon: 'resources/imagenes/delete.png',
                                    idReservacion:'',
                                    correoUsuario:'',
                                    fechayHora:'',
                                    style: 'margin-left:151px;margin-top:10px;',                                    
                                    text: 'Cancelar al Retador'
                                }
                            ]
                        }
                    ]
                },
                {
                        xtype: 'image',                    
                        height: 60,
                        width: 42,
                        style:'margin-bottom:290px;',                        
                        src: 'resources/imagenes/VS-Logo.png'
                },                
                {
                    xtype: 'panel',
                    layout: {columns: 1,type: 'table'},
                    height: 370,
                    width: 481,
                    bodyStyle: 'border:none;background:white;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 120,
                            width: 471,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'background:#DFE7EF;border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 120,
                                    width: 369,
                                    bodyStyle: 'background:#DFE7EF;border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblInfoRetador2',
                                            itemId: 'lblInfoRetador2',
                                            style: 'margin-top:5px;margin-left:10px;',
                                            value: '<b>Datos del Contrincante:</b>'                                            
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblNombreUsuario2',
                                            itemId: 'lblNombreUsuario2',
                                            style: 'margin-left:10px;',
                                            width: 350,                                            
                                            fieldLabel: 'Nombre',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblTelefonoUsuario2',
                                            itemId: 'lblTelefonoUsuario2',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            width: 350,
                                            fieldLabel: 'Tel&eacute;fono',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCorreoUsuario2',
                                            itemId: 'lblCorreoUsuario2',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            width: 350,
                                            fieldLabel: 'Correo',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'button',                                            
                                            id: 'btnMasInfoUsuario2',
                                            itemId: 'btnMasInfoUsuario2',
                                            icon: 'resources/imagenes/information.png',
                                            style: 'margin-left:10px;',                                            
                                            text: 'Mas informaci&oacute;n...',
                                            idUsuario:''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 120,
                                    width: 101,
                                    layout: {type: 'fit'},
                                    bodyStyle: 'background:#F2F2F2;border:none;',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'imgRTFotoUsuario2',
                                            itemId: 'imgRTFotoUsuario2',
                                            height: 80,
                                            width: 200,
                                            src: 'resources/imagenes/desconocido.jpg'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 170,
                            style: 'margin-left:5px;margin-top:10px;',
                            layout: {columns: 2,type: 'table'},
                            width: 461,
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaSolicitud2',
                                    itemId: 'lblFechaSolicitud2',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    width: 400,
                                    fieldLabel: 'Fecha de Solicitud',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta2',
                                    itemId: 'lblFechaExacta2',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHora2',
                                    itemId: 'lblHora2',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                /*{
                                    xtype: 'displayfield',
                                    id: 'lblTarifaReservacion2',
                                    itemId: 'lblTarifaReservacion2',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tarifa',
                                    labelWidth: 140
                                },*/
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtComentarioReservacion2',
                                    itemId: 'txtComentarioReservacion2',
                                    style: 'margin-top:5px;margin-left:5px;',                                    
                                    fieldLabel: 'Comentarios',
                                    labelWidth: 140,
                                    width: 365
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnEditaComentarioReservacion2',
                                    itemId: 'btnEditaComentarioReservacion2',
                                    icon: 'resources/imagenes/disk.png',
                                    style: 'border:0px;background:#FFF;margin-bottom:28px;margin-right:8px;',//DFE7EF
                                    text: '<b>Guardar</b>'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 58,
                            width: 465,
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;',
                            items: [                                
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelarReto2',
                                    itemId: 'btnCancelarReto2',
                                    icon: 'resources/imagenes/delete.png',
                                    idReservacion:'',
                                    correoUsuario:'',
                                    fechayHora:'',                                    
                                    style: 'margin-left:151px;margin-top:10px;',                                    
                                    text: 'Cancelar que Acepto el Reto'
                                }
                            ]
                        }
                    ]
                },
                {
                        xtype: 'button',
                        height: 30,                        
                        id: 'btnConfirmaReto',
                        itemId: 'btnConfirmaReto',
                        icon: 'resources/imagenes/che.png',                                                                     
                        style: 'margin-left:390px;',   
                        colspan:3,
                        text: 'Confirmo al Retador y al Contrincante'
                }
            ]
        });

        me.callParent(arguments);
    }
});