Ext.define('AJugarFutbol.view.panelCentral.Home' ,{
    extend: 'Ext.panel.Panel',

    alias : 'widget.home',

    store: '',

    id: 'plnHome',
    itemId: 'plnHome',
    height: 600,
    width:  '100%',
    border: false,
    layout: 'auto',
    
    items: [
             {
               xtype: 'panel',
               alias: 'plnBienvenida01',
               height:'30%',
	       width: '100%',
               itemId: 'plnBienvenida01',
               id: 'plnBienvenida01',     
               layout: 'fit',
               border: '',
               style: {borderColor:'#000000'},
               margin: '10px',
               html: '<br><h1>Bienvenida:</h1> <br> <p> El mejor sitio para los mejengueros de corazon </p>'
             },
             {
              xtype: 'panel',
              alias: 'plnNoticias02',
              height:'25%',
	      width: '100%',
              itemId: 'plnNoticias02',
              id: 'plnNoticias02',    
              layout: 'fit',
              border: '',
              style: {borderColor:'#000000'},
              margin: '10px',
              html: '<h1>Noticias:</h1> <br> <p> Se busca equipos para jugaer los jueves a las 8pm en las Canchas de Don Pepe en Curridabat.</p>'
             }
          ],

    initComponent: function() {        	
        this.callParent(arguments);
    }
    
});
