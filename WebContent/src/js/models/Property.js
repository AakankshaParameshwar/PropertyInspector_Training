var Property= Backbone.Model.extend({
		defaults:{
			'label' : '---',
			'name': '.....',
			'readOnly': true,
			/* for now I have it null but I need to use the instance here like:
			 'order': instance.nextOrder()
			*/
			'order':null
		},
		initialize:function(){
			//console.log(JSON.stringify(this));
		}
	});