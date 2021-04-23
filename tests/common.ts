import { setContextualCleanupHandler } from '../src';
import { CleanupOp } from '../src/ApiTypes';

let cleanupQueue: CleanupOp[] = [];
setContextualCleanupHandler((op) => cleanupQueue.push(op));

export const cleanup = (): void => {
    cleanupQueue.forEach((v) => v());
    cleanupQueue = [];
};
