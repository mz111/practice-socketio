(function(){

    'use strict';

    var socket = io.connect('http://localhost:8090');
    var login = function(user){
        socket.emit('login',{
            user : user
        });
        socket.on('msg',onMsg);
    }

    var chat = function(to, msg){

        socket.emit('msg',{
            to : to,
            msg : msg
        });
    }

    var onMsg = function(msg){
        //TODO, what to do if we recv msg from server
        $('all_msg_id').innerHTML += '<' +msg.from +'>: ' + msg.msg;
    }
    var $ = function(id){
        // alias for get element by id
        return document.getElementById(id);
    }
    $('login_id').addEventListener('click',function(){
        var user = $('user_id').value;
        //TODO, add user check
        login(user);
    });

    $('chat_form_id').addEventListener('submit',function(e){
        var e = e || window.event;
        e.preventDefault();
        return false;
    })

     //ie brower, using atachEvent,different from addEventListenner, if jquery is not allowed,  
    $('login_form_id').addEventListener('submit',function(e){
        var e = e || window.event;
        e.preventDefault();
        return false;
    });

    $('chat_id').addEventListener('click',function(){
        var msg = $('msg_id').value;
        var to = $('to_id').value;
        chat(to,msg);
    })
})();

