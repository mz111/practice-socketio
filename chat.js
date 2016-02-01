var init = function(server){
	var io = require('socket.io')(server);
	var sockets = {};
	io.on('connection', function(socket){
	    //socket.emit('news', {hello: 'world'});
	    socket.on('login', function(data){
	    	var user = data.user;
	    	if(!user){
	    		socket.emit('error',{
	    			msg: 'user is needed'
	    		});
	    		return;
	    	}
	    	// register to global
	    	sockets[user] = socket;

	    	/* msg should be like 
	    		{
	    			to : 'another',
	    			msg: 'balabala'
	    		}*/	
	    	socket.on('msg', function(data){
	    		socket.emit('onmsg', {status:1});
	    		if(data && data.to && sockets[data.to]){
	    			// TODO, data.to is invalid user
	    			sockets[data.to].emit('msg',{
	    				from : user,
	    				msg: data.msg
	    			});
	    			return;
	    		}
	    		// TODO, offline msg, push method

	    	});
	    });
	    socket.on('my other event', function(data){
	        console.log('on other', data);
	        socket.emit('end', {msg: 'end'});
	    });
	    socket.on('disconnect', function() {
	        console.log('disconnect');
	    });
	});
};

module.exports = init;