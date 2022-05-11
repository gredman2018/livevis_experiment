
function preload(){
  sound = loadSound('assets/sample.mp3');
  gun = loadModel('assets/model.obj', normalize=true);
}

function setup() {
  let cnvs = createCanvas(400, 400, WEBGL);
  cnvs.mouseClicked(togglePlay);
  fft = new p5.FFT();
  sound.amp(0.2);


}

function draw(){
  background(220);

  let spectrum = fft.analyze();
  stroke(0.001);
  noFill();

  for (let i = 0; i< spectrum.length; i++){
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width / spectrum.length, h )
    rotateX(frameCount*x);
    rotateY(frameCount* h);
    for (let v =0; v<gun.vertices.length; v++){
      gun.vertices[v].x += random (-10, 10);
      gun.vertices[v].y += random (-10, 10);
      gun.vertices[v].z += random (-10, 10);
    }

  }
  model(gun);

  let waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(20);
  for (let i = 0; i < waveform.length; i++){
    let x = map(i, 0, waveform.length, 0, width);
    let y = map( waveform[i], -1, 1, 0, height);
    vertex(x,y);
  }
  endShape();

  text('tap to play', 20, 20);
}

function togglePlay() {
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}