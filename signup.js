
document.addEventListener("DOMContentLoaded", function() {
  playAudio();
});

function playAudio() {
  var mp3 = new Audio('public/sounds/crash.mp3');
  mp3.play();
};
