console.log('JS Woo!');
const socket = io();

const theBoard = document.querySelector('#the-board')
const offsetTop = document.querySelectorAll('#the-board')['0'].offsetTop;

console.log(offsetTop)

//TODO: Determine how to deal with offset pixels, or how to maintain aspect ratio?
let boardWidth = theBoard.clientWidth;

console.log(`client width: ${boardWidth}`)

socket.on('newClientConnection', (data) => {
  console.log('new client connected', data)
  loadTheWords(data);
})

socket.on('movingWord', (serverWord) => {
  console.log(serverWord)
  moveTheWord(serverWord);
})

var activeWord;
var activeWordRect;
let wordDifLeft;
let wordDifTop;

function dragStartHandler(e) {
  // console.log(`drag start: ${e.offsetX} ${e.offsetY}`);
  activeWord = e.target;
  activeWord.style.zIndex = 1;
  activeWordRect = activeWord.getBoundingClientRect();
  // console.log(`activeword top: ${activeWordRect.top}, activeWord left: ${activeWordRect.left}`)
  wordDifLeft = e.offsetX;
  wordDifTop =  e.offsetY;
}

function dragoverHandler(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  // console.log('dragover', e);
}

function dropHandler(e) {
  e.preventDefault();
  console.log('drag drop', e);
  activeWord.style.zIndex = 0;
  // console.log(`mouse x: ${e.offsetX}, mouse y: ${e.offsetY}`)
  socket.emit('wordMoved', {id: activeWord.id, x: (e.offsetX - wordDifLeft) / boardWidth, y: (e.offsetY - wordDifTop) / boardWidth});
}

//This gets the word being moved by someone else and changes the coordinates
function moveTheWord(serverWord) {
  console.log(serverWord)
  var movedWord = document.getElementById(serverWord.id);
  // console.log('movedWord', movedWord)
  movedWord.style.left = serverWord.x * 90 + 'vw';
  movedWord.style.top = serverWord.y * 90 + 3 + 'vw';
}

function loadTheWords(data) {
  console.log(data[0])
  
  data.forEach((word, index) => {
    let theWord = document.createElement('span');
    theWord.id = index;
    theWord.innerText = word.word
    theWord.classList.add('word')
    theWord.setAttribute('draggable', true)
    theWord.setAttribute('ondragstart', 'dragStartHandler(event)')
    theWord.style.left = word.x * 90 + 'vw'
    theWord.style.top = word.y * 90 + 3 + 'vw'
    theBoard.append(theWord);
  });
}

