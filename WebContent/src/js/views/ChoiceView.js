var ChoiceView= Backbone.View.extend({
	el: $('#choice-list-display'),
	events:{
		'click .choice' : 'findcompleteDataLink'
	},
	initialize:function(){
		this.urlCollec=new UrlCollec();
		var cur_obj=this;
		this.urlCollec.fetch({
			success:function(){
			}
		});
	},
	findcompleteDataLink:function(event){
		var choice=$(event.currentTarget).text();
		this.selected=this.urlCollec.findWhere({name:choice});
		this.render();
	},
	render:function(){
		var propertyDisplayView=new PropertyDisplayView({displayName:this.selected.get('name'),completeDataUrl:this.selected.get('url')});
		propertyDisplayView.render();
	}	
});