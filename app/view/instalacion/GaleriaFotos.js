Ext.define('AJugarFutbol.view.instalacion.GaleriaFotos', {
    extend: 'Ext.window.Window',
	 alias : 'widget.winGaleriaFotos',
         
    id:'winGaleriaFotos',
    itemId: 'winGaleriaFotos',
    bodyStyle: 'border:none;',     
    height: 472,
    width: 760,
    
    maxHeight: 472,
    minHeight: 472, 
    minWidth: 760,
    maxWidth: 760,   
    layout: {type: 'fit'},
    title: 'Cancha',      
    
    initComponent: function() {
        var me = this;
        
        
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'panel',
                    id: 'plnGaleria',
                    itemId: 'plnGaleria',
                    bodyStyle: 'border:none;',                    
                    html:"<div id='wrapper'>"
                                +"<div id='container'>"
                                       + "<div class='sliderbutton' id='slideleft' onClick='slideshow.move(-1)'></div>"
                                       + "<div id='slider'>"
                                             +  " <ul>"
                                                 +   htmlGaleriaFotos
                                              + " </ul>"
                                        +"</div>"
                                       + "<div class='sliderbutton' id='slideright' onClick='slideshow.move(1)'></div>"
                                       + "<ul id='pagination' class='pagination'>"
                                          + htmlOpcionesGaleria  
                                     +  " </ul>"
                             +  " </div>"
                      + " </div>"
                }
            ]
        });

        me.callParent(arguments);
    }
});