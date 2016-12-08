var sjt = require('core/sjt')

return function(obj, data) {
	if (!document.getElementById(obj)) {
		console.log(obj + ' is lost')
		return
	}

	data = data || Object

	try {
		var shareTpl = sjt(obj, data)
	} catch (e) {
		console.log(e)
	}

	return shareTpl
}
