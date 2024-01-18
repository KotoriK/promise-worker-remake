import registerPromiseWorker from "../src/register";

registerPromiseWorker<string, Uint8Array>(async (msg, register) => {
    const result = new TextEncoder().encode(msg)
    register(result.buffer)
    return result
})