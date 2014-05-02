var AddDataView= Backbone.View.extend({
	el: $('#add-data'),
	events:{
		'click input[name=add-data]:checked': 'displayAddDataBox',
		'click input[value=create]':'validate',
		'click input[value=cancel]': 'closeAddDataBox'
	},
	initialize:function(){
		this.todisplay=$('#add-category');
	},
	render:function(){
		this.classToggle(this.$el,'no-display','display');
		//this.$el.toggle();
	},
	classToggle:function(selector,c1,c2){
		$(selector).removeClass(c1).addClass(c2);
	},
	displayAddDataBox:function(event){
		/*if(this.todisplay.is(':visible')){
			alert("V");
			this.todisplay.toggle();
			this.todisplay.children('input[type=text]').val('');
		}*/
		this.classToggle(this.todisplay,'display','no-display');
		var input=$(event.currentTarget);
		this.todisplay=('#add-'+input.val());
		this.classToggle(this.todisplay,'no-display','display');
		/*if(this.todisplay.is(':hidden')){
			alert("H");
			this.todisplay.toggle();
			this.todisplay.children('input[type=text]').val('');
		}*/
	},
	validate:function(e){
		var currentid=$(e.currentTarget);
		var parentid=$(e.currentTarget).parent();
		var names=parentid.attr('id').split('-');
		this.entry=names[1];
		this.form=[];
		this.form[0]=this.entry;
			
		if (this.form[0]==='category'){
			this.form[1]=parentid.children(".addEntry1").val().trim();
			if(this.form[1].length!==0){
				this.closeAddDataBox();
				this.trigger('data-fetched');
			}
		}else if (this.form[0]==='displayRelation'){
			this.form[1]=parentid.children(".addEntry1").val().trim();;
			this.form[2]=parentid.children(".addEntry2").val().trim();;
			if(this.form[1].length!==0  && this.form[2].length!==0){
				this.closeAddDataBox();
				this.trigger('data-fetched');
			}
		}else if (this.form[0]==='property'){
			this.form[1]=parentid.children(".addEntry1").val().trim();;
			this.form[2]=parentid.children(".addEntry2").val().trim();;
			if(this.form[1].length!==0  && this.form[2].length!==0){
				this.closeAddDataBox();
				this.trigger('data-fetched');
			}
		}
	},
	closeAddDataBox:function(){
		$(this.todisplay).children('input[type=text]').val('');
		this.classToggle(this.$el,'display','no-display');
	}
});