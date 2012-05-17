   Ext.define('AJugarFutbol.view.reserva.ConfirmaReservacion', {
       extend: 'Ext.window.Window',

    alias : 'widget.winConfirmaReservacion',
    id: 'winConfirmaReservacion',
    itemId: 'winConfirmaReservacion',
    height: 405,
    width: 480,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Confirmaci&oacute;n de Reservaci&oacute;n',

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
                            height: 85,
                            width: 473,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    defaults: {name: 'tipo'},
                                    height: 22,
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 400,
                                    colspan: 2,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbPersonal',
                                            itemId: 'rdbPersonal',
                                            boxLabel: '<span style="font-size:15px;">Personal</span>',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbReto',
                                            itemId: 'rdbReto',                                            
                                            boxLabel: '<span style="font-size:15px;">Busco un Reto</span>'
                                        }                                      
                                    ]
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkCREquipo',
                                    itemId: 'chkCREquipo',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    boxLabel: 'Avisar a mi equipo'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmbCREquipos',
                                    itemId: 'cmbCREquipos',
                                    width: 300,
                                    queryMode: 'local', 
                                    selectOnFocus: true,
                                    editable:false,
                                    typeAhead: true,
                                    style: 'margin-left:10px;margin-top:10px;',
                                    emptyText: 'Seleccione el Equipo'                            
                                }
                            ]
                        }, 
                        {
                            xtype: 'fieldset',
                            height: 200,
                            style: 'margin-left:5px;margin-top:10px;',
                            width: 461,
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n</span>',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblLugarReservacion',
                                    itemId: 'lblLugarReservacion',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Lugar'                                    
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta',
                                    itemId: 'lblFechaExacta',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha y hora'                                    
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblTarifaReservacion',
                                    itemId: 'lblTarifaReservacion',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tarifa'                                    
                                },
                                {
                                    xtype: 'textareafield',
                                    id: 'txtComentarioReservacion',
                                    itemId: 'txtComentarioReservacion',
                                    emptyText: 'Puedes escribir algún comentario sobre la reservación (opcional).',
                                    style: 'margin-top:10px;margin-left:5px;',
                                    fieldLabel: 'Comentario',
                                    maxLength: 100,
                                    maxLengthText: 'El comentario debe tener un m&aacute;ximo de 100 caracteres.',                                    
                                    height: 45,                                    
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblNotaDetalle',
                                    itemId: 'lblNotaDetalle',                                    
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Nota:',
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
                                    id: 'btnConfirmaReservacion',
                                    itemId: 'btnConfirmaReservacion',
                                    style: 'margin-left:45px;margin-top:10px;',
                                    icon: 'resources/imagenes/listo.png',
                                    width: 163,
                                    fechayHora:'',
                                    estado:'',
                                    text: '<b>Confirmar Reservaci&oacute;n</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelaReservacion',
                                    itemId: 'btnCancelaReservacion',
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