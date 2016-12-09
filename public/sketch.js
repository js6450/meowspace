var capture;
var recording = false;
var c;
var gif;
var reload = 0;

var countFrame = 0;

var status = "MEOW!";

function setup() {
    colorMode(HSB);
    noStroke();
    c = createCanvas(400, 320);
    capture = createCapture(VIDEO);
    capture.size(320, 240);
    capture.hide();
    setupGif();
}

function draw() {
    background(255, 0);
    fill(frameCount & 255, 255, 255);
    rect(30, height-260, width- 60, height);
    triangle(30, 0, 30, height-260, 120, height-260);
    triangle(width-30, 0, width-30, height-260, width - 120, height-260);
    push();
    translate(capture.width + 20, 0);
    scale(-1, 1);
    image(capture, -12.5, height - 250, 307.5, 240);

    pop();

    if (recording && frameCount % 3 == 0 && countFrame <= 20) {
        gif.addFrame(c.elt, {delay: 1, copy: true});
        status = "RECORDING";
        countFrame++;
    }
    else if(countFrame > 20){
        countFrame = 0;
        status = "RENDERING";
        recording = !recording;
        if (!recording) {
            gif.render();
        }
    }

    noStroke();
    fill(frameCount & 255, 255, 255);
    textSize(32);
    textFont("Helvetica");
    text(status, width/2 - textWidth(status) / 2, height/2 + 50 - 18);
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

        // console.log(blob);
        // console.log("recorded_url:" + recorded_url);

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

        status = "MEOW!";

        $.ajax({
            url: '/dat',
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(res){
                console.log("finished rendering");
                reload = res.body;
                console.log(reload);
                //location.reload();
            }
        });
        setupGif();

        if(reload = 1){

            window.location.reload();
        }

    });

}
