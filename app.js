

const express = require("express");
// const path = require("path");
const exphbs = require("express-handlebars");

//импортируем роуты в роутах пишем то, что надо вернуть, внутри этих роутов логика по рендеру
const mains = require("./routes/mains");
const about = require("./routes/about");
const menu = require("./routes/menu");
// создаем объект приложения

const app = express();
// определяем обработчик для маршрута "/"

// опредедляем порт если не с енв, то по умолчанию будет порт 3000
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({
    // дефолтный шаблон в который по сути монтируеться компоненты называейтся мейн
    defaultLayout: 'main',
    // тут расщирение устанавливаем
    extname: 'hbs'
})

// настройки шаблона 
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
// папка с которого берем шаблоны
app.set('views', 'views')

// делаем статический файла в котором берем с паблика  стили, чтобы стили работали
app.use(express.static('public'));
// не помню щачем разобраться
app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//     res.render('index',{
//         title: 'Main',
//         isMain:true
//     });
// });

// подключаем роуты с папки роутс это мидлвары
// убираем в роутере ставим тут путь, чтобы можно было его указащать или будет работать только по /menu/menu роуты 
app.use('/', mains)
app.use('/about', about)
app.use('/menu', menu)

// начинаем прослушивать подключения на 3000 порту
app.listen(PORT, () => {
    console.log(`сервер запущен на порте ${PORT}`)
});