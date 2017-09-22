import store from 'store'

const mutations = {
	
  SET_MUSIC(state, obj) {
  	state.music = obj
  	store.set('vue_music-music',obj)
  },

  SET_PLAYING(state, flag) {
  	state.playing = flag
  },

  SET_MUSICLIST(state, arr) {
  	state.musiclist = arr
  	store.set('vue_music-musiclist',arr)
  },

  SET_PLAYLIST(state, arr) {
  	state.playlist = arr
  	store.set('vue_music-playlist',arr)
  },

  SET_MODE(state,mode) {
  	state.mode = mode
  	store.set('vue_music-mode',mode)
  }
}

export default mutations