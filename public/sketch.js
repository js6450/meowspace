var capture;
var recording = false;
var c;
var gif;

var countFrame = 0;

var status = "MEOW!";

function setup() {
    colorMode(HSB);
    c = createCanvas(340, 260);
    capture = createCapture(VIDEO);
    capture.size(320, 240);
    capture.hide();
    setupGif();
}

function draw() {
    background(frameCount & 255, 255, 255);
    image(capture, 10, 10, 320, 240);

    if (recording && frameCount % 3 == 0 && countFrame <= 20) {
        gif.addFrame(c.elt, {delay: 1, copy: true});
        status = "RECORDING";
        countFrame++;
    }
    else if(countFrame > 20){
        countFrame = 0;
        status = "MEOW!";
        recording = !recording;
        if (!recording) {
            gif.render();
        }
    }

    noStroke();
    fill(frameCount & 255, 255, 255);
    textSize(12);
    textFont("Helvetica");
    text(status, width/2 - 20, height/2);
}

function keyPressed() {
    recording = !recording;
    if (!recording) {
        gif.render();
    }
}

function setupGif() {
    gif = new GIF({
        workers: 2,
        quality: 40
    });

    gif.on('finished', function(blob) {

        var recorded_url = URL.createObjectURL(blob);
        //var test = URL.revokeObjectURL(blob);

        console.log(blob);
        console.log("recorded_url:" + recorded_url);

//				var array = recorded_url.split("/");
//				console.log(array[3]);
//				var json_obj = {url: array[3]};
//				saveData(json_obj);
        //directly posting it on the current page - disable line below later
//				$("main").append("<img src='"+ recorded_url +"'>");
        //you can also download the created gif!
//				$("main").append("<a href='"+ recorded_url +"' download>Download</a>");
//
        var formData = new FormData();
        formData.append("giffu", blob);

        $.ajax({
            url: '/dat',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: setTimeout(function(){
                location.reload();
            }, 5000)
        });
        setupGif();
    });

}
