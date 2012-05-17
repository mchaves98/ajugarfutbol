Ext.define('AJugarFutbol.view.amigo.EnviarMensaje', {
    extend: 'Ext.window.Window',
    config : {title: 'Enviar Mensaje', idUsuarioEnvia: '0', idUsuarioDestino: '0', tipoEnvio: '0'},
    alias : 'widget.winEnviarMensaje',
    id: 'winEnviarMensaje',
    itemId: 'winEnviarMensaje',
    height: 341,
    width: 350,
    maxHeight: 341,
    minHeight: 341, 
    minWidth: 350,
    maxWidth: 350,    
    layout: {type: 'fit'},
    title: 'Enviar Mensaje',
    //modal: true,
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtMsj',
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnPrincipalMsj',
                    itemId: 'plnPrincipalMsj',
                    bodyStyle: 'border:none;background:#F2F2F2;',
                       items: [
                               {
                                xtype: 'form',
                                id: 'frmTextoMsj',
                                itemId: 'frmTextoMsj',
                                layout: {type: 'column'},
                                bodyStyle: 'border:none;background:#F2F2F2;',
                                height    : 240,
                                padding   : '5 5 5 5',
                                items: [{
                                        xtype     : 'textarea',
                                        padding   : '5 5 5 5',
                                        id        : 'txtMsj',
                                        itemId    : 'txtMsj',
                                        name      : 'txtMsj',
                                        height    : 220,
                                        width     : 318,
                                        enforceMaxLength : true,
                                        maxLength : 510,
                                        maxLengthText : 'Solo se permiten 500 caracteres en el mensaje!'
                                        
                                        
                                      }]
                                },
                                {
                                 xtype: 'panel',
                                 height: 55,
                                 id: 'plnBotones',
                                 itemId: 'plnBotones',
                                 layout: {type: 'column'},
                                 bodyStyle: 'border:none;',
                                 padding: '5 5 5 5',
                                 items: [
                                          {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnEnviarMsj',
                                            itemId: 'btnEnviarMsj',
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