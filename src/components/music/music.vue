<template>
	<div class="music">
		<div class="header">
			<div class="nav">
				<div class="nav-l">
					<i class="icon-my-list"></i>
				</div>
				<div class="nav-m">
					<span>我的</span>
					<span>音乐馆</span>
					<span>发现</span>
				</div>
				<div class="nav-r">
					<i class="icon-t-music"></i>
				</div>
			</div>
			<div class="search">
				<input type="text" placeholder="搜索">
				<p @click.stop="$router.push({path:'search'})"><span class="icon-search"></span></p>
			</div>
		</div>
		<div ref='musicScroll' class="music-scroll-wrapper">
			<div>
				<v-banner :banner="focus"></v-banner>
				<div class="link">
					<router-link :to="{path:'singer'}">
						<i class="icon-people"></i>
						<span class="text">歌手</span>
					</router-link>
					<router-link :to="{path:'rank'}">
						<i class="icon-rank"></i>
						<span class="text">排行</span>
					</router-link>
					<router-link :to="{path:''}">
						<i class="icon-fm"></i>
						<span class="text">电台</span>
					</router-link>
					<router-link :to="{path:''}">
						<i class="icon-type"></i>
						<span class="text">分类歌单</span>
					</router-link>
					<router-link :to="{path:''}">
						<i class="icon-mv"></i>
						<span class="text">视频MV</span>
					</router-link>
					<router-link :to="{path:''}">
						<i class="icon-cd"></i>
						<span class="text">数字专辑</span>
					</router-link>
				</div>
				<v-commendlist :album="album" :hotdiss="hotdiss"></v-commendlist>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
  	import {mapState} from "vuex"
	import BScroll from 'better-scroll'
	import {focusApi,albumApi,dissApi} from '@/api/config.js'
	import Banner from '@/base/banner'
	import CommendList from '@/base/commendlist'
	const focusapi = focusApi(),albumapi = albumApi(0,12,1,0),dissapi = dissApi(0,0,11)
	export default{
		data(){
			return{
				focus:[],
				album:[],
				hotdiss:[]
			}
		},
		components:{
			'v-banner':Banner,
			'v-commendlist':CommendList
		},
		methods:{
			initMuciScroll(){
				if (this.musicScroll) {
					this.musicScroll.refresh()
				}else{
					this.musicScroll = new BScroll(this.$refs.musicScroll,{click:true})
				}
			}
		},
		mounted(){
			this.$http.jsonp(focusapi.url,{params:focusapi.params,jsonpCallback:focusapi.callback}).then((res)=>{
				console.log(res)
				this.focus = res.data.data.focus
				this.$nextTick(()=>{
					this.initMuciScroll()
				})
			})
			this.$http.jsonp(albumapi.url,{params:albumapi.params,jsonpCallback:albumapi.callback}).then((res)=>{
				console.log(res)
				this.album = res.data.data.albumlist
				this.$nextTick(()=>{
					this.initMuciScroll()
				})
			})
			this.$http.jsonp(dissapi.url,{params:dissapi.params,jsonpCallback:dissapi.callback}).then((res)=>{
				console.log(res)
				this.hotdiss = res.data.data.list
				this.$nextTick(()=>{
					this.initMuciScroll()
				})
			})
		},
		activated(){
			this.initMuciScroll()
		},
		computed:{
			...mapState({
				count:'count'
			})
		}
	}
</script>

<style lang="stylus">
@import '../../common/style/color.styl'
.music
	height:100%
	.header
		background:$main-color
		.nav
			height:40px
			line-height:40px
			padding:5px
			display: flex
			color:#fff
			.nav-l,.nav-r
				width:32px
				text-align: center
				i
					font-size:20px
					line-height:40px
					font-weight: bold
			.nav-m
				flex: 1 1 auto
				display: flex
				span
					flex:1
					text-align: center	
					color:#fff
					&.active
						font-weight: bold
		.search
			position:relative
			padding:0 5px 6px 5px 
			input
				height:32px
				width:100%
				border-radius:5px
				padding: 0 5px
				box-sizing: border-box
				text-align: center
				font-size: 12px
				background:$search-color
				z-index:-99
				&::placeholder
					color:$placeholder-color
			p
				position:absolute
				width:100%
				top:0
				left:0
				height:32px
				padding: 0 5px
				box-sizing: border-box
				span
					font-size:14px
					position:absolute
					height:32px
					width:32px
					line-height:32px
					left:50%
					top:50%
					margin-top:-16px
					margin-left:-16px-(24px)
					color:$text-color
	.link
		margin-top:15px
		display: flex
		flex-flow: row wrap
		justify-content: space-between
		width:100%
		overflow:hidden
		font-size: 0
		@media screen and (max-width: 375px)
			a
				text-indent: 1em!important
			.text
				margin-left: 0em!important
		a
			display: inline-block
			box-sizing: border-box
			flex:1
			font-size: 12px
			min-width:33%
			height:50px
			line-height:50px
			text-indent: 5%
			i
				font-size: 30px
				color:$icon-color
				padding:0
				vertical-align:baseline
			.text
				font-size: 14px
				vertical-align: super
				color:#000
				margin-left:1em				
	.music-scroll-wrapper
		overflow:hidden
		position:absolute
		width:100%
		top:88px
		bottom:0
</style>