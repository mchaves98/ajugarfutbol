Ext.Loader.setConfig({
    enabled: true
});
Ext.application({
    
    name: 'AJugarFutbol',

    controllers: ['ViewportAdmx1', 'administracionx1.Administrador', 'administracionx1.Clientes',
                  'administracionx1.Contratos'],

    launch: function() {
        Ext.QuickTips.init();        
         aplicacion = this;
        var viewport = Ext.create('AJugarFutbol.view.ViewportAdmx1', {
            renderTo: Ext.getBody()
        });
        viewport.show();
    }
});