let player;
let video;
let closeButton = document.getElementById("player-close-button");
let isVideoFullScreen = false;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "Q2z7rnIWSQ0",
    // width: 560,
    // height: 315,
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
    makeFullScreen();
  } else {
    done = false;
  }
  console.log(done);
}
closeButton.addEventListener("click", function () {
  video.classList.remove("video-fullscreen");
  closeButton.style.display = "none";
  isVideoFullScreen = false;
  video.style.width = "320px";
  video.style.height = "180px";
  // video.style.width = "320px";
  // video.style.height = "180px";
});

function makeFullScreen() {
  var playerOriginalWidth = 16;
  var playerOriginalHeight = 9;
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  var playerHeight = windowHeight * 0.7;
  var playerWidth = windowWidth * 0.7;
  if (
    (playerHeight * playerOriginalWidth) / playerOriginalHeight >
    windowWidth * 0.7
  ) {
    playerHeight =
      (windowWidth * 0.7 * playerOriginalHeight) / playerOriginalWidth;
  } else {
    playerWidth =
      (windowHeight * 0.7 * playerOriginalWidth) / playerOriginalHeight;
  }

  video.style.width = playerWidth + "px";
  video.style.height = playerHeight + "px";
}
window.onresize = function (event) {
  if (isVideoFullScreen) makeFullScreen();
  else resizeVideo();
};

function resizeVideo() {
  var playerOriginalWidth = 16;
  var playerOriginalHeight = 9;
  var windowHeight = window.innerHeight;
  var windowWidth = window.innerWidth;

  var playerHeight = windowHeight * 0.2;
  var playerWidth = windowWidth * 0.2;

  if (
    (playerHeight * playerOriginalWidth) / playerOriginalHeight >
    windowWidth * 0.2
  ) {
    playerHeight =
      (windowWidth * 0.2 * playerOriginalHeight) / playerOriginalWidth;
  } else {
    playerWidth =
      (windowHeight * 0.2 * playerOriginalWidth) / playerOriginalHeight;
  }

  video.style.width = playerWidth + "px";
  video.style.height = playerHeight + "px";
}
