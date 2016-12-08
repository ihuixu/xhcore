return function(fn) {
	var weixin = navigator.userAgent.indexOf('MicroMessenger') > 0
	if (!weixin) return;

	$.ajax({
		url: '/aj/wx/info/',
		data: {},
		dataType: 'json',
		type: 'get',
		success: function(data) {
			!Meilishuo.config && (Meilishuo.config = {});
			Meilishuo.config.wxinfo = data

			fn && fn(data)
		},
		error: function(data) {

		}
	})
}
