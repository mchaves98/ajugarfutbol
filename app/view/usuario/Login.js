Ext.define('AJugarFutbol.view.usuario.Login', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winLogin',
	 
    id: 'winLogin',
    itemId: 'winLogin',
    height: 235,
    width: 353,
    maxHeight: 235,
    minHeight: 235, 
    minWidth: 353,
    maxWidth: 353,     
    layout: {
        type: 'fit'
    },
    bodyStyle: 'border:none;',
    title: 'Ingresar',
    modal: true,
    animateTarget: 'btnIngresarPrincipal',
    defaultFocus: 'txtCorreo',
    shadow : 'drop', 
    closable: true,
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
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'panel',
                            height: 159,
                            id: 'plnIngresar',
                            itemId: 'plnIngresar',
                            width: 403,
                            layout: {
                                type: 'column'
                            },
                            bodyStyle: 'border:none;background:#F2F2F2;',
                            items: [
                                {
                                    xtype: 'button',
                                    id: 'btnRegistrarse',
                                    itemId: 'btnRegistrarse',
                                    style: 'margin-left:10px;margin-top:10px;border:0px;background:#F2F2F2;',
                                    text: '<big>&#191;No ten&eacute;s una cuenta? <b><font color=red>Crea una AQU&Iacute;</font></b></big>'
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
                                    width: 250,
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
                                    width: 250,
                                    fieldLabel: 'Contrase&ntilde;a',
                                    inputType: 'password',
                                    blankText: 'Requiere de una contraseña',
                                    enableKeyEvents:true,
                                    emptyText: 'Digite su contraseña',
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
                            width: 425,
                            layout: {
                                type: 'column'
                            },
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
                }
            ]
        });

        me.callParent(arguments);
    }
});