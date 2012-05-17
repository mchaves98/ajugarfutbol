   Ext.define('AJugarFutbol.view.reserva.SimpleReservacion', {
       extend: 'Ext.window.Window',

    alias : 'widget.winSimpleReservacion',
    id: 'winSimpleReservacion',
    itemId: 'winSimpleReservacion',
    height: 290,
    width: 525,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Atenci&oacute;n',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    items: [
                        {
                            xtype: 'panel',
                            height: 80,
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblMensajeUsuario',
                                    margin: 20,
                                    width: 468,
                                    value: '<b>Est&aacute; cancha no posee el servicio de reservaci&oacute;n en l&iacute;nea, si desea realizar una reservaci&oacute;n por favor p&oacute;ngase en contacto con el administrador</b>',
                                    labelWidth: 115
                                }
                            ]
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblSRNombreEncargado',
                            itemId: 'lblSRNombreEncargado',
                            margin: 10,                            
                            value: 'Display Field',
                            fieldLabel: 'Nombre de Encargado',
                            labelWidth: 130
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblSRNombreCancha',
                            itemId: 'lblSRNombreCancha',
                            margin: 10,                            
                            value: 'Display Field',
                            fieldLabel: 'Nombre de Cancha',
                            labelWidth: 130
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblSRTelefono',
                            itemId: 'lblSRTelefono',
                            margin: 10,                            
                            value: 'Display Field',
                            fieldLabel: 'Tel&eacute;fono',
                            labelWidth: 130
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblSRCorreo',
                            itemId: 'lblSRCorreo',
                            margin: 10,                            
                            value: 'Display Field',
                            fieldLabel: 'Correo',
                            labelWidth: 130
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblSRDireccion',
                            itemId: 'lblSRDireccion',
                            margin: 10,                            
                            value: 'Display Field',
                            fieldLabel: 'Direcci&oacute;n',
                            labelWidth: 130
                        },
                        {
                            xtype: 'button',
                            height: 30,
                            id: 'btnSimpleReservacionSalir',
                            itemId: 'btnSimpleReservacionSalir',
                            width: 513,                                                                                    
                            text: '<span style="font-size:20px;">Salir</span>'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});