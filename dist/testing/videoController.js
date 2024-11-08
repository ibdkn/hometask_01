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
        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;
        const errorsArray = [];
        (0, field_validator_1.titleFieldValidator)(title, errorsArray);
        (0, field_validator_1.authorFieldValidator)(author, errorsArray);
        (0, field_validator_1.availableResolutionsFieldValidator)(availableResolutions, errorsArray);
        if (errorsArray.length > 0) {
            // const errors_ = errorResponse(errorsArray);
            res.status(400).send(errorsArray);
            return;
        }
        const newVideo = {
            id: Date.now() + Math.random(),
            title,
            author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
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
        var _a, _b, _c, _d, _e, _f;
        const videoId = +req.params.id; // Преобразуем id из строки в число
        const video = db_1.db.videos.find((v) => v.id === +videoId);
        if (!video) {
            return res.status(404).send({ error: 'Video not found' });
        }
        const title = (_a = req.body.title) !== null && _a !== void 0 ? _a : '';
        const author = (_b = req.body.author) !== null && _b !== void 0 ? _b : '';
        const availableResolutions = (_c = req.body.availableResolutions) !== null && _c !== void 0 ? _c : [];
        const publicationDate = (_d = req.body.publicationDate) !== null && _d !== void 0 ? _d : '';
        const canBeDownloaded = (_e = req.body.canBeDownloaded) !== null && _e !== void 0 ? _e : true;
        const minAgeRestriction = (_f = req.body.minAgeRestriction) !== null && _f !== void 0 ? _f : 18;
        const errorsArray = [];
        (0, field_validator_1.titleFieldValidator)(title, errorsArray);
        (0, field_validator_1.authorFieldValidator)(author, errorsArray);
        (0, field_validator_1.availableResolutionsFieldValidator)(availableResolutions, errorsArray);
        (0, field_validator_1.publicationDateFieldValidator)(publicationDate, errorsArray);
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
