let player;
let video;
let closeButton = document.getElementById("player-close-button");
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: "Q2z7rnIWSQ0",
    playerVars: {
      playersinline: 1,
      autoplay: 0,
      controls: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady() {
  console.log("ready");
  video = document.getElementById("player");
  console.log(video);
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
    video.classList.add("video-fullscreen");
    closeButton.style.display = "block";
    closeButton.classList.add("player-close-button-style");
  }
  console.log(done);
}
closeButton.addEventListener("click", function () {
  video.classList.remove("video-fullscreen");
  closeButton.style.display = "none";
});
