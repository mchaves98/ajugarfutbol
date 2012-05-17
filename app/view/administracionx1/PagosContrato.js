Ext.define('AJugarFutbol.view.administradorx1.PagosContrato', {
    extend: 'Ext.window.Window',
    
    alias : 'widget.winPagosContratos',
    id:     'winPagosContrato',
    itemId: 'winPagosContrato',
    height: 610,
    width: 600,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Pagos de Contrato',

    initComponent: function() {
    
    var me = this;
        Ext.applyIf(me, {
            items: [
                        {
                            xtype: 'panel',
                            height: 600,
                            width: 600,
                            style: 'margin-left:10px;',
                            id:     'pnlListaPagos01',
                            itemId: 'pnlListaPagos01',
                            title: '<span style="font-size:13px;">Listado de Pagos</span>',
                            autoScroll: true
                        }
                    ]
                });

        me.callParent(arguments);
    }
});