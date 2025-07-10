import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UploaderService {
  private client: S3Client;
  private bucketName: string;
  constructor() {
    const bucketName = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;
    const accessKeyId = process.env.AWS_ACCESS_KEY;
    const secretAccessKey = process.env.AWS_SECRET_KEY;

    if (!bucketName || !region || !accessKeyId || !secretAccessKey) {
      throw new Error('Missing AWS S3 configuration in environment variables');
    }

    this.bucketName = bucketName;
    this.client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload(image: Express.Multer.File, key: string) {
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key + '.jpg',
      Body: image.buffer,
    });

    await this.client.send(command);
  }

  async getSignedUrl(key: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key + '.jpg',
    });

    return await getSignedUrl(this.client, command, { expiresIn: 3600 });
  }

  async delete(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key + '.jpg',
    });

    await this.client.send(command);
  }
}
