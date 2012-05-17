   Ext.define('AJugarFutbol.view.reserva.BusquedaReservar', {
   extend: 'Ext.form.Panel',
    
    alias : 'widget.winBusquedaReservar',
    
    //height: 672,
    id: 'winBusquedaReservar',
    itemId: 'winBusquedaReservar',
    bodyStyle: 'border:none', 
    autoRender:true,
    width: 770,    
    layout: {columns: 1,type: 'table'},

    initComponent: function() {
        var me = this;
        var storeProv   = Ext.getStore('ubicacion.Provincias');
        var storeCanton = Ext.getStore('ubicacion.Cantones');
        var storeDist   = Ext.getStore('ubicacion.Distritos');
        var storeTipoSuperficie   = Ext.getStore('catalogos.TipoSuperficies');
        var storeTipoCancha   = Ext.getStore('catalogos.TipoCanchas');
        
        storeTipoSuperficie.load();
        storeTipoCancha.load();

        var form=Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 200,
                    minHeight :200,
                    id: 'plnBusqueda',                    
                    itemId: 'plnBusqueda',
                    width: 761,
                    collapsible: true,
                    collapsed: false,
                    layout: {columns: 3,type: 'table'},
                    bodyStyle: 'border:none;background:#DFE7EF;',
                    title: 'Busca tu cancha y reserva',
                    items: [
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnProvincia',
                            itemId: 'plnProvincia',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            width: 240,
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbProvincia',
                                    itemId: 'cmbProvincia',
                                    margin: 10,
                                    fieldLabel: 'Provincia',
                                    emptyText: 'Selecc. una provincia',
                                    forceSelection: true,
                                    displayField: 'DesLarga',
                                    valueField: 'CodProv',									
                                    store:storeProv,
                                    queryMode: 'local',                                    
                                    editable:false,
                                    transform: 'stateSelect',
                                    typeAhead: true,
                                    labelPad: -30,
                                    value:0
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnCanton',
                            itemId: 'plnCanton',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            width: 240,
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbCanton',
                                    itemId: 'cmbCanton',
                                    margin: 10,
                                    fieldLabel: 'Cantón',
                                    emptyText: 'Seleccione un cantón',
                                    forceSelection: true,
                                    displayField: 'DesLarga',
                                    valueField: 'CodCanton',									
                                    store:storeCanton,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    transform: 'stateSelect',
                                    autoSelect: false,
                                    editable:false,
                                    labelPad: -30,
                                    value:0,
                                    disabled:true
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnDistrito',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            itemId: 'plnDistrito',
                            width: 240,
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbDistrito',
                                    itemId: 'cmbDistrito',
                                    margin: 10,
                                    fieldLabel: 'Distrito',
                                    emptyText: 'Seleccione un distrito',
                                    forceSelection: true,
                                    displayField: 'DesLarga',
                                    valueField: 'CodDist',									
                                    store:storeDist,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    transform: 'stateSelect',
                                    editable:false,
                                    labelPad: -30,
                                    disabled:true,
                                    value:0
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnCancha',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            itemId: 'plnCancha',
                            width: 240,
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbTipoCancha',
                                    itemId: 'cmbTipoCancha',
                                    margin: 10,
                                    fieldLabel: 'Tipo',
                                    emptyText: 'Seleccione un tipo',
                                    forceSelection: true,
                                    valueField: 'id',
                                    displayField: 'Descripcion',                                    									
                                    store:storeTipoCancha,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    editable:false,
                                    transform: 'stateSelect',                                    
                                    labelPad: -30,
                                    value:10
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnSuperficie',
                            itemId: 'plnSuperficie',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            width: 240,
                            colspan: 2,
                            items: [
                                {
                                    xtype: 'combobox',
                                    id: 'cmbTipoSuperficie',
                                    itemId: 'cmbTipoSuperficie',
                                    margin: 10,
                                    fieldLabel: 'Superficie',
                                    emptyText: 'Selecc. una superficie',
                                    forceSelection: true,                                    
                                    valueField: 'id',	
                                    displayField: 'Descripcion',
                                    store:storeTipoSuperficie,
                                    queryMode: 'local',
                                    typeAhead: true,
                                    editable:false,
                                    transform: 'stateSelect',                                    
                                    labelPad: -30,
                                    value:6
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnFecha',
                            itemId: 'plnFecha',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            width: 240,
                            items: [
                                {
                                    xtype: 'datefield',
                                    id: 'dteFecha',
                                    itemId: 'dteFecha',
                                    margin: 10,
                                    fieldLabel: 'Fecha',
                                    emptyText: 'Seleccione una fecha',
                                    labelPad: -30,
                                    format: 'd/m/Y',
                                    editable:false,
                                    preventMark: true,
                                    minValue: new Date(),
                                    value: new Date()
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 35,
                            id: 'plnHoras',
                            itemId: 'plnHoras',
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            width: 389,
                            layout: {
                                align: 'stretch',
                                type: 'hbox'
                            },
                            colspan: 3,
                            items: [
                                {
                                    xtype: 'timefield',
                                    margin: 5,
                                    width: 170,
                                    fieldLabel: 'Entre',
                                    labelPad: -30,
                                    increment: 60,   
                                    editable:false,
                                    maxValue: '10:00 PM',
                                    minValue: '9:00 AM',
                                    emptyText: 'Primera hora'
                                },
                                {
                                    xtype: 'label',
                                    height: 21,
                                    margin: 5,
                                    width: 10,
                                    text: ' y '
                                },
                                {
                                    xtype: 'timefield',
                                    margin: 5,
                                    width: 105,
                                    labelPad: -30,
                                    editable:false,
                                    increment: 60,
                                    maxValue: '10:00 PM',
                                    minValue: '9:00 AM',
                                    emptyText: 'Segunda Hora'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 50,
                            minHeight :50,
                            width: 755,
                            id: 'plnBuscar',
                            itemId: 'plnBuscar',
                            bodyStyle: 'border:none;background:#DFE7EF;', 
                            layout: {align: 'center',pack: 'end',type: 'vbox'},
                            colspan: 3,
                            items: [
                                {
                                    xtype: 'button',
                                    height: 37,
                                    id: 'btnBuscar',
                                    itemId: 'btnBuscar',                                    
                                    width: 111,
                                    scale: 'large',
                                    icon: 'resources/imagenes/iconoBuscar.png',                                                                        
                                    iconCls: 'x-btn-text-icon',
                                    text: 'Buscar',                                    
                                    tooltip: 'Busca la cancha con las especificaciones que tu deseas'                          
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',                            
                    width: 765,                             
                    id: 'plnInstalaciones',                            
                    itemId: 'plnInstalaciones',
                    bodyStyle: 'border:none;',
                    layout: {type: 'column'}
               },
               {
                    xtype: 'panel',                                                                           
                    id: 'plnVerMasInstalaciones',                            
                    itemId: 'plnVerMasInstalaciones',
                    bodyStyle: 'border:none;',
                    layout: {type: 'fit'},
                    dockedItems: [
                            {
                                xtype: 'button',                                
                                id: 'btnVerMasInstalaciones',
                                itemId: 'btnVerMasInstalaciones',
                                icon: 'resources/imagenes/masAbajo.png',
                                width: 765,
                                height: 42,
                                pagInicio:0,
                                pagFinal:9,
                                totalFilas:0,
                                style: 'background:#F2F2F2;',
                                iconAlign:'bottom',
                                scale: 'large',                                        
                                text: '<b><font size=2>Ver m&aacute;s resultados...</font><b>',
                                tooltip: 'Ver m&aacute;s resultados'
                            }
                    ]
               }
            ]
        });

        me.callParent(arguments);
    }
});
