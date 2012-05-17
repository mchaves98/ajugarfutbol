Ext.define('AJugarFutbol.view.panelCentral.Reservar' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.reservar',

    store: '',

    id: 'plnReservar',
    itemId: 'plnReservar',
    height: '100%',
    width:  '100%',
    border: '',
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'plnReservar01',
               height:'25%',
	       width: '100%',
               itemId: 'plnReservar01',
               id: 'plnReservar01',     
               layout: 'fit',
               border: '',
               margin: '10px',
               html: '<br><h1>En esta pantalla se haran las reservaciones de las canchas:</h1>'
             }
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
