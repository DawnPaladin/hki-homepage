$('.lang-select').on('input', function(event) {
	var lang = event.target.value;
	var newUrl = "http://www.hki.com/" + lang;
	window.location.href = newUrl;
});