<template>
	<div class="song-list-slider" ref="listSlider">
		<ul class="song">
			<li class="top border-1px" v-if="top">
				<div class="top-l">
				<i class="icon-play" @click="playAll(list)"></i>
				<span>随机播放全部<i class="total-num">共{{list.length}}首</i></span>
				</div>
			</li>
			<li v-for="item,index in list" :data-id="item.songid"  :class="{active:(music.id === item.songid)}" class="border-1px" @click.stop="selectMusic({id:item.songid,img:item.albummid,name:item.songname,singer:item.singer})">
				<div class="text">
					<div class="num" v-if="left">{{index+1}}</div>
					<div class="no-num" v-else></div>
					<div class="info">
						<p class="name"><i>{{item.songname}}</i><span class="icon-sq" v-show="item.sizeape"></span><span class="icon-hq" v-show="!item.sizeape"></span><span class="icon-dj" v-show="item.isonly == 1"></span><span class="icon-mv" v-show="item.media_mid"></span></p>
					<p class="singer">
						<span v-for="(singer,index) in item.singer">{{singer.name}}<i v-if="index!=item.singer.length-1"> / </i></span>
						<span v-if="item.albumname"> · {{item.albumname}}</span>
					</p>
					</div>
					<div class="more icon-ellipsis"  @click.stop="" v-if="more"></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapMutations,mapGetters,mapActions} from 'vuex'
	export default{
		props:{
			list:{
				type:Array,
				default:(()=>{
					return []
				})
			},
			top:{
				default: false
			},
			left:{
				default: false
			},
			more:{
				default: false
			}
		},
		mounted(){
			this.$refs.listSlider.style.paddingBottom = window.innerHeight - 146 - 52*this.list.length + 56 +'px'
		},
		methods:{
			...mapActions(['randomPlayAll','selectMusic']),
			playAll(list){
				let arr = []
				for(let item of list){
					let music = {'id':item.songid,'name':item.songname,'img':item.albummid,'singer':item.singer}
					arr.push(music)
				}
				this.randomPlayAll(arr)	
			}
		},
		computed:{
			...mapGetters(["music"]),
			
		}
	}
</script>

<style lang="stylus">

@import '../common/style/color.styl'
@import '../common/style/mixim.styl'

.song-list-slider
	background:#fff
	padding-bottom:56px
	.song
		li
			height:52px
			line-height:52px
			margin-left:15px
			padding:6px 0 5px 0
			border-bottom-1px($border-color)
			box-sizing: border-box
			&.top
				display:flex
				padding-left:15px
				margin-left:0
				line-height:40px
				.top-l
					flex:auto	
				.icon-play
					color:$icon-color
					font-size: 24px
					padding-right:8px
					vertical-align: middle
					font-weight: bold
				span
					font-size: 14px
					.total-num
						font-size:12px
						padding-left:1em	
					
			&:last-child
				border-none()	
			.text
				border-left:4px solid #fff
				height:40px
				margin-left:-15px
				display: flex
				transition: all .3s
				.num
					flex: 0 0 30px
					text-align: center
					line-height:40px
				.no-num
					flex: 0 0 15px						
				.info
					flex:1
					overflow:hidden
					.name
						font-size: 16px
						line-height:20px
						display: flex
						i
							overflow:hidden
							text-overflow: ellipsis
							white-space: nowrap
						span
							flex: 0 0 20px
							text-align: center
					.singer
						font-size: 12px
						line-height:20px
						color:$singer-color
						overflow: hidden
						text-overflow:ellipsis
						white-space: nowrap
				.more
					flex: 0 0 50px
					line-height:40px
					text-align: center
					font-size: 20px	
					color:$more-color
			&.active
				.text
					border-left:4px solid $icon-color
					.name,.singer
						color:$icon-color
</style>