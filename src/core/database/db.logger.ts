import { white, red, green, magenta, blue, yellow, bgYellow } from 'colors/safe';


export interface ILogger {
    logStr: string
    execTime: number | undefined
    opts: any
}

export function dbLogger(logStr: string, execTime: number | undefined, opts?: any) {
    if (!opts) {
        opts = execTime;
        execTime = undefined;
    }

    let col = white
    switch (opts.type) {
        case 'SELECT':
            col = blue;
            break;
        case 'UPDATE':
            col = yellow;
            break;
        case 'INSERT':
            col = green;
            break;
        default:
            col = white;
            break;
    }

    if (execTime) {
        if (execTime >= 100) {
            col = red
            console.log(magenta(`[${execTime} ms]`), col(logStr));
        } else {
            console.log(col(logStr), yellow(`Execution Time :  ${blue(`[${execTime} ms]`)}`));
        }
    }
}