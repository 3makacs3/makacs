let state = "trees"; // kezdő állapot "trees", mert a felirat HTML-ben van
let treeImgs = [];
let trees = [
  {x:0, y:0, label:"My Art", page:"art"},
  {x:0, y:0, label:"About Me", page:"about"},
  {x:0, y:0, label:"Contact", page:"contact"}
];

let arrowPulse = 0;
let pulseDir = 1;

function preload(){
  treeImgs[0] = loadImage("images/tree1.png", ()=>{}, ()=>{treeImgs[0]=null});
  treeImgs[1] = loadImage("images/tree2.png", ()=>{}, ()=>{treeImgs[1]=null});
  treeImgs[2] = loadImage("images/tree3.png", ()=>{}, ()=>{treeImgs[2]=null});
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  trees[0].x = width/2 - 250;
  trees[1].x = width/2;
  trees[2].x = width/2 + 250;
  for(let t of trees){
    t.y = height/2 + 150;
  }
}

function draw(){
  clear(); // átlátszó, a háttér a HTML-ben van

  drawArrows();

  if(state=="trees") drawTrees();
  else if(state=="art") drawPage("My Art");
  else if(state=="about") drawPage("About Me");
  else if(state=="contact") drawPage("Contact");
}

function drawArrows(){
  arrowPulse += 0.5 * pulseDir;
  if(arrowPulse>10||arrowPulse<-10) pulseDir*=-1;

  stroke('#772469');
  strokeWeight(6);
  // balról felirat felé
  line(width/2-300, height/2+arrowPulse, width/2, height/2);
  // jobbról felirat felé
  line(width/2+300, height/2+arrowPulse, width/2, height/2);

  noStroke();
  fill('#772469');
  triangle(width/2, height/2,
           width/2-30, height/2-15+arrowPulse,
           width/2-30, height/2+15+arrowPulse);
}

function drawTrees(){
  for(let i=0;i<trees.length;i++){
    let t = trees[i];

    if(treeImgs[i]){
      imageMode(CENTER);
      image(treeImgs[i], t.x, t.y, 120,120);
    } else {
      drawPlaceholderTree(t.x, t.y);
    }

    let d = dist(mouseX, mouseY, t.x, t.y);
    if(d < 50){
      fill('#772469');
      textSize(22);
      text(t.label, t.x, t.y+90);
    }
  }
}

function drawPlaceholderTree(x,y){
  fill('#4C3228'); // törzs barna
  rect(x-5, y, 10, 40);
  fill('#28963C'); // lomb zöld
  triangle(x-30,y,x+30,y,x,y-60);
  triangle(x-25,y-20,x+25,y-20,x,y-80);
}

function drawPage(title){
  fill('#772469');
  textSize(50);
  text(title,width/2,height/2);
  textSize(20);
  text("Click anywhere to go back",width/2,height/2+80);
}

function mousePressed(){
  if(state=="trees"){
    for(let i=0;i<trees.length;i++){
      let t = trees[i];
      if(dist(mouseX,mouseY,t.x,t.y)<50){
        state = t.page;
      }
    }
  } else {
    state="trees";
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
