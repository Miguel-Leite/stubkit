import { Template } from "../../core/entities/Template";

export interface FileOutputPort {
  writeFile(template: Template): Promise<void>;
}
