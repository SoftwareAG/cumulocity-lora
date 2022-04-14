import winston, { createLogger, format, transports } from "winston";

export class Logger {
    static getLogger(serviceName: string) : winston.Logger {
        return createLogger({
            transports: [new transports.Console()],
            format: format.combine(
              format.colorize(),
              format.timestamp(),
              format.printf(({ timestamp, level, message, service }) => {
                return `[${timestamp}] ${service} ${level}: ${message}`;
              })
            ),
            defaultMeta: {
              service: serviceName,
            },
        });
    }
}