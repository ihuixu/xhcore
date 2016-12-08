/**
 * @file 图片懒加载
 * @name lazyload
 * @import core/m/scrollStop
 */

require('core/m/scrollStop')

var win_width,
	win_height

var set = function() {
	var $win = $(window)

	win_width = $win.width()
	win_height = $win.height()

	$win.on('resize', function() {
		var $win = $(window)

		win_width = $win.width()
		win_height = $win.height()
	})
}

var addParent = function(xpath, x, step_y, fn, parentName) {
	for (var y = step_y; y <= win_height; y += step_y) {

		var $point = $(document.elementFromPoint(x, y))
		var $parent = $point.is(parentName) ? $point : $point.parents(parentName)

		if ($parent[0] && !$parent.data('shown')) {
			$parent.data('shown', 1)
			var $items = $parent.find(xpath)

			$.each($items, function(k, item) {
				fn($(item))
			})
		}
	}
}

var add = function(xpath, x, step_y, fn) {
	for (var y = step_y; y <= win_height; y += step_y) {
		var $point = $(document.elementFromPoint(x, y))

		if ($point.is(xpath) && !$point.data('shown')) fn($point)
	}
}

var wait = function($item, attrName, cbk) {
	$item.data('shown', 1)

	var img = new Image()
	img.onload = cbk
	img.src = $item.attr(attrName)
	img = null
}

var load = function(opts) {
	var attrName = opts.attrName || 'asrc',
		parentName = opts.parentName || '',
		step_x = opts.step_x || 60,
		step_y = opts.step_y || 60,
		loadStyle = opts.loadStyle || 'bg',
		addFn = parentName ? addParent : add,
		fn = (loadStyle == 'img') ? function($item) {
			var $img = $('<img />', {
				'src': $item.attr(attrName),
				'title': $item.attr('title'),
				'alt': $item.attr('alt')
			})

			$item
				.data('shown', 1)
				.replaceWith($img)
		} : function($item) {
			wait($item, attrName, function() {
				$item
					.css({
						'background-image': 'url(' + $item.attr(attrName) + ')',
						'opacity': 1
					})
					.removeAttr(attrName)
			})
		}

	if (step_x == 'auto') {
		addFn(opts.xpath, (win_height / 2), step_y, fn, parentName)
	} else {
		for (var x = 0; x <= win_width; x += step_x) {
			addFn(opts.xpath, x, step_y, fn, parentName)
		}
	}
}

var scroll = function(opts) {
	$(window).on('scrollStop', function() {
		load(opts)
	})
}

exports.set = set
exports.init = function(opts) {
	set()

	return {
		load: function() {
			/* fixed IOS 8.4.1 bug, first item load fail ,fixed by qianyun */
			if (window.requestAnimationFrame) {
				requestAnimationFrame(function() {
					load(opts)
				})
			} else {
				load(opts)
			}

			return this
		},
		scroll: function() {
			scroll(opts)

			return this
		}
	}
}
