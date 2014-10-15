var GADGET_SETTINGS = new function(){
	
	this.servers = {
		'eu': 'EU'
	};
	this.languages = {
		'en': 'English',
		'ru': 'Русский',
		'pl': 'Polski',
		'de': 'Deutsch',
		'fr': 'Français',
		'es': 'Español',
		'zh-cn': '简体中文',
		'tr': 'Türkçe',
		'cs': 'Čeština',
		'th': 'ไทย',
		'vi': 'Tiếng Việt',
		'ko': '한국어'
	};
	
	this.init = function(){
		
		this.createSelect($('#server'), this.servers, null);
		this.createSelect($('#language'), this.languages, null);
	};
	
	this.createSelect = function(el, values, selected){
		for(var key in values){
			var option = $('<option>');
			option.val(key);
			option.text(values[key]);
			if(key == selected){
				option.attr('selected','selected');
			}
			el.append(option);
		}
	};
	
	this.updateClan = function(el){
		var value = $(el).val();
		if(value.length < 3){
			return;
		}
		
		console.log('loading clans..');
		$('#clanlist').html('');
		
		WG_API.searchClan(value, 5, function(data){
			for(var i =0; i< data.data.length; i++){
				var a = $('<a>');
				
				var use = {
					'id': data.data[i].clan_id,
					'logo': data.data[i].emblems.small,
					'tag': data.data[i].abbreviation
				};
				a.text(use.tag);
				a.attr('data', JSON.stringify(use));
				
				$('#clanlist').append(a);
				a.on('click', function(){
					var data = JSON.parse($(this).attr('data'));

					var el = $("#selectedClan");
					el.find('.logo').attr('src', data.logo);
					el.find('.logo').show();
					el.find('.tag').text(data.tag);
					el.find('.id').text(data.id);			
					el.show();
					
					$("#searchClan").hide();
				});
			};
		
		});
		
	};
	
	this.changeClan = function(){
		$('#searchClan input').val('');
		$('#clanlist').html('');
		
		$("#searchClan").show();
		
	};
};