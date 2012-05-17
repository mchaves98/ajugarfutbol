Ext.define('AJugarFutbol.view.administracionx1.ViewportAdmx1', {
    extend: 'Ext.panel.Panel',
    alias : 'widget.viewport', 
           
    id: 'viewport',
    itemId: 'viewport',
    bodyStyle:'background-color:transparent;border:none;',       
    width: 1005, 
    layout: {columns: 3,type: 'table'},    

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [               
                 {
                    xtype: 'panel',                    
                    height: 137,
                    layout: {type: 'fit'},
                    id: 'plnEncabezado',                    
                    itemId: 'plnEncabezado',                    
                    bodyStyle:'background:transparent;border:none;',
                    style:'margin-top:25px;',                    
                    width: 1005,
                    colspan: 3,
                    items: [
                        {
                            xtype: 'image',                            
                            id: 'imgEncabezado',
                            itemId: 'imgEncabezado',                            
                            src: 'resources/imagenes/Encabezado.png'                            
                        }
                     ]
                },                
                {
                    xtype: 'panel',
                    height: 65,          
                    autoScroll:false,
                    layout: {type: 'column'},
                    id: 'plnMenuHorizontal',
                    itemId: 'plnMenuHorizontal',  
                    bodyStyle:'border-style:outset;border-width: 2px;',
                    style:'border-style:outset;border-color: #000;border-width:2px;',                
                    width: 1005,
                    colspan: 3,
                    items: [
                        {
                            xtype: 'panel',
                            height: 63,
                            autoScroll:false,
                            bodyStyle:'border:none;',                            
                            width: 865,
                            layout: {align: 'center',pack: 'center',type: 'vbox'},
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblMenuHorizontalTitulo',
                                    width: 865,
                                    height:30                  
                                }
                            ]
                        },                        
                        {
                            xtype: 'panel',
                            height: 63,
                            autoScroll:false,
                            bodyStyle:'border:none;background:#003443;',                            
                            width: 132,
                            layout: {columns: 1, type: 'table'},
                            items: [
                                {
                                    xtype: 'button',
                                    height: 20,
                                    id:'btnIngresarPrincipal',
                                    itemId:'btnIngresarPrincipal',
                                    margin: 3,
                                    width: 100,
                                    style:'border:0px;background:#003443;',//Azul #003443 rojo #CA0000
                                    icon: 'resources/imagenes/iniciar.png',
                                    text: '<font color=white>Ingresar</font>',
                                    textAlign:'left',
                                    tooltip:'Iniciar Sesi&oacute;n'
                                },
                                {
                                    xtype: 'button',
                                    height: 20,
                                    id:'btnOlvideContrasenaPrincipal',
                                    itemId:'btnOlvideContrasenaPrincipal',
                                    margin: 3,
                                    textAlign:'left',
                                    width: 100,
                                    style:'border:0px;background:#003443;',
                                    text: '&#191;Contrase&ntilde;a?',
                                    colspan: 2,
                                    tooltip:'Obtener una nueva contrase&ntilde;a',
                                    icon: 'resources/imagenes/key.png',
                                    repeat : {interval: 20000, delay: 10000}
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 600, 
                    minHeight : 600,
                    id: 'plnMenuVertical',          
                    bodyStyle:'border-style:outset;border-width: 2px;',
                    style:'border-style:outset;border-color: #000;border-width: 2px;background:#FFF;',
                    itemId: 'plnMenuVertical',
                    width: 122,                    
                    items: [
                         {
                            xtype: 'image',
                            autoRender: true,
                            id:     'imagenFotoPrincipal',
                            itemId: 'imagenFotoPrincipal',
                            height: 101,
                            width: 101,     
                            style:'margin-top:10px;margin-left:5px;',
                            overCls:'x-fotousuario'
                        },
                        {
                            xtype: 'button',
                            id: 'btnHome',
                            itemId: 'btnHome',
                            text:'Inicio',
                            height: 25,
                            width: 105,
                            icon: 'resources/imagenes/inicio.gif',
                            textAlign:'left',                            
                            style:'margin-top:20px;margin-left:5px;border:0px;background:#FFF;'
                        },
                        {
                            xtype:  'button',
                            id:     'btnEditarPerfilVertical',
                            itemId: 'btnEditarPerfilVertical',
                            text:   'Mi Perfil',
                            height: 25,
                            width: 105,
                            textAlign:'left',
                            icon: 'resources/imagenes/perfil.gif',                            
                            style:'margin-top:05px;margin-left:5px;border:0px;background:#FFF;'
                        },
                        {
                            xtype:  'button',
                            id:     'btnClientes',
                            itemId: 'btnClientes',
                            text:   'Clientes',
                            textAlign:'left',
                            height: 25,
                            width: 105,
                            icon: 'resources/imagenes/instalacion.gif',
                            style:'margin-top:5px;margin-left:5px;border:0px;background:#FFF;'
                        },
                        {
                            xtype:  'button',
                            id:     'btnContratos',
                            itemId: 'btnContratos',
                            text:   'Contratos',
                            textAlign:'left',
                            height: 25,
                            width: 105,
                            icon: 'resources/imagenes/clientes.gif',
                            style:'margin-top:5px;margin-left:5px;border:0px;background:#FFF;'
                        },                        
                        {
                            xtype: 'button',
                            id: 'btnPagos',
                            itemId: 'btnPagos',
                            text:'Pagos',
                            height: 25,
                            width: 105,
                            icon: 'resources/imagenes/canchas.gif',
                            textAlign:'left',
                            style:'margin-top:5px;margin-left:5px;border:0px;background:#FFF;'
                        },                        
                        {
                            xtype: 'button',
                            id: 'btnContactos',
                            itemId: 'btnContactos',
                            text:'Contactos',
                            height: 25,
                            width: 105,
                            icon: 'resources/imagenes/canchas.gif',
                            textAlign:'left',
                            style:'margin-top:5px;margin-left:5px;border:0px;background:#FFF;'
                        }
                    ],
                    dockedItems: [
                        {                           
                            xtype: 'panel',
                            width:45,
                            dock: 'bottom',
                            height:75,                                                        
                            html:'<div style="margin-left:22px;margin-bottom:5px;margin-top:10px;"><iframe src="http://www.facebook.com/plugins/like.php?href=http://www.facebook.com/ajugarfut" scrolling="no" frameborder="0" style="height:25px;width:77px;" allowTransparency="true"></iframe></div>'+                                 
                                 '<a href="https://facebook.com/ajugarfut" target="_blank"><img style="margin-left:32px;margin-bottom:5px;" src="resources/imagenes/facebookPequeno.png" alt="Facebook" width="25" height="25" /></a>'+
                                 '<a href="http://youtu.be/cDXK6GplSXM" target="_blank"><img style="margin-bottom:5px;margin-left:5px;" src="resources/imagenes/youtubePequeno.png" alt="YouTube" width="25" height="25" /></a>',    
                            bodyStyle:'border:none;'                                                                                                            
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    id: 'panel_central',
                    margin:5,
                    bodyStyle:'border-style:outset;border-width: 2px;',
                    style:'border-style:outset;border-color: #000;border-width: 2px;',
                    itemId: 'panel_central',
                    width: 770
                },
                {
                    xtype: 'panel',
                    height: 600, 
                    minHeight : 600,
                    id: 'plnPublicidad',
                    itemId: 'plnPublicidad',
                    bodyStyle:'border-style:outset;border-width: 2px;',
                    style:'border-style:outset;border-color: #000;border-width: 2px;', 
                    width: 103,
                    items: [
                        {
                            xtype: 'image',                            
                            id: 'imgPubli',
                            itemId: 'imgPubli',                            
                            src: 'resources/imagenes/tia.jpg'                            
                        }
                     ]
                },
                {
                    xtype: 'panel',
                    height: 65,                    
                    id: 'plnPiePagina',
                    itemId: 'plnPiePagina',
                    bodyStyle:'border-style:outset;border-width: 2px;background:#003443;',
                    style:'border-style:outset;border-color: #000;border-width: 2px;',     
                    layout: {columns: 9, type: 'table'},
                    width: 1005,
                    colspan: 3,
                    items: [
                        {
                            xtype: 'button',                                                      
                            //height: 25,
                            //width: 105,      
                            icon: 'resources/imagenes/logoPiePagina.png', 
                            text:'<b style="color:white;">&#191;Qui&eacute;nes Somos?</b>',
                            style:'border:0px;background:#003443;margin-top:4px;margin-left:30px;',
                            handler: function() { window.open( "https://facebook.com/ajugarfut", "_blank")}
                        },
                        {
                            xtype: 'image',                                                        
                            height: 50, 
                            width: 50,
                            style:'margin-top:3px',
                            src: 'resources/imagenes/Imagen4.png'                            
                        },
                        {
                            xtype: 'button',                                                      
                            //height: 25,
                            //width: 105,  
                            icon: 'resources/imagenes/help.png', 
                            textAlign:'left',  
                            text:'<b style="color:white;">Preguntas Frecuentes</b>',
                            style:'border:0px;background:#003443;margin-top:4px;',
                            handler: function() { window.open( "http://youtu.be/cDXK6GplSXM", "_blank")}
                        },
                        {
                            xtype: 'image',                                                        
                            height: 50, 
                            width: 50,
                            style:'margin-top:3px',
                            src: 'resources/imagenes/Imagen4.png'                            
                        },
                        {
                            xtype: 'button',                                                      
                            //height: 25,
                            //width: 180, 
                            icon: 'resources/imagenes/phone.png', 
                            textAlign:'left',                            
                            text:'<b style="color:white;">Tel. (506)4030-5570</b>',
                            style:'border:0px;background:#003443;margin-top:4px;'
                        },
                        {
                            xtype: 'image',                                                        
                            height: 50, 
                            width: 50,
                            style:'margin-top:3px',
                            src: 'resources/imagenes/Imagen4.png'                            
                        },
                        {
                            xtype: 'button',                                                      
                            //height: 25,
                            //width: 105,     
                            textAlign:'left', 
                            itemId: 'btnEnviaCorreo',
                            icon: 'resources/imagenes/email.png', 
                            text:'<b style="color:white;">info@ajugarfutbol.com</b>',
                            style:'border:0px;background:#003443;margin-top:4px;'
                        },
                        {
                            xtype: 'image',                                                        
                            height: 50, 
                            width: 50,
                            style:'margin-top:3px',
                            src: 'resources/imagenes/Imagen4.png'                            
                        },
                        {
                            xtype: 'button',                                                      
                            height: 35,
                            //width: 105,       
                            text:'<b style="color:white;">Desarrollo y Hospedaje por:<p> JSoluciones S.A</p></b>',
                            style:'border:0px;background:#003443;margin-top:4px;'
                        }
                     ]
                }
            ]
        });

        me.callParent(arguments);
    }
});