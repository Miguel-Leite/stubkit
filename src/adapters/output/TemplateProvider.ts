import * as path from "path";
import * as fs from "fs";

export class TemplateProvider {
  private static readonly BASE_PATH = path.join(__dirname, "../../models/");
  private static readonly DEFAULT_USER_MODELS_PATH = path.join(
    process.cwd(),
    "stubKit/"
  );

  private static getUserModelsPath(): string {
    return process.env.USER_TEMPLATES_PATH || this.DEFAULT_USER_MODELS_PATH;
  }

  static getTemplate(
    type: string,
    name: string,
    framework: string = "default",
    outputPath?: string
  ): string {
    const userModelPath = outputPath
      ? path.join(outputPath, `${type}.${name}.stubKit`)
      : path.join(
          this.getUserModelsPath(),
          framework,
          `${type}.${name}.stubKit`
        );

    if (fs.existsSync(userModelPath)) {
      return fs.readFileSync(userModelPath, "utf-8").replace(/{{name}}/g, name);
    }

    const modelPath = path.join(this.BASE_PATH, framework, `${type}.stubKit`);
    if (fs.existsSync(modelPath)) {
      return fs.readFileSync(modelPath, "utf-8").replace(/{{name}}/g, name);
    }

    console.error("File Not Found", userModelPath);
    console.error("File Not Found", modelPath);
    return "";
  }

  static saveUserTemplate(
    type: string,
    name: string,
    content: string,
    outputPath?: string
  ): void {
    const modelPath = outputPath
      ? path.join(outputPath, `${type}.${name}.stubKit`)
      : path.join(this.getUserModelsPath(), `${type}.${name}.stubKit`);
    fs.writeFileSync(modelPath, content);
  }
}
