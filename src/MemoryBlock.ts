/**
 * Created by Dcalsky on 2017/5/21.
 */

import Page from './Page'
import {BlockElement} from './ViewModel'

export default class MemoryBlock {
    public free: boolean = true
    public page: Page
    public initialAddress: number
    public lastUpdate
    private el: BlockElement

    constructor(n: number, el: BlockElement) {
        this.initialAddress = n
        this.el = el
    }
    public getAddress(instructionId: number): number {
        if (!this.page) return -1
        const offset = this.page.getInstructionOrder(instructionId)
        if (offset === -1) return -1
        this.lastUpdate = new Date()
        return this.initialAddress + offset
    }
    public replacePage(page: Page): void {
        this.page = page
        this.free = false
        this.lastUpdate = new Date()
        this.el.updatePage(this.page.id)
    }
    public freePage(): void {
        this.page = null
        this.free = true
        this.el.updatePage(null)
    }
}