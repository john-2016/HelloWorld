chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) {
    console.error("Tab ID is not defined");
    return;
  }

  // 检查是否已经附加调试器
  chrome.debugger.getTargets((targets) => {
    const isAttached = targets.some(target => target.tabId === tab.id && target.attached);
    if (isAttached) {
      console.log("Debugger already attached to tab:", tab.id);
      return;
    }

    // 附加调试器到当前标签页
    chrome.debugger.attach({ tabId: tab.id }, "1.0", () => {
      if (chrome.runtime.lastError) {
        console.error("Debugger attach error:", chrome.runtime.lastError.message);
        return;
      }

      console.log("Debugger attached to tab:", tab.id);

      // 启用网络域
      chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable", {}, () => {
        if (chrome.runtime.lastError) {
          console.error("Network.enable error:", chrome.runtime.lastError.message);
          detachDebugger(tab.id);
          return;
        }

        console.log("Network domain enabled for tab:", tab.id);

        // 等待网络请求完成
        chrome.debugger.onEvent.addListener(function onEvent(debuggeeId, message, params) {
          if (debuggeeId.tabId === tab.id && message === "Network.responseReceived") {
            console.log("Network.responseReceived event received:", params);
            getResponseBody(tab.id, params.requestId, onEvent);
          }
        });
      });
    });
  });
});

// 获取响应体
function getResponseBody(tabId, requestId, eventListener) {
  chrome.debugger.sendCommand(
    { tabId: tabId },
    "Network.getResponseBody",
    { requestId: requestId },
    (response) => {
      if (chrome.runtime.lastError) {
        console.log("*************")
        console.log(response)
        console.log("*************")
        console.error("getResponseBody error:", chrome.runtime.lastError.message);
        detachDebugger(tabId, eventListener);
        return;
      }

      if (response) {
        console.log("Response body:", response.body);
        // 处理响应体
      } else {
        console.log("No response body received");
      }

      // 分离调试器
      detachDebugger(tabId, eventListener);
    }
  );
}

// 分离调试器
function detachDebugger(tabId, eventListener) {
  chrome.debugger.onEvent.removeListener(eventListener);
  chrome.debugger.detach({ tabId: tabId }, () => {
    if (chrome.runtime.lastError) {
      console.error("Debugger detach error:", chrome.runtime.lastError.message);
    } else {
      console.log("Debugger detached from tab:", tabId);
    }
  });
}


// // 监听扩展图标点击事件
// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.id) {
//     console.error("Tab ID is not defined");
//     return;
//   }

//   // 附加调试器到当前标签页
//   chrome.debugger.attach({ tabId: tab.id }, "1.0", () => {
//     if (chrome.runtime.lastError) {
//       console.error("Debugger attach error:", chrome.runtime.lastError);
//       return;
//     }

//     console.log("Debugger attached to tab:", tab.id);

//     // 启用网络域
//     chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");

//     chrome.debugger.onEvent.addListener((debuggeeId, message, params) => {
//       if (debuggeeId.tabId === tab.id && message === "Network.responseReceived") {
//         chrome.debugger.sendCommand(
//           { tabId: tab.id },
//           "Network.getResponseBody",
//           { requestId: params.requestId },
//           (response) => {
//             if (response) {
//               console.log("Response body:", response.body);
//               // 处理响应体
//             }

//             // 收到响应后分离调试器
//             chrome.debugger.detach({ tabId: tab.id }, () => {
//               if (chrome.runtime.lastError) {
//                 console.error("Debugger detach error:", chrome.runtime.lastError);
//               } else {
//                 console.log("Debugger detached from tab:", tab.id);
//               }
//             });
//           }
//         );
//       }
//     });
//   });
// });







// // 监听扩展图标点击事件
// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.id) {
//     console.error("Tab ID is not defined");
//     return;
//   }

//   // 检查是否已经附加调试器
//   chrome.debugger.getTargets((targets) => {
//     const isAttached = targets.some(target => target.tabId === tab.id && target.attached);
//     if (isAttached) {
//       console.log("Debugger already attached to tab:", tab.id);
//       return;
//     }

//     // 附加调试器到当前标签页
//     chrome.debugger.attach({ tabId: tab.id }, "1.0", () => {
//       if (chrome.runtime.lastError) {
//         console.error("Debugger attach error:", chrome.runtime.lastError);
//         return;
//       }

//       console.log("Debugger attached to tab:", tab.id);

//       // 启用网络域
//       chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");

//       chrome.debugger.onEvent.addListener((debuggeeId, message, params) => {
//         if (debuggeeId.tabId === tab.id && message === "Network.responseReceived") {
//           chrome.debugger.sendCommand(
//             { tabId: tab.id },
//             "Network.getResponseBody",
//             { requestId: params.requestId },
//             (response) => {
//               if (response) {
//                 console.log("Response body:", response.body);
//                 // 处理响应体
//               }

