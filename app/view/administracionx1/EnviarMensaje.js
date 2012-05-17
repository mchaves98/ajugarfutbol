Ext.define('AJugarFutbol.view.administracionx1.EnviarMensaje' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.winEnviarMensaje',

    id: 'winEnviarMensaje',
    itemId: 'winEnviarMensaje',
    height: 195,
    style: 'background:#FFF;',
    width: 399,
    bodyStyle: 'border:none;background:#FFF;',
    title: 'Enviar Mensaje',
    defaultFocus: 'txtMensajeCorreo',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'textareafield',
                    itemId: 'txtMensajeCorreo',
                    height: 91,
                    margin: 15,
                    width: 357,
                    fieldLabel: 'Mensaje',
                    labelPad: -30
                },
                {
                    xtype: 'button',
                    itemId: 'btnEnviaMensaje',
                    height: 35,
                    style: 'margin-left:20px;',
                    width: 351,
                    text: '<span style="font-size:15px;"><b>Enviar Mensaje</b></span>'
                }
            ]
        });

        me.callParent(arguments);
    }
});