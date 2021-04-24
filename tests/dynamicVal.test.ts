/**
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

import { dynamic, isDynamic } from '../src';
import { cleanup } from './common';

afterEach(() => {
    cleanup();
});

describe('Static Value', () => {
    it('is not seen as dynamic', () => {
        expect(isDynamic(12)).toBeFalsy();
        expect(isDynamic(true)).toBeFalsy();
        expect(isDynamic(undefined)).toBeFalsy();
        expect(isDynamic(null)).toBeFalsy();
        expect(isDynamic('hullo')).toBeFalsy();
        expect(isDynamic({ a: 12 })).toBeFalsy();
    });
});

describe('Dynamic Value', () => {
    it('Initialized correctly', () => {
        const x = dynamic(12);
        expect(x.current).toBe(12);
    });

    it('is accessible via valueof()', () => {
        const x = dynamic(12);
        expect(x.valueOf() + 2).toBe(14);
    });

    it('is seen as dynamic', () => {
        const x = dynamic(12);
        expect(isDynamic(x)).toBeTruthy();
    });

    it('Reassigns new values', () => {
        const x = dynamic(12);
        expect(x.valueOf()).toBe(12);

        x.set(23);
        expect(x.valueOf()).toBe(23);
    });

    it('Notifies of changes', () => {
        const x = dynamic(12);

        let y = 0;
        const listener = () => {
            y += 1;
        };
        x.addListener(listener);

        x.set(23);
        expect(y).toBe(1);
        expect(x.valueOf()).toBe(23);

        // Setting to same value should not trigger notification.
        x.set(23);
        expect(y).toBe(1);
        expect(x.valueOf()).toBe(23);

        // Setting a different value triggers notification again.
        x.set(24);
        expect(y).toBe(2);
        expect(x.valueOf()).toBe(24);

        // Removing the listener cancels notifications.
        x.removeListener(listener);
        x.set(12);
        expect(y).toBe(2);
        expect(x.valueOf()).toBe(12);
    });

    it('Cleans up correctly', () => {
        const x = dynamic(12);

        let a = 0;
        let b = 0;
        let c = 0;
        x.addListener(() => {
            a += 1;
        });

        x.addListener(() => {
            b += 1;
        });

        x.addListener(() => {
            c += 1;
        });

        x.set(13);
        expect(a).toBe(1);
        expect(b).toBe(1);
        expect(c).toBe(1);

        x.set(14);
        expect(a).toBe(2);
        expect(b).toBe(2);
        expect(c).toBe(2);

        cleanup();
        x.set(15);
        expect(a).toBe(2);
        expect(b).toBe(2);
        expect(c).toBe(2);
    });

    it('stringizes correctly', () => {
        const x = dynamic(12);
        expect(`${x}`).toBe('12');
        expect(`` + x).toBe('12');
    });

    it('valueof works', () => {
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        const x = dynamic(12) as any;
        const y = x + 12;

        expect(y).toBe(24);
    });
});
