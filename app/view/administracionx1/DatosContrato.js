Ext.define('AJugarFutbol.view.administracionx1.DatosContrato', {
    extend: 'Ext.window.Window',

    alias : 'widget.winDatosContrato',
    config : {title: '', idContrato: '0', indexStore: '0'},
    id:     'winDatosContrato',
    itemId: 'winDatosContrato',
    width: 765,
    resizable: false,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Informaci\u00F3n de Contrato',
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtNumeroContrato',
    closable: true,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;
        var StatusContratos = Ext.getStore('catalogos.StatusContratos');
        var Vendedores     = Ext.getStore('catalogos.Vendedores');
        var Clientes       = Ext.getStore('catalogos.Clientes');
       
        StatusContratos.clearFilter(true);
        Vendedores.clearFilter(true);
        Clientes.clearFilter(true);
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id:     'pnlDatosContrato02',
                    itemId: 'pnlDatosContrato02',
                    layout: {type: 'fit'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'form',
                            id:     'frmDatosContrato02',
                            itemId: 'frmDatosContrato02',
                            margin: 3,
                            width:  740,
                            layout: {columns: 1,type: 'table'},
                            bodyStyle: 'border:none;',
                            items: [                                
                                {
                                    xtype: 'fieldset',
                                    margin: 5,
                                    width: 720,
                                    title: '<span style="font-size:15px;">Datos Contrato</span>',
                                    layout: {columns: 4,type: 'table'},
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            id:     'txtNumeroContrato02',
                                            itemId: 'txtNumeroContrato02',
                                            labelPad: 10,
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Número Contrato',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 5, 
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            tabIndex: 01,
                                            blankText: 'Requiere de un Número de Contrato',
                                            emptyText: 'Digite un Número de Contrato'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;margin-right:20px;',
                                                tooltip: 'Digite el Número del Contrato, Ejemplo: 1'
                                        },  
                                        {
                                            xtype: 'combobox',
                                            id:     'cmbIdCliente02',
                                            itemId: 'cmbIdCliente02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Cliente',
                                            labelPad: -25,
                                            allowBlank: false,
                                            editable: false,
                                            blankText: 'Requiere de un Cliente',
                                            emptyText: '---- Seleccione un Cliente ----',
                                            forceSelection: true,
                                            displayField: 'NombreInstalacion',
                                            valueField: 'id',									
                                            store: Clientes,
                                            queryMode: 'local',
                                            tabIndex: 03,
                                            typeAhead: true, 
                                            colspan: 2
                                        },
                                        {
                                            xtype: 'combobox',
                                            id:     'cmbIdVendedor02',
                                            itemId: 'cmbIdVendedor02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Vendedor',
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
                                            tabIndex: 05,
                                            typeAhead: true, 
                                            colspan: 2
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtPorcComision02',
                                            itemId: 'txtPorcComision02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Porcentaje Comisión',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 70, 
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            tabIndex: 07,
                                            blankText: 'Requiere de un Porcentaje de Comisión',
                                            emptyText: 'Digite un Porcentaje de Comisión'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite el Porcentaje de Comisión para el Vendedor. Ejemplo: 10'
                                        },  
                                        {
                                            xtype:  'datefield',
                                            id:     'dateFechaInicio02',
                                            itemId: 'dateFechaInicio02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Fecha Inicio',
                                            labelPad: 10,
                                            allowBlank: false,
                                            emptyText: 'Selecc. una fecha de inicio',
                                            format: 'd/m/Y',
                                            tabIndex: 11,
                                            editable: false,
                                            showToday: false,
                                            colspan: 2
                                        }, 
                                        {
                                            xtype:  'datefield',
                                            id:     'dateFechaTerminacion02',
                                            itemId: 'dateFechaTerminacion02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Fecha Terminación',
                                            labelPad: 10,
                                            allowBlank: false,
                                            emptyText: 'Selecc. una fecha de terminación',
                                            format: 'd/m/Y',
                                            tabIndex: 15,
                                            editable: false,
                                            showToday: false,
                                            colspan: 2
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtCantCanchas02',
                                            itemId: 'txtCantCanchas02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Cantidad de Canchas',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 2, 
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            tabIndex: 17,
                                            blankText: 'Requiere la Cantidad de Canchas',
                                            emptyText: 'Digite la Cantidad de Canchas'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite la cantidad de Canchas que cubre el Contrato.  Ejemplo: 2'
                                        },  
                                        {
                                            xtype: 'textfield',
                                            id:     'txtCantUsuarios02',
                                            itemId: 'txtCantUsuarios02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Cantidad de Usuarios',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 2, 
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            tabIndex: 18,
                                            blankText: 'Requiere la Cantidad de Usuarios',
                                            emptyText: 'Digite la Cantidad de Usuarios'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite la cantidad de Usuarios que cubre el Contrato.  Ejemplo: 3'
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtComentarioContrato02',
                                            itemId: 'txtComentarioContrato02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Comentario',
                                            allowBlank: true,
                                            enableKeyEvents: true,                                            
                                            largo: 70, 
                                            tipoCampo: 'Texto',
                                            aceptaBlancos: 'SI',
                                            tabIndex: 25,
                                            emptyText: 'Digite un Comentario'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite un Comentario. (Campo acepta hasta 70 caracteres)'
                                        },
                                        
                                        {
                                            xtype: 'textfield',
                                            id:     'txtMesesContrato02',
                                            itemId: 'txtMesesContrato02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Meses del Contrato',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 2, 
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            tabIndex: 27,
                                            blankText: 'Requiere la Cantidad de Meses del Contrato',
                                            emptyText: 'Digite Meses del Contrato'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite la cantidad de meses de vigencia del Contrato.  Ejemplo: 12'
                                        },  
                                        {
                                            xtype: 'textfield',
                                            id:     'txtMontoMesDolares02',
                                            itemId: 'txtMontoMesDolares02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Monto Mensual Dolares',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 3, 
                                            tipoCampo: 'SoloNumeros',
                                            aceptaBlancos: 'NO',
                                            tabIndex: 29,
                                            blankText: 'Requiere Monto Mensual en Dolares del Contrato',
                                            emptyText: 'Digite el Monto Mensual del Contrato'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite Monto Mensual en Dolares del Contrato.  Ejemplo: 50'
                                        },
                                        {
                                            xtype: 'radiogroup',                                            
                                            id: 'rgPagaPrimerMes',                                            
                                            margin: 5,   
                                            width: 300,
                                            defaults: {name: 'PagaPrimerMes'},
                                            fieldLabel: 'Paga Primer Mes?',
                                            colspan: 2,
                                            items: [
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rbtnSiPaga02',
                                                    itemId: 'rbtnSiPaga02',
                                                    tabIndex: 30,
                                                    value:  'SI',
                                                    boxLabel: 'Si Paga'
                                                },
                                                {
                                                    xtype:  'radiofield',
                                                    id:     'rbtnNoPaga02',
                                                    itemId: 'rbtnNoPaga02',
                                                    tabIndex: 32,
                                                    value:  'NO',
                                                    boxLabel: 'No Paga'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'textfield',
                                            id:     'txtServicioFacturar02',
                                            itemId: 'txtServicioFacturar02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Servicio a Facturar',
                                            allowBlank: false,
                                            enableKeyEvents: true,                                            
                                            largo: 70, 
                                            tipoCampo: 'Letras-NumerosConPunto-Coma',
                                            aceptaBlancos: 'SI',
                                            tabIndex: 29,
                                            blankText: 'Requiere Servicio a Facturar',
                                            emptyText: 'Digite el Servicio a Facturar'
                                        },
                                        {
                                            xtype: 'button',
                                                height: 20,
                                                width:  20,
                                                icon: 'resources/imagenes/ayuda.jpg',
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:05px;',
                                                tooltip: 'Digite el Servicio a Facturar.  El concepto en el recibo.'
                                        },
                                        {
                                            xtype:  'datefield',
                                            id:     'dateFechaPrimerPago02',
                                            itemId: 'dateFechaPrimerPago02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Fecha Primer Pago',
                                            labelPad: 10,
                                            allowBlank: true,
                                            format: 'd/m/Y',
                                            readOnly: true,
                                            editable: false,
                                            colspan: 2
                                        },
                                        {
                                            xtype:  'textfield',
                                            id:     'txtCantidadPagos02',
                                            itemId: 'txtCantidadPagos02',
                                            margin: 5,
                                            width: 300,
                                            fieldLabel: 'Cantidad de Pagos',
                                            labelPad: 10,
                                            allowBlank: true,
                                            readOnly: true,
                                            colspan: 2
                                        },
                                        {
                                                    xtype: 'combobox',
                                                    id:     'cmbStatus02',
                                                    itemId: 'cmbStatus02',
                                                    style: 'margin-top:05px;margin-bottom:15px;margin-left:05px;',
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
                                                    store: StatusContratos,
                                                    queryMode: 'local',
                                                    tabIndex: 29,
                                                    typeAhead: true, 
                                                    colspan: 2
                                        },
                                        {
                                            xtype: 'button',
                                            id:     'btnGenerarPagos',
                                            itemId: 'btnGenerarPagos',
                                            height: 20,
                                            width:  200,
                                            text: 'Generar Registros de Pagos',
                                            style: 'color: #f33333; border: 1px #666666 solid; background-color: #fff000; font-weight: bold;',
                                            tooltip: 'Genera los Registros de Pago para este Contrato.'
                                        },
                                        {
                                            xtype: 'label',
                                            id: 'lblPagosOk',
                                            style: 'font-weight: bold;',
                                            width:  200,
                                            itemId: 'lblPagosOk',
                                            text: 'PAGOS OK'
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
                                                id:     'btnActualizarContrato',
                                                itemId: 'btnActualizarContrato',
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
                                                id:     'btnSalirDatosContrato',
                                                itemId: 'btnSalirDatosContrato',
                                                width: 145,
                                                icon: 'resources/imagenes/salir.png',
                                                iconCls: 'x-btn-text-icon',
                                                scale: 'large',
                                                tabIndex: 55,
                                                style: 'margin-top:05px;margin-bottom:05px;margin-left:130px;',
                                                text: 'Salir',
                                                tooltip: 'Salir sin aplicar cambios a los datos del Contrato'
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
