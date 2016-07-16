<style>
.form-input{
	.w(100%);.h(110*@rem);.pr;
	box-sizing:border-box;

	border:@orem solid #999;

	border-top:0 none;

	&:nth-of-type(1){
		border-top:@orem solid #999;
	}


	input{
		box-sizing:border-box;
		.f(28*@rem);
		.w(100%);.h(100%);
		.left;
		padding:20*@rem;
	}
}

</style>

<template>

<p class="form-input">
	<input v-el:input :type="inputdata.type" :name="inputdata.name" :value="inputdata.value" :placeholder="inputdata.placeholder"/>
</p>

</template>


<script>

return {
	props:['inputdata']
	, data : function(){
		return {
			value : ''
			, checked : false
		}
	}
	, methods : {
		notNull : function(){
			if(!this.value)
				return false

			return true
		}
		, isMobile : function(){
			var reg = /^\d{11}$/

			if(!reg.test(this.value))
				return false

			return true
		}
		, isEmail : function(){
			var reg = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/

			if(!reg.test(this.value))
				return false

			return true
		}
	}
	, events : {
		validateInput : function(){
			this.value = $(this.$els.input).val() 
			this.checked = true

			for(var i in this.inputdata.validate){
				if(this[i]){
					if(!this[i]()){
						this.checked = false
						this.$dispatch('setNotice', this.inputdata.validate[i])
						break;
					}
				}
			}
	
			this.$dispatch('checkForm', this.checked, this.inputdata.name, this.value)
		}
	}
	, created : function(){
	}
	, ready:function(){
		this.$dispatch('signInput')
	}
}
</script>
