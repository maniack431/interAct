// let cam

// let randomx, randomy, i

// function preload()
// {}

// function mouseClicked(){}

// function setup() {
//   createCanvas(400, 400); 
  
//     cam = createCapture(VIDEO, {flipped: true})
  
//   cam.hide()
  
//   console.log(cam.width)
//   console.log(cam.height)
  
  
//   randomx = random(cam.width)
//   randomy = random(cam.height)
  
//   seed = random(100)
// }

// function draw() {
  
//   stroke('white')
//   //strokeWeight(32)
//   background('black');
  
//   let aspectRatio = cam.height / cam.width
  
//   //translate(width/2, height/2)
//   imageMode(CENTER)
  
//   //randomSeed(seed)
  
//   let n = 2; 
  
//   //for ( i = 0; i<n; i++){
//   let rx = random(cam.width)
//   let ry = random(cam.height)
  
//   let x = random(width)
//   let y = random(height)
  
  
//   let img = cam.get(rx, ry, 200, 200)
  
  
  
//  /* push();
//   translate(width,0);
//   scale(-1, 1);*/
//  // image(cam, 0, 0, width, (cam.height/cam.width) * width)
  
  
//   image(img, rx, ry, 500, 500)
    
    
//   //}
//  // pop();
  
  
  
// }


let cam;

function setup() {
  createCanvas(400, 400);

  // Create a webcam capture
  cam = createCapture(VIDEO, { flipped: true });
  cam.hide();
}

function draw() {
  background('black');

  // Map mouseX to control flickering intensity
  let flickerIntensity = map(mouseX, 0, width, 0, 50); // Higher mouseX = more flickering
  let isStatic = mouseY > height / 2; // If mouseY is in the bottom half, stop flickering

  // Calculate random offsets for flickering
  let offsetX = 0;
  let offsetY = 0;
  if (!isStatic) {
    offsetX = random(-flickerIntensity, flickerIntensity);
    offsetY = random(-flickerIntensity, flickerIntensity);
  }

  // Display the full webcam feed with flickering effect
  imageMode(CORNER);
  image(cam, offsetX, offsetY, width, height);
}