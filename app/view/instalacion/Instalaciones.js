Ext.define('AJugarFutbol.view.instalacion.Instalaciones' ,{
    extend: 'Ext.panel.Panel',
    
    alias : 'widget.winInstalaciones',  

    height: 489,
    id: 'plnVentanaInstalaciones',
    itemId: 'plnVentanaInstalaciones',
    width: 770,
    bodyStyle: 'border:none',

    initComponent: function() {
        var me = this;

        var form=Ext.applyIf(me, {
            items: [               
           {
                xtype: 'form',
                height: 489,
                width: 770,                 
                id: 'plnInstalaciones',                            
                itemId: 'plnInstalaciones',
                bodyStyle: 'border:none',
                layout: {type: 'column'},
                //layout: {columns: 3,type: 'table'}  
                dockedItems: [
                        {
                            xtype: 'pagingtoolbar',
                            id: 'pagTool',
                            itemId: 'pagTool',                            
                            afterPageText: 'de {0}',
                            beforePageText: 'Página',
                            firstText: 'Primera Página',
                            lastText: 'Última Página',
                            nextText: 'Siguiente',
                            prevText: 'Anterior',
                            refreshText: 'Refrescar',
                            dock: 'bottom'
                        }
                    ],
                  handler: function(){
                    form.getForm().load({
                        //url: 'xml-form-data.xml',
                        waitMsg: 'Buscando...'
                    });}
              }
            ]
         });

        me.callParent(arguments);
    }
});