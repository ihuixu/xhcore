var open = require('core/m/open')
var Confirm = require('core/m/ui/confirm')
var Alert = require('core/m/ui/alert')
var urlHandle = require('core/urlHandle')

var callPayData = {}

function callpay(){
	if (typeof WeixinJSBridge == "undefined") {
		if (document.addEventListener ) {
			document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
		} else if (document.attachEvent) {
			document.attachEvent('WeixinJSBridgeReady', jsApiCall); 
			document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
		}
	} else {
		jsApiCall();
	}
}

function jsApiCall(){

	WeixinJSBridge.invoke('getBrandWCPayRequest', callPayData, function(res) {
		if (res.err_msg == "get_brand_wcpay_request:ok"){
			open.url({
				url:"https://lehe.com/hgweixin/index.php?rt=pay/success"
			})

		} else {
			new Alert({
				content:'支付失败！'
				, onSure : function(){
					open.url({
						url:"https://lehe.com/hgweixin/index.php?rt=order/list"
					})
				}
			})
		}
	})
}

function payOutWX(res, cbk) {
	cbk && cbk(res)

	if(res.code != 0)
		return new Alert({content:res.message})

	open.url({
		url: 'https://lehe.com/hgweixin/index.php?rt=pay/cashier&bar=1&orderNO=' + res.data.data.orderNo
	})
}


function payInWX(res, cbk) {
	cbk && cbk(res)

	if(res.code == '40111') {
		return new Confirm({
			content : res.message
			, confirmTxt : "下载APP支付"
			, cancelTxt : "暂不支付"
			, onSure : function () {
				downloadClient();
			}
		})

	}

	if(res.code != 0){
		return new Alert({content:res.message})
	}

	//alert(JSON.stringify(res.data.data))

	var params = urlHandle.getParams(res.data.data.httpsUrl)

	callPayData = {
		appId:params.appId
		, timeStamp : ''+params.timeStamp
		, nonceStr : params.nonceStr
		, package : decodeURIComponent(params.package)
		, signType : params.signType
		, paySign : params.paySign
	}

	callpay()
}

exports.bind = function(data, cbk){
	if (!data.order_id) {
		return false;
	}

	if (data.is_all_pay == 1) {
		delete data["order_id"];
	} else {
		delete data["pay_id"];
	}

	delete data["is_all_pay"];

	data.mls_flag	= "20"

	if (open.weixin){
		data.mls_flag	= "10"
		data.pm_code = "PUBACCOUNT"
		data.bank_code = "WECHAT"
	}

	$.get('/aj/order/order/pay', data, function(res){

		if(res.code == '40001')
			return open.reLogin()

		check(res, cbk)

	}, 'json')

}

function check(res, cbk){
	open.weixin ? payInWX(res, cbk) : payOutWX(res, cbk)
}

exports.check = check


