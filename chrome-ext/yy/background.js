// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   console.log(tabId, changeInfo, tab);
//   if (changeInfo.status === 'complete' && /^https/.test(tab.url)) {
    
//       chrome.scripting.executeScript({
//           target: { tabId: tabId },
//           func: openDevTools
//       });
//       console.log("Opening dev tools1");
//   }
// });

// function openDevTools() {
//   console.log("Opening dev tools2");
//   window.dispatchEvent(new KeyboardEvent("keydown", { key: "F12", keyCode: 123 }));
// }
console.log("Background script loaded");

// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log(`Tab updated: ${tab.url}, Status: ${changeInfo.status}`);
//     if (changeInfo.status === 'complete' && /^https?:\/\//.test(tab.url)) {
//         console.log(`Executing script on tab: ${tab.url}`);
//         chrome.scripting.executeScript({
//             target: { tabId: tabId },
//             func: () => {
//                 console.log("Opening dev tools.......");
//                 window.dispatchEvent(new KeyboardEvent("keydown", { key: "F12", keyCode: 123 }));
//             }
//         }).then(() => {
//             console.log("Script executed successfully");
//         }).catch((error) => {
//             console.error("Script execution failed", error);
//         });
//     }
// });




// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//     console.log(`Tab updated: ${tab.url}, Status: ${changeInfo.status}`);
//     if (changeInfo.status === 'complete' && /^https?:\/\//.test(tab.url)) {
//         console.log(`Attaching debugger to tab: ${tab.url}`);
//         chrome.debugger.attach({ tabId: tabId }, "1.3", () => {
//             if (chrome.runtime.lastError) {
//                 console.error(chrome.runtime.lastError.message);
//                 return;
//             }
//             chrome.debugger.sendCommand({ tabId: tabId }, "Inspector.enable", {}, () => {
//                 chrome.debugger.sendCommand({ tabId: tabId }, "Inspector.open", { "url": "chrome://devtools/inspector.html" }, () => {
//                     console.log("DevTools opened");
//                 });
//             });
//         });
//     }
// });



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && /^https?:\/\//.test(tab.url)) {
        console.log(`Tab updated: ${tab.url}, Status: ${changeInfo.status}`);
        console.log(`Attaching debugger to tab: ${tab.url}`);

        console.log("Previous debugger detached");
              chrome.debugger.attach({ tabId: tabId }, "1.3", () => {
                if (chrome.runtime.lastError) {
                    console.error("Attach Error: " + chrome.runtime.lastError.message);
                    return;
                }
    
                chrome.debugger.sendCommand({ tabId: tabId }, "Inspector.enable", {}, () => {
                    if (chrome.runtime.lastError) {
                        console.error("Enable Error: " + chrome.runtime.lastError.message);
                        return;
                    }
    
                    chrome.debugger.sendCommand({ tabId: tabId }, "Page.enable", {}, () => {
                        if (chrome.runtime.lastError) {
                            console.error("Page Enable Error: " + chrome.runtime.lastError.message);
                            return;
                        }
    
                        // chrome.debugger.sendCommand({ tabId: tabId }, "Inspector.activate", {}, (result) => {
                        //     if (chrome.runtime.lastError) {
                        //         console.error("Activate Error: " + chrome.runtime.lastError.message);
                        //     } else {
                        //         console.log("DevTools activated");
                        //     }
                        // });
                        chrome.debugger.sendCommand({ tabId: tabId }, "Runtime.enable", {}, (result) => {
                          if (chrome.runtime.lastError) {
                              console.error("Activate Error: " + chrome.runtime.lastError.message);
                          } else {
                              console.log("DevTools activated");
                          }
                      });
                      
                    });
                });
            });

        
    }
});




