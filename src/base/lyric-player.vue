<template>
	<div class="player">
		<div class="bg">
			<img :src="imgurl" alt=""></img>
			<div></div>
		</div>
		<div class="header">
			<span class="back icon-back" @click=""></span>
			<span class="title">
				<span>{{}}</span>
				<span></span>
			</span>
			<span class="more icon-ellipsis"></span>
		</div>
		<swiper class="swiper">
			<swiper-slide>
				<div class="image">
					<div class="image-wrapper">
						<img  alt="" id="image" :src="imgurl">
					</div>
					<div class="image-lyric">{{}}</div>
				</div>
			</swiper-slide>
			<swiper-slide>
				<div class="lyric" ref="lyricList">
					<div>
						<ul v-if="">
							<li v-for="">{{}}</li>
						</ul>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
	export default{
		props:{
			imgurl:null
		}
	}
</script>

<style lang='stylus'>
	.player
		position: fixed
		width:100%
		top:0
		bottom:0
		background:#fff
		overflow: hidden
		.header
			height:40px
			line-height:40px
			display: flex
			text-align: center
			color: #fff
			overflow : hidden
			.title
				flex: auto
				font-size:18px
				width:100%
				overflow:hidden
			.back,.more
				width: 50px
				flex: 0 0 50px
				font-size: 22px
				line-height:40px
		.swiper
			text-align: center
			position:absolute
			width:100%
			top: 40px
			bottom: 160px
			overflow:hidden
			box-sizing: border-box
			color:#fffef7
			.lyric
				box-sizing: border-box
				height: 100%
				padding:0 50px
				ul
					padding-bottom:200px
					padding-top:0px
					li
						display: block
						line-height:24px
						font-size:14px	
						margin-top:15px
						color:rgba(255, 254, 247, .4)
						transition: color .5
						&.hidden
							height:0px
							visibility: hidden
			.image
				box-sizing: border-box
				height: 100%
				width: 100%
				padding:0 40px
				.image-wrapper
					margin-top:20px
					display: inline-block
					position:relative
					height:0
					padding-top:100%
					width:100%
					img
						position:absolute
						height:100%
						width:100%	
						left:0
						top:0
						border-radius:50%
						border: 10px solid rgba(0, 0, 0, .2)
						box-sizing: border-box
						&.rotate
							animation: rotate 20s linear infinite
						&.paused
							animation-play-state: paused	
				.image-lyric
						font-size: 14px	
						line-height:2
						position:absolute
						bottom:0
						left:0
						width:100%
						padding:0 50px
						box-sizing: border-box
						text-align:center	
</style>						