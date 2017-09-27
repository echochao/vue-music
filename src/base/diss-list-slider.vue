<template>
	<div class="diss-list-slider" ref="listSlider">
		<ul class="diss">
			<li v-for="item in list" :data-id="item.dissid" @click.stop="$router.push({path:'disslist',query: { id: item.dissid}})" class="border-1px">
				<div class="text">
					<p class="name">{{htmlDecode(item.dissname)}}</p>
					<p class="info">
						<span>{{item.song_count}}首</span>
						<span>{{htmlDecode(item.creator.name)}}</span>
						<span>{{getNum(item.listennum)}}万人播放</span>
					</p>
				</div>
				<div class="img">
					<img :src="item.imgurl" alt="">
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:(()=>{
					return []
				})
			}
		},
		methods:{
			htmlDecode(input){
				var converter = document.createElement("DIV")
				converter.innerHTML = input
				var output = converter.innerText
				converter = null
				return output
			},
			getNum(n){
				return parseFloat(n/10000).toFixed(1)
			}
		}
	}
</script>

<style lang="stylus">

@import '../common/style/color.styl'
@import '../common/style/mixim.styl'

.diss-list-slider
	background:#fff
	padding-bottom:56px
	.diss
		li
			height:68px
			line-height:68px
			margin-left:83px
			padding:5px 0 5px 0
			border-bottom-1px($border-color)
			box-sizing: border-box
			&:last-child
				border-none()	
			.text
				border-left:4px solid #fff
				padding:0 50px 0 15px
				margin-left:-15px
				position:relative
				transition: all .3s					
				p
					line-height:29px
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				.name
					font-size: 16px
				.info
					font-size: 12px
					color:$singer-color
					span
						margin-right: 1em	
			.img
				position:absolute
				left:-83px
				top:0
				height:68px
				width:68px
				img
					height:100%
					width:100%	
</style>