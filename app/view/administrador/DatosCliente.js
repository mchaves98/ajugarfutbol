Ext.define('AJugarFutbol.view.administrador.DatosCliente', {
    extend: 'Ext.window.Window',

    alias : 'widget.winDatosCliente',
    config : {title: '', idPersona: '0', indexStore: '0'},
    id:     'winDatosCliente',
    itemId: 'winDatosCliente',
    width: 765,
    resizable: false,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Informaci\u00F3n de Cliente',
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtCedulaCliente01',
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        var storeProv   = Ext.getStore('ubicacion.Provincias');
        var storeCanton = Ext.getStore('ubicacion.Cantones');
        var storeDist   = Ext.getStore('ubicacion.Distritos');
        storeProv.clearFilter(true);
        storeCanton.clearFilter(true);
        storeDist.clearFilter(true);

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id:     'pnlDatosCliente01',
                    itemId: 'pnlDatosCliente01',
                    layout: {type: 'fit'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'form',
                            id:     'frmDatosCliente01',
                            itemId: 'frmDatosCliente01',
                            margin: 3,
                            width:  760,
                            height: 515,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'border:none;',
                            items: [                                
                                {
                                    xtype: 'fieldset',
                                    height: 290,
                                    margin: 5,
                                    width: 370,
                                    title: '<span style="font-size:15px;">Datos Personales</span>',
                                    layout: {columns: 2,type: 'table'},
                                    rowspan: 2,
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id:     'txtCedulaCliente01',
                                            itemId: 'txtCedulaCliente01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'C\u00E9dula',
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
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite una c\u00E9dula. Ejemplo: 1-465-837, Digite: 104650837 (Campo acepta solo nueve n\u00FAmeros)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtNombreCliente01',
                                            itemId: 'txtNombreCliente01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Nombre',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 15, 
                                            tipoCampo: 'SoloLetras',
                                            aceptaBlancos: 'SI',
                                            tabIndex: 2,
                                            blankText: 'Requiere de un nombre',
                                            emptyText: 'Digite un nombre'
                                        },
                                         {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un nombre. Ejemplo: Juan Manuel, Digite solo: Juan (Campo acepta solo 15 letras) '
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtApellidoCliente01',
                                            itemId: 'txtApellidoCliente01',
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
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un apellido(s). Ejemplo: Chaves Trejos, No digite: Chaves T. (Campo acepta solo 22 letras)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtTelefono1Cliente',
                                            itemId: 'txtTelefono1Cliente',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Tel\u00E9fono 1',
                                            allowBlank: false,
                                            enableKeyEvents: true,
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            largo: 8,
                                            tabIndex: 4,
                                            blankText: 'Requiere de un celular',
                                            emptyText: 'Digite un Tel\u00E9fono o celular'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un N\u00FAmero telef\u00F3nico. Ejemplo: 8249-3462, Digite: 82493462 (Campo acepta solo 8 N\u00FAmeros)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtTelefono2Cliente',
                                            itemId: 'txtTelefono2Cliente',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Tel\u00E9fono 2',
                                            emptyText: 'Digite un Tel\u00E9fono o celular',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            largo: 8,
                                            tabIndex: 5
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un N\u00FAmero telef\u00F3nico. Ejemplo: 8249-3462, Digite: 82493462 (Campo acepta solo 8 N\u00FAmeros)'
                                        },
                                        {
                                            xtype: 'radiogroup',                                            
                                            id: 'Grupo',                                            
                                            margin: 5,   
                                            width: 300,
                                            defaults: {name: 'genero'},
                                            fieldLabel: 'G\u00E9nero',
                                            colspan: 2,
                                            items: [
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rbtnMasculinoCliente01',
                                                    itemId: 'rbtnMasculinoCliente01',
                                                    tabIndex: 7,
                                                    value:  'M',
                                                    boxLabel: 'Masculino'
                                                },
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rbtnFemeninoCliente01',
                                                    itemId: 'rbtnFemeninoCliente01',
                                                    tabIndex: 8,
                                                    value:  'F',
                                                    boxLabel: 'Femenino'
                                                }
                                            ]
                                        },
                                        {
                                            xtype:  'datefield',
                                            id:     'dateFechaNacimiento01',
                                            itemId: 'dateFechaNacimiento01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Fecha Nacimiento',
                                            labelPad: 10,
                                            allowBlank: false,
                                            blankText: 'Requiere de una fecha',
                                            emptyText: 'Selecc. una fecha de nacimiento',
                                            format: 'd/m/Y',
                                            tabIndex: 9,
                                            editable: false,
                                            showToday: false,
                                            colspan: 2
                                        }, 
                                        {
                                            xtype: 'textfield',
                                            id:     'txtEMailCliente',
                                            itemId: 'txtEMailCliente',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Correo',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'EMail',
                                            aceptaBlancos: 'NO',
                                            largo: 40,
                                            tabIndex: 10,
                                            emptyText: 'Correo del Cliente - Opcional'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un EMail. Ejemplo: mchaves@gmail.com (Campo acepta solo 40 caracteres)'
                                        }
 
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 150,
                                    margin: 10,
                                    width: 350,
                                    title: '<span style="font-size:15px;">Foto del Cliente</span>',
                                    layout: {columns: 2,type: 'table'},
                                    items: [
                                        {
                                            xtype:  'image',
                                            id:     'imgFotoCliente01',                                            
                                            itemId: 'imgFotoCliente01',
                                            height: 101,
                                            style:'margin-left:5px;margin-top:15px;',
                                            width: 101,
                                            src: ''
                                        },
                                        {
                                            xtype: 'form',
                                            itemId: 'formFileFoto',
                                            fileUpload: true,
                                            width: 200,                                            
                                            style:'margin-left:20px;background:#FFF;border:0px;',
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
                                                tooltip: 'Presione primero este bot\u00F3n para seleccionar la foto',
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
                                                tooltip: 'Presione este bot\u00F3n para cargar la foto despu\u00E9s de haberla seleccionado',
                                                itemId:'btnCargarFoto',
                                                id:'btnCargarFoto',
                                              handler: function() {
                                                    var fp = this.up('form').getForm();
                                                    if(fp.isValid()){
                                                        var objx = this.up('form');
                                                        objx = objx.query('#idHidden01');
                                                        objx = objx[0]; 
                                                        var window = Ext.ComponentQuery.query('#winDatosCliente')[0];
                                                        var elMask = window.getEl();
                                                        var store = Ext.StoreMgr.lookup('storeCliente');
                                                        var index = window.indexStore;
                                                        var idPersona=store.data.items[index].data['IdPersona'];
                                                        objx.setValue(idPersona);
                                                        semaforoAjaxMask = false;
                                                        fp.submit({
                                                            url: 'php/CargarFotoUsuario.php',
                                                            //waitMsg: 'Cargando foto......',
                                                            success: function(fp, obj) {
                                                                semaforoAjaxMask = true;
                                                                var winx = Ext.ComponentQuery.query('#winDatosCliente');
                                                                winx = winx[0]; 
                                                                var foto = winx.query('#imgFotoCliente01');
                                                                foto = foto[0]; 
                                                                var fotofile = obj.result.fotofile;                                                                
                                                                if (fotofile !== null) {
                                                                    foto.setSrc('resources/fotosUsuarios/'+fotofile); 
                                                                    store.data.items[index].data['FotoFile']=fotofile;
                                                                } else {
                                                                       foto.setVisible(false);
                                                                       objx.src = objx.setSrc('resources/imagenes/desconocido.jpg');
                                                                       }                                                                
                                                                var win = Ext.ComponentQuery.query('#winDatosCliente');
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
                                                                 semaforoAjaxMask = true;
                                                                 Ext.Msg.alert('Error', obj.result.errors);
                                                            }

                                                        });
                                                    }
                                                }   }]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 116,
                                    margin: 10,
                                    width: 350,
                                    title: '<span style="font-size:15px;">Direcci\u00F3n de Domicilio</span>',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 31,
                                            width: 337,
                                            bodyStyle: 'border:none;',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id:     'cmbProvincia01',
                                                    itemId: 'cmbProvincia01',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Provincia',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    editable: false,
                                                    blankText: 'Requiere de una provincia',
                                                    emptyText: '---- Seleccione una provincia ----',
                                                    forceSelection: true,
                                                    displayField: 'DesLarga',
                                                    valueField: 'CodProv',									
                                                    store:storeProv,
                                                    queryMode: 'local',
                                                    tabIndex: 11,
                                                    typeAhead: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 31,
                                            width: 337,
                                            bodyStyle: 'border:none;',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id:     'cmbCanton01',
                                                    itemId: 'cmbCanton01',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Cant\u00F3n',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    editable: false,
                                                    blankText: 'Requiere de un cant&oacute;n',
                                                    emptyText: '---- Seleccione un canton ----',
                                                    forceSelection: true,
                                                    displayField: 'DesLarga',
                                                    valueField: 'CodCanton',									
                                                    store:storeCanton,
                                                    queryMode: 'local',
                                                    tabIndex: 12,
                                                    typeAhead: true
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 31,
                                            width: 337,
                                            layout: {type: 'anchor'},
                                            bodyStyle: 'border:none;',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id:     'cmbDistrito01',
                                                    itemId: 'cmbDistrito01',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Distrito',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    editable: false,
                                                    blankText: 'Requiere de un distrito',
                                                    emptyText: '---- Seleccione un distrito ----',
                                                    forceSelection: true,
                                                    displayField: 'DesLarga',
                                                    valueField: 'CodDist',									
                                                    store:storeDist,
                                                    queryMode: 'local',
                                                    tabIndex: 13,
                                                    typeAhead: true
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 140,
                                    margin: 5,
                                    width: 693,
                                    title: '<span style="font-size:15px;">Datos de la Instalaci\u00F3n</span>',
                                    layout: {columns: 2,type: 'table'},
                                    colspan: 2,
                                    items: [
                                        {
                                            xtype: 'radiogroup',                                                                                                                                                                              
                                            width: 650,
                                            style: 'margin-top:5px;',
                                            defaults: {name: 'NivelConfianza'},
                                            fieldLabel: 'Nivel de Confianza',
                                            labelWidth: 110,
                                            colspan: 2,
                                            items: [
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rdbNoseDatosCliente',
                                                    itemId: 'rdbNoseDatosCliente',                                                    
                                                    value:  'N',
                                                    boxLabel: 'No s&eacute;',
                                                    checked:true
                                                },
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rdbMaloDatosCliente',
                                                    itemId: 'rdbMaloDatosCliente',                                                    
                                                    value:  'M',
                                                    boxLabel: 'Malo'
                                                },
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rdbRegularDatosCliente',
                                                    itemId: 'rdbRegularDatosCliente',                                                    
                                                    value:  'R',
                                                    boxLabel: 'Regular'
                                                },
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rdbBuenoDatosCliente',
                                                    itemId: 'rdbBuenoDatosCliente',                                                    
                                                    value:  'B',
                                                    boxLabel: 'Bueno'
                                                },
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rdbExcelenteDatosCliente',
                                                    itemId: 'rdbExcelenteDatosCliente',                                                    
                                                    value:  'E',
                                                    boxLabel: 'Excelente'
                                                },
                                                {
                                                  xtype: 'button',
                                                  height: 20,
                                                  width:  20,
                                                  icon: 'resources/imagenes/ayuda.jpg',
                                                  style: 'margin-bottom:05px;margin-left:05x;',
                                                  tooltip: 'El Nivel de Confianza indica el grado de responsabilidad del cliente a la hora de reservar y llegar a jugar.'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 40,
                                            width: 670,
                                            style: 'margin-top:10px;',
                                            layout: {columns: 8,type: 'table'},
                                            colspan: 3,
                                            items: [
                                                    {
                                                       xtype: 'label',
                                                       text: 'D\u00EDas que Juega:',
                                                       width: 70,
                                                       style: 'margin-top:10px;margin-bottom:10px;margin-left:10px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxLun',
                                                       itemId    : 'checkboxLun',
                                                       boxLabel  : 'Lunes',
                                                       tabIndex: 15,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxMar',
                                                       itemId    : 'checkboxMar',
                                                       boxLabel  : 'Martes',
                                                       tabIndex: 16,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxMie',
                                                       itemId    : 'checkboxMie',
                                                       boxLabel  : 'Mi\u00E9rcoles',
                                                       tabIndex: 17,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxJue',
                                                       itemId    : 'checkboxJue',
                                                       boxLabel  : 'Jueves',
                                                       tabIndex: 18,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxVie',
                                                       itemId    : 'checkboxVie',
                                                       boxLabel  : 'Viernes',
                                                       tabIndex: 19,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxSab',
                                                       itemId    : 'checkboxSab',
                                                       boxLabel  : 'S\u00E1bado',
                                                       tabIndex: 20,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxDom',
                                                       itemId    : 'checkboxDom',
                                                       boxLabel  : 'Domingo',
                                                       tabIndex: 21,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     }
                                                   ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtComentarioCliente01',
                                            itemId: 'txtComentarioCliente01',
                                            colspan:3,
                                            width: 630,
                                            style: 'margin-top:10px;',
                                            fieldLabel: 'Comentario',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'Texto',
                                            aceptaBlancos: 'SI',
                                            largo: 150,
                                            tabIndex: 22,
                                            emptyText: 'Digite un comentario relevante para Usted - Opcional'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un comentario (Opcional). Ejemplo: Cliente muy puntual y responsable. (Campo solo acepta 200 caracteres)'
                                        }
                                    ]
                                },       
                                {
                                    xtype: 'panel',
                                    height: 50,
                                    width: 710,
                                    bodyStyle: 'border:none;',
                                    colspan: 2,
                                    layout: {columns: 2,type: 'table'},
                                    items: [
                                            {
                                                xtype: 'button',
                                                height: 40,
                                                id:     'btnActualizarCliente',
                                                itemId: 'btnActualizarCliente',
                                                width: 145,
                                                icon: 'resources/imagenes/listo.png',
                                                iconCls: 'x-btn-text-icon',
                                                scale: 'large',
                                                tabIndex: 23,
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:150px;',
                                                text: 'Guardar Cambios',
                                                tooltip: 'Con datos completos, has click y actualiza los datos'
                                            },    
                                            {
                                                xtype: 'button',
                                                height: 40,
                                                id:     'btnSalirDatosCliente',
                                                itemId: 'btnSalirDatosCliente',
                                                width: 145,
                                                icon: 'resources/imagenes/salir.png',
                                                iconCls: 'x-btn-text-icon',
                                                scale: 'large',
                                                tabIndex: 24,
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:130px;',
                                                text: 'Salir',
                                                tooltip: 'Salir sin aplicar cambios a los datos del Cliente'
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
