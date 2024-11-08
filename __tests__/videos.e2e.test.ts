import {req} from './test-helpers'
import {SETTINGS} from '../src/settings'
import {
    dataset2,
    longAuthorVideoData,
    longTitleVideoData,
    missingTitleVideoData,
    validVideoData
} from "./datasets";
import {db, setDB} from "../src/db/db";

describe('GET /videos', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB();
    })

    it('should get empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200) // проверяем наличие эндпоинта

        console.log(res.body)
        expect(res.body.length).toBe(0)
    })
});

describe('POST /videos - create video', () => {
    it('should add a new video with valid data', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(validVideoData)
            .expect(201);

        console.log(res.body);
        expect(res.body).toMatchObject({
            title: validVideoData.title,
            author: validVideoData.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            availableResolutions: ["P144"]
        });
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('createdAt');
        expect(res.body).toHaveProperty('publicationDate');
    });
    it('should return 400 if title is missing', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(missingTitleVideoData)
            .expect(400);

        console.log(res.body);
    });
    it('should return 400 if title is too long', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(longTitleVideoData)
            .expect(400);

        console.log(res.body);
    });
    it('should return 400 if author is too long', async () => {
        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(longAuthorVideoData)
            .expect(400);

        console.log(res.body);
    });
});

describe('GET /videos/{id}', () => {
    beforeAll(async () => { // очистка базы данных перед началом тестирования
        setDB(dataset2);
    })

    it('should get video by id', async () => {
        const videoId = 1; // Замените на ID существующего видео
        const res = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .expect(200);

        console.log(res.body);
        expect(res.body.id).toEqual(1);
        expect(res.body.title).toEqual('video 1');
        expect(res.body.author).toEqual('author 1');
    });
    it('should get 404 error', async () => {
        const videoId = 5; // Замените на ID существующего видео
        const res = await req
            .get(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .expect(404);

        console.log(res.body);
    });
});

describe('PUT /videos/{id}', () => {
    beforeAll(async () => {
        setDB(dataset2);
    });

    it('should update video successfully', async () => {
        const videoId = 1;
        const validData = {
            title: 'Updated Title',
            author: 'Updated Author',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            publicationDate: "2024-11-09T18:08:34.120Z",
            availableResolutions: ['P144'],
        };

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(validData)
            .expect(204);

        console.log(res.body);
        expect(res.body).toEqual({});
    });

    it('should return 400 for invalid data', async () => {
        const videoId = 1;
        const invalidData = {
            title: '',
            publicationDate: 'invalid-date', // Некорректная дата
        };

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .send(invalidData)
            .expect(400);

        console.log(res.body);
        expect(res.body.title).toEqual(undefined);
        expect(res.body.publicationDate).toEqual(undefined);
    });

    it('should return 404 if video does not exist', async () => {
        const nonExistentVideoId = 9999;
        const validData = {
            title: 'New Title',
            author: 'New Author',
            canBeDownloaded: true,
            minAgeRestriction: 16,
            publicationDate: new Date().toISOString(),
            availableResolutions: ['P144'],
        };

        const res = await req
            .put(`${SETTINGS.PATH.VIDEOS}/${nonExistentVideoId}`)
            .send(validData)
            .expect(404);

        expect(res.body).toEqual({ error: 'Video not found' });
        console.log(res.body);
    });
});

describe('DELETE /videos/{id}', () => {
    beforeAll(async () => {
        setDB(dataset2);
    });

    it('should delete the video successfully (204)', async () => {
        const videoId = 1;

        await req
            .delete(`${SETTINGS.PATH.VIDEOS}/${videoId}`)
            .expect(204);

        // Убедиться, что видео удалено
        const video = db.videos.find((v) => v.id === videoId);
        expect(video).toBeUndefined();
    });

    it('should return 404 if video does not exist', async () => {
        const nonExistentVideoId = 9999;

        const res = await req
            .delete(`${SETTINGS.PATH.VIDEOS}/${nonExistentVideoId}`)
            .expect(404);

        expect(res.body).toEqual({ error: 'Video not found' });
    });
});

describe('DELETE /testing/all-data', () => {
    beforeAll(async () => {
        setDB(dataset2);
    });

    it('should delete all data', async () => {
        // Выполняем запрос
        const res = await req
            .delete(`${SETTINGS.PATH.TESTING}/all-data`)
            .expect(204);

        // Убедимся, что данные очищены
        expect(db.videos.length).toBe(0);
        console.log(res.body);
    });
});