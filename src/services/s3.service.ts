import { S3 } from '@/s3';
import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, waitUntilObjectNotExists } from '@aws-sdk/client-s3';

export default class S3Service {
    private S3 = S3;

    async uploadPostImage(thumbnailImage: File) {
        let uploadedImageUrl: string | undefined;

        // 썸네일 이미지가 있는 경우에만 S3에 업로드
        if (thumbnailImage) {
            const fileName = `posts/${Date.now()}-${thumbnailImage.name}`;

            // File 객체를 ArrayBuffer로 변환
            const buffer = await thumbnailImage.arrayBuffer();

            const command = new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: fileName,
                Body: new Uint8Array(buffer),
                ContentType: thumbnailImage.type,
            });

            try {
                await this.S3.send(command);
                uploadedImageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION || 'ap-northeast-2'}.amazonaws.com/${fileName}`;
            } catch (error) {
                console.error('❌ S3 업로드 실패:', error);
                throw new Error(
                    `이미지 업로드에 실패했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`,
                );
            }
        }

        return uploadedImageUrl;
    }

    async getPostImage(fileName: string) {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
        });

        try {
            const res = await this.S3.send(command);
            return res.Body;
        } catch (error) {
            console.error('❌ S3 이미지 가져오기 실패:', error);
            throw new Error('이미지 가져오기에 실패했습니다.');
        }
    }

    async deletePostImage(fileName: string) {
        const command = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: fileName,
        });

        try {
            const res = await this.S3.send(command);
            await waitUntilObjectNotExists(
                { client: this.S3, maxWaitTime: 10000 },
                { Bucket: process.env.AWS_BUCKET_NAME, Key: fileName },
            );
            return res.$metadata;
        } catch (error) {
            console.error('❌ S3 이미지 삭제 실패:', error);
            throw new Error('이미지 삭제에 실패했습니다.');
        }
    }
}
