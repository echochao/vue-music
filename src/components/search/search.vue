<template>
	<div class="search-wrap">
	<div class="search">
		<input autofocus="autofocus" type="text" placeholder="搜索音乐、歌词、歌单" v-model="key" @change="search()" @keyup=""></input>
		<span @click="$router.go('-1')" class="back">取消</span>
		<span class="icon-s-delete" v-show="key!==''" @click.stop="clear()"></span>
	</div>
	<div class="hotkey" v-if="hotkey!==null" v-show="key==''">
		<p class="title">热门搜索</p>
		<div class="text">
			<ul>
				<li class="active" @click.stop="hotKeySearch(hotkey.special_key)">{{hotkey.special_key}}</li>
				<li v-for="item in hotkey.hotkey" :data-id="item.n" @click.stop="hotKeySearch(item.k)">{{item.k}}</li>
			</ul>
		</div>
	</div>
	<div class="recently"></div>
	<div class="zhida" v-if="zhida!==null" v-show="key!==''">
		<div class="singer" v-if="zhida.zhida_singer" :data-singer="zhida.zhida_singer.singerMID" @click="toList(zhida.zhida_singer.singerMID,'singer',$event)">
			<img :src="zhida.zhida_singer.singerPic">
			<div class="info">
				<p class="name">歌手:{{zhida.zhida_singer.singerName}}</p>
				<p class="num"><span>单曲:{{zhida.zhida_singer.songNum}}</span><span>专辑:{{zhida.zhida_singer.albumNum}}</span></p>
			</div>
		</div>
	</div>
	<div class="nav" v-if="song.result !== null" v-show="key!==''">
		<ul>
			<li v-for="(text,index) in searchType" @click = "moveTo(index)" :class="{active:(activeIndex == index)}">{{text}}</li>
		</ul>
	</div>
	<div ref="list" class="search-list" v-show="key!==''">
		<div>
			<swiper :options="listOption" ref='swiper'>
				<swiper-slide>
					<div  ref='songList' class="wrap">
						<div>
							<v-song-list-slider v-if="song.result!==null" :list="song.result"></v-song-list-slider>
							<p class="loading" v-show="song.pending == true">加载中...</p>
							<p class="no-result" v-if="this.song.result !== null" v-show="song.pending == !true && song.result.length == 0">没有相关结果</p>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div  ref='albumList' class="wrap">
						<div>
							<v-album-list-slider v-if="album.result!==null" :list="album.result"></v-album-list-slider>
							<p class="loading" v-show="album.pending == true">加载中...</p>
							<p class="no-result" v-if="this.album.result !== null" v-show="album.pending == !true && album.result.length == 0">没有相关结果</p>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div ref='dissList' class="wrap">
						<div>
							<v-diss-list-slider v-if="diss.result!==null" :list="diss.result"></v-diss-list-slider>
							<p class="loading" v-show="diss.pending == true">加载中...</p>
							<p class="no-result" v-if="this.diss.result !== null" v-show="diss.pending == false && diss.result.length == 0">没有相关结果</p>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div ref='lyricList' class="wrap">
						<div>
							<v-lyric-list-slider @toggleLyric="initScroll('lyricList')" v-if="lyric.result!==null" :list="lyric.result"></v-lyric-list-slider>
							<p class="loading" v-show="lyric.pending == true">加载中...</p>
							<p class="no-result" v-if="this.lyric.result !== null" v-show="lyric.pending == !true && lyric.result.length == 0">没有相关结果</p>
						</div>
					</div>
				</swiper-slide>
			</swiper>
		</div>
	</div>
