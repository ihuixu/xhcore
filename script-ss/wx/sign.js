function sign() {
	var weixin = navigator.userAgent.indexOf('MicroMessenger') > 0
	if (!weixin) return;

	$.ajax({
		url: '/aj/wx/sign/',
		data: {
			url: window.location.href.split('#')[0]
				//url:encodeURIComponent(window.location.href)
		},
		dataType: 'json',
		type: 'get'
			//	, type: 'post'
			,
		success: function(data) {

			// alert(JSON.stringify(data))

			wx.config({
				// debug:true,
				debug: false,
				appId: data.data.appId,
				timestamp: data.data.timestamp,
				nonceStr: data.data.nonceStr,
				signature: data.data.signature,
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'getNetworkType',
					'previewImage',
					'scanQRCode'
				]
			});

		}
	})
}

return sign;
