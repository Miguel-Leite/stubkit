import { Command } from "commander";

import { CLIAdapter } from "@adapters/input/CLIAdapter";

const program = new Command();
const cliAdapter = new CLIAdapter();

program
  .name("stubkit")
  .version("0.1.0")
  .description("CLI para criar arquivos a partir de stubs");

cliAdapter.setup(program);

program.parse(process.argv);
