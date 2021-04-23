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

export type DynamicReader<T> = DynamicListReader<T extends Array<unknown> ? T : never> | DynamicValueReader<T>;
export type ListValueType<ArrayType extends Array<unknown>> = ArrayType[number];

