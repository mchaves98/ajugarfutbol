   Ext.define('AJugarFutbol.view.reserva.ApruebaReto', {
       extend: 'Ext.window.Window',

    alias : 'widget.winApruebaReto',
    id: 'winApruebaReto',
    itemId: 'winApruebaReto',
    height: 440,
    width: 481,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Te estan retando',

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
                            bodyStyle: 'background:#DFE7EF;border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 101,
                                    width: 369,
                                    bodyStyle: 'background:#DFE7EF;border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblInfoRetador',
                                            itemId: 'lblInfoRetador',
                                            style: 'margin-top:5px;margin-left:10px;',
                                            value: '<b>Datos del Retador:</b>'                                            
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblNombreUsuario',
                                            itemId: 'lblNombreUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblTelefonoUsuario',
                                            itemId: 'lblTelefonoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Tel&eacute;fono',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCorreoUsuario',
                                            itemId: 'lblCorreoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Correo',
                                            labelWidth: 70
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
                                            id: 'imgRTFotoUsuario',
                                            itemId: 'imgRTFotoUsuario',
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
                            height: 226,
                            style: 'margin-left:5px;margin-top:10px;',
                            width: 461,
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaSolicitud',
                                    itemId: 'lblFechaSolicitud',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Solicitud',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta',
                                    itemId: 'lblFechaExacta',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHora',
                                    itemId: 'lblHora',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblTarifaReservacion',
                                    itemId: 'lblTarifaReservacion',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tarifa',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtComentarioReservacion',
                                    itemId: 'txtComentarioReservacion',
                                    style: 'margin-top:10px;margin-left:5px;',
                                    readOnly: true,
                                    fieldLabel: 'Comentarios',
                                    labelWidth: 140,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblNotaDetalle',
                                    itemId: 'lblNotaDetalle',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: '<b>Nota: Usted ser&aacute; inclu&iacute;do en una lista de retadores. Queda en espera de la decisi&oacute;n del retador.</b>',
                                    labelWidth: 110
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
                                    id: 'btnAceptaReto',
                                    itemId: 'btnAceptaReto',
                                    style: 'margin-left:45px;margin-top:10px;',
                                    width: 163,                                    
                                    estado:'',
                                    correoUsuario:'',
                                    fechayHora:'',
                                    icon: 'resources/imagenes/listo.png',
                                    text: '<b>Acepto el Reto</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelarReto',
                                    itemId: 'btnCancelarReto',                                    
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 163,
                                    text: 'Cancelar'
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