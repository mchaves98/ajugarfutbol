Ext.define('AJugarFutbol.view.instalacion.Canchas', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winCanchas',
         
    height: 265,
    id: 'winCanchas',
    itemId: 'winCanchas',
    style: 'border:none;',
    width: 743,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Descripci&oacute;n de Canchas',    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {columns: 2,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'image',
                            height: 235,
                            id: 'imgFotoCancha',
                            itemId: 'imgFotoCancha',
                            width: 257,
                            src: '',
                            rowspan: 3
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblCantidadCanchas',
                            itemId: 'lblCantidadCanchas',
                            margin: 10,
                            width: 262,
                            value: '<b>Ejemplo</b>'
                        },
                        {
                            xtype: 'panel',
                            id: 'fdsCanchas',
                            itemId: 'fdsCanchas',
                            height: 180,
                            margin: 10,
                            width: 460,
                            autoScroll:true,
                            layout: {type: 'column'},
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblTipoFut',
                                    itemId: 'lblTipoFut',
                                    margin: 10,
                                    width:65,
                                    value: '<b>Tipo</b>'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblSuperficie',
                                    itemId: 'lblSuperficie',
                                    margin: 10,
                                    width:80,
                                    value: '<b>Superficie</b>'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblDimension',
                                    itemId: 'lblDimension',
                                    margin: 10,
                                    width:80,
                                    value: '<b>Dimensiones</b>'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHoraInicio',
                                    itemId: 'lblHoraInicio',
                                    margin: 10,
                                    width: 140,
                                    value: '<b>Horario disponibles</b>'
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