<template>
	<div class="banner">
		<swiper class="banner-swiper" :options="swiperOption">
			<swiper-slide v-for="img,index in banner" :key="index">
				<img :src='img.pic' alt="">
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
	</div>
</template>

<script type="text/javascript">
	import 'swiper/dist/css/swiper.css'
	export default{
		props:{
			banner:{
				type:Array,
				default:[]
			}
		},
		data(){
			return{
				swiperOption:{
					notNextTick:true,
					pagination:".swiper-pagination",
					autoplay:3000,
					loop:true
				}
			}
		}
	}
</script>

<style lang="stylus">
	@import '../common/style/color.styl'
	.banner
		width:100%
		font-size:0
		overflow:hidden
		.banner-swiper
			.swiper-pagination
					.swiper-pagination-bullet-active
						background: $swiper-pagination
				img
					width:100%
</style>