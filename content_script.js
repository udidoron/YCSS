var screenElement = document.createElement('div');
screenElement.style.position = 'absolute';
screenElement.style.top = 0;
screenElement.style.right = 0;
screenElement.style.bottom = 0;
screenElement.style.left = 0;
screenElement.style.backgroundColor = 'grey';
screenElement.style.opacity = 0.4;
screenElement.style.zIndex = 1000;

var wrapperElement = document.createElement('div');
wrapperElement.style.position = 'relative';
wrapperElement.style.display = 'inline-block';
wrapperElement.style.zIndex = '2000';
wrapperElement.style.borderStyle = 'dotted';
wrapperElement.style.borderWidth = '1px'
wrapperElement.style.cursor = 'move';
wrapperElement.style.resize = 'both';
wrapperElement.style.overflow = 'auto';
wrapperElement.draggable = true;

wrapperElement.addEventListener('dragend', function(evt) {
	evt.preventDefault();
	console.log("X: "+evt.pageX, "Y: "+evt.pageY);
	wrapperElement.style.top = evt.pageY;
	wrapperElement.style.left = evt.pageX;
	console.log("Top: "+wrapperElement.style.top, "Left: "+wrapperElement.style.left);
});

function cssLint(elem) {
	var strategies = [directionsWithPositionStatic, clearfix, resizeWithoutOverflow];
	var style = window.getComputedStyle(elem);

	var result =  strategies.reduce(function(msg, strategy) {
		var result = strategy({
			elem: elem,
			style: style
		});
		return (result) ? msg + result + "\n" : msg;
	}, '');

	return result;
}

function turnGreen(elem) {
	elem.style.backgroundColor = 'green';
}

function editElement(elem) {
	document.body.appendChild(screenElement);
	var elemParent = elem.parentNode;
	elemParent.removeChild(elem);
	wrapperElement.appendChild(elem);
	elemParent.appendChild(wrapperElement);
}

function clearfix(obj) {
	var areAllSonsFloat = obj.elem.childNodes && 
		Array.prototype.reduce.call(obj.elem.childNodes, function(result, elem) {
		var style = window.getComputedStyle(elem);
		return result && ((style && style.float !== 'none')
			|| ((elem instanceof Text) && elem.textContent.trim().length === 0));
	}, true);

	return (areAllSonsFloat) ? 'Your container might be collapsed. Try clearfix.' : '';
}

function directionsWithPositionStatic(obj) {
	var directions = ['top', 'left', 'right', 'bottom'];
	var isDirectionSet = directions.reduce(function(result, direction) {
		return result || (obj.style[direction] !== 'auto')
	}, false);
	if (isDirectionSet && obj.style.position === 'static') {
		return 'Coordinates and/or z-index are given, but position is static';
	}

	return '';
}


function resizeWithoutOverflow(obj) {
	var resize = (obj.style["resize"] !== "none");
	var noOverflow = (obj.style["overflow"] === "visible" || obj.style["overflow"] === "");
	return (resize && noOverflow)? "Resize option is given without fitting overflow element" : "";
}

//# sourceURL=content_script.js
