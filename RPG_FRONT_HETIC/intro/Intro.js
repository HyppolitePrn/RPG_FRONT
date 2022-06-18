const txtAnim = document.querySelector("#text");
let body = document.querySelector("body");
let monsterGIF = document.querySelector(".monsterGIF");
let introAudio = new Audio("/RPG_FRONT_HETIC/assets/Sounds/introMusic.wav");

new Typewriter(txtAnim, {
  deleteSpeed: 0,
})

  .changeDelay(25)

  .pauseFor(2000)
  .typeString("<h3>Bienvenue étranger de l'île.</h3> ")
  .pauseFor(1000)
  .deleteChars(40)
  .typeString("<h5>Je m'appelle Charles,</h5>")
  .pauseFor(400)
  .typeString(" le puant du Village.")
  .pauseFor(900)
  .deleteChars(42)
  .typeString("Tu as été envoyé pour nous sauver.")
  .pauseFor(400)
  .deleteChars(34)
  .typeString(" Oui toi avec ta tête moche comme un pied.")
  .pauseFor(900)
  .deleteChars(80)
  .typeString("Nous sauver de quoi ?")
  .pauseFor(1400)
  .deleteChars(21)
  .typeString(
    " Oh juste d'une petite malédiction qui a frappé l'entièretée de l'île et fait que des monstres sont à nos portes."
  )
  .pauseFor(3000)
  .deleteChars(150)
  .typeString("Mais maintenant que tu es là tout va bien.")
  .pauseFor(600)
  .typeString(" Je pense.")
  .pauseFor(400)
  .deleteChars(80)
  .typeString(
    "Nous savons que tout ça est à cause de Malabar, le chef créateurs de la malédictions et de ces monstres."
  )
  .pauseFor(1900)
  .deleteChars(104)
  .typeString("Il rode dans le donjon,")
  .pauseFor(400)
  .typeString(" tue le et met fin à cette malédiction.")
  .pauseFor(500)
  .typeString(" Qui nous dérange quand même pas mal.")
  .pauseFor(500)
  .typeString(" Merci à toi.")
  .pauseFor(500)
  .deleteChars(130)
  .typeString(" <h1>Bisous.</h1>")
  .pauseFor(400)
  .start();

function introMusic() {
  introAudio.play();
}

introMusic();

setTimeout(function () {
  monsterGIF.innerHTML =
    '<img class="monsterH" src="/RPG_FRONT_HETIC/assets/monsterHello.gif"></img>';
}, 25500);
setTimeout(function () {
  monsterGIF.innerHTML = "";
}, 27700);

setTimeout(function () {
  window.location.href = "/RPG_FRONT_HETIC/index.html";
}, 61000);
