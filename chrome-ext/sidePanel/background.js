console.log('background.js');

// // 在特定网站上启用侧边栏
// const GOOGLE_ORIGIN = 'https://www.google.com.sg';

// // 它会检查网址是否为 www.google.com.sg，并启用侧边栏。否则，系统会将其停用。
// // 监听对标签页所做的任何更新
// chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
//   console.log("tab对象内容：", tab)
//   console.log("tab-url：", tab.url)
//   if (!tab.url) return;
//   const url = new URL(tab.url);
//   console.log("url", url)
//   // 如果时指定的url，则启用侧边栏，否则停用
//   if (url.origin === GOOGLE_ORIGIN) {
//     await chrome.sidePanel.setOptions({
//       tabId,
//       path: 'sidepanel.html',
//       enabled: true
//     });
//   } else {
//     // 禁用侧边栏
//     await chrome.sidePanel.setOptions({
//       tabId,
//       enabled: false
//     });
//   }
// });

// //允许用户通过单击操作工具栏图标打开侧边面板
// chrome.sidePanel
//   .setPanelBehavior({ openPanelOnActionClick: true })
//   .catch((error) => console.error(error));


// // 在右击菜单中显示“打开侧边栏”选项
// chrome.runtime.onInstalled.addListener(() => {
//   chrome.contextMenus.create({
//     id: 'openSidePanel',
//     title: '打开侧边栏',
//     contexts: ['all']
//   });
// });

// chrome.contextMenus.onClicked.addListener((info, tab) => {
//   if (info.menuItemId === 'openSidePanel') {
//     // This will open the panel in all the pages on the current window.
//     chrome.sidePanel.open({ windowId: tab.windowId });
//   }
// });  

  const welcomePage = 'sidepanels/welcome-sp.html';
  const mainPage = 'sidepanels/main-sp.html';
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log('Side Panel installed');
    chrome.sidePanel.setOptions({ path: welcomePage });
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  });
  
  chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    const { path } = await chrome.sidePanel.getOptions({ tabId });
    if (path === welcomePage) {
      chrome.sidePanel.setOptions({ path: mainPage });
    }
  });  