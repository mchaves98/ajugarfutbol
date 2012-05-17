   Ext.define('AJugarFutbol.view.reserva.CancelarReservacion', {
       extend: 'Ext.window.Window',

    alias : 'widget.winCancelarReservacion',
    id: 'winCancelarReservacion',
    itemId: 'winCancelarReservacion',
    height: 415,
    width: 481,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Cancelar Reservaci&oacute;n',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {columns: 1,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 101,
                            width: 471,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'background:#F2F2F2;border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 101,
                                    width: 369,
                                    bodyStyle: 'background:#DFE7EF;border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCRNombreUsuario',
                                            itemId: 'lblCRNombreUsuario',
                                            style: 'margin-top:5px;margin-left:10px;b',
                                            value: 'Display Field',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCRTelefonoUsuario',
                                            itemId: 'lblCRTelefonoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Tel&eacute;fono',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCRCorreoUsuario',
                                            itemId: 'lblCRCorreoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Correo',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'button',                                            
                                            id: 'btnMasInfoUsuario',
                                            itemId: 'btnMasInfoUsuario',
                                            icon: 'resources/imagenes/information.png',
                                            style: 'margin-left:10px;',                                            
                                            text: 'Mas informaci&oacute;n...',
                                            idUsuario:''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 101,
                                    width: 101,
                                    layout: {type: 'fit'},
                                    bodyStyle: 'background:#DFE7EF;border:none;',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'imgCRFotoUsuario',
                                            itemId: 'imgCRFotoUsuario',
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
                            height: 201,
                            style: 'margin-left:5px;margin-top:10px;',
                            width: 461,
                            layout: {columns: 2,type: 'table'},
                            title: 'Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblCRFechaSolicitud',
                                    itemId: 'lblCRFechaSolicitud',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Solicitud',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblCRFechaExacta',
                                    itemId: 'lblCRFechaExacta',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblCRHora',
                                    itemId: 'lblCRHora',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtCRComentarioReservacion',
                                    itemId: 'txtCRComentarioReservacion',
                                    style: 'margin-top:5px;margin-left:5px;',                                    
                                    fieldLabel: 'Comentarios',
                                    labelWidth: 140,
                                    width: 365
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnEditaComentarioReservacion',
                                    itemId: 'btnEditaComentarioReservacion',
                                    icon: 'resources/imagenes/disk.png',
                                    style: 'border:0px;background:#FFF;margin-bottom:28px;margin-right:8px;',//DFE7EF
                                    text: '<b>Guardar</b>'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblCRNotaDetalle',
                                    itemId: 'lblCRNotaDetalle',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: '<b>Nota: Aseg&uacute;rese de revisar bien los datos antes de cancelar est&aacute; reservaci&oacute;n.<b>',
                                    labelWidth: 110,
                                    colspan:2
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
                                    id: 'btnCRCancelarReservacion',
                                    itemId: 'btnCRCancelarReservacion',
                                    style: 'margin-left:45px;margin-top:10px;',
                                    width: 163,
                                    idReservacion:'',
                                    correoUsuario:'',
                                    estado:'',
                                    icon: 'resources/imagenes/delete.png',
                                    text: '<b>Cancelar Reservaci&oacute;n</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCRSalir',
                                    itemId: 'btnCRSalir',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 163,
                                    text: 'Salir'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});