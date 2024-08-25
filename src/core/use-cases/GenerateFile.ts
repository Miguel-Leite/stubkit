import { Template } from "@core/entities/Template";
import { FileOutputPort } from "@ports/output/FileOutputPort";

export class GenerateFile {
  constructor(private fileOutputPort: FileOutputPort) {}

  async execute(template: Template): Promise<void> {
    await this.fileOutputPort.writeFile(template);
  }
}
