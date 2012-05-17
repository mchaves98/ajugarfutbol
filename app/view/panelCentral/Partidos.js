Ext.define('AJugarFutbol.view.panelCentral.Partidos' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.partidos',

    store: '',

    id: 'plnPartidos',
    itemId: 'plnPartidos',
    height: '100%',
    width:  '100%',
    border: '',
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'plnPartidos01',
               height:'25%',
	       width: '100%',
               itemId: 'plnPartidos01',
               id: 'plnPartidos01',     
               layout: 'fit',
               border: '',
               margin: '10px',
               html: '<br><h1>Aqui se listaran todos los partidos que se estan organizando:</h1> <br> <p>Partido de mujeres el domingo 24 de diciembre a las 12md. Faltan 4 jugadoras. </p>'
             }
             
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
