<template>
	<div class="audio">
		<audio controls id="audio" ref="audio":src="songurl"></audio>
		<transition name="control">
			<div class="control" v-if='songurl!==null' v-show="!musiclist_show">
			<div class="info">
				<img alt="" :src="imgurl" @click.stop="lyriclist_show = true" class="rotate" :class="{paused:(playing==false)}">
				<div>
					<p class="name">{{songname}}</p>
					<p class="lyric">{{activeLyric}}</p>
				</div>
			</div>
			<div class="icon">
				<v-circular :progress='circularProgerss'></v-circular>
				<span :class="{'icon-play':!playing,'icon-stop':playing}" @click.stop="control"></span>
			</div>
			<div class="icon">
				<span class="icon-music-list" @click.stop="musiclist_show = !musiclist_show"></span>
			</div>
		</div>
		</transition>
		<transition name="control">
		<div class="music-list-wrap" @click.stop="" v-show="musiclist_show && musiclist.length>0">
			<div class="bar border-1px">
				<div class="play-mode">
					<div  v-show="mode == 1"><span @click.stop="changePlayMode()" class="icon-x-play"></span><i>顺序循环{{musiclist.length}}首</i>
					</div>
					<div  v-show="mode == 2"><span @click.stop="changePlayMode()" class="icon-r-play"></span><i>随机播放{{musiclist.length}}首</i>
					</div>
					<div  v-show="mode == 0"><span @click.stop="changePlayMode()" class="icon-d-play"></span><i>单曲循环</i>
					</div>
				</div>
				<div class="clear-list icon-delete" @click.stop="clearMusicList()"></div>
			</div>
			<div ref="list" class="music-list">
				<transition-group tag="ul" name="music-list">
					<li class="border-1px" :class="{active:(music.id === item.id)}" v-for="(item,index) in musiclist" :key='index' @click.stop="selectMusic({id:item.id,img:item.img,name:item.name,singer:item.singer})">
						<div class="info">
							<span class="name">{{item.name}}</span>
							<span class="singer icon"> - {{item.singer[0].name}}</span>
						</div>
						<div class="love icon-love" @click.stop=""></div>
						<div class="delete icon-s-delete" @click.stop="deleteMusic({id:item.id})"></div>
					</li>
				</transition-group>
			</div>
			<div @click.stop="musiclist_show = false" class="back-btn border-1px">
				<span>关闭</span>
			</div>
		</div>
		</transition>
		<div class="player" v-show="lyriclist_show">
			<div class="bg">
				<img :src="imgurl" alt="" v-if="imgurl!==null"></img>
				<div></div>
			</div>
			<div class="header">
				<span class="back icon-back" @click.stop="lyriclist_show = false"></span>
				<span class="title">
					<span v-if="lyrics!==null">{{lyrics.ti}}</span>
					<span v-else></span>
				</span>
				<span class="more icon-ellipsis"></span>
			</div>
			<swiper class="swiper" :options="listOption">
				<swiper-slide>
					<div class="image">
						<div class="image-wrapper">
							<img  class="rotate" :class="{paused:(playing==false)}" alt="" id="image" :src="imgurl" v-if="imgurl!==null">
						</div>
						<div class="image-lyric">{{activeLyric}}</div>
					</div>
				</swiper-slide>
				<swiper-slide>
					<div class="lyric" ref="lyricList">
						<div>
							<ul v-if="lyrics!==null">
								<li v-for="item in lyrics.text" :class="{hidden:(item == '')}">{{item}}</li>
							</ul>
						</div>
					</div>
				</swiper-slide>
			</swiper>
			<div class="progress">
				<div class="current" v-if="!isMove">{{getTime(Math.floor(currentTime))}}</div>
				<div class="current" v-else><i>{{getTime(Math.floor(barProgress*duration))}}</i></div>
				<div class="progress-wrap" @click.stop="changeProgress($event)">
					<div class="progress-bar">
						<div class="bar" ref="bar"><div class="bar-control" @click.stop=""><span ref="ball"></span></div></div>
					</div>
				</div>				
				<div class="duration">{{getTime(Math.floor(duration))}}</div>
			</div>
			<div class="music-control">
				<div class="l-type">
					<span  v-show="mode == 1" class="icon-x-play" @click.stop="changePlayMode()"></span>
					<span v-show="mode == 2" class="icon-r-play" @click.stop="changePlayMode()"></span>
					<span v-show="mode == 0"class="icon-d-play" @click.stop="changePlayMode()"></span>
				</div>
				<div><span @click="prev({id:songid})" class="icon-prev"></span></div>
				<div><span @click="control" :class="{'icon-play':!playing,'icon-stop':playing}"></span></div>
				<div><span @click="next({id:songid})" class="icon-next"></span></div>
				<div class="r-list" ><span @click="" class="icon-love"></span></div>
			</div>	
		</div>
	</div>
