import {req} from './test-helpers'
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'
import {SETTINGS} from '../src/settings'

describe('----', () => {
    // beforeAll(async () => { // очистка базы данных перед началом тестирования
    //     setDB()
    // })

    it('should check base endpoint', async () => {
        // setDB() // очистка базы данных если нужно

        const res = await req
            .get('/')
            .expect(200) // проверяем наличие эндпоинта

        console.log(res.status) // можно посмотреть статус эндпоинта
        console.log(res.body) // можно посмотреть ответ эндпоинта
    })
})