import * as path from "path";
import * as fs from "fs";

export class TemplateProvider {
  private static readonly BASE_PATH = path.join(__dirname, "../../models/");
  private static readonly USER_MODELS_PATH = path.join(
    __dirname,
    "../../user-models/"
  );

  static getTemplate(
    type: string,
    name: string,
    framework: string = "default"
  ): string {
    const modelPath = path.join(this.BASE_PATH, framework, `${type}.template`);
    if (fs.existsSync(modelPath)) {
      return fs.readFileSync(modelPath, "utf-8").replace(/{{name}}/g, name);
    }
    return "";
  }

  static saveUserTemplate(type: string, name: string, content: string): void {
    const modelPath = path.join(
      this.USER_MODELS_PATH,
      `${type}.${name}.template`
    );
    fs.writeFileSync(modelPath, content);
  }
}
