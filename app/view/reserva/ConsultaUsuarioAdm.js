Ext.define('AJugarFutbol.view.reserva.ConsultaUsuarioAdm', {
   extend: 'Ext.window.Window',

    alias : 'widget.winConsultaUsuarioAdm',
    id: 'winConsultaUsuarioAdm',
    itemId: 'winConsultaUsuarioAdm',
    height: 400,
    width: 745,
    modal:true,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Informaci&oacute;n de Usuario',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {type: 'fit'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'form',
                            height: 415,
                            id: 'frmLogin01',
                            itemId: 'frmLogin01',
                            margin: 7,
                            width: 744,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'border:none;',
                            items: [                                
                                {
                                    xtype: 'fieldset',
                                    height: 270,
                                    margin: 10,
                                    width: 344,
                                    layout: {columns: 1,type: 'table'},
                                    rowspan: 2,
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            margin: 5,
                                            value: 'Display Field',
                                            fieldLabel: 'Correo'                                                                                      
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtCUACedula',
                                            itemId: 'txtCUACedula',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'C&eacute;dula',
                                            allowBlank: false,
                                            blankText: 'Requiere de una cédula',
                                            emptyText: 'Digite una cedula'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtCUANombre',
                                            itemId: 'txtCUANombre',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Nombre',
                                            allowBlank: false,
                                            blankText: 'Requiere de un nombre',
                                            emptyText: 'Digite un nombre'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtCUAApellido',
                                            itemId: 'txtCUAApellido',
                                            margin: 5,
                                            width: 311,
                                            fieldLabel: 'Apellido(s)',
                                            allowBlank: false,
                                            blankText: 'Requiere de un apellido',
                                            emptyText: 'Digite un apellido'
                                        },                                       
                                        {
                                            xtype: 'textfield',
                                            id: 'txtCUATelefono1',
                                            itemId: 'txtCUATelefono1',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Tel&eacute;fono 1',
                                            allowBlank: false,
                                            blankText: 'Requiere de un celular',
                                            emptyText: 'Digite un telefono o celular'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id: 'txtCUATelefono2',
                                            itemId: 'txtCUATelefono2',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Tel&eacute;fono 2',
                                            allowBlank: false,
                                            blankText: 'Requiere de un celular',
                                            emptyText: 'Digite su telefono o celular'
                                        },
                                        {
                                            xtype: 'radiogroup',                                            
                                            id: 'Grupo',                                            
                                            margin: 5,   
                                            width: 300,
                                            defaults: {name: 'genero'},
                                            fieldLabel: 'Genero',
                                            items: [
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'rbdCUAMasculino',
                                                    itemId: 'rbdCUAMasculino',
                                                    value: 'M',
                                                    boxLabel: 'Masculino',
                                                    checked: true
                                                },
                                                {
                                                    xtype: 'radiofield',
                                                    id: 'rbdCUAFemenino',
                                                    itemId: 'rbdCUAFemenino',
                                                    value: 'F',
                                                    boxLabel: 'Femenino'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'datefield',
                                            id: 'dateCUAFechaNacimiento',
                                            itemId: 'dateCUAFechaNacimiento',
                                            margin: 5,
                                            width: 312,
                                            fieldLabel: 'Fecha Nacimiento',
                                            labelPad: 10,
                                            allowBlank: false,
                                            blankText: 'Requiere de una fecha',
                                            emptyText: 'Selecc. una fecha de nacimiento',
                                            format: 'd/m/Y',
                                            showToday: false
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 134,
                                    margin: 10,
                                    width: 143,
                                    layout: {align: 'center',pack: 'center',type: 'vbox'},
                                    items: [
                                        {
                                            xtype: 'image',                                            
                                            itemId: 'imgCUAFotoUsuario',
                                            height: 101,
                                            margin: 5,
                                            width: 101,
                                            src: ''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldset',
                                    height: 116,
                                    margin: 10,
                                    width: 330,
                                    title: 'Direcci&oacute;n',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            height: 31,
                                            width: 337,
                                            bodyStyle: 'border:none;',
                                            items: [
                                                {
                                                    xtype: 'combobox',
                                                    id: 'cmbCUAProvincia',
                                                    itemId: 'cmbCUAProvincia',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Provincia',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    blankText: 'Requiere de una provincia',
                                                    emptyText: '---- Seleccione una provincia ----'
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
                                                    id: 'cmbCUACanton',
                                                    itemId: 'cmbCUACanton',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Cant&oacute;n',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    blankText: 'Requiere de un cant&oacute;n',
                                                    emptyText: '---- Seleccione un canton ----'
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
                                                    id: 'cmbCUADistrito',
                                                    itemId: 'cmbCUADistrito',
                                                    margin: 5,
                                                    width: 300,
                                                    fieldLabel: 'Distrito',
                                                    labelPad: -25,
                                                    allowBlank: false,
                                                    blankText: 'Requiere de un distrito',
                                                    emptyText: '---- Seleccione un distrito ----'
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 50,
                                    width: 710,
                                    layout: {align: 'center',pack: 'center',type: 'vbox'},
                                    bodyStyle: 'border:none;',
                                    colspan: 2,
                                    items: [
                                        {
                                            xtype: 'button',
                                            height: 50,
                                            id: 'btnCUAActualizarAdmUsuario',
                                            itemId: 'btnCUAActualizarAdmUsuario',
                                            width: 145,
                                            icon: 'resources/imagenes/listo.png',
                                            iconCls: 'x-btn-text-icon',
                                            scale: 'large',
                                            text: 'Actualizar Datos',
                                            tooltip: 'Con datos completos, has click y actualiza los datos'
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