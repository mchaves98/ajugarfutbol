Ext.define('AJugarFutbol.model.ubicacion.Distrito', {
    extend: 'Ext.data.Model',
    fields: [{name:'id',type:'int'}, 
             'CodPais',
             'CodProv',
             'CodCanton',
             'CodDist',
             'DesCorta',
             'DesLarga',
             'TipoRegistro',
             'Orden']
});
