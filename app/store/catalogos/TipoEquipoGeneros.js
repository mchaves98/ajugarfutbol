Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.catalogos.TipoEquipoGeneros', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.catalogos.TipoEquipoGenero',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    catalogosDBExtJs.getTipoEquipoGenero}
           }

});
