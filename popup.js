document.getElementById('captureButton').addEventListener('click', () => {
  console.log('Capture button clicked');
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) {
      console.error('No active tab found');
      return;
    }
    const tab = tabs[0];
    console.log('Active tab found:', tab);
    const invalidUrls = ['chrome://', 'https://chrome.google.com', 'https://chrome-devtools://'];
    if (invalidUrls.some(url => tab.url.startsWith(url))) {
      console.error('Cannot inject content script into restricted URLs:', tab.url);
      // Show a message to the user
      alert('Cannot capture screen on restricted pages like Chrome settings or extensions page.');
      return;
    }
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content.js']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Script injection failed:', chrome.runtime.lastError);
      } else {
        console.log('Content script injected');
      }
    });
  });
});
