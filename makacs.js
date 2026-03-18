let drawing = []; // tárolja az összes vonalat

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#c2c8f6'); // világos lila háttér
}

function draw() {
  // minden frame-ben újrarajzoljuk az összes vonalat
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

// folyamatos vonal rajzolása egérrel
function mouseDragged() {
  if (drawing.length == 0 || drawing[drawing.length - 1].finished) {
    drawing.push([]);
  }
  drawing[drawing.length - 1].push({x: mouseX, y: mouseY, finished:false});
}

// vonal lezárása egér felengedésekor
function mouseReleased() {
  if (drawing.length > 0) {
    drawing[drawing.length - 1].finished = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
