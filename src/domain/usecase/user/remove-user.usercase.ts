export interface RemoveUserUseCaseDomain {
  execute(id: number, removedBy: number): Promise<void>;
}
