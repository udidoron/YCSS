function cssLint(elem) {
	var strategies = [directionsWithPositionStatic, clearfix];
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
		return 'Directions are given, but position is static';
	}

	return '';
}

//# sourceURL=content_script.js
