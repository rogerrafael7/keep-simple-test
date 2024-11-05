export interface UserLogModel {
  id?: number;
  userId: number;
  createdBy?: number;
  updatedBy?: number;
  removedAt?: Date | null;
  removedBy?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
