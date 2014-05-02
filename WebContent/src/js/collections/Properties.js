var Properties=Backbone.Collection.extend({
		model: Property,
		
		nextOrder:function(){
			if(!this.length) return 1;
			return this.last().get('order')+1;
		},
		add: function(models, options){
			//console.log("enteres add");
			Backbone.Collection.prototype.add.call(this, models, options);
			this.modifyModels();
		},
		reset:function(models, options){
			//console.log("enteres reset--" +JSON.stringify(models));
			Backbone.Collection.prototype.reset.call(this, models, options);
		},
		modifyModels:function(){
			(this).each(function(model,index){
				if(model.get('order')===null){
					model.set('order',index);
				}	
			});
			
		},
		comparator: 'order'
	}); 