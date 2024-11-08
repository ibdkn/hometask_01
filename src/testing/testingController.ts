import {Request, RequestHandler, Response} from "express";
import {db} from "../db/db";

export const testingController = {
    deleteAllVideo: ((req: Request, res: Response): Response | void => {
        // Очищаем базу данных
        db.videos = [];

        // Отправляем успешный ответ
        return res.status(204).send();
    }) as RequestHandler
}
