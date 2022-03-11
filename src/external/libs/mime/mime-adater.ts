import Mime from 'mime-types';
import { MimeHelper } from '../../../presentation/controllers/ports';

export class MimeAdapter implements MimeHelper {
  getExtension(mime: string): string {
    return Mime.extension(mime) || '';
  }
}
