Ext.define('AJugarFutbol.view.administrador.MasInformacionUsuario', {
     extend: 'Ext.window.Window',

alias : 'widget.winMasInformacionUsuario',
    id: 'winMasInformacionUsuario',
    itemId: 'winMasInformacionUsuario',
    height: 415,
    width: 651,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Mas Informaci&oacute;n',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {columns: 2,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'fieldset',
                            height: 214,
                            style: 'margin-left:15px;margin-top:5px;',
                            width: 354,
                            title: '<span style="font-size:15px;">Datos Personales</span>',
                            rowspan: 2,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoCedula',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'C&eacute;dula'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoNombre',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Nombre'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoApellidos',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Apellido(s)'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoTelefono1',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tel&eacute;fono 1'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoTelefono2',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tel&eacute;fono 2'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoGenero',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'G&eacute;nero'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoFechaNacimiento',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha Nacimiento'
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoCorreo',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Correo'
                                }
                            ]
                        },
                        {
                            xtype: 'image',
                            height: 100,
                            itemId: 'imgInfoFotoUsuario',
                            style: 'margin-left:80px;margin-top:10px;',
                            width: 100,
                            src: 'resources/fotosUsuarios/desconocido.jpg',
                            colspan: 2
                        },
                        {
                            xtype: 'fieldset',
                            height: 106,
                            style: 'margin-left:15px;',
                            width: 247,
                            title: '<span style="font-size:15px;">Direcci\u00F3n de Domicilio</span>',
                            colspan: 2,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoProvincia',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Provincia',
                                    labelPad: -30
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoCanton',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Cant&oacute;n',
                                    labelPad: -30
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoDistrito',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Distrito',
                                    labelPad: -30
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 150,
                            style: 'margin-left:15px;',
                            width: 615,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Datos de la Instalaci\u00F3n</span>',
                            colspan: 2,
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoNivelConfianza',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Nivel de Confianza',
                                    labelWidth: 120,                                    
                                    colspan: 2
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblInfoDiasJuega',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'D&iacute;as que Juega',
                                    labelWidth: 120,                                    
                                    colspan: 2
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    itemId: 'txtInfoComentario',
                                    style: 'margin-left:10px;margin-top:5px;',
                                    width: 434,
                                    fieldLabel: 'Comentario',
                                    labelWidth: 120                                    
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnInfoUsuarioSalir',
                                    height: 41,
                                    style: 'margin-left:40px;',
                                    width: 98,
                                    text: 'Salir'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnInfoEditaComentarioUsuario',
                                    style: 'margin-left:130px;border:0px;background:#FFF;',
                                    icon: 'resources/imagenes/disk.png',
                                    text: '<b>Guardar este comentario</b>',
                                    idPersona:''
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