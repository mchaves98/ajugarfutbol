Ext.define('AJugarFutbol.view.reserva.CalenReserva' ,{
    extend: 'Ext.panel.Panel',
    
    alias : 'widget.winCalenReserva',  

    height: 645,
    id: 'winCalenReserva',
    itemId: 'winCalenReserva',
    bodyStyle: 'border:none;',
    width: 760,
    layout: {columns: 9,type: 'table'},

    initComponent: function() {
        var me = this;     
        var estiloOver='x-botonReservacion';
        var styleBotones='border-color:#000000;background:#D7DF01;';
        var tarifa='';
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    height: 70,
                    id: 'plnTitulo',
                    itemId: 'plnTitulo',
                    width: 765,
                    layout: {type: 'column'},
                    bodyStyle: 'border:none;background:#F2F2F2;',
                    colspan: 9,
                    items: [
                        {
                            xtype: 'button',
                            height: 23,
                            id: 'btnCalenVolverBusqueda',
                            itemId: 'btnCalenVolverBusqueda',
                            width: 120,
                            style:'margin-left:5px;margin-top:5px;',
                            icon: 'resources/imagenes/volver.png',
                            iconCls: 'x-btn-text-icon',
                            text: 'Volver a b&uacute;squeda'
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblInstalacion',
                            itemId: 'lblInstalacion',
                            nombreInstalacion:'',
                            direccion:'',
                            telefono:'',
                            encargado:'',
                            correo:'',
                            modoReservacion:'',
                            margin: 5,
                            value: '<b>Nombre Instalaci&oacute;n</b>'
                        },
                        {
                            xtype: 'combobox',
                            id: 'cmbCanchas',
                            itemId: 'cmbCanchas',
                            fieldLabel: '<span style="font-size:15px;">- Canchas Disponibles</span>',                              
                            labelWidth: 150,
                            labelPad: 15,
                            store:canchasInstalacion,
                            editable:false,
                            queryMode: 'local',
                            displayField: 'nombre',
                            valueField: 'id',
                            margin: 5,
                            width: 290                            
                        },
                        {
                            xtype: 'button',
                            height: 23,
                            id: 'btnCalenVerMapa',
                            itemId: 'btnCalenVerMapa',
                            width: 135,
                            style:'margin-left:5px;margin-top:5px;',
                            icon: 'resources/imagenes/mapaCanchas.png',
                            iconCls: 'x-btn-text-icon',
                            text: 'Ver mapa de canchas',
                            tooltip: '<b style="font-size:15px;">Mapa de Canchas</b><p><img src="resources/imagenes/mapaCanchas01.png"></p>'
                        },
                        {
                            xtype: 'displayfield',
                            id: 'lblFechas',
                            itemId: 'lblFechas',
                            style:'margin-left:5px;margin-top:5px;',
                            width: 720,
                            value: ''
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnActualizar',
                    itemId: 'plnActualizar',                     
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    //bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'button',
                            height: 30,
                            id: 'btnActualizar',
                            itemId: 'btnActualizar',
                            width: 85,                            
                            icon: 'resources/imagenes/actualizar2.png',
                            iconCls: 'x-btn-text-icon',
                            text: 'Actualizar',
                            tooltip: 'Actualizar calendario semanal'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnLunes',
                    itemId: 'plnLunes',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl0',
                            itemId: 'lbl0',   
                            width:60,
                            value: '<b>Lunes</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnMartes',
                    itemId: 'plnMartes',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl1',
                            itemId: 'lbl1',
                            width:60,
                            value: '<b>Martes</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnMiercoles',
                    itemId: 'plnMiercoles',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl2',
                            itemId: 'lbl2',
                            width:60,
                            value: '<b>Mi&eacute;rcoles</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnJueves',
                    itemId: 'plnJueves',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl3',
                            itemId: 'lbl3',
                            width:60,
                            value: '<b>Jueves</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnViernes',
                    itemId: 'plnViernes',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl4',
                            itemId: 'lbl4',
                            width:60,
                            value: '<b>Viernes</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnSabado',
                    itemId: 'plnSabado',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl5',
                            itemId: 'lbl5',
                            width:60,
                            value: '<b>S&aacute;bado</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 40,
                    id: 'plnDomingo',
                    itemId: 'plnDomingo',
                    width: 73,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl6',
                            itemId: 'lbl6',
                            width:60,
                            value: '<b>Domingo</b>'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 520,
                    id: 'plnBanner',
                    itemId: 'plnBanner',
                    width: 157,
                    layout: {
                        columns: 1,
                        type: 'table'
                    },
                    bodyStyle: 'border:none;',
                    rowspan: 17,
                    items: [
                        {
                            xtype: 'panel',
                            height: 40,
                            id: 'plnSemanaSiguiente',
                            itemId: 'plnSemanaSiguiente',
                            width: 141,
                            layout: {align: 'center',pack: 'center',type: 'vbox'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',                                    
                                    height: 30,                                    
                                    id: 'btnSemanaSiguiente',
                                    itemId: 'btnSemanaSiguiente',
                                    tooltip: 'Ver la pr&oacute;xima semana',
                                    width: 110,                                    
                                    iconAlign:'right',                                    
                                    icon: 'resources/imagenes/adelante.png',
                                    iconCls: 'x-btn-text-icon',
                                    controlFecha:new Date(),
                                    contador:0,
                                    text: 'Semana Pr&oacute;xima'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 45,
                            id: 'plnSemanaAnterior',
                            width: 141,
                            layout: {align: 'center',pack: 'center',type: 'vbox'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    height: 30,
                                    id: 'btnSemanaAnterior',
                                    itemId: 'btnSemanaAnterior',
                                    tooltip: 'Volver a la semana anterior',
                                    width: 110,                                                                        
                                    disabled:true,
                                    controlFecha:'',
                                    icon: 'resources/imagenes/volver.png',
                                    iconCls: 'x-btn-text-icon',
                                    text: 'Semana Anterior'
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnLibre',
                            itemId: 'plnLibre',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloLibre',
                                    itemId: 'plnTituloLibre',
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#04B404;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblLibre',
                                            value: '<b><font color=white>Libre</font></b>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnBloqueada',
                            itemId: 'plnBloqueada',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloBloqueada',
                                    itemId: 'plnTituloBloqueada',
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#D7DF01;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            value: '<b><font color=white>Bloqueada</font></b>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnListaEspera',
                            itemId: 'plnListaEspera',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloListaEspera',
                                    itemId: 'plnTituloListaEspera',                                    
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#FE9A2E;',                                    
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblListaEspera',
                                            value: '<b><font color=white>Lista Espera</font></b>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnSinAprobar',
                            itemId: 'plnSinAprobar',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloSinAprobar',
                                    itemId: 'plnTituloSinAprobar',
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#CC2EFA;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblSinAprobar',
                                            itemId: 'lblSinAprobar',
                                            value: '<b><font color=white>Sin Aprobar</font></b>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnRetos',
                            itemId: 'plnRetos',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloRetos',
                                    itemId: 'plnTituloRetos',
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#58D3F7;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblRetos',
                                            itemId: 'lblRetos',
                                            value: '<b><font color=white>Busca Reto</font></b>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnRetosSinAprobar',
                            itemId: 'plnRetosSinAprobar',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloRetosSinAprobar',
                                    itemId: 'plnTituloRetosSinAprobar',
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#0404B4;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblRetosSinAprobar',
                                            itemId: 'lblblRetosSinAprobarlRetos',
                                            value: '<b><font color=white>Reto</font></b>'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 55,
                            id: 'plnOcupada',
                            itemId: 'plnOcupada',
                            width: 141,
                            layout: {
                                align: 'center',
                                pack: 'center',
                                type: 'vbox'
                            },
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 34,
                                    id: 'plnTituloOcupada',
                                    itemId: 'plnTituloOcupada',
                                    width: 105,
                                    layout: {
                                        align: 'center',
                                        pack: 'center',
                                        type: 'vbox'
                                    },
                                    bodyStyle: '-moz-border-radius:5px;-khtml-border-radius:5px;background:#FF0000;',
                                    items: [
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblOcupada',
                                            itemId: 'lblOcupada',
                                            value: '<b><font color=white>Ocupada</font></b>'
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln07am',
                    itemId: 'pln07am',
                    idItem:'btnRealizaReservacion',
                    width: 108,
                    layout: {align: 'center',pack: 'center',type: 'vbox'},
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl07am',
                            itemId: 'lbl07am',
                            value: '<b>07:00 a.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '007',
                    itemId: '007',
                    scale: 'large',
                    idItem:'btnRealizaReservacion',
                    fecha:'',                    
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',                   
                    style: styleBotones,
                    width: 73,                           
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '107',
                    itemId: '107',
                    idItem:'btnRealizaReservacion',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '207',
                    itemId: '207',
                    idItem:'btnRealizaReservacion',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '307',
                    itemId: '307',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '407',
                    itemId: '407',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '507',
                    itemId: '507',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '607',
                    itemId: '607',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln08am',
                    itemId: 'pln08am',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl08am',
                            itemId: 'lbl08am',
                            value: '<b>08:00 a.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '008',
                    itemId: '008',
                    fecha:'22',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip: 'Disponible',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '108',
                    itemId: '108',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '208',
                    itemId: '208',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '308',
                    itemId: '308',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '408',
                    itemId: '408',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '508',
                    itemId: '508',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '608',
                    itemId: '608',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln09am',
                    itemId: 'pln09am',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl09am',
                            itemId: 'lbl09am',
                            value: '<b>09:00 a.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '009',
                    itemId: '009',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '109',
                    itemId: '109',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '209',
                    itemId: '209',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '309',
                    itemId: '309',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '409',
                    itemId: '409',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '509',
                    itemId: '509',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '609',
                    itemId: '609',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln10am',
                    itemId: 'pln10am',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl10am',
                            itemId: 'lbl10am',
                            value: '<b>10:00 a.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '010',
                    itemId: '010',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '110',
                    itemId: '110',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '210',
                    itemId: '210',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '310',
                    itemId: '310',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '410',
                    itemId: '410',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '510',
                    itemId: '510',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '610',
                    itemId: '610',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln11am',
                    itemId: 'pln11am',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl11am',
                            itemId: 'lbl11am',
                            value: '<b>11:00 a.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '011',
                    itemId: '011',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '111',
                    itemId: '111',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '211',
                    itemId: '211',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '311',
                    itemId: '311',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '411',
                    itemId: '411',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '511',
                    itemId: '511',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '611',
                    itemId: '611',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln12pm',
                    itemId: 'pln12pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl12pm',
                            itemId: 'lbl12pm',
                            value: '<b>12:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '012',
                    itemId: '012',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '112',
                    itemId: '112',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '212',
                    itemId: '212',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '312',
                    itemId: '312',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '412',
                    itemId: '412',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '512',
                    itemId: '512',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '612',
                    itemId: '612',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln01pm',
                    itemId: 'pln01pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl01am',
                            itemId: 'lbl01am',
                            value: '<b>01:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '013',
                    itemId: '013',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '113',
                    itemId: '113',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '213',
                    itemId: '213',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '313',
                    itemId: '313',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '413',
                    itemId: '413',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '513',
                    itemId: '513',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '613',
                    itemId: '613',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln02pm',
                    itemId: 'pln02pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl2pm',
                            itemId: 'lbl2pm',
                            value: '<b>02:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '014',
                    itemId: '014',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '114',
                    itemId: '114',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '214',
                    itemId: '214',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '314',
                    itemId: '314',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '414',
                    itemId: '414',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '514',
                    itemId: '514',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '614',
                    itemId: '614',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln03pm',
                    itemId: 'pln03pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl03pm',
                            itemId: 'lbl03pm',
                            value: '<b>03:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '015',
                    itemId: '015',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '115',
                    itemId: '115',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '215',
                    itemId: '215',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '315',
                    itemId: '315',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '415',
                    itemId: '415',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '515',
                    itemId: '515',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '615',
                    itemId: '615',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln04pm',
                    itemId: 'pln04pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl04pm',
                            itemId: 'lbl04pm',
                            value: '<b>04:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '016',
                    itemId: '016',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '116',
                    itemId: '116',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '216',
                    itemId: '216',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '316',
                    itemId: '316',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '416',
                    itemId: '416',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '516',
                    itemId: '516',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '616',
                    itemId: '616',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln05pm',
                    itemId: 'pln05pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl05pm',
                            itemId: 'lbl05pm',
                            value: '<b>05:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '017',
                    itemId: '017',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '117',
                    itemId: '117',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '217',
                    itemId: '217',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '317',
                    itemId: '317',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '417',
                    itemId: '417',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '517',
                    itemId: '517',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '617',
                    itemId: '617',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln06pm',
                    itemId: 'pln06pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl06pm',
                            itemId: 'lbl06pm',
                            value: '<b>06:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '018',
                    itemId: '018',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '118',
                    itemId: '118',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '218',
                    itemId: '218',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '318',
                    itemId: '318',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '418',
                    itemId: '418',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '518',
                    itemId: '518',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '618',
                    itemId: '618',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln07pm',
                    itemId: 'pln07pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            value: '<b>07:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '019',
                    itemId: '019',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '119',
                    itemId: '119',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '219',
                    itemId: '219',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '319',
                    itemId: '319',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '419',
                    itemId: '419',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '519',
                    itemId: '519',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '619',
                    itemId: '619',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln08pm',
                    itemId: 'pln08pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl08pm',
                            itemId: 'lbl08pm',
                            value: '<b>08:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '020',
                    itemId: '020',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '120',
                    itemId: '120',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '220',
                    itemId: '220',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '320',
                    itemId: '320',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '420',
                    itemId: '420',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '520',
                    itemId: '520',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '620',
                    itemId: '620',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln09pm',
                    itemId: 'pln09pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl09pm',
                            itemId: 'lbl09pm',
                            value: '<b>09:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '021',
                    itemId: '021',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '121',
                    itemId: '121',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '221',
                    itemId: '221',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '321',
                    itemId: '321',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '421',
                    itemId: '421',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '521',
                    itemId: '521',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '621',
                    itemId: '621',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 30,
                    id: 'pln10pm',
                    itemId: 'pln10pm',
                    width: 108,
                    layout: {
                        align: 'center',
                        pack: 'center',
                        type: 'vbox'
                    },
                    items: [
                        {
                            xtype: 'displayfield',
                            id: 'lbl10pm',
                            itemId: 'lbl10pm',
                            value: '<b>10:00 p.m</b>'
                        }
                    ]
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '022',
                    itemId: '022',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '122',
                    itemId: '122',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '222',
                    itemId: '222',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '322',
                    itemId: '322',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '422',
                    itemId: '422',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '522',
                    itemId: '522',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'button',
                    height: 30,
                    id: '622',
                    itemId: '622',
                    fecha:'',
                    estado:'',vUsuario:false,tarifa:tarifa,
                    tooltip:'',RTNombre:'',RTCorreo:'',RTtelefono:'',RTFileFoto:'',
                    idItem:'btnRealizaReservacion',
                    style: styleBotones,
                    width: 73,
                    overCls:estiloOver
                },
                {
                    xtype: 'panel',
                    height: 45,
                    id: 'plnCalenInfo',
                    itemId: 'plnCalenInfo',
                    width: 760,
                    layout: {type: 'column'},
                    bodyStyle: 'border:none;',
                    colspan: 9,
                    items: [                        
                        {
                            xtype: 'displayfield',
                            id: 'lblCalenInfo',
                            itemId: 'lblCalenInfo', 
                            width: 760,
                            margin: 5                         
                        }
                    ]
                }
            ]
        }); 
                           
     me.callParent(arguments);
    
    }
    
});