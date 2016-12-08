return function() {
	var weixin = navigator.userAgent.indexOf('MicroMessenger') > 0
		//alert(weixin)
		//	if (!weixin) return;

	$.ajax({
		url: '/aj/wx/connect/',
		data: {
			jumpUrl: window.location.href
		},
		dataType: 'json',
		type: 'get',
		success: function(res) {
			var data = res.data

			// alert(JSON.stringify(data))

			if (data.redirect)
				window.location.href = data.redirect

		},
		error: function(data) {

			// alert(JSON.stringify(data))
		}
	})
}
