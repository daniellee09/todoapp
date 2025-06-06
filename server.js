const express = require('express');
const app = express();
const todos = [];

app.set('view engine', 'ejs');

// 정적 파일 제공
app.use(express.static('public'));

// Body-parser 설정 (폼 데이터 처리)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 라우팅
// app.get('/', function(req, res){
//     res.sendFile(__dirname + '/index.html')
// });

app.get('/write', function(req, res){
    res.sendFile(__dirname + '/write.html')
});

app.get('/home', function(req, res){
    res.sendFile(__dirname + '/home.html')
});

app.get('/', (req, res) => {
    res.render('index', { todos }); // todos 배열을 index.ejs에 전달
  });
  
  // 할 일 목록 조회용 (JSON 응답)
app.get('/todos', (req, res) => {
  res.json(todos); // todos 배열을 그대로 보냄
});

// POST 요청 처리
app.post('/submit', (req, res) => {
  const todo = req.body.todo;
  const dueDate = req.body.dueDate;
  todos.push({ todo, dueDate });

  console.log(`Received Todo: ${todo}, Due Date: ${dueDate}`);
  res.json({ message: '할 일이 저장되었습니다!' }); // JSON 응답
});


app.post('/delete', (req,res) => {
  const index = req.body.index;
  if(index !== undefined && todos[index]){
    todos.splice(index, 1); // 해당 index의 할 일 삭제
    console.log('Deleted todo at index: ${index}');
  }
  res.redirect('/'); //삭제 후 홈으로 이동
})

app.listen(3000, function(){
    console.log('listening on 3000')
});
