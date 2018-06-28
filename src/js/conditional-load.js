var globeLoaded = false;
function loadConditionally() {
	if ($(window).width() >= 1200 && globeLoaded == false) {
		console.log("Loading globe");
		globeLoaded = true;
		$.ajax({
			url: "http://test.hki.com/hki-sitefinity-theme/news-globe/globe.min.js",
			dataType: "script",
			cache: true
		});
	}
}

loadConditionally();
$(window).on('resize', debounce(loadConditionally, 500));

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