import * as enquirer from 'enquirer';

interface SelectOptions {
  name?: string;
  message: string;
  choices?: string[];
}

declare module 'enquirer' {
  export class Select {
    constructor(options: SelectOptions);

    public run(): Promise<string>;
  }

  export class Input {
    constructor(options: SelectOptions);

    public run(): Promise<string>;
  }
}
