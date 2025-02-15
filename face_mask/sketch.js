let cam;
let handPose;
let faceMesh;
let predictions = [];
let predictions1 = [];

function preload() {
  handpose = ml5.handPose(cam, modelReady);
  facemesh = ml5.faceMesh(cam, modelReady);
}
function setup() {
  createCanvas(400, 400);

  cam = createCapture(VIDEO, { flipped: false });
  cam.size(width, height);
  cam.hide();

  // handPose.on("predict", (results) => {
  //   predictions = results
  // })
  // handPose.predict(cam)

  handpose.detectStart(cam, (result) => {
    predictions = result;
  });

  facemesh.detectStart(cam, (result) => {
    predictions1 = result;
  });
}

function draw() {
  background(255) 
  //image(cam, 0, 0, width, height)
  drawHands();
  drawFace();
}

function drawFace() {
  let faces = predictions1;
  for (let i = 0; i < faces.length; i++) {
    let face = faces[i];

    for (let j = 0; j < face.keypoints.length; j++) {
      let p = face.keypoints[j];

      //if (j == 4 || j == 8 || j == 12 || j == 16 || j == 20) {
      stroke("black")
      fill("black")
      circle(p.x, p.y, 2);
      //     line(indexTip.x, indexTip.y, thumbTip.x, thumbTip.y)
    }
    for (let f = 0, g = f + 1; f < 467, g < 468; f++, g++) {
      let aTip = face.keypoints[f];
      stroke("black")
      fill("black")
      //circle(aTip.x, aTip.y, 10);

      let bTip = face.keypoints[g];
      stroke("black")
      fill("black")
      //circle(bTip.x, bTip.y, 10);

      line(aTip.x, aTip.y, bTip.x, bTip.y);
      // line(indexTip.x, indexTip.y, midTip.x, midTip.y);
    }
  }
}

function drawHands() {
  let hands = predictions;
  for (let i = 0; i < hands.length; i++) {
    let hand = hands[i];

    for (let j = 0; j < hand.keypoints.length; j++) {
      let p = hand.keypoints[j];

      if (j == 4 || j == 8 || j == 12 || j == 16 || j == 20) {
        stroke("black");
        fill("black");
        // circle(p.x, p.y, 10)
        //     line(indexTip.x, indexTip.y, thumbTip.x, thumbTip.y)
      }
      for (
        let f = 0, g = f + 1;
        f < 19, g < 20;
        f++, g++
      ) { // u = keypoints of fingertips which are multiples of 4
        let aTip = hand.keypoints[f];
        stroke("black");
        fill("black");
        circle(aTip.x, aTip.y, 2);

        let bTip = hand.keypoints[g];
        stroke("black");
        fill("black");
        circle(bTip.x, bTip.y, 2);

//         let wTip = hand.keypoints[u];
//         stroke("black");
//         fill("black");
//         circle(wTip.x, wTip.y, 2);

//         let qTip = hand.keypoints[u + 4];
//         stroke("black")
//         fill("black")
//         circle(qTip.x, qTip.y, 2);

        line(aTip.x, aTip.y, bTip.x, bTip.y);
       // line(wTip.x, wTip.y, qTip.x, qTip.y); //fingertips
        // line(indexTip.x, indexTip.y, midTip.x, midTip.y);
      }
    }

    //     let indexTip = hand.keypoints[8];
    //     stroke("white");
    //     fill("white");
    //     circle(indexTip.x, indexTip.y, 10);

    //     let thumbTip = hand.keypoints[4];
    //     stroke("white");
    //     fill("white");
    //     circle(thumbTip.x, thumbTip.y, 10);

    //     let midTip = hand.keypoints[12];
    //     stroke("white");
    //     fill("white");
    //     circle(midTip.x, midTip.y, 10);

    //     let ringTip = hand.keypoints[16];
    //     stroke("white");
    //     fill("white");
    //     circle(ringTip.x, ringTip.y, 10);

    let pinkTip = hand.keypoints[20];
    // stroke("white");
    // fill("white");
    //  circle(pinkTip.x, pinkTip.y, 10);

    let wristTip = hand.keypoints[0];
    //  stroke("white");
    // fill("white");
    // circle(wristTip.x, wristTip.y, 10);

    //     line(indexTip.x, indexTip.y, thumbTip.x, thumbTip.y);
    //     line(indexTip.x, indexTip.y, midTip.x, midTip.y);
    //     line(midTip.x, midTip.y, ringTip.x, ringTip.y);
    //     line(ringTip.x, ringTip.y, pinkTip.x, pinkTip.y);
    line(pinkTip.x, pinkTip.y, wristTip.x, wristTip.y);
    //     line(wristTip.x, wristTip.y, thumbTip.x, thumbTip.y);
  }
}

function modelReady() {
  console.log("model is loaded");
}
