Ext.define('AJugarFutbol.view.panelCentral.Instalaciones' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.instalaciones',

    store: '',

    id: 'pnlInstalaciones',
    itemId: 'pnlInstalaciones',
    height: '100%',
    width:  '100%',
    border: '',
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'pnlInstalaciones01',
               height:'25%',
	       width: '100%',
               itemId: 'pnlInstalaciones01',
               id: 'plnInstalaciones01',     
               layout: 'fit',
               border: '',
               margin: '10px',
               html: '<br><h1>Aqui se desplegara la lista de las instalaciones:</h1> <br> <p> Instalaciones Futbol 5 Los Mejenguero </p>'
             }
            
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
