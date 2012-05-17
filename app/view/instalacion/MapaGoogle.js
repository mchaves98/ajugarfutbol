Ext.require([
    'AJugarFutbol.view.instalacion.GMapPanel'
]);
Ext.define('AJugarFutbol.view.instalacion.MapaGoogle', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winMapaGoogle',
   
    id: 'winMapaGoogle',
    itemId: 'winMapaGoogle',
    layout: {type: 'fit'},
    title: 'Mapa Google',
    bodyStyle: 'border:none;',
    width:600,
    height:500,
    
    maxHeight: 500,
    minHeight: 500, 
    minWidth: 600,
    maxWidth: 600,       

initComponent: function() {
    var me=this;
    
      Ext.applyIf(me, {
              items: [
                {
                    xtype: 'gmappanel',
                    zoomLevel: 16,
                    id:'gmapPanel',
                    itemId: 'gmapPanel',
                    gmapType: 'map',
                    mapConfOpts: ['enableScrollWheelZoom','enableDoubleClickZoom','enableDragging'],
                    mapControls: ['GSmallMapControl','GMapTypeControl','NonExistantControl'],
                    setCenter: 
                    {                    
                        //Para cambiar la direccion por medio la direccion
                        //geoCodeAddr: 'Tres Rios, Costa Rica (Tres Rios 30303)',marker: {title: 'Tres Rios'}                       
                        //Para cambiar la direccion por medio de parametros 
                         lat:  42.339641, lng: -71.094224,marker: {title: 'Cancha'}
                        //Cambiar el tipo de mapa a satelite-->G_SATELLITE_MAP                  
                    }                    
                }
              ]
         });

        me.callParent(arguments);
    }
});