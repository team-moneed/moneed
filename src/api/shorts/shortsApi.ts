import axios from 'axios';

export const fetchShorts = async () => {
    const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            part: 'snippet',
            q: '주식 쇼츠',
            type: 'video',
            videoDuration: 'short',
            maxResults: 20,
            key: YOUTUBE_API_KEY,
        },
    });
    return response.data.items;
};
