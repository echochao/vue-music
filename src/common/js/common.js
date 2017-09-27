//type:album,diss,song
export function isTitleMove(string,fontsize,width){
	let t
	(string.length*fontsize>width)? t = true : t = false
	return t
};
export function getRandomList(n){
	let arr= [],res= []
	for(let i=0;i<n;i++){
		arr.push(i);
	}
	for (let j = 0; j < n; j++) {
		let t = Math.floor(Math.random()*arr.length)
		res[j] = arr[t]
		arr.splice(t,1)
	}
	return res
};
export function getSimpleList(n){
	let res = []
	for(let i=0;i<n;i++){
		res.push(i);
	}
	return res
};
export function getLastDate(){
	let date = new Date()
	let y = date.getFullYear(),
	m = date.getMonth()+1,
	d = date.getDate()-1
	if (m<10) {
		m = '0'+m
	} 
	if (d<10) {
		d = '0'+d
	}
	return y+'-'+m+'-'+d
};
