let player;
let video;
let closeButton = document.getElementById("player-close-button");
let isVideoFullScreen = false;
const infoContainer = document.getElementsByClassName("info-container")[0];
//for blur
// const heroSliderContentLeft = document.getElementById(
//   "hero-slider-content-left"
// );
// const header = document.getElementsByTagName("header")[0];
// const ourWork = document.getElementById("our-work");
// const howWeWillDo = document.getElementById("how-we-will-do");
// const whyChoseUs = document.getElementById("why-chose-us");
// const ourTeam = document.getElementById("our-team");
// const areYouReady = document.getElementById("are-you-ready");
// const footer = document.getElementsByTagName("footer")[0];
// const social = document.getElementById("social");
// const textInfo = document.getElementById("text-info");
// const descountInfo = document.getElementById("descount-info");
// const callToAction = document.getElementById("call-to-action");
// const scrollDown = document.getElementById("scrolldown");
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "Ni6SlemWS1Y",
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
  resizeVideo();
}
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
    if (window.innerWidth <= 580) return;
    // blurToggle();
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
  // blurToggle(0);
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

function blurToggle(blur = 7) {
  const elements = [
    heroSliderContentLeft,
    header,
    ourWork,
    howWeWillDo,
    whyChoseUs,
    ourTeam,
    areYouReady,
    footer,
    social,
    textInfo,
    descountInfo,
    callToAction,
    scrollDown,
  ];

  elements.forEach((e) => {
    e.style.transition = "filter 0.8s";
    e.style.filter = `blur(${blur}px)`;
  });
  infoContainer.style.transition = "border 0.5s";
  infoContainer.style.border = blur !== 0 ? "none" : "3px solid var(--red)";
}