</template>

<script>
import BScroll from 'better-scroll'
import Base64 from "js-base64"
import {lyricApi} from '@/api/config.js'
import Circular from '@/base/circular-progress.vue'
import {mapGetters,mapMutations,mapActions} from 'vuex'
	export default{
		data(){
			return {
				musiclist_show : false,
				lyriclist_show : false,
				listOption:{
					notNextTick:true,
					initialSlide : 0,
					onAfterResize:(swiper)=>{
						this.$refs.bar.style.width = (0.72*window.innerWidth-16)+'px'
					}
				},
				lyrics:null,
				currentTime:0,
				duration:0,
				activeLyric:null,
				activeIndex:null,
				isMove:false,
				barProgress:0,
				circularProgerss:0,
				autoNext:false
			}
		},
		created(){
			
		},
		mounted(){
			this.$refs.bar.style.width = (0.72*window.innerWidth-16)+'px'
			this.$refs.bar.addEventListener('touchstart',(e)=>{
				this.onMove(e)
			})
			this.$refs.bar.addEventListener('touchmove',(e)=>{
				this.moveProgress(e)
			})
			this.$refs.bar.addEventListener('touchend',(e)=>{
				this.offMove(e)
			})
			this.$refs.audio.addEventListener('canplay',()=>{
				this.duration = this.$refs.audio.duration
				// this.$refs.audio.buffered.end(0)
			})
			this.$refs.audio.addEventListener('ended',()=>{
				this.autoNext = true
				this.mode == 0 ? this.setCurrentTime(0) : this.next({id:this.songid})
			})
			this.$refs.audio.addEventListener('timeupdate',()=>{
				this.currentTime = this.$refs.audio.currentTime
			})
			if (this.songid !== null) {
				this.getLyric(this.songid).then((data)=>{
					let lyrics = Base64.Base64.decode(data).split('\n')
					// console.log(lyrics)
					this.lyrics = this.setLyric(lyrics)
				})
			}
		},
		computed: {
			...mapGetters(['songid','songurl','imgurl','songname','songsinger','musiclist','mode','music','playing']),
			progress(){
				return this.currentTime/this.duration
			}
		},
		components:{
			'v-circular':Circular
		},
		methods:{
			...mapMutations(['SET_PLAYING']),
			...mapActions(['changePlayMode','clearMusicList','deleteMusic','selectMusic','next','prev']),
			control(){
				if(this.$refs.audio.paused){
					this.$refs.audio.play()
					this.SET_PLAYING(true)
				}else{
					this.$refs.audio.pause()
					this.SET_PLAYING(false)
				}
			},
			initScroll(){
				if (this.list) {
					this.list.refresh()
				}else{
					this.list = new BScroll(this.$refs.list,{click:true})
				}	
			},
			initLyricScroll(){
				if (this.lyricList) {
					this.lyricList.refresh()
				}else{
					this.lyricList = new BScroll(this.$refs.lyricList,{click:true})
					console.log(this.lyricList)
				}	
			},
			LyricScrollTo(n){
				let dom = this.$refs.lyricList.querySelectorAll('li')
				for (let i = 0; i < dom.length; i++) {
					dom[i].style.color = "rgba(255, 254, 247, .4)"
				}
				if(this.lyricList){
					dom[n].style.color = "#31c27c"
					let t = (this.lyrics.time[n]-this.lyrics.time[n-1])*1000
					if(!this.lyrics.time[n-1]){
						t = (this.lyrics.time[n])*1000
					}
					this.isMove ? this.lyricList.scrollToElement(dom[n],0,0,-180) : this.lyricList.scrollToElement(dom[n],t,0,-180)
				}
			},
			getLyric(id){
				// console.log(id)
				let t = lyricApi(id)
				return new Promise((resolve,reject)=>{
					this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
						resolve(res.data.lyric)
					})
				})
			},
			setLyric(arr){
				let lyric = {ti:null,ar:null,al:null,by:null,offset:null,time:[],text:[]}, 
				tiRegExp = /\[ti:([\s\S]*)]/,
				arRegExp = /\[ar:([\s\S]*)]/,
				alRegExp = /\[al:([\s\S]*)]/,
				byRegExp = /\[by:([\s\S]*)]/,
				offsetRegExp = /\[offset:([\s\S]*)]/,
				lyricRegExp = /\[(\d*):(\d*)[\.\:](\d*)]([\d\D]*)/,
				index = 0
				for (let i = 0; i < arr.length; i++) {
					if(tiRegExp.test(arr[i])){
						lyric.ti = arr[i].match(tiRegExp)[1]
						continue
					}
					if(arRegExp.test(arr[i])){
						lyric.ar = arr[i].match(arRegExp)[1]
						continue
					}
					if(alRegExp.test(arr[i])){
						lyric.al = arr[i].match(alRegExp)[1]
						continue
					}
					if(byRegExp.test(arr[i])){
						lyric.by = arr[i].match(byRegExp)[1]
						continue
					}
					if(offsetRegExp.test(arr[i])){
						lyric.offset = Math.floor(arr[i].match(offsetRegExp)[1])
						continue
					}
					if(lyricRegExp.test(arr[i])){
						let res = arr[i].match(lyricRegExp)
						let time = parseInt(res[1])*60+parseInt(res[2])+parseInt(res[3])/100
						lyric.time[index] = time
						lyric.text[index] = arr[i].match(lyricRegExp)[4]
						index++
						continue
					}
				}
				return lyric.text.length > 0 ?  lyric :  null
			},
			getTime(second){
				if(Math.floor(second)==0) return "00:00"
				let m = Math.floor(second/60)
				if(m<10){
					m='0'+m
				}
				let s = second%60
				if(s<10){
					s='0'+s
				}
				return (m+':'+s)
			},
			getActiveLyric(time,lyrics){
				let temp = {text:lyrics.text[lyrics.text.length-1],index:lyrics.time.length-1}
				for(let i in lyrics.time){
					if (time<lyrics.time[i]) {
						temp = i == 0 ? {text: lyrics.text[i],index:i} : {text: lyrics.text[i-1],index:i-1}
						break

					}
				}
				this.activeLyric = temp.text
				this.activeIndex = temp.index	
			},
			onMove(e){
				this.isMove = true
			},
			offMove(e){
				if(this.isMove){
					this.isMove = false
					this.setCurrentTime(this.barProgress)
				}
			},
			moveProgress(e){
				if(this.isMove){
					let x
					if(e.x){
						x = e.x
					}else{
						x = e.touches[0].pageX
					}
					if((x-0.14*window.innerWidth)/(0.72*window.innerWidth)>= 1){
						this.barProgress = 1
						return
					}
					if((x-0.14*window.innerWidth)/(0.72*window.innerWidth)<= 0){
						this.barProgress = 0
						return
					}
					this.barProgress = (x-0.14*window.innerWidth)/(0.72*window.innerWidth)
					this.setBarProgress(this.barProgress)

				}
			},
			changeProgress(e){
				this.barProgress = (e.x-0.14*window.innerWidth)/(0.72*window.innerWidth)
				this.setBarProgress(this.barProgress)
				this.setCurrentTime(this.barProgress)
			},
			setBarProgress(n){
				this.$refs.bar.style.transform = "translate3D(" + n*100 + "%,0,0)"
				this.circularProgerss = n.toFixed(2)
			},
			setCurrentTime(n){
				this.$refs.audio.currentTime = this.$refs.audio.duration*n
				if (this.$refs.audio.paused == true) {
					this.control()
				}
			}

		},
		watch:{
			songid(n,o){
				this.$nextTick(()=>{
					this.lyrics = null
					this.activeLyric = null
					this.activeIndex = null
					if (n == null) {
						this.musiclist_show = false
						if (this.$refs.audio.paused == false) {
							this.control()
						}
						return
					}
					if (!this.musiclist_show && this.autoNext == false) {
						this.lyriclist_show = true
					}
					this.autoNext = false
					if (this.$refs.audio.paused == true) {
						this.control()
					}
					this.getLyric(this.songid).then((data)=>{
						let lyrics = Base64.Base64.decode(data).split('\n')
						this.lyrics = this.setLyric(lyrics)
						this.$nextTick(()=>{
							this.initLyricScroll()	
						})	
					})
				})
			},
			musiclist(){
				if (this.musiclist_show == false) {return}
				this.$nextTick(()=>{
					this.initScroll()
				})
			},
			musiclist_show(n){
				if (n == false) {return}
				this.$nextTick(()=>{
					this.initScroll()
				})	
			},
			lyriclist_show(n){
				if (n == false) {return}
				this.$nextTick(()=>{
					this.initLyricScroll()	
					if (this.activeIndex == null) {return}
					this.LyricScrollTo(this.activeIndex)
				})	
			},
			currentTime(n,o){
				if(this.lyrics !== null && this.isMove == false){
					this.getActiveLyric(n,this.lyrics)
				}
				if(!this.isMove){
					this.setBarProgress(this.progress)
				}
			},
			barProgress(n,o){
				if (Math.abs(n-o)*this.duration<1) {
					return
				}
				if(this.lyrics !== null){
					this.getActiveLyric(n*this.duration,this.lyrics)
				}
			},
			activeIndex(n){
				// console.log(this.lyrics)
				// console.log( this.lyriclist_show)
				if (this.lyrics == null || this.lyriclist_show == false) {return}
				this.LyricScrollTo(n)
			}
		}
	}
