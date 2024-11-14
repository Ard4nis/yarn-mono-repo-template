import { Context } from 'aws-lambda';
import { LambdaLog } from 'lambda-log';

import { Log } from '../types';

export const createLogInstance = (context?: Context): Log => {
    const log = new LambdaLog({
        meta: {
            lambdaFunction: context?.functionName,
            requestId: context?.awsRequestId,
        },
        debug: process.env.LOG_LEVEL === 'DEBUG',
    });

    return { log: log.log, debug: log.debug, info: log.info, warn: log.warn, error: log.error };
};
