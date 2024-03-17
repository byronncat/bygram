export enum LogType {
  SUCCESS,
  INFO,
  ERROR,
  WARN,
  DEBUG,
}

export type LogTypeStrings = keyof typeof LogType;
