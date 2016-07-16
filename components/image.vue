<style>
.core-image{
	.pr;
	.hidden;
	.bgc(#fff);
	background-size:contain;

	span{
		.w(100%);.h(100%);.pa;top:0px;left:0px;
		.gpu;
		background-size:cover;
		transform: scale(1);
	}

	&, span{
		background-position:center center;
		background-repeat:no-repeat;
	}
}
</style>

<template>

<div class="core-image" :style="{'background-image':background === false && 'none'}">
	<span v-show="loaded && show" transition="fade300" :style="{'background-image': loaded && imagedata.url && 'url('+ imagedata.url +')', 'background-size':imagedata.size }"></span>
</div>

</template>

<script>
var checkView = require('core/checkView')

return {
	props:['imagedata', 'show', 'background']
	, data:function(){
		return {
			position : {
				top : 0
				, bottom : 0
			}
			, loaded : false
		}
	}
	, methods : {
		setPosition : function(){
			this.position.top = $(this.$el).offset().top|0
			this.position.bottom = this.position.top + $(this.$el).height()|0
		}
		, showImage : function(){
			if(!this.imagedata || !this.imagedata.url)
				return;

			this.show = true

			var mSelf = this

			if(this.loaded)
				return;

//			console.log('show')

			var img = new Image()
			img.onload = function(){
				img.onload = null

				mSelf.loaded = true
			}
			img.src = this.imagedata.url

		}
		, hideImage : function(){
//			console.log('hide')
			this.show = false
		}
	}
	, events : {
		showImage : function(){
			this.showImage()
		}
		, hideImage : function(){
			this.hideImage()
		}
		, testImage : function(line){
			this.setPosition()

			if(checkView.inArea(this.position, line)){
				this.showImage()

			}else{
				this.hideImage()

			}
		}
	}
	, created : function(){
	}
	, ready : function(){
		if(this.show)
			this.showImage()
	}
}
</script>
