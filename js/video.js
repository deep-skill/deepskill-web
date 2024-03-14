let player;
let video;
let closeButton = document.getElementById("player-close-button");
let isVideoFullScreen = false;

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
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
  video = document.getElementById("player");
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
    video.classList.add("video-fullscreen");
    closeButton.style.display = "block";
    closeButton.classList.add("player-close-button-style");
    isVideoFullScreen = true;
    resizeVideo();
  } else {
    done = false;
  }
  console.log(done);
}
closeButton.addEventListener("click", function () {
  video.classList.remove("video-fullscreen");
  closeButton.style.display = "none";
  isVideoFullScreen = false;
  resizeVideo();
});
window.onresize = function (event) {
  resizeVideo();
};

function resizeVideo() {
  let screenPorcentageOcupped = isVideoFullScreen ? 0.7 : 0.2;
  if (!isVideoFullScreen && window.innerWidth <= 1024)
    screenPorcentageOcupped = 0.45;
  if (!isVideoFullScreen && window.innerWidth <= 768)
    screenPorcentageOcupped = 0.5;
  if (!isVideoFullScreen && window.innerWidth <= 580)
    screenPorcentageOcupped = 0.7;
  var playerOriginalWidth = 16;
  var playerOriginalHeight = 9;
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  var playerHeight = windowHeight * screenPorcentageOcupped;
  var playerWidth = windowWidth * screenPorcentageOcupped;

  if (
    (playerHeight * playerOriginalWidth) / playerOriginalHeight >
    windowWidth * screenPorcentageOcupped
  ) {
    playerHeight =
      (windowWidth * screenPorcentageOcupped * playerOriginalHeight) /
      playerOriginalWidth;
  } else {
    playerWidth =
      (windowHeight * screenPorcentageOcupped * playerOriginalWidth) /
      playerOriginalHeight;
  }
  closeButton.style.bottom = playerWidth * 1.1 + "px";
  closeButton.style.left = playerWidth * 1.25 + "px";
  video.style.width = playerWidth + "px";
  video.style.height = playerHeight + "px";
}
