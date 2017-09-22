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