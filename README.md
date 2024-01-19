# @kotorik/promise-worker

Originated from https://github.com/nolanlawson/promise-worker

Similar Usage except:

1. Service Worker is not supported.

## Transferable supports

```ts
import registerPromiseWorker from "@kotorik/promise-worker/register";

registerPromiseWorker<string, Uint8Array>(async (msg, register) => {
  const result = new TextEncoder().encode(msg);
  register(result.buffer); // use this function to add things to transfer list
  return result;
});
```
