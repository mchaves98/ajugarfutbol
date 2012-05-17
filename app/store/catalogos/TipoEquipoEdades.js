Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.TipoEquipoEdades', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.TipoEquipoEdad',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getTipoEquipoEdad}
           }

});
