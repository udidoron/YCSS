sendObjectToInspectedPage({action: 'script', content: 'content_script.js'});

document.querySelector('#cssLint').addEventListener('click', cssLint);
function cssLint() {
  chrome.devtools.inspectedWindow.eval('cssLint($0)',
	{ useContentScriptContext: true },
	function(result, ex) {
		document.querySelector('#content').innerText = result || 'All good!'; 
	});
}

document.querySelector('#editElement').addEventListener('click', editElement);
function editElement() {
	chrome.devtools.inspectedWindow.eval('editElement($0)', { useContentScriptContext: true });
}
