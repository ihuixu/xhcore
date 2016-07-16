<style>
.form-submit{
	.w(100%);.h(110*@rem);.pr;

	input{
		box-sizing:border-box;
		.f(32*@rem);.fc(#fff);
		.w(100%);.h(100%);
		.left;
		padding:20*@rem;
		.bgc(#f66);
	}

}

</style>

<template>

<p class="form-submit" v-touch:tap="checkForm">
	<input type="submit" :value="submitdata.value"/>
</p>

</template>


<script>

return {
	props:['submitdata']
	, data : function(){
		return {
		}
	}
	, methods : {
		checkForm : function(){
			this.$dispatch('validateForm')
		}
	}
	, created : function(){
	}
	, ready:function(){
	}
}
</script>
