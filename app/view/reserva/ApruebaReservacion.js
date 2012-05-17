   Ext.define('AJugarFutbol.view.reserva.ApruebaReservacion', {
       extend: 'Ext.window.Window',

    alias : 'widget.winApruebaReservacion',
    id: 'winApruebaReservacion',
    itemId: 'winApruebaReservacion',    
    height: 415,
    width: 481,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Aprobar Reservaci&oacute;n',

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
                                            id: 'lblNombreUsuario',
                                            itemId: 'lblNombreUsuario',
                                            style: 'margin-top:5px;margin-left:10px;',
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
                                        },
                                        {
                                            xtype: 'button',                                            
                                            id: 'btnMasInfoUsuario',
                                            itemId: 'btnMasInfoUsuario',
                                            icon: 'resources/imagenes/information.png',
                                            style: 'margin-left:10px',                                            
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
                                            id: 'imgARFotoUsuario',
                                            itemId: 'imgARFotoUsuario',
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
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaSolicitud',
                                    itemId: 'lblFechaSolicitud',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Solicitud',
                                    labelPad: -5,
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta',
                                    itemId: 'lblFechaExacta',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    labelPad: -5,
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHora',
                                    itemId: 'lblHora',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    labelPad: -5,
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtComentarioReservacion',
                                    itemId: 'txtComentarioReservacion',
                                    style: 'margin-top:5px;margin-left:5px;',                                    
                                    fieldLabel: 'Comentarios',
                                    labelPad: -5,
                                    labelWidth: 140 ,
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
                                    id: 'lblNotaDetalle',
                                    itemId: 'lblNotaDetalle',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: '<b>Nota: Aseg&uacute;rese de los datos del usuario. Recuerde que puede contactar al usuario antes de aprobar est&aacute; reservaci&oacute;n.</b>',
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
                                    id: 'btnAprobarReservacion',
                                    itemId: 'btnAprobarReservacion',
                                    style: 'margin-left:45px;margin-top:10px;',
                                    width: 163,
                                    idReservacion:'',
                                    estado:'',
                                    correoUsuario:'',
                                    icon: 'resources/imagenes/listo.png',
                                    text: '<b>Confirmar Reservaci&oacute;n</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelarReservacion',
                                    itemId: 'btnCancelarReservacion',
                                    icon: 'resources/imagenes/delete.png',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 163,
                                    text: '<b>Cancelar Reservaci&oacute;n</b>'
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