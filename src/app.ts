import express, {Request, Response} from 'express'
import cors from 'cors'
import {SETTINGS} from "./settings";
import {videoRouter} from "./videos/videoRouter";
import {testingRouter} from "./testing/testingRouter";

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк

app.get('/', (req: Request, res: Response) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})

// Используем app.use для подключения роутера
app.use(SETTINGS.PATH.VIDEOS, videoRouter);
app.use(SETTINGS.PATH.TESTING, testingRouter);