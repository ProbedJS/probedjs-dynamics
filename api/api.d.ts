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

// ***************** Components ***************** //

export type CleanupOp = () => void;

/** Consumer API for a dynamic value. */
export interface DynamicReaderBase<T> {
    addListener(lst: (v: T) => void): void;
    removeListener(lst: (v: T) => void): void;

    readonly current: T;

    /** gets string representation */
    toString(): string;
}

/** Consumer API for a dynamic primitive. */
export interface DynamicValueReader<T> extends DynamicReaderBase<T> {
    valueOf: () => T;
}

/** Consumer API for a dynamic Array. */
export interface DynamicListReader<T extends Array<unknown>> extends DynamicReaderBase<T> {
    map<U>(cb: (v: ListValueType<T>, index: number, array: T) => U): DynamicList<U[]>;
}

/** Universal "This might be dynamic or not". */
export type Reader<T> = T | DynamicReader<T>;

// ************ Dynamics - Writers ************ //

export interface DynamicBase<T> extends DynamicReaderBase<T> {
    /** Assigning this will notify all listeners. */
    set(v: T): void;

    /** Manually trigger all listeners. */
    notify(): void;
}

export interface DynamicValue<T> extends DynamicBase<T> {
    valueOf: () => T;
}

export interface DynamicList<T extends Array<unknown>> extends DynamicBase<T> {
    map<U>(cb: (v: ListValueType<T>, index: number, array: T) => U): DynamicList<U[]>;

    push(v: ListValueType<T>): void;
}

/** Determines at runtime if a value is static or dynamic. */
export declare function isDynamic<T>(val: T | DynamicReader<T>): val is DynamicReader<T>;

/** Creates a new Dynamic value. */
export declare function dynamic<T>(init: T[]): DynamicList<T[]>;
export declare function dynamic<T>(init: T): DynamicValue<T>;

/** Invokes a callback whenever the value changes, if it is dynamic */
export declare function listen<T>(v: Reader<T>, cb: (v: T) => void): void;

/** Creates a value, static or dynamic, that tracks the arguments. */
export declare function transform<T, U>(v: DynamicReaderBase<T>, cb: (v: T) => U): DynamicReader<U>;
export declare function transform<T, U>(v: T, cb: (v: T) => U): U;

/** Returns the result of JavaScript's typeof for the underlying value. */
export declare function valType<T>(v: Reader<T>): string;

// ***************** Utility / not user-facing ***************** //

export type DynamicReader<T> = DynamicListReader<T extends Array<unknown> ? T : never> | DynamicValueReader<T>;
export type ListValueType<ArrayType extends Array<unknown>> = ArrayType[number];

export default dynamic;
