<template>
	<div class="album-list-slider" ref="listSlider">
		<ul class="album">
			<li v-for="item in list" :data-id="item.albumMID" class="border-1px" @click.stop="$router.push({path:'album',query: { id: item.albumMID}})">
				<div class="text">
					<p class="name">{{item.albumName}}</p>
					<p class="time">
						<span>{{item.singerName}}</span>
						<span>{{item.publicTime}}</span>
					</p>
				</div>
				<div class="img">
					<img :src="item.albumPic" alt="">
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
		}
	}
</script>

<style lang="stylus">

@import '../common/style/color.styl'
@import '../common/style/mixim.styl'

.album-list-slider
	background:#fff
	padding-bottom:56px
	.album
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
				.time
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