/**
 * Copyright 2021 Francois Chabot
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

let contextualCleanupHandler = () => { };
const setContextualCleanupHandler = (handler) => {
    contextualCleanupHandler = handler;
};
class DynamicBaseImpl {
    constructor(initVal) {
        this._listeners = [];
        this._value = initVal;
    }
    get current() {
        return this._value;
    }
    set(v) {
        const notif = this._value !== v;
        this._value = v;
        if (notif) {
            this.notify();
        }
    }
    toString() {
        return `${this._value}`;
    }
    addListener(lst) {
        this._listeners.push(lst);
        contextualCleanupHandler(() => {
            this.removeListener(lst);
        });
    }
    removeListener(lst) {
        this._listeners.splice(this._listeners.indexOf(lst), 1);
    }
    notify() {
        let len = this._listeners.length;
        while (len--) {
            this._listeners[len](this._value);
        }
    }
}
DynamicBaseImpl.prototype._probed_dyntype = 1;

class DynamicListImpl extends DynamicBaseImpl {
    push(v) {
        this._value.push(v);
        this.notify();
    }
    map(cb) {
        const regenerate = (newArray) => {
            const result = [];
            const len = newArray.length;
            for (let i = 0; i < len; ++i) {
                result.push(cb(newArray[i], i, newArray));
            }
            return result;
        };
        const result = new DynamicListImpl(regenerate(this.current));
        this.addListener((v) => {
            result._value = regenerate(v);
        });
        return result;
    }
}

class DynamicValueImpl extends DynamicBaseImpl {
    valueOf() {
        return this._value;
    }
}

function listen(v, cb) {
    if (isDynamic(v)) {
        v.addListener(cb);
    }
}
function transform(cb, v) {
    if (isDynamic(v)) {
        const result = dynamic(cb(v.current));
        v.addListener((newVal) => result.set(cb(newVal)));
        return result;
    }
    else {
        return cb(v);
    }
}
function valType(v) {
    if (isDynamic(v)) {
        return typeof v.current;
    }
    else {
        return typeof v;
    }
}
function dynamic(init) {
    if (Array.isArray(init)) {
        return new DynamicListImpl(init);
    }
    return new DynamicValueImpl(init);
}
function isDynamic(val) {
    return val !== null && typeof val === 'object' && !!val._probed_dyntype;
}

exports.dynamic = dynamic;
exports.isDynamic = isDynamic;
exports.listen = listen;
exports.setContextualCleanupHandler = setContextualCleanupHandler;
exports.transform = transform;
exports.valType = valType;
//# sourceMappingURL=probe-dynamics.js.map
