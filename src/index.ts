#!/usr/bin/env node
import { Command } from "commander";
import { CLIAdapter } from "./adapters/input/CLIAdapter";

require("dotenv").config();

const program = new Command();
const cliAdapter = new CLIAdapter();

program
  .name("stubkit")
  .version("0.1.0")
  .description("CLI to create files from stubs");

cliAdapter.setup(program);

program.parse(process.argv);
