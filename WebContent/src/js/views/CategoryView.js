var CategoryView=Backbone.View.extend({
		tagName: 'li',
		className: 'category',
		template: _.template($('#category-template').html()),
		events:{
		'dblclick .category-name h5': 'editCategoryName',
		'blur .editing':'close',
		'keypress .editing': 'updateOnEnter',
		'click .add-icon':'addProperty',
		'click .edit-icon':'startEditingCategory',
		'blur .category-edit':'stopEditingCategory',
		'click .modify-buttons .delete-icon': 'deleteCategory'
		},
		initialize: function(options) {
			_.bindAll(this,'render');
			this.render();
			this.collection=this.model.properties;
			this.addDataView=new AddDataView();
			//this.on('blur: .category-edit',this.stopEditingCategory);
			this.listenTo(this.addDataView,'data-fetched', this.updateModels);
			this.listenTo(this.model.properties,'change',this.change);
			this.listenTo(this.model.properties,'add',this.change);
			this.listenTo(this.model.properties, 'destroy', this.change);
			this.listenTo(this.model.properties, 'update-sort', this.updateSort);
			seen = []
			/* console.log(JSON.stringify(options.parent, function(key, val) {
					if (typeof val == "object") {
						if (seen.indexOf(val) >= 0)
						return
						seen.push(val)
					}
					return val
				})); */
				cur_obj=this;
			$('.properties-collection').sortable({
				start:function(event,ui){
					this.startIndex=ui.item.index();
				},
				
				update: function(event,ui){
					this.endIndex=ui.item.index();
					console.log(ui.item);
					ui.item.trigger('drop',ui.item.index());
					//cur_obj.propertyView.trigger('item-dropped',ui.item.index());
					/* cur_obj=this;
					$(this).find('li').each(function(i){
						console.log($(this).attr('class'));
						var obj=this;
						if(i=== cur_obj.startIndex){
							alert("triggered");
							$(obj).trigger('drop', cur_obj.endIndex);
                        }
                        //if(item.get('order') != i+1) item.set({order: i+1}, {silent: true});
                    });
                    //userCollection.sort(); */
				}
			});
			$('.category ul').disableSelection();
		},
		render:function(){
			
			this.$el.html(this.template(this.model.toJSON()));
			var cur_element=this.$el.find("ul");
			var cur_obj=this;
			//console.log(JSON.stringify(this.model.properties));
			(this.model.properties).each(function(m,i){
				cur_obj.propertyView=new PropertyView({model:m});
				
				cur_element.append(cur_obj.propertyView.el);
			});
			
			
			if($('#content').hasClass('edit-mode')){
				this.showButtons();
			}else{
				this.closeButtons();
			}
			//$('.category ul').sortable();
			//$('.category ul').disableSelection();
			var currentCollection=cur_obj.model.properties;
			
		},
		change:function(){
			this.model.set({properties:this.model.properties.toJSON()});
			this.render();
		},
		showButtons:function(){
			var cur_obj=this;
			this.classToggle('.modify-buttons','no-display','display');
			//cur_obj.propertyView.render();
		},
		closeButtons:function(){
			var cur_obj=this;
			this.classToggle('.modify-buttons','display','no-display');
			//cur_obj.propertyView.render();
		},
		classToggle:function(selector,c1,c2){
			this.$(selector).removeClass(c1).addClass(c2);
		},
		updateOnEnter:function(e){
			if (e.keyCode === 13) this.close();
		},
		close:function(){
			var value=this.input.val();
			console.log(this.attribute+" === " +value);
			if(!value){
				this.model.set(this.attribute,this.previousValue);
			}else{
				this.model.set(this.attribute,value);
			}
			this.input.removeClass('editing');
			this.label.removeClass('edit')
		},
		editCategoryName:function(event){
			if($('#content').hasClass('edit-mode')){
				event.preventDefault();
				this.label=$(event.currentTarget);
				this.input=this.label.parent().find(".edit");
				this.label.addClass('edit');
				this.input.addClass('editing');
				this.input.focus();
				this.input.val(this.label.text()); 
				this.attribute='categoryName';
				this.previousValue=this.label.text();
			}
		},
		addProperty:function(e){
			var currentCategory=$(e.currentTarget).parents('.category').find('#add-property');
			this.addDataView.setElement(currentCategory);
			this.addDataView.render();
		},
		startEditingCategory:function(e){
			this.currentEdit=$(e.currentTarget).parents('.category').toggleClass('category-edit');
			this.propertyView.displayDeleteButton(this.currentEdit);
			//this.previousEdit=this.currentEdit;
		},
		updateModels:function(){
			var values=this.addDataView.form;
			this.model.properties.add({label:values[1],name:values[2]});
		},
		stopEditingCategory:function(){
			alert(this.currentEdit.atr('class'));
			this.currentEdit.removeClass('category-edit');
			this.currentEdit.focus();
			this.propertyView.closeDeleteButton(this.currentEdit);
		},
		deleteCategory:function(e){
			/*var ans=confirm("Are you sure you wanna delete it?",'');
			if(ans){*/
				this.model.destroy();
			
			//}	
		},
		updateSort:function(event,model,position){
			(this.model.properties).remove(model);
			(this.model.properties).each(function(model,index){
				var order=index;
				if(index>=position){
					order +=1;
				}
				model.set('order',order);
			});
			model.set('order',position);
			(this.model.properties).add(model, {at:position});
			console.log(JSON.stringify(this.model.properties));
			this.render();
		}
	
	});