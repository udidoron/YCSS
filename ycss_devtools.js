chrome.devtools.panels.create(
    'YCSS',
	null, // No icon path
	'panel/YCSSPanel.html',
	function(){}
);

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
   // Handle responses from the background page, if any
});
