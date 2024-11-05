import { DateString } from '@/infra/shared/types/common.type';

export interface UserModel {
  id?: number;
  taxId: string;
  name: string;
  birthDate: DateString;
  password?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  recordStatus?: string;
  removedAt?: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
