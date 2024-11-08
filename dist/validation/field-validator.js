"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicationDateFieldValidator = exports.availableResolutionsFieldValidator = exports.authorFieldValidator = exports.titleFieldValidator = exports.Resolutions = void 0;
var Resolutions;
(function (Resolutions) {
    Resolutions["P144"] = "P144";
    Resolutions["P240"] = "P240";
    Resolutions["P360"] = "P360";
    Resolutions["P480"] = "P480";
    Resolutions["P720"] = "P720";
    Resolutions["P1080"] = "P1080";
    Resolutions["P1440"] = "P1440";
    Resolutions["P2160"] = "P2160";
})(Resolutions || (exports.Resolutions = Resolutions = {}));
const titleFieldValidator = (title, errorsArray) => {
    if (!title) {
        errorsArray.push({ field: 'title', message: 'title is required' });
    }
    if (title && title.trim().length > 40) {
        errorsArray.push({ field: 'title', message: 'title is more than 40 symbols' });
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({ field: 'title', message: 'title is required' });
    }
};
exports.titleFieldValidator = titleFieldValidator;
const authorFieldValidator = (author, errorsArray) => {
    if (!author) {
        errorsArray.push({ field: 'author', message: 'author is required' });
    }
    if (author && author.trim().length > 40) {
        errorsArray.push({ field: 'author', message: 'author is more than 40 symbols' });
    }
    if (author && author.trim().length < 1) {
        errorsArray.push({ field: 'author', message: 'author is required' });
    }
};
exports.authorFieldValidator = authorFieldValidator;
const availableResolutionsFieldValidator = (availableResolutions, errorsArray) => {
    availableResolutions.forEach(resolution => {
        if (!Object.keys(Resolutions).includes(resolution)) {
            errorsArray.push({ field: 'availableResolutions', message: 'availableResolutions exist no valid value' });
            return;
        }
    });
};
exports.availableResolutionsFieldValidator = availableResolutionsFieldValidator;
const publicationDateFieldValidator = (publicationDate, errorsArray) => {
    const date = new Date(publicationDate);
    if (isNaN(date.getTime())) {
        errorsArray.push({
            field: 'publicationDate',
            message: 'Field publicationDate have to be valid date ISO 8601',
        });
    }
};
exports.publicationDateFieldValidator = publicationDateFieldValidator;
