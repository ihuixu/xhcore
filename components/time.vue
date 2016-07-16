<style>
.time{.fc(#999);}
</style>

<template>
	<div class="time">{{ timeText }}</div>
</template>

<script>

return {
	props: ['time']
	, data: function(){
		return {
			timeText : ''
		}
	}
	, methods: {
		getTimeText : function(){
			var timestamp = this.time.length == 10 ? this.time*1000 : this.time
				, timestamp_now = Date.parse(new Date)

			var year = new Date(timestamp).getFullYear()
				, year_now = new Date(timestamp_now).getFullYear()

			var d = (timestamp_now - timestamp)/1000
			var d_days = (d/86400)|0
			var d_hours = parseInt(d/3600)|0
			var d_minutes = parseInt(d/60)|0

			if(year < year_now){
				return (year_now - year) + '年前'

			}else if(d_days >= 1){
				return d_days + '天前'

			}else if(d_hours >= 1){
				return d_hours + '小时前'

			}else if(d_minutes >= 1){
				return d_minutes + '分钟前'

			}else{
				return '刚刚'
			}
		}
	}
	, created: function(){
		this.timeText = this.getTimeText() 
	}
}
</script>
