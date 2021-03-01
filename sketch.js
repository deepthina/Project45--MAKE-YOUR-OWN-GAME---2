const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var bckImage, bck;
var nemo, nemoImage;
var sharkImage, jellyImage, coralImage, octopusImage;

var sharkGroup, jellyGroup, coralGroup, octopusGroup;

var gameState = "play";

function preload() {

  bckImage = loadImage("images/bck1.jpg");
  nemoImage = loadImage("images/nemo.png");
  sharkImage = loadImage("images/shark.png");
  jellyImage = loadImage("images/jelly.png");
  coralImage = loadImage("images/coral.png");
  octopusImage = loadImage("images/octopus.png");

  music = loadSound("images/bensound-funkyelement.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  music.loop();


  engine = Engine.create();
  world = engine.world;

  bck = createSprite(width / 2, height / 2, width, height);
  bck.shapeColor = rgb(0, 83, 203);

  nemo = createSprite(500, 300);
  nemo.addImage("nemo", nemoImage);
  nemo.scale = 0.6;
  nemo.setCollider("circle", 0, 0, 20);

  sharkGroup = new Group();
  jellyGroup = new Group();
  coralGroup = new Group();
  octopusGroup = new Group();
}

function draw() {
  background(0, 83, 203);

  Engine.update(engine);

  bck.velocityX = -10;

  camera.x = nemo.x;
  camera.y = nemo.y;

  if (bck.x < 0)
    bck.x = bck.width / 2;


  if (keyDown("up")) {
    nemo.y = nemo.y - 10;
  }

  else if (keyDown("down")) {
    nemo.y = nemo.y + 10;
  }


  else if (keyDown("left")) {
    nemo.x = nemo.x - 10;
  }



  else if (keyDown("right")) {
    nemo.x = nemo.x + 10;
  }

  spawnJellyFish();
  spawnSharks();
  spawnCoral();
  spawnOctopus();
  drawSprites();


  if (octopusGroup.isTouching(nemo)) {
    octopusGroup.x = bck.x;
    octopusGroup.y = bck.y;
  }

  else if (nemo.isTouching(sharkGroup) || nemo.isTouching(jellyGroup)) {
    gameState = "end";
    music.stop();
  }

  if (gameState === "end") {
    background("black");
    text("Game over", width / 2, height / 2);
    nemo.velocityX = 0;
    sharkGroup.setVelocityXEach(0);
    jellyGroup.setVelocityXEach(0);
    bck.velocityX = 0;
  }


}

function spawnSharks() {
  if (frameCount % 130 === 0) {
    var shark = createSprite(width, random(camera.y));
    shark.addImage("shark", sharkImage);
    shark.velocityX = -20;
    shark.lifetime = width / 20;
    sharkGroup.add(shark);
  }
}

function spawnJellyFish() {
  if (frameCount % 200 === 0) {
    var jelly = createSprite(width, random(camera.y));
    jelly.addImage("jelly", jellyImage);
    jelly.scale = 0.1;
    jelly.velocityX = -20;
    jelly.lifetime = width / 20;
    jellyGroup.add(jelly);
  }
}

function spawnCoral() {
  if (frameCount % 100 === 0) {
    var coral = createSprite(width, random(camera.y));
    coral.addImage("coral", coralImage);
    coral.scale = 2;
    coral.velocityX = -10;
    coral.lifetime = width / 10;
    coralGroup.add(coral);

    coral.depth = 1;
    nemo.depth = 2;

  }
}

function spawnOctopus() {
  if (frameCount % 50 === 0) {
    var octopus = createSprite(width, random(camera.y));
    octopus.addImage("octopus", octopusImage);
    octopus.velocityX = -10;
    octopus.lifetime = width / 10;
    octopusGroup.add(octopus);

    octopus.depth = 3;
    nemo.depth = 2;
  }
}