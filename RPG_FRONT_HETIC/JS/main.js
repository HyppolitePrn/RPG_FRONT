const canvas = document.querySelector("#canvas1");
let command = document.querySelector(".command");
let manaCost = 30;
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 400;

const keys = [];

const player = {
  x: 410,
  y: 250,
  width: 32,
  height: 32,
  frameX: 0,
  frameY: 1,
  speed: 8,
  moving: false,
  vie: 145,
  mana: 93,
  xp: 0,
  manaRegen: 0.3,
  lvl: 1
};

const fireArc = {
  x: player.x,
  y: player.y,
  width: 52,
  height: 100,
  degats: 5,
};

const playerSprite = new Image();
playerSprite.src = "assets/hero.png";

const background = new Image();
background.src = "assets/Map001.png";

// VIE, MANA ET XP

function xp(){
  if (player.xp >= 145){
    player.xp -= 145;
    player.lvl ++
    player.manaRegen += 0.1
    manaCost -= 5
    if (player.lvl == 3){
      player.xp = 0
    }
  }
  ctx.lineWidth = 4;
  ctx.strokeRect(635, 10, 145, 10);
  ctx.fillStyle = "blue";
  ctx.fillRect(635, 10, player.xp , 10);
  }



function vie() {
  ctx.lineWidth = 2;
  ctx.strokeRect(20, 10, 150, 15);
  ctx.fillStyle = "rgb(238,10,10)";
  ctx.fillRect(22.5, 12.5, player.vie, 10);
  //coup = Math.floor(Math.random() * 100) + 1;
  if (player.vie > 0) {
    if (player.vie > 145){player.vie = 145}
    ctx.strokeRect(20, 10, 150, 15);
    ctx.fillStyle = "rgb(238,10,10)";
    ctx.fillRect(22.5, 12.5, player.vie, 10);
 
  }
  if (player.vie <= 0) {
    death();
  }
}
function mana() {
  //ctx.lineWidth = 2;
  ctx.strokeRect(20, 30, 100, 15);
  ctx.fillStyle = "rgb(135,206,235)";
  ctx.fillRect(22.5, 32.5, player.mana, 10);
  
  
  if (player.mana > 0) {
    ctx.strokeRect(20, 30, 100, 15);
    ctx.fillStyle = "rgb(135,206,235)";
    ctx.fillRect(22.5, 32.5, player.mana, 10);
  }
}
function recupMana(){
  if (player.mana > 93){
    player.mana = 93;
    }
  else if(player.mana < 93){
    setTimeout(()=>{
    player.mana = player.mana + player.manaRegen;
    },1000)
    
  }
}

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
  ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

let position = 0;

setInterval(function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, position, 0, canvas.width, canvas.height);
  drawSprite(
    playerSprite,
    player.width * player.frameX,
    player.height * player.frameY,
    player.width,
    player.height,
    player.x,
    player.y,
    player.width,
    player.height
  );
  SpawnMonsters();
  vie();
  mana();
  recupMana();
  xp();
  movePlayer();
  handlePlayerFrame();
  if (fire_ball_direction == "top") {
    fireballsTOP();
  }
  if (fire_ball_direction == "bot") {
    fireballsBOT();
  }
  if (fire_ball_direction == "left") {
    fireballsLEFT();
  }
  if (fire_ball_direction == "right") {
    fireballsRIGHT();
  }
}, 60);

window.addEventListener("keydown", function (e) {
  keys[e.keyCode] = true;
  player.moving = true;
});

window.addEventListener("keyup", function (e) {
  delete keys[e.keyCode];
  player.moving = false;
});

// FONCTION QU??TES

let quetes = document.querySelector(".quetes");
let info = document.querySelector(".info");

quetes = [];

