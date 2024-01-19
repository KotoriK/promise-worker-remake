import registerPromiseWorker from "../src/register";

registerPromiseWorker<string, string>((msg) => {
    throw new Error(msg)
})