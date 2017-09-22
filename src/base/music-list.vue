<template>
	<div class="music-list-wrap" @click.stop="" v-show="show && musiclist.length>0">
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
		<div @click.stop="show = false" class="back-btn border-1px">
			<span>关闭</span>
		</div>
	</div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import BScroll from 'better-scroll'
	export default{
		data(){
			return {
				show:false
			}
		},
		computed:{
			...mapGetters(['musiclist','mode','music'])
		},
		methods:{
			...mapActions(['changePlayMode','clearMusicList','deleteMusic','selectMusic']),
			initScroll(){
				if (this.list) {
					console.log('refresh')
					this.list.refresh()
				}else{
					this.list = new BScroll(this.$refs.list,{click:true})
				}	
			},
			deletes(music){
				this.deleteMusic(music)
			}	
		},
		watch:{
			show(n,o){
				if (n == true) {
					this.$nextTick(()=>{
						this.initScroll()
					})
				}
			},
			musiclist(n,o){
				if (n.length == 0) this.show = false 
				this.$nextTick(()=>{
					this.initScroll()
				})
			}
		}
	}
</script>

<style lang='stylus'>
@import "../common/style/mixim.styl"
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
</style>