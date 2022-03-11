import S3 from 'aws-sdk/clients/s3';
import { File } from '../../entities';
import { FileAdapter, UuidAdapter } from '../../usecases/ports';

export class S3FileAdapter implements FileAdapter {
  constructor(
    private readonly bucketName: string,
    private readonly uuidAdapter: UuidAdapter,
  ) { }

  async upload(file: File): Promise<string> {
    const s3 = new S3();
    const result = await s3.upload({
      Bucket: this.bucketName,
      Key: file.name || `${this.uuidAdapter.generate()}.${file.ext}`,
      Body: file.data,
      ACL: 'public-read',
    }).promise();

    return result.Location;
  }
}
