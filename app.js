let video = null;
let detector = null;
let detections = [];
let videoVisibility = true;
let detecting = false;

const videoAction = document.getElementById('videoAction');
const detectionAction = document.getElementById('detectionAction');

document.body.style.cursor = 'wait';

function preload() {
  detector = ml5.objectDetector('cocossd');
}

function setup() {
  createCanvas(270, 270).parent('contenedor-video-canvas');
  video = createCapture(VIDEO);
  video.size(300, 300).parent('contenedor-video-canvas');

}

function draw() {
  if (!video || !detecting) return;
  image(video, 0, 0);
  for (let i = 0; i < detections.length; i++) {
    drawResult(detections[i]);
  }
}

function drawResult(object) {
  boundingBox(object);
  drawLabel(object);
}

function boundingBox(object) {
  stroke('blue');
  strokeWeight(6);
  noFill();
  rect(object.x, object.y, object.width, object.height);
}
function drawLabel(object) {
  noStroke();
  fill('white');
  textSize(34);
  text(object.label, object.x + 15, object.y + 34);
}

function onDetected(error, results) {
  if (error) {
    console.error(error);
  }
  detections = results;
   
console.log(detections[0].confidence);

if(detections[0].confidence>0.7){
  console.log("Usted es una persona");
}else{
  console.log("no estoy seguro de que sea una persona");
}

//if(detections[0].label=="person"){
  //console.log("detecto una persona");
//}







//if(detections.length>=2){
  //if(detections.length.label=="person"){
    //console.log("Examen anulado");
  //}
   
//}




  if (detecting) {
    detect();
  }
}

function detect() {
  detector.detect(video, onDetected);
}

function toggleVideo() {
  if (!video) return;
  if (videoVisibility) {
    video.hide();
    videoAction.innerText = 'Activar Video';
  } else {
    video.show();
    videoAction.innerText = 'Desactivar Video';
  }
  videoVisibility = !videoVisibility;
}

function toggleDetecting() {
  if (!video || !detector) return;
  if (!detecting) {
    detect();
    detectionAction.innerText = 'Parar...';
  } else {
    detectionAction.innerText = 'Detectar Objetos';
  }
  detecting = !detecting;
}