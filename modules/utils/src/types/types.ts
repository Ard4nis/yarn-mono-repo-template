interface logFunction {
    (message: string, meta?: object, tags?: Array<string>): unknown;
}

export interface Log {
    log: (level: 'info' | 'debug' | 'warn' | 'error', message: string, meta?: object, tags?: Array<string>) => unknown;
    info: logFunction;
    debug: logFunction;
    warn: logFunction;
    error: logFunction;
}
