Ext.define('AJugarFutbol.view.administracionx1.EditarPerfil', {
    extend: 'Ext.panel.Panel',
	 alias : 'widget.winEditarPerfil',

    height: 580,
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
                            height: 580,
                            id: 'tabMisDatos',
                            itemId: 'tabMisDatos',
                            bodyStyle: 'border:none;',
                            layout: {columns: 2,type: 'table'},
                            width: 760,                                                        
                            items: [
                                {
                                    xtype: 'form',
                                    height: 575,
                                    id: 'frmLogin01',
                                    itemId: 'frmLogin01',                                    
                                    margin: 7,
                                    width: 760,
                                    layout: {columns: 2,type: 'table'},
                                    rowspan:2,
                                    bodyStyle: 'border:none;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 40,
                                            id: 'plnCorreo01',
                                            itemId: 'plnCorreo01',
                                            margin: 10,
                                            width: 600,
                                            layout: {columns: 2,type: 'table'},
                                            bodyStyle: 'border:none;',
                                            colspan: 2,
                                            items: [
                                                {
                                                    xtype: 'displayfield',
                                                    labelPad: -50,                                                    
                                                    id: 'txtCorreo01',
                                                    itemId: 'txtCorreo01',
                                                    margin: 5,                                                    
                                                    fieldLabel: 'Correo'
                                                },
                                                {
                                                    xtype: 'button',
                                                    height: 40,
                                                    id: 'btnAplicarCambios2',
                                                    itemId: 'btnAplicarCambios2',
                                                    style: 'margin-left:200px;',
                                                    width: 147,
                                                    icon: 'resources/imagenes/listo.png',
                                                    iconCls: 'x-btn-text-icon',                                                    
                                                    text: 'Guardar Cambios',
                                                    tooltip: 'Con datos completos, has click y actualiza tus datos'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 283,
                                            margin: 10,
                                            width: 367,
                                            rowspan:2,
                                            title: '<span style="font-size:15px;">Datos Personales</span>', 
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 34,
                                                    id: 'plnCedula',
                                                    itemId: 'plnCedula',
                                                    width: 356,
                                                    style:'margin-top:10px;',
                                                    bodyStyle: 'border:none;',
                                                    cedulaOriginal: '',
                                                    layout: {columns: 2,type: 'table'},
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtCedula',
                                                            itemId: 'txtCedula',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'C&eacute;dula',
                                                            allowBlank: false,
                                                            enableKeyEvents: true,
                                                            tipoCampo: 'SoloNumeros',
                                                            largo: 9,
                                                            tabIndex: 1,
                                                            blankText: 'Requiere de una c\u00E9dula',
                                                            emptyText: 'Digite una c\u00E9dula'
                                                        },
                                                        {
                                                                xtype: 'button',
                                                                height: 20,
                                                                width:  20,
                                                                icon: 'resources/imagenes/ayuda.jpg',
                                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:5px;',
                                                                tooltip: 'Digite una c\u00E9dula. Ejemplo: 1-465-837, Digite: 104650837 (Campo acepta solo nueve múmeros)'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 34,
                                                    id: 'plnNombre',
                                                    itemId: 'plnNombre',
                                                    width: 356,
                                                    layout: {columns: 2,type: 'table'},
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
                                                            enableKeyEvents: true,
                                                            tipoCampo: 'SoloLetras',
                                                            largo: 15, 
                                                            tabIndex: 2,
                                                            blankText: 'Requiere de un nombre',
                                                            emptyText: 'Digite un nombre'
                                                        },
                                                        {
                                                                xtype: 'button',
                                                                height: 20,
                                                                width:  20,
                                                                icon: 'resources/imagenes/ayuda.jpg',
                                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:5px;',
                                                                tooltip: 'Digite un nombre. Ejemplo: Juan Manuel, Digite solo: Juan (Campo acepta solo 15 letras) '
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnApellido',
                                                    itemId: 'plnApellido',
                                                    width: 356,
                                                    layout: {columns: 2,type: 'table'},
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
                                                                enableKeyEvents: true,
                                                                tipoCampo: 'SoloLetras',
                                                                aceptaBlancos: 'SI',
                                                                largo: 22,
                                                                tabIndex: 3,
                                                                blankText: 'Requiere de apellido(s)',
                                                                emptyText: 'Digite un apellido'
                                                            },
                                                            {
                                                                    xtype: 'button',
                                                                    height: 20,
                                                                    width:  20,
                                                                    icon: 'resources/imagenes/ayuda.jpg',
                                                                    style: 'margin-top:05px;margin-bottom:05px;margin-left:5px;',
                                                                    tooltip: 'Digite un apellido(s). Ejemplo: Chaves Trejos, No digite: Chaves T. (Campo acepta solo 22 letras)'
                                                            }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnApodo',
                                                    itemId: 'plnApodo',
                                                    width: 356,
                                                    layout: {columns: 2,type: 'table'},
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtApodo',
                                                            itemId: 'txtApodo',
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Alias',
                                                            allowBlank: true,
                                                            enableKeyEvents: true,
                                                            tipoCampo: 'SoloLetras',
                                                            aceptaBlancos: 'SI',
                                                            largo: 15,
                                                            tabIndex: 4,
                                                            blankText: 'Alias (Opcional)',
                                                            emptyText: 'Digite un Alias o Apodo'
                                                        },
                                                            {
                                                                    xtype: 'button',
                                                                    height: 20,
                                                                    width:  20,
                                                                    icon: 'resources/imagenes/ayuda.jpg',
                                                                    style: 'margin-top:05px;margin-bottom:05px;margin-left:5px;',
                                                                    tooltip: 'Digite un Alias o Apodo. (Campo acepta solo 15 letras)'
                                                            }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnTelefono',
                                                    itemId: 'plnTelefono',
                                                    width: 356,
                                                    layout: {columns: 2,type: 'table'},
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
                                                            enableKeyEvents: true,
                                                            tipoCampo: 'SoloNumeros',
                                                            aceptaBlancos: 'NO',
                                                            largo: 8,
                                                            tabIndex: 5,
                                                            blankText: 'Requiere de un celular',
                                                            emptyText: 'Digite un Tel\u00E9fono o celular'
                                                        },
                                                        {
                                                                xtype: 'button',
                                                                height: 20,
                                                                width:  20,
                                                                icon: 'resources/imagenes/ayuda.jpg',
                                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:5px;',
                                                                tooltip: 'Digite un N\u00FAmero telef\u00F3nico. Ejemplo: 8249-3462, Digite: 82493462 (Campo acepta solo 8 N\u00FAmeros)'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 31,
                                                    id: 'plnGenero',
                                                    itemId: 'plnGenero',
                                                    width: 356,
                                                    layout: {type: 'anchor'},
                                                    colspan: 2,
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'radiogroup',
                                                            id: 'Grupo',
                                                            itemId: 'Grupo',
                                                            margin: 5,
                                                            defaults: {name: 'genero'},
                                                            fieldLabel: 'G\u00E9nero',
                                                            items: [
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'rbdMasculino',
                                                                    itemId: 'rbdMasculino',
                                                                    tabIndex: 6,
                                                                    value: 'M',
                                                                    boxLabel: 'Masculino',
                                                                    checked: true
                                                                },
                                                                {
                                                                    xtype: 'radiofield',
                                                                    id: 'rbdFemenino',
                                                                    itemId: 'rbdFemenino',
                                                                    tabIndex: 7,
                                                                    value: 'F',
                                                                    boxLabel: 'Femenino'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 34,
                                                    id: 'plnFechaNacimiento',
                                                    itemId: 'plnFechaNacimiento',
                                                    width: 337,
                                                    layout: {type: 'anchor'},
                                                    colspan: 2,
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            id: 'dateFechaNacimiento',
                                                            itemId: 'dateFechaNacimiento',
                                                            margin: 5,
                                                            width: 220,
                                                            fieldLabel: 'Fecha Nacimiento',
                                                            labelWidth: 115,
                                                            allowBlank: false,
                                                            blankText: 'Requiere de una fecha',
                                                            format: 'd/m/Y',
                                                            editable: false,
                                                            showToday: false,
                                                            tabIndex: 8,
                                                            emptyText: 'Selecc. su fecha de nacimiento'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 140,
                                            margin: 10,
                                            width: 340,
                                            title: '<span style="font-size:15px;">Cambiar contrase\u00F1a</span>', 
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 40,
                                                    id: 'plnContrasenaActual',
                                                    itemId: 'plnContrasenaActual',
                                                    width: 342,
                                                    //layout: {type: 'anchor'},
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtContrasenaActual',
                                                            itemId: 'txtContrasenaActual',
                                                            margin: 5,
                                                            width: 250,
                                                            inputType: 'password',
                                                            fieldLabel: 'Actual',
                                                            labelPad: -30, 
                                                            allowBlank: false,
                                                            tabIndex: 12,
                                                            blankText: 'Requiere de una contrase\u00F1a',
                                                            emptyText: 'Digite contrase\u00F1a actual'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 40,
                                                    id: 'plnNuevaContrasena',
                                                    itemId: 'plnNuevaContrasena',
                                                    width: 342,
                                                    //layout: {type: 'anchor'},
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtNuevaContrasena',
                                                            itemId: 'txtNuevaContrasena',
                                                            margin: 5,
                                                            width: 250,
                                                            inputType: 'password',
                                                            fieldLabel: 'Nueva',
                                                            labelPad: -30, 
                                                            allowBlank: false,
                                                            tabIndex: 13,
                                                            blankText: 'Requiere de una contrase\u00F1a',
                                                            emptyText: 'Digite una nueva contrase\u00F1a'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'panel',
                                                    height: 46,
                                                    id: 'plnConfirmarContrasena',
                                                    itemId: 'plnConfirmarContrasena',
                                                    width: 337,
                                                    //layout: {type: 'anchor'},
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'textfield',
                                                            id: 'txtConfirmarContrasena',
                                                            itemId: 'txtConfirmarContrasena',
                                                            margin: 5,
                                                            width: 250,
                                                            inputType: 'password',
                                                            fieldLabel: 'Confirmar',
                                                            labelPad: -30, 
                                                            allowBlank: false,
                                                            tabIndex: 14,
                                                            blankText: 'Requiere de una contrase\u00F1a',
                                                            emptyText: 'Confirme la contrase\u00F1a'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 121,
                                            margin: 10,
                                            width: 340,
                                            title: '<span style="font-size:15px;">Direcci\u00F3n Domicilio</span>', 
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
                                                            labelPad: -25, 
                                                            allowBlank: false,
                                                            editable: false,
                                                            blankText: 'Requiere de una provincia',
                                                            forceSelection: true,
                                                            displayField: 'DesLarga',
                                                            valueField: 'CodProv',									
                                                            store:storeProv,
                                                            queryMode: 'local',
                                                            typeAhead: true,
                                                            tabIndex: 9,
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
                                                            labelPad: -25, 
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Cant\u00F3n',
                                                            allowBlank: false,
                                                            editable: false,
                                                            blankText: 'Requiere de un Cant\u00F3n',
                                                            forceSelection: true,
                                                            displayField: 'DesLarga',
                                                            valueField: 'CodCanton',									
                                                            store:storeCanton,
                                                            queryMode: 'local',
                                                            typeAhead: true,
                                                            autoSelect: false,
                                                            tabIndex: 10,
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
                                                    bodyStyle: 'border:none;',
                                                    items: [
                                                        {
                                                            xtype: 'combobox',
                                                            id: 'cmbDistrito',
                                                            itemId: 'cmbDistrito',
                                                            labelPad: -25, 
                                                            margin: 5,
                                                            width: 311,
                                                            fieldLabel: 'Distrito',
                                                            allowBlank: false,
                                                            editable: false,
                                                            blankText: 'Requiere de un distrito',
                                                            forceSelection: true,
                                                            displayField: 'DesLarga',
                                                            valueField: 'CodDist',									
                                                            store:storeDist,
                                                            queryMode: 'local',
                                                            typeAhead: true,
                                                            autoSelect: false,
                                                            tabIndex: 11,
                                                            emptyText: '---- Seleccione un distrito ----'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'fieldset',
                                            height: 135,
                                            margin: 10,
                                            width: 367,
                                            layout: {columns: 2, type: 'table'},
                                            title: '<span style="font-size:15px;">Mi Foto</span>', 
                                            //padding: '10,10,10,10',
                                            items: [
                                                {
                                                    xtype: 'panel',
                                                    height: 101,
                                                    id: 'plnFoto',
                                                    itemId: 'plnFoto',
                                                    width: 101,
                                                    style:'margin-bottom:100px;margin-top:5px;',
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
                                            style:'margin-bottom:100px; margin-left:20px;background:#FFF;border:0px;',
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
                                                //anchor: '100%',
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
                                                bodyStyle: 'border:none;',
                                                disabled: 'true',
                                                tooltip: 'Presione este bot\u00F3n para cargar la foto después de haberla seleccionado',
                                                itemId:'btnCargarFoto',
                                                id:'btnCargarFoto',
                                              handler: function() {
                                                    var fp = this.up('form').getForm();
                                                    if(fp.isValid()){
                                                        var window = Ext.ComponentQuery.query('#viewport')[0];
                                                        var elMask = window.getEl();
                                                        var objx = this.up('form');
                                                        objx = objx.query('#idHidden01');
                                                        objx = objx[0]; 
                                                        objx.setValue(global_id_usuario);
                                                        fp.submit({
                                                            url: 'php/CargarFotoUsuario.php',
                                                            //--waitMsg: 'Cargando tu foto......',
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
                                            colspan: 2,
                                            dock: 'bottom',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    height: 40,
                                                    id: 'btnAplicarCambios',
                                                    itemId: 'btnAplicarCambios',
                                                    width: 147,
                                                    tabIndex: 15,
                                                    icon: 'resources/imagenes/listo.png',
                                                    iconCls: 'x-btn-text-icon',                                                    
                                                    text: 'Guardar Cambios',
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
