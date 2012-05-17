Ext.define('AJugarFutbol.view.mensaje.VerRespuesta', {
    extend: 'Ext.window.Window',
    config : {title: 'Respuesta al Mensade de:', idUsuarioDestino: '0', idUsuarioEnvia: '0', idMensaje: '0', iMensaje: '0', tipoEnvio: '0'},
    alias : 'widget.winVerRespuesta',
    id: 'winVerRespuesta',
    itemId: 'winVerRespuesta',
    height: 300,
    width: 683,
    maxHeight: 300,
    minHeight: 300, 
    minWidth: 683,
    maxWidth: 683,    
    layout: {type: 'fit'},
    //bodyStyle: 'border:none;background:#F2F2F2;',
    title: 'Respuesta a Mensaje',
    //modal: true,
    animateTarget: 'btnIngresarPrincipal',
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
                                    readOnly  : true, 
                                    height    : 240,
                                    width     : 318
                                   },
                                   {
                                    xtype     : 'textarea',
                                    padding   : '5 0 0 19',
                                    id        : 'txtMsj',
                                    labelAlign: 'top',
                                    fieldLabel     : 'Mensaje Recibido',
                                    itemId    : 'txtMsj',
                                    name      : 'txtMsj',
                                    readOnly  : true, 
                                    height    : 240,
                                    width     : 318
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