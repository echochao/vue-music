<template>
	<div class="album">
		<v-list-header v-if="album!==null" :logo="this.getAlbumImg(album.mid)" :title="album.name" :type="type" class="list-t" ref="header"></v-list-header>
		<div class="list-scroll" ref="listScroll">
			<div>
				<div class="list-info" v-if="album!==null" ref="info">
					<div class="info-t">
						<div class="logo">
							<img :src="this.getAlbumImg(album.mid)">
							<p class="text">{{album.aDate}}</p>
						</div>
						<div>
							<p class="title">{{album.name}}</p>
							<p class="people" :data-id="album.singermid" @click.stop="$router.push({path:'singer',query: { id: album.singermid}})">
								<img :src="this.getSingerImg(album.singermid)">
								<span class="name">{{album.singername}}</span>
							</p>
							<p class="desc">简介：{{album.desc}}</p>
						</div>
					</div>
					<div class="info-b">
					</div>				
				</div>
				<v-song-list-slider v-if="album!==null" :list="album.list" :more="true" :top="true"></v-song-list-slider>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">

	import BScroll from 'better-scroll'
	import {albumInfo} from '@/api/config.js'
	import {isTitleMove} from '@/common/js/common.js'
	import SongListSlider from '@/base/song-list-slider'
	import ListHeader from '@/base/list-header'
	export default{
		data(){
			return{
				album:null,
				type:'专辑'
			}
		},
		components:{
			'v-song-list-slider':SongListSlider,
			'v-list-header':ListHeader
		},
		activated(){
			this.album = null
			this.getalbumInfo(this.$route.query.id)
		},
		methods:{
			getalbumInfo(id){
				let albuminfo = albumInfo(id)
				this.$http.jsonp(albuminfo.url,{params:albuminfo.params,jsonpCallback:albuminfo.callback}).then((res)=>{
					this.album = res.data.data
					console.log(this.album)
					this.$nextTick(()=>{
						this.initScroll()
					})
				})
			},
			getAlbumImg(id){
				return	'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+id+'.jpg'
			},
			getSingerImg(id){
				return	'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+id+'.jpg'
			},
			initScroll(){
				if (this.listScroll) {
					this.listScroll.refresh()
					this.listScroll.scrollTo(0,0,0)
				}else{
					this.listScroll = new BScroll(this.$refs.listScroll,{click:true,probeType:3})
					this.listScroll.on('scroll',(pos)=>{
						console.log(pos.y)
						if (pos.y<0 && pos.y>-225) {
							this.$refs.info.style.opacity = (pos.y+225)/225
						}
						if (this.$refs.header.move == null && pos.y<-225) {
							this.$refs.header.move = isTitleMove(this.album.name,18,window.innerWidth-120)
						}
						if (this.$refs.header.move !== null && pos.y>-225) {
							this.$refs.header.move = null
						}
					})
				}
			}
		},
		computed:{

		}
	}
</script>

<style lang="stylus">
.album
	.list-t
		display: fixed
	.list-scroll
		position:absolute
		width:100%
		z-index:99
		top:40px
		bottom:0
		overflow:hidden	
		.list-info
			height: 225px
			width: 100%
			padding-left:15px
			padding-right:15px
			box-sizing: border-box
			line-height:50px
			position:relative
			.info-t
				display: flex
				padding:15px
				overflow:hidden
				&>.logo
					height:145px
					width:145px
					flex: 0 0 145px
					margin-right:20px
					position:relative
					img
						width:100%
						height:100%
					.text
						color:$icon-play-color
						position:absolute
						bottom:0
						height:20px
						line-height:20px
						font-size:12px
						padding-left:1em
				&>div
					color: #fff
					overflow:hidden
					.title
						margin-top:10px
						line-height:20px
						height:40px
						overflow:hidden
					.people
						height:40px
						line-height:40px
						padding: 5px 0
						overflow:hidden
						text-overflow:ellipsis
						white-space:nowrap	
						img
							height:32px
							width:32px
							border-radius:16px
							vertical-align: middle
						span
							font-size: 14px
							padding-left: 1em
					.desc
						font-size: 12px
						overflow:hidden
						text-overflow: ellipsis
						white-space: nowrap
						line-height:2
			.info-b
				height:50px
</style>