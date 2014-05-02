var CompleteDataView= Backbone.View.extend({
		el: $('#content ul'),
		initialize: function() {
			this.model.set({url:this.options.url});
			var cur_obj=this;
			this.model.fetch({
				url:this.options.url,
				success: function(){
					cur_obj.render();
				},
				error:function(){
					console.log('not able to retrieve data');
				},
				add:true
			});
			this.listenTo(this.options.parent, 'start-editing',this.render);
			this.listenTo(this.options.parent, 'stop-editing',this.render);
			this.listenTo(this.model.categories, 'add', this.change);
			this.listenTo(this.model.displayRelations, 'add', this.change);
			this.listenTo(this.model.categories,'change',this.change);
			this.listenTo(this.model.displayRelations,'change',this.change);
			this.listenTo(this.model.categories, 'destroy', this.change);
			this.listenTo(this.model.displayRelations, 'destroy', this.change);
		},
		render:function(){
			var cur_element=this.$el;
			var cur_obj=this;
			cur_element.html('   ');
			var x=this.model.categories;
			(this.model.categories).each(function(model,index){
				cur_obj.categoryView=new CategoryView({model:model,parent:x});
				cur_element.append(cur_obj.categoryView.el);
			});
			cur_element.append("</br><div style='border:1px solid #FA8072;'></div></br>");

			(this.model.displayRelations).each(function(model,index){
				cur_obj.displayRelationView=new DisplayRelationView({model:model,parent:this});
				cur_element.append(cur_obj.displayRelationView.el);
			});
			if(this.$el.parent().hasClass('edit-mode')){
				this.displayEditButtons();
			}
			/* $('#content ul').sortable({
				
				stop: function(event,ui){
					console.log(JSON.stringify(ui.item));
					cur_obj.categoryView.trigger('drop',ui.item.index());
					console.log(JSON.stringify(cur_obj.model.categories));
				}
				
			});
			$('#content ul').disableSelection(); */
			
		},
		change:function(){
			this.model.set({
				categories:this.model.categories.toJSON(),
				displayRelations:this.model.displayRelations.toJSON()
			});
			this.render();
		},
		addData:function(form){
			if(form[0]==='category'){
				this.model.categories.add({categoryName:form[1]});
			}else if(form[0]==='displayRelation'){
				this.model.displayRelations.add({name:form[1],value:form[2]});
			}
		},
		displayEditButtons:function(){
			//this.CategoryView.showButtons();
			//this.dispRelView.showButtons();
		},
		closeEditButtons:function(){
			//this.CategoryView.closeButtons();
			//this.dispRelView.showButtons();
		},
	});