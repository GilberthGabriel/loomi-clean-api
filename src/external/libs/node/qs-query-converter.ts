import qs from 'qs';
import { QueryConverter } from '../../../presentation/controllers/ports';

export class QsQueryConverter implements QueryConverter {
  parse(str: string) {
    return qs.parse(str);
  }
}
