const commonParams = {inCharset:'utf-8',outCharset:'utf-8',format:'jsonp'}

export function focusApi(){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg',
		callback:'MusicJsonCallback',
		params:(()=>{
			return (Object.assign({page:'other'},commonParams))
		})()
	}
};
const languageType = [{'全部':'-1'},{'国语':'0'},{'粤语':'1'},{'英语':'5'},{'韩语':'4'},{'日语':'3'}]
export function albumApi(page,size,sort,language,genre,year,type,company){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/album_library',
		callback:'albumCallback',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'albumCallback',
				cmd:'get_album_info',
				page:page,
				pagesize:size,
				sort:sort,
				language:language,
				genre:genre,
				year:year,
				type:type,
				company:company
			},commonParams))
		})()
	}
};
export function dissApi(sort,begin,end){
	return{
		url:'http://shenchaoli.xyz/api/qq-music.php',
		callback:'dissCallback',
		params:(()=>{
			return ({url:'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg?jsonpCallback=dissCallback&format=jsonp&inCharset=utf8&outCharset=utf-8&categoryId=10000000&sortId='+sort+'&sin='+begin+'&ein='+end})
		})()
	}
};
export function dissInfo(id){
	return{
		url:'http://shenchaoli.xyz/api/qq-music.php',
		callback:'dissInfo',
		params:(()=>{
			return ({url:'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&onlysong=0&disstid='+id+'&jsonpCallback=dissInfo&format=jsonp&inCharset=utf8&outCharset=utf-8'})
		})()
	}
};
export function albumInfo(id){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg',
		callback:'albumInfo',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'albumInfo',
				albummid:id
			},commonParams))
		})()
	}
};
export function singerInfo(id,begin,num){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
		callback:'singerInfo',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'singerInfo',
				singermid:id,
				begin:begin,
				num:num,
				order:'listen'
			},commonParams))
		})()
	}
};
export function searchAlbum(key,page,num){
	return{
		url:'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
		callback:'albumInfo',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'albumInfo',
				w:key,
				t:8,
				catZhida:1,
				aggr:1,
				cr:1,
				n:num,
				p:page
			},commonParams))
		})()
	}
};
export function searchSong(key,page,num){
	return{
		url:'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
		callback:'songInfo',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'songInfo',
				w:key,
				catZhida:1,
				aggr:1,
				cr:1,
				n:num,
				p:page
			},commonParams))
		})()
	}
};
export function searchLyric(key,page,num){
	return{
		url:'https://c.y.qq.com/soso/fcgi-bin/client_search_cp',
		callback:'lyricInfo',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'lyricInfo',
				w:key,
				t:7,
				catZhida:1,
				aggr:1,
				cr:1,
				n:num,
				p:page
			},commonParams))
		})()
	}
};
export function searchDiss(key,page,num){
	return{
		url:'http://shenchaoli.xyz/api/qq-music.php',
		callback:'dissInfo',
		params:(()=>{
			return ({url:'https://c.y.qq.com/soso/fcgi-bin/client_music_search_songlist?g_tk=5381&flag_qc=0&page_no='+page+'&num_per_page='+num+'&query='+key+'&jsonpCallback=dissInfo&format=jsonp&inCharset=utf8&outCharset=utf-8'})
		})()
	}
};
export function smartBox(key){
	return{
		url:'http://shenchaoli.xyz/api/qq-music.php',
		callback:'smart',
		params:(()=>{
			return ({url:'https://c.y.qq.com/splcloud/fcgi-bin/smartbox_new.fcg?g_tk=5381&jsonpCallback=smart&format=jsonp&inCharset=utf8&outCharset=utf-8&key='+key+''})
		})()
	}
};
export function hotKey(){
	return{
		url:'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg',
		callback:'hotKey',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'hotKey'
			},commonParams))
		})()
	}
};

export function lyricApi(id){
	return{
		url:'http://www.shenchaoli.xyz/lyric',
		callback:'lyricinfo',
		params:(()=>{
			return ({id:id,jsonpCallback:'lyricinfo'})
		})()
	}
};
export function singerList(key,page,num){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/v8.fcg?channel=singer&page=list',
		callback:'singer',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'singer',
				key:key,
				pagesize:num,
				pagenum:page
			},commonParams))
		})()
	}
};

export function rankList(){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_opt.fcg?page=index&format=html&v8debug=1',
		callback:'jsonCallback',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'jsonCallback'
			},{}))
		})()
	}
};
export function rankInfo(id,date,begin,num){
	return{
		url:'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&type=top',
		callback:'rankInfo',
		params:(()=>{
			return (Object.assign({
				jsonpCallback:'rankInfo',
				topid:id,
				date:date,//2016-06-06
				song_begin:begin,
				song_num:num
			},{}))
		})()
	}
};

