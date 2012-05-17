Ext.define('AJugarFutbol.view.panelCentral.Equipos' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.equipos',

    store: '',

    id: 'plnEquipos',
    itemId: 'plnEquipos',
    height: '100%',
    width:  '100%',
    border: '',
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'plnEquipos01',
               height:'25%',
	       width: '100%',
               itemId: 'plnEquipos01',
               id: 'plnEquipos01',     
               layout: 'fit',
               border: '',
               margin: '10px',
               html: '<br><h1>Aqui se Desplegara la lista de los equipos:</h1> <br> <p> Santos: Equipo Los Santos de futbol 5 de Cartago </p>'
             }
                       ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
