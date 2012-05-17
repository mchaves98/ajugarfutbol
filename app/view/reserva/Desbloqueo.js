   Ext.define('AJugarFutbol.view.reserva.Desbloqueo', {
       extend: 'Ext.window.Window',

    alias : 'widget.winDesbloqueo',
    id: 'winDesbloqueo',
    itemId: 'winDesbloqueo',
    height: 235,
    width: 460,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Desbloquear',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    bodyStyle: 'border:none;background:#DFE7EF;',
                    layout: {columns: 2,type: 'table'},
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lblDesFechaSolicitud',
                            itemId: 'lblDesFechaSolicitud',                                                    
                            fieldLabel: 'Fecha de Bloqueo',
                            style: 'margin-left:10px;margin-top:5px;',
                            colspan:2,         
                            labelWidth: 140,
                            labelPad: -15
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblDesFecha',
                            itemId: 'lblDesFecha',   
                            style: 'margin-left:10px;margin-top:5px;',
                            fieldLabel: 'Fecha',
                            colspan:2,
                            labelWidth: 140,
                            labelPad: -15
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblDesHora',
                            itemId: 'lblDesHora',                                                     
                            fieldLabel: 'Hora',
                            style: 'margin-left:10px;margin-top:5px;',
                            colspan:2,
                            labelWidth: 140,
                            labelPad: -15
                        },
                        {
                            xtype: 'textareafield',
                            height: 45,
                            id: 'txtComentarioBloqueo',
                            itemId: 'txtComentarioBloqueo',
                            style: 'margin-top:5px;margin-left:10px;',                                    
                            fieldLabel: 'Comentarios',                            
                            width: 377
                        },
                        {
                            xtype: 'button',
                            id: 'btnEditaComentarioBloqueo',
                            itemId: 'btnEditaComentarioBloqueo',
                            icon: 'resources/imagenes/editar.png',
                            style: 'border:0px;background:#DFE7EF;margin-bottom:28px;margin-right:8px;',//DFE7EF
                            text: '<b>Editar</b>'
                        },
                        {
                            xtype: 'panel',
                            height: 75,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'border:none;',
                            colspan:2,
                            items: [
                                {
                                    xtype: 'button',
                                    height: 42,
                                    id: 'btnDesbloquear',
                                    idReservacion:'',
                                    itemId: 'btnDesbloquear',
                                    width: 107,
                                    style: 'margin-left:100px;margin-top:15px;',
                                    text: '<b>Desbloquear</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 42,
                                    id: 'btnSalirDesbloqueo',
                                    itemId: 'btnSalirDesbloqueo',
                                    style: 'margin-left:50px;margin-top:15px;',
                                    width: 107,
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