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
var shoot = 1,
  goals = 0,
  jump=0;
var save1 = 0;
var resultFlag = 0,
shootsLeft=6;
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
    saves();
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
  if (jump<4&&jump>3) {
    goalkeeper.position.x = goalkeeper.position.x + 5;
    goalkeeper.changeAnimation("goalkeeperR", rightsaveImage);
  }

  if (jump<2) {
    goalkeeper.position.x = goalkeeper.position.x - 5;
    goalkeeper.changeAnimation("goalkeeperL", leftsaveImage);
  }
  if (jump>2&&jump<3) {
    goalkeeper.position.y = goalkeeper.position.y - 2.5;
    goalkeeper.position.x = goalkeeper.position.x - 2.5;
    goalkeeper.changeAnimation("goalkeeperTL", toprightsaveImage);
  }
  if (jump>4) {
    goalkeeper.position.y = goalkeeper.position.y - 2.5;
    goalkeeper.position.x = goalkeeper.position.x + 2.5;
    goalkeeper.changeAnimation("goalkeeperTR", topleftsaveImage);
  }
}

function shot() {
  if (keyDown("UP_ARROW") && shoot === 1) {
    shoot = 2;
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(-4, -5);
    console.log("up" + shoot);
    jump=random(1,2);
    console.log(jump);
  }
  if (keyDown("LEFT_ARROW") && shoot === 1) {
    shoot = 2;
    jump=random(1,2);
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(-9, -5);
    console.log("up" + shoot);
    console.log(jump);
  }
  if (keyDown("RIGHT_ARROW") && shoot === 1) {
    shoot = 2;
    jump=random(3,5);
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(9, -5);
    console.log("up" + shoot);
    console.log(jump);
  }

  if (keyDown("DOWN_ARROW") && shoot === 1) {
    shoot = 2;
    football.x = width / 2;
    football.y = height / 2 + 270;
    football.setVelocity(20, -25);
    console.log("up" + shoot);
    jump=random(3,5);
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
  }
  if (football.collide(goalkeeper)) {
    save1 = save1 + 1;
    console.log("goals are" + goals);
    console.log("saves are" + save1);
    resetGoal();
  }
}
function resetGoal() {
  shoot = 1;
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
  shoot = 0;
  goalkeeper.visible = false;
  football.visible = false;
  if (save1 > goals) {
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
