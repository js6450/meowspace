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
	var num_row = 4;
	var num_col = 6;
	var main_img_num = num_row * num_col;

	$.ajax({
		url: '/search',
		type: 'GET',
		dataType: 'JSON',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			// console.log(data);
			console.log(data.length);
			var index = 0;

			for(var i = 0; i < num_row; i++){
				$("main").append("<div class='row-" + i + "'>");
				for(var j = 0; j < num_col; j++){
					var vid_link = data[index]['extended_entities']['media'][0]['video_info']['variants'][0]['url'];
					console.log(vid_link);

					$(".row-" + i).append("<video class='meow_gifs' id='" + index +"' src='" + vid_link + "' autoplay loop>");
					$("#" + index).css("z-index", "-999");
					$("#" + index).css("width", 100 / num_col + "%");

					index++;
				}
				$("main").append("</div>");
			}

		}
	});
}

$('document').ready(function(){
	//saveData();
	makeTwitterSearchRequest();
});