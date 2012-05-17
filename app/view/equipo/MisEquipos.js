Ext.define('AJugarFutbol.view.equipo.MisEquipos', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.winMisEquipos',
    id:     'winMisEquipos',
    itemId: 'winMisEquipos',
    width:760,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;', 
    items: [
        {xtype: 'panel',
                    id: 'plnMisEquipos',
                    itemId: 'plnMisEquipos',
                    width: 760,
                    layout: {columns: 2,type: 'table'},
                    bodyStyle:'background-color:transparent;border:none;'    
        }
        
    ],
    
    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);
      }
});