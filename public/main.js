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
	$.ajax({
		url: '/search',
		type: 'GET',
		dataType: 'JSON',
		error: function(err){
			console.log(err);
		},
		success: function(data){
			console.log(data);
			var i;
			for(i = 0; i < data.length; i++){
				var vid_link = data[i]['extended_entities']['media'][0]['video_info']['variants'][0]['url'];
				console.log(vid_link);
				$("#display").append("<video src='" + vid_link + "' autoplay loop>");
			}
		}
	});
}

$('document').ready(function(){
	//saveData();
	makeTwitterSearchRequest();
});