import { File } from '../../entities';

export interface FileAdapter {
  upload(data: File): Promise<string>
}
