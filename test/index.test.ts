import Worker from 'web-worker';
import PromiseWorker from '../src/index';
import { pathToFileURL } from 'node:url';
test('string', async () => {
    const worker = new Worker(pathToFileURL(require.resolve('./worker-pong.js')))
    const promiseWorker = new PromiseWorker(worker)
    expect(await promiseWorker.postMessage('ping')).toBe('ping')
    worker.terminate()
})

test('string promise', async () => {
    const worker = new Worker(pathToFileURL(require.resolve('./worker-pong-promise.js')))
    const promiseWorker = new PromiseWorker(worker)
    expect(await promiseWorker.postMessage('ping')).toBe('ping')
    worker.terminate()

})

test('arraybuffer', async () => {
    const worker = new Worker(pathToFileURL(require.resolve('./worker-encode.js')))
    const promiseWorker = new PromiseWorker(worker)
    const expectValue = new TextEncoder().encode('Hello World!')
    worker.addEventListener('message', (e) => {
        expect(e.data.length).toBe(3)
        expect(typeof e.data[0]).toBe('number')
        expect(e.data[1]).toBe(null)
        expect(e.data[2]).toBeInstanceOf(Uint8Array)

    })
    expect(await promiseWorker.postMessage("Hello World!")).toStrictEqual(expectValue)
    worker.terminate()

})

test('arraybuffer:transfer list', async () => {
    const worker = new Worker(pathToFileURL(require.resolve('./worker-encode-jest-embedded.js')))
    const promiseWorker = new PromiseWorker(worker)
    const expectValue = new TextEncoder().encode('Hello World!')
    expect(await promiseWorker.postMessage("Hello World!")).toStrictEqual(expectValue)
    worker.terminate()

})

test('handle error', async () => {
    const worker = new Worker(pathToFileURL(require.resolve('./worker-error.js')))
    const promiseWorker = new PromiseWorker(worker)
    try {
        await promiseWorker.postMessage("Hello World!")
    } catch (error) {
        expect((error as Error).message).toBe("Hello World!")
    }
    worker.terminate()
})
