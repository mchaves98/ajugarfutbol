Ext.define('AJugarFutbol.view.administrador.EditarInstalacion', {
  extend: 'Ext.panel.Panel',
  alias : 'widget.winEditarInstalacion',
	 
id: 'winEditarInstalacion',
itemId: 'winEditarInstalacion',
height: 650,
width: 760,
layout: {type: 'fit'},
bodyStyle: 'border:none;',

    initComponent: function() {
        var me = this;
         var storeProv   = Ext.getStore('ubicacion.Provincias');
        var storeCanton = Ext.getStore('ubicacion.Cantones');
        var storeDist   = Ext.getStore('ubicacion.Distritos');
        
       /* for(var i=0;i<561;i++)
        {
            var CodCanton=storeDist['data']['items'][i]['data']['CodCanton'];
            var CodDist=storeDist['data']['items'][i]['data']['CodDist'];
            var CodPais=storeDist['data']['items'][i]['data']['CodPais']; 
            var CodProv=storeDist['data']['items'][i]['data']['CodProv'];
            var DesCorta=storeDist['data']['items'][i]['data']['DesCorta'];
            var DesLarga=storeDist['data']['items'][i]['data']['DesLarga'];
            var Orden=storeDist['data']['items'][i]['data']['Orden'];
            var TipoRegistro=storeDist['data']['items'][i]['data']['TipoRegistro'];
            var id=storeDist['data']['items'][i]['data']['id'];
            console.log("{id: '"+id+"',CodPais: '"+CodPais+"',CodProv:'"+CodProv+"',CodCanton:'"+CodCanton+"',CodDist:'"+CodDist+"',DesCorta:'"+DesCorta+"',DesLarga:'"+DesLarga+"',TipoRegistro:'"+TipoRegistro+"',Orden:'"+Orden+"'},")
        }
*/
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    margin:5,
                    itemId: 'formEditaInstalacion',
                    layout: {columns: 2,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [                        
                        {
                            xtype: 'fieldset',
                            height: 226,
                            width: 740,
                            colspan:2,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Informaci&oacute;n General de Mi Instalaci&oacute;n</span>',                            
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 200,
                                    width: 480,
                                    layout: {columns: 2,type: 'table'},
                                    bodyStyle: 'border:none;',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtEINombreInstalacion',
                                            style: 'margin-top:10px;',                                    
                                            fieldLabel: 'Nombre de Instalaci&oacute;n',
                                            emptyText: 'Digite un nombre',
                                            width: 370,
                                            maxLength: 50,
                                            maxLengthText: 'Debe tener 50 caracteres.',
                                            allowBlank: false,
                                            blankText: 'Requiere de un nombre',
                                            labelWidth: 150
                                        },
                                        {
                                            xtype: 'button',
                                            height: 20,
                                            width:  20,
                                            icon: 'resources/imagenes/ayuda.jpg',
                                            style: 'margin-left:5px;margin-top:5px;',
                                            tooltip: 'Digite un nombre. Ejemplo: Cancha AJugarFutbol(Campo acepta 50 caracteres)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtEITelefono1',
                                            fieldLabel: 'Tel&eacute;fono 1',
                                            width: 250,                                    
                                            emptyText: 'Digite el tel&eacute;fono o celular',
                                            aceptaBlancos: 'NO',
                                            enableKeyEvents: true,
                                            tipoCampo: 'SoloNumeros',
                                            largo: 8,
                                            allowBlank: false,
                                            maxLength: 8,
                                            maxLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                            minLength: 8,
                                            minLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                            blankText: 'Requiere de un tel&eacute;fono o celular',
                                            labelWidth: 150
                                        },
                                        {
                                            xtype: 'button',
                                            height: 20,
                                            width:  20,
                                            icon: 'resources/imagenes/ayuda.jpg',
                                            style: 'margin-left:5px;margin-bottom:05px;',
                                            tooltip: 'Digite un tel&eacute;fono o celular. Ejemplo: 99999999 (Campo acepta solo 8 n&uacute;meros)'
                                        },
                                        {
                                            xtype: 'textfield',                                    
                                            itemId: 'txtEITelefono2',
                                            width: 250,                                    
                                            fieldLabel: 'Tel&eacute;fono 2',
                                            emptyText: 'Digite el tel&eacute;fono o celular',      
                                            enableKeyEvents: true,
                                            largo: 8,
                                            tipoCampo: 'SoloNumeros',
                                            maxLength: 8,
                                            maxLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                            minLength: 8,
                                            minLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                            labelWidth: 150
                                        },
                                        {
                                            xtype: 'button',
                                            height: 20,
                                            width:  20,
                                            icon: 'resources/imagenes/ayuda.jpg',
                                            style: 'margin-left:5px;margin-bottom:05px;',
                                            tooltip: 'Digite un tel&eacute;fono o celular. Ejemplo: 99999999 (Campo acepta solo 8 n&uacute;meros)(Opcional)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtEIFax',
                                            width: 250,                                    
                                            fieldLabel: 'Fax',
                                            emptyText: 'Digite un fax',    
                                            enableKeyEvents: true,
                                            largo: 8,
                                            tipoCampo: 'SoloNumeros',
                                            maxLength: 8,
                                            maxLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                            minLength: 8,
                                            minLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',                                    
                                            labelWidth: 150
                                        },
                                        {
                                            xtype: 'button',
                                            height: 20,
                                            width:  20,
                                            icon: 'resources/imagenes/ayuda.jpg',
                                            style: 'margin-left:5px;margin-bottom:05px;',
                                            tooltip: 'Digite un fax. Ejemplo: 99999999 (Campo acepta solo 8 n&uacute;meros)(Opcional)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtEICorreo',
                                            width: 370,                                    
                                            fieldLabel: 'Correo',
                                            emptyText: 'Digite un correo',
                                            labelWidth: 150,                                   
                                            vtype: 'email',
                                            vtypeText: 'El formato del correo no es correcto'
                                        },
                                        {
                                            xtype: 'button',
                                            height: 20,
                                            width:  20,
                                            icon: 'resources/imagenes/ayuda.jpg',
                                            style: 'margin-left:5px;margin-bottom:05px;',
                                            tooltip: 'Digite un correo. Ejemplo: ejemplo@ejemplo.com (Campo acepta formato de correo)'
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'txtEIPaginaWeb',
                                            width: 370,                                            
                                            fieldLabel: 'P&aacute;gina Web',
                                            emptyText: 'Digite una pagina web',
                                            labelWidth: 150
                                        },
                                        {
                                            xtype: 'button',
                                            height: 20,
                                            width:  20,
                                            icon: 'resources/imagenes/ayuda.jpg',
                                            style: 'margin-left:5px;margin-bottom:05px;',
                                            tooltip: 'Digite una p&aacute;gina web o facebook. Ejemplo: www.ejemplo.com  - www.facebook.com/ejemplo (Opcional)'
                                        },
                                        {
                                            xtype: 'panel',
                                            height: 25,
                                            width: 397,  
                                            colspan:2,
                                            layout: {columns: 4,type: 'table'},
                                            bodyStyle: 'border:none;',
                                            items: [
                                                {
                                                    xtype: 'timefield',
                                                    itemId: 'txtEITime1',
                                                    width: 244,
                                                    fieldLabel: 'Horario General',
                                                    labelWidth: 150,
                                                    increment: 60,   
                                                    editable:false,
                                                    maxValue: '09:00 PM',
                                                    minValue: '08:00 AM'
                                                },
                                                {
                                                    xtype: 'displayfield',                                            
                                                    style: 'margin-left:10px;margin-right:10px;',
                                                    value: 'a'
                                                },
                                                {
                                                    xtype: 'timefield',
                                                    itemId: 'txtEITime2',
                                                    width: 85,
                                                    increment: 60,   
                                                    editable:false,
                                                    maxValue: '11:00 PM',
                                                    minValue: '09:00 AM'
                                                },
                                                {
                                                    xtype: 'button',
                                                    height: 20,
                                                    width:  20,
                                                    icon: 'resources/imagenes/ayuda.jpg',
                                                    style: 'margin-left:21px;margin-bottom:5px;',
                                                    tooltip: 'Seleccione hora inicial y hora final. Ejemplo: 10:00 AM a 9:00 PM (Debe ser menor la hora inicial)'
                                                }
                                            ]
                                        }
                                    ]
                                },                                
                                {
                                    xtype: 'panel',
                                    itemId: 'plnEILogoInstalacion',
                                    height: 200,
                                    layout: {columns: 1,type: 'table'},                
                                    width: 215,
                                    bodyStyle:'border:none;',
                                    items: [
                                        {
                                            xtype: 'image',                            
                                            itemId: 'imgEILogoInstalacion',
                                            autoRender: true,
                                            style:'margin-top:12px;',
                                            height: 115,
                                            width: 144,
                                            src: ''
                                        },
                                        {
                                            xtype: 'form',
                                            fileUpload: true,
                                            width: 200,
                                            //bodyPadding: 10,
                                            style:'margin-bottom:100px; margin-left:20px;background:#FFF;border:0px;',
                                            frame: true,
                                            bodyStyle: 'border:none;background:#FFF;',                                            
                                            items: [
                                                {
                                                xtype: 'filefield',
                                                itemId:'fileFotoUsuario',
                                                id:'fileFotoUsuario',
                                                name: 'file',
                                                buttonOnly: true,
                                                msgTarget: 'side',                                                
                                                tooltip: 'Presione primero este botón para seleccionar la foto',
                                                //anchor: '100%',
                                                bodyStyle: 'border:none;background:#FFF;',
                                                buttonText: 'Paso 1: Selecciona el logo...'
                                                },
                                                {  
                                                        xtype:'hidden', //<-- campo oculto para enviar el id del usuario
                                                        name:'idHidden01',
                                                        itemId:'idHidden01',
                                                        value:32
                                                },
                                                {  
                                                        xtype:'hidden', //<-- campo oculto para enviar el id del usuario
                                                        name:'ancho01',
                                                        itemId:'ancho01',
                                                        value:144
                                                },
                                                {  
                                                        xtype:'hidden', //<-- campo oculto para enviar el id del usuario
                                                        name:'alto01',
                                                        itemId:'alto01',
                                                        value:115
                                                },
                                                {  
                                                        xtype:'hidden', //<-- campo oculto para enviar el id del usuario
                                                        name:'clase01',
                                                        itemId:'clase01',
                                                        value:'InstalacionDB'
                                                },
                                                {  
                                                        xtype:'hidden', //<-- campo oculto para enviar el id del usuario
                                                        name:'directorio01',
                                                        itemId:'directorio01',
                                                        value:'fotosInstalaciones'
                                                }
                                        ],

                                            buttons: [{
                                                text: 'Paso 2: Cargar Logo',                                                
                                                bodyStyle: 'border:none;',
                                                disabled: 'true',
                                                tooltip: 'Presione este bot\u00F3n para cargar el logo después de haber seleccionado',
                                                itemId:'btnCargarFoto',
                                                id:'btnCargarFoto',
                                              handler: function() {                                           
                                                    var fp = this.up('form').getForm();
                                                    if(fp.isValid()){
                                                        var window = Ext.ComponentQuery.query('#viewport')[0];
                                                        var elMask = window.getEl();
                                                        var objx = this.up('form');
                                                        objx = objx.query('#idHidden01');
                                                        objx = objx[0];
                                                        var idInstalacion= Ext.ComponentQuery.query('#btnAdministracion');
                                                        idInstalacion=idInstalacion[0]['idInstalacion'];
                                                        objx.setValue(idInstalacion);
                                                         
                                                        fp.submit({
                                                            url: 'php/CargarFotoUsuario.php',
                                                           //waitMsg: 'Cargando tu foto......',
                                                           
                                                            success: function(fp, obj) {
                                                                var winx = Ext.ComponentQuery.query('#plnEILogoInstalacion');
                                                                winx = winx[0]; 
                                                                var objx = winx.query('#imgEILogoInstalacion');
                                                                objx = objx[0]; 
                                                                var fotofile = obj.result.fotofile;

                                                                if (fotofile !== null) {
                                                                    objx.setSrc('resources/fotosInstalaciones/'+fotofile);                                                                    
                                                                } else {                                                                       
                                                                       objx.src = objx.setSrc('resources/imagenes/desconocido.jpg');
                                                                       }
                                                                var win = Ext.ComponentQuery.query('#winEditarInstalacion');
                                                                win = win[0]; 
                                                                obj = win.query('#btnCargarFoto');
                                                                obj = obj[0]; 
                                                                obj.setDisabled(true);   
                                                                obj = win.query('#fileFotoUsuario');
                                                                obj = obj[0]; 
                                                                obj.setVisible(true);   
                                                            },
                                                            failure: function(form, obj) {
                                                                 // console.log('Fallo la carga de tulan foto');
                                                                 Ext.Msg.alert('Error', obj.result.errors);
                                                            }

                                                        });
                                                    }
                                                }   
                                              }]
                                            }
                                    ]
                                }
                            ]
                        },                        
                        {
                            xtype: 'fieldset',
                            height: 115,
                            width: 372,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Encargado</span>',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtEINombreEncargado',
                                    style: 'margin-top:10px;',
                                    width: 325,
                                    fieldLabel: 'Nombre Completo',
                                    emptyText: 'Digite nombre completo',
                                    labelWidth: 120,
                                    maxLength: 40,
                                    maxLengthText: 'Debe tener 40 caracteres.',
                                    allowBlank: false,
                                    blankText: 'Requiere del nombre completo'                                   
                                },
                                {
                                    xtype: 'button',
                                    height: 20,
                                    width:  20,
                                    icon: 'resources/imagenes/ayuda.jpg',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    tooltip: 'Digite un nombre completo. Ejemplo: Juan Castro (Campo acepta 50 caracteres)'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtEITelefonoEncargado',
                                    fieldLabel: 'Tel&eacute;fono',
                                    emptyText: 'Digite el tel&eacute;fono o celular',
                                    enableKeyEvents: true,
                                    tipoCampo: 'SoloNumeros',
                                    largo: 8,
                                    width: 250,
                                    labelWidth: 120,
                                    allowBlank: false,
                                    maxLength: 8,
                                    maxLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                    minLength: 8,
                                    minLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                    blankText: 'Requiere de un tel&eacute;fono o celular'
                                },
                                {
                                    xtype: 'button',
                                    height: 20,
                                    width:  20,
                                    icon: 'resources/imagenes/ayuda.jpg',
                                    style: 'margin-left:5px;margin-bottom:5px;',
                                    tooltip: 'Digite un tel&eacute;fono o celular. Ejemplo: 99999999 (Campo acepta solo 8 n&uacute;meros)(Opcional)'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtEICorreoEncargado',
                                    emptyText: 'Digite un correo',
                                    width: 325,
                                    fieldLabel: 'Correo',
                                    labelWidth: 120,                                                                                                        
                                    vtype: 'email',
                                    vtypeText: 'El formato del correo no es correcto'
                                },
                                {
                                    xtype: 'button',
                                    height: 20,
                                    width:  20,
                                    icon: 'resources/imagenes/ayuda.jpg',
                                    style: 'margin-left:5px;margin-bottom:5px;',
                                    tooltip: 'Digite un correo. Ejemplo: ejemplo@ejemplo.com (Campo acepta formato de correo)(Opcional)'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 115,
                            style: 'margin-left:10px;',
                            width: 350,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Mapa Google</span>',
                            items: [
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtEILatitud',
                                    style: 'margin-top:10px;',
                                    width: 190,                                    
                                    fieldLabel: 'Latitud',
                                    allowBlank: false,
                                    maxLength: 20,
                                    labelPad: -30,
                                    maxLengthText: 'Debe tener 20 d&iacute;gitos(solamente n&uacute;meros)',                                    
                                    blankText: 'Requiere de una latitud'
                                },
                                {
                                    xtype: 'button',
                                    height: 20,
                                    width:  20,
                                    icon: 'resources/imagenes/ayuda.jpg',
                                    style: 'margin-left:-75px;margin-top:5px;',
                                    tooltip: 'Digite una latitud. Ejemplo: 9.99999)(Campo acepta solo n&uacute;meros)'
                                },
                                {
                                    xtype: 'textfield',
                                    itemId: 'txtEILongitud',
                                    width: 190,                                    
                                    fieldLabel: 'Longitud',
                                    allowBlank: false,
                                    maxLength: 20,
                                    labelPad: -30,
                                    maxLengthText: 'Debe tener 20 d&iacute;gitos(solamente n&uacute;meros)',                                    
                                    blankText: 'Requiere de una longitud'
                                },
                                {
                                    xtype: 'button',
                                    height: 20,
                                    width:  20,
                                    icon: 'resources/imagenes/ayuda.jpg',
                                    style: 'margin-left:-75px;margin-bottom:5px;',
                                    tooltip: 'Digite una longitud. Ejemplo: -9.99999)(Campo acepta solo n&uacute;meros)'
                                },
                                {
                                    xtype: 'button', 
                                    style:'border:0px;background:white;',
                                    colspan:2,
                                    text: '<span style="font-size:13px;">&#191;Como obtener latitud y longitud? <b><font color=red>Pulsa aqu&iacute;</font></b></span>',
                                    handler: function() { window.open( "http://maps.google.es/", "_blank")}
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 192,
                            width: 372,
                            colspan: 2,
                            layout: {type: 'auto'},
                            title: '<span style="font-size:15px;">Direcci&oacute;n</span>',
                            items: [                                
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmbEIProvincia',
                                    style: 'margin-top:10px;',
                                    width: 301,
                                    fieldLabel: 'Provincia',
                                    emptyText: 'Selecc. un provincia',
                                    editable:false,
                                    forceSelection: true,
                                    displayField: 'DesLarga',
                                    valueField: 'CodProv',									
                                    store:storeProv,
                                    queryMode: 'local',
                                    allowBlank: false,                                    
                                    blankText: 'Seleccione una provincia'
                                    
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmbEICanton',
                                    width: 300,
                                    fieldLabel: 'Cant&oacute;n',
                                    emptyText: 'Selecc. un canton',
                                    editable:false,
                                    forceSelection: true,
                                    displayField: 'DesLarga',
                                    valueField: 'CodCanton',									
                                    store:storeCanton,
                                    queryMode: 'local',
                                    allowBlank: false,                                    
                                    blankText: 'Seleccione un cant&oacute;n'
                                },                                
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmbEIDistrito',                                    
                                    width: 300,
                                    fieldLabel: 'Distrito',
                                    emptyText: 'Selecc. un distrito',
                                    editable:false,
                                    forceSelection: true,
                                    displayField: 'DesLarga',
                                    valueField: 'CodDist',									
                                    store:storeDist,
                                    queryMode: 'local',
                                    allowBlank: false,                                    
                                    blankText: 'Seleccione un distrito'
                                },
                                {
                                    xtype: 'textareafield',
                                    itemId: 'txtEIOtrasSenas',
                                    height: 62,
                                    width: 301,
                                    emptyText: 'Digite detalles de la direccion',
                                    fieldLabel: 'Otras Se&ntilde;as',
                                    allowBlank: false,
                                    maxLength: 100,
                                    maxLengthText: 'Debe tener 100 caracteres.',
                                    blankText: 'Requiere de detalles.'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 60,
                            width: 725,
                            colspan: 2,
                            layout: {align: 'center',pack: 'center',type: 'vbox'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    itemId: 'btnEIAplicarCambios',
                                    width: 147,
                                    height: 40,
                                    icon: 'resources/imagenes/listo.png',
                                    text: 'Guardar Cambios'
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