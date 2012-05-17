Ext.define('AJugarFutbol.view.administracionx1.GridContratos', {
    extend: 'Ext.panel.Panel',
    config : {title: ''},
    alias : 'widget.pnlGridContratos',
    id:     'pnlGridContratos',
    itemId: 'pnlGridContratos',
    width:760,
    resizable: false,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;',
    defaultFocus: 'txtFiltro01',
    title: 'Lista de Contratos de JSoluciones, S.A.',
    
    initComponent: function() {
        var me = this;
        console.log('initComponent de pnlGridContratos');
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
                                    id:     'txtFiltro02',
                                    itemId: 'txtFiltro02',
                                    style: 'margin-top:5px;',
                                    width: 250,
                                    height: 40,
                                    labelPad: -15,
                                    tabIndex: 01,
                                    enableKeyEvents: true,
                                    allowBlank: true,
                                    emptyText: 'Digite el nombre de una Instalacion'
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
                                    id:     'btnIncluirContratoNuevo',
                                    itemId: 'btnIncluirContratoNuevo',
                                    style: 'margin-left:10px;margin-right:200px;',
                                    text: '<b>Incluir Contrato</b>',
                                    tabIndex: 05,
                                    icon: 'resources/imagenes/add.png'                                    
                                }
                           ]
                    
                    
                  },
                  {
                    xtype: 'panel',
                    id:     'pnlContratos02',
                    itemId: 'pnlContratos02',
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