const { Router } = require("express");
const router = Router()


// подключаем наш модуль в котором реализована логика добавления в файл данных с формы
const Course = require('../models/course')

//
router.get("/", (req, res) => {
    // раньше писали в основном коде, сейчас чтобы там было менбше кода, пишем тут, в потом вместе app.get   прокидываем типо пропсов
    // через рендер подкл.чаем файл хбс, эбаут
    res.render('about', {
        title: 'About',
        isAbout: true
    });
});


router.post("/", async (req, res) => {

    // В переменной result создаем экземпляр класса req.body.title- получаем значене с формы у которой name=title, остальные по аналогии
    // Объект req.body позволяет получать доступ к данным в строке или объекте JSON со стороны клиента.
    // Обычно объект req.body используется для получения данных через запросы POST и PUT на сервере Express.

    const result = new Course(req.body.title, req.body.price, req.body.img,req.body.id)

    // после этого вызываем метод save из нащего модуля Course
    // выпоняем функцию сейв
    await result.save()
    //переходим на другую страницу
    res.redirect('/menu')
});

// экспортируем если не написать не импортнеться в другом месте
module.exports = router