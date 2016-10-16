function saveData(obj){
	$.ajax({
		url: '/save',
		type: 'POST',
		contentType: 'application/json',
		error: function(resp){
			console.log("Oh no...");
			console.log(resp);
		},
		success: function(resp){
			console.log('WooHoo!');
			console.log(resp);
		}
	});
	
}

function makeTwitterSearchRequest(){
	var main_img_num = 8;

	$.ajax({
		url: '/search',
		type: 'GET',
		dataType: 'JSON',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			// console.log(data);
			var i;
			for(i = 0; i < main_img_num; i++){
				var vid_link = data[i]['extended_entities']['media'][0]['video_info']['variants'][0]['url'];
				console.log(vid_link);
				if(i == 0){
					$("main").append("<div class='row-1'>");
				}
				if(i == 3){
					$("main").append("<div class='row-2'>");
				}
				if(i == 5){
					$("main").append("<div class='row-3'>");
				}
				if(i >= 0 && i < 3){
					$(".row-1").append("<video class='meow_gifs' id='" + i +"' src='" + vid_link + "' autoplay loop>");
				}
				else if(i == 3 || i == 4){
					$(".row-2").append("<video class='meow_gifs' id='" + i +"' src='" + vid_link + "' autoplay loop>");
				}
				else{
					$(".row-3").append("<video class='meow_gifs' id='" + i +"' src='" + vid_link + "' autoplay loop>");

				}
				if(i == 3){
					$(canvas).appendTo($(".row-2"));
				}
				// $("main").append("<video class='meow_gifs' id='" + i +"' src='" + vid_link + "' autoplay loop>");
				if(i == 2 || i == 4 || i == 7) {
					$("main").append("</div>");
				}
			}
		}
	});
}

$('document').ready(function(){
	//saveData();
	makeTwitterSearchRequest();
});