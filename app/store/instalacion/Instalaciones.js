Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.instalacion.Instalaciones', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.instalacion.Instalacion',
  
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read:    instalacionDBExtJs.getTodasInstalaciones}
           }

});