export type Callback<TMsgIn, TMsgOut> = (msg: TMsgIn, registerTransfer: (transferable: Transferable) => void) => TMsgOut | Promise<TMsgOut>
export type ExtractMsgOut<T> = T extends Callback<any, infer U> ? U : never

export default function registerPromiseWorker<TMsgIn, TMsgOut = any>(callback: Callback<TMsgIn, TMsgOut>) {
    self.addEventListener('message', async (e: MessageEvent<[number, TMsgIn]>) => {
        const payload = e.data
        const messageId = payload[0]
        const message = payload[1]
        try {
            const transferList: Transferable[] = []
            const callbackResult = await callback(message, (t) => transferList.push(t))
            self.postMessage([messageId, null, callbackResult], transferList.length ? { transfer: transferList } : undefined)
        } catch (error) {
            self.postMessage([messageId, {
                message: (error as Error).message
            }])
        }
    })
}

