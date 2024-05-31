chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startScraping') {
    chrome.storage.local.get('profileLinks', (data) => {
      const links = data.profileLinks || [];
      links.forEach((link, index) => {
        setTimeout(() => {
          chrome.tabs.create({ url: link, active: false });
        }, index * 1000); // Open a new tab every 1 seconds
      });
    });
  }
});
