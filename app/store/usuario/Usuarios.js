Ext.direct.Manager.addProvider(Ext.app.REMOTING_API);

Ext.define('AJugarFutbol.store.usuario.Usuarios', {
    extend: 'Ext.data.Store',

    model: 'AJugarFutbol.model.usuario.Usuario',        
    autoLoad: true,
    		
    proxy: {type: 'direct',
            api: {read: usuarioDBExtJs.getUsuarios}
            }
});