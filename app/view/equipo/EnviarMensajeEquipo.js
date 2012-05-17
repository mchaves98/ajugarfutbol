Ext.define('AJugarFutbol.view.equipo.EnviarMensajeEquipo', {
    extend: 'Ext.window.Window',
    config : {title: 'Enviar Mensaje', idUsuarioEnvia: '', idEquipo: '0', nombreEquipo: '' },
    alias : 'widget.winEnviarMensajeEquipo',
    id: 'winEnviarMensajeEquipo',
    itemId: 'winEnviarMensajeEquipo',
    height: 341,
    width: 450,
    maxHeight: 241,
    minHeight: 241, 
    minWidth: 450,
    maxWidth: 450,    
    layout: {type: 'fit'},
    title: 'Enviar Mensaje',
    //modal: true,
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtMsjEq',
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnPrincipalMsjEq',
                    itemId: 'plnPrincipalMsjEq',
                    bodyStyle: 'border:none;background:#F2F2F2;',
                       items: [
                               {
                                xtype: 'form',
                                id: 'frmTextoMsjEq',
                                itemId: 'frmTextoMsjEq',
                                layout: {type: 'column'},
                                bodyStyle: 'border:none;background:#F2F2F2;',
                                height    : 140,
                                padding   : '5 5 5 5',
                                items: [{
                                        xtype     : 'textarea',
                                        padding   : '5 5 5 5',
                                        id        : 'txtMsjEq',
                                        itemId    : 'txtMsjEq',
                                        name      : 'txtMsjEq',
                                        height    : 120,
                                        width     : 418,
                                        enforceMaxLength : true,
                                        maxLength : 510,
                                        maxLengthText : 'Solo se permiten 500 caracteres en el mensaje!'
                                        
                                        
                                      }]
                                },
                                {
                                 xtype: 'panel',
                                 height: 55,
                                 id: 'plnBotonesMsgEq',
                                 itemId: 'plnBotonesMsgEq',
                                 layout: {type: 'column'},
                                 bodyStyle: 'border:none;',
                                 padding: '5 5 5 5',
                                 items: [
                                          {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnEnviarMsjEq',
                                            itemId: 'btnEnviarMsjEq',
                                            icon: 'resources/imagenes/listo.png',
                                            style: 'margin-left:10px;margin-top:10px;',
                                            width: 148,
                                            text: 'Enviar'
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