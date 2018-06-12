var logoCycler = (function() {
	var verbose = true;

	var $logos = $('.logos > img');
	var index = 0;
	
	var $oldLogo = $logos.eq(index);
	var $newLogo = $logos.eq(index + 1);
	
	function cycle() {
		if (verbose) console.log("cycling");
		var screenWidth = $(document).width();
	
		$oldLogo.css({
			opacity: 0,
			left: -screenWidth/2 - $oldLogo.width(),
		});
		$newLogo.css({
			opacity: 1,
			left: -$newLogo.width()/2,
			top: (125-$newLogo.height())/2 - 20,
		});
		$logos.not($newLogo).css({opacity: 0});
	
		index++;
		if (index < $logos.length - 1) {
			$oldLogo = $logos.eq(index);
			$newLogo = $logos.eq(index + 1);
		} else if (index == $logos.length - 1) {
			$oldLogo = $logos.eq(index);
			$newLogo = $logos.eq(0);
			index = -1;
		}
	
		$newLogo.css('left', screenWidth/2);
	}

	var intervalId = 0;
	
	function startCycling() {
		intervalId = setInterval(cycle, 3000);
		if (verbose) console.log("Cycling every 3 seconds on id", intervalId);
	}
	
	function stopCycling() {
		clearInterval(intervalId);
		if (verbose) console.log("No longer cycling on id", intervalId);
		intervalId = 0;
	}

	function detectWindowSize() {
		var windowSize = $(window).width();
		if (verbose) console.log("Window size:", windowSize);
		if (windowSize < 760 && intervalId == 0) {
			startCycling();
		} 
		if (windowSize >= 760) {
			stopCycling();
			reset();
		}
	}

	function enableDisable(enable) {
		if (enable) {
			detectWindowSize();
			$(window).on('resize', debounce(detectWindowSize, 500));
		} else {
			stopCycling();
			$(window).off('resize');
		}
	}

	function reset() {
		if (verbose) console.log("Resetting logo CSS");
		console.log($logos);
		$logos.removeAttr('style');
	}

	enableDisable(true);
	
	return {
		start: startCycling,
		stop: stopCycling,
		cycle: cycle,
		auto: enableDisable,
		verbose: verbose,
		reset: reset,
	}
})();

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};