Ext.define('AJugarFutbol.view.administrador.BloqueoCancha' ,{
   extend: 'Ext.window.Window',

    height: 400,
    width: 770,
    layout: {columns: 2,type: 'table'},
    bodyStyle: 'border:none;background:#FFF;',
    title: 'Bloquear Cancha',
    alias : 'widget.winBloqueoCancha',  
    id: 'winBloqueoCancha',
    itemId: 'winBloqueoCancha',
    animateTarget: 'btnBloqueadaCalendario',
    shadow : 'drop', 
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldset',
                    itemId: 'plnListadoBloqueosCancha',
                    autoScroll:true,
                    height: 365,
                    width: 373,             
                    style:'margin-left:5px;',
                    title: '<span style="font-size:15px;">Listado de  Bloqueos</span>'                    
                },
                {
                    xtype: 'fieldset',
                    height: 365,
                    width: 373,
                    style:'margin-left:5px;',
                    title: '<span style="font-size:15px;">Nuevo Bloqueo</span>',
                    items: [
                        {
                            xtype: 'displayfield',
                            itemId: 'lblTituloCanchaBloqueo',
                            fieldLabel: 'Cancha',
                            margin: 10,
                            value: '<span style="font-size:15px;"><b>Cueva bajo techo</b></span>'
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dateInicioBloqueo',
                            margin: 10,
                            width: 226,
                            fieldLabel: 'Fecha de Inicio',
                            minValue: new Date(),  
                            format: 'd/m/Y',
                            editable: false
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'dateFinalBloqueo',
                            margin: 10,
                            width: 226,
                            fieldLabel: 'Fecha Final ',
                            minValue: new Date(),
                            format: 'd/m/Y',
                            editable: false
                        },
                        {
                            xtype: 'timefield',
                            itemId: 'timeInicioBloqueo',
                            margin: 10,
                            width: 226,
                            fieldLabel: 'Hora de Inicio',
                            editable: false,
                            maxValue: '10:00 PM',
                            minValue: '08:00 AM',
                            increment: 60
                        },
                        {
                            xtype: 'timefield',
                            itemId: 'timeFinalBloqueo',
                            margin: 10,
                            width: 226,
                            fieldLabel: 'Hora Final',
                            editable: false,
                            maxValue: '11:00 PM',
                            minValue: '08:00 AM',
                            increment: 60
                        },
                        {
                            xtype: 'textareafield',
                            itemId: 'txtComentarioBloqueo',
                            height: 60,
                            margin: 10,
                            width: 322,
                            emptyText: 'Escribe alg\u00FAn comentario sobre este bloqueo (Opcional)',
                            fieldLabel: 'Comentario'
                        },
                        {
                            xtype: 'radiogroup',
                            id:'grupoAvisoOmitir',
                            itemId: 'grupoAvisoOmitir',
                            height: 27,                                    
                            style: 'margin-top:10px;margin-left:10px;',
                            width: 350,                                    
                            fieldLabel: '<b>Importante</b>',
                            columns:1,
                            vertical:true,                                    
                            items: [
                                {
                                    xtype: 'radiofield',       
                                    id:'rdbAvisarBloqueoCliente',
                                    itemId: 'rdbAvisarBloqueoCliente',                                            
                                    name:'prueba',
                                    checked:true,
                                    readOnly:false,
                                    boxLabel: 'Avisarme si existen reservaciones'                                            
                                },
                                {
                                    xtype: 'radiofield',               
                                    id:'rdbOmitirBloqueoCliente',
                                    name:'prueba',
                                    itemId: 'rdbOmitirBloqueoCliente',
                                    boxLabel: 'Omitir reservaciones realizadas'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 60,
                            margin: 20,
                            width: 341,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnAccionBloqueo',
                                    height: 45,
                                    style: 'margin-left:18px;margin-top:10px;',
                                    width: 135,
                                    text: 'Bloquear'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnSalirBloqueo',
                                    height: 45,
                                    style: 'margin-top:10px;margin-left:20px;',
                                    width: 135,
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