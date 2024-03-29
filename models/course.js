
//  после установки подключаем ююайди которая генерию случайный итем айди
const { v4: uuidv4 } = require('uuid');
// подключаем модули для определеия путей и работы с файловой системой, читать с файлов и указывать путь в проекта
const path = require('path')
const fs = require('fs')


//создаем класс в котором будет конструктор для создния и 3 метода,
class Course {
    // с помощью констуктора создаем экземпляк класса т.к ообъект в который будут с формы читаться данные и создаваться с данными 
    constructor(title, price, img) {
        this.title = title
        this.price = price
        this.img = img
        this.id = uuidv4()
    }

    // функция, которая возвращает объект, в котором будут с конструктора данные
    toJson() {
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

    async save() {
        // в переменнтую возфрашаем промис с функции гетолл, которая являестья массивом
        const res = await Course.getAll()

        //в массив добавляем данные, которые мы в файле эбаут читаем и добавляем в массив, получаем массив с добавленим
        res.push(this.toJson())

        console.log(res)

        return new Promise((resolve, reject) => {
            // после того как получили массив с добавленными данными с эбаут, пишем в файл  data.json, инфрмацию котру по сути получили с фортмы в эбаут
            fs.writeFile(
                //  с помощбю модуля укащываем путь, куда надо  записать данные с  JSON.stringify(res) по сути преобразуем массив с добавленными данными
                path.join(__dirname, '..', 'data', 'data.json'),
                JSON.stringify(res),
                // обработка ошибок, если еррор то показал если не то хз
                (err) => {
                    if (err) { reject(err) }
                    else { resolve() }
                }
            )
        })
    }


    static getAll() {
        return new Promise((resolve, reject) => {
            // прочитали данные с жейсона, те, котоыре были там  пустой массив, или те что было, потом JSON.parse(content) по сути передаем в еременную данные массива
            // аналог бд получаеться.
            fs.readFile(path.join(__dirname, '..', 'data', 'data.json'),
                'utf-8',
                (err, content) => {
                    if (err) reject(err)
                    else {
                        resolve(JSON.parse(content))

                    }
                }
            )
        })
    }

   
    




    static async getByid(id) {
        const res = await Course.getAll()
        return res.find(c => c.id === id)
    }


}

module.exports = Course