<template>
	<div class="circular-progress">
		<div class="out" ref="out">
			<div class="in" ref='in'></div>
			<div class="left">
				<span class="left-in" ref="left"></span>
			</div>
			<div class="right">
				<span class="right-in" ref="right"></span>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			progress:{
				default:0
			}
		},
		watch:{
			progress(n,o){
				let deg = n*360
				if (deg>180) {
					this.$refs.right.style = 'transform:rotate(180deg)'
					this.$refs.left.style = 'transform:rotate('+(deg-180)+'deg)'
				}else{
					this.$refs.left.style = 'transform:rotate(0deg)'
					this.$refs.right.style = 'transform:rotate('+deg+'deg)'
				}
				
			}
		}
	}
</script>

<style lang="stylus">
@import '../common/style/color.styl'
	.circular-progress
		.out
			height:100px
			width:100px
			border-radius:50%
			background:$main-color
			position:relative
			overflow:hidden	
			.in
				height:80px
				width:80px
				border-radius:50%
				background:#fff
				top:10px
				left:10px
				position:absolute
				z-index: 99
			.left,.right,.left-in,.right-in
				height:100%
				width:100%
				border-radius:50%
				position:absolute
				left:0
				top:0
			.left-in,.right-in
				background:#fff
			.left,.left-in
				clip:rect(0,50px,100px,0)
			.right,.right-in
				clip:rect(0,100px,100px,50px)		
					
					
					

</style>