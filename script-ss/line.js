return function(gap){
	gap = typeof gap != 'undefined' ? gap|0 : 2000
	var top = $(window).scrollTop()
	var bottom = top + $(window).height()
	var right = $(window).width()

	return {top:top, bottom:bottom, left:0, right:right, gap:gap}
}
