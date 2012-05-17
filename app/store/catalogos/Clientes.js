Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.Clientes', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.Cliente',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getClientes}
           }

});