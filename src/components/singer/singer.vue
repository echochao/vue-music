<template>
	<div class="singer">
		<v-common-header :title="'歌手'"></v-common-header>
		<div class="scroll" ref="scroll">
			<div>
				<div class="tag">
					<div class="aera-tag">
						<ul class="border-1px">
							<li v-for="(item,index) in aeratag" @click.stop="aeratagActive = index" :data-key='item.key'><a href="javascript:;"  :class="{active:(index==aeratagActive)}">{{item.text}}</a></li>
						</ul>
					</div>
					<div class="sex-tag">
						<ul class="border-1px" ref="tagbottom">
							<li v-for="(item,index) in sextag" @click.stop="sextagActive = index" :data-key='item.key' ><a href="javascript:;" :class="{active:(index==sextagActive)}">{{item.text}}</a></li>
						</ul>
					</div>
				</div>
				<div class="hot-line"><span>热门</span><span> {{aeratag[aeratagActive].text}}</span>
					<span v-if="sextagActive!==null">{{sextag[sextagActive].text}}</span></div>
				<div class="result">
					<ul v-if="result !== null">
						<li v-for="item in result.list" :data-id="item.Fsinger_mid" @click.stop="$router.push({path:'singerlist',query: { id: item.Fsinger_mid}})">
							<img :src="getSingerImg(item.Fsinger_mid)">
							<div class="text">
								<p class="name">{{item.Fsinger_name}}</p>
								<span class="icon-back"></span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script type="text/javascript">
import BScroll from 'better-scroll'
import CommonHeader from '@/base/common-header.vue'
import {singerList} from "@/api/config.js" 
	export default{
		data(){
			return{
				aeratag:[{text:'全部',key:'all'},{text:'华语',key:'cn'},{text:'韩国',key:'k'},{text:'日本',key:'j'},{text:'欧美',key:'eu'}],
				aeratagActive:0,
				sextag:[{text:'男',key:'man'},{text:'女',key:'woman'},{text:'组合',key:'team'}],
				sextagActive:null,
				page:1,
				size:100,
				result:null
			}
		},
		mounted(){
			this.getSingerList(this.key,this.page,this.size).then(()=>{
				this.initScroll()
			})
		},
		methods:{
			getSingerList(key,page,num){
				let t = singerList(key,page,num)
				return new Promise((reslove,reject)=>{
					this.$http.jsonp(t.url,{params:t.params,jsonpCallback:t.callback}).then((res)=>{
						let result = res.data.data
						if (this.result == null) {
							this.result = result
						}else{
							this.$set(this.result,'list',this.result.list.concat(result.list))
						}
						this.page++
						reslove()
					})
				})
			},
			getSingerImg(id){
				return	'https://y.gtimg.cn/music/photo_new/T001R300x300M000'+id+'.jpg'
			},
			initScroll(){
				if (this.scroll) {
					this.scroll.refresh()
					this.scroll.pullupWatching ? this.scroll.scrollTo(0,0,0) : this.scroll.finishPullUp()
				}else{
					this.scroll = new BScroll(this.$refs.scroll,{pullUpLoad:true,click:true})
					this.scroll.on('pullingUp',()=>{
						this.getSingerList(this.key,this.page,this.size).then(()=>{
							this.initScroll()
						})
					})
				}
			}
		},
		components:{
			'v-common-header':CommonHeader
		},
		computed:{
			key(){
				if(this.aeratagActive == 0){
					return 'all_all_all'
				}
				if (this.sextagActive == null) {
					this.sextagActive = 0
				}
				return this.aeratag[this.aeratagActive].key +'_'+ this.sextag[this.sextagActive].key+'_all'
			}
		},
		watch:{
			key(n){
				this.result = null
				this.page = 1
				this.getSingerList(n,this.page,this.size).then(()=>{
					this.initScroll()
				})
			}
		}	
	}
</script>

<style lang="stylus">
@import "../../common/style/color.styl"
@import "../../common/style/mixim.styl"

.singer
	height:100%
	.scroll
		position:absolute
		width:100%
		top:45px
		bottom:0
		overflow:hidden
		.tag
			background:#f4f4f4
			.aera-tag,.sex-tag
				overflow:hidden
				ul
					font-size: 0
					white-space: nowrap
					border-bottom-1px($border-color)
					li
						display: inline-block
						height:40px
						line-height:40px
						padding:0 10px
						a
							font-size: 14px
							color:#000
							&.active
								color:$main-color
		.hot-line
			height:30px
			line-height:30px
			background:#eaeaea
			padding:0 10px
			span
				font-size: 12px	
		.result
			ul
				padding-bottom:56px
				li
					height:55px
					padding:5px 10px 0px
					display: flex
					box-sizing: border-box
					img
						height:45px
						width:45px
						flex: 0 0 45px
						border-radius:50%
						margin:0 px
					.text
						flex:1
						display: flex
						padding: 0 0 5px 10px
						overflow: hidden
						border-bottom-1px($border-color)
						p
							flex:1
							line-height:45px
							text-overflow: ellipsis
							white-space:nowrap
							overflow:hidden
						span
							flex:0 0 30px
							width:30px
							line-height:45px
							text-align: center
							transform: rotate(180deg)
							transform-origin: 50% 50%	
					&:last-child
						.text
							border-none()						
					
		
</style>
	