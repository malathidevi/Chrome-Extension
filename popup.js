document.getElementById('getTitleButton').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    console.log(activeTab)
    
    const title = activeTab.title;
   document.getElementById('demo').textContent = "Current Tab Title is: "
    document.getElementById('title').textContent = title;
  });
});
