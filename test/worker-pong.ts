import registerPromiseWorker from "../src/register";

registerPromiseWorker<string, string>((msg) => msg)