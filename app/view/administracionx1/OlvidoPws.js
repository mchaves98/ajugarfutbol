Ext.define('AJugarFutbol.view.administracionx1.OlvidoPws' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.winOlvidoPws',

    id: 'winOlvidoPws',
    itemId: 'winOlvidoPws',
    height: 100,
    width: 418,
    maxHeight: 100,
    maxWidth: 418,
    minHeight: 100,
    minWidth: 418,
    resizable: false,
    modal:true,
    animateTarget: 'btnOlvideContrasenaPrincipal',
    defaultFocus: 'txtCorreo03',
    shadow : 'drop', 
    closable: true,
    closeAction : 'hide',
    
    
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title:'&#191;Olvid&oacute; su contrase&ntilde;a?',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnPrincipal03',
                    itemId: 'plnPrincipal03',
                    layout: {type: 'column'},
                    bodyStyle: 'border:none;background:#F2F2F2;',
                    items: [
                        {
                            xtype: 'textfield',
                            id: 'txtCorreo03',
                            itemId: 'txtCorreo03',
                            margin: 20,
                            width: 244,
                            fieldLabel: 'Correo',
                            labelPad: -25,
                            blankText: 'Requiere de un correo',
                            emptyText: 'Digite su correo',
                            vtype: 'email',
                            enableKeyEvents:true,
                            vtypeText: 'El formato del correo no es correcto'
                        },
                        {
                            xtype: 'button',
                            height: 41,
                            id: 'btnEnviar',
                            itemId: 'btnEnviar',
                            style: 'margin-top:9px;',
                            width: 103,
                            icon: 'resources/imagenes/candado.gif',
                            scale: 'large',
                            tooltip:'Enviar a mi correo',
                            text: 'Enviar'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});