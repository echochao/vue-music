<template>
	<div class="singer">
		<v-list-header class="list-t" :logo="this.getSingerImg(singer.singer_mid)" :title="singer.singer_name" :type="''" v-if="singer!==null" ref="header"></v-list-header>
		<div class="list-scroll" ref="listScroll">
			<div>
				<div class="list-info" v-if="singer!==null" ref="info">
					<div class="info-t">
						<div class="logo">
							<img :src="this.getSingerImg(singer.singer_mid)">
						</div>
					</div>
					<div class="info-b">
						<p class="people">{{singer.singer_name}}</p>
					</div>				
				</div>
				<v-song-list-slider v-if="singer!==null" :list="singer.list" :more="true" :top="true"></v-song-list-slider>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll'
	import {singerInfo} from '@/api/config.js'
	import {isTitleMove} from '@/common/js/common.js'
	import SongListSlider from '@/base/song-list-slider'
	import ListHeader from '@/base/list-header'
	export default{
		data(){
			return{
				singer:null,
				pending:false,
				begin:0,
				num:20,
				end:false,
			}
		},
		components:{
			'v-song-list-slider':SongListSlider,
			'v-list-header':ListHeader
		},
		activated(){
			this.singer = null
			this.begin = 0
			this.end = false
			this.pending = false
			this.getSingerInfo(this.$route.query.id,this.begin,this.num)
		},
		methods:{
			getSingerInfo(id,b,n){
				if (this.end ||this.penging) return
				this.pending = true
				let singerinfo = singerInfo(id,b,n)
				this.$http.jsonp(singerinfo.url,{params:singerinfo.params,jsonpCallback:singerinfo.callback}).then((res)=>{
					let singer = res.data.data
					if (singer.total == this.begin) {this.end = true}
					for (let i = 0; i <singer.list.length; i++) {
						singer.list[i] = singer.list[i].musicData
					}
					if (this.singer == null) this.singer = singer
					this.$set(this.singer,'list',this.singer.list.concat(singer.list))
					this.begin = this.singer.list.length
					this.pending = false
					this.$nextTick(()=>{
						this.initScroll()
					})
				})
			},
			getSingerImg(id){
				return	'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+id+'.jpg'
			},
			initScroll(){
				if (this.listScroll) {
					this.listScroll.refresh()
					this.listScroll.pullupWatching ? this.listScroll.scrollTo(0,0,0) : this.listScroll.finishPullUp()
				}else{
					this.listScroll = new BScroll(this.$refs.listScroll,{pullUpLoad:true,click:true,probeType:3})
					this.listScroll.on('pullingUp',()=>{
						this.getSingerInfo(this.$route.query.id,this.begin,this.num)
					})
					this.listScroll.on('scroll',(pos)=>{
						console.log(pos.y)
						if (pos.y<0 && pos.y>-175) {
							this.$refs.info.style.opacity = (pos.y+175)/175
						}
						if (this.$refs.header.move == null && pos.y<-175) {
							this.$refs.header.move = isTitleMove(this.singer.singer_name,18,window.innerWidth-120)
						}
						if (this.$refs.header.move !== null && pos.y>-175) {
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
.singer
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
			overflow:hidden
			text-align: center
			.info-t
				box-sizing: border-box
				padding: 15px
				height:175px
				width:100%
				overflow:hidden
				img
					height:145px
					width:145px
			.info-b
				height:50px
				line-height:50px
				font-size: 18px
				color:#fff		
</style>			