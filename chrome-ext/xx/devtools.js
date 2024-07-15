

chrome.devtools.panels.create("Network Monitor", "", "devtools.html", function(panel) {
  console.log("Network Monitor panel created");
  $('h1').html('Network Monitor.');
});

chrome.devtools.network.onRequestFinished.addListener(request => {
  if (request._resourceType === "xhr" || request._resourceType === "fetch") {
    request.getContent((content, encoding) => {
      if (content) {
        console.log("Response body:", content);
        const responseContainer = document.getElementById('responseContainer');
        const pre = document.createElement('pre');
        pre.textContent = content;
        responseContainer.appendChild(pre);

        // 将数据发送到 background.js
        chrome.runtime.sendMessage({ action: 'saveResponseBody', data: content }, (response) => {
          console.log('Response from background:', response);
        });
      }
    });
  }
});
