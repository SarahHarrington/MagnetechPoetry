console.log('JS Woo!');
const socket = io();

let board = document.querySelector('.board');

socket.on('newClientConnection', (data) => {
  console.log('new client connected')
})

function boardClick(e) {
  console.log(e.target);
  e.target.setAttribute('draggable', true)
}

function drag(e) {
  
}



board.addEventListener('click', boardClick);
