console.log('JS Woo!');
const socket = io();

const theBoard = document.querySelector('#the-board')
const offsetTop = document.querySelectorAll('#the-board')['0'].offsetTop;
console.log(offsetTop)

//TODO: Determine how to deal with offset pixels, or how to maintain aspect ratio?
let clientWidth = window.innerWidth;
let clientHeight = window.innerHeight;

console.log(`client width: ${clientWidth}, client height: ${clientHeight}`)

socket.on('newClientConnection', (data) => {
  console.log('new client connected', data)
  loadTheWords(data);
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
  // activeWord.style.left = e.pageX + 'px';
  // activeWord.style.top = e.pageY + 'px';
  socket.emit('wordMoved', {id: activeWord.id, x: e.offsetX, y: e.offsetY});
}

//This gets the word being moved by someone else and changes the coordinates
function moveTheWord(serverWord) {
  console.log(serverWord)
  var movedWord = document.getElementById(serverWord.id);
  console.log('movedWord', movedWord)
  movedWord.style.left = serverWord.x + 'px';
  movedWord.style.top = serverWord.y + offsetTop + 'px';
}

function loadTheWords(data) {
  data.forEach((word, index) => {
    let theWord = document.createElement('span');
    theWord.id = index;
    theWord.innerText = word.word
    theWord.classList.add('word')
    theWord.setAttribute('draggable', true)
    theWord.setAttribute('ondragstart', 'dragStartHandler(event)')
    theWord.style.left = word.x + 'px'
    theWord.style.top = word.y + offsetTop + 'px'
    theBoard.append(theWord);
  });
}

