export const songurl = state => {
	return state.music.id !== null? 'http://ws.stream.qqmusic.qq.com/'+state.music.id+'.m4a?fromtag=46' : null
}
export const imgurl = state => {
	return state.music.id !== null? 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+state.music.img+'.jpg?max_age=2592000' : null
}

export const songid = state => state.music.id

export const songname = state => state.music.name

export const music = state => state.music

export const playing = state => state.playing

export const songsinger = state => state.music.singer

export const musiclist = state => state.musiclist

export const mode = state => state.mode