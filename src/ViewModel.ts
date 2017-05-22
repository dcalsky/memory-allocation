/**
 * Created by Dcalsky on 2017/5/21.
 */

import * as $ from 'jquery'

const messagePool = $('#message-pool')

function addMessageToPool(msg: string) {
    const $message = $('<li>').addClass('message')
    $message.text(msg)
    messagePool.prepend($message)
}

export class JobElement {
    private lackTime: JQuery
    constructor() {
        this.lackTime = $('#lacktime')
    }
    public addMessage(id?, address?, blockId?) {
        let msg: string
        if (address) {
            msg = `指令编号<${id}>: 模拟物理地址为${address}`
        } else {
            msg = `指令编号<${id}>: 触发缺页异常, 无缓存`
        }
        // `指令编号<${id}>: `
        addMessageToPool(msg)
    }
    public updateLackTime(time: number) {
        this.lackTime.text(time)
    }
}

export class BlockElement {
    private block: JQuery
    private blockId: number
    constructor(blockId: number) {
        this.blockId = blockId
        this.block = $(`.block[data-block=${blockId}]`)
    }
    public updatePage(id: number) {
        const text = id !== null ? id.toString() : 'None'
        this.block.find('.page').text(text)
        if (id === null) {
            addMessageToPool(`内存块${this.blockId}: 释放缓存`)
        } else {
            addMessageToPool(`内存块${this.blockId}: 触发缺页异常, 调入页${id}`)
        }
    }
}