//               // 收到响应后分离调试器
//               chrome.debugger.detach({ tabId: tab.id }, () => {
//                 if (chrome.runtime.lastError) {
//                   console.error("Debugger detach error:", chrome.runtime.lastError);
//                 } else {
//                   console.log("Debugger detached from tab:", tab.id);
//                 }
//               });
//             }
//           );
//         }
//       });
//     });
//   });
// });




// // 监听扩展图标点击事件
// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.id) {
//     console.error("Tab ID is not defined");
//     return;
//   }

//   // 检查是否已经附加调试器
//   chrome.debugger.getTargets((targets) => {
//     const isAttached = targets.some(target => target.tabId === tab.id && target.attached);
//     if (isAttached) {
//       console.log("Debugger already attached to tab:", tab.id);
//       return;
//     }

//     // 附加调试器到当前标签页
//     chrome.debugger.attach({ tabId: tab.id }, "1.0", () => {
//       if (chrome.runtime.lastError) {
//         console.error("Debugger attach error:", chrome.runtime.lastError);
//         return;
//       }

//       console.log("Debugger attached to tab:", tab.id);

//       // 启用网络域
//       chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable");

//       // 监听 Network.responseReceived 事件
//       chrome.debugger.onEvent.addListener((debuggeeId, message, params) => {
//         if (debuggeeId.tabId === tab.id && message === "Network.responseReceived") {
//           console.log("Network.responseReceived event received:", params);

//           chrome.debugger.sendCommand(
//             { tabId: tab.id },
//             "Network.getResponseBody",
//             { requestId: params.requestId },
//             (response) => {
//               if (chrome.runtime.lastError) {
//                 console.error("getResponseBody error:", chrome.runtime.lastError);
//                 return;
//               }

//               if (response) {
//                 console.log("Response body:", response.body);
//                 // 处理响应体
//               } else {
//                 console.log("No response body received");
//               }

//               // 收到响应后分离调试器
//               chrome.debugger.detach({ tabId: tab.id }, () => {
//                 if (chrome.runtime.lastError) {
//                   console.error("Debugger detach error:", chrome.runtime.lastError);
//                 } else {
//                   console.log("Debugger detached from tab:", tab.id);
//                 }
//               });
//             }
//           );
//         }
//       });
//     });
//   });
// });


// chrome.action.onClicked.addListener((tab) => {
//   if (!tab.id) {
//     console.error("Tab ID is not defined");
//     return;
//   }

//   // 检查是否已经附加调试器
//   chrome.debugger.getTargets((targets) => {
//     const isAttached = targets.some(target => target.tabId === tab.id && target.attached);
//     if (isAttached) {
//       console.log("Debugger already attached to tab:", tab.id);
//       getResponseBody(tab.id);
//       return;
//     }

//     // 附加调试器到当前标签页
//     chrome.debugger.attach({ tabId: tab.id }, "1.0", () => {
//       if (chrome.runtime.lastError) {
//         console.error("Debugger attach error:", chrome.runtime.lastError.message);
//         return;
//       }

//       console.log("Debugger attached to tab:", tab.id);

//       // 启用网络域
//       chrome.debugger.sendCommand({ tabId: tab.id }, "Network.enable", {}, () => {
//         if (chrome.runtime.lastError) {
//           console.error("Network.enable error:", chrome.runtime.lastError.message);
//           detachDebugger(tab.id);
//           return;
//         }

//         console.log("Network domain enabled for tab:", tab.id);

//         // 等待网络请求完成
//         chrome.debugger.onEvent.addListener((debuggeeId, message, params) => {
//           if (debuggeeId.tabId === tab.id && message === "Network.responseReceived") {
//             console.log("Network.responseReceived event received:", params);
//             getResponseBody(tab.id);
//           }
//         });
//       });
//     });
//   });
// });

// // 获取响应体
// function getResponseBody(tabId) {
//   chrome.debugger.sendCommand(
//     { tabId: tabId },
//     "Network.getResponseBody",
//     {},
//     (response) => {
//       if (chrome.runtime.lastError) {
//         // TODO: 一直报错
//         console.error("getResponseBody error:", chrome.runtime.lastError.message);
//         detachDebugger(tabId);
//         return;
//       }

//       if (response) {
//         console.log("Response body:", response.body);
//         // 处理响应体
//       } else {
//         console.log("No response body received");
//       }

//       // 分离调试器
//       detachDebugger(tabId);
//     }
//   );
// }

// // 分离调试器
// function detachDebugger(tabId) {
//   chrome.debugger.detach({ tabId: tabId }, () => {
//     if (chrome.runtime.lastError) {
//       console.error("Debugger detach error:", chrome.runtime.lastError.message);
//     } else {
//       console.log("Debugger detached from tab:", tabId);
//     }
//   });
// }
