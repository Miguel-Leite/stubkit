import * as fs from "fs";
import { FileOutputAdapter } from "../../adapters/output/FileOutputAdapter";
import { Template } from "../entities/Template";

export class GenerateFile {
  private fileOutputAdapter: FileOutputAdapter;

  constructor(fileOutputAdapter: FileOutputAdapter) {
    this.fileOutputAdapter = fileOutputAdapter;
  }

  async execute(template: Template, filePath: string) {
    const content = template.content;
    fs.writeFileSync(filePath, content);
  }
}
