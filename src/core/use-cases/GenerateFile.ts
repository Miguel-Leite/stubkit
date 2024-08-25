import { FileOutputPort } from "../../ports/output/FileOutputPort";
import { Template } from "../entities/Template";

export class GenerateFile {
  constructor(private fileOutputPort: FileOutputPort) {}

  async execute(template: Template): Promise<void> {
    await this.fileOutputPort.writeFile(template);
  }
}
