var shareTmp = require('core/shareTmp')

var events = {
	'Timeline': 'onMenuShareTimeline',
	'AppMessage': 'onMenuShareAppMessage',
	'QQ': 'onMenuShareQQ',
	'Weibo': 'onMenuShareWeibo'
}

var inited = 0
var $shareWXMask = $('.shareWXMask'),
	startFn

var infoDefs = {
	title: document.title,
	link: window.location.href,
	desc: window.location.href,
	imgUrl : 'https://pic.lehe.com/pic/_o/da/63/1b66812d3996df16cae1aa9828a0_80_80.cz.png'
}
var callbackDefs = {
	success: hideMask
}

var info = {}
var callbackNames = ['success', 'trigger', 'cancel', 'fail']
var callbackList = {}
var callbackFn = {}

function init() {
	if (inited) return;

	inited = 1

	$('body').on('click', '.shareBtn', function() {
		showMask()
		startFn && startFn()
	})
	$shareWXMask.on('click', hideMask)

}


function initCallbackList() {
	for (var i = 0; i < callbackNames.length; i++) {
		var name = callbackNames[i]
		initCallback(name)
	}
}

function initCallbackFn() {
	for (var i = 0; i < callbackNames.length; i++) {
		(function(name) {
			callbackFn[name] = function(res, n, eventName) {
				var callbacks = callbackList[name],
					len = callbacks.length

				for (var i = 0; i < len; i++) {
					callbacks[i](res, n, eventName)
				}
			}
		})(callbackNames[i])
	}
}

function initCallback(name) {
	callbackList[name] = []
	addCallback(name, callbackDefs[name])
}

function addCallback(name, fn, doReload) {
	if (!fn) return;
	callbackList[name].push(fn)
	doReload && reload()
}

function replaceCallback(name, fn, doReload) {
	if (!fn) return;
	initCallback(name)
	callbackList[name].push(fn)
	doReload && reload()
}

function changeInfo(name, str, doReload) {
	str && (info[name] = str);
	!info[name] && (info[name] = infoDefs[name]);
	doReload && reload()
}

function set(eventName, opts) {
	var name = events[eventName]
	wx[name](opts)
}

function reload() {
	var args = $.extend({}, info, callbackFn)
	for (var eventName in events) {
		set(eventName, args)
	}
}

function bind(opts) {
	opts = opts || {}

	var weixin = navigator.userAgent.indexOf('MicroMessenger') > 0
	if (!weixin) return;

	wx.ready(function() {
		init()

		for (var name in infoDefs) {
			changeInfo(name, opts[name])
		}

		for (var i = 0; i < callbackNames.length; i++) {
			var name = callbackNames[i]
			addCallback(name, opts[name])
		}

		reload()

		opts.start && (startFn = opts.start)
	})
}

function showMask() {
	$shareWXMask.show();
}

function hideMask() {
	$shareWXMask.hide();
}

initCallbackList()
initCallbackFn()

exports.bind = bind
exports.reload = reload

exports.replaceCallback = replaceCallback

exports.showMask = showMask
exports.hideMask = hideMask
