chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    var redirects, pattern, from, to, redirectUrl;
    redirects = JSON.parse(localStorage.getItem('redirects') || '[]');
    for (var i=0; i<redirects.length; i++) {
      from = redirects[i][0];
      to = redirects[i][1];
      try {
        pattern = new RegExp(from, 'ig');
      } catch(err) {
        continue;
      }
      if (details.url.match(pattern)) {
          return {redirectUrl: 'https://' + to};
      }
    }
    return {};
  },
  {
    urls: [
      "<all_urls>",
    ],
  },
  ["blocking"]
);
