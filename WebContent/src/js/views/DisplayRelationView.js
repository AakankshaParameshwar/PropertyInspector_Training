var DisplayRelationView=Backbone.View.extend({
		tagName:'li',
		className: 'display-relation',
		events:{
		'click .display-relation-value': 'editDisplayRelationValue',
		'dbclick .display-relation-value': 'editDisplayRelationName',
		'keypress .display-relation-value': 'updateOnEnter',
		'blur .display-relation-value':'close',
		'click .modify-buttons .delete-icon': 'deleteRelationEntry'
		},
		template: _.template($('#display-relation-template').html()),
		initialize: function() {
			_.bindAll(this,'render');
			this.render();
			this.listenTo(this.model, 'change', this.render);
			this.listenTo(this.model, 'destroy', this.render);
		},
		render:function(){
			this.$el.html(this.template(this.model.toJSON()));
			if($('#content').hasClass('edit-mode')){
				this.showButtons();
			}else{
				this.closeButtons();
			}
		},
		showButtons:function(){
			this.classToggle('.modify-buttons','no-display','display');
		},
		closeButtons:function(){
			this.classToggle('.modify-buttons','display','no-display');
		},
		classToggle:function(selector,c1,c2){
			this.$(selector).removeClass(c1).addClass(c2);
		},
		editDisplayRelationValue: function(event){
			this.input=$(event.currentTarget);
			//this.input.addClass('editing');
			this.input.focus();
			this.previousValue=this.input.val();
			//alert(this.previousValue);
		},
		updateOnEnter:function(e){
			if (e.keyCode === 13) this.close();
		},
		close:function(){
			var value=this.input.val();
			if(!value){
				this.input.val(this.previousValue);
			}else{
				this.model.set({value:value});
				//this.input.removeClass('editing');
			}
		},
		deleteRelationEntry:function(){
			this.model.destroy();
		}
	});