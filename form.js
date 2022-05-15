var backgroundImg;
function preload(){
    backgroundImg = loadImage("assets/background.jpg");
}
function setup(){
    createCanvas(732, 600);
}
function draw(){
    background(backgroundImg);
    fill("BLACK");
    textSize(20);
    text("WELLCOME TO PENALTY SHOOT OUT GAME", width / 2-225, height /2-20);
    text("CHOSE YOUR ROLL TODAY", width / 2-140, height / 2 );
}