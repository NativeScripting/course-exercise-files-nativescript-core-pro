export enum LoggingLevelEnum {
  Log = 'Log',
  Warning = 'Warning',
  Error = 'Error',
  Debug = 'Debug'
}

export interface AppConfig {
  apiEndpoint: string;
  loggingEnabled: boolean;
  loggingLevel: LoggingLevelEnum;
}
