const { Router } = require("express");
// подключаем наш модуль в котором реализована логика добавления в файл данных с формы
const Course = require('../models/course')
const router = Router()



router.get("/", async (req, res) => {
    const result = await Course.getAll()
    res.render('menu', {
        title: 'menu',
        isMenu: true,
        result
    });
});


router.get('/:id', async (req, res) => {
    const result = await Course.getByid(req.params.id)
    console.log(req.params.id)
    res.render('results', {
        layout: 'empty',
        // title: `${result.title}`,
        result
    });
})


router.get('/check/edit'), async (req, res) => {
    res.render('results', {
        result
    });
}

module.exports = router