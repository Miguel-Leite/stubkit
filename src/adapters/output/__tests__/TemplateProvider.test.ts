import * as fs from "fs";
import * as path from "path";
import { TemplateProvider } from "../TemplateProvider";

describe("TemplateProvider", () => {
  const USER_MODELS_PATH = path.join(process.cwd(), "stubKit");
  const TEST_TYPE = "controller";
  const TEST_NAME = "TestController";
  const TEST_CONTENT = `class {{name}} {}`;

  beforeAll(() => {
    if (!fs.existsSync(USER_MODELS_PATH)) {
      fs.mkdirSync(USER_MODELS_PATH, { recursive: true });
    }
  });

  afterAll(() => {
    fs.rmSync(USER_MODELS_PATH, { recursive: true, force: true });
  });

  it("should save and retrieve a user template", () => {
    TemplateProvider.saveUserTemplate(TEST_TYPE, TEST_NAME, TEST_CONTENT);

    const template = TemplateProvider.getTemplate(TEST_TYPE, TEST_NAME);
    expect(template).toContain("class TestController {");
  });

  it("should use default template when user template is not found", () => {
    const template = TemplateProvider.getTemplate(TEST_TYPE, "NonExistingName");
    expect(template).toBe("");
  });
});
