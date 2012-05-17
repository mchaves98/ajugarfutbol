Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    
    name: 'AJugarFutbol',

    controllers: ['ViewportADM', 'administrador.Administrador','administrador.ReservasAdm', 'administrador.Clientes','administrador.EditarInstalacion'],

    launch: function() {
        Ext.QuickTips.init();        
         aplicacion = this;
        var viewport = Ext.create('AJugarFutbol.view.ViewportADM', {
            renderTo: Ext.getBody()
        });
        viewport.show();
    }
});