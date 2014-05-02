var Categories=Backbone.Collection.extend({
		model: Category,
		add: function(models, options){
			Backbone.Collection.prototype.add.call(this, models, options);
			this.modifyModels();
		},
		reset:function(models, options){
			//console.log("enteres reset--" +JSON.stringify(models));
			Backbone.Collection.prototype.reset.call(this, models, options);
			this.modifyModels();
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