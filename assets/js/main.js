$(document).ready(function () {
	$('.sidebar .nav-item .nav-link.item-dropdown').on('click', function () {
	   var parent = $(this).parent();
	   var icon = $(this).find('i');
	   if (parent.hasClass('active')) {
		   parent.removeClass('active');
		   parent.find('.item-dropdown-menu').slideUp('slow');
		   icon.removeClass('fa-angle-up');
		   icon.addClass('fa-angle-down');
	   } else {
		   parent.addClass('active');
		   parent.find('.item-dropdown-menu').slideDown('slow');
		   icon.removeClass('fa-angle-down');
		   icon.addClass('fa-angle-up');
	   }
	});
	$('.inventory-area__tab-link').on('click', function () {
		if (!$(this).hasClass('active')) {
			var list = $(this).closest('.inventory-area__tab-list');
			var links = list.find('.inventory-area__tab-link');
			$.map(links, function (item, key) {
				item.getElementsByTagName('img')[0].setAttribute('src', 'assets/images/' + item.getAttribute('aria-controls') + '_inactive.png');
			});
			var game = $(this).attr('aria-controls');
			$(this).find('img').attr('src', 'assets/images/' + game + '_active.png');
		}
	});
	if($('img#user_picture').attr('steamid') != 'undefined'){
		getData($('img#user_picture').attr('steamid'),730,$('div #your-csgo .inventory-wrapper .inventory-wrapper__list'),0);
		getData($('img#user_picture').attr('steamid'),570,$('div #your-dota .inventory-wrapper .inventory-wrapper__list'),0);
	}
	getData($('div.tab-content#bot_area').attr('steamid'),730,$('div #bot-csgo .inventory-wrapper .inventory-wrapper__list'),1);
	getData($('div.tab-content#bot_area').attr('steamid'),570,$('div #bot-dota .inventory-wrapper .inventory-wrapper__list'),1);
	/* $('#trade-btn').click(function(){
		var data = [];
		var items = [];
		var asset = [];
		var _tmp1 = [],_tmp2 =[];
		var url_token = new URL($('#trade-link-input').val());
		var _tmp = url_token.search.split('&')[1].split('=')[1];
		var node_user = $('#trade_area_user .squad-wrapper .squad-wrapper__list').children('.item-card.item-card--real');
		var n = node_user.length;
		for (var i=0;i<n;i++){
			// items.push({assetID:node_user.eq(i).attr('assetID'),appID:node_user.eq(i).attr('appid')});
			if(node_user.eq(i).attr('appid') == '730'){
				_tmp1.push(node_user.eq(i).attr('assetID'));
			}else if(node_user.eq(i).attr('appid') == '570'){
				_tmp2.push(node_user.eq(i).attr('assetID'));
			}
		}
		if(_tmp1.length>0){
			items.push({appID:730,assetID:_tmp1});
		} 
		if(_tmp2.length>0){
			items.push({appID:570,assetID:_tmp2});
		} 
		data.push({steamid:$('img#user_picture').attr('steamid'),token:_tmp,items:items});
		var items = [];
		var _tmp1 = [],_tmp2 =[];
		var node_bot = $('#trade_area_bot .squad-wrapper .squad-wrapper__list').children('.item-card.item-card--real');
		var n = node_bot.length;
		for (var i=0;i<n;i++){
			// items.push({assetID:node_bot.eq(i).attr('assetID'),appID:node_bot.eq(i).attr('appid')});
			if(node_bot.eq(i).attr('appid') == '730'){
				_tmp1.push(node_bot.eq(i).attr('assetID'));
			}else if(node_bot.eq(i).attr('appid') == '570'){
				_tmp2.push(node_bot.eq(i).attr('assetID'));
			}
		}
		if(_tmp1.length>0){
			items.push({appID:730,assetID:_tmp1});
		} 
		if(_tmp2.length>0){
			items.push({appID:570,assetID:_tmp2});
		} 
		data.push({bot:$('.tab-content#bot_area').attr('bot'),items:items});
		$.post('/trade/bot',JSON.stringify(data),function(test){alert(test)});
		// alert(data[0].items[0].assetID);
		// var t = JSON.stringify(data);
		// var d = JSON.parse(t);
		console.log(JSON.stringify(data));
	}); */
	
	$("#trade-btn").click(function(){
		$.get("/checkStatus");
	});
});

function getData(id,appid,items,flag){
	var previous;
	if(flag){
		previous = "$('#trade_area_bot .squad-wrapper .squad-wrapper__list')";
	}else{
		previous = "$('#trade_area_user .squad-wrapper .squad-wrapper__list')"
	}
	$.getJSON('/getinven?steamid='+id+'&appid='+appid,function(data){
		for(var i =0;i<data.length;i++){
			console.log(i);
			items.append('<div id="item_'+i+'" class="item_frame" assetID="'+data[i].assetID+'" appid="'+appid+'" onclick="AddItems($(this),'+previous+')">\
													<div class="item_frame_quantity">1</div>\
													<div class="item_frame_rarity">common</div>\
													<img class="item_frame_image" src="https://steamcommunity-a.akamaihd.net/economy/image/'+data[i].img+'">\
													<div class="item_frame_price">'+data[i].price+'</div>\
													<div class="item_frame_dropdown">\
													<p>'+data[i].name+'</p>\
													<p>Item information 2</p>\
													<p>Item information 3</p>\
												</div>');
		}
		// alert(data[1].name);
	});
}
function info(img,name,id){
	var menu_bar = $('div#menu_bar');
	$('#menu_bar .login_logo').empty();
	menu_bar.append('<img steamid="'+id+'" id="user_picture" class="user_icon" src="'+img+'">');
	menu_bar.append('<span id="user_name" class="user_name" >'+name+'</span>');
	menu_bar.append('<ul class="user_icon_logout"><li><a href="/logout" >LogOut</a></li></ul>')
	
}
function AddItems(item_id, previous){
	var parent_tag = item_id.parents();
	var _id = parent_tag.parents().parents().attr('id');
	parent_tag.remove(item_id);
	switch(_id){
		case 'your-csgo':
			item_id.attr("onclick","AddItems($(this),$('div #your-csgo .inventory-wrapper .inventory-wrapper__list'))");
			break;
		case 'your-dota':
			item_id.attr("onclick","AddItems($(this),$('div #your-dota .inventory-wrapper .inventory-wrapper__list'))");
			break;
		case 'bot-csgo':
			item_id.attr("onclick","AddItems($(this),$('div #bot-csgo .inventory-wrapper .inventory-wrapper__list'))");
			break;
		case 'bot-dota':
			item_id.attr("onclick","AddItems($(this),$('div #bot-dota .inventory-wrapper .inventory-wrapper__list'))");
			break;
		case 'trade_area_user':
			item_id.attr("onclick","AddItems($(this),$('#trade_area_user .squad-wrapper .squad-wrapper__list'))");
			break;
		case 'trade_area_bot':
			item_id.attr("onclick","AddItems($(this),$('#trade_area_bot .squad-wrapper .squad-wrapper__list'))");
			break;
	}
	previous.prepend(item_id);
}