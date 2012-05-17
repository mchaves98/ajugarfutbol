Ext.define('AJugarFutbol.view.reserva.CrearReservacion', {
       extend: 'Ext.window.Window',

    alias : 'widget.winCrearReservacion',
    id: 'winCrearReservacion',
    itemId: 'winCrearReservacion',
    
    height: 500,
    width: 498,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Realizar Reservaci&oacute;n',
    defaultFocus: 'cmbRRComboClienteFrecuente',
    resizable:false,

    initComponent: function() {
        var me = this;                             
                
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    layout: {columns: 1,type: 'table'},
                    bodyStyle: 'border:none;',
                    items: [
                        {
                            xtype: 'form',
                            id: 'plnRRAdm',
                            itemId: 'plnRRAdm',
                            height: 76,
                            width: 510,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'background:#DFE7EF;border:none;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    defaults: {name: 'tipo'},
                                    height: 30,
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 470,
                                    colspan: 2,
                                    items: [                                        
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbClienteFrecuente',
                                            itemId: 'rdbClienteFrecuente',
                                            boxLabel: 'Mi cliente',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbTodosUsuarios',
                                            itemId: 'rdbTodosUsuarios',
                                            style: 'margin-left:50px;',
                                            boxLabel: 'Usuario'                                           
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbRegistrar',
                                            itemId: 'rdbRegistrar',
                                            style: 'margin-left:50px;',
                                            boxLabel: 'Registrar'
                                        }                                       
                                    ]
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmbRRComboClienteFrecuente',
                                    itemId: 'cmbRRComboClienteFrecuente',
                                    style: 'margin-left:10px;',
                                    displayField: 'infoBasic',
                                    valueField: 'id',                                    
                                    store:clientesUsuarios,
                                    queryMode: 'local',     
                                    enableKeyEvents:true, 
                                    selectOnFocus: true,
                                    forceSelection: true,
                                    hideTrigger:true,                                    
                                    typeAhead: true,                               
                                    hideLabel: true,            
                                    width: 460,                                                                        
                                    emptyText: 'Buscar por: Nombre, Apellido, Tel\u00E9fono o Correo. Presionando tecla "Enter"',
                                    colspan: 2
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtRRCedula',
                                    itemId: 'txtRRCedula',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    fieldLabel: 'C&eacute;dula',
                                    width: 311,                                                                     
                                    colspan: 2,
                                    maxLength: 15,
                                    maxLengthText: 'Debe tener 15 caracteres.',                                    
                                    emptyText: 'Digite la c\u00e9dula (opcional)'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtRRNombre',
                                    itemId: 'txtRRNombre',
                                    style: 'margin-left:10px;',
                                    fieldLabel: 'Nombre',
                                    width: 311,                                                                      
                                    colspan: 2,
                                    maxLength: 15,
                                    maxLengthText: 'Debe tener 15 caracteres.',
                                    allowBlank: false,
                                    blankText: 'Requiere de un nombre',
                                    emptyText: 'Digite el nombre'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtRRApellido',
                                    itemId: 'txtRRApellido',
                                    style: 'margin-left:10px;',
                                    fieldLabel: 'Apellido(s)',
                                    width: 311,                                    
                                    colspan: 2,
                                    maxLength: 30,
                                    maxLengthText: 'Debe tener 30 caracteres.',
                                    allowBlank: false,
                                    blankText: 'Requiere de por lo menos un apellido',
                                    emptyText: 'Digite los apellidos'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtRRTelefono',
                                    itemId: 'txtRRTelefono',
                                    style: 'margin-left:10px;',
                                    fieldLabel: 'Tel&eacute;fono 1',
                                    width: 311,                                    
                                    colspan: 2,  
                                    allowBlank: false,
                                    maxLength: 8,
                                    maxLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                    minLength: 8,
                                    minLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                    blankText: 'Requiere de un tel&eacute;fono o celular',
                                    emptyText: 'Digite el tel\u00e9fono o celular'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtRRTelefono2',
                                    itemId: 'txtRRTelefono2',
                                    style: 'margin-left:10px;',
                                    fieldLabel: 'Tel&eacute;fono 2',
                                    width: 311,                                    
                                    colspan: 2,                                      
                                    maxLength: 8,
                                    maxLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                    minLength: 8,
                                    minLengthText: 'Debe tener 8 d&iacute;gitos(solamente n&uacute;meros)',
                                    emptyText: 'Digite otro tel\u00e9fono (opcional)'
                                },
                                {
                                    xtype: 'textfield',
                                    id: 'txtRRCorreo',
                                    itemId: 'txtRRCorreo',
                                    style: 'margin-left:10px;',
                                    fieldLabel: 'Correo',
                                    width: 311,                                    
                                    colspan: 2,                                    
                                    blankText: 'Requiere de un correo',
                                    emptyText: 'Digite el correo',
                                    vtype: 'email',
                                    vtypeText: 'El formato del correo no es correcto',
                                    value:''
                                },
                                {
                                    xtype: 'radiogroup',
                                    height: 27,
                                    id: 'RRgroup',
                                    itemId: 'RRgroup',
                                    style: 'margin-left:10px;',
                                    width: 282,
                                    colspan: 2,
                                    fieldLabel: 'Genero',
                                    defaults: {name: 'genero'},
                                    labelPad: 7,
                                    items: [
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbRRMasculino',
                                            itemId: 'rdbRRMasculino',
                                            boxLabel: 'Masculino',
                                            checked: true
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbRRFemenino',
                                            itemId: 'rdbRRFemenino',
                                            boxLabel: 'Femenino'
                                        }
                                    ]
                                }
                            ]
                        },
                        {                            
                            xtype: 'panel',
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkRREquipo',
                                    itemId: 'chkRREquipo',
                                    style: 'margin-left:10px;margin-top:10px;',
                                    boxLabel: 'Avisar a Equipo'
                                },
                                {
                                    xtype: 'combobox',
                                    id: 'cmbRREquipos',
                                    itemId: 'cmbRREquipos',
                                    width: 360,
                                    queryMode: 'local', 
                                    selectOnFocus: true,
                                    editable:false,
                                    typeAhead: true,
                                    style: 'margin-left:10px;margin-top:10px;',
                                    emptyText: 'Seleccione un equipo'                            
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkRRBuscaReto',
                                    itemId: 'chkRRBuscaReto',
                                    style: 'margin-left:10px;margin-top:0px;',
                                    colspan:2,
                                    boxLabel: 'Busca un Reto'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    id: 'chkRRCampeonato',
                                    itemId: 'chkRRCampeonato',
                                    style: 'margin-left:10px;margin-top:0px;',
                                    boxLabel: 'Campeonato'
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 210,
                            style: 'margin-left:5px;margin-top:5px;',
                            width: 476,
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaSolicitud',
                                    itemId: 'lblFechaSolicitud',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Solicitud',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta',
                                    itemId: 'lblFechaExacta',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHora',
                                    itemId: 'lblHora',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'No se encuentra registro',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblTarifaReservacion',
                                    itemId: 'lblTarifaReservacion',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: 'No se encuentra registro',
                                    fieldLabel: 'Tarifa',
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtComentarioReservacion',
                                    itemId: 'txtComentarioReservacion',
                                    style: 'margin-top:10px;margin-left:5px;',
                                    width: 444,                      
                                    emptyText: 'Puedes escribir alg\u00fan comentario sobre la reservaci\u00f3n (opcional).',
                                    fieldLabel: 'Comentario',
                                    maxLength: 100,
                                    maxLengthText: 'El comentario debe tener un m&aacute;ximo de 100 caracteres.',
                                    labelWidth: 140,
                                    anchor: '100%'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblNotaDetalle',
                                    itemId: 'lblNotaDetalle',
                                    style: 'margin-left:5px;margin-top:10px;',
                                    value: '<b>Nota: Autom&aacute;ticamente est&aacute; reservaci&oacute;n quedar&aacute; aprobada.',
                                    labelWidth: 110
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 58,
                            width: 484,
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCreaReservacion',
                                    itemId: 'btnCreaReservacion',
                                    style: 'margin-left:60px;margin-top:10px;',
                                    width: 163,
                                    fechayHora:'',
                                    estado:'',                                    
                                    icon: 'resources/imagenes/listo.png',
                                    text: '<b>Aprobar Reservaci&oacute;n</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelarReservacion',
                                    itemId: 'btnCancelarReservacion',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 163,
                                    text: 'Salir'
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