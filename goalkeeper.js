var backgroundImg, footballImg, goalkeeperImg;
var marginTop, marginRight, marginLeft;
var football,
  goalkeeperleftsaveImage,
  rightsaveImage,
  toprightsaveImage,
  topsaveImage,
  scoreBoard,
  scoreBoardImg;
var targetTL, targetTR, targetL, targetR, targetImg;
var shoot = 2,
  goals = 0,
  jump=0;
var save1 = 0;
var resultFlag = 0,
shootsLeft=6;
var keeper=0;
var whistle,win,cheering,win,lose;


function preload() {
  backgroundImg = loadImage("assets/background.jpg");
  footballImg = loadImage("assets/football.png");
  goalkeeperImg = loadAnimation("assets/stand-small.png");
  leftsaveImage = loadAnimation("assets/left-save-small.png");
  rightsaveImage = loadAnimation("assets/right-save-small.png");
  topleftsaveImage = loadAnimation("assets/top-left-save-small.png");
  toprightsaveImage = loadAnimation("assets/top-right-save-small.png");
  scoreBoardImg = loadImage("assets/scoreBoard.png");
  targetImg = loadImage("assets/target.png");
 whistle = loadSound("audio/whistle.mp3");
 cheering =loadSound("audio/cheering.mp3");
 win = loadSound("audio/win.mp3");
 lose = loadSound("audio/lose.mp3");
}
function setup() {
  createCanvas(732, 600);
  marginTop = createSprite(width / 2, height / 2 - 60, width, 10);
  marginRight = createSprite(width / 2 - 190, height / 2 - 100, 10, width);
  marginLeft = createSprite(width / 2 + 190, height / 2 - 100, 10, width);
  marginLeft.visible = false;
  marginRight.visible = false;
  marginTop.visible = false;
  scoreBoard = createSprite(width / 2 - 250, height / 3 - 150);
  scoreBoard.addImage("score", scoreBoardImg);
  scoreBoard.scale = 0.3;

  goalkeeper = createSprite(width / 2, height / 2 + 95);
  goalkeeper.addAnimation("goalkeeper", goalkeeperImg);
  goalkeeper.addAnimation("goalkeeperTL", topleftsaveImage);
  goalkeeper.addAnimation("goalkeeperTR", toprightsaveImage);
  goalkeeper.addAnimation("goalkeeperL", leftsaveImage);
  goalkeeper.addAnimation("goalkeeperR", rightsaveImage);
  goalkeeper.scale = 1.4;
  // goalkeeper.debug=true;
  goalkeeper.setCollider("circle", 0, 0, 50);

  targetTL = createSprite(125, height - 380, 20, 20);
  targetTL.addImage("target1", targetImg);
  targetTL.scale = 0.2;

  targetL = createSprite(110, height - 200, 20, 20);
  targetL.addImage("target1", targetImg);
  targetL.scale = 0.2;
  //  targetL.debug=true;

  targetR = createSprite(600, height - 200, 20, 20);
  targetR.addImage("target1", targetImg);
  targetR.scale = 0.2;
  //  targetR.debug=true;

  targetTR = createSprite(590, height - 380, 20, 20);
  targetTR.addImage("target1", targetImg);
  targetTR.scale = 0.2;

  football = createSprite(width / 2, height / 2 + 270);
  football.addImage("football", footballImg);
  football.scale = 0.8;
  // football.debug=true;
}
function draw() {
  background(backgroundImg);
 
  if (shoot === 2) {
    goalkeeper.position.x = width / 2;
    goalkeeper.position.y = height / 2 + 85;
    goalkeeper.changeAnimation("goalkeeper", goalkeeperImg);
    if (keyDown("SPACE")){
        jump=Math.round(random(1,4));
        shoot=1;
        whistle.play();
  
    }
  }

  shot();
  goalkeeper.collide(marginTop);
  goalkeeper.collide(marginLeft);
  goalkeeper.collide(marginRight);
  // console.log("goals are "+goals);
  // console.log(" and save are "+save1);
  drawSprites();
  textSize(20);
  fill("red");
  text(goals, width / 2 - 245, height / 3 - 160);
  text(save1, width / 2 - 245, height / 3 - 120);
  text("shoots completed:" + resultFlag, width / 2 - 245, height / 3 - 100);
  text("shoots left:" + shootsLeft, width / 2 - 245, height / 3 - 80);
  textSize(15);
  fill("brown")
  text("UP ARROW", height - 580, 200);
  text("LEFT ARROW", height - 580, 430);
  text("DOWN ARROW", height - 0, 200);
  text("RIGHT ARROW", height - 0, 430);
}
// goalkepper movement
function saves() {
  if (keyDown("RIGHT_ARROW")) {
    goalkeeper.position.x = goalkeeper.position.x + 5;
    goalkeeper.changeAnimation("goalkeeperR", rightsaveImage);
  }

  if (keyDown("LEFT_ARROW")) {
    goalkeeper.position.x = goalkeeper.position.x - 5;
    goalkeeper.changeAnimation("goalkeeperL", leftsaveImage);
  }
  if (keyDown("UP_ARROW")) {
    goalkeeper.position.y = goalkeeper.position.y - 2.5;
    goalkeeper.position.x = goalkeeper.position.x - 2.5;
    goalkeeper.changeAnimation("goalkeeperTL", toprightsaveImage);
  }
  if (keyDown("DOWN_ARROW")) {
    goalkeeper.position.y = goalkeeper.position.y - 2.5;
    goalkeeper.position.x = goalkeeper.position.x + 2.5;
    goalkeeper.changeAnimation("goalkeeperTR", topleftsaveImage);
  }
}

