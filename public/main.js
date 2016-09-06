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
		}
	});
}

$('document').ready(function(){
	//saveData();
	makeTwitterSearchRequest();
});