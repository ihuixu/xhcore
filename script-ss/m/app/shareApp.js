require('core/m/app/hackWeixin')
var setShare = require('core/m/app/setShare')
var shareTmp = require('core/shareTmp')
var dialog = require('core/m/ui/dialog')
var isNewest = require('core/m/app/isNewest')

var infoDefs = {
	title : document.title
	, link : window.location.href
	, desc : ''
	, imgUrl : 'https://pic.lehe.com/pic/_o/da/63/1b66812d3996df16cae1aa9828a0_80_80.cz.png'
}
var inited = 0
var writed = 0
var startFn
var domain = 'http://pages.w.meilishuo.com'
var info
var args

function getUrl($btn){
    var url = $btn.attr('url')
        , type = $btn.attr('type')
        , shareid = $btn.attr('shareid') || ''

    var share_url = '/goto/count/?p=' + url + '&frm=share&type=' + type + '&shareid=' + (shareid || '')

    return share_url

}
exports.getUrl = getUrl


var $shareWXMask = $('.shareWXMask')

function showMask(){
	$shareWXMask.show();
}

function hideMask(){
	$shareWXMask.hide();
}


function init(){
	if(inited) return;
	inited = 1

	$shareWXMask.on('click',hideMask)

	$('body')
		.on('click', '.shareBtn', function(){
			startFn && startFn()

			if (isNewest('7.3.1')) {

				showMask()

			}else{
				new dialog({content:shareTmp('shareApp', {share:info})});
			}
		})
		.on('click', '.share_ico a', function(){
			$('.share_ico a.active').removeClass('active')
			$(this).addClass('active')
		})
		.on('click', '.shareToBtn', function(){
			window.location.href = (domain||'') + getUrl($('.share_ico .active'))
		})

}

function write(){
	if(writed) return;
	writed = 1

	$('.shareArea').html(shareTmp('shareApp', {share:info}))
}


exports.bind = function(opts){
	init()
	opts.start && (startFn = opts.start)
	opts.domain && (domain = opts.domain)

	var defs = args || infoDefs

	args = $.extend({}, defs, opts)

	setShare(args, function(data){
		info = data

		var share_items = {} 

		write()

		$.map(data, function(v,k){
		    $('.' + v.type).attr('url', encodeURIComponent(v.share_url))
				share_items[v.type] = {url : v.share_url}
		})

		var shareButton = {"type":"share","share_items":share_items}

		window.location.href = 'meilishuo://menu.meilishuo?json_params=' + encodeURIComponent(JSON.stringify({"buttons":[shareButton]}))

	})
}


/*
!window.MLS && window.MLS = {}
window.MLS.onShareComplete = function(result, shareUrl) {
    if (result == 'success') {
    //    alert('分享成功');
    }
    else if (result == 'cancel') {
      //  alert('分享取消');
    }
    else if (result == 'fail') {
        //alert('分享失败');
    }
}
*/
