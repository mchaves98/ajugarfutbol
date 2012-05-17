Ext.define('AJugarFutbol.model.usuario.Usuario', {
    extend: 'Ext.data.Model',
    fields: [
            {name:'id',type:'int'}, 
             'EMail',
             'Password',
             'Apodo',
             'Nombre',
             'Apellidos',
             'NoCedula',
             'TelCelular',
             'FechaNacimiento',
             'Genero',
             /*'CodPais',
             'CodProv',
             'CodCanton']*/
             'CodDist',
             'FechaRegistro',
             'IPRegistro',
             'infoBasic']
});
