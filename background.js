chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      return {
        redirectUrl: 'https://www.wsj.com'
      };
    },
    {
      urls: ['*://*.reddit.com/*'],
      types: ['main_frame']
    },
    ['blocking']
  );