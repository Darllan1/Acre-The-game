

var trex, trex_running;
var ground, ground_image, invisible_gruond;
var cloud, cloud_image;
var obstacle;
var obstacle1_image;
var obstacle2_image;
var obstacle3_image;
var obstacle4_image;
var obstacle5_image;
var obstacle6_image;
var score = 000;
var obstacles
var gameState = "play";
var clouds;
var game_over, game_over_image;
var restart, restart_image;
var trex_vasco;
var die_sound,jump_sound,checkpoint_sound;



function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png")
  obstacle1_image = loadImage("obstacle1.png");
  obstacle2_image = loadImage("obstacle2.png");
  obstacle3_image = loadImage("obstacle3.png");
  obstacle4_image = loadImage("obstacle4.png");
  obstacle5_image = loadImage("obstacle5.png");
  obstacle6_image = loadImage("obstacle6.png");
  game_over_image = loadImage("gameOver.png");
  restart_image = loadImage("restart.png");
  trex_vasco = loadAnimation("trex_collided.png", "trex_collided2.png", "trex_collided3.png");
  die_sound = loadSound("die.mp3");
  jump_sound = loadSound("jump.mp3");
  checkpoint_sound = loadSound("checkPoint.mp3");

}


function setup() {
  createCanvas(windowWidth,windowHeight);


  ground = createSprite(300, height-10, 600, 20);
  ground.addImage("chao", ground_image);
  ground.velocityX = -3;

  trex = createSprite(50, height-40, 30, 50);
  trex.addAnimation("correndo", trex_running);
  trex.addAnimation("atacante_official", trex_vasco);
  trex.scale = 0.5;
  // trex.debug = true;
  trex.setCollider("circle", 8, 0)

  invisible_gruond = createSprite(300, height-2, 600, 8);
  invisible_gruond.visible = false;

  obstacles = new Group();
  clouds = new Group();

  restart = createSprite(width/2,height/2+30);
  restart.addImage("reviver", restart_image);
  restart.scale = 0.4;
  game_over = createSprite(width/2 , height/2, 20, 20);
  game_over.addImage("falha", game_over_image);
  game_over.scale = 0.4;


}

function draw() {
  background("white")
  text("pontuação:" + score, 500, 20);
  if (gameState === "play") {
    score = score + Math.round(getFrameRate() / 30);
    if(score>0 && score%500===0){
      checkpoint_sound.play();
      checkpoint_sound.setVolume(0.3);
    }
    console.log(getFrameRate())

   ground.velocityX = -(3 + 3*score/500);
   

    if (touches.length>0 || keyDown("space") && trex.y > height-32) {
      trex.velocityY = -10.7;
      jump_sound.play();
      touches={};
    }

    if (ground.x < 0) {
      ground.x = ground.width / 2
    }
    spawnclouds();
    spawnObstacles();
 

    restart.visible = false;
    game_over.visible = false;
    if (trex.isTouching(obstacles)) {
      gameState = "end";
      die_sound.play();
    }
  } else if (gameState === "end") {
    ground.velocityX = 0;
    obstacles.setVelocityXEach(0);
    clouds.setVelocityXEach(0);
    restart.visible = true;
    game_over.visible = true;
    obstacles.setLifetimeEach(-1);
    clouds.setLifetimeEach(-1);

    trex.changeAnimation("atacante_official");
    if(mousePressedOver(restart)){
      reset()
    }
  }


  trex.velocityY += 0.5;
  trex.collide(invisible_gruond);
  


  drawSprites();



}

function spawnclouds() {
  if (frameCount % 60 === 0) {
    cloud = createSprite(600, 100, 40, 10);
    cloud.velocityX = -3;
    cloud.addImage(cloud_image);
    cloud.scale = 0.9
    cloud.y = Math.round(random(40, 120));
    cloud.depth = trex.depth;
    trex.depth += 1;
    cloud.lifetime = 230;
    clouds.add(cloud);
  }
}

function spawnObstacles() {
  if (frameCount % 80 === 0) {
    obstacle = createSprite(width, height-25, 10, 40);
    obstacle.velocityX = -5
    var aleatorio = Math.round(random(1, 6))
    obstacle.lifetime = 400;
    obstacle.scale = 0.8;
    obstacle.velocityX = -(5 + 5*score/500);
    switch (aleatorio) {
      case 1: obstacle.addImage(obstacle1_image)
        break;
      case 2: obstacle.addImage(obstacle2_image)
        break;
      case 3: obstacle.addImage(obstacle3_image)
        break;
      case 4: obstacle.addImage(obstacle4_image)
        break;
      case 5: obstacle.addImage(obstacle5_image)
        break;
      case 6: obstacle.addImage(obstacle6_image)
        break;
      default:
        break;
    }
    obstacles.add(obstacle);
  }
}

function reset(){
 gameState = "play"; 
 obstacles.destroyEach();
 clouds.destroyEach();
 score=0;
 trex.changeAnimation("correndo");
}






















