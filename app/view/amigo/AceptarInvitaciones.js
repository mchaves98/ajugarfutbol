Ext.define('AJugarFutbol.view.amigo.AceptarInvitaciones', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.winAceptarInvitaciones',
    id: 'winAceptarInvitaciones',
    itemId: 'winAceptarInvitaciones',
    width:760,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;', 
    items: [
        {xtype: 'panel',
                    id: 'plnInvitaciones',
                    itemId: 'plnInvitaciones',
                    width: 760,
                    layout: {columns: 2,type: 'table'},
                    bodyStyle:'background-color:transparent;border:none;'    
        }
        
    ],
    
    initComponent: function() {
        var me = this;
        var i = 9;
        var correo = 'prueba@prueba.com';
        var fotoFile = 'prueba.jpg';
        var nombre = 'Prueba';
        var apellidos = 'Pruebas';
        var idInvitacion=99;
        frmInvitacion = [{
                    xtype: 'panel',
                    id: 'plnInvitacion'+i,
                    itemId: 'plnInvitacion'+i,
                    margin: 10,
                    width: 360,
                    height: 150,
                    bodyStyle:'background-color:transparent;border:none;',  
                    layout: {columns: 2,type: 'table'},
                    
                    items: [{xtype: 'fieldset',
                            id: 'plnFieldSet'+i,
                            itemId: 'plnFieldSet'+i,
                            height: 140,
                            width: 355,
                            margin: 5,
                            layout: {columns: 2,type: 'table'},
                            title: 'Invitación',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 106,
                                    id: 'imgFoto'+i,
                                    itemId: 'imgFoto'+i,
                                    width: 101,
                                    src: 'resources/fotosUsuarios/'+fotoFile,
                                    rowspan: 2
                                },
                                {
                                    xtype: 'panel',
                                    height: 60,
                                    id: 'plnInfo'+i,
                                    itemId: 'plnInfo'+i,
                                    width: 250,
                                    margin: 5,
                                    //bodyStyle: 'border:none;background:#E6E6E6;',
                                    bodyStyle: 'border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCorreo'+i,
                                            itemId: 'lblCorreo'+i,
                                            margin: 5,
                                            width: 252,
                                            value: '<b>'+correo+'</b>'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblNombre'+i,
                                            itemId: 'lblNombre'+i,
                                            margin: 5,
                                            width: 250,
                                            value: '<b>'+nombre+' '+apellidos+'</b>'
                                         }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 40,
                                    width: 250,
                                    layout: {type: 'table'},
                                    bodyStyle: 'border:none;',
                                    margin: 5,
                                    items: [
                                        {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnAceptar'+i,
                                            itemId: 'btnAceptar',
                                            idItem: i,
                                            correo: correo,
                                            idInvitacion: idInvitacion,
                                            style: 'margin-top:5px;margin-left:55px;',
                                            width: 65,
                                            text: 'Aceptar',
                                            tooltip: 'Aceptar la invitación'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnDenegar'+i,
                                            itemId: 'btnDenegar',
                                            idItem: i,
                                            correo: correo,
                                            idInvitacion: idInvitacion,
                                            style: 'margin-top:5px;margin-left:40px;',
                                            width: 65,
                                            text: 'Denegar',
                                            tooltip: 'Denegar la invitación'
                                        }
                                    ]
                                }
                    ]}]}];
        
        

        me.callParent(arguments);
      }
});