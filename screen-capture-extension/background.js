chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "startCapture") {
    console.log('Received startCapture message');
    chrome.desktopCapture.chooseDesktopMedia(["screen", "window"], sender.tab, (streamId) => {
      console.log('Stream ID:', streamId);
      sendResponse({ streamId: streamId });
    });
    return true; // Keep the messaging channel open for sendResponse
  }
});
