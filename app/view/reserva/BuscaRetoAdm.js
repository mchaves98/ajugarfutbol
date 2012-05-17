Ext.define('AJugarFutbol.view.reserva.BuscaRetoAdm', {
    extend: 'Ext.window.Window',

    alias : 'widget.winBuscaRetoAdm',
    id: 'winBuscaRetoAdm',
    itemId: 'winBuscaRetoAdm',
    height: 615,
    width: 481,
    layout: {type: 'fit'},
    bodyStyle: 'border:none;',
    title: 'Buscar un reto',

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
                            height: 200,
                            width: 510,
                            layout: {columns: 2,type: 'table'},
                            bodyStyle: 'background:#DFE7EF;border:none;',
                            items: [
                                {
                                    xtype: 'radiogroup',
                                    defaults: {name: 'tipo'},
                                    height: 30,
                                    style: 'margin-left:10px;margin-top:10px;',
                                    width: 460,
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
                                            style: 'margin-left:40px;',
                                            boxLabel: 'Usuario'                                           
                                        },
                                        {
                                            xtype: 'radiofield',
                                            id: 'rdbRegistrar',
                                            itemId: 'rdbRegistrar',
                                            style: 'margin-left:40px;',
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
                                    selectOnFocus: true,
                                    enableKeyEvents:true, 
                                    forceSelection: true,
                                    hideTrigger:true,                                    
                                    typeAhead: true,                                    
                                    width: 450,
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
                                    maxLengthText: 'Debe tener 8 d&iacute;gitos',
                                    minLength: 8,
                                    minLengthText: 'Debe tener 8 d&iacute;gitos',
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
                                    maxLengthText: 'Debe tener 8 d&iacute;gitos',
                                    minLength: 8,
                                    minLengthText: 'Debe tener 8 d&iacute;gitos',
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
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 25,
                                    id: 'txtComentarioReservacionContrincante',
                                    itemId: 'txtComentarioReservacionContrincante',
                                    style: 'margin-left:10px;',                                    
                                    fieldLabel: 'Comentarios',
                                    colspan: 2,  
                                    labelPad: -20,
                                    emptyText: 'Puedes escribir alg\u00fan comentario sobre la reservaci\u00f3n (opcional).',
                                    width: 450
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
                                    width: 340,
                                    queryMode: 'local', 
                                    selectOnFocus: true,
                                    editable:false,
                                    typeAhead: true,
                                    style: 'margin-left:10px;margin-top:10px;',
                                    emptyText: 'Seleccione un equipo'                            
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 125,
                            width: 461,
                            style: 'margin-left:5px;',
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Datos del Retador',
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'panel',
                                    height: 101,
                                    width: 347,
                                    bodyStyle: 'border:none;',
                                    items: [                                        
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblNombreUsuario',
                                            itemId: 'lblNombreUsuario',
                                            style: 'margin-top:5px;margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Nombre',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblTelefonoUsuario',
                                            itemId: 'lblTelefonoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Tel&eacute;fono',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'displayfield',
                                            id: 'lblCorreoUsuario',
                                            itemId: 'lblCorreoUsuario',
                                            style: 'margin-left:10px;',
                                            value: 'Display Field',
                                            fieldLabel: 'Correo',
                                            labelWidth: 70
                                        },
                                        {
                                            xtype: 'button',                                            
                                            id: 'btnMasInfoUsuario',
                                            itemId: 'btnMasInfoUsuario',
                                            icon: 'resources/imagenes/information.png',
                                            style: 'margin-left:10px',                                            
                                            text: 'Mas informaci&oacute;n...',
                                            idUsuario:''
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    height: 101,
                                    width: 101,
                                    layout: {type: 'fit'},
                                    bodyStyle: 'background:#F2F2F2;border:none;',
                                    items: [
                                        {
                                            xtype: 'image',
                                            id: 'imgARFotoUsuario',
                                            itemId: 'imgARFotoUsuario',                                            
                                            src: 'resources/imagenes/desconocido.jpg'
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'fieldset',
                            height: 201,
                            style: 'margin-left:5px;',
                            width: 461,
                            layout: {columns: 2,type: 'table'},
                            title: '<span style="font-size:15px;">Detalle de la Reservaci&oacute;n',
                            items: [
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaSolicitud',
                                    itemId: 'lblFechaSolicitud',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Solicitud',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblFechaExacta',
                                    itemId: 'lblFechaExacta',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Fecha de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblHora',
                                    itemId: 'lblHora',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: 'Display Field',
                                    fieldLabel: 'Hora de Reservaci&oacute;n',
                                    colspan:2,
                                    labelWidth: 140
                                },
                                {
                                    xtype: 'textareafield',
                                    height: 45,
                                    id: 'txtComentarioReservacion',
                                    itemId: 'txtComentarioReservacion',
                                    style: 'margin-top:5px;margin-left:5px;',                                                                       
                                    fieldLabel: 'Comentarios',                                        
                                    width: 365
                                },
                                {
                                    xtype: 'button',
                                    id: 'btnEditaComentarioReservacion',
                                    itemId: 'btnEditaComentarioReservacion',
                                    icon: 'resources/imagenes/disk.png',
                                    style: 'border:0px;background:#FFF;margin-bottom:28px;margin-right:8px;',//DFE7EF
                                    text: '<b>Guardar</b>'
                                },
                                {
                                    xtype: 'displayfield',
                                    id: 'lblNotaDetalle',
                                    itemId: 'lblNotaDetalle',
                                    style: 'margin-left:5px;margin-top:5px;',
                                    value: '<b>Nota: Aseg&uacute;rese de los datos del usuario. Recuerde que puede contactar al usuario antes de aprobar est&aacute; reservaci&oacute;n.</b>',
                                    labelWidth: 110,
                                    colspan:2
                                }
                            ]
                        },
                        {
                            xtype: 'panel',
                            height: 58,
                            width: 465,
                            layout: {type: 'column'},
                            bodyStyle: 'border:none;',
                            items: [
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnAprobarReto',
                                    itemId: 'btnAprobarReto',
                                    style: 'margin-left:45px;margin-top:10px;',
                                    width: 163,
                                    idReservacion:'',
                                    fechayHora:'',                                    
                                    correoUsuario:'',
                                    comentarioReservacion:'',
                                    icon: 'resources/imagenes/listo.png',
                                    text: '<b>Aprobar Reto</b>'
                                },
                                {
                                    xtype: 'button',
                                    height: 41,
                                    id: 'btnCancelarAlRetador',
                                    itemId: 'btnCancelarAlRetador',
                                    icon: 'resources/imagenes/delete.png',
                                    style: 'margin-left:50px;margin-top:10px;',
                                    width: 163,
                                    text: '<b>Cancelar al Retador</b>'
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