<template>
	<div class="c-list">
		<div class="title">
			<p>热门推荐</p>
			<i class="icon-more"></i>
		</div>
		<div class="hotdiss">
			<ul>
				<li v-for="(item,index) in hotdiss" @click.stop="$router.push({path:'disslist',query: { id: item.dissid}})" :data-dissid="item.dissid">
					<div class="img">
						<div class="icon">
							<span class="icon-try"></span>
							<span class="num">{{getNum(item.listennum)}}万</span>
							<span class="icon-play"  @click.stop="playDissAll(item.dissid)"></span>
						</div>
						<img :src="item.imgurl" alt="">
					</div>
					<p class="text">{{item.dissname}}</p>
				</li>
			</ul>
		</div>
		<div class="title">
			<p>热门专辑</p>
			<i class="icon-more"></i>
		</div>
		<div class="album">
			<ul>
				<li v-for="(item,index) in album" @click.stop="$router.push({path:'albumlist',query: { id: item.album_mid}})" :data-album="item.album_mid">
					<div class="img">
						<div class="icon">
							<span class="date">{{item.public_time}}</span>
							<span class="icon-play" @click.stop="playAlbumAll(item.album_mid)"></span>
						</div>
						<img :src="'http://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.album_mid + '.jpg'">
					</div>
					<p class="text">{{item.album_name}}-{{item.singer_name}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script type="text/javascript">
import {albumInfo,dissInfo} from '@/api/config.js'
import {mapActions} from 'vuex'
	export default{
		props:{
			hotdiss:{
				type:Array,
				default:[]
			},
			album:{
				type:Array,
				default:[]
			}
		},
		methods:{
			...mapActions(['randomPlayAll']),
			getNum(n){
				return parseFloat(n/10000).toFixed(1)
			},
			playAlbumAll(id){
				let albuminfo = albumInfo(id)
				this.$http.jsonp(albuminfo.url,{params:albuminfo.params,jsonpCallback:albuminfo.callback}).then((res)=>{
					console.log(res.data.data.list)	
					let arr = []
					for(let item of res.data.data.list){
						let music = {'id':item.songid,'name':item.songname,'img':item.albummid,'singer':item.singer}
						arr.push(music)
					}
					this.randomPlayAll(arr)	
				})
			},
			playDissAll(id){
				let dissinfo = dissInfo(id)
				this.$http.jsonp(dissinfo.url,{params:dissinfo.params,jsonpCallback:dissinfo.callback}).then((res)=>{
					let arr = []
					for(let item of res.data.cdlist[0].songlist){
						let music = {'id':item.songid,'name':item.songname,'img':item.albummid,'singer':item.singer}
						arr.push(music)
					}
					this.randomPlayAll(arr)	
				})
			}
		}
	}
</script>

<style lang="stylus">
	@import '../common/style/color.styl'
	.c-list
		padding-bottom:56px
		.title
			height:20px
			line-height:20px
			text-align: center
			padding: 20px
			position: relative
			p
				font-size: 16px
			i
				position:absolute
				display: block
				height:20px
				font-size: 20px;
				right: 20px
				top:50%
				margin-top:-12px
				color:$more-color
		.hotdiss,.album
			@media screen and (max-width: 375px)
				ul
					justify-content: space-around!important
			ul
				display: flex
				flex-flow: row wrap
				justify-content: space-between
				width:100%
				overflow:hidden
				font-size: 0
				li
					display: inline-block
					text-align: center
					width:124px
					min-width: 21%
					position:relative
					.img
						position:relative
						height:124px
						width:124px
						display: inline-block
						.icon
							width:100%
							position:absolute
							bottom:0
							height:30px	
							color:$icon-play-color
							z-index:99
							display: flex
							.date
								flex:1
								line-height:30px
								display: inline-block
								font-size: 12px
								padding-left:8px
								text-align: left
								overflow:hidden
								text-overflow:ellipsis
								white-space:nowrap
							.icon-try
								flex: 0 0 20px
								display: inline-block
								line-height:30px
								font-size: 20px
								width:50%
								text-align: left
								padding-left:8px
							.num
								flex:1
								font-size: 12px
								line-height: 34px
								text-align: left
								text-indent: .5em
								display: inline-block
							.icon-play
								flex: 0 0 20px
								font-size: 22px	
								line-height:30px
								width:50%
								padding-right:10px
								text-align: right
						img
							height:124px
							width: 124px
					.text
						font-size: 12px
						line-height: 16px
						height: 32px
						width: 100%
						padding: 0 2px
						margin: 8px 0 12px
						text-align: left
						box-sizing: border-box
						text-overflow:ellipsis
						overflow: hidden
						display:-webkit-box
						-webkit-box-orient: vertical
						-webkit-line-clamp:2
</style>