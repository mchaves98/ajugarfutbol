Ext.namespace("Ext.ux");

Ext.ux.NotificationMgr = {
	positions: []
};
    
Ext.define('Ext.ux.Notification', {
    extend: 'Ext.Window',
   
    initComponent: function(){
        Ext.apply(this, {
            iconCls: this.iconCls || 'information',
            cls: 'x-notification',
            width: this.width,
            autoHeight: true,
            plain: true,
            border:true,
            draggable: false,
            shadow:true,
            bodyStyle: 'background:#ffc; padding:10px; text-align:center'
        });
        if(this.autoDestroy) {
            this.task = new Ext.util.DelayedTask(this.hide, this);
        } else {
            this.closable = true;
        }
        Ext.ux.Notification.superclass.initComponent.apply(this);
    },
    setMessage: function(msg) {
    this.update(msg);
     },
    setTitle: function(title, iconCls){
        Ext.ux.Notification.superclass.setTitle.call(this, title, iconCls||this.iconCls);
    },
    onDestroy: function(){
        Ext.ux.NotificationMgr.positions.splice(this.pos);
        Ext.ux.Notification.superclass.onDestroy.call(this);   
    },
    cancelHiding: function(){
        this.addClass('fixed');
        if(this.autoDestroy) {
            this.task.cancel();
        }
    },
    afterShow: function(){
        
        Ext.ux.Notification.superclass.afterShow.call(this);
        Ext.fly(this.body.dom).on('click', this.cancelHiding, this);
        if(this.autoDestroy) {
            this.task.delay(this.hideDelay || 5000);
       }
    },
    
    beforeShow:function(){
        this.el.hide();
    },
    
    onShow: function(){
        var me = this;
        
        this.pos = 0;
        // parche debido a las perras de programadores de windows.......Browser<IE9
        if (!('indexOf' in Array.prototype)) {
            Array.prototype.indexOf= function(find, i /*opt*/) {
            if (i===undefined) i= 0;
            if (i<0) i+= this.length;
            if (i<0) i= 0;
            for (var n= this.length; i<n; i++)
                if (i in this && this[i]===find)
                    return i;
            return -1;
        };
        }
        while(Ext.ux.NotificationMgr.positions.indexOf(this.pos)>-1)
            this.pos++;
        Ext.ux.NotificationMgr.positions.push(this.pos);
        
        this.el.alignTo(document, "br-br", [ -20, -20-((this.getSize().height+10)*this.pos) ]);
        this.el.slideIn('b', {
            duration: 500,
            listeners:{
                afteranimate:{
                    fn: function() {
                          me.el.show();
                    }
                }
            }
        });
        
        
    },
    onHide: function(){
        this.el.disableShadow();
        this.el.ghost("b", {duration: 500,remove: true});
         Ext.ux.NotificationMgr.positions.splice(this.pos);
    },
    focus: Ext.emptyFn
});



Ext.define('Ext.ux.ImageEx', {
    extend: 'Ext.Img',
    alias: ['widget.imageEx'],
    config : {srcNormal: '', srcUp: '', srcDown: '', srcOver: '', srcClick: ''},   
    initComponent: function(){
        Ext.apply(this, {
             id:         this.id, 
             itemId:     this.itmeId,
             height:     this.height,
             width:      this.width,     
             style:      this.style,
             src:        this.src,
             Cls:        this.Cls,
             srcNormal:  this.srcNormal,
             srcUp:      this.srcUp,
             srcDown:    this.srcDown,
             srcOver:    this.srcOver,
             srcClick:   this.srcClick, 
             controller: this.controller  
           });           
        Ext.ux.ImageEx.superclass.initComponent.apply(this);
    },

    setSrcUp: function(img) {
        this.srcUp = img;
    },

   setSrcNormal: function(img) {
        this.srcNormal = img;
    },

   setSrcDown: function(img) {
        this.srcDown = img;
    },
    
    setSrcOver: function(img) {
        this.srcOver = img;
    },
    
    setSrcClick: function(img) {
        this.srcClick = img;
    },


    onRender: function() {
        this.autoEl = Ext.apply({}, this.initialConfig, this.autoEl);
        Ext.ux.ImageEx.superclass.onRender.apply(this, arguments);
        this.el.on('click', this.onclick,this,this);
        this.el.on('mouseover', this.mouseover,this,this);
        this.el.on('mouseout', this.mouseout,this,this);
        this.el.on('mousedown', this.mousedown,this,this);
        this.el.on('mouseup', this.mouseup,this,this);
     },
    
    onclick: function(evt,el,o) {
       var controlador = aplicacion.getController(this.controller);
       this.addListener( 'click', controlador.clickBotonMenu(o));  
       
     },
    
    mouseover: function(evt,el,o) {
       var controlador = aplicacion.getController(this.controller);
       this.addListener( 'mouseover', controlador.MouseOverBotonMenu(o));  
    },
    
    mouseout: function(evt,el,o) {
       var controlador = aplicacion.getController(this.controller);
       this.addListener( 'mouseout', controlador.MouseOutBotonMenu(o));  
    },
    
    mousedown: function(evt,el,o) {
        var controlador = aplicacion.getController(this.controller);
        this.addListener( 'mousedown', controlador.MouseDownBotonMenu(o));  
    },
    
    mouseup: function(evt,el,o) {
          var controlador =aplicacion.getController(this.controller);
          this.addListener( 'mousedown', controlador.MouseUpBotonMenu(o));  
    }
    
});