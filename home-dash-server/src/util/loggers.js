import expressWinston from 'express-winston';
import winston from 'winston';

export const infoConsoleLogger = expressWinston.logger({
	transports: [
		new winston.transports.Console({
			colorize: true,
		}),
	],
});

export const errorConsoleLogger = expressWinston.errorLogger({
	transports: [
		new winston.transports.Console({
			colorize: true,
		}),
	],
});
