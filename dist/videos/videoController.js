"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoController = void 0;
const db_1 = require("../db/db");
const field_validator_1 = require("../validation/field-validator");
exports.videoController = {
    getVideos(req, res) {
        const videos = db_1.db.videos;
        res.status(200).json(videos);
    },
    createVideo(req, res) {
        const createdAt = new Date(); // Текущая дата
        const publicationDate = addDays(createdAt, 1).toISOString(); // Дата на 1 день позже
        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;
        const errorsArray = [];
        (0, field_validator_1.titleFieldValidator)(title, errorsArray);
        (0, field_validator_1.authorFieldValidator)(author, errorsArray);
        (0, field_validator_1.availableResolutionsFieldValidator)(availableResolutions, errorsArray);
        if (errorsArray.length > 0) {
            res.status(400).send({ errorsMessages: errorsArray });
            return;
        }
        const newVideo = {
            id: Date.now() + Math.random(),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate,
            availableResolutions
        };
        db_1.db.videos = [...db_1.db.videos, newVideo];
        res.status(201).json(newVideo);
    },
    getVideo: ((req, res) => {
        const videoId = req.params.id;
        const video = db_1.db.videos.find(video => video.id === +videoId);
        const errorsArray = [];
        if (!video) {
            errorsArray.push({ field: 'id', message: 'Video not found' });
            return res.status(404).json({ errorsMessages: errorsArray });
        }
        return res.status(200).json(video);
    }),
    updateVideo: ((req, res) => {
        const videoId = +req.params.id; // Преобразуем id из строки в число
        const video = db_1.db.videos.find((v) => v.id === +videoId);
        if (!video) {
            return res.status(404).send({ error: 'Video not found' });
        }
        const errorsArray = [];
        // Валидация title
        if (!req.body.title || typeof req.body.title !== 'string' || req.body.title.length > 40) {
            errorsArray.push({ field: 'title', message: 'Title must be a string with max length of 40' });
        }
        // Валидация author
        if (!req.body.author || typeof req.body.author !== 'string' || req.body.author.length > 20) {
            errorsArray.push({ field: 'author', message: 'Author must be a string with max length of 20' });
        }
        if (typeof req.body.canBeDownloaded !== 'boolean') {
            errorsArray.push({
                field: 'canBeDownloaded',
                message: 'canBeDownloaded must be a boolean',
            });
        }
        // Валидация minAgeRestriction
        if (req.body.minAgeRestriction !== null &&
            (typeof req.body.minAgeRestriction !== 'number' || req.body.minAgeRestriction < 0 || req.body.minAgeRestriction > 18)) {
            errorsArray.push({
                field: 'minAgeRestriction',
                message: 'minAgeRestriction must be a number between 0 and 18 or null',
            });
        }
        // Валидация publicationDate
        if (typeof req.body.publicationDate !== 'string' ||
            isNaN(Date.parse(req.body.publicationDate))) {
            errorsArray.push({
                field: 'publicationDate',
                message: 'PublicationDate must be a valid ISO date string',
            });
        }
        if (errorsArray.length > 0) {
            return res.status(400).send({ errorsMessages: errorsArray });
        }
        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;
        const publicationDate = req.body.publicationDate;
        const canBeDownloaded = req.body.canBeDownloaded;
        const minAgeRestriction = req.body.minAgeRestriction;
        if (errorsArray.length > 0) {
            res.status(400).send(errorsArray);
            return;
        }
        // Обновляем данные
        video.title = title;
        video.author = author;
        video.availableResolutions = availableResolutions;
        video.canBeDownloaded = canBeDownloaded;
        video.minAgeRestriction = minAgeRestriction;
        video.publicationDate = publicationDate;
        // Отправляем успешный ответ
        res.status(204).send();
    }),
    deleteVideo: ((req, res) => {
        const videoId = +req.params.id; // Преобразуем id из строки в число
        const video = db_1.db.videos.find((v) => v.id === videoId);
        if (!video) {
            return res.status(404).send({ error: 'Video not found' });
        }
        // Удаляем видео
        db_1.db.videos = db_1.db.videos.filter((video) => video.id !== videoId);
        // Отправляем успешный ответ
        return res.status(204).send();
    })
};
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
console.log(typeof true);
