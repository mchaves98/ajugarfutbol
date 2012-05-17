Ext.define('AJugarFutbol.model.ubicacion.Canton', {
    extend: 'Ext.data.Model',
    fields: [{name:'id',type:'int'}, 
             'CodPais',
             'CodProv',
             'CodCanton',
             'DesCorta',
             'DesLarga',
             'TipoRegistro',
             'Orden']
});
