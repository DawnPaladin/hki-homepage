var $logos = $('.logos > img');
var index = 0;

var $oldLogo = $logos.eq(index);
var $newLogo = $logos.eq(index + 1);

function cycle() {
	var screenWidth = $(document).width();

	$oldLogo.css({
		opacity: 0,
		left: -screenWidth/2 - $oldLogo.width(),
	});
	$newLogo.css({
		opacity: 1,
		left: -$newLogo.width()/2,
	});

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