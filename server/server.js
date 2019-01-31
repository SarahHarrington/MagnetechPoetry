const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

app.use(express.static(`${__dirname}/public`));

var words = [
  'the', 'of', 'to', 'and', 'a', 'in', 'is', 'it', 'you', 'that', 'he', 'was', 'for',
  'on', 'are', 'with', 'as', 'I', 'follow', 'help', 'be', 'at', 'one', 'have', 'this', 'from',
  'or', 'had', 'by', 'circle', 'but', 'some', 'what', 'there', 'we', 'can', 'out', 'other', 
  'were', 'all', 'your', 'when', 'up', 'use', 'word', 'how', 'said', 'an', 'each', 'cause',
  'which', 'do', 'their', 'time', 'if', 'will', 'way', 'about', 'many', 'then', 'them', 
  'would', 'write', 'like', 'so', 'these', 'her', 'long', 'make', 'thing', 'see', 'where',
  'two', 'has', 'look', 'more', 'day', 'could', 'go', 'come', 'did', 'my', 'sound', 'no',
  'most', 'number', 'who', 'over', 'know', 'water', 'than', 'call', 'first', 'people', 'may', 
  'down', 'side', 'been', 'now', 'find', 'great', 'think', 'every', 'good', 'the', 'the', 'the',
  'of', 'of', 'to', 'to', 'and', 'and', 'and', 'a', 'a', 'for', 'for', 'for', 'for', 'for', 'on', 
  'on', 'are', 'are', 'with', 'which', 'which', 'which', 'if', 'if', 'if', 'React', 'Angular',
  'Adobe Flash', 'Prime', 'HTML', 'CSS', 'JavaScript', 'Vue', 'Git', 'GitHub', 'Pixels', 'SVG',
  'Router', 'Node', 'Express', 'Mongo', 'Mongod', 'PostgreSQL', 'SQL', 'Query', 'UI', 'UX',
  'Front End', 'Back End', 'Server', 'Elements', 'Selector', 'API', 'Bug', 'OOP', 'Framework',
  'Version Control', 'Cache', 'HASH', 'SALT', 'Database', 'Responsive', 'Web App', 'Digital',
  'Academy', 'Machine', 'Development', 'Bash', 'Terminal', 'VS Code', 'Push', 'Pull', 'Agile',
  'Application', 'Project', 'Bootstrap', 'Material', 'Browser', 'Code', 'Debug', 'Debugging', 
  'Bugs', 'Domain', 'Documentation', 'Full-stack', 'HTTP', 'HTTPS', 'Languages', 'Libraries', 
  'Mobile-first', 'Tests', 'Testing', 'MVP', 'mySQL', 'Software', 'Stack', 'Wireframe', 'Router',
  'Logic', 'Cookies', 'ness', 'ing', 'ed', 'ment', 'ism', 'er', 'en', 'esque', 'ish', 'ive',
  'y', 's', 'es', 'ed', 'ed', 'ed', 'ed', 'ed', 'ed', 'es', 'es', 'es', 'es', 'es', 'es',
  'ing', 'ing', 'ing', 'ing', 'ing', 'ing', 'y', 'y', 'y', 'y', 'y', 'y', 'I', 'I', 'I',
  'I', 'I', 'sentence', 'set', 'three', 'want', 'air', 'well', 'also', 'play', 'small', 'end',
  'put', 'home', 'read', 'hand', 'port', 'large', 'spell', 'add', 'even', 'land', 'here', 
  'must', 'big', 'high', 'such', 'follow', 'act', 'why', 'ask', 'people', 'change', 'went',
  'light', 'kind', 'off', 'need', 'house', 'found', 'answer', 'school', 'grow', 'study', 'still',
  'learn', 'plant', 'cover', 'food', 'sun', 'toastmasters', 'thought', 'development']

let displayWords = [];

io.on('connection', socket => {
  socket.emit('newClientConnection', displayWords);

  socket.on('wordMoved', (wordMove) => {
    console.log(wordMove);
    moveTheWord(wordMove);
  })

  function moveTheWord(wordMove) {
    displayWords[wordMove.id].x = wordMove.x
    displayWords[wordMove.id].y = wordMove.y
    io.emit('movingWord', displayWords[wordMove.id]);
  }
})

function onServerStart() {
  Math.floor(Math.random() * 10) + 1;
  for (let i = 0; i < words.length; i++) {
    displayWords.push({
      word: words[i],
      id: i,
      x: Math.floor(Math.random() * 1000) + 1,
      y: Math.floor(Math.random() * 600) + 1,
    })
  }
}

onServerStart();

console.log(displayWords);

http.listen(PORT, '127.0.0.1');
console.log(`Listening on port: ${PORT}`);