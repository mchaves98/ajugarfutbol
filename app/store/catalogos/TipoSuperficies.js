Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.TipoSuperficies', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.TipoSuperficie',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getTipoSuperficie}
           }

});