// FONCTION DE DEPLACEMENT DU JOUEUR
function movePlayer() {
  MoveTop = true;
  MoveBottom = true;
  MoveLeft = true;
  MoveRight = true;
  fire_position = false;

  CheckCollisions();

  if (keys[90] && player.y > 0 && MoveTop) {
    player.y -= player.speed;
    player.frameY = 0;
    if (
      keys[90] &&
      keys[66] &&
      player.mana >= manaCost &&
      fire_ball_direction != "top" &&
      fire_ball_direction != "bot" &&
      fire_ball_direction != "left" &&
      fire_ball_direction != "right"
    ) {
      //Si le player va en HAUT et appuie sur barre espace => boule de feu
      fire_ball_direction = "top";
      fireballsfalse();
      xball = 5;
      yball = -20;
      player_ball_x = player.x;
      player_ball_y = player.y;
      player.mana = player.mana - manaCost;
    }
  } else if (
    player.frameY == 0 &&
    keys[66] &&
    player.mana >= manaCost &&
    fire_ball_direction != "top" &&
    fire_ball_direction != "bot" &&
    fire_ball_direction != "left" &&
    fire_ball_direction != "right"
  ) {
    //player ne bouge pas vers le HAUT et appuie sur barre espace => boule de feu
    fire_ball_direction = "top";
    fireballsfalse();
    xball = 5;
    yball = -20;
    player_ball_x = player.x;
    player_ball_y = player.y;
    player.mana = player.mana - manaCost;
  }
  if (keys[83] && player.y < canvas.height - player.height && MoveBottom) {
    player.y += player.speed;
    player.frameY = 1;
    if (
      player.frameY == 1 &&
      keys[66] &&
      player.mana >= manaCost &&
      fire_ball_direction != "top" &&
      fire_ball_direction != "bot" &&
      fire_ball_direction != "left" &&
      fire_ball_direction != "right"
    ) {
      //Si le player va en BAS et appuie sur barre espace => boule de feu
      fire_ball_direction = "bot";
      fireballsfalse();
      xball = 5;
      yball = 20;
      player_ball_x = player.x;
      player_ball_y = player.y;
      player.mana = player.mana - manaCost;
    }
  } else if (
    player.frameY == 0 &&
    keys[66] &&
    player.mana >= manaCost &&
    fire_ball_direction != "top" &&
    fire_ball_direction != "bot" &&
    fire_ball_direction != "left" &&
    fire_ball_direction != "right"
  ) {
    //player ne bouge pas vers le BAS et appuie sur barre espace => boule de feu
    fire_ball_direction = "bot";
    fireballsfalse();
    xball = 5;
    yball = 20;
    player_ball_x = player.x;
    player_ball_y = player.y;
    player.mana = player.mana - manaCost;
  }
  if (keys[81] && player.x > 0 && MoveLeft) {
    player.x -= player.speed;
    player.frameY = 3;
    if (
      player.frameY == 3 &&
      keys[66] &&
      player.mana >= manaCost &&
      fire_ball_direction != "top" &&
      fire_ball_direction != "bot" &&
      fire_ball_direction != "left" &&
      fire_ball_direction != "right"
    ) {
      //Si le player va ?? GAUCHE et appuie sur barre espace => boule de feu
      fire_ball_direction = "left";
      fireballsfalse();
      xball = -15;
      yball = 8;
      player_ball_x = player.x;
      player_ball_y = player.y;
      player.mana = player.mana - manaCost;
    }
  } else if (
    player.frameY == 3 &&
    keys[66] &&
    player.mana >= manaCost &&
    fire_ball_direction != "top" &&
    fire_ball_direction != "bot" &&
    fire_ball_direction != "left" &&
    fire_ball_direction != "right"
  ) {
    //player ne bouge pas vers la GAUCHE et appuie sur barre espace => boule de feu
    fire_ball_direction = "left";
    fireballsfalse();
    xball = -15;
    yball = 8;
    player_ball_x = player.x;
    player_ball_y = player.y;
    player.mana = player.mana - manaCost;
  }
  if (keys[68] && player.x < canvas.width - player.width && MoveRight) {
    player.x += player.speed;
    player.frameY = 2;
    if (
      player.frameY == 2 &&
      keys[66] &&
      player.mana >= manaCost &&
      fire_ball_direction != "top" &&
      fire_ball_direction != "bot" &&
      fire_ball_direction != "left" &&
      fire_ball_direction != "right"
    ) {
      //Si le player va ?? DROITE et appuie sur barre espace => boule de feu
      fire_ball_direction = "right";
      fireballsfalse();
      xball = 16;
      yball = 8;
      player_ball_x = player.x;
      player_ball_y = player.y;
      player.mana = player.mana - manCost;
    }
    if (player.mana <= 0) {
      console.log("vous n'avez plus de mana");
    }
  } else if (
    player.frameY == 2 &&
    keys[66] &&
    player.mana >= manaCost &&
    fire_ball_direction != "top" &&
    fire_ball_direction != "bot" &&
    fire_ball_direction != "left" &&
    fire_ball_direction != "right"
  ) {
    //player ne bouge pas vers la DROITE et appuie sur barre espace => boule de feu
    fire_ball_direction = "right";
    fireballsfalse();
    xball = 16;
    yball = 8;
    player_ball_x = player.x;
    player_ball_y = player.y;
    player.mana = player.mana - manaCost;
  }
  if (player.x >= 768 || player.x <= 0 || player.y >= 368 || player.y <= 0) {
    ChangeMap(index_Y, index_X); // fonction de changement de map
  }
  interactionMap1();
  interactionMap2();
  interactionMap14();
  pressButton();
}

// FONCTION ANIMATION FRAME

function handlePlayerFrame() {
  if (player.frameX < 3 && player.moving) player.frameX++;
  else player.frameX = 0;
}

function death() {
  window.location.href = "./index.html";
}
