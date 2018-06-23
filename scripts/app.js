import '../styles.scss';
import '../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss';
import * as toastr from '../node_modules/toastr/build/toastr.min.js';
import '../node_modules/toastr/build/toastr.min.css';
import * as io from '../node_modules/socket.io-client/dist/socket.io.js';

import {DataAccess} from './dataAccess.js';
import {Helper} from './helper.js';

(function(){
	const socket = io.connect('http://localhost:3000');
	const loginCont = document.getElementsByClassName('login-component')[0];
	const chatCont = document.getElementsByClassName('chat-container')[0];
	const msgTextAreaCont = document.getElementById('message');
	const isUserLoggedIn = Helper.isUserLoggedIn();
	const messages = [];

	loginCont.style.display = isUserLoggedIn ? 'none' : 'block';
	chatCont.style.display = isUserLoggedIn ? 'block' : 'none';

	socket.on('message', function(data){
		messages.push(data);
		createChatStructure(data);
	});

	document.getElementById('loginBtn').addEventListener('click', function(){
		event.preventDefault();
		const username = document.getElementById('username').value;
		const password = document.getElementById('password').value;

		DataAccess.apicall('POST','api/login',{username, password}).then((data) => {
			toastr.success(data.message);
			Helper.saveLoggedInUser(data);
			loginCont.style.display = 'none';
			chatCont.style.display = 'block';
		}).catch((err) => {
			toastr.warning(err.err);
		});
	});

	document.getElementById('send').addEventListener('click', function(){
		const data = {
			'userInfo': Helper.getLoggedInUser().result,
			'message': msgTextAreaCont.value
		}

		socket.emit('send', data);
	});

	function createChatStructure(message){
		let chatList = document.getElementsByClassName('chat-list')[0]
		let chatListHtml = '';
		const isLoggedInUser = Helper.getLoggedInUser().result.id === message.userInfo.id
		
		let li = document.createElement('li');
		let div = document.createElement('div');
		let header = document.createElement('h4');
		let msg = document.createElement('p');

		header.innerText = message.userInfo.username;
		msg.innerText = message.message;

		div.appendChild(header);
		div.appendChild(msg);
		div.style.textAlign = isLoggedInUser ? 'right' : 'left';
		div.style.backgroundColor = isLoggedInUser ? '#ccc' : '#00ffcc';
		div.style.float = isLoggedInUser ? 'right' : 'left';

		li.classList.add('clearfix');
		li.appendChild(div);
		
		chatList.appendChild(li);
	}

})();