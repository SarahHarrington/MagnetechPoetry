console.log('JS Woo!');
const socket = io();

socket.on('newClientConnection', (data) => {
  console.log('new client connected')
})

socket.on('movingWord', (serverWord) => {
  console.log(serverWord)
  moveTheWord(serverWord);
})

var activeWord;

function dragStartHandler(e) {
  console.log('dragstart', e.target.id);
  activeWord = e.target;
}

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  // console.log('dragover', e);
}

function dropHandler(e) {
  e.preventDefault();
  console.log('drag drop', e);
  activeWord.style.left = e.pageX - 10 + 'px';
  activeWord.style.top = e.pageY - 10 + 'px';
  socket.emit('wordMoved', {movedWord: activeWord.id, newX: e.pageX - 10, newY: e.pageY - 10});
}

function moveTheWord(serverWord) {
  var movedWord = document.getElementById(`${serverWord.movedWord}`);
  console.log('movedWord', movedWord)
  movedWord.style.left = serverWord.newX + 'px';
  movedWord.style.top = serverWord.newY + 'px';
}


