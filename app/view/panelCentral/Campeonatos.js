Ext.define('AJugarFutbol.view.panelCentral.Campeonatos' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.campeonatos',

    store: '',

    id: 'plnCampeonatos',
    itemId: 'plnCampeonatos',
    height: '100%',
    width:  '100%',
    border: '',
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'plnCampeonatos01',
               height:'25%',
	       width: '100%',
               itemId: 'plnCampeonatos01',
               id: 'plnCampeonatos01',     
               layout: 'fit',
               border: '',
               margin: '10px',
               html: '<br><h1>Aqui se desplegara la lista de los campeonatos:</h1> <br> <p> Campeonato la Copa del Rey.</p>'
             }
             
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
