import { IsoDateString } from '@/infra/shared/types/common.type';
import * as dayjs from 'dayjs';

export class DateUtil {
  static format(date: Date | IsoDateString, formatOutput: string): string {
    return dayjs(date).format(formatOutput);
  }
}
