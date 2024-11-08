"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingController = void 0;
const db_1 = require("../db/db");
exports.testingController = {
    deleteAllVideo: ((req, res) => {
        // Очищаем базу данных
        db_1.db.videos = [];
        // Отправляем успешный ответ
        return res.status(204).send();
    })
};
