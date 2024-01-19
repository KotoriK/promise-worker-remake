import assert from "assert";
import registerPromiseWorker from "../src/register";
const originalPostMessage = self.postMessage
self.postMessage = function (...args: Parameters<typeof self.postMessage>) {
    assert(args.length === 2)
    assert(typeof args[1] === 'object')
    assert('transfer' in args[1])
    return originalPostMessage(...args)
}
self.addEventListener('message', (e) => {
    assert(e.data.length === 2)
    assert(typeof e.data[0] === 'number')
    assert(typeof e.data[1] === 'string')
})
registerPromiseWorker<string, Uint8Array>(async (msg, register) => {
    const result = new TextEncoder().encode(msg)
    register(result.buffer)
    return result
})
