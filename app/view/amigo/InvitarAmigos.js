   Ext.define('AJugarFutbol.view.amigo.InvitarAmigos', {
   extend: 'Ext.panel.Panel',
     alias : 'widget.winInvitarAmigos',
    
    height: 350,
    id: 'plnInvitarAmigos',
    itemId: 'plnInvitarAmigos',
    width: 750,
    layout: {
        columns: 1,
        type: 'table'
    },
    bodyStyle:'background-color:transparent;border:none;',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnAmigos',
                    itemId: 'plnAmigos',
                    width: 750,
                    bodyStyle:'background-color:transparent;border:none;',
                    layout: {columns: 1,type: 'table'},
    
                    items: [
                            {
                            xtype: 'panel',
                            id: 'plnAmigo0',
                            itemId: 'plnAmigo0',
                            width: 750,
                            height: 52,
                            bodyStyle:'background-color:transparent;border:none;',
                            layout: {columns: 3,type: 'table'},

                            items: [
                                   {
                                    xtype: 'textfield',
                                    id: 'txtCorreo0',
                                    itemId: 'txtCorreo0',
                                    margin: 25,
                                    width: 291,
                                    fieldLabel: '<b>Correo</b>',
                                    labelPad: -50
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtNombreAmigo0',
                                    itemId: 'txtNombreAmigo0',
                                    margin: 25,
                                    width: 170,
                                    fieldLabel: '<b>Nombre Amigo</b>',
                                    labelPad: 1
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnAgregar',
                                    itemId: 'btnAgregar',
                                    style: 'margin-top:1px;',
                                    text: '<b>Agregar otro</b>',
                                    width: 85
                                }]
                            }]
                },
                
                {
                    xtype: 'panel',
                    height: 70,
                    id: 'plnBtnEnviar',
                    itemId: 'plnBtnEnviar',
                    width: 406,
                    bodyStyle:'background-color:transparent;border:none;',
                    items: [
                        {
                            xtype: 'button',
                            height: 31,
                            id: 'btnEnviar',
                            itemId: 'btnEnviar',
                            style: 'margin-top:20px;margin-left:135px;',
                            width: 134,
                            text: '<b>Enviar Invitación</b>'
                        }
                    ]
                }]
        });

        me.callParent(arguments);
    }
});