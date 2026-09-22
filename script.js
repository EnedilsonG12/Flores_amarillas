const YT_URL = "https://www.youtube.com/embed/S7gMzYqXIZc?enablejsapi=1&playsinline=1&rel=0";
let playerFrame;
let playing = false;

function createPlayer() {
  if (playerFrame) return playerFrame;
  playerFrame = document.createElement("iframe");
  playerFrame.id = "youtubeMusicPlayer";
  playerFrame.src = YT_URL;
  playerFrame.allow = "autoplay; encrypted-media";
  playerFrame.style.position = "fixed";
  playerFrame.style.width = "1px";
  playerFrame.style.height = "1px";
  playerFrame.style.opacity = "0";
  playerFrame.style.pointerEvents = "none";
  playerFrame.style.border = "0";
  document.body.appendChild(playerFrame);
  return playerFrame;
}

function commandPlayer(command) {
  if (!playerFrame) createPlayer();
  playerFrame.contentWindow.postMessage(JSON.stringify({event:"command",func:command,args:[]}), "https://www.youtube.com");
}

window.addEventListener("load", () => {
  const button = document.getElementById("musicButton");
  if (!button) return;
  button.addEventListener("click", () => {
    createPlayer();
    if (!playing) {
      commandPlayer("playVideo");
      playing = true;
      button.classList.add("playing");
    } else {
      commandPlayer("pauseVideo");
      playing = false;
      button.classList.remove("playing");
    }
  });
});
