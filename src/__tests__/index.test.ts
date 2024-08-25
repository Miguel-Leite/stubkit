import * as path from "path";
import * as fs from "fs";

describe("Index", () => {
  const USER_MODELS_PATH = path.join(process.cwd(), "stubKit");

  beforeAll(() => {
    if (!fs.existsSync(USER_MODELS_PATH)) {
      fs.mkdirSync(USER_MODELS_PATH, { recursive: true });
    }
  });

  afterAll(() => {
    fs.rmdirSync(USER_MODELS_PATH, { recursive: true });
  });

  it("should be able to run CLI commands", (done) => {
    const { exec } = require("child_process");

    exec(
      "npx stubkit create controller TestController",
      (error: any, stdout: any, stderr: any) => {
        expect(error).toBe(null);
        expect(stdout).toContain(
          "Arquivo 'TestController.controller.ts' criado com sucesso."
        );
        done();
      }
    );
  });
});
