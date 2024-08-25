import * as fs from "fs/promises";
import { Template } from "../../core/entities/Template";
import { FileOutputPort } from "../../ports/output/FileOutputPort";

export class FileOutputAdapter implements FileOutputPort {
  async writeFile(template: Template): Promise<void> {
    const filePath = `${template.name}.${template.type}.ts`;
    await fs.writeFile(filePath, template.content);
  }
}
