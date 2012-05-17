Ext.define('AJugarFutbol.view.usuario.Registrarse', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winRegistrarse',

    height: 400,
    width: 307,
    id: 'winRegistrarse',
    itemId: 'winRegistrarse',
    maxHeight: 400,
    maxWidth: 307,
    minHeight: 400,
    minWidth: 307,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Nuevo Usuario',
    modal: true,
    animateTarget: 'btnRegistrarsePrincipal',
    defaultFocus: 'txtCorreo02',
    shadow : 'drop', 
    closable: true,
    closeAction : 'hide',
    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnPrincipal01',
                    itemId: 'plnPrincipal01',
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 124,
                            id: 'pln1',
                            itemId: 'pln1',
                            layout: {columns: 1,type: 'table'},
                            bodyStyle: 'border:none;background:#F2F2F2;',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txtCorreo02',
                                    itemId: 'txtCorreo02',
                                    style: 'margin-top:20px;margin-left:20px;',
                                    width: 250,
                                    fieldLabel: 'Correo',
                                    labelPad: -15,
                                    allowBlank: false,
                                    blankText: 'Requiere de un correo',
                                    emptyText: 'Digite su correo',
                                    vtype: 'email',
                                    vtypeText: 'El formato del correo no es correcto'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtNuevaContrasena',
                                    itemId: 'txtNuevaContrasena',
                                    style: 'margin-top:5px;margin-left:20px;',
                                    width: 250,
                                    inputType: 'password',
                                    fieldLabel: 'Contrase&ntilde;a',
                                    labelPad: -15,
                                    allowBlank: false,
                                    blankText: 'Requiere de una contraseña',
                                    emptyText: 'Digite una nueva contraseña'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtConfirmarContrasena',
                                    itemId: 'txtConfirmarContrasena',
                                    style: 'margin-top:5px;margin-left:20px;',
                                    width: 250,
                                    inputType: 'password',
                                    fieldLabel: 'Confirmar',
                                    labelPad: -15,
                                    allowBlank: false,
                                    blankText: 'Requiere de una contraseña',
                                    emptyText: 'Confirma su contraseña'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 183,
                            margin: 4,
                            width: 289,
                            layout: {columns: 1,type: 'table'},
                            title: 'Datos Personales',
                            items: [
                                {
                                    xtype: 'textfield',
                                    id: 'txtNombre',
                                    itemId: 'txtNombre',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    width: 250,
                                    fieldLabel: 'Nombre',
                                    labelPad: -15,
                                    allowBlank: false,
                                    blankText: 'Requiere de un nombre',
                                    emptyText: 'Digite su nombre'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtApellidos',
                                    itemId: 'txtApellidos',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    width: 250,
                                    fieldLabel: 'Apellido(s)',
                                    labelPad: -15,
                                    allowBlank: false,
                                    blankText: 'Requiere de un apellido',
                                    emptyText: 'Digite su apellido'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtTelefono',
                                    itemId: 'txtTelefono',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    width: 250,
                                    fieldLabel: 'Tel&eacute;fono',
                                    labelPad: -15,
                                    allowBlank: false,
                                    blankText: 'Requiere de un celular',
                                    emptyText: 'Digite su teléfono o celular'
                                },
                                {
                                    xtype: 'radiogroup',
                                    height: 27,
                                    id: 'group',
                                    itemId: 'group',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    width: 282,
                                    fieldLabel: 'Genero',
                                    defaults: {name: 'genero'},
                                    labelPad: -15,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbMasculino',
                                            itemId: 'rdbMasculino',
                                            boxLabel: 'Masculino',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbFemenino',
                                            itemId: 'rdbFemenino',
                                            boxLabel: 'Femenino'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 51,
                            width: 295,
                            layout: {align: 'center',pack: 'center',type: 'vbox'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnRegistrarse01',
                                    itemId: 'btnRegistrarse01',
                                    height: 37,
                                    width: 141,
                                    scale: 'large',
                                    icon: 'resources/imagenes/listo.png',
                                    text: 'Registrarse',
                                    tooltip: 'Con datos completos, has click y te registras'
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