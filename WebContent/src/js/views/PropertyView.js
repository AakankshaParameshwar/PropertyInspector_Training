var PropertyView=Backbone.View.extend({
		tagName:'li',
		className: 'property',
		events:{
		'click .property-value': 'editPropertyValue',
		'dblclick .property-name label': 'editPropertyName',
		'blur .editing':'close',
		'keypress .editing': 'updateOnEnter',
		'click .category-edit .delete-icon': 'deleteProperty'
		/* 'drop' : 'drop' */ 
		},
		template: _.template($('#property-template').html()),
		initialize: function() {
			_.bindAll(this,'render');
			this.$el.on('item-dropped',this.drop);
			this.listenTo(this.model, 'change', this.render);
			this.on('showButtons', this.displayDeleteButton);
			this.render();
			this.count=0;
			console.log(this.$el);
		},
		render:function(){
			
			this.$el.html(this.template(this.model.toJSON()));
			/*if($('.category').hasClass('category-edit')){
				this.displayDeleteButton();
			}else{
				this.closeDeleteButton();
			}*/
			
			
		},
		editPropertyValue: function(event){
			if($('#content').hasClass('edit-mode')){
				this.input=$(event.currentTarget);
				this.input.addClass('editing');
				this.input.focus();
				this.previousValue=this.input.val();
				this.attribute='name';
			}
		},
		updateOnEnter:function(e){
			if (e.keyCode === 13) this.close();
		},
		close:function(){
			var value=this.input.val();
			console.log(this.attribute+" === " +value);
			if(!value){
				this.input.val(this.previousValue);
			}else{
				this.model.set(this.attribute,value);
				this.input.removeClass('editing');
				this.label.removeClass('edit');
			}
		},
		editPropertyName:function(event){
			if($('#content').hasClass('edit-mode')){
				event.preventDefault();
				this.label=$(event.currentTarget);
				this.input=this.label.parent().find(".edit");
				this.label.addClass('edit');
				this.input.addClass('editing');
				this.input.focus();
				this.input.val(this.label.text()); 
				this.attribute='label';
				this.previousValue=this.label.text();
			}
		},
		displayDeleteButton:function(currentCategory){
			this.classToggle(currentCategory.find('.property-delete-icons'),'no-display','display');			
		},
		closeDeleteButton:function(previousCategory){
			this.classToggle(previousCategory.find('.property-delete-icons'),'display','no-display');
		},
		classToggle:function(selector,c1,c2){
			$(selector).removeClass(c1).addClass(c2);
		},
		deleteProperty:function(e){
			this.model.destroy();
		},
		drop:function(event,index){
			//event.preventDefault();
			alert("dropped    ");
		},
		drags:function(ev) {
			ev.preventDefault();
			alert("enters");
		}
	});
	