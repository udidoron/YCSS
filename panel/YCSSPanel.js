sendObjectToInspectedPage({action: 'script', content: 'content_script.js'});

document.querySelector('#doit').addEventListener('click', doIt);
function doIt() {
  chrome.devtools.inspectedWindow.eval('cssLint($0)',
	{ useContentScriptContext: true });
}
