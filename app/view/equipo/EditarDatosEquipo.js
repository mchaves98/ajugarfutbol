Ext.define('AJugarFutbol.view.equipo.EditarDatosEquipo', {
    extend: 'Ext.window.Window',
    config : {title: '', idEquipo: '0', fileEscudoOrig: '0', idItem: '0'},
    alias : 'widget.winEditarDatosEquipo',
    id: 'winEditarDatosEquipo',
    itemId: 'winEditarDatosEquipo',
    height: 341,
    width: 600,
    layout: {type: 'fit'},
    title: 'Enviar Mensaje',
    animateTarget: 'btnIngresarPrincipal',
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnPrincipalEscudo',
                    itemId: 'plnPrincipalEscudo',
                    bodyStyle: 'border:none;background:#F2F2F2;',
                       items: [
                                {
                                 xtype: 'panel',
                                 height: 120,
                                 id: 'plnCambiarEscudo',
                                 itemId: 'plnCambiarEscudo',
                                 layout: {type: 'column'},
                                 bodyStyle: 'border:none;',
                                 padding: '5 5 5 5',
                                 items: [
                                          {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnAtras',
                                            itemId: 'btnAnterior',
                                            icon: 'resources/imagenes/listo.png',
                                            style: 'margin-left:10px;margin-top:10px;',
                                            width: 70,
                                            text: 'Anterior'
                                          },
                                          {
                                            xtype: 'button',
                                            height: 101,
                                            width:  101,
                                            id: 'btnEscudo1',
                                            itemId: 'btnEscudo1',
                                            icon: 'resources/escudosEquipos/Escudo01.jpg',
                                            style: 'margin-left:10px;margin-top:10px;',
                                          },
                                          {
                                            xtype: 'button',
                                            height: 101,
                                            width:  101,
                                            id: 'btnEscudo2',
                                            itemId: 'btnEscudo2',
                                            icon: 'resources/escudosEquipos/Escudo03.jpg',
                                            style: 'margin-left:10px;margin-top:10px;'
                                          },
                                          {
                                            xtype: 'button',
                                            height: 101,
                                            width:  101,
                                            id: 'btnEscudo3',
                                            itemId: 'btnEscudo3',
                                            icon: 'resources/escudosEquipos/Escudo03.jpg',
                                            style: 'margin-left:10px;margin-top:10px;'
                                          },
                                          {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnSiguiente',
                                            itemId: 'btnSiguiente',
                                            icon: 'resources/imagenes/listo.png',
                                            style: 'margin-left:10px;margin-top:10px;',
                                            width: 70,
                                            text: 'Siguiente'
                                          }
                                      ]
                                }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});