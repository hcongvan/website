var user_val = 0;
var bot_val = 0;
$(document).ready(function () {
	/* $('.sidebar .nav-item .nav-link.item-dropdown').on('click', function () {
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
	}); */
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
		getData($('img#user_picture').attr('steamid'),730,$('#your-csgo'),0);
		getData($('img#user_picture').attr('steamid'),570,$('#your-dota'),0);
	}
	getData($('div.tab-content#bot_area').attr('steamid'),730,$('#bot-csgo'),1);
	getData($('div.tab-content#bot_area').attr('steamid'),570,$('#bot-dota'),1);
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
	
	$(".dropdown_area").mouseenter(function(){
		$(".dropdown_menu").slideDown("slow");
		}
	);
	
	$(".dropdown_area").mouseleave(function(){
		$(".dropdown_menu").slideUp("slow");
		}
	);
	
	
	/* $("div.item_frame").hover(function(){
		alert(1);
		}
	); */
	
	$(".item_frame").mouseleave(function(){
		var target = $(this).children(".item_frame_dropdown");
		target.css("display","none");
		}
	);
	
	$(".tab_img_user").click(function(){
		var img_link = $(this).attr("src");
		if (img_link == "../../assets/images/csgo_inactive.png")
		{
			$(this).attr("src","../../assets/images/csgo_active.png");
			$(".user_dota").attr("src","../../assets/images/dota_inactive.png");
			$(".user_border").animate({left:'0%'}, "slow", function(){
			$(".user_border").css("border","5px solid #50BFE6");
			$(".user_border").css("box-shadow","0 0 20px blue");
			/* $(".add_item_left").css("background-image", "linear-gradient(to bottom right, #FFFF66, #FF9933)"); */
			});
			console.log(1);
		}
		else if (img_link == "../../assets/images/dota_inactive.png")
		{
			$(this).attr("src","../../assets/images/dota_active.png");
			$(".user_csgo").attr("src","../../assets/images/csgo_inactive.png");
			$(".user_border").animate({left:'50%'}, "slow", function(){
			$(".user_border").css("border","5px solid #FF9933");
			$(".user_border").css("box-shadow","0 0 20px red");
			/* $(".add_item_left").css("background-image", "linear-gradient(to bottom right, #AAF0D1, #50BFE6)"); */
			});
			

			console.log(2);
		}
		$("#your-csgo").slideToggle("slow");
		$("#your-dota").slideToggle("slow");
	});
	
	$(".tab_img_bot").click(function(){
		var img_link = $(this).attr("src");
		if (img_link == "../../assets/images/csgo_inactive.png")
		{
			$(this).attr("src","../../assets/images/csgo_active.png");
			$(".bot_dota").attr("src","../../assets/images/dota_inactive.png");
			$(".bot_border").animate({left:'0%'}, "slow", function(){
			$(".bot_border").css("border","5px solid #50BFE6");
			$(".bot_border").css("box-shadow","0 0 20px blue");
			/* $(".add_item_right").css("background-image", "linear-gradient(to bottom right, #FFFF66, #FF9933)"); */
			});
		}
		else if (img_link == "../../assets/images/dota_inactive.png")
		{
			$(this).attr("src","../../assets/images/dota_active.png");
			$(".bot_csgo").attr("src","../../assets/images/csgo_inactive.png");
			$(".bot_border").animate({left:'50%'}, "slow", function(){
			$(".bot_border").css("border","5px solid #FF9933");
			$(".bot_border").css("box-shadow","0 0 20px red");
			/* $(".add_item_right").css("background-image", "linear-gradient(to bottom right, #AAF0D1, #50BFE6)"); */
			});
		}
		$("#bot-csgo").slideToggle("slow");
		$("#bot-dota").slideToggle("slow");
	});
/* 	$("#trade-btn").click(function(){
		alert("1");
		$.get("checkStatus",function(data,status){
			if(data == "1")
				alert("1");
		};
	}); */
	
	$("#SearchInput").keyup(function(){
		Filter_start(document.getElementById("SearchInput").value)	;
	});
	
	$(".radio_filter").click(function(){
		var button = $(this).find(".radio_cover");
		if( button.css("left") == "2px")
		{
			button.animate({left: '22px'},500);
			$(this).find(".radio").css("background","linear-gradient(-90deg, #66FF66, #93DFB8)");
			button.css("background","yellow");
			Filter_start($(this).find(".Radio_KeyWord").text());
		}
		else
		{
			button.animate({left: '2px'},500);
			$(this).find(".radio").css("background","LightGrey");
			button.css("background","grey");
			$("div.tab_content#bot_area .active .item_frame").css("display","block");
			Filter_start(document.getElementById("SearchInput").value)	;
		}
	});
	
	$(".slider").mouseup(function(){
		var AllItem;
		var ItemSelect;
		var ItemPrice;
		var cur_val = document.getElementById("my_slider").value;
		console.log(cur_val)
		AllItem = $("div.tab_content#bot_area .active .item_frame");	
		for(var i = 0; i < AllItem.length ; i++)
		{
			ItemSelect = "div.tab_content#bot_area .active #item_" + i;
			ItemPrice = Number($(ItemSelect).find(".item_frame_price").text());
			console.log(ItemPrice);
			if(ItemPrice < cur_val)
			{
				$(ItemSelect).css("display","none");
			}
			else 
			{
				$(ItemSelect).css("display","block");
			}
		}
	});
});


