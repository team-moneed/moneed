export const urlToS3FileName = (url: string) => {
    return new URL(url).pathname.slice(1);
};
