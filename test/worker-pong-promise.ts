import registerPromiseWorker from "../src/register";

registerPromiseWorker<string, Promise<string>>(async (msg) => msg)