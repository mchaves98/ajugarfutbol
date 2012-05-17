Ext.define('AJugarFutbol.view.administracionx1.DatosCliente', {
    extend: 'Ext.window.Window',

    alias : 'widget.winDatosCliente',
    config : {title: '', idCliente: '0', indexStore: '0'},
    id:     'winDatosCliente',
    itemId: 'winDatosCliente',
    width: 765,
    //height: 600,
    resizable: false,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Informaci\u00F3n de Cliente',
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtCedulaJuridica01',
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        var storeProv   = Ext.getStore('ubicacion.Provincias');
        var storeCanton = Ext.getStore('ubicacion.Cantones');
        var storeDist   = Ext.getStore('ubicacion.Distritos');
        var StatusClientes = Ext.getStore('catalogos.StatusClientes');
        var Vendedores     = Ext.getStore('catalogos.Vendedores');
        var Instalaciones  = Ext.getStore('instalacion.Instalaciones');
       
        storeProv.clearFilter(true);
        storeCanton.clearFilter(true);
        storeDist.clearFilter(true);
        StatusClientes.clearFilter(true);
        Vendedores.clearFilter(true);
        Instalaciones.clearFilter(true);
        
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
                            width:  740,
                            //height: 615,
                            layout: {columns: 1,type: 'table'},
                            bodyStyle: 'border:none;',
                            items: [                                
                                {
                                    xtype: 'fieldset',
                                    margin: 5,
                                    width: 720,
                                    //height: 400,
                                    title: '<span style="font-size:15px;">Datos Cliente</span>',
                                    layout: {columns: 4,type: 'table'},
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id:     'txtCedulaJuridica01',
                                            itemId: 'txtCedulaJuridica01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'C\u00E9dula',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'Numeros-guiones',
                                            largo: 12,
                                            tabIndex: 1,
                                            aceptaBlancos: 'NO',
                                            emptyText: 'Digite una c\u00E9dula Juridica'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite una c\u00E9dula juridica o de persona fisica. (Campo acepta hasta 70 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtNombreLegal01',
                                            itemId: 'txtNombreLegal01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Nombre Legal',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            largo: 70, 
                                            tipoCampo: 'Letras-NumerosConPunto-Coma',
                                            aceptaBlancos: 'SI',
                                            tabIndex: 3,
                                            emptyText: 'Digite un Nombre Legal o de una Persona Fisica.'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un nombre legal o de una Persona Fisica.  (Campo acepta hasta 70 caracteres)'
                                        },     
                                        {
                                            xtype: 'textfield',
                                            id:     'txtNombreInstalacion01',
                                            itemId: 'txtNombreInstalacion01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Nombre Instalacion',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 70, 
                                            tipoCampo: 'Letras-Numeros',
                                            aceptaBlancos: 'SI',
                                            tabIndex: 5,
                                            blankText: 'Requiere de un nombre Instalacion',
                                            emptyText: 'Digite un nombre Instalacion'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un nombre de Instalacion. (Campo acepta hasta 70 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtComentarioVendedor01',
                                            itemId: 'txtComentarioVendedor01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Comentario',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            largo: 70, 
                                            tipoCampo: 'Texto',
                                            aceptaBlancos: 'SI',
                                            tabIndex: 7,
                                            emptyText: 'Digite un Comentario'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un Comentario. (Campo acepta hasta 70 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtNombreDueno01',
                                            itemId: 'txtNombreDueno01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Nombre Dueno',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            tipoCampo: 'SoloLetras',
                                            aceptaBlancos: 'SI',
                                            largo: 20,
                                            tabIndex: 9,
                                            emptyText: 'Digite el nombre del Dueño'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un Nombre. (Campo acepta solo 20 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtApellidosDueno01',
                                            itemId: 'txtApellidosDueno01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Apellidos Dueño',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            tipoCampo: 'SoloLetras',
                                            aceptaBlancos: 'SI',
                                            largo: 30,
                                            tabIndex: 12,
                                            emptyText: 'Digite un apellido del Dueño'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un apellido(s). (Campo acepta solo 30 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtTelefonoDueno01',
                                            itemId: 'txtTelefonoDueno01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Tel\u00E9fono Dueño',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            largo: 8,
                                            tabIndex: 15,
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
                                            id:     'txtEMailDueno01',
                                            itemId: 'txtEMailDueno01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Correo Dueno',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'EMail',
                                            aceptaBlancos: 'NO',
                                            largo: 40,
                                            tabIndex: 17,
                                            emptyText: 'Correo del Dueño'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un correo electronico o EMail'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtNombreContacto01',
                                            itemId: 'txtNombreContacto01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Nombre Contacto',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            tipoCampo: 'SoloLetras',
                                            aceptaBlancos: 'SI',
                                            largo: 20,
                                            tabIndex: 19,
                                            emptyText: 'Digite el nombre del Contacto'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un Nombre. (Campo acepta solo 20 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtApellidosContacto01',
                                            itemId: 'txtApellidosContacto01',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Apellidos Contacto',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            tipoCampo: 'SoloLetras',
                                            aceptaBlancos: 'SI',
                                            largo: 30,
                                            tabIndex: 21,
                                            emptyText: 'Digite un apellido(s) del Contacto'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un apellido(s). Campo acepta solo 30 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtTelefonoContacto01',
                                            itemId: 'txtTelefonoContacto01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Tel\u00E9fono Contacto',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            largo: 8,
                                            tabIndex: 25,
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
                                            id:     'txtEMailContacto01',
                                            itemId: 'txtEMailContacto01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Correo Contacto',
                                            allowBlank: true,
                                            enableKeyEvents: true,
                                            tipoCampo: 'EMail',
                                            aceptaBlancos: 'NO',
                                            largo: 40,
                                            tabIndex: 27,
                                            emptyText: 'Correo del Contacto'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05x;',
                                                tooltip: 'Digite un correo electronico o EMail del Contacto)'
                                        },
                                        {
                                                    xtype: 'combobox',
                                                    id:     'cmbStatus01',
                                                    itemId: 'cmbStatus01',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Status',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    editable: false,
                                                    blankText: 'Requiere de Estatus',
                                                    emptyText: '---- Seleccione un Estatus ----',
                                                    forceSelection: true,
                                                    displayField: 'Descripcion',
                                                    valueField: 'id',									
                                                    store: StatusClientes,
                                                    queryMode: 'local',
                                                    tabIndex: 29,
                                                    typeAhead: true, 
                                                    colspan: 2
                                        },
                                        {
                                                    xtype: 'combobox',
                                                    id:     'cmbIdVendedor01',
                                                    itemId: 'cmbIdVendedor01',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Vendedores',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    editable: false,
                                                    blankText: 'Requiere de un Vendedors',
                                                    emptyText: '---- Seleccione un Vendedor ----',
                                                    forceSelection: true,
                                                    displayField: 'NombreCompletoVendedor',
                                                    valueField: 'id',									
                                                    store: Vendedores,
                                                    queryMode: 'local',
                                                    tabIndex: 31,
                                                    typeAhead: true, 
                                                    colspan: 2
                                        },
                                        {
                                                    xtype: 'combobox',
                                                    id:     'cmbIdInstalacion01',
                                                    itemId: 'cmbIdInstalacion01',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Instalacion',
                                                    labelPad: -25,
                                                    allowBlank: true,
                                                    editable: false,
                                                    blankText: 'Requiere de una Instalacion',
                                                    emptyText: '---- Seleccione una Instalacion ----',
                                                    forceSelection: true,
                                                    displayField: 'NombreInst',
                                                    valueField: 'id',									
                                                    store: Instalaciones,
                                                    queryMode: 'local',
                                                    tabIndex: 33,
                                                    typeAhead: true, 
                                                    colspan: 2
                                        },
                                        {
                                            xtype:  'datefield',
                                            id:     'dateFechaInicio01',
                                            itemId: 'dateFechaInicio01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Fecha Inicio',
                                            labelPad: 10,
                                            allowBlank: true,
                                            emptyText: 'Selecc. una fecha de inicio',
                                            format: 'd/m/Y',
                                            tabIndex: 35,
                                            editable: false,
                                            showToday: false,
                                            colspan: 2
                                        }, 
                                        {
                                            xtype:  'datefield',
                                            id:     'dateFechaTerminacion01',
                                            itemId: 'dateFechaTerminacion01',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Fecha Terminacion',
                                            labelPad: 10,
                                            allowBlank: true,
                                            emptyText: 'Selecc. una fecha de terminacion',
                                            format: 'd/m/Y',
                                            tabIndex: 37,
                                            editable: false,
                                            showToday: false,
                                            colspan: 2
                                        }, 
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
                                                    emptyText: '---- Seleccione una provincia ----',
                                                    forceSelection: true,
                                                    displayField: 'DesLarga',
                                                    valueField: 'CodProv',									
                                                    store:storeProv,
                                                    queryMode: 'local',
                                                    tabIndex: 39,
                                                    typeAhead: true,
                                                     colspan: 2
                                        },
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
                                                    emptyText: '---- Seleccione un canton ----',
                                                    forceSelection: true,
                                                    displayField: 'DesLarga',
                                                    valueField: 'CodCanton',									
                                                    store:storeCanton,
                                                    queryMode: 'local',
                                                    tabIndex: 41,
                                                    typeAhead: true,
                                                    colspan: 2
                                        },     
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
                                                    tabIndex: 43,
                                                    typeAhead: true,
                                                     colspan: 2
                                        }
                                    ]
                                
                            },
                            {       xtype: 'panel',
                                    height: 50,
                                    width: 710,
                                    bodyStyle: 'border:none;',
                                    style: 'margin-top:05px;margin-bottom:15px;',
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
                                                tabIndex: 50,
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
                                                tabIndex: 55,
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