</div>
</template>
<script type="text/javascript">
	import BScroll from "better-scroll"
	import SongListSlider from '@/base/song-list-slider'
	import AlbumListSlider from '@/base/album-list-slider'
	import DissListSlider from '@/base/diss-list-slider'
	import LyricListSlider from '@/base/lyric-list-slider'
	import {searchAlbum,searchDiss,searchSong,searchLyric,smartBox,hotKey} from '@/api/config.js'
	export default{
		data(){
			return{
				searchType:['单曲','专辑','歌单','歌词'],
				key:"",
				hotkey:null,
				smartPending:false,
				searchPending:false,
				song:{page:1,result:null,pending:false,total:null},
				album:{page:1,result:null,pending:false,total:null},
				diss:{page:0,result:null,pending:false,total:null},
				lyric:{page:1,result:null,pending:false,total:null},
				zhida: null,
				num:20,
				activeIndex:null,
				listOption:{
					notNextTick:true,
					initialSlide : 0,
					onInit:(swiper)=>{
						this.activeIndex = swiper.activeIndex
					},
					onSlideChangeEnd:(swiper)=>{
						this.activeIndex = swiper.activeIndex
						console.log(swiper)
					},
				},
			}
		},
		components:{
			'v-song-list-slider':SongListSlider,
			'v-album-list-slider':AlbumListSlider,
			'v-diss-list-slider':DissListSlider,
			'v-lyric-list-slider':LyricListSlider
		},
		created(){
			this.gethotKey()
		},
		activated(){
		},
		methods:{
			reset(){
				this.song = {page:1,result:null,pending:false,total:null}
				this.album = {page:1,result:null,pending:false,total:null}
				this.diss = {page:0,result:null,pending:false,total:null}
				this.lyric ={page:1,result:null,pending:false,total:null}
				this.zhida = null
			},
			clear(){
				this.key = ''
				this.reset()
			},
			moveTo(index){
				this.swiper.slideTo(index,500)
			},
			setWrapHeight(){
				let wrap = this.$refs.list.querySelectorAll('.wrap')
				if (this.zhida !== null) {				
					for (let i = 0; i < wrap.length; i++) {
						wrap[i].style.height = (window.innerHeight - 148)+'px'
					}
				}else{
					for (let i = 0; i < wrap.length; i++) {
						wrap[i].style.height = (window.innerHeight - 84)+'px'
					}
				}		
			},
			initScroll(dom_name,pillUpBack){
				if(this[dom_name]){
					this[dom_name].refresh()
					this[dom_name].pullupWatching ? this[dom_name].scrollTo(0,0,0) : this[dom_name].finishPullUp()
				}else{
					console.log('3')
					this[dom_name] = new BScroll(this.$refs[dom_name],{click:true,probeType:3,pullUpLoad:true})
					this[dom_name].on('pullingUp',()=>{
						pillUpBack()
					})
				}
			},
			getSearchAlbum(key,page,n){
				this.album.pending = true
				let t = searchAlbum(key,page,n)
				return new Promise((resolve,reject)=>{
					this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
						if (this.album.result == null) this.album.result = []
							this.$set(this.album,'result',this.album.result.concat(res.body.data.album.list))
						this.album.total = res.body.data.album.totalnum
						this.album.page++
						this.album.pending = false
						resolve()
					})
				})
			},
			getSearchDiss(key,page,n){
				this.diss.pending = true
				let t = searchDiss(key,page,n)
				return new Promise((resolve,reject)=>{
					this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
						if (this.diss.result == null) this.diss.result = []
							this.$set(this.diss,'result',this.diss.result.concat(res.body.data.list))
						this.diss.total = res.body.data.sum
						this.diss.page++
						this.diss.pending = false
						resolve()
					})
				})
			},
			getSearchSong(key,page,n){
				this.song.pending = true
				let t = searchSong(key,page,n)
				return new Promise((resolve,reject)=>{
					this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
						if (this.song.result == null) this.song.result = []
							this.$set(this.song,'result',this.song.result.concat(res.body.data.song.list))
						this.song.total = res.body.data.song.totalnum
						this.song.page++
						this.song.pending = false
						if(res.body.data.zhida.zhida_singer){
							this.zhida = res.body.data.zhida
						}else{
							this.zhida == null	
						}
						resolve()
					})
				})
			},
			getSearchLyric(key,page,n){
				this.lyric.pending = true
				let t = searchLyric(key,page,n)
				return new Promise((resolve,reject)=>{
					this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
						console.log(res)
						if (this.lyric.result == null) this.lyric.result = []
							this.lyric.total = res.body.data.lyric.totalnum
						this.lyric.result = this.lyric.result.concat(res.body.data.lyric.list)	
						this.lyric.page++
						this.lyric.pending = false
						resolve()
					})
				})
			},
			getSmartBox(key){
				if (this.smartPending) return
				this.smartPending = true
				let t = smartBox(key)
				this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
					console.log(res)
					console.log(res.data.data)
					// this.focus = res.data.data.focus
					this.smartPending = false
				})
			},
			gethotKey(){
				let t = hotKey()
				this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
					console.log(res.data.data)
					this.hotkey = res.data.data
				})
			},
			search(){
				if((/^\s?$/).test(this.key)) return
				this.reset()
				this.swiper.slideTo(0,0)
				this.getSearchSong(this.key,this.song.page,this.num).then(
					()=>{
						this.setWrapHeight()
						this.initScroll('songList',()=>{
							console.log(this.song.result.length)
							console.log(this.song.total)
							if (this.song.result.length !== this.song.total) {
								this.getSearchSong(this.key,this.song.page,this.num).then(()=>{
									this.initScroll('songList')
								})
							}
						})
					}
				)
			},
			hotKeySearch(key){
				this.key = key.replace(/(^\s+)|(\s+$)/g,"") 
				this.search()
			}
		},
		computed:{
			swiper(){
				return this.$refs.swiper.swiper
			}
		},
		watch:{
			activeIndex:function(n,o){
				switch(n){
					case 1:
					if(this.album.result !== null) return
					this.getSearchAlbum(this.key,this.album.page,this.num).then(()=>{
						this.initScroll('albumList',()=>{
							console.log(this.album.result.length)
							console.log(this.album.total)
							if (this.album.result.length !== this.album.total) {
								this.getSearchAlbum(this.key,this.album.page,this.num).then(()=>{
									this.initScroll('albumList')
								})
							}
						})
					})
					break
					case 2:
					if(this.diss.result !== null) return
					this.getSearchDiss(this.key,this.diss.page,this.num).then(()=>{
						this.initScroll('dissList',()=>{
							console.log(this.diss.result.length)
							console.log(this.diss.total)
							if (this.diss.result.length !== this.diss.total) {
								this.getSearchDiss(this.key,this.diss.page,this.num).then(()=>{
									this.initScroll('dissList')
								})
							}
						})
					})	
					break
					case 3:
					if(this.lyric.result !== null) return
					this.getSearchLyric(this.key,this.lyric.page,this.num).then(()=>{
						this.initScroll('lyricList',()=>{
							console.log(this.lyric.result.length)
							console.log(this.lyric.total)
							if (this.lyric.result.length !== this.lyric.total) {
								this.getSearchLyric(this.key,this.lyric.page,this.num).then(()=>{
									this.initScroll('lyricList')
								})
							}
						})
					})	
					break
				}
			}
		}
	}
