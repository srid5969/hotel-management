import winston from 'winston';
import appInsights = require('applicationinsights');
import {AiTransport} from './ai-transport';
import {appConfig, environment} from '../config';
import stream from 'stream';
appInsights
  .setup(appConfig.appInsightsKey)
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true, true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(false)
  .start();

const aIclient = appInsights.defaultClient;
aIclient.context.tags[aIclient.context.keys.cloudRole] = appConfig.serviceName;

const level = environment === 'production' ? 'info' : 'debug';

const options: winston.LoggerOptions = {
  transports: [
    new winston.transports.Console({
      level,
    }),
    new AiTransport({
      client: aIclient,
      level,
    }),
  ],
};

export const winstonLogger = winston.createLogger(options);
type LogLevels = 'info' | 'debug' | 'error';

const logMessage = (level: LogLevels, code: string, message: unknown) => {
  if (typeof message === 'object') {
    try {
      message =
        message instanceof Error
          ? JSON.stringify(message, Object.getOwnPropertyNames(message))
          : JSON.stringify(message);
    } catch (e) {
      message = `logger could not stringify ${message}`;
    }
  }
  winstonLogger[level]({code, message});
};

class Logger {
  getAiClient() {
    return aIclient;
  }
  info(code: string, message: unknown) {
    logMessage('info', code, message);
  }
  debug(code: string, message: unknown) {
    logMessage('debug', code, message);
  }
  error(code: string, message: unknown) {
    logMessage('error', code, message);
  }
  trackEvent(name: string, data: unknown) {
    aIclient.trackEvent({
      name,
      time: new Date(),
      properties: data,
    });
  }
}

export const logger = new Logger();
export class LoggingStream extends stream.Writable {
  write(chunk: unknown) {
    winstonLogger.info(chunk);
    return true;
  }
}
