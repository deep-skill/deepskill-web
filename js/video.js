const video = document.getElementById("video");

video.addEventListener("play", function () {
  video.id.add("video-fullscreen");
});

video.addEventListener("pause", function () {
  video.classList.remove("video-fullscreen");
});
