Ext.define('AJugarFutbol.view.mensaje.ResponderMensaje', {
    extend: 'Ext.window.Window',
    config : {title: 'Responder Mensaje de:', Nombre: '', idUsuarioDestino: '0', idUsuarioEnvia: '0', idMensaje: '0', iMensaje: '0', tipoEnvio: '0'},
    alias : 'widget.winResponderMensaje',
    id: 'winResponderMensaje',
    itemId: 'winResponderMensaje',
    height: 370,
    width: 683,
    maxHeight: 370,
    minHeight: 370, 
    minWidth: 683,
    maxWidth: 683,    
    layout: {type: 'fit'},
    //bodyStyle: 'border:none;background:#F2F2F2;',
    title: 'Responder Mensaje',
    //modal: true,
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtRespuesta',
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
                            height    : 270,
                            padding   : '5 5 5 5',
                            bodyStyle: 'border:none;background:#F2F2F2;',
                            items: [{
                                    xtype     : 'textarea',
                                    padding   : '5 5 5 5',
                                    id        : 'txtRespuesta',
                                    itemId    : 'txtRespuesta',
                                    labelAlign: 'top',
                                    fieldLabel     : 'Respuesta',
                                    name      : 'txtRespuesta',
                                    height    : 240,
                                    width     : 318
                                   },
                                   {
                                    xtype     : 'textarea',
                                    padding   : '5 0 0 19',
                                    id        : 'txtMsj',
                                    labelAlign: 'top',
                                    fieldLabel: 'Mensaje a Responder',
                                    itemId    : 'txtMsj',
                                    name      : 'txtMsj',
                                    readOnly  : true, 
                                    height    : 240,
                                    width     : 318
                                   }
                                 ]      
                        },
                        {
                            xtype: 'panel',
                            height: 62,
                            id: 'plnBotones',
                            itemId: 'plnBotones',
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;',
                            padding: '5 5 5 5',
                            items: [
                                    {
                                      xtype: 'button',
                                      height: 32,
                                      id: 'btnResponderMsj',
                                      itemId: 'btnResponderMsj',
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