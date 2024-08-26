import { Command } from "commander";
import { GenerateFile } from "../../core/use-cases/GenerateFile";
import { CreateFilePort } from "../../ports/input/CreateFilePort";
import { FileOutputAdapter } from "../output/FileOutputAdapter";
import { TemplateProvider } from "../output/TemplateProvider";
import { Template } from "../../core/entities/Template";
import * as path from "path";
import * as fs from "fs";

export class CLIAdapter implements CreateFilePort {
  private generateFile: GenerateFile;
  private defaultPath: string = "./";

  constructor() {
    const fileOutputAdapter = new FileOutputAdapter();
    this.generateFile = new GenerateFile(fileOutputAdapter);
  }

  async createFile(
    type: string,
    name: string,
    framework: string = "default",
    outputPath: string = this.defaultPath
  ): Promise<void> {
    const content = TemplateProvider.getTemplate(type, name, framework);
    if (content) {
      const template = new Template(type, name, content);
      const filePath = path.join(outputPath, `${name}.${type}.ts`);

      const dir = path.dirname(filePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      await this.generateFile.execute(template, filePath);
      console.log(
        `File '${name}.${type}.ts' created successfully in ${outputPath}.`
      );
    } else {
      throw new Error(
        `Template for '${type}' in framework '${framework}' not found.`
      );
    }
  }

  setup(program: Command) {
    program
      .command("create <type> <name> [framework]")
      .option("--path <path>", "Path to save file", this.defaultPath)
      .description("Create a new file from a template")
      .action(
        async (
          type: string,
          name: string,
          framework: string = "default",
          options: { path: string }
        ) => {
          try {
            await this.createFile(type, name, framework, options.path);
          } catch (error: any) {
            console.error(error.message);
          }
        }
      );

    program
      .command("add-template <type> <name>")
      .option("--path <path>", "Path to save the template", this.defaultPath)
      .description("Add a new custom template")
      .action((type: string, name: string, options: { path: string }) => {
        console.log(
          `Please enter the content of the template '${name}' (press Ctrl+D to finish):`
        );
        let content = "";
        process.stdin.on("data", (chunk) => {
          content += chunk;
        });
        process.stdin.on("end", () => {
          TemplateProvider.saveUserTemplate(type, name, content, options.path);
          console.log(
            `Template '${name}' successfully added to ${options.path}.`
          );
        });
      });
  }
}
