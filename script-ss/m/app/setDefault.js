var urlHandle = require('core/urlHandle')

return function(cbk){

	var query = urlHandle.getParams(window.location.href.toString());
	//alert(JSON.stringify(query))

	$.ajax({
		url: '/aj/aj/getDefault/m'
		, data: query
		, dataType: 'json'
		, type: 'get'
		, error : function(data){
			success({})
		}
		, success : function(data){
			success(data)
		}
	})

	function success(data){

		// console.log(data)
	//	alert(JSON.stringify(data.userInfo))

		var opts = ['os', 'access_token', 'r']
		$.map(opts, function(v, k){
			LEHE.config[v] = data[v]
		})

		LEHE.config.os = LEHE.config.os || {}

		LEHE.config['bi_data'] = data['base_h'] || {}

		LEHE.config['page_bi'] = {
			higoid: data['higoid']
			, spm_bi: fml.vars.PAGE_BI
		}

		if(data.userInfo){
			LEHE.config.userInfo = data.userInfo.data || {}

			var opts = ['avatar_c', 'nickname', 'user_id']
			$.map(opts, function(v, k){
				LEHE.config[v] = data.userInfo[v]
			})
		}

		LEHE.config.nt = data.nToken

		cbk && cbk(data)
	}


}
