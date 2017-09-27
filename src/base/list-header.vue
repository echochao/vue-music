<template>
	<div class="list-header">
		<div class="bg">
			<img :src="logo" alt="" :class="{active:(move == true),filter:(filter == true)}">
		</div>
		<div class="list-header-top">
			<span class="back icon-back" @click="$router.go('-1')"></span>
			<span class="title">
				<p v-show="move==null">{{type}}</p>
				<p v-show="move!==null" :class="{move:(move == true)}"><i>{{title}}</i><i v-if="move==true">{{title}}</i></p>
			</span>
			<span class="more icon-ellipsis"></span>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			logo:{
				type:String,
				default:''
			},
			title:{
				type:String,
				default:''
			},
			type:{
				type:String,
				default:''
			},
			filter:{
				type:Boolean,
				default:true
			}
		},
		data(){
			return{
				move:null
			}
		}
	}
</script>

<style lang="stylus">
@import '../common/style/color.styl'

@keyframes move
		100% {transform: translate(-50%)}
.list-header
	width: 100%
	.bg
		position:absolute
		width:100%
		z-index:-99
		height:65%
		img
			position:absolute
			left:0
			top:0
			padding-top:-100%
			width:100%
			filter: brightness(.8)
			&.filter
				filter: blur(8px) brightness(.8)
			&.active
				filter: blur(8px) brightness(.4)
	.list-header-top
		display: flex
		text-align: center
		color: #fff
		overflow : hidden
		.title
			flex: auto
			width:100%
			overflow:hidden
			p
				font-size: 18px
				display: inline-block
				height:40px
				line-height:40px
				white-space: nowrap
				&.move
					animation: move 10s linear infinite
					i
						padding-left: 2em
		.back,.more
			width: 50px
			flex: 0 0 50px
			font-size: 22px
			line-height:40px
			z-index: 9
	
</style>