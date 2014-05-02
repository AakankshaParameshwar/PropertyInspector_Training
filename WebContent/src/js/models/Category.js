var Category= Backbone.Model.extend({
		defaults:{
			'categoryName': '---',
			'openByDefault': 'false',
			'properties': null
		},
		initialize: function(){
			this.properties=new Properties();
			this.properties.reset(this.get('properties'));
			/* with this I can add the index to models that are 
			already there in collection but not to new models*/
			
			/* (this.properties).each(function(m,i){
				m.set('order',i);
			}); */
		}
	});