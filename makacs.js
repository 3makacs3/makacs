
let drawing = []; // tárolja az összes vonalat

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // ne használj background()-t vagy clear()-t, így a HTML háttér és a felirat látszik
  for (let i = 0; i < drawing.length; i++) {
    let linePoints = drawing[i];
    stroke('#b46b9f'); // vonal színe
    strokeWeight(2);
    noFill();
    beginShape();
    for (let pt of linePoints) {
      vertex(pt.x, pt.y);
    }
    endShape();
  }
}

function mouseDragged() {
  if (drawing.length == 0 || drawing[drawing.length - 1].finished) {
    drawing.push([]);
  }
  drawing[drawing.length - 1].push({x: mouseX, y: mouseY, finished:false});
}

function mouseReleased() {
  if (drawing.length > 0) {
    drawing[drawing.length - 1].finished = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
