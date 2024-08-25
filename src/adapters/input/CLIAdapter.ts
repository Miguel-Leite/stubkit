import { FileOutputAdapter } from "@adapters/output/FileOutputAdapter";
import { TemplateProvider } from "@adapters/output/TemplateProvider";
import { Template } from "@core/entities/Template";
import { GenerateFile } from "@core/use-cases/GenerateFile";
import { CreateFilePort } from "@ports/input/CreateFilePort";
import { Command } from "commander";

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
      console.error(
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
          await this.createFile(type, name, framework);
          console.log(`Arquivo '${name}.${type}.ts' criado com sucesso.`);
        }
      );

    program
      .command("add-template <type> <name> [framework]")
      .description("Adiciona um novo modelo personalizado")
      .action((type: string, name: string, framework: string = "default") => {
        const content = `// Novo modelo para ${name} no framework ${framework}`;
        TemplateProvider.saveUserTemplate(type, name, content);
        console.log(
          `Modelo '${name}' para o framework '${framework}' adicionado com sucesso.`
        );
      });
  }
}
