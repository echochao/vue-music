import {getRandomList,getSimpleList} from '@/common/js/common'

function findSong(music,list){
	if (list.length>0) {
		for(let index in list){
			if (list[index].id == music.id) {
				return index
			}
		}
	}
	return false
}


export const selectMusic = function ({commit, state}, music) {
	commit('SET_MUSIC',music)
	let same = findSong(music,state.musiclist)
    if(same === false){				
    	commit('SET_MUSICLIST',[...state.musiclist,music])
    	commit('SET_PLAYLIST',[...state.playlist,state.playlist.length])
    }
}

export const randomPlayAll = function ({commit, state}, list) {
    commit('SET_MODE',2)
    commit('SET_MUSICLIST',list)
    commit('SET_PLAYLIST',(getRandomList(list.length)))
    commit('SET_MUSIC',state.musiclist[state.playlist[0]])   
}

export const changePlayMode = function ({commit, state}) {
    commit('SET_MODE',(()=>{
        	return state.mode == 0 ? 1 : state.mode == 1 ? 2 : 0 
    })())
    resetPlayList({commit, state})
}

export const resetPlayList = function ({commit, state}) {
	switch(state.mode){
    	case 1:
    	commit('SET_PLAYLIST',(getSimpleList(state.musiclist.length)))
    	break
    	case 2:
    	commit('SET_PLAYLIST',(getRandomList(state.musiclist.length)))
    	break
    }
}

export const clearMusicList = function ({commit, state}) {
	commit('SET_MUSIC',{id:null,img:null,name:null,singer:[]})
    commit('SET_MUSICLIST',[])
    commit('SET_PLAYLIST',[])
}

export const deleteMusic = function ({commit, state},music) {
    if (music.id == state.music.id) {
        next({commit, state},music)    
    }
	let index = findSong(music,state.musiclist)
	let arr = state.musiclist
	arr.splice(parseInt(index),1)
	resetPlayList({commit, state})
	if (arr.length !== 0) {
		commit('SET_MUSICLIST',arr)
		resetPlayList({commit, state})
	}else{
		clearMusicList({commit, state})
	}
}

export const next = function ({commit, state},music) {
    let length = state.musiclist.length
    if (length == 1) {return}
    let index = state.playlist.indexOf(parseInt(findSong(music,state.musiclist)))
    console.log(index)
    index == state.playlist.length-1 ? 
    commit('SET_MUSIC',state.musiclist[state.playlist[0]]) :
    commit('SET_MUSIC',state.musiclist[state.playlist[index+1]])   
}

export const prev = function ({commit, state},music) {
    let length = state.musiclist.length
    if (length == 1) {return}
    let index = state.playlist.indexOf(parseInt(findSong(music,state.musiclist)))
    console.log(index)
    index == 0 ? 
    commit('SET_MUSIC',state.musiclist[state.playlist[length-1]]) :
    commit('SET_MUSIC',state.musiclist[state.playlist[index-1]])   
}


