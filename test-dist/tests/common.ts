import { setContextualCleanupHandler } from '@probed/dynamics';

let cleanupQueue: (() => void)[] = [];
setContextualCleanupHandler((op: () => void) => cleanupQueue.push(op));

export const cleanup = (): void => {
    cleanupQueue.forEach((v) => v());
    cleanupQueue = [];
};
