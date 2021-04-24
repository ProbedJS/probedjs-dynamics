
Simple values that notifies when they are changed.

## Installation

```
npm i -D @probed/dynamics
```

## Usage

### Creation
```javascript
import dynamic from '@probed/dynamics'

const x = dynamic(12);
listen(x, v => console.log(`x is now ${v}`));
x.current = 13;
```

### Operations


```javascript
import {listen, transform} from '@probed/dynamics'

const foo = (maybeDynamic) => {
    // - dynamic: invoke the callback whenever it changes.
    // - static: does nothing.
    listen(maybeDynamic, v=>console.log(`The value is now ${v}`));

    // - dynamic: y is a dynamic that updates whenever x changes
    // - static: y is the result of the callback
    const y = transform(maybeDynamic, (v)=>v * v);

    cosnt vtype = valType(maybeDynamic);
    console.log(`The valuetype is now ${vtype}`);

    return y;
}


foo(12);

const v1 = 12;
const v2 = 13;

const r1 = foo(v1);
const r2 = foo(v2);

listen(r2, v => console.log(`r2 is now ${v}`))

r2.set(1);
r2.set(13);
r2.set(14);


```