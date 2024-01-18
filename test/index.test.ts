import { default as Worker } from 'web-worker'

import PromiseWorker from '../src/index'

test('string', () => {
    const worker = new Worker(new URL('./worker-pong.ts', import.meta.url))
    const promiseWorker = new PromiseWorker(worker)
    return expect(promiseWorker.postMessage('ping')).resolves.toBe('ping')
})

test('string promise', () => {
    const worker = new Worker(new URL('./worker-pong-promise.ts', import.meta.url))
    const promiseWorker = new PromiseWorker(worker)
    return expect(promiseWorker.postMessage('ping')).resolves.toBe('ping')
})

test('arraybuffer', () => {
    const worker = new Worker(new URL('./worker-encode.ts', import.meta.url))
    const promiseWorker = new PromiseWorker(worker)
    const expectValue = new TextEncoder().encode('Hello World!')
    return expect(promiseWorker.postMessage("Hello World!")).resolves.toStrictEqual(expectValue)
})
