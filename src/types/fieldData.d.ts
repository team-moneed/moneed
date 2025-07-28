export interface CreatePostField {
    title: string;
    content: string;
    thumbnailImage?: File | null;
}

export interface UpdatePostField {
    title: string;
    content: string;
    thumbnailImage?: File | null;
    prevThumbnailImageUrl?: string;
}
