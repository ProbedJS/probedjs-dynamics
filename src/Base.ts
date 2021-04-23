/*
 * Copyright 2021 Francois Chabot
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DynamicBase, CleanupOp } from './ApiTypes';

//eslint-disable-next-line no-empty-function, @typescript-eslint/no-empty-function
let contextualCleanupHandler: (op: CleanupOp) => void = () => {};

export const setContextualCleanupHandler = (handler: (op: CleanupOp) => void): void => {
    contextualCleanupHandler = handler;
};

export class DynamicBaseImpl<T> implements DynamicBase<T> {
    protected _value: T;
    protected _listeners: ((v: T) => void)[] = [];

    constructor(initVal: T) {
        this._value = initVal;
    }

    get current(): T {
        return this._value;
    }

    set(v: T): void {
        const notif = this._value !== v;
        this._value = v;
        if (notif) {
            this.notify();
        }
    }

    toString(): string {
        return `${this._value}`;
    }

    addListener(lst: (v: T) => void): void {
        this._listeners.push(lst);

        contextualCleanupHandler(() => {
            this.removeListener(lst);
        });
    }

    removeListener(lst: (v: T) => void): void {
        this._listeners.splice(this._listeners.indexOf(lst), 1);
    }

    notify(): void {
        let len = this._listeners.length;
        while (len--) {
            this._listeners[len](this._value);
        }
    }

    _probed_dyntype?: number; // Will be set in the prototype.
}
DynamicBaseImpl.prototype._probed_dyntype = 1;
