Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.StatusClientes', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.StatusCliente',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getStatusClientes}
           }

});