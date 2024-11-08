export enum Resolutions {
    "P144" = "P144",
    "P240" = "P240",
    "P360" = "P360",
    "P480" = "P480",
    "P720" = "P720",
    "P1080" = "P1080",
    "P1440" = "P1440",
    "P2160" = "P2160"
}

export const titleFieldValidator = (title: string, errorsArray: Array<{field: string; message: string}>) => {
    if (!title) {
        errorsArray.push({field: 'title', message: 'title is required'});
    }
    if (title && title.trim().length > 40) {
        errorsArray.push({field: 'title', message: 'title is more than 40 symbols'});
    }
    if (title && title.trim().length < 1) {
        errorsArray.push({field: 'title', message: 'title is required'});
    }
}

export const authorFieldValidator = (author: string, errorsArray: Array<{field: string; message: string}>) => {
    if (!author) {
        errorsArray.push({field: 'author', message: 'author is required'});
    }
    if (author && author.trim().length > 40) {
        errorsArray.push({field: 'author', message: 'author is more than 40 symbols'});
    }
    if (author && author.trim().length < 1) {
        errorsArray.push({field: 'author', message: 'author is required'});
    }
}

export const availableResolutionsFieldValidator = (availableResolutions: Resolutions[], errorsArray: Array<{field: string; message: string}>) => {
    availableResolutions.forEach(resolution => {
        if (!Object.keys(Resolutions).includes(resolution)) {
            errorsArray.push({field: 'availableResolutions', message: 'availableResolutions exist no valid value'});
            return;
        }
    })
}

export const publicationDateFieldValidator = (publicationDate: string, errorsArray: Array<{field: string; message: string}>) => {
    const date = new Date(publicationDate);

    if (isNaN(date.getTime())) {
        errorsArray.push({
            field: 'publicationDate',
            message: 'Field publicationDate have to be valid date ISO 8601',
        });
    }
}
