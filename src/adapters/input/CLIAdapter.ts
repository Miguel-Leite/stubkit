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
        `Arquivo '${name}.${type}.ts' criado com sucesso em ${outputPath}.`
      );
    } else {
      throw new Error(
        `Modelo para '${type}' no framework '${framework}' não encontrado.`
      );
    }
  }

  setup(program: Command) {
    program
      .command("create <type> <name> [framework]")
      .option(
        "--path <path>",
        "Caminho para salvar o arquivo",
        this.defaultPath
      )
      .description("Cria um novo arquivo a partir de um modelo")
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
      .option(
        "--path <path>",
        "Caminho para salvar o template",
        this.defaultPath
      )
      .description("Adiciona um novo modelo personalizado")
      .action((type: string, name: string, options: { path: string }) => {
        console.log(
          `Por favor, insira o conteúdo do modelo '${name}' (pressione Ctrl+D para finalizar):`
        );
        let content = "";
        process.stdin.on("data", (chunk) => {
          content += chunk;
        });
        process.stdin.on("end", () => {
          TemplateProvider.saveUserTemplate(type, name, content, options.path);
          console.log(
            `Modelo '${name}' adicionado com sucesso em ${options.path}.`
          );
        });
      });
  }
}
