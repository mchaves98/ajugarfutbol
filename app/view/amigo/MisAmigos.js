Ext.define('AJugarFutbol.view.amigo.MisAmigos', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.winMisAmigos',
    id: 'winMisAmigos',
    itemId: 'winMisAmigos',
    width:760,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;', 
    items: [
        {xtype: 'panel',
                    id: 'plnMisAmigos',
                    itemId: 'plnMisAmigos',
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
        var idAmistad = 99;
        var idAmigo = 0;
        var idInvitacion = 0;
        frmAmigo = [{
                    xtype: 'panel',
                    id: 'plnAmigo'+i,
                    itemId: 'plnAmigo'+i,
                    margin: 10,
                    width: 360,
                    height: 150,
                    bodyStyle:'background-color:transparent;border:none;',  
                    layout: {columns: 2,type: 'table'},
                    
                    items: [{xtype: 'fieldset',
                            id: 'plnFieldSet04'+i,
                            itemId: 'plnFieldSet04'+i,
                            height: 140,
                            width: 355,
                            margin: 5,
                            layout: {columns: 2,type: 'table'},
                            title: 'Mi Amigo(a)',
                            items: [
                                {
                                    xtype: 'image',
                                    height: 106,
                                    id: 'imgFoto04'+i,
                                    itemId: 'imgFoto04'+i,
                                    width: 101,
                                    src: 'resources/fotosUsuarios/'+fotoFile,
                                    rowspan: 2
                                },
                                {
                                    xtype: 'panel',
                                    height: 60,
                                    id: 'plnInfo04'+i,
                                    itemId: 'plnInfo04'+i,
                                    width: 250,
                                    margin: 5,
                                    //bodyStyle: 'border:none;background:#E6E6E6;',
                                    bodyStyle: 'border:none;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCorreo04'+i,
                                            itemId: 'lblCorreo04'+i,
                                            margin: 5,
                                            width: 252,
                                            value: '<b>'+correo+'</b>'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblNombre04'+i,
                                            itemId: 'lblNombre04'+i,
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
                                            id: 'btnEnviarMensaje'+i,
                                            itemId: 'btnEnviarMensaje',
                                            idItem: i,
                                            idAmigo: idAmigo,
                                            correo: correo,
                                            nombre: nombre+' '+apellidos,
                                            idAmistad: idAmistad,
                                            idInvitacion: idInvitacion,
                                            style: 'margin-top:5px;margin-left:20px;',
                                            width: 90,
                                            text: 'Enviar Mensaje',
                                            tooltip: 'Enviar un Mensaje a su Amigo'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 32,
                                            id: 'btnEliminarAmigo'+i,
                                            itemId: 'btnEliminarAmigo',
                                            idItem: i,
                                            idAmigo: idAmigo,
                                            correo: correo,
                                            nombre: nombre+' '+apellidos,
                                            idAmistad: idAmistad,
                                            idInvitacion: idInvitacion,
                                            style: 'margin-top:5px;margin-left:20px;',
                                            width: 90,
                                            text: 'Eliminar Amigo',
                                            tooltip: 'Eliminar al Amigo'
                                        }
                                    ]
                                }
                    ]}]}];
  
        me.callParent(arguments);
      }
});