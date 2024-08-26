export interface CreateFilePort {
  createFile(
    type: string,
    name: string,
    framework?: string,
    outputPath?: string
  ): Promise<void>;
}
