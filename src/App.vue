<template>
  <div id="app" ref="app">
    <transition name="show">
     <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </transition>
    <v-audio ref="audio"></v-audio>
  </div>
</template>

<script>
import FastClick from 'fastclick'
import Audio from '@/components/audio/audio.vue'
export default {
  name: 'app',
  mounted(){
  	FastClick.attach(this.$refs.app)
  },
  components:{
  	'v-audio':Audio
  }
}
</script>

<style lang="stylus">
.show-enter-active
  transition: all 3s linear
.show-leave-active
  transition: all 0s linear
.show-enter
  transform: translate3d(100%,0,0)
.show-leave-to
  transform: translate3d(-100%,0,0)
  
#app
    height:100%
    width:100%  
</style>
