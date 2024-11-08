import {VideoDBType} from "./video-db-type";
import {Resolutions} from "../validation/field-validator";

export type DBType = { // типизация базы данных (что мы будем в ней хранить)
    videos: VideoDBType[]
}

export const db: DBType = {
    videos: [
        {
            id: 2,
            title: 'video 2',
            author: 'author 2',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: [Resolutions.P720],
        }
    ],
}

// функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { // если в функцию ничего не передано - то очищаем базу данных
        db.videos = [];
        return;
    }

    // если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos;
}