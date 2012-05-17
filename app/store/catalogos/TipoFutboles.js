Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.TipoFutboles', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.TipoFutbol',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getTipoFutbol}
           }

});
