Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.Vendedores', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.Vendedor',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getVendedores}
           }

});