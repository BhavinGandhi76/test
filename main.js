objects = [];
Status = "";
song = "";

function setup(){
   canvas= createCanvas(380, 380);
   canvas.center();
   video = createCapture(VIDEO);
   video.size(380, 380);
   video.hide();
   objectdetector = ml5.objectDetector("cocossd", modelloaded);
   document.getElementById("Status").innerHTML = "Status: Detecting Objects";
}

function modelloaded(){
   console.log("model is loaded");
   Status = true;
}

function preload(){
   song = loadSound("R.mp3")
}

function gotResult(error,results){
  if(error){
     console.error(error);
  }
  else{
     console.log(results);
     objects = results;
  }
}

function draw(){
 image(video, 0, 0, 380, 380);
 if(Status != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectdetector.detect(video, gotResult);
 for(i = 0; i < objects.length ; i++){
   document.getElementById("Status").innerHTML = "Status: Object Detected";
fill(r,g,b);
stroke(r,g,b);
noFill();
percent = floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%", objects[i].x +15, objects[i].y + 15);
rect(objects[i].x ,objects[i].y ,objects[i].width, objects[i].height);

if(objects[i].label == "person"){
   document.getElementById("No.Objects").innerHTML = "Baby Found";
   song.stop();
}
else{
   document.getElementById("No.Objects").innerHTML = "Baby not Found";
   song.play();


}
}}}