<style>
</style>

<template>
<fieldset class="fieldset">
	<form class="form" method="post" onsubmit="return false" action="">

		<div class="form-area" v-for="areadata in formdata.area">
			<form-input v-ref:input v-for="inputdata in areadata" :inputdata="inputdata"></form-input>
		</div>

		<form-submit v-ref:submit :submitdata="formdata.submit"></form-input>

	</form>
</fieldset>

<ui-notice v-ref:notice></ui-notice>

</template>


<script>

return {
	components : {
		formInput : require('core/form/input.vue')
		, formSubmit : require('core/form/submit.vue')
		, uiNotice : require('core/ui/notice.vue')
	}
	, props:['formdata']
	, data : function(){
		return {
			signInput : 0
			, waitCheck : 0
			, senddata : {}
		}
	}
	, events : {
		validateForm : function(){
			this.senddata = {}
			this.waitCheck = this.signInput
			
			this.$broadcast('validateInput')
		}
		, setNotice : function(text){
			this.$refs.notice.showNotice(text)
		}
		, signInput : function(){
			this.signInput++
		}
		, checkForm : function(checked, key, value){
			if(checked){
				this.senddata[key] = value
				this.waitCheck--
			}

			if(this.waitCheck == 0)
				this.$dispatch(this.formdata.submit.success || 'validateSuccess', JSON.parse(JSON.stringify(this.senddata)))

		}
	}
	, created : function(){
	}
	, ready:function(){
	}
}
</script>
