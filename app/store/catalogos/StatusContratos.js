Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.StatusContratos', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.StatusContrato',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getStatusContratos}
           }

});