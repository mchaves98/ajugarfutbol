Ext.define('AJugarFutbol.model.instalacion.Instalacion', {
    extend: 'Ext.data.Model',
    fields: [
            {name:'id',type:'int'}, 
             'NombreInst',
             'NombreContacto',
             'Telefono1',
             'Telefono2',
             'Fax',
             'UbicGPS',
             'CodPais',
             'CodProv',
             'CodCanton',             
             'CodDist',
             'Direccion1',
             'Direccion2',
             'FileLogo',
             'URLPaginaWeb',
             'EMailInst',
             'EMailContac',
             'DesHorario',
             'IndSoloSocios']
});
