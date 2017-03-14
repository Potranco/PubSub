function ArrayFunctions(){
}
ArrayFunctions.prototype.add=function(name,callback){
	this[name]=callback;
};
ArrayFunctions.prototype.remove=function(name){
	this[name]=function(){console.error('Function['+name+'] removed.');};
};

function PubSub() {
    this.callbacks=[];
}

PubSub.prototype.add=function(name,callback){
	if (this.callbacks[name]===undefined) {
		this.callbacks[name]=[];
		this[name]=function(){
			var aux = this.callbacks[name].length;
			for (var i=0;i<aux;i++){
				this.callbacks[name][i].apply(null,arguments);
			}
		};
	}
	var index=this.callbacks[name].push(callback)-1;
	return {
          delete: function () {
              this.callbacks[name].splice(index, 1);
          }.bind(this)
	}
};

PubSub.prototype.removeAll=function(name){
	this.callbacks[name]=undefined;
	this[name]=function(){console.error('Function['+name+'] removed.');};
};




