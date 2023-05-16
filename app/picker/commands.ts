interface CommandStep {
  output: () => string[];
  artificialDelay: number;
}

export interface Command {
  commandText: string;
  processingSteps: CommandStep[];
  onExecutionDone: () => void;
}

interface CommandList {
  [key: string]: Command;
  pick: Command;
  quickpick: Command;
  list: Command;
  reset: Command;
  login: Command;
}

export const commands: CommandList = {
  pick: {
    commandText: "fadapi pick",
    processingSteps: [
      {
        output: () => ["picking a person..."],
        artificialDelay: 1000,
      },
    ],
    onExecutionDone: () => {},
  },
  quickpick: {
    commandText: "fadapi pick --quick",
    processingSteps: [
      {
        output: () => ["picking a person boringly quick..."],
        artificialDelay: 0,
      },
    ],
    onExecutionDone: () => {},
  },
  list: {
    commandText: "fadapi list",
    processingSteps: [
      {
        output: () => ["person 1", "person 2", "person 3"],
        artificialDelay: 2000,
      },
    ],
    onExecutionDone: () => {},
  },
  reset: {
    commandText: "fadapi reset",
    processingSteps: [
      {
        output: () => ["reset in progress..."],
        artificialDelay: 0,
      },
      {
        output: () => ["(fake) reset done."],
        artificialDelay: 500,
      },
    ],
    onExecutionDone: () => {},
  },
  login: {
    commandText: "fadapi login",
    processingSteps: [
      {
        output: () => ["no session stuff at the moment, sorry..."],
        artificialDelay: 1000,
      },
    ],
    onExecutionDone: () => {},
  },
};
