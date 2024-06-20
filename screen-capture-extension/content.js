console.log('Content script injected');

let overlay, startButton, videoElement;
let mediaStream;

function createOverlay() {
  console.log('Creating overlay');
  overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  overlay.style.zIndex = '10000';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.flexDirection = 'column';
  document.body.appendChild(overlay);

  startButton = document.createElement('button');
  startButton.textContent = 'Start';
  startButton.style.padding = '10px 20px';
  startButton.style.fontSize = '16px';
  overlay.appendChild(startButton);

  videoElement = document.createElement('video');
  videoElement.style.display = 'none';
  videoElement.style.maxWidth = '80%';
  videoElement.style.maxHeight = '80%';
  overlay.appendChild(videoElement);

  startButton.addEventListener('click', startCapture);
}

function startCapture() {
  console.log('Start button clicked');
  chrome.runtime.sendMessage({type: "startCapture"}, (response) => {
    console.log('Response received from background script', response);
    const streamId = response.streamId;
    navigator.mediaDevices.getUserMedia({
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: streamId
        }
      }
    }).then((stream) => {
      console.log('User media obtained');
      mediaStream = stream;
      videoElement.srcObject = stream;
      videoElement.play();
      videoElement.style.display = 'block';
      startButton.textContent = 'Stop';
      startButton.removeEventListener('click', startCapture);
      startButton.addEventListener('click', stopCapture);
    }).catch((err) => {
      console.error('Error getting user media:', err);
    });
  });
}

function stopCapture() {
  console.log('Stop button clicked');
  mediaStream.getTracks().forEach(track => track.stop());
  videoElement.pause();
  videoElement.style.display = 'none';
  startButton.textContent = 'Start';
  startButton.removeEventListener('click', stopCapture);
  startButton.addEventListener('click', startCapture);
}

createOverlay();