</script>

<style lang='stylus'>

@keyframes rotate
	0%   {transform: rotateZ(0deg)}
	100% {transform: rotateZ(360deg)}
	
.control-enter-active
	transition: all .5s .5s
.control-leave-active
	transition: all .5s
.control-enter
	transform: translateY(100%)
.control-leave-to
	transform: translateY(100%)		
		
	
.audio
	width:100%
	position:fixed
	bottom:0
	z-index:99
	#audio
		display:none
	.control
		overflow:hidden
		padding 4px 15px
		display: flex
		height:56px
		box-sizing: border-box
		background:	rgba(245, 245, 245, .8)
		border-top-1px(#dadada)
		div
			&.icon
				flex: 0 0 48px
				width: 48px
				text-align: right
				display: inline-block
				font-size: 28px
				color:#31c27c
				position:relative
				.circular-progress
					transform-origin: left top
					position:absolute
					top:50%
					left:50%
					margin-left:-13px
					margin-top:-13px
					transform: scale(.26)
				.icon-play,.icon-stop
					position:absolute
					top:50%
					left:50%
					margin-left:-14px
					margin-top:-14px	
				.icon-music-list
					line-height:52px
			&.info
				flex: auto
				display: flex
				overflow:hidden
				img
					flex:0 0 48px
					height:48px
					width:48px
					border-radius: 24px	
					vertical-align: top
					&.rotate
						animation: rotate 20s linear infinite
					&.paused
						animation-play-state: paused			
				div
					flex:auto
					padding: 4px 20px 4px 10px
					overflow:hidden
					.name
						font-size: 14px
						line-height: 20px
						text-overflow: ellipsis
						white-space: nowrap
						overflow:hidden
					.lyric
						font-size: 12px
						line-height: 20px
						text-overflow: ellipsis
						white-space: nowrap
						overflow:hidden	
	.music-list-wrap
		position: fixed
		width:100%
		top:25%
		bottom:0
		background:	rgba(245, 245, 245, .8)
		overflow: hidden
		.music-list
			position:absolute
			background:	rgba(245, 245, 245, 1)
			width:100%
			top:50px
			bottom:50px
			z-index:-1
			ul
				li
					display: flex
					font-size: 14px
					height:52px
					line-height:52px
					overflow:hidden
					text-overflow: ellipsis
					white-space: nowrap	
					margin: 0 15px
					background:	rgba(245, 245, 245, .8)
					transition: all .3s
					&.music-list-enter, &.music-list-leave-to
						opacity: 0
						transform: translate3d(0,-100%,0)
					&.music-list-leave-active
						position:absolute
					border-bottom-1px(#dadada)
					.info
						flex: auto
						overflow: hidden
						text-overflow: ellipsis
						white-space: nowrap
						.name
							font-size: 14px
						.singer
							font-size: 10px
					.love
						font-size: 18px
						line-height:52px
						text-align: center
						padding: 0 18px			
					.delete
						font-size: 22px
						line-height:52px
						text-align: center
						padding: 0 18px		
					&.active
						color:#36bc87
					&:last-child
						border-none()						
		.bar
			height:50px
			line-height:50px
			background:	rgba(245, 245, 245, 1)	
			display: flex
			font-size: 14px
			border-bottom-1px(#dadada)
			&>div
				margin: 0 15px
				&.play-mode
					flex:auto
					div
						height:50px
						line-height:50px
						span
							display: inline-block
							height:50px
							line-height:50px
							font-size: 22px
							vertical-align:middle
							padding-right:10px
						i
							font-size: 14px
				&.clear-list
					line-height:50px
					text-align: center	
					padding:0 15px
					font-size: 22px					
		.back-btn
			position:absolute!important
			font-size: 14px
			background:	rgba(245, 245, 245, 1)
			height:52px
			line-height:52px
			width:100%
			bottom:0
			text-align:center
			border-top-1px(#dadada)												
	.player
		position: fixed
		width:100%
		top:0
		bottom:0
		background:#fff
		overflow: hidden
		.bg
			height:100%
			width:100%
			position:absolute
			z-index: -99
			img
				position:absolute
				height:100%
				width:100%
				filter:blur(10px)
			div
				position:absolute
				height:100%
				width:100%
				background:rgba(0, 0, 0, .75)	
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
				transform: rotate(-90deg);
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
				overflow:hidden
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
		.progress
			position:absolute
			height:30px
			line-height:30px
			width:100%
			bottom:100px
			font-size: 0
			div
				display: inline-block
				vertical-align: middle
				&.progress-wrap
					width:72%
					line-height:30px
					position:relative
					overflow:hidden
					.progress-bar
						position:relative
						height:2px
						background:#6d6462
						width:100%
						.bar
							position:absolute
							height:2px
							width: 0
							right:100%
							top:0
							background:green
							div
								height:30px
								width:30px
								line-height:30px
								text-align: center
								position:absolute
								z-index:99999
								right:-23px
								top:-14px
								span
									display: inline-block
									height:16px
									width:16px
									vertical-align: middle
									border-radius:8px
									background:#32c37b														
				&.current
					width:14%
					font-size: 12px
					text-align: right
					box-sizing: border-box
					padding-right:10px
					color:#6d6462
					i
						font-size: 14px
				&.duration
					width:14%
					font-size: 12px
					text-align: left
					box-sizing: border-box
					padding-left:10px
					color:#6d6462				
		.music-control
			position:absolute
			bottom:30px
			width:100%	
			display: flex
			height:60px
			line-height:60px
			div
				flex: 1
				text-align: center
				color:#32c37b
				font-size: 36px
				&.l-type,&.r-list
					font-size: 32px
					flex: 0 0 80px
					overflow:hidden
				span
					line-height:60px
					&.icon-stop
						font-size: 44px	
					&.icon-play
						font-size: 44px			
</style>