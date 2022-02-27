// Checkboxes
let button = document.getElementById('switch');
let profilePic = document.getElementById('profilePic');
let statusMenu = document.getElementById('statusMenu');

// Get and set current version
let version = chrome.runtime.getManifest().version;
document.getElementById('version').innerText = version;

// Add or remove stylesheets
function refreshScript(){
  chrome.tabs.query({url: "https://web.whatsapp.com/"}, function(tabs) {
    if (tabs.length !== 0)
      tabs.forEach(function(tab){chrome.tabs.executeScript(tab.id, {file: '/load.js'})});
  });
}

// Set current state in popup
chrome.storage.sync.get([
    'on',
    'profilePic',
    'statusMenu'
  ], function(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      button.checked=data.on;
      profilePic.checked=data.profilePic;
      statusMenu.checked=data.statusMenu;
    });
});

button.addEventListener('change', function() {
  chrome.storage.sync.set({on: this.checked});
  refreshScript();
});
profilePic.addEventListener('change', function() {
  chrome.storage.sync.set({profilePic: this.checked});
  refreshScript();
});
statusMenu.addEventListener('change', function() {
  chrome.storage.sync.set({statusMenu: this.checked});
  refreshScript();
})