function shot() {
    saves();
  if (jump===1 && shoot === 1) {
    shoot = 3;
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(-4, -5);
    console.log("up" + shoot);
    console.log(jump);
  }
  if (jump===2 && shoot === 1) {
    shoot = 3;
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(-9, -5);
    console.log("up" + shoot);
    console.log(jump);
  }
  if (jump===3  && shoot === 1) {
    shoot = 3;
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(9, -5);
    console.log("up" + shoot);
    console.log(jump);
  }

  if (jump===4  && shoot === 1) {
    shoot = 3;
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(20, -25);
    console.log("up" + shoot);
    console.log(jump);
  }

  if (
    football.collide(targetTL) ||
    football.collide(targetL) ||
    football.collide(targetR) ||
    football.collide(targetTR)
  ) {
    resetGoal();
    goals = goals + 1;
    console.log("goals are" + goals);
    console.log("saves are" + save1);
    cheering.play();
  }
  if (football.collide(goalkeeper)) {
    save1 = save1 + 1;
    console.log("goals are" + goals);
    console.log("saves are" + save1);
    resetGoal();
  }
}
function resetGoal() {
  shoot = 2;
  jump=0;
  football.setVelocity(0, 0);
  football.position.x = width / 2;
  football.position.y = height / 2 + 270;
  goalkeeper.position.x = width / 2;
  goalkeeper.position.y = height / 2 + 85;
  goalkeeper.changeAnimation("goalkeeper", goalkeeperImg);
  resultFlag = resultFlag + 1;
  shootsLeft = shootsLeft - 1;
  console.log("to the end" + resultFlag);
  if (resultFlag === 6) {
    result();
  }
}
function result() {
  cheering.stop();
  shoot = 0;
  goalkeeper.visible = false;
  football.visible = false;
  if (save1 > goals) {
    win.play();
    swal({
      title: `final whistle`,
      text: "goalkeeper wins",
      imageUrl:
        "https://whjr-dev.imgix.net/gamification/Badge2.png?w=100&h=100&auto=format",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }

 

  if (save1 < goals) {
    lose.play();
    swal({
      title: `final whistle`,
      text: "striker wins",
      imageUrl:
        "https://whjr-dev.imgix.net/gamification/Badge2.png?w=100&h=100&auto=format",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }

  if (save1 === goals) {
    cheering.play();
    swal({
      title: `final whistle`,
      text: "its a tie",
      imageUrl:
        "https://whjr-dev.imgix.net/hardwork_common.png?w=100&h=100&auto=format",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing",
    });
  }
}
