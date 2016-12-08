return function(shareData, cbk){

	$.ajax({
		url: '/aj/aj/getShare/' 
		, data: shareData 
		, dataType: 'json'
		, type: 'get'
		, success : function(data){

		//	alert(JSON.stringify(data.userInfo))
				
			cbk && cbk(data)

		}
	})

}
