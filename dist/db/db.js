"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
const field_validator_1 = require("../validation/field-validator");
exports.db = {
    videos: [
        {
            id: 2,
            title: 'video 2',
            author: 'author 2',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [field_validator_1.Resolutions.P720],
        }
    ],
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
