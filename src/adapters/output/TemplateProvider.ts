import * as path from "path";
import * as fs from "fs";

export class TemplateProvider {
  private static readonly BASE_PATH = path.join(__dirname, "../../models/");
  private static readonly USER_MODELS_PATH =
    process.env.USER_TEMPLATES_PATH || path.join(process.cwd(), "stubKit/");

  static getTemplate(
    type: string,
    name: string,
    framework: string = "default"
  ): string {
    const userModelPath = path.join(
      this.USER_MODELS_PATH,
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

  static saveUserTemplate(type: string, name: string, content: string): void {
    const modelPath = path.join(
      this.USER_MODELS_PATH,
      `${type}.${name}.stubKit`
    );
    fs.writeFileSync(modelPath, content);
  }
}
