Ext.define('AJugarFutbol.view.mensaje.MisMensajes', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.winMisMensajes',
    id: 'winMisMensajes',
    itemId: 'winMisMensajes',
    width:730,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;', 
    items: [
        {           
            xtype: 'panel',
            id: 'plnMisMensajes',
            itemId: 'plnMisMensajes',
            layout: {columns: 1,type: 'table'},
            bodyStyle:'background-color:transparent;border:none;'    
        }
       
    ],
    
    initComponent: function() {
        var me = this;
   
        me.callParent(arguments);
   
       },
       
    beforeLayout: function() {
       //if (layoutMisMensajes) {console.log('beforeLayout1 true'); } else {console.log('beforeLayout1 false');}
       return layoutMisMensajes; },
   
    beforeComponentLayout: function() {
                      //if (layoutMisMensajes) {console.log('beforeComponetLayout1 true'); } else {console.log('beforeComponetLayout1 false');}
                      return layoutMisMensajes; }
   
});