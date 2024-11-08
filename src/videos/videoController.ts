import {Request, RequestHandler, Response} from "express";
import {db} from "../db/db";
import {
    authorFieldValidator,
    availableResolutionsFieldValidator,
    publicationDateFieldValidator,
    titleFieldValidator
} from "../validation/field-validator";
import {VideoDBType} from "../db/video-db-type";

export const videoController = {
    getVideos(req: Request, res: Response) {
        const videos = db.videos;
        res.status(200).json(videos);
    },
    createVideo(req: Request, res: Response) {
        const createdAt = new Date(); // Текущая дата
        const publicationDate = addDays(createdAt, 1).toISOString(); // Дата на 1 день позже
        const title = req.body.title;
        const author = req.body.author;
        const availableResolutions = req.body.availableResolutions;

        const errorsArray: Array<{field: string; message: string}> = [];
        titleFieldValidator(title, errorsArray);
        authorFieldValidator(author, errorsArray);
        availableResolutionsFieldValidator(availableResolutions, errorsArray);

        if (errorsArray.length > 0) {
            res.status(400).send({ errorsMessages: errorsArray });
            return;
        }

        const newVideo: VideoDBType = {
            id: Date.now() + Math.random(),
            title,
            author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: createdAt.toISOString(),
            publicationDate,
            availableResolutions
        };

        db.videos = [...db.videos, newVideo];
        res.status(201).json(newVideo);
    },
    getVideo: ((req: Request, res: Response): Response | void => {
        const videoId = req.params.id;
        const video = db.videos.find(video => video.id === +videoId);

        const errorsArray: Array<{ field: string; message: string }> = [];
        if (!video) {
            errorsArray.push({ field: 'id', message: 'Video not found' });
            return res.status(404).json({ errorsMessages: errorsArray });
        }

        return res.status(200).json(video);
    }) as RequestHandler,
    updateVideo: ((req: Request, res: Response): Response | void => {
        const videoId = +req.params.id; // Преобразуем id из строки в число
        const video = db.videos.find((v) => v.id === +videoId);

        if (!video) {
            return res.status(404).send({ error: 'Video not found' });
        }

        const errorsArray: Array<{ field: string; message: string }> = [];

        if (!req.body.title) {
            errorsArray.push({ field: 'title', message: 'Title is required' });
        }

        if (typeof req.body.canBeDownloaded !== 'boolean') {
            errorsArray.push({ field: 'canBeDownloaded', message: 'canBeDownloaded must be a boolean' });
        }

        if (errorsArray.length > 0) {
            return res.status(400).send({ errorsMessages: errorsArray });
        }

        const title = req.body.title ?? '';
        const author = req.body.author ?? '';
        const availableResolutions = req.body.availableResolutions ?? [];
        const publicationDate = req.body.publicationDate ?? '';
        const canBeDownloaded = req.body.canBeDownloaded ?? false;
        const minAgeRestriction = req.body.minAgeRestriction ?? 18;

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
    }) as RequestHandler,
    deleteVideo: ((req: Request, res: Response): Response | void => {
        const videoId = +req.params.id; // Преобразуем id из строки в число
        const video = db.videos.find((v) => v.id === videoId);

        if (!video) {
            return res.status(404).send({ error: 'Video not found' });
        }

        // Удаляем видео
        db.videos = db.videos.filter((video) => video.id !== videoId);

        // Отправляем успешный ответ
        return res.status(204).send();
    }) as RequestHandler
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
