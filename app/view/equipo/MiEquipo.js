Ext.define('AJugarFutbol.view.equipo.MiEquipo', {
    extend: 'Ext.panel.Panel',
    config : {idEquipo: '0', idItemEquipo: '0'},
    alias : 'widget.winMiEquipo',
    id: 'winMiEquipo',
    itemId: 'winMiEquipo',
    width:760,
    layout: {columns: 1,type: 'table'},
    bodyStyle:'background-color:transparent;border:none;',
    items: [
        {xtype: 'panel',
         id:     'plnEquipoEncabezado',
         itemId: 'plnEquipoEncabezado',
         width: 760,
         margin: 5,
         layout: {columns: 3,type: 'table'},
         bodyStyle:'background-color:transparent;border:none;',
         items: [{
                    xtype: 'image',
                    height: 101,
                    width: 101,
                    id:     'imgEscudoEquipo05',
                    itemId: 'imgEscudoEquipo05'                    
                },
                {
                    xtype: 'label',
                    id:     'lblNombreEquipo05',
                    itemId: 'lblNombreEquipo05',
                    style: 'font-size:40px;color:red; margin:5px',
                    width: 150,
                    value: 'prueba'
                },
                {xtype: 'panel',
                 id:     'plnCapitan',
                 itemId: 'plnCapitan',
                 width:  62,
                 height: 110,
                 layout: {columns: 1,type: 'table'},
                 style: 'margin-left: 20px; text-align: center',
                 bodyStyle:'background-color:transparent;border:none;',
                 items:  [{
                            xtype: 'label',
                            id:     'lblNombreCapitan',
                            itemId: 'lblNombreCapitan',
                            style: 'font-size:12px;',
                            value: 'Capitán: '
                        },
                        {
                            xtype: 'label',
                            id:     'lblApellidosCapitan',
                            itemId: 'lblApellidosCapitan',
                            style: 'font-size:12px;',
                            value: 'Capitán: '
                        },
                        {
                            xtype: 'image',
                            height: 60,
                            width: 60,
                            id:     'imgFotoCapitan',
                            itemId: 'imgFotoCapitan'                    
                        },
                        {
                            xtype: 'label',
                            style: 'font-size:15px;color:red;',
                            text: 'Capitán'
                        }]
                }
            ]
        },
        {xtype: 'panel',
         id: 'plnEquipoJugadores',
         itemId: 'plnEquipoJugadores',
         title: 'Jugadores del Equipo',
         width: 750,
         margin: 5,
         layout: {columns: 1,type: 'table'}
         //bodyStyle:'background-color:transparent;border:none;'    
        },
        {xtype: 'panel',
         id: 'plnEquipoInformacion',
         itemId: 'plnEquipoInformacion',
         title: 'Información General',
         width: 750,
         margin: 5,
         layout: {columns: 1,type: 'table'},         
         //bodyStyle:'background-color:transparent;border:none;'
         items: [{
                    xtype: 'fieldset',
                    id:     'plnEdad05',
                    itemId: 'plnEdad05',
                    title: '<b>Categoria Edad</b>',
                    width: 740,
                    margin: 5,
                    layout: {columns: 8,type: 'table'},         
                    //bodyStyle:'background-color:transparent;border:none;'
                    items: []
                 },
                 {
                    xtype: 'fieldset',
                    id:     'plnGenero05',
                    itemId: 'plnGenero05',
                    title: '<b>Genero</b>',
                    width: 740,
                    margin: 5,
                    layout: {columns: 8,type: 'table'},         
                    //bodyStyle:'background-color:transparent;border:none;'
                    items: []
                 },
                 {
                    xtype: 'fieldset',
                    id:     'plnTipoFutbol05',
                    itemId: 'plnTipoFutbol05',
                    title: '<b>Tipo de Fútbol</b>',
                    width: 740,
                    margin: 5,
                    layout: {columns: 8,type: 'table'},
                    //bodyStyle:'background-color:transparent;border:none;'
                    items: []
                 }
                ]
        },
        {xtype: 'panel',
         id:     'plnEquipoBotones',
         itemId: 'plnEquipoBotones',
         width: 750,
         height: 110,
         margin: 5,
         layout: {columns: 2,type: 'table'},
         //bodyStyle:'background-color:transparent;border:none;',
         items: [{
                            xtype: 'button',
                            height: 35,
                            id:     'btnIncluirJugadores05',
                            itemId: 'btnIncluirJugadores05',
                            style: 'margin-top:10px;margin-left:20px;',
                            width: 700,
                            colspan: 2,
                            text: '<span style="font-size:20px"><b>Incluir Jugadores</b></span>',
                            tooltip: 'Incluir Jugadores en el Equipo',
                            idEquipo: '0', 
                            idUsuarioAdmin: '0',
                            nombreEquipo: ''
                        },
                        {
                            xtype: 'button',
                            height: 35,
                            id:     'btnEnviarMensajeEquipo05',
                            itemId: 'btnEnviarMensajeEquipo05',
                            idEquipo: 0,
                            idUsuarioAdmin: '',
                            nombreEquipo: '',
                            style: 'margin-top:15px;margin-left:20px;',
                            width: 336,
                            text: '<span style="font-size:20px"><b>Enviar Mensaje</b></span>',
                            tooltip: 'Enviar mensaje a todos los Jugadores del Equipo'
                        },
                            {
                            xtype: 'button',
                            height: 35,
                            id:     'btnVerEquipos05',
                            itemId: 'btnVerEquipos05',
                            style: 'margin-top:15px;margin-left:28px;',
                            width: 336,
                            scale   : 'large',
                            text: '<span style="font-size:20px"><b>Ver Equipos</b></span>',
                            tooltip: 'Volver a ver todos los Equipos'
                        }]

        }
    ],
    
    initComponent: function() {
        var me = this;
        
        me.callParent(arguments);
      }
});