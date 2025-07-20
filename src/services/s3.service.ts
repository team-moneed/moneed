import { S3 } from '@/s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';

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
                const res = await this.S3.send(command);
                console.log('✅ S3 업로드 성공:', res.$metadata);
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
}
