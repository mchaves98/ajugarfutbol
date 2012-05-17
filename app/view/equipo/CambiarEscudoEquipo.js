Ext.define('AJugarFutbol.view.equipo.CambiarEscudoEquipo', {
    extend: 'Ext.window.Window',
    config : {title: '', idEquipo: '0', fileEscudoOrig: '0', idItem: '0'},
    alias : 'widget.winCambiarEscudoEquipo',
    id: 'winCambiarEscudoEquipo',
    itemId: 'winCambiarEscudoEquipo',
    title: 'Cambiando Escudo',
    animateTarget: 'btnIngresarPrincipal',
    closable: true,
    width: 652,
    height: 220,
    maxWidth: 652,
    minWidth: 652,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                      xtype: 'panel',
                      id: 'plnEscudos',
                      itemId: 'plnEscudos',
                      padding: '5px 5px 5px 5px',
                      html: '<b><font size="3" face="arial" color="blue">Dar click sobre el escudo que desea utilizar.</font></b>',
                      items: [
                                {
                                
                                    xtype: 'panel',
                                    id: 'pnlDvEscudos',
                                    itemId: 'pnlDvEscudos',
                                    autoScroll: true,
                                    width: 632,
                                    items: []
                                }]
                  }]
        });

        me.callParent(arguments);
    }
});