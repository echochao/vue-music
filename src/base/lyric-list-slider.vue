<template>
	<div class="lyric-list-slider" ref="listSlider">
		<ul class="lyric">
			<li v-for="(item,index) in list" :data-id="item.songid" class="border-1px"d>
				<div class="text">
					<p class="name"><i>{{item.songname}}</i><span class="icon-sq" v-show="item.sizeape"></span><span class="icon-hq" v-show="!item.sizeape"></span><span class="icon-dj" v-show="item.isonly == 1"></span><span class="icon-mv" v-show="item.media_mid"></span></p>
					<p class="singer">
						<span v-for="(singer,index) in item.singer">{{singer.name}}<i v-if="index!=item.singer.length-1"> / </i></span>
						<span v-if="item.albumname"> · {{item.albumname}}</span>
					</p>
					<i class="more icon-ellipsis"  @click.stop="" v-if="right"></i>
				</div>
				<div class="content">
					<ul class="text" v-show="lyric_show[index]">
						<li v-for="item in (getArr(item.content))">{{htmlDecode(item)}}</li>
					</ul>
					<div class="toggle" @click.stop="toggleLyric(index)" v-if="lyric_show[index]">关闭歌词 <i class="triangle-t"></i></div>
					<div class="toggle" @click.stop="toggleLyric(index)" v-else>展开歌词 <i class="triangle-b"></i></div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:(()=>{
					return []
				})
			},
			right:{
				default: false
			}
		},
		data(){
			return({
				lyric_show:[]
			})
		},
		mounted(){
			for(let n of this.list){
				this.lyric_show.push(false)
			}
		},
		methods:{
			getArr(string){
				return string.split('\\n')
			},
			htmlDecode(input){
				var converter = document.createElement("DIV")
				converter.innerHTML = input
				var output = converter.innerText
				converter = null
				return output
			},
			toggleLyric(n){
				// if(!e.forwardedTouchEvent && !e. _constructed) return
				this.$set(this.lyric_show,n,!this.lyric_show[n])
				this.$nextTick(()=>{
					this.$emit('toggleLyric')
				})
			}
		}
	}
</script>

<style lang="stylus">

@import '../common/style/color.styl'
@import '../common/style/mixim.styl'

.lyric-list-slider
	background:#fff
	padding-bottom:56px
	.lyric
		&>li
			margin-left:15px
			padding:5px 0 5px 0
			border-bottom-1px($border-color)
			box-sizing: border-box					
			&:last-child
				border-none()	
			&>.text
				border-left:4px solid #fff
				padding:0 50px 0 15px
				margin-left:-15px
				position:relative
				transition: all .3s					
				p
					line-height:20px
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				.name
					font-size: 16px
				.singer
					font-size: 12px
					color:$singer-color
				.more
					position:absolute
					height:52px
					line-height:52px
					width:50px
					right:0
					top:-6px
					text-align: center
					font-size: 20px	
					color: #ccc
			&.active
				.text
					border-left:4px solid $main-color
					.name,.singer
						color:$main-color
			.content
				margin-top:15px
				padding-left:4px
				.text
					font-size: 12px
					line-height:20px
				.toggle
					height:20px
					line-height:20px
					margin:5px 0
					font-size: 12px
					.triangle-t
						display: inline-block
						height:0
						width:0
						border:4px solid $border-color
						border-color:transparent transparent $border-color transparent
					.triangle-b
						display: inline-block
						height:0
						width:0
						border:4px solid $border-color
						border-color:$border-color transparent transparent transparent				
</style>