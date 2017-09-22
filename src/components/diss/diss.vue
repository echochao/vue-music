<template>
	<div class="diss">
		<v-list-header class="list-t" :logo="cdlist.logo" :title="cdlist.dissname" :type="type" v-if="cdlist!==null" ref="header"></v-list-header>
		<div class="list-scroll" ref="listScroll">
			<div>
				<div class="list-info" v-if="cdlist!==null" ref="info">
					<div class="info-t">
						<div class="logo">
							<img :src="cdlist.logo">
							<p class="text">访问量{{this.getNum(cdlist.visitnum)}}万</p>
						</div>
						<div>
							<p class="title">{{cdlist.dissname}}</p>
							<p class="people" :data-id="cdlist.singerid">
								<img :src="cdlist.headurl">
								<span class="name">{{cdlist.nickname}}</span>
							</p>
							<p class="desc">简介：{{cdlist.desc}}</p>
						</div>
					</div>
					<div class="info-b">
					</div>				
				</div>
				<v-song-list-slider v-if="cdlist!==null" :list="cdlist.songlist" :more="true" :top="true"></v-song-list-slider>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
	import BScroll from 'better-scroll'
	import {dissInfo} from '@/api/config.js'
	import {isTitleMove} from '@/common/js/common.js'
	import SongListSlider from '@/base/song-list-slider'
	import ListHeader from '@/base/list-header'
	export default{
		data(){
			return{
				cdlist:null,
				type:'歌单'
			}
		},
		components:{
			'v-song-list-slider':SongListSlider,
			'v-list-header':ListHeader
		},
		activated(){
			this.cdlist = null
			this.getDissInfo(this.$route.query.id)
		},
		methods:{
			getDissInfo(id){
				let dissinfo = dissInfo(id)
				this.$http.jsonp(dissinfo.url,{params:dissinfo.params,jsonpCallback:dissinfo.callback}).then((res)=>{
					this.cdlist = res.data.cdlist[0]
					this.$nextTick(()=>{
						console.log(this.cdlist)
						this.initScroll()
						this.listScroll.scrollTo(0,0,0)
					})
				})
			},
			initScroll(){
				if (this.listScroll) {
					this.listScroll.refresh()
				}else{
					this.listScroll = new BScroll(this.$refs.listScroll,{click:true,probeType:3})
					this.listScroll.on('scroll',(pos)=>{
						// console.log(pos.y)
						if (pos.y<0 && pos.y>-225) {
							this.$refs.info.style.opacity = (pos.y+225)/225
						}
						if (this.$refs.header.move == null && pos.y<-225) {
							this.$refs.header.move = isTitleMove(this.cdlist.dissname,18,window.innerWidth-120)
						}
						if (this.$refs.header.move !== null && pos.y>-225) {
							this.$refs.header.move = null
						}
					})
				}
			},
			getNum(n){
				return parseFloat(n/10000).toFixed(1)
			}
		},
		computed:{
		}
	}
</script>

<style lang="stylus">
.diss
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