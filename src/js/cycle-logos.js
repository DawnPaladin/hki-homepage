var $logos = $('.logos > img');
var index = 0;
var $left, $center, $right, $primary, $secondary;
var numLogos = $logos.length;

// Add the first two logos onto the end for seamless looping
var $dummies = $logos.slice(0, 2).clone();
$dummies.appendTo('.logos').hide();
$logos = $('.logos > img');

function cycleForward() {
	index++;
	if (index > numLogos) {
		index = 1;
	}
	$left = $logos.eq(index - 1);
	$center = $logos.eq(index);
	$right = $logos.eq(index + 1);
	$primary = $center;
	$secondary = $left.add($right);

	$logos
		.hide()
		.removeClass('faded');
	$secondary
		.show()
		.addClass('faded');
	$primary
		.show();
};
