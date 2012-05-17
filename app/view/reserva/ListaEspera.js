   Ext.define('AJugarFutbol.view.reserva.ListaEspera', {
       extend: 'Ext.window.Window',

    alias : 'widget.winListaEspera',
    id: 'winListaEspera',
    itemId: 'winListaEspera',
    modal:true,
    height: 400,
    width: 481,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Lista de Espera - Reservaci&oacute;n',

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
                            height: 80,
                            width: 471,
                            layout: {columns: 1,type: 'table'},
                            bodyStyle: 'background:#DFE7EF;border:none;',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblLEInfo',
                                    itemId: 'lblLEInfo',
                                    style: 'margin-top:10px;margin-left:10px;',
                                    value: 'Display Field',
                                    width: 450
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmbLEListaEspera',
                                    itemId: 'cmbLEListaEspera',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    displayField: 'infoBasic', 
                                    comentario: 'comentario', 
                                    valueField: 'id',
                                    store:usuarioListaEspera,
                                    queryMode: 'local',                                         
                                    editable:false,
                                    forceSelection: true,                                     
                                    width: 455,
                                    emptyText: 'Seleccione el nombre del cliente',
                                    colspan: 2
                                }                                
                                /*{
                                    xtype: 'panel',
                                    height: 101,
                                    width: 369,
                                    bodyStyle: 'background:#F2F2F2;border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblLENombreUsuario',
                                            itemId: 'lblLENombreUsuario',
                                            style: 'margin-top:10px;margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblLETelefonoUsuario',
                                            itemId: 'lblLETelefonoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Tel&eacute;fono',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblLECorreoUsuario',
                                            itemId: 'lblLECorreoUsuario',
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
                                    bodyStyle: 'background:#F2F2F2;border:none;',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'imgLEFotoUsuario',
                                            itemId: 'imgLEFotoUsuario',
                                            height: 80,
                                            width: 200,
                                            src: 'resources/imagenes/desconocido.jpg'
                                        }
                                    ]
                                }*/
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 201,
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
                                    value: '<b>Nota: Aseg&uacute;rese de los datos del usuario. Recuerde que puede contactar al usuario antes de aprobar est&aacute; reservaci&oacute;n.</b>',
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
                                    id: 'btnLEListaEspera',
                                    itemId: 'btnLEListaEspera',
                                    style: 'margin-left:45px;margin-top:10px;',
                                    width: 163,
                                    fechayHora:'', 
                                    estado:'', 
                                    icon: 'resources/imagenes/listo.png',
                                    text: '<b>Aprobar Reservaci&oacute;n</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnLECancelarReservacion',
                                    itemId: 'btnLECancelarReservacion',
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