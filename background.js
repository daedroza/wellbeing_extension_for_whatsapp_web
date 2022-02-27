chrome.runtime.onInstalled.addListener(function(details) {
  // set storage variables
  chrome.storage.sync.get([
      'on',
      'profilePic',
      'statusMenu'
    ], function(data) {
      data.on == null && chrome.storage.sync.set({on: true});
      data.profilePic == null && chrome.storage.sync.set({profilePic: false});
  });
});

chrome.commands.onCommand.addListener(function(command) {
  if(command == 'toggle'){
    chrome.storage.sync.get(['on'], function(data) {
      chrome.storage.sync.set({on: !data.on});

      chrome.tabs.query({url: "https://web.whatsapp.com/"}, function(tabs) {
        if (tabs.length !== 0)
          tabs.forEach(function(tab){chrome.tabs.executeScript(tab.id, {file: '/load.js'})});
      });
    });
  }
});

//set icon depending on extension status
function toggleIcon(status){
  chrome.browserAction.setIcon({path:'images/status' + (status == true ? 'On' : 'Off') + '.png'});
}

chrome.storage.onChanged.addListener(function(changes, area) {
    if (area == "sync" && "on" in changes) {
      toggleIcon(changes.on.newValue);
    }
});

chrome.storage.sync.get(['on'], function(data) {
  toggleIcon(data.on);
});
