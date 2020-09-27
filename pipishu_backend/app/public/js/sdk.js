
//dom操作获取当前节点是父元素中第几个儿子
Object.prototype.index=function() {
				var arr=this.parentElement.children//兄弟们(包含它)
				for(let i=0;i<arr.length;i++){
					if(arr[i]==this){
						return i
					}
				}
				
			}
			
			
//dom操作 便历节点数组
Object.prototype.myeach=function(callback) {
	for(let i=0;i<this.length;i++){
		callback(this[i],i)
	}
}
			