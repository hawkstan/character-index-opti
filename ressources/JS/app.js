var overlay = document.getElementById("overlay");

document.getElementById("openview").addEventListener("click", function () {
  overlay.style.display = "block";
});

document.getElementById("closeview").addEventListener("click", function () {
  overlay.style.display = "none";
});

document.getElementById("btnCreation").addEventListener("click", function () {
  document.getElementById("overlayCreation").style.display = "block";
});

document.getElementById("editHeroes").addEventListener("click", function () {
  document.getElementById("overlayEdit").style.display = "block";
});
