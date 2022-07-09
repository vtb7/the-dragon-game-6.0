var dragon,dragonImg;
var sky,skyImg;
var archer,archerImg;
var arrow,arrowImg;
var boundry1,boundry2
var fireballImg;
var fireballGroup
var arrowGroup
var archerLives=3
var dragonLives=3;
var gameState="play";
var arrowSound
var arrowImpact
var fireballImpact
var winSound
var loseSound
function preload(){
  dragonImg=loadImage("assets/Dragon.png")
  skyImg=loadImage("assets/Sky.jpg")
  arrowImg=loadImage("assets/Arrow.png")
  archerImg=loadImage("assets/Archer.png");
  fireballImg=loadImage("assets/fireball.png");
  arrowSound=loadSound("assets/arrow_sound.mp3")
  arrowImpact=loadSound("assets/arrow_sound_swoosh.mp3")
  fireballImpact=loadSound("assets/Fireball_impact.mp3")
  winSound=loadSound("assets/win_sound.mp3")
  loseSound=loadSound("assets/lose_sound.mp3")


}

function setup() {
  createCanvas(windowWidth,windowHeight)
  sky=createSprite(200,200,windowWidth,windowHeight)
  sky.addImage(skyImg)
  sky.scale=0.9
  sky.velocityX=-2
  dragon=createSprite(1317,239)
  dragon.addImage(dragonImg)
  dragon.velocityY=-3;

  archer=createSprite(150,300)
  archer.addImage("archer",archerImg)
  archer.debug=false;
  archer.setCollider("rectangle",0,0,200,300)

  boundry1=createSprite(1090,44,800,20)
  boundry2=createSprite(1090,689,800,20)
  boundry1.visible=false;
  boundry2.visible=false;

  arrowGroup=new Group()
  fireballGroup=new Group()
}

function draw() {
  //console.log(mouseX,mouseY);
  background(0);
  if(gameState=="play"){
  dragon.bounceOff(boundry1);
  dragon.bounceOff(boundry2);
 
  if (sky.x < 0){
    sky.x = sky.width/3;
  }
  //archer movement
  if(keyIsDown(UP_ARROW)) 
  archer.y=archer.y-5

  if(keyIsDown(DOWN_ARROW)) {
    archer.y=archer.y+5
  }

  if(keyDown("space")){
    arrow=createSprite(archer.x+100,archer.y+15);
    arrow.addImage(arrowImg);
    arrow.velocityX=8;
    arrow.scale=0.2
    arrowGroup.add(arrow)
    arrowSound.play()
  }
  spawnFireballs()
  drawSprites()
  if(fireballGroup.isTouching(archer)) {
    fireballGroup.destroyEach()
    archer.scale-=0.25
    
    archerLives=archerLives-1
    console.log(archerLives)
    fireballImpact.play()
  
  }

  if(arrowGroup.isTouching(dragon)){
    dragon.velocityY+=1;
    dragonLives-=1;
    dragon.scale-=0.25
    arrowGroup.destroyEach();
    arrowImpact.play()

  }
 if(archerLives===0 || dragonLives===0){
 gameState="end";
  }
  }
  if(gameState=="end"){
    archer.destroy()
   gameOver();
    dragon.velocityY=0;
    loseSound.play()
  }

    }
  function spawnFireballs() {
    if(frameCount%80==0) {
      var fireball = createSprite(dragon.x-100,dragon.y-40,40,40)
      fireball.addImage(fireballImg);
      fireball.velocityX=-5
      fireball.scale=0.3
      fireballGroup.add(fireball)
    }

  }
  
  function gameOver() {
    var titleMsg,img,size;
    if(archerLives===0)
    {
      
      titleMsg="Game Over!!!"
      img="assets/Dragon.png"
      size="150x150"
      loseSound.play()
  
    }
    else
    {
      
      titleMsg="You Win!!!";
      img="assets/Archer.png"
      size="250x250"
  winSound.play()
  
      }
    swal(
      {
        title: titleMsg,
        text: "Thanks for playing!!",
        imageUrl:img  ,
        imageSize: size,
        confirmButtonText: "Play Again"
      },
      function(isConfirm) {
        if (isConfirm) {
          location.reload();
        }
      }
    );
  }
  
   
     
   
   
