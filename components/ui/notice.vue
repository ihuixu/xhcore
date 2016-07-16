<style>
.ui-notice{
	.pf;.w(100%);.c;left:0px;top:40%;
	z-index:1000;

	&>div{
		.i_block;
		.f(26*@rem);
		padding:20*@rem;
		.border-r(10*@rem);
		.l(1.4);
		.fc(#fff);.bgc(rgba(66,66,66,.7));
	}
	
}
</style>

<template>

<div class="ui-notice" v-show="show" transition="fade300">
	<div>{{text}}</div>
</div>

</template>

<script>

return {
	props:[]
	, data : function(){
		return {
			show : false
			, text : ''
			, t : null
		}
	}
	, methods : {
		showNotice : function(text){
			if(this.show)
				return;

			var mSelf = this

			this.text = text
			this.show = true

			clearTimeout(this.t)

			this.t = setTimeout(function(){
				mSelf.$set('show', false)

			}, 3000)

		}
	}
	, created : function(){
	}
}
</script>
