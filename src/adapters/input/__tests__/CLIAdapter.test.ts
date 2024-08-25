import { Command } from "commander";
import { CLIAdapter } from "../CLIAdapter";
import * as fs from "fs";
import * as path from "path";
import { TemplateProvider } from "../../../adapters/output/TemplateProvider";

describe("CLIAdapter", () => {
  const adapter = new CLIAdapter();
  const program = new Command();
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
    fs.rmdirSync(USER_MODELS_PATH, { recursive: true });
  });

  test("create command should generate file", async () => {
    await new Promise<void>((resolve) => {
      program
        .command("create <type> <name>")
        .action(async (type: string, name: string) => {
          await adapter.createFile(type, name);
          resolve();
        });

      program.parse(["node", "test", "create", TEST_TYPE, TEST_NAME]);
    });

    const templateContent = TemplateProvider.getTemplate(TEST_TYPE, TEST_NAME);
    expect(templateContent).toBe(TEST_CONTENT);
  });

  test("add-template command should save template", (done) => {
    const stdin = process.stdin;
    const originalWrite = process.stdout.write;
    process.stdout.write = jest.fn();

    stdin.push(`${TEST_CONTENT}\n`);
    stdin.push("");
    stdin.end();

    program
      .command("add-template <type> <name>")
      .action((type: string, name: string) => {
        TemplateProvider.saveUserTemplate(type, name, TEST_CONTENT);
        expect(
          fs.existsSync(path.join(USER_MODELS_PATH, `${name}.stubKit`))
        ).toBe(true);
        process.stdout.write = originalWrite;
        done();
      });

    program.parse(["node", "test", "add-template", TEST_TYPE, TEST_NAME]);
  });
});
