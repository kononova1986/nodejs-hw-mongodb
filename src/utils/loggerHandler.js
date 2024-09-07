import pino from 'pino-http';
const loggerHandler = pino({
  transport: {
    target: 'pino-pretty',
  },
});

export default loggerHandler;
