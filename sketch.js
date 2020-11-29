var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground,ground_image,invisible_ground;
var girl,girl_running,girl_collided,girlImage,ghost,ghostImage
var obstaclesGroup,obstacle1;
var jumpSound,dieSound,checkpointSound;
var score;
var gameOver,restart,gameOverImage,restartImage;

function preload(){
ground_image=loadImage("Background.png");
  girl_running=loadAnimation("Run (1).png","Run (2).png","Run (3).png","Run (4).png","Run (5).png","Run (6).png","Run (7).png","Run (8).png","Run (9).png","Run (10).png","Run (11).png","Run (12).png","Run (14).png","Run (15).png","Run (16).png","Run (17).png","Run (18).png","Run (19).png","Run (20).png");
  ghostImage=loadImage("ghost.png");
  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
  gameOverImage=loadImage("gameOver1.png");
  restartImage=loadImage("restart1.png");
  girl_collided=loadImage("Dead (32) - Copy.png");
  girlImage=loadImage("Idle (1).png");
}
function setup() {
 createCanvas(600,500);
  
ground=createSprite(0,0,0,0);
  ground.shapeColor="white";
ground.addImage("ground_image",ground_image);
ground.scale=1.4;
   ground.velocityX=-1
  
   girl=createSprite(300,420,600,10);
  girl.addAnimation("girl_running",girl_running);
  girl.addImage("girl_collided",girl_collided);
  girl.addImage("girlImage",girlImage);
  girl.scale=0.2;
 // girl.velocityX=2;
  girl.debug=false;
  girl.setCollider("rectangle",0,0,girl.width,girl.height)
  
 ghost=createSprite(50,410,600,10);
  
  ghost.addImage("ghost",ghostImage);
  ghost.scale=1;
  ghost.debug=false;
  
  invisible_ground=createSprite(300,470,600,10);
  invisible_ground.visible=false;
  
   gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  
  restart = createSprite(300,180);
  restart.addImage(restartImage);
  
  obstaclesGroup=new Group();
  
  score=0;
}
function draw() {
 background("black");
  
 // console.log(girl.y);
   //Gravity
girl.velocityY = girl.velocityY + 0.8;
girl.collide(invisible_ground); 
  
   //Gravity
ghost.velocityY = ghost.velocityY + 0.8;
ghost.collide(invisible_ground); 
  if (gameState===PLAY){
    gameOver.visible=false;
  restart.visible=false;
   
   score = score + Math.round(getFrameRate()/60);
 
    spawnObstacles();
    
   if (obstaclesGroup.isTouching(ghost)){
     ghost.velocityY=-12;
   }
 ground.velocityX = -(4 + 3* score/100);
     
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
     if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
 if((keyDown("space")&& girl.y >= 350)) {
   girl.velocityY = -12;
    jumpSound.play();
  }  
  
  if (girl.isTouching(obstaclesGroup)){
    gameState=END;
     dieSound.play();
  }
     
  }
else if ( gameState===END) {
  gameOver.visible=true;
  restart.visible=true;
  ground.velocityX = 0;
     girl.velocityY = 0
    girl.changeImage("girlImage",girlImage);
  
     ghost.x=girl.x;
  if (ghost.isTouching(girl)) {
    girl.changeImage("girl_collided",girl_collided);
    
  }
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
   obstaclesGroup.setVelocityXEach(0);
  
    if(mousePressedOver(restart)) {
      reset();
    }
} 
  
  drawSprites();
  fill("lightpink");
  textSize(20);
   text("Score: "+ score, 400,50);
}
function spawnObstacles() {
   if (frameCount % 60 === 0){
   var obstacle = createSprite(600,450,10,40);
   obstacle.velocityX = -5 ;
   
    //generate random obstacles
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      
      default: break;
    }
   obstacle.scale=0.1;
      obstaclesGroup.add(obstacle);
    obstacle.debug=false;
obstacle.setCollider("circle",0,0,1);
   }
     
}
function reset(){
  gameState=PLAY;
gameOver.visible=false;
restart.visible=false;
girl.changeAnimation("girl_running",girl_running);
  obstaclesGroup.destroyEach();
  score=0;
  ghost.x=50;
}