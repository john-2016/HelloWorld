chrome.runtime.onInstalled.addListener(() => {
  console.log('Network Monitor extension installed');
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received in background.js:', message);
  if (message.action === 'saveResponseBody') {
    const responseBody = message.data;
    console.log('Received response body in background:', responseBody);

    // 在这里处理接收到的数据，例如发送到服务器或保存到本地存储
    sendResponse({ status: 'success' });
  }
});




// 检查是否有调试器附加
// chrome.debugger.getTargets((targets) => {
//   const target = targets.find(target => target.id === tabId);
//   if (!target) {
//       console.error("Tab not found with id:", tabId);
//       return;
//   }

//   // if (!target.attached) {
//   //     // 没有调试器附加，尝试附加调试器
//   //     chrome.debugger.attach({ tabId: tabId }, "1.3", () => {
//   //         if (chrome.runtime.lastError) {
//   //             console.error("Attach Error: " + chrome.runtime.lastError.message);
//   //         } else {
//   //             // 附加成功，激活调试器
//   //             chrome.debugger.sendCommand({ tabId: tabId }, "Runtime.enable", {}, (result) => {
//   //                 if (chrome.runtime.lastError) {
//   //                     console.error("Activate Error: " + chrome.runtime.lastError.message);
//   //                 } else {
//   //                     console.log("DevTools activated");
//   //                 }
//   //             });
//   //         }
//   //     });
//   // } else {
//   //     console.log("Debugger already attached. Attempting to activate DevTools.");

//   //     // 调试器已经附加，尝试激活调试器
//   //     chrome.debugger.sendCommand({ tabId: tabId }, "Runtime.enable", {}, (result) => {
//   //         if (chrome.runtime.lastError) {
//   //             console.error("Activate Error: " + chrome.runtime.lastError.message);
//   //         } else {
//   //             console.log("DevTools activated");
//   //         }
//   //     });
//   // }
// });



// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && /^https?:\/\//.test(tab.url)) {
//       console.log(`Tab updated: ${tab.url}, Status: ${changeInfo.status}`);
//       console.log(`Attaching debugger to tab: ${tab.url}`);

//       chrome.debugger.detach({ tabId: tabId }, () => {
//         if (chrome.runtime.lastError) {
//             console.error("Detach Error: " + chrome.runtime.lastError.message);
//         } else {
//             console.log("Previous debugger detached");
//             chrome.debugger.attach({ tabId: tabId }, "1.3", () => {
//               if (chrome.runtime.lastError) {
//                   console.error("Attach Error: " + chrome.runtime.lastError.message);
//                   return;
//               }
  
//               chrome.debugger.sendCommand({ tabId: tabId }, "Inspector.enable", {}, () => {
//                   if (chrome.runtime.lastError) {
//                       console.error("Enable Error: " + chrome.runtime.lastError.message);
//                       return;
//                   }
  
//                   chrome.debugger.sendCommand({ tabId: tabId }, "Page.enable", {}, () => {
//                       if (chrome.runtime.lastError) {
//                           console.error("Page Enable Error: " + chrome.runtime.lastError.message);
//                           return;
//                       }
  
//                       // chrome.debugger.sendCommand({ tabId: tabId }, "Inspector.activate", {}, (result) => {
//                       //     if (chrome.runtime.lastError) {
//                       //         console.error("Activate Error: " + chrome.runtime.lastError.message);
//                       //     } else {
//                       //         console.log("DevTools activated");
//                       //     }
//                       // });
//                       chrome.debugger.sendCommand({ tabId: tabId }, "Runtime.enable", {}, (result) => {
//                         if (chrome.runtime.lastError) {
//                             console.error("Activate Error: " + chrome.runtime.lastError.message);
//                         } else {
//                             console.log("DevTools activated");
//                         }
//                     });
                    
//                   });
//               });
//           });
//         }
//       });

      
//   }
// });