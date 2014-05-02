var PropertyDisplayView= Backbone.View.extend({
	el: $('#property-display'),
	events:{
		'click .modify': 'showModifyScreen',
		'click .done': 'close',
		'click #Add': 'displayAddChoice'
	},
	initialize:function(){
		this.addDataView= new AddDataView();
		this.completeData=new CompleteData();
		this.listenTo(this.addDataView,'data-fetched',this.updateModels);
	},
	render:function(){
		this.$el.css('display','inline-block');
		this.$el.find('h4').text(this.options.displayName);
		this.completeDataView=new CompleteDataView({model:this.completeData,url:this.options.completeDataUrl,parent:this});
	},
	showModifyScreen:function(event){
		var input=$(event.currentTarget);
		this.$('#Add').removeClass("no-display").addClass("display");
		input.text("Done");
		this.classToggle(input,'modify',"done");
		this.$el.find('#content').addClass('edit-mode');
		this.trigger("start-editing");
	},
	close: function(event){
		var input=$(event.currentTarget);
		this.$el.find('#content').removeClass('edit-mode');
		this.$('#Add').removeClass("display").addClass("no-display");
		this.trigger("stop-editing");
		input.text("Modify");
		this.classToggle(input,"done",'modify');
		this.addDataView.closeAddDataBox();
	},
	displayAddChoice:function(){
		this.addDataView.render();
	},
	classToggle:function(selector,c1,c2){
		$(selector).removeClass(c1).addClass(c2);
	},
	updateModels:function(){
		this.completeDataView.addData(this.addDataView.form);
	}
});