// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import {DBType} from '../src/db/db'
import {Resolutions} from "../src/validation/field-validator";
import {VideoDBType} from "../src/db/video-db-type";

// готовые данные для переиспользования в тестах

export const video1: VideoDBType = {
    id: Date.now() + Math.random(),
    title: 't' + Date.now() + Math.random(),
    author: 'a' + Date.now() + Math.random(),
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [Resolutions.P240],
}

export const dataset1: DBType = {
    videos: [video1],
}

export const newVideoData1 = {
    title: 'Test Video Title',
    author: 'Test Video Author',
    availableResolutions: ["P144"]
};

export const validVideoData = {
    title: 'Test Video Title',
    author: 'Test Video Author',
    availableResolutions: ["P144"]
};

export const missingTitleVideoData = {
    author: 'Test Video Author',
    availableResolutions: ["P144"]
};

export const longTitleVideoData = {
    title: 'Test Video Title with very very very very very long name',
    author: 'Test Video Author',
    availableResolutions: ["P144"]
};

export const longAuthorVideoData = {
    title: 'Test Video Title',
    author: 'Test Video Author with very very very very very long name',
    availableResolutions: ["P144"]
};

const videosData = [
    {
        id: 1,
        title: 'video 1',
        author: 'author 1',
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: [Resolutions.P1440],
    },
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
]

export const dataset2: DBType = {
    videos: videosData,
}

