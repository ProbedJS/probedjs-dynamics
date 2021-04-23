import { dynamic } from '../src';

describe('When there is no cleanup context', () => {
    it('listening still works', () => {
        const x = dynamic(12);

        let y = 0;
        const listener = () => {
            y += 1;
        };
        x.addListener(listener);

        expect(y).toBe(0);

        x.set(1);
        expect(y).toBe(1);

        x.set(2);
        expect(y).toBe(2);

        x.removeListener(listener);

        x.set(3);
        expect(y).toBe(2);
    });
});
