Ext.define('AJugarFutbol.view.administracionx1.GridClientes', {
    extend: 'Ext.panel.Panel',
    config : {title: ''},
    alias : 'widget.pnlGridClientes',
    id:     'pnlGridClientes',
    itemId: 'pnlGridClientes',
    width:760,
    resizable: false,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;',
    defaultFocus: 'txtFiltro01',
    title: 'Lista de Clientes de JSoluciones, S.A.',
    
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