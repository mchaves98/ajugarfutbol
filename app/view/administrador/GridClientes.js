Ext.define('AJugarFutbol.view.administrador.GridClientes', {
    extend: 'Ext.panel.Panel',
    config : {title: '', idInstalacion: '0'},
    alias : 'widget.pnlGridClientes',
    id:     'pnlGridClientes',
    itemId: 'pnlGridClientes',
    width:760,
    resizable: false,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;',
    defaultFocus: 'txtFiltro01',
    title: 'Lista de Clientes',
    
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [{
                    xtype: 'panel',
                    id:     'pnlFiltroCliente',
                    itemId: 'pnlFiltroCliente',
                    width:  720,
                    layout: {columns: 3,type: 'table'},
                    style: 'margin-left: 20px; text-align: center',
                    bodyStyle:'background-color:transparent;border:none;',
                    items:  [{
                                    xtype:  'textfield',
                                    id:     'txtFiltro01',
                                    itemId: 'txtFiltro01',
                                    style: 'margin-top:5px;',
                                    width: 250,
                                    height: 40,
                                    labelPad: -15,
                                    tabIndex: 01,
                                    enableKeyEvents: true,
                                    allowBlank: true,
                                    emptyText: 'Digite el nombre de un cliente'
                                },
                                {
                                    xtype: 'button',
                                    width: 110,
                                    height: 40,
                                    scale: 'large',
                                    id:     'btnFiltrarNombreCliente',
                                    itemId: 'btnFiltrarNombreCliente',
                                    style: 'margin-left:10px;',
                                    text: '<b>Buscar</b>',
                                    tabIndex: 03,
                                    icon: 'resources/imagenes/iconoBuscar.png'
                                },
                                {
                                    xtype: 'button',
                                    width: 120,
                                    height: 40,                                    
                                    id:     'btnIncluirClienteNuevo',
                                    itemId: 'btnIncluirClienteNuevo',
                                    style: 'margin-left:10px;margin-right:200px;',
                                    text: '<b>Incluir Cliente</b>',
                                    tabIndex: 05,
                                    icon: 'resources/imagenes/add.png'                                    
                                },                                
                                {
                                            xtype: 'panel',
                                            height: 40,
                                            width: 720,
                                            style: 'margin-top:3px;',
                                            layout: {columns: 8,type: 'table'},
                                            colspan: 3,
                                            items: [{
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxControl',
                                                       itemId    : 'checkboxControl',
                                                       tabIndex: 08,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:20px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxLunx',
                                                       itemId    : 'checkboxLunx',
                                                       boxLabel  : 'Lunes',
                                                       tabIndex: 07,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:40px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxMarx',
                                                       itemId    : 'checkboxMarx',
                                                       boxLabel  : 'Martes',
                                                       tabIndex: 9,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:30px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxMiex',
                                                       itemId    : 'checkboxMiex',
                                                       boxLabel  : 'Mi\u00E9rcoles',
                                                       tabIndex: 12,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:30px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxJuex',
                                                       itemId    : 'checkboxJuex',
                                                       boxLabel  : 'Jueves',
                                                       tabIndex: 15,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:30px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxViex',
                                                       itemId    : 'checkboxViex',
                                                       boxLabel  : 'Viernes',
                                                       tabIndex: 17,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:30px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxSabx',
                                                       itemId    : 'checkboxSabx',
                                                       boxLabel  : 'S\u00E1bado',
                                                       tabIndex: 19,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:30px;'
                                                
                                                     },
                                                     {
                                                       xtype     : 'checkbox',
                                                       id        : 'checkboxDomx',
                                                       itemId    : 'checkboxDomx',
                                                       boxLabel  : 'Domingo',
                                                       tabIndex: 21,
                                                       style: 'margin-top:05px;margin-bottom:05px;margin-left:30px;'
                                                
                                                     }
                                                   ]
                                        }
                                
                           ]
                    
                    
                  },
                  {
                    xtype: 'panel',
                    id:     'pnlClientes01',
                    itemId: 'pnlClientes01',
                    width:  720,
                    height: 455,
                    layout: {columns: 1,type: 'table'},
                    style: 'margin-left: 20px; text-align: center',
                    bodyStyle:'background-color:transparent;',
                    items:  []
                  }] 
        });

        me.callParent(arguments);
    }
});