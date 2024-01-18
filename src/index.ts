import { RemoveFirstElement } from "./utils";

export type MessagePackReply<TRes> = [number, { message: string }, TRes]
let lastMsgId = 0
export default class PromiseWorker<TReq, TRes> {
    w: Worker
    cb: Record<string, (error: any, result: any) => void> = {};
    [Symbol.dispose]!: () => void

    constructor(worker: Worker) {
        this.w = worker
        const callback = (e: MessageEvent<MessagePackReply<TRes>>) => {
            const payload = e.data
            const messageId = payload[0]
            const callback = this.cb[messageId]
            if (!callback) return
            delete this.cb[messageId]
            callback(payload[1], payload[2])
        }
        worker.addEventListener('message', callback)
        this.postMessage = (message: TReq, ...extraArgs: RemoveFirstElement<Parameters<Worker['postMessage']>>) => {
            const messageId = lastMsgId++
            const messageToSend = [messageId, message]
            return new Promise<TRes>((resolve, reject) => {
                this.cb[messageId] = (error, result) => {
                    if (error) {
                        return reject(new Error(error.message))
                    }
                    resolve(result)
                }
                this.w.postMessage(messageToSend, ...extraArgs)

            })
        }
        this[Symbol.dispose] = () => {
            worker.removeEventListener('message', callback)
        }
    }
    postMessage: (message: TReq, ...extraArgs: RemoveFirstElement<Parameters<Worker['postMessage']>>) => Promise<TRes>
}

