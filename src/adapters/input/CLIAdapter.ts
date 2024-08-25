import { Command } from "commander";
import { GenerateFile } from "../../core/use-cases/GenerateFile";
import { CreateFilePort } from "../../ports/input/CreateFilePort";
import { FileOutputAdapter } from "../output/FileOutputAdapter";
import { TemplateProvider } from "../output/TemplateProvider";
import { Template } from "../../core/entities/Template";

export class CLIAdapter implements CreateFilePort {
  private generateFile: GenerateFile;

  constructor() {
    const fileOutputAdapter = new FileOutputAdapter();
    this.generateFile = new GenerateFile(fileOutputAdapter);
  }

  async createFile(
    type: string,
    name: string,
    framework: string = "default"
  ): Promise<void> {
    const content = TemplateProvider.getTemplate(type, name, framework);
    if (content) {
      const template = new Template(type, name, content);
      await this.generateFile.execute(template);
    } else {
      // console.error(
      //   `Modelo para '${type}' no framework '${framework}' não encontrado.`
      // );
      throw new Error(
        `Modelo para '${type}' no framework '${framework}' não encontrado.`
      );
    }
  }

  setup(program: Command) {
    program
      .command("create <type> <name> [framework]")
      .description("Cria um novo arquivo a partir de um modelo")
      .action(
        async (type: string, name: string, framework: string = "default") => {
          try {
            await this.createFile(type, name, framework);
            console.log(`Arquivo '${name}.${type}.ts' criado com sucesso.`);
          } catch (error) {
            console.error(error);
          }
        }
      );

    program
      .command("add-template <type> <name>")
      .description("Adiciona um novo modelo personalizado")
      .action((type: string, name: string) => {
        console.log(
          `Por favor, insira o conteúdo do modelo '${name}' (pressione Ctrl+D para finalizar):`
        );
        let content = "";
        process.stdin.on("data", (chunk) => {
          content += chunk;
        });
        process.stdin.on("end", () => {
          TemplateProvider.saveUserTemplate(type, name, content);
          console.log(`Modelo '${name}' adicionado com sucesso.`);
        });
      });
  }
}
