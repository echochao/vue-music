import store from 'store'

let music = store.get('vue_music-music',{id:null,name:null,img:null,singer:[]}),
	musiclist = store.get('vue_music-musiclist',[]),
	playlist = store.get('vue_music-playlist',[]),
	mode = store.get('vue_music-mode',0)


const state = {
  music,
  musiclist,
  playlist,
  mode,
  playing:false,
}

export default state