Ext.define('AJugarFutbol.view.panelCentral.Retos' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.retos',

    store: '',

    id: 'plnRetos',
    itemId: 'plnRetos',
    height: '100%',
    width:  '100%',
    border: '',
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'plnRetos01',
               height:'25%',
	       width: '100%',
               itemId: 'plnRetos01',
               id: 'plnRetos01',     
               layout: 'fit',
               border: '',
               margin: '10px',
               html: '<br><h1>Aqui se desplegara la lista de los retos:</h1> <br> <p>Equipo Los Santos busca reto para los jueves a las 7pm en las instalaciones Pasion por el Futbol en Tres Rios. </p>'
             }
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
