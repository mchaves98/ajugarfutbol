Ext.define('AJugarFutbol.view.administrador.RolCliente', {
    extend: 'Ext.window.Window',
    
    alias : 'widget.winRolCliente',
    id:     'winRolCliente',
    itemId: 'winRolCliente',
    height: 420,
    width: 810,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Rol de Cliente',

    initComponent: function() {
        var me = this;
        //Store de Dias      
        var states = [
        {id:"4",descripcion:"1 mes"},{id:"8",descripcion:"2 meses"},{id:"13",descripcion:"3 meses"},{id:"17",descripcion:"4 meses"},{id:"21",descripcion:"5 meses"},
        {id:"26",descripcion:"6 meses"},{id:"30",descripcion:"7 meses"},{id:"35",descripcion:"8 meses"},{id:"40",descripcion:"9 meses"},{id:"44",descripcion:"10 meses"},
        {id:"48",descripcion:"11 meses"},{id:"52",descripcion:"1 a"+ String.fromCharCode(241) +"o"}];        
        var storeTiempos = Ext.create('Ext.data.Store', {
        fields: ['id','descripcion'],
        data : states}); // Fin del Store         
   
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {columns: 2,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'fieldset',
                            height: 160,
                            style: 'margin-top:10px;margin-left:10px;',
                            width: 401,
                            title: '<span style="font-size:15px;font-family:tahoma, arial, verdana, sans-serif;">Datos del Cliente</span>',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblCedulaRolCliente',
                                    idPersona:'',
                                    style: 'margin-top:10px;margin-left:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'C&eacute;dula',
                                    labelPad: 0,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblNombreRolCliente',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    fieldLabel: 'Nombre Completo',
                                    labelPad: 0,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblTelefonosRolCliente',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Tel&eacute;fono(s)',
                                    labelPad: 0,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblCorreoRolCliente',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Correo',
                                    labelPad: 0,
                                    labelWidth: 120
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblNivelConfianzaRolCliente',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Nivel de Confianza',
                                    labelPad: 0,
                                    labelWidth: 120
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 370,
                            style: 'margin-top:10px;margin-left:10px;',
                            width: 370,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Nuevo Rol</span>',
                            rowspan: 2,
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkBuscaReto',
                                    itemId: 'chkBuscaReto',
                                    style: 'margin-top:5px;',
                                    boxLabel: '<font style="font-size:15px;font-family:tahoma, arial, verdana, sans-serif;">Busca Reto</font>',
                                    colspan:2
                                },
                                {
                                    xtype: 'datefield',
                                    id: 'dteFechaInicio',
                                    itemId: 'dteFechaInicio',
                                    style: 'margin-top:5px;',
                                    fieldLabel: 'Fecha de Inicio',
                                    emptyText: 'Fecha de Inicio',
                                    width: 220,
                                    labelPad: 10,
                                    format: 'd/m/Y',
                                    editable:false,
                                    preventMark: true,
                                    minValue: new Date()
                                },
                                {
                                    xtype: 'displayfield',
                                    itemId: 'lblDiaMuestraRol',
                                    style: 'margin-top:5px;margin-left:5px;',
                                    value: '',
                                    width: 125
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmbCanchaRolCliente',
                                    itemId: 'cmbCanchaRolCliente',
                                    style: 'margin-top:5px;',
                                    queryMode: 'local',
                                    store:canchasInstalacion,
                                    displayField: 'nombre',
                                    emptyText: 'Cancha',
                                    valueField: 'id',
                                    forceSelection: true,
                                    width: 253,
                                    fieldLabel: 'Cancha',
                                    labelPad: 10,
                                    editable: false,
                                    colspan:2
                                },
                                {
                                    xtype: 'combobox',
                                    style: 'margin-top:5px;',
                                    id: 'timeHoraRolCliente',
                                    itemId: 'timeHoraRolCliente',
                                    width: 200,
                                    fieldLabel: 'Hora del Rol',
                                    emptyText: 'Hora',
                                    labelPad: 10,
                                    editable: false,
                                    colspan:2,
                                    queryMode: 'local',
                                    store: storeHoras,
                                    displayField: 'hora',
                                    valueField: 'id',
                                    forceSelection: true
                                },
                                {
                                    xtype: 'combobox',
                                    itemId: 'cmbTiempoRolCliente',
                                    style: 'margin-top:5px;',
                                    store:storeTiempos,
                                    displayField: 'descripcion',
                                    emptyText: 'Duracion',
                                    valueField: 'id',	
                                    width: 253,
                                    fieldLabel: '&#191;Cuanto tiempo?',
                                    labelPad: 10,
                                    editable: false,
                                    colspan:2
                                },
                                {
                                    xtype: 'textareafield',
                                    itemId: 'txtComentarioRolCliente',
                                    height: 78,
                                    style: 'margin-top:5px;',
                                    width: 288,
                                    emptyText: 'Escribe alg\u00FAn comentario sobre este rol (Opcional)',
                                    fieldLabel: 'Comentario',
                                    labelPad: 10,
                                    colspan:2
                                },
                                {
                                    xtype: 'radiogroup',
                                    id:'grupoAvisoOmitir',
                                    itemId: 'grupoAvisoOmitir',
                                    height: 27,                                    
                                    style: 'margin-top:10px;',
                                    width: 350,                                    
                                    fieldLabel: '<b>Importante</b>',
                                    columns:1,
                                    colspan:2,
                                    vertical:true,                                    
                                    items: [
                                        {
                                            xtype: 'radiofield',       
                                            id:'rdbAvisarRolCliente',
                                            itemId: 'rdbAvisarRolCliente',                                            
                                            name:'prueba',
                                            checked:true,
                                            readOnly:false,
                                            boxLabel: 'Avisarme si existen reservaciones'                                            
                                        },
                                        {
                                            xtype: 'radiofield',               
                                            id:'rdbOmitirRolCliente',
                                            name:'prueba',
                                            itemId: 'rdbOmitirRolCliente',
                                            boxLabel: 'Respetar reservaciones realizadas'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnAgregarRolCliente',
                                    height: 38,
                                    style: 'margin-top:15px;',
                                    width: 338,
                                    text: '<span style="font-size:15px;"><b>Agregar Rol</b></span>',
                                    colspan:2
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 200,
                            width: 401,
                            style: 'margin-left:10px;',
                            id:     'pnlListaRoles01',
                            itemId: 'pnlListaRoles01',
                            title: '<span style="font-size:13px;">Listado de Roles</span>',
                            autoScroll: true
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});