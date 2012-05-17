Ext.define('AJugarFutbol.view.instalacion.Informacion', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winInformacion',
         
    id:'winInformacion',
    itemId: 'winInformacion',
    height: 399,
    width: 565,
    //maxHeight: 389,
    //minHeight: 389, 
    //minWidth: 813,
    //maxWidth: 813,     
    modal:true,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Informaci&oacute;n',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {
                        type: 'column'
                    },
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 125,
                            id: 'plnInfoEncabezado',
                            itemId: 'plnInfoEncabezado',
                            width: 808,
                            layout: {
                                type: 'column'
                            },
                            bodyStyle: 'border:none;background:#F2F2F2;',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 125,
                                    id: 'infoImgFoto1',
                                    itemId: 'infoImgFoto1',
                                    width: 115,
                                    src: ''
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblNombreInstalacion',
                                    itemId: 'lblNombreInstalacion',
                                    style:'margin-top:20px;margin-left:10px;',
                                    width: 200,
                                    value: '<b style=\'font-size:12pt;\'>Titulo</b>'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'infoChkFavorita',
                                    itemId: 'infoChkFavorita',
                                    style:'margin-left:165px;',
                                    boxLabel: 'Favorita'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 166,
                            margin: 5,
                            width: 546,
                            layout: {
                                columns: 2,
                                type: 'table'
                            },
                            title: 'Contacto',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblEncargado',
                                    itemId: 'lblEncargado',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 230,
                                    value: '',
                                    fieldLabel: 'Encargado',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblTelefono',
                                    itemId: 'lblTelefono',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 230,
                                    value: 'Display Field',
                                    fieldLabel: 'Tel&eacute;fonos',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblCorreo',
                                    itemId: 'lblCorreo',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 230,
                                    value: 'Display Field',
                                    fieldLabel: 'Correo',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFax',
                                    itemId: 'lblFax',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 210,
                                    value: 'Display Field',
                                    fieldLabel: 'Fax',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblPaginaWeb',
                                    itemId: 'lblPaginaWeb',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 230,
                                    value: 'Display Field',
                                    fieldLabel: 'P&aacute;gina Web',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHorario',
                                    itemId: 'lblHorario',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 210,
                                    value: 'Display Field',
                                    fieldLabel: 'Horario',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblDireccion',
                                    itemId: 'lblDireccion',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 504,
                                    height: 40,
                                    value: 'Display Field',
                                    fieldLabel: 'Direcci&oacute;n',
                                    labelPad: -20,
                                    colspan: 2
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 56,
                            margin: 5,
                            width: 546,
                            title: 'Servicios',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 33,
                                    width: 37,
                                    src: 'resources/iconosServicios/parqueo.png'
                                },
                                {
                                    xtype: 'image',
                                    height: 33,
                                    width: 37,
                                    src: 'resources/iconosServicios/cruz.png'
                                },
                                {
                                    xtype: 'image',
                                    height: 33,
                                    width: 37,
                                    src: 'resources/iconosServicios/restaurante.png'
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