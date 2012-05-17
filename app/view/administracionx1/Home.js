Ext.define('AJugarFutbol.view.administracionx1.Home' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.home',
    id: 'plnHome',
    itemId: 'plnHome',    
    width:  770,
    height: 600,
    border: false,
    layout: 'fit',
    
    items: [
             {
                xtype: 'image',                            
                itemId: 'imgEILogoInstalacion',                
                src: 'resources/imagenes/InicioAdminV3.png'
             }
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
