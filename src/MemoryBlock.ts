/**
 * Created by Dcalsky on 2017/5/21.
 */

import Page from './Page'

export default class MemoryBlock {
    public free: boolean = true
    public page: Page
    public initialAddress: number
    public lastUpdate

    constructor(n: number) {
        this.initialAddress = n
    }
    public getAddress(instructionId: number): number {
        const offset = this.page.getInstructionOrder(instructionId)
        if (offset === -1) return -1
        this.lastUpdate = new Date()
        return this.initialAddress + offset
    }
    public replacePage(page: Page) {
        this.page = page
    }
}