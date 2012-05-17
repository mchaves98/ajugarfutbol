Ext.define('AJugarFutbol.view.administrador.Login', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winLogin',
	 
    id: 'winLogin',
    itemId: 'winLogin',
    height: 235,
    width: 347,//353 o 700
    maxHeight: 235,
    minHeight: 235, 
    minWidth: 347,
    maxWidth: 700,   
    resizable: false,
    layout: {columns: 2, type: 'table'},
    bodyStyle: 'border:none;',
    title: 'Ingresar al Sitio - Administraci&oacute;n',
    modal: true,
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtCorreo',
    shadow : 'drop', 
    closable :false,
    closeAction : 'hide',

    initComponent: function() {
        var me = this;

        var cookies = unescape(document.cookie)+';';
        //console.log(cookies);
        histUsuarios.removeAll();
        if (cookies.length>0) {
              // Hay al menos un Usuario 
              for (var i=0; i<=1000; i++) {
                   var j = cookies.indexOf('ListUsuarios');
                   if (j < 0) {break;} // No hay mas correos
                   cookies = cookies.substring(j);
                   var k1 = cookies.indexOf('=');   
                   var k2 = cookies.indexOf(';');   
                   histUsuarios.add({correo:cookies.substring(k1+1,k2)});
                   cookies = cookies.substring(k2+1);
              } // Fin del FOR
        } // Fin del IF de cookies 


        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnPrincipal',
                    itemId: 'plnPrincipal',
                    width: 340,
                    height: 230,
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 159,
                            id: 'plnIngresar',
                            itemId: 'plnIngresar',
                            width: 341,
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;background:#DFE7EF;',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnRegistrarse',
                                    itemId: 'btnRegistrarse',
                                    style: 'margin-left:10px;margin-top:10px;border:0px;background:#DFE7EF;',//DFE7EF
                                    text: '<big>&#191;Ten&eacute;s problemas para ingresar? <b><font color=red>Pulsa aqu&iacute;</font></b></big>',
                                    handler: function() {
                                        var panelAyuda=Ext.ComponentQuery.query('#panelDAyudaLogin')[0].setSize(357,230);
                                        var win=Ext.ComponentQuery.query('#winLogin')[0].setSize(700);
                                        var pantalla=screen.width;
                                        var mitadPantalla=pantalla/2;
                                        win.setPosition(mitadPantalla-350);
                                    }
                                },
                                {
                                    xtype: 'displayfield',
                                    style: 'margin-left:10px;',
                                    value: '______________________________________________'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'txtCorreo',
                                    itemId: 'txtCorreo',
                                    style: 'margin-top:10px;margin-left:10px;',
                                    width: 260,
                                    fieldLabel: 'Correo',
                                    labelPad: -20,
                                    store: histUsuarios,
                                    queryMode: 'local',
                                    hideTrigger:true,
                                    displayField: 'correo',
                                    valueField: 'correo',
                                    blankText: 'Requiere de un correo',
                                    emptyText: 'Digite su correo',                                    
                                    vtype: 'email',
                                    vtypeText: 'El formato del correo no es correcto'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtContrasena',
                                    itemId: 'txtContrasena',
                                    style: 'margin-top:10px;margin-left:10px;',
                                    width: 260,
                                    fieldLabel: 'Contrase&ntilde;a',
                                    inputType: 'password',
                                    blankText: 'Requiere de una contrase\u00F1a',
                                    enableKeyEvents:true,
                                    emptyText: 'Digite su contrase\u00F1a',
                                    labelPad: -20
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkNoCerrarSesion',
                                    itemId: 'chkNoCerrarSesion',
                                    style: 'margin-top:5px;margin-left:90px;',
                                    boxLabel: 'No cerrar sesi&oacute;n'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 49,
                            id: 'plnBotones',
                            itemId: 'plnBotones',
                            width: 340,
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    height: 26,
                                    id: 'btnIngresar',
                                    itemId: 'btnIngresar',
                                    icon: 'resources/imagenes/listo.png',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 148,
                                    text: 'Ingresar'
                                },
                                {
                                    xtype: 'button',
                                    height: 26,
                                    id: 'btnOlvidoContrasena',
                                    itemId: 'btnOlvidoContrasena',
                                    style: 'margin-left:25px;margin-top:10px;',
                                    icon: 'resources/imagenes/key.png',
                                    width: 148,
                                    text: '&#191;Olvid&oacute; su contrase&ntilde;a?'
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    itemId: 'panelDAyudaLogin',                    
                    height: 1,
                    width: 1,
                    bodyStyle: 'border:none;background:#CA0000',                                        
                    items: [
                        {
                            xtype: 'button', 
                            style:'margin-left:3px;margin-top:2px;background:#FFF;',
                            height: 202,
                            width: 347,
                            textAlign:'left',
                            text: '<p style="margin-top:10px;font-size:14px;"><b>1. </b>Revise si su correo y contrase&ntilde;a son correctos.'+
                                  '<p style="margin-top:5px;font-size:14px;"><b>2. </b>Verifique si en el teclado se encuentra activada la <p style="margin-left:18px;font-size:14px;">may&uacute;scula.</p></p>'+
                                  '<p style="margin-top:5px;font-size:14px;"><b>3. </b>Este sitio es exclusivo para administradores de <p style="margin-left:18px;font-size:14px;">complejos deportivos. Es acceso <b>restringido</b>.</p></p>'+
                                  '<p style="margin-top:5px;font-size:14px;"><b>4. </b>Si es usuario, por favor ingrese <font color=red><b>aqu&iacute;</b></font>.</p>'+
                                  '<p style="margin-top:5px;font-size:14px;"><b>5. </b>Si persiste el error, por favor p&oacute;ngase en contacto <p style="margin-left:18px;font-size:14px;">con nosotros.</p></p>'+
                                  '<center><p style="margin-top:10px;font-size:14px;margin-bottom:13px;"><b>Tel.(506)4030-5570</b> - <b>info@ajugarfutbol.com</b></p></center>',
                            handler: function() {window.location="http://www.ajugarfutbol.com";}
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});