function Filter_start(KeyWord){
		var ItemCS ;
		var ItemSelect ;
		var Item;
		KeyWord = KeyWord.toUpperCase();
		console.log(KeyWord);
		ItemCS = $("div.tab_content#bot_area .item_frame");	
		if(KeyWord != "")
		{
			for(var i = 0; i < ItemCS.length; i++)
			{
				ItemSelect = "div.tab_content#bot_area .active #item_" + i;
				
				/* if($(ItemSelect).css("display") == "block")
				{ */
					Item = $(ItemSelect).attr("tag_container");
					Item = Item.split(',');
					for( var j =0; j < Item.length; j++)
					{
						if ( Item[j].toUpperCase().indexOf(KeyWord) > -1 )
						{
							$(ItemSelect).css("display","block");
							break;
						}
						else
							$(ItemSelect).css("display","none");
					}
				/* } */
			}
		}
		
	}


function getData(id,appid,items,flag){
	var previous;
	var key;
	if(flag){
		previous = "$('#trade_area_bot')";
	}else{
		previous = "$('#trade_area_user')"
	}
	$.getJSON('/getinven?steamid='+id+'&appid='+appid,function(data){
		for(var i =0;i<data.length;i++){
			console.log(i);
			items.append('<div id="item_'+i+'" tag_container="'+data[i].tags+'" class="item_frame" assetID="'+data[i].assetID+'" appid="'+appid+'" onclick="AddItems($(this),'+previous+')" onmouseover="dropdown_open($(this))" onmouseout="dropdown_close($(this))">\
													<div class="item_frame_quantity">1</div>\
													<div class="item_frame_rarity">common</div>\
													<img class="item_frame_image" src="https://steamcommunity-a.akamaihd.net/economy/image/'+data[i].img+'">\
													<div class="item_frame_price">'+data[i].price+'</div>\
													<div class="item_frame_dropdown">\
													<p>'+data[i].name+'</p>\
													<p>Item information 2</p>\
													<p>Item information 3</p>\
													</div>\
												</div>');
		}
		/* key = data[1].tags;	//name,appID,assetID,img,tags,price,flt
		alert(key); */
	});
}
function info(img,name,id){
	var menu_bar = $('div#menu_bar');
	$('#menu_bar .login_logo').empty();
	menu_bar.append('<img steamid="'+id+'" id="user_picture" class="user_img" src="'+img+'">');
	menu_bar.append('<div class="dropdown_area">\
						<a href="" id="user_name" class="user_name" >'+name+'</a>\
						<div class="dropdown_menu" >\
							<ul>\
								<li><a>Info 1</a></li>\
								<li><a>Info 2</a></li>\
								<li><a>Info 3</a></li>\
							</ul>\
						</div>\
					</div>');
	/* menu_bar.append('<ul class="user_icon_logout"><li><a href="/logout" >LogOut</a></li></ul>') */
	
}

function dropdown_open(target){
	var drop_menu = target.find(".item_frame_dropdown");
	drop_menu.css("display","block");
	
}

function dropdown_close(target){
	var drop_menu = target.find(".item_frame_dropdown");
	drop_menu.css("display","none");
}

function AddItems(item_id, previous){
	var user_val_dis;
	var bot_val_dis
	var this_id = item_id.parent().attr("id"); 
	switch(this_id){
		case 'your-csgo':
			item_id.attr("onclick","AddItems($(this),$('#your-csgo'))");
			user_val += Number(item_id.find(".item_frame_price").text());
			break;
		case 'your-dota':
			item_id.attr("onclick","AddItems($(this),$('#your-dota'))");
			user_val += Number(item_id.find(".item_frame_price").text());
			break;
		case 'trade_area_user':
			item_id.attr("onclick","AddItems($(this),$('#trade_area_user'))");
			user_val -= Number(item_id.find(".item_frame_price").text());
			break;
		case 'bot-csgo':
			item_id.attr("onclick","AddItems($(this),$('#bot-csgo'))");
			bot_val += Number(item_id.find(".item_frame_price").text());
			break;
		case 'bot-dota':
			item_id.attr("onclick","AddItems($(this),$('#bot-dota'))");
			bot_val += Number(item_id.find(".item_frame_price").text());
			break;
		case 'trade_area_bot':
			item_id.attr("onclick","AddItems($(this),$('#trade_area_bot'))");
			bot_val -= Number(item_id.find(".item_frame_price").text());
			break;
	}
/* 	user_val += Number(item_id.find(".item_frame_price").text());
	alert(user_val); */
	user_val_dis = user_val.toFixed(2);
	bot_val_dis = bot_val.toFixed(2);
	document.getElementById("user_balance").innerHTML=user_val_dis;
	document.getElementById("bot_balance").innerHTML=bot_val_dis;
	previous.append(item_id);
	if($('#trade_area_bot').find(".item_frame").length >14)
	{
		$('#trade_area_bot').css("overflow-y","scroll");
	}
	else
	{
		$('#trade_area_bot').css("overflow-y","visible");
	}
	
	if($('#trade_area_user').find(".item_frame").length >14)
	{
		$('#trade_area_user').css("overflow-y","scroll");
	}
	else
	{
		$('#trade_area_user').css("overflow-y","visible");
	}
}