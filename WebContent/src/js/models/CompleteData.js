var CompleteData= Backbone.Model.extend({
		initialize: function(){
			this.categories=new Categories();
			this.displayRelations=new DisplayRelations();
			this.on('change',this.collectData, this);	
		},
		collectData: function(){
			this.categories.reset(this.get('categories'));
			this.displayRelations.reset(this.get('displayRelations'));
			(this.categories).each(function(m,i){
				m.set('order',i);
			});
		}
	});