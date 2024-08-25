export interface CreateFilePort {
  createFile(type: string, name: string, framework?: string): Promise<void>;
}
