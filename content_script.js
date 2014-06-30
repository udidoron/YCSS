console.log('Hello');
function cssLint(elem) {
	var strategies = [directionsWithPositionStatic, clearfix];
	var style = window.getComputedStyle(elem);
	console.log('World');
	console.log(elem);

	return strategies.reduce(function(msg, strategy) {
		var result = strategy({
			elem: elem,
			style: style
		});
		return (result) ? msg + result + "\n" : msg;
	}, '');
}

function clearfix(obj) {
	var areAllSonsFloat = obj.elem.childNodes.reduce(function(result, elem) {
		return result || window.getComputedStyle(elem).float === '';
	}, false);

	return (areAllSonsFloat) ? 'Your container is collapsed. Try clearfix.' : '';
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
