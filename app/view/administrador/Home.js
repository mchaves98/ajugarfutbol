Ext.define('AJugarFutbol.view.administrador.Home' ,{
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
                src: 'resources/imagenes/InicioAdmin5.png'
             }
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
