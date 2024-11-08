"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
exports.db = {
    videos: [],
};
// функция для быстрой очистки/заполнения базы данных для тестов
const setDB = (dataset) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        exports.db.videos = [];
        return;
    }
    // если что-то передано - то заменяем старые значения новыми
    exports.db.videos = dataset.videos || exports.db.videos;
};
exports.setDB = setDB;
