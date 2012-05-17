Ext.define('AJugarFutbol.view.usuario.EditarPerfil', {
    extend: 'Ext.panel.Panel',
	 alias : 'widget.winEditarPerfil',

    height: 554,
    itemId: 'winEditarPerfil',
    id: 'winEditarPerfil',   
    width: 760,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',

    initComponent: function() {
        var me = this;
        var storeProv   = Ext.getStore('ubicacion.Provincias');
        var storeCanton = Ext.getStore('ubicacion.Cantones');
        var storeDist   = Ext.getStore('ubicacion.Distritos');
        //var amigos   =    Ext.getStore('usuario.Usuarios');

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'tabPrincipal',
                    itemId: 'tabPrincipal',
                    bodyStyle: 'border:none;',
                    plain: true,                    
                    activeTab: 0,
                    items: [
                        {
                            xtype: 'panel',
                            height: 559,
                            id: 'tabMisDatos',
                            itemId: 'tabMisDatos',
                            width: 760,                                                        
                            items: [
                                {
                                    xtype: 'form',
                                    height: 531,
                                    id: 'frmLogin01',
                                    itemId: 'frmLogin01',                                    
                                    margin: 7,
                                    width: 760,
                                    layout: {
                                        columns: 2,
                                        type: 'table'
                                    },
                                    bodyStyle: 'border:none;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 33,
                                            id: 'plnCorreo01',
                                            itemId: 'plnCorreo01',
                                            margin: 10,
                                            width: 530,
                                            layout: {type: 'table'},
                                            bodyStyle: 'border:none;',
                                            colspan: 2,
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    labelPad: 0,                                                    
                                                    //xtype: 'textfield',
                                                    id: 'txtCorreo01',
                                                    itemId: 'txtCorreo01',
                                                    margin: 5,
                                                    width: 311,
                                                    fieldLabel: 'Correo'/*,
                                                    readOnly: true,                                                    ,
                                                    allowBlank: false,
                                                    blankText: 'Requiere de un correo',
                                                    emptyText: 'Digite su correo',
                                                    vtype: 'email',
                                                    vtypeText: 'El formato del correo no es correcto'*/
                                                },
                                                {
                                                    xtype: 'button',
                                                    height: 31,
                                                    id: 'btnAplicarCambios2',
                                                    itemId: 'btnAplicarCambios2',
                                                    style: 'margin-left:47px;',
                                                    width: 138,
                                                    icon: 'resources/imagenes/listo.png',
                                                    iconCls: 'x-btn-text-icon',
                                                    scale: 'large',
                                                    text: 'Aplicar Cambios',
                                                    tooltip: 'Con datos completos, has click y actualiza tus datos'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 258,
                                            margin: 10,
                                            width: 347,
                                            title: 'Datos Personales',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 34,
                                                    id: 'plnCedula',
                                                    itemId: 'plnCedula',
                                                    width: 356,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtCedula',
                                                            itemId: 'txtCedula',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'C&eacute;dula',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una c&eacute;dula',
                                                            emptyText: 'Digite su cedula'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 34,
                                                    id: 'plnNombre',
                                                    itemId: 'plnNombre',
                                                    width: 356,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtNombre',
                                                            itemId: 'txtNombre',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Nombre',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de un nombre',
                                                            emptyText: 'Digite su nombre'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnApellido',
                                                    itemId: 'plnApellido',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtApellido',
                                                            itemId: 'txtApellido',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Apellido(s)',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de un apellido',
                                                            emptyText: 'Digite su apellido'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnApodo',
                                                    itemId: 'plnApodo',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtApodo',
                                                            itemId: 'txtApodo',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Apodo',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de un apodo',
                                                            emptyText: 'Digite su apodo'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnTelefono',
                                                    itemId: 'plnTelefono',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtTelefono',
                                                            itemId: 'txtTelefono',
                                                            margin: 5,
                                                            width: 312,
                                                            fieldLabel: 'Celular',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de un celular',
                                                            emptyText: 'Digite su celular'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnGenero',
                                                    itemId: 'plnGenero',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            id: 'Grupo',
                                                            itemId: 'Grupo',
                                                            margin: 5,
                                                            defaults: {
                                                                name: 'genero'
                                                            },
                                                            fieldLabel: 'Genero',
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'rbdMasculino',
                                                                    itemId: 'rbdMasculino',
                                                                    value: 'M',
                                                                    boxLabel: 'Masculino',
                                                                    checked: true
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'rbdFemenino',
                                                                    itemId: 'rbdFemenino',
                                                                    value: 'F',
                                                                    boxLabel: 'Femenino'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnFechaNacimiento',
                                                    itemId: 'plnFechaNacimiento',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dateFechaNacimiento',
                                                            itemId: 'dateFechaNacimiento',
                                                            margin: 5,
                                                            width: 312,
                                                            fieldLabel: 'Fecha Nacimiento',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una fecha',
                                                            format: 'd/m/Y',
                                                            transform: 'stateSelect',
                                                            showToday: false,
                                                            emptyText: 'Selecc. su fecha de nacimiento'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 258,
                                            margin: 10,
                                            width: 347,
                                            title: 'Cambiar Contraseña',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 40,
                                                    id: 'plnContrasenaActual',
                                                    itemId: 'plnContrasenaActual',
                                                    width: 342,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtContrasenaActual',
                                                            itemId: 'txtContrasenaActual',
                                                            margin: 5,
                                                            width: 312,
                                                            inputType: 'password',
                                                            fieldLabel: 'Actual',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una contraseña',
                                                            emptyText: 'Digite contraseña actual'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 40,
                                                    id: 'plnNuevaContrasena',
                                                    itemId: 'plnNuevaContrasena',
                                                    width: 342,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtNuevaContrasena',
                                                            itemId: 'txtNuevaContrasena',
                                                            margin: 5,
                                                            width: 312,
                                                            inputType: 'password',
                                                            fieldLabel: 'Nueva',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una contraseña',
                                                            emptyText: 'Digite una nueva contraseña'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 46,
                                                    id: 'plnConfirmarContrasena',
                                                    itemId: 'plnConfirmarContrasena',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtConfirmarContrasena',
                                                            itemId: 'txtConfirmarContrasena',
                                                            margin: 5,
                                                            width: 312,
                                                            inputType: 'password',
                                                            fieldLabel: 'Confirmar',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una contraseña',
                                                            emptyText: 'Confirme la contraseña'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 121,
                                            margin: 10,
                                            width: 347,
                                            title: 'Direcci&oacute;n',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnProvincia',
                                                    itemId: 'plnProvincia',
                                                    width: 337,
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmbProvincia',
                                                            itemId: 'cmbProvincia',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Provincia',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una provincia',
                                                            forceSelection: true,
                                                            displayField: 'DesLarga',
                                                            valueField: 'id',									
                                                            store:storeProv,
                                                            queryMode: 'local',
                                                            typeAhead: true,
                                                            emptyText: '---- Seleccione una provincia ----'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnCanton',
                                                    itemId: 'plnCanton',
                                                    width: 337,
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmbCanton',
                                                            itemId: 'cmbCanton',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Cant&oacute;n',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de un cant&oacute;n',
                                                            forceSelection: true,
                                                            displayField: 'DesLarga',
                                                            valueField: 'id',									
                                                            store:storeCanton,
                                                            queryMode: 'local',
                                                            typeAhead: true,
                                                            autoSelect: false,
                                                            emptyText: '---- Seleccione un canton ----'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnDistrito',
                                                    itemId: 'plnDistrito',
                                                    width: 337,
                                                    layout: {
                                                        type: 'anchor'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmbDistrito',
                                                            itemId: 'cmbDistrito',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Distrito',
                                                            allowBlank: false,
                                                            blankText: 'Requiere de un distrito',
                                                            forceSelection: true,
                                                            displayField: 'DesLarga',
                                                            valueField: 'id',									
                                                            store:storeDist,
                                                            queryMode: 'local',
                                                            typeAhead: true,
                                                            autoSelect: false,
                                                            emptyText: '---- Seleccione un distrito ----'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 121,
                                            margin: 10,
                                            width: 347,
                                            layout: {columns: 3, type: 'table'},
                                            title: 'Mi foto',
                                            //padding: '10,10,10,10',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 101,
                                                    id: 'plnFoto',
                                                    itemId: 'plnFoto',
                                                    width: 101,
                                                    style:'margin-bottom:100px;',
                                                    layout: {
                                                        type: 'fit'
                                                    },
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'image',
                                                            autoRender: true,
                                                            itemId: 'imagenFoto',
                                                            height: 43,
                                                            width: 180,                                                            
                                                            src: 'resources/imagenes/desconocido.jpg'
                                                        }
                                                    ]
                                                },
                                                {
                                            xtype: 'form',
                                            fileUpload: true,
                                            width: 200,
                                            //bodyPadding: 10,
                                            style:'margin-bottom:100px; margin-left:10px;background:#FFF;',
                                            frame: true,
                                            bodyStyle: 'border:none;background:#FFF;',                                            
                                            items: [
                                                {
                                                xtype: 'filefield',
                                                itemId:'fileFotoUsuario',
                                                id:'fileFotoUsuario',
                                                name: 'file',
                                                buttonOnly: true,
                                                msgTarget: 'side',
                                                allowBlank: false,
                                                tooltip: 'Presione primero este botón para seleccionar la foto',
                                                anchor: '100%',
                                                bodyStyle: 'border:none;background:#FFF;',
                                                buttonText: 'Paso 1: Selecciona tu foto...'
                                                },

                                                {  
                                                        xtype:'hidden', //<-- campo oculto para enviar el id del usuario
                                                        name:'idHidden01',
                                                        itemId:'idHidden01',
                                                        value:32
                                                }  
                                        ],

                                            buttons: [{
                                                text: 'Paso 2: Cargar Foto',
                                                anchor: '100%',
                                                bodyStyle: 'border:none;background:#FFF;',
                                                disabled: 'true',
                                                tooltip: 'Presione este botón para cargar la foto después de haberla seleccionado',
                                                itemId:'btnCargarFoto',
                                                id:'btnCargarFoto',
                                              handler: function() {
                                                    var fp = this.up('form').getForm();
                                                    if(fp.isValid()){
                                                        var objx = this.up('form');
                                                        objx = objx.query('#idHidden01');
                                                        objx = objx[0]; 
                                                        objx.setValue(global_id_usuario);
                                                        fp.submit({
                                                            url: 'php/CargarFotoUsuario.php',
                                                            waitMsg: 'Cargando tu foto......',
                                                            success: function(fp, obj) {
                                                                var winx = Ext.ComponentQuery.query('#plnFoto');
                                                                winx = winx[0]; 
                                                                var objx = winx.query('#imagenFoto');
                                                                objx = objx[0]; 
                                                                var fotofile = obj.result.fotofile;
                                                                
                                                                var viewPort = Ext.ComponentQuery.query('#viewport');                                                               
                                                                viewPort =  viewPort[0];
                                                                var foto = viewPort.query('#imagenFotoPrincipal');
                                                                foto = foto[0];
                                                                global_usuario_foto = fotofile;
                                                                if (fotofile !== null) {
                                                                    objx.setSrc('resources/fotosUsuarios/'+fotofile);
                                                                    foto.setSrc('resources/fotosUsuarios/'+global_usuario_foto);
                                                                    foto.setVisible(true);
                                                                } else {
                                                                       foto.setVisible(false);
                                                                       objx.src = objx.setSrc('resources/imagenes/desconocido.jpg');
                                                                       }
                                                                var win = Ext.ComponentQuery.query('#winEditarPerfil');
                                                                win = win[0]; 
                                                                var obj = win.query('#btnCargarFoto');
                                                                obj = obj[0]; 
                                                                obj.setDisabled(true);   
                                                                var obj = win.query('#fileFotoUsuario');
                                                                obj = obj[0]; 
                                                                obj.setVisible(true);   
                                                            },
                                                            failure: function(form, obj) {
                                                                 // console.log('Fallo la carga de tulan foto');
                                                                 Ext.Msg.alert('Error', obj.result.errors);
                                                            }

                                                        });
                                                    }
                                                }   }]
                                        }
                                            ]
                                        }
                                    ],
                                    dockedItems: [
                                        {
                                            xtype: 'panel',
                                            height: 52,
                                            id: 'plnRegistrarse',
                                            itemId: 'plnRegistrarse',
                                            width: 328,
                                            layout: {
                                                align: 'center',
                                                pack: 'center',
                                                type: 'vbox'
                                            },
                                            bodyStyle: 'border:none;',
                                            colspan: 3,
                                            dock: 'bottom',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    height: 31,
                                                    id: 'btnAplicarCambios',
                                                    itemId: 'btnAplicarCambios',
                                                    width: 138,
                                                    icon: 'resources/imagenes/listo.png',
                                                    iconCls: 'x-btn-text-icon',
                                                    scale: 'large',
                                                    text: 'Aplicar Cambios',
                                                    tooltip: 'Con datos completos, has click y actualiza tus datos'
                                                }
                                            ]
                                        }
                                    ]
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
