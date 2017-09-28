<template>
  <div id="app" ref="app">
     <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
#app
    height:100%
    width:100%  
</style>
