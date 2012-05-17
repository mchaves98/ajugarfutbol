Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    
    name: 'AJugarFutbol',

    controllers: ['Viewport', 'administrador.Administrador','administrador.ReservasAdm', 'administrador.Clientes','administrador.EditarInstalacion'],

    launch: function() {
        Ext.QuickTips.init();        
        aplicacion = this;
        var viewport = Ext.create('AJugarFutbol.view.Viewport', {
            renderTo: Ext.getBody()
        });
        viewport.show();
    }
});