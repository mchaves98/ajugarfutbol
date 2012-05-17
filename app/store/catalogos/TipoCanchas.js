Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.TipoCanchas', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.TipoCancha',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getTipoCancha}
           }

});