</script>
<style lang="stylus">

@import '../../common/style/color.styl'

.search-wrap
	.search
		position:relative
		background:$main-color
		padding:6px 5px 6px 5px 
		display: flex
		color: rgba(255, 255, 255, .6)
		input
			height:32px
			line-height:32px
			border-radius:5px
			padding: 0 1em
			box-sizing: border-box
			text-align: left
			width:100%
			font-size: 14px
			background:$search-color
			color: rgba(255, 255, 255, .6)
			&::placeholder
				color: rgba(255, 255, 255, .6)
		.back
			flex: 0 0 50px	
			height:32px
			line-height:32px
			font-size: 14px
			text-align: center
		.icon-s-delete
			font-size: 14px
			position:absolute
			right:50px
			top:50%
			height:32px
			width:50px
			line-height:32px
			margin-left:-25px
			margin-top:-16px
			text-align: center				
	.hotkey
		padding:15px
		overflow:hidden
		.title
			color:$text-simple-color
			font-size: 14px
			margin-bottom:5px
		.text
			ul
				display: flex
				flex-flow: row wrap
				font-size: 0
				max-height:80px
				overflow:hidden
				li
					font-size: 12px
					display: inline-block
					box-sizing: border-box
					height:30px
					line-height:30px
					margin:5px 2px
					padding: 0px 10px
					border:1px solid $hotkey-border-color
					border-radius:14px	
					&.active
						border:1px solid $main-color
						color:$main-color					
	.nav
		height:40px
		line-height:40px
		ul
			display: flex
			font-size: 0
			li
				font-size: 14px
				flex:1
				text-align: center
				height:40px
				box-sizing: border-box
				border-bottom: 1px solid $border-color
			li.active
				color: #30c481	
				border-bottom: 2px solid $search-color	
	.zhida
		.singer
			height:64px
			display: flex
			padding: 6px 15px
			box-sizing: border-box
			img
				height:52px
				width:52px
				border-radius:26px
				flex: 0 0 52px
			.info
				flex:1
				padding-left:12px
				padding-top: 6px
				.name
					height:28px
					font-size: 14px
					line-height: 28px
				.num
					height:	18px
					font-size: 12px
					line-height: 18px
					span
						margin-right:4px				
	.loading,.no-result
		margin-top:20px
		font-size: 14px
		text-align:center
		height:40px
		line-height:40px				
</style>