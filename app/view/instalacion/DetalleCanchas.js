Ext.define('AJugarFutbol.view.instalacion.DetalleCanchas', {
    extend: 'Ext.panel.Panel',
	 alias : 'widget.winDetalleCanchas',
         
    height: 25,
    id: 'winDetalleCanchas',
    itemId: 'winDetalleCanchas',
    width: 455,
    layout: {type: 'column'},
    bodyStyle: 'border:none;',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'displayfield',
                    id: 'lblTipoFut',
                    itemId: 'lblTipoFut',
                    margin: 10,
                    width:65,
                    value: 'Display Field'
                },
                {
                    xtype: 'displayfield',
                    id: 'lblSuperficie',
                    itemId: 'lblSuperficie',
                    margin: 10,
                    width:80,
                    value: 'Display Field'
                },
                {
                    xtype: 'displayfield',
                    id: 'lblDimension',
                    itemId: 'lblDimension',
                    margin: 10,
                    width:80,
                    value: 'Display Field'
                },
                {
                    xtype: 'displayfield',
                    id: 'lblHoraInicio',
                    itemId: 'lblHoraInicio',
                    margin: 10,
                    width: 140,
                    value: 'Display Field'
                }
            ]
        });

        me.callParent(arguments);
    }
});