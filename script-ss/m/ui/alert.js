var Drive = require('core/m/windowDrive');
function Alert(options){
	var defaults = {
		dialogType : 'alert'
		, confirmTxt : '确认'
		, onSure : function(){}
	}
	this.opts = $.extend({}, defaults, options);
	this.drive = new Drive(this.opts);
	this.sync();
	return this;
}
Alert.prototype.sync = function(){
	this.drive.createWindow();
	var mSelf = this
	mSelf.drive.window
			.on('click', '.sureBtn', $.proxy(function(){
				mSelf.drive.opts.onSure()
				mSelf.drive.destroyModel();
			} , mSelf))
	}
return Alert;
