Ext.define('AJugarFutbol.view.equipo.IncluirJugadoresEquipo', {
    extend: 'Ext.window.Window',
    config : {title: 'Incluir Jugadores', idEquipo: '0', idUsuarioAdmin: '0'},
    alias : 'widget.winIncluirJugadoresEquipo',
    id:     'winIncluirJugadoresEquipo',
    itemId: 'winIncluirJugadoresEquipo',
    title: 'Incluyendo Jugadores al Equipo',
    animateTarget: 'btnIngresarPrincipal',
    closable: true,
    width: 630,
    layout: {type: 'fit'},
    closeAction : 'hide',
   
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                      xtype: 'panel',
                      id:     'plnJugadoresDisp',
                      itemId: 'plnJugadoresDisp',
                      padding: '5px 5px 5px 5px',
                      width: 617,
                      items: [
                                {
                                
                                    xtype: 'panel',
                                    id:     'pnlDvJugadoresDisp',
                                    itemId: 'pnlDvJugadoresDisp',
                                    width: 605,
                                    bodyStyle:'border:2px solid;',
                                    items: []
                                }]
                  }]
        });

        me.callParent(arguments);
